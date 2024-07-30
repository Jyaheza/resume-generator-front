<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import ResumeServices from "../services/ResumeServices";
import JobMatchServices from "../services/JobMatchServices";
import VueSpeedometer from "vue-speedometer"
import ReviewServices from "../services/ReviewServices";

const router = useRouter();
const resumesData = ref([]);
const user = ref(null);
user.value = JSON.parse(localStorage.getItem("user"));

const segmentColorsOn = ["firebrick", "tomato", "gold", "yellowgreen", "limegreen"];
const segmentColorsOff = ["ghostwhite", "lightgrey", "grey", "darkgrey", "black"];

const jobMatchScore = ref({});
const jobDescriptions = ref({});
const jobMatchCritique = ref({});
const expandedPanels = ref([]);
const showDeleteDialog = ref(false);
const resumeToDelete = ref(null);
const loading = ref(false);
const jobMatchTextColor = ref({})
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const csVisibleValues = ref({});
const reviewDialog = ref(false);
const selectedResumeId = ref(null);
const existingReviews = ref([]);

onMounted(async () => {
  loading.value = true;
  if (user.value) {
    try {
      await setResumeData();
      await loadJobMatchValues();
      await loadJobDescriptions();
      loading.value = false;
    } catch (error) {
      console.error("Error fetching data:", error);
      resumesData.value = [];
      loading.value = false;
    }
  }
});

async function setResumeData() {
  const resumeResponse = await ResumeServices.getResumesMeta(user.value.id);
  const resumesResponseData = resumeResponse.data;
  resumesData.value = resumesResponseData.length > 0 ? resumesResponseData : [];

  resumesData.value.forEach((resume) => {
    csVisibleValues.value[resume.resume_id] = resume.cs_visible === 1;
  });
}

async function loadJobDescriptions() {
  const existingJobDescriptionsJson = getLocalStorageItemJson('jobDescriptions');

  Object.entries(existingJobDescriptionsJson).forEach(([key, value]) => {
    jobDescriptions.value[key] = value;
  });
}

async function openResumePdf(resumeId) {
  let pdfResponse, uint8Array, b64String, blob, blobUrl;

  try {
    pdfResponse = await ResumeServices.getResumePdf(resumeId);

    // Convert array of numbers to Uint8Array
    uint8Array = new Uint8Array(pdfResponse.data.pdf.data);

    // Convert Uint8Array to b64 string
    b64String = '';
    uint8Array.forEach((byte) => {
      b64String += String.fromCharCode(byte);
    });

    // Create Blob from base64 string
    blob = b64toBlob(b64String, 'application/pdf');

    // Create a temporary URL for the Blob
    blobUrl = URL.createObjectURL(blob);

    // Open PDF in a new tab
    window.open(blobUrl, '_blank');

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 2000);
  } catch (error) {
    console.error('Error opening PDF:', error);
  } finally {
    pdfResponse = null;
    uint8Array = null;
    b64String = null;
    blob = null;
    blobUrl = null;
  }
}

