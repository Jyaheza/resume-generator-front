<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import ResumeServices from "../services/ResumeServices";
import ReviewServices from "../services/ReviewServices";

const router = useRouter();
const resumesData = ref([]);
const user = ref(null);
user.value = JSON.parse(localStorage.getItem("user"));
const snackbar = ref({ value: false, text: "", color: "" });

const dialog = ref(false);
const showDeleteDialog = ref(false);
const showDeleteReviewDialog = ref(false);
const reviewComments = ref("");
const reviewSuggestions = ref("");
const selectedResumeId = ref(null);
const resumeToDelete = ref(null);
const reviewToDelete = ref(null);
const searchQuery = ref("");

const filteredResumes = computed(() => {
  if (!searchQuery.value) {
    return resumesData.value;
  }
  const query = searchQuery.value.toLowerCase();
  return resumesData.value.filter((resume) =>
    resume.full_name.toLowerCase().includes(query)
  );
});

const existingReviews = ref([]);

onMounted(async () => {
  await setResumeData();
});

async function setResumeData() {
  try {
    const response = await ResumeServices.getCareersServicesResumesMeta(user.value.id);
    resumesData.value = response.data;
  } catch (error) {
    console.error(error);
  }
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

function deleteReviewPrompt(reviewId) {
  showDeleteReviewDialog.value = true;
  reviewToDelete.value = reviewId;
}

async function deleteResume(resumeId) {
  showDeleteDialog.value = false;
  try {
    await ResumeServices.deleteResume(resumeId);
    snackbar.value.value = true;
    snackbar.value.color = "green";
    snackbar.value.text = "Resume deleted successfully!";
    resumesData.value = [];
    await setResumeData();
  } catch (error) {
    console.error(error);
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = `There was an error deleting the resume: ${error.response.data.message}`;
  }
}

function canDeleteReview(review){
  if(review.reviewer_id == user.value.id){
    return true
  }
  else
    return false
}

async function deleteReview(reviewId,resumeId) {

  showDeleteReviewDialog.value = false;
  try {
    await ReviewServices.deleteReview(reviewId);
    snackbar.value.value = true;
    snackbar.value.color = "green";
    snackbar.value.text = "Review deleted successfully!";
    fetchReviews(resumeId)
  } catch (error) {
    console.error(error);
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = `There was an error deleting the review: ${error.response.data.message}`;
  }
}

function closeSnackBar() {
  snackbar.value.value = false;
}

function openReviewDialog(resumeId) {
  existingReviews.value = [];
  selectedResumeId.value = resumeId;
  dialog.value = true;
  fetchReviews(resumeId);

}

function closeReviewDialog() {
  dialog.value = false;
  reviewComments.value = "";
  reviewSuggestions.value = "";
}

async function submitReview() {
  if (!reviewComments.value) {
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = "Comments are required.";
    return;
  }

  try {
    await ReviewServices.addReview(user.value.id, {
      resumeId: selectedResumeId.value,
      comments: reviewComments.value,
      suggestions: reviewSuggestions.value,
      reviewer_name: `${user.value.firstName} ${user.value.lastName}`
    });
    snackbar.value.value = true;
    snackbar.value.color = "green";
    snackbar.value.text = "Review added successfully!";
    await fetchReviews(selectedResumeId.value);
  } catch (error) {
    console.error("Error submitting review:", error);
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = "There was an error submitting your review.";
  } finally {
    closeReviewDialog();
  }
}

async function fetchReviews(resumeId) {
  try {
    const response = await ReviewServices.getReviewsForResume(resumeId);
    existingReviews.value = response.data;
    console.log(existingReviews.value)
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}

</script>
<template>
  <v-container>
    <div id="body">
      <v-row>
        <v-col cols="12">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" class="d-flex align-center">
                <div class="text-h5">Student Resumes:</div>
              </v-col>
              <v-col cols="12" sm="6" class="d-flex justify-end align-center">
                <v-text-field v-model="searchQuery" label="Search by Name" clearable hide-details></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <template v-if="filteredResumes.length > 0">
            <v-container>
              <v-row>
                <template v-for="resume in filteredResumes" :key="resume.resume_id">
                  <v-col cols="12">
                    <v-card variant="tonal" style="position: relative;">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" md="3" lg="2" xl="1">
                            <div class="d-flex justify-center justify-sm-start">
                              <span class="text-h6">{{ resume.full_name ? resume.full_name : " [Name Missing]" }}</span>
                            </div>
                            <div class="d-flex justify-center justify-sm-start">
                              <span class="text-h6">Title: {{ resume.title ? resume.title : " [No Title]"
                                }}</span>
                            </div>
                            <div class="p-2 d-flex justify-center justify-sm-start">
                              <v-btn @click="openResumePdf(resume.resume_id)" color="primary">View PDF</v-btn>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="9" class="d-flex justify-center justify-sm-start align-end pt-0 pb-0">
                            <span class="text-subtitle-2 text-grey">Created: {{ resume.createdAt }}</span>
                          </v-col>
                          <v-col cols="12" sm="3" class="d-flex justify-center justify-sm-end align-end pt-0 pb-0">
                            <v-icon @click="openReviewDialog(resume.resume_id)" size="x-large" color="blue"
                              class="mr-4">
                              mdi-comment
                            </v-icon>
                            <v-icon @click="deleteResumePrompt(resume.resume_id)" size="x-large" color="red">
                              mdi-delete-circle
                            </v-icon>
                          </v-col>
                        </v-row>
                      </v-card-text>
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
                  <span class="text-h5">There are no student resumes being shared at this time.</span>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-col>
      </v-row>
    </div>
    <!-- Add Review Dialog -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="headline">
          Reviews
        </v-card-title>
        <v-card-text>
          <div v-if="existingReviews.length">
            <v-divider class="mb-4"></v-divider>
            <v-row align="start">
              <v-col v-for="review in existingReviews" :key="review.id" cols="12" class="mb-3">
                <v-card>
  <v-card-title class="d-flex align-center font-weight-bold">
    <v-icon left color="primary">mdi-account-circle</v-icon>
    {{ review.reviewer_name }}
  </v-card-title>
  <v-divider></v-divider>
  <v-card-text>
    <div class="mt-3">
      <div class="font-weight-bold">Comments:</div>
      <div>{{ review.comments }}</div>
    </div>
    <div class="mt-3">
      <div class="font-weight-bold">Suggestions:</div>
      <div>{{ review.suggestions }}</div>
    </div>
  </v-card-text>
  <v-card-actions class="d-flex justify-between pa-0">
    <span class="text-subtitle-2 text-grey">Created: {{ review.createdAt }}</span>
    <v-icon 
      v-if="canDeleteReview(review)" 
      @click="deleteReviewPrompt(review.id)" 
      size="x-large" 
      color="red" 
      class="ml-auto">
      mdi-delete-circle
    </v-icon>
  </v-card-actions>
</v-card>

              </v-col>
            </v-row>
          </div>
          <div v-else>
            <p>No reviews available.</p>
          </div>
          <v-divider class="my-4"></v-divider>
          <div>
            <v-textarea v-model="reviewComments" label="New Comments" required outlined
              prepend-inner-icon="mdi-comment"></v-textarea>
            <v-textarea v-model="reviewSuggestions" label="New Suggestions" outlined
              prepend-inner-icon="mdi-lightbulb"></v-textarea>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeReviewDialog">Cancel</v-btn>
          <v-btn color="primary" text @click="submitReview">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this resume?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" @click="deleteResume(resumeToDelete)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Review Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteReviewDialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirm Delete</v-card-title>
        <v-card-text>Are you sure you want to delete this review</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="showDeleteReviewDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" @click="deleteReview(reviewToDelete,selectedResumeId)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.value" :color="snackbar.color" :timeout="3000" top right>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="closeSnackBar">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
