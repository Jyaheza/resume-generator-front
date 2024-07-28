<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ResumeServices from "../services/ResumeServices";
import VueSpeedometer from "vue-speedometer"

const router = useRouter();
const resumesData = ref([]);
const user = ref(null);
user.value = JSON.parse(localStorage.getItem("user"));

const segmentColorsOn = ["firebrick", "tomato", "gold", "yellowgreen", "limegreen"];
const segmentColorsOff = ["ghostwhite", "lightgrey", "grey", "darkgrey", "black"];

const jobMatchValue = ref(null);
const jobMatchList = ref([]);
const expandedPanels = ref(undefined);
const jobMatchExpanded = ref(false);
const showDeleteDialog = ref(false);
const resumeToDelete = ref(null);
const loading = ref(false);
const jobMatchTextColor = ref(segmentColorsOn[jobMatchValue.value] || "limegreen");
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

const dialog = ref(false);
const reviewComments = ref("");
const reviewSuggestions = ref("");
const selectedResumeId = ref(null);

onMounted(async () => {
  if (user.value) {
    try {
      setResumeData();
    } catch (error) {
      console.error("Error fetching data:", error);
      resumesData.value = [];
    }
  }
});

async function setResumeData() {
  const resumeResponse = await ResumeServices.getResumesMeta(user.value.id);
  const resumesResponseData = resumeResponse.data;
  resumesData.value = resumesResponseData.length > 0 ? resumesResponseData : [];
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

    URL.revokeObjectURL(blobUrl);

    pdfResponse = null;
    uint8Array = null;
    b64String = null;
    blob = null;
    blobUrl = null;
  } catch (error) {
    console.error('Error opening PDF:', error);
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

watch(expandedPanels, (newVal) => {
  if (newVal === 0) {
    jobMatchExpanded.value = true;
  } else {
    jobMatchExpanded.value = false;
  }
});

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
    resumesData.value = [];
    await setResumeData();
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

function openReviewDialog(resumeId) {
  selectedResumeId.value = resumeId;
  dialog.value = true;
}

function closeReviewDialog() {
  dialog.value = false;
  reviewComments.value = "";
  reviewSuggestions.value = "";
}

async function submitReview() {
  if (!reviewComments.value) {
    return;
  }
  try {
    await ResumeServices.addReview(selectedResumeId.value, {
      comments: reviewComments.value,
      suggestions: reviewSuggestions.value,
    });
    snackbar.value.value = true;
    snackbar.value.color = "green";
    snackbar.value.text = "Review added successfully!";
  } catch (error) {
    console.error('Error submitting review:', error);
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = "There was an error submitting your review.";
  } finally {
    closeReviewDialog();
    setTimeout(() => {
      snackbar.value.value = false;
    }, 1500);
  }
}
</script>

<template>
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
  <v-overlay :model-value="loading" contained persistent class="align-center justify-center">
    <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
  </v-overlay>
  <v-snackbar v-model="snackbar.value" rounded="pill" location="center">
    {{ snackbar.text }}
    <template v-slot:actions>
      <v-btn :color="snackbar.color" text @click="closeSnackBar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Add Review</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-textarea
            v-model="reviewComments"
            label="Comments"
            required
          ></v-textarea>
          <v-textarea
            v-model="reviewSuggestions"
            label="Suggested Additions"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeReviewDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="submitReview">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-container>
    <div id="body">
      <v-row>
        <v-col cols="12">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="text-h5">My Resumes:</div>
              </v-col>
              <v-col v-if="resumesData && resumesData.length > 0" cols="12" sm="6">
                <v-expansion-panels v-model="expandedPanels">
                  <v-expansion-panel bg-color="lightgrey">
                    <v-expansion-panel-title>
                      <span class="text-h6">Perform Job Match</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-row>
                        <v-col col="12">
                          <v-textarea label="1. Paste job description here."></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col col="12">
                          2. Check the boxes for the resumes below you would like to perform the match for.
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col col="12">
                          3.
                          <v-btn color="primary">Execute Match</v-btn>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-container>
          <template v-if="resumesData && resumesData.length > 0">
            <v-container>
              <v-row>
                <template v-for="resume in resumesData" :key="resume.resume_id">
                  <v-col cols="12">
                    <v-card variant="tonal" style="position: relative;">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" md="3" lg="2" xl="1">
                            <div class="d-flex justify-center justify-sm-start">
                              <span class="text-h6">Title: {{ resume.title ? resume.title : " [No Title]" }}</span>
                            </div>
                            <div class="p-2 d-flex justify-center justify-sm-start">
                              <v-btn @click="openResumePdf(resume.resume_id)" color="primary">View PDF</v-btn>
                            </div>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col cols="12" sm="auto">
                            <div class="d-flex justify-center justify-sm-start">
                              <div style="position: relative; width: 175px; height: 115px;">
                                <vue-speedometer :needleHeightRatio=".9" :minValue="0" :maxValue="5"
                                  :customSegmentStops="[0, 1, 2, 3, 4, 5]"
                                  :segmentColors="jobMatchValue === null ? segmentColorsOff : segmentColorsOn"
                                  :needleTransitionDuration="1000" needleTransition="easeBounceIn"
                                  :value="jobMatchValue === null ? 0 : jobMatchValue" :fluidWidth="true" />
                                <div v-if="jobMatchValue === null"
                                  class="d-flex align-center justify-center position-absolute w-100 h-100"
                                  style="top: 0; left: 0; background-color: rgba(255, 255, 255, 0.8);">
                                  <span class="text-grey">No Job Match Score</span>
                                </div>
                              </div>
                            </div>
                          </v-col>
                          <v-col v-if="jobMatchValue !== null" cols="12" sm="4" md="2"
                            class="d-flex justify-center align-center">
                            <span class="text-h5 font-weight-bold" :style="{ color: jobMatchTextColor }">
                              Job Match: {{ jobMatchValue }}
                            </span>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="9" class="d-flex justify-center justify-sm-start align-end pt-0 pb-0">
                            <span class="text-subtitle-2 text-grey">Created: {{ resume.createdAt }}</span>
                          </v-col>
                          <v-col cols="12" sm="3" class="d-flex justify-center justify-sm-end align-end pt-0 pb-0">
                            <v-col cols="12" sm="3" class="d-flex justify-center justify-sm-end align-end pt-0 pb-0">
  <v-icon @click="openReviewDialog(resume.resume_id)" size="x-large" color="blue" class="mr-4">
    mdi-comment
  </v-icon>
  <v-icon @click="deleteResumePrompt(resume.resume_id)" size="x-large" color="red">
    mdi-delete-circle
  </v-icon>
</v-col>

                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-checkbox v-if="jobMatchExpanded" v-model="jobMatchList" color="green" :value="resume.resume_id"
                        style="position: absolute; top: 0px; right: 10px;" />
                    </v-card>
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
