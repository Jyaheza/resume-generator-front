<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import ResumeDataService from "../services/ResumeDataServices";

const resumeData = ref([]);
const user = ref(null);
user.value = JSON.parse(localStorage.getItem("user"));
const snackbar = ref({
    value: false,
    color: "",
    text: "",
});
const loading = ref(true);

const newResumeHeader = ref({
    id: "",
    employer: "",
    job_title: "",
    city: "",
    state: "",
    summary: "",
    start_year: "",
    end_year: "",
});

onMounted(async () => {
    loading.value = true;
    await geteResumeHeader();
    user.value = JSON.parse(localStorage.getItem("user"));
    loading.value = false;
});

async function geteResumeHeader() {
    await ResumeDataService.getResumeDatasByUserId(user.value.id)
        .then((response) => {
            resumeData.value = response.data[0];
        })
        .catch((error) => {
            console.log(error);
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message;
        });
}

async function saveResumeData(id) {
    loading.value = true;
    newResumeHeader.value = resumeData.value;
    console.log(newResumeHeader.value);
    await ResumeDataService.updateResumeData(id, newResumeHeader.value)
        .then(() => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = `Personal Info updated successfully!`;
            loading.value = false;
        })
        .catch((error) => {
            console.log(error);
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message;
            loading.value = false;
        });
    await geteResumeHeader();
}

function closeSnackBar() {
    snackbar.value.value = false;
}
</script>

<template>
    <v-overlay :model-value="loading" contained persistent class="align-center justify-center">
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </v-overlay>
    <v-container>
        <div id="body">
            <v-row align="center" class="mb-4">
                <v-col cols="12" sm="2" class="d-flex justify-center">
                    <v-btn color="primary" icon to="/userCrud">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="6" class="text-center text-sm-start">
                    <v-card-title class="pl-0 text-h4 text-wrap font-weight-bold">
                        Personal Information
                    </v-card-title>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="text-grey ma-2">
                    Enter and update your basic personal information the way you would like it to appear in the header
                    of your resume.
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-card class="rounded-lg elevation-5">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="resumeData.full_name" label="Full Name"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="resumeData.user_email" label="Email" required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="resumeData.user_phone_number" label="Phone Number"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="resumeData.location" label="Location (City, State)"
                                        required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="resumeData.website_url" label="Website Url"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-textarea v-model="resumeData.summary" label="Summary"
                                        required></v-textarea>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-col cols="12" class="d-flex justify-end">
                                <v-btn variant="flat" color="primary"
                                    @click="saveResumeData(resumeData.id)">Save</v-btn>
                            </v-col>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-snackbar v-model="snackbar.value" rounded="pill">
                {{ snackbar.text }}
                <template v-slot:actions>
                    <v-btn :color="snackbar.color" variant="text" @click="closeSnackBar()">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </v-container>
</template>