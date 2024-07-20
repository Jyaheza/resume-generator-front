<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ResumeServices from "../services/ResumeServices";

const router = useRouter();
const resumesData = ref([]);

const user = ref(null);
user.value = JSON.parse(localStorage.getItem("user"));

onMounted(async () => {
  if (user.value) {
    try {
      const resumeResponse = await ResumeServices.getResumesByUserId(user.value.id);
      const resumesResponseData = resumeResponse.data;
      resumesData.value = resumesResponseData.length > 0 ? resumesResponseData : [];
    } catch (error) {
      console.error("Error fetching data:", error);
      resumesData.value = [];
    }
  }
});

async function openResumePdf(pdfData) {
  try {
    // Convert array of numbers to Uint8Array
    const uint8Array = new Uint8Array(pdfData);

    // Convert Uint8Array to b64 string
    let b64String = '';
    uint8Array.forEach((byte) => {
      b64String += String.fromCharCode(byte);
    });

    // Create Blob from base64 string
    const blob = b64toBlob(b64String, 'application/pdf');

    // Create a temporary URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Open PDF in a new tab
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

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

</script>

<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10">
          <v-card-title class="pl-0 text-h4 font-weight-bold">Resumes</v-card-title>
        </v-col>
        <v-btn size="x-large" variant="flat">
          My Dashboard
        </v-btn>
      </v-row>
      <v-row align="center" clas="mb-4">
        <v-btn variant="outlined" @click="router.push({ name: 'createresume' })">
          Create a resume
        </v-btn>
      </v-row>
      <v-row align="center">
        <v-btn variant="outlined">
          Match Resume With Job
        </v-btn>
      </v-row>
      <template v-if="resumesData && resumesData.length > 0">
        <v-container>
          <v-row>
            <template v-for="resume in resumesData" :key="resume.id">
              <v-col cols="12">
                <v-card class="mb-3">
                  <v-card-title>{{ resume.title }}</v-card-title>
                  <v-card-text>
                    <v-btn @click="openResumePdf(resume.resume_pdf.data)" color="primary">View PDF</v-btn>
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
            <v-col cols="12">
              <p>No resumes found.</p>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </div>
  </v-container>
</template>
