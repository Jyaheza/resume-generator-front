<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ResumeServices from '../services/ResumeServices';

const router = useRouter();
const resumesData = ref([]);
const dialog = ref(false);
const reviewComments = ref('');
const reviewSuggestions = ref('');
const selectedResumeId = ref(null);

const user = ref(null);
user.value = JSON.parse(localStorage.getItem('user'));

onMounted(async () => {
  if (user.value) {
    try {
      const resumeResponse = await ResumeServices.getResumesByUserId(user.value.id);
      const resumesResponseData = resumeResponse.data;
      resumesData.value = resumesResponseData.length > 0 ? resumesResponseData : [];
    } catch (error) {
      console.error('Error fetching data:', error);
      resumesData.value = [];
    }
  }
});

function openResumePdf(pdfData) {
  try {
    const uint8Array = new Uint8Array(pdfData);
    let b64String = '';
    uint8Array.forEach((byte) => {
      b64String += String.fromCharCode(byte);
    });
    const blob = b64toBlob(b64String, 'application/pdf');
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error saving PDF:', error);
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
  return new Blob(byteArrays, { type: contentType });
}

function openReviewDialog(resumeId) {
  selectedResumeId.value = resumeId;
  dialog.value = true;
}

function closeReviewDialog() {
  dialog.value = false;
  reviewComments.value = '';
  reviewSuggestions.value = '';
}

function submitReview() {
  // Implement review submission logic here
  closeReviewDialog();
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-center">Resumes List</h2>
      </v-col>
      <template v-if="resumesData && resumesData.length > 0">
        <template v-for="resume in resumesData" :key="resume.id">
          <v-col cols="12">
            <v-card class="mb-3">
              <v-card-title>
                <v-row>
                  <v-col cols="12">{{ resume.title }}</v-col>
                </v-row>
              </v-card-title>
              <v-card-text class="left">
                <v-btn @click="openResumePdf(resume.resume_pdf.data)" color="primary">View PDF</v-btn>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn icon @click="openReviewDialog(resume.id)" color="primary">
                  <v-icon>mdi-comment</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
      </template>
      <template v-else>
        <v-col cols="12">
          <p>No resumes found.</p>
        </v-col>
      </template>
    </v-row>

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
  </v-container>
</template>

<style>
.text-center {
  text-align: center;
}
</style>