function b64toBlob(base64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

function deleteResumePrompt(resumeId) {
  showDeleteDialog.value = true;
  resumeToDelete.value = resumeId;
}

async function deleteResume(resumeId) {
  showDeleteDialog.value = false;
  try {
    loading.value = true;
    await ResumeServices.deleteResume(resumeId);
    loading.value = false;
    snackbar.value.value = true;
    snackbar.value.color = "green";
    snackbar.value.text = "Resume deleted successfully!";
    deleteJobMatchLocalStorageItems(resumeId);
    resumesData.value = [];
    await setResumeData();
    await loadJobMatchValues();
    await loadJobDescriptions();
    setTimeout(() => {
      snackbar.value.value = false;
    }, 1500);
  } catch (error) {
    console.error(error);
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = `There was an error deleting the resume: ${error.response.data.message}`;
    loading.value = false;
  }
}

function closeSnackBar() {
  snackbar.value.value = false;
}

async function getJobMatch(resumeId, jobDescription) {
  loading.value = true;
  let jobMatchResult;
  try {
    jobMatchResult = await JobMatchServices.getJobMatch(resumeId, jobDescription);
  } catch (error) {
    console.log(error);
    loading.value = false;
  }

  const existingJobDescriptionsJson = getLocalStorageItemJson('jobDescriptions');
  existingJobDescriptionsJson[resumeId] = jobDescription;
  localStorage.setItem('jobDescriptions', JSON.stringify(existingJobDescriptionsJson));

  jobMatchScore.value[resumeId] = jobMatchResult.data.score;
  jobMatchCritique.value[resumeId] = jobMatchResult.data.critique;
  jobMatchTextColor.value[resumeId] = segmentColorsOn[Math.floor(jobMatchResult.data.score)] || "limegreen";

  await saveJobMatchResult(jobMatchResult, resumeId, jobDescription);

  loading.value = false;
}

async function saveJobMatchResult(jobMatchResult, resumeId, jobDescription) {
  const existingResultsJson = getLocalStorageItemJson('jobMatchResults');

  if (!existingResultsJson[resumeId]) {
    existingResultsJson[resumeId] = {};
  }

  existingResultsJson[resumeId].score = jobMatchResult.data.score;
  existingResultsJson[resumeId].critique = jobMatchResult.data.critique;

  localStorage.setItem('jobMatchResults', JSON.stringify(existingResultsJson));
}

async function loadJobMatchValues() {
  const existingResultsJson = getLocalStorageItemJson('jobMatchResults');
  Object.entries(existingResultsJson).forEach(([key, value]) => {
    const score = value.score;
    const critique = value.critique;
    jobMatchScore.value[key] = score;
    jobMatchCritique.value[key] = critique;
    jobMatchTextColor.value[key] = segmentColorsOn[Math.floor(score)] || "limegreen";
  });
}

function getSegmentColors(resumeId) {
  const score = Math.floor(jobMatchScore.value[resumeId] || 0);
  const colors = !score ? segmentColorsOff : segmentColorsOn;
  return colors;
}

function getLocalStorageItemJson(itemName) {
  const existingResults = localStorage.getItem(itemName);
  return existingResults ? JSON.parse(existingResults) : {};
}

function deleteJobMatchLocalStorageItems(resumeId) {
  const jobMatchResultsJson = getLocalStorageItemJson('jobMatchResults');
  const jobDescriptionsJson = getLocalStorageItemJson('jobDescriptions');
  delete jobMatchResultsJson[resumeId];
  delete jobDescriptionsJson[resumeId];
  localStorage.setItem('jobMatchResults', JSON.stringify(jobMatchResultsJson));
  localStorage.setItem('jobDescriptions', JSON.stringify(jobDescriptionsJson));
  jobMatchScore.value = {};
  jobDescriptions.value = {};
  jobMatchCritique.value = {};
}

async function saveCsVisible(resumeId, csVisible) {
  await ResumeServices.updateCsVisible(resumeId, csVisible);
}

function handleSwitchChange(resume) {
  resume.cs_visible = resume.cs_visible === 1 ? 0 : 1;
  saveCsVisible(resume.resume_id, resume.cs_visible);
}

async function openReviewDialog(resumeId) {
  existingReviews.value = [];
  loading.value = true;
  selectedResumeId.value = resumeId;
  await fetchReviews(resumeId);
  loading.value = false;
  reviewDialog.value = true;
}

function closeReviewDialog() {
  reviewDialog.value = false;
}


async function fetchReviews(resumeId) {
  try {
    const response = await ReviewServices.getReviewsForResume(resumeId);
    existingReviews.value = response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}

</script>

<style scoped>
:deep(.v-btn__content) {
  white-space: pre-wrap;
}

.delete-icon {
  position: absolute;
  bottom: 16px;
  right: 22px;
}

.comment-icon {
  position: absolute;
  bottom: 50px;
  right: 22px;
}
</style>

<template>
  <v-dialog v-model="reviewDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Reviews</span>
      </v-card-title>
      <v-card-text>
        <div v-if="existingReviews.length > 0">
          <v-row align="start">
            <v-col v-for="review in existingReviews" :key="review.id" cols="12" class="mb-3">
              <v-card class="ma-1 pa-2" outlined>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" class="font-weight-bold">Comments:</v-col>
                    <v-col cols="12">{{ review.comments }}</v-col>
                    <v-col cols="12" class="font-weight-bold">Suggestions:</v-col>
                    <v-col cols="12">{{ review.suggestions }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" class="d-flex justify-sm-start justify-center pa-0">
                      <span class="text-subtitle-2 text-grey">Created: {{ review.createdAt }}</span>
                    </v-col>
                    <v-col cols="12" sm="6" class="d-flex justify-sm-end justify-center pa-0">
                      <span class="text-subtitle-2 text-grey">Reviewer: {{ review.reviewer_name }}</span>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <p>No reviews available.</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeReviewDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="showDeleteDialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Confirm Delete</v-card-title>
      <v-card-text>
        Are you sure you want to delete this resume?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="showDeleteDialog = false">Cancel</v-btn>
        <v-btn color="red darken-1" text @click="deleteResume(resumeToDelete)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar.value" rounded="pill" location="center">
    {{ snackbar.text }}
    <template v-slot:actions>
      <v-btn :color="snackbar.color" text @click="closeSnackBar">Close</v-btn>
    </template>
  </v-snackbar>

  <v-container>
    <div id="body">
      <v-overlay :model-value="loading" contained persistent class="align-center justify-center">
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
      </v-overlay>
      <v-row>
        <v-col cols="12">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="text-h5">My Resumes:</div>
              </v-col>
            </v-row>
          </v-container>
          <template v-if="resumesData && resumesData.length > 0">
            <v-container>
              <v-row>
                <template v-for="(resume, index) in resumesData" :key="index">
                  <v-col cols="12">
                    <v-expansion-panels v-model="expandedPanels[resume.resume_id]">
                      <v-expansion-panel :key="resume.resume_id" bg-color="#fafafa">
                        <v-row>
                          <v-col class="ml-4">
                            <v-switch inset v-model="csVisibleValues[resume.resume_id]" experimentalModelPropName
                              @change="handleSwitchChange(resume)" color="primary"
                              label="Allow Resume Reviews From Student Services" hide-details></v-switch>
                          </v-col>
                        </v-row>
                        <v-expansion-panel-title>
                          <v-card @click.stop variant="flat" class="position-relative w-100"
                            style="background-color: #fafafa">
                            <v-card-text>
                              <v-row>
                                <v-col cols="12" md="3" lg="2" xl="1">
                                  <div class="d-flex justify-center justify-md-start">
                                    <span class="text-h6">Title: {{ resume.title ? resume.title : " [No Title]"
                                      }}</span>
                                  </div>
                                  <div class="p-2 d-flex justify-center justify-md-start">
                                    <v-btn @click="openResumePdf(resume.resume_id)" color="primary">View PDF</v-btn>
                                  </div>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="12" md="auto">
                                  <div class="d-flex justify-center justify-md-start">
                                    <div style="position: relative; width: 175px; height: 115px;">
                                      <vue-speedometer :needleHeightRatio=".9" :minValue="0" :maxValue="5"
                                        :customSegmentStops="[0, 1, 2, 3, 4, 5]"
                                        :segmentColors="getSegmentColors(resume.resume_id)"
                                        :needleTransitionDuration="1000" needleTransition="easeBounceIn"
                                        :forceRender="true" :value="Math.floor(jobMatchScore[resume.resume_id] || 0)"
                                        :fluidWidth="true" />
                                      <div v-if="!jobMatchScore[resume.resume_id]"
                                        class="d-flex align-center justify-center position-absolute w-100 h-100"
                                        style="top: 0; left: 0; background-color: rgba(255, 255, 255, 0.8);">
                                        <span class="text-grey pr-2">Get Job Match</span>
                                        <span>
                                          <v-icon color="#999999" icon="mdi-hand-pointing-right"
                                            size="x-large"></v-icon>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </v-col>
                                <v-col v-if="jobMatchScore[resume.resume_id]" cols="12" md="2"
                                  class="d-flex justify-center align-center">
                                  <span class="text-h5 font-weight-bold"
                                    :style="{ color: jobMatchTextColor[resume.resume_id] }">
                                    Job Match: {{ jobMatchScore[resume.resume_id] || null }}
                                  </span>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12" md="9"
                                  class="d-flex justify-center justify-sm-start align-end pt-0 pb-0">
                                  <span class="text-subtitle-2 text-grey">Created: {{ resume.createdAt }}</span>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                          <v-hover>
                            <template v-slot:default="{ isHovering, props }">
                              <v-icon @click.stop="deleteResumePrompt(resume.resume_id)" v-bind="props" size="x-large" :color="isHovering ? 'red' : 'red-lighten-2'"
                                class="delete-icon">mdi-delete-circle</v-icon>
                            </template>
                          </v-hover>
                          <v-hover>
                            <template v-slot:default="{ isHovering, props }">
                              <v-icon @click.stop="openReviewDialog(resume.resume_id)" v-bind="props" size="x-large"
                                :color="isHovering ? 'blue' : 'blue-lighten-3'" class="comment-icon">
                                mdi-comment
                              </v-icon>
                            </template>
                          </v-hover>
                          <template v-slot:actions="{ expanded }">
                            <v-icon class="ml-2" size="x-large" :color="!expanded ? 'blue' : 'red'"
                              :icon="expanded ? 'mdi-cancel' : 'mdi-text-box-search-outline'"></v-icon>
                          </template>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-divider class="mt-1 mb-13"></v-divider>
                          <v-row>
                            <v-col cols="12" sm="8">
                              <v-textarea v-model="jobDescriptions[resume.resume_id]"
                                label="1. Paste job description here."></v-textarea>
                            </v-col>
                            <v-col cols="12" sm="4">
                              2. <v-btn color="primary"
                                :disabled="!jobDescriptions[resume.resume_id] || jobDescriptions[resume.resume_id].length === 0"
                                @click="getJobMatch(resume.resume_id, jobDescriptions[resume.resume_id])">Execute
                                Match</v-btn>
                            </v-col>
                          </v-row>
                          <v-row v-if="jobMatchCritique[resume.resume_id]" class="text-grey-darken-2">
                            <v-col cols="12">
                              <p class="text-h5">Job Match Critique:</p>
                              <p>
                                {{ jobMatchCritique[resume.resume_id] }}
                              </p>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </template>
              </v-row>
            </v-container>
          </template>
          <template v-else>
            <v-container>
              <v-row>
                <v-col cols="12 d-flex justify-center align-center">
                  <span class="text-h5">You haven't generated any resumes...</span>
                </v-col>
                <v-col cols="12 d-flex justify-center align-center">
                  <v-btn color="primary" @click="router.push({ name: 'createResume' });">Generate A Resume</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
