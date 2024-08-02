<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import ExperiencesServices from "../services/ExperiencesServices.js";

const experiences = ref([]);
const isAdd = ref(false);
const isEdit = ref(false);
const user = ref(null);
user.value = JSON.parse(localStorage.getItem("user"));
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

const loading = ref(true);

const newExperience = ref({
  employer: "",
  job_title: "",
  city: "",
  state: "",
  summary: "",
  start_year: "",
  end_year: "",
});

onMounted(async () => {
  await getExperiences();
  user.value = JSON.parse(localStorage.getItem("user"));
});

async function getExperiences() {
  loading.value = true;
  await ExperiencesServices.getExperiencesByUserId(user.value.id)
    .then((response) => {
      experiences.value = response.data;
      loading.value = false;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      loading.value = false;
    });
}

async function addExperience() {
  loading.value = true;
  isAdd.value = false;
  delete newExperience.id;
  await ExperiencesServices.addExperience(user.value.id, newExperience.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newExperience.value.job_title} added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      loading.value = false;
    });
  await getExperiences();
}

async function updateExperience() {
  loading.value = true;
  isEdit.value = false;
  await ExperiencesServices.updateExperience(newExperience.value.id, newExperience.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newExperience.value.job_title} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      loading.value = false;
    });
  await getExperiences();
}

async function deleteExperience(item) {
  if (confirm('Are you sure you want to delete ' + item.job_title)) {
    loading.value = true;
    await ExperiencesServices.deleteExperience(item.id);
  }
  await getExperiences();
}

function openAdd() {
  newExperience.value.employer = "";
  newExperience.value.job_title = "";
  newExperience.value.city = "";
  newExperience.value.state = "";
  newExperience.value.summary = "";
  newExperience.value.start_year = "";
  newExperience.value.end_year = "";
  isAdd.value = true;
}

function closeAdd() {
  isAdd.value = false;
}

function openEdit(item) {
  newExperience.value.id = item.id;
  newExperience.value.employer = item.employer;
  newExperience.value.job_title = item.job_title;
  newExperience.value.city = item.city;
  newExperience.value.state = item.state;
  newExperience.value.summary = item.summary;
  newExperience.value.start_year = item.start_year;
  newExperience.value.end_year = item.end_year;
  newExperience.value.user_id = user.value.id;
  isEdit.value = true;
}

function closeEdit() {
  isEdit.value = false;
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
        <v-col cols="12" sm="2" class="d-flex justify-center justify-sm-start">
          <v-btn color="primary" icon to="/userCrud">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" class="text-center text-sm-start">
          <v-card-title class="pl-0 text-h4 text-wrap font-weight-bold">
            Professional Experience
          </v-card-title>
        </v-col>
        <v-row>
          <v-col cols="12" class="d-flex justify-center justify-md-end">
            <v-btn v-if="user !== null" color="primary" @click="openAdd()">Add</v-btn>
          </v-col>
        </v-row>
      </v-row>
      <v-card v-if="!loading && experiences.length > 0" class="rounded-lg elevation-5">
        <v-card-text>
          <v-row class="d-none d-md-flex">
            <v-col cols="3" class="bg-indigo-lighten-2"><strong>Employer</strong></v-col>
            <v-col cols="3" class="bg-indigo-lighten-2"><strong>Job Title</strong></v-col>
            <v-col cols="2" class="bg-indigo-lighten-2"><strong>Start Date</strong></v-col>
            <v-col cols="2" class="bg-indigo-lighten-2"><strong>End Date</strong></v-col>
            <v-col cols="2" class="bg-indigo-lighten-2"><strong>Actions</strong></v-col>
          </v-row>
          <v-row v-for="item in experiences" :key="item.employer">
            <v-col cols="3"
              class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Employer</strong></v-col>
            <v-col cols="9" md="3">{{ item.employer }}</v-col>

            <v-col cols="3" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Job
                Title</strong></v-col>
            <v-col cols="9" md="3">{{ item.job_title }}</v-col>

            <v-col cols="3" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Start
                Date</strong></v-col>
            <v-col cols="9" md="2">{{ item.start_year }}</v-col>

            <v-col cols="3" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>End
                Date</strong></v-col>
            <v-col cols="9" md="2">{{ item.end_year }}</v-col>

            <v-col cols="3" class="bg-indigo-lighten-2 d-md-none text-right"><strong>Actions</strong></v-col>
            <v-col cols="9" md="2">
              <v-icon size="small" icon="mdi-pencil" class="mr-4" @click="openEdit(item)"></v-icon>
              <v-icon size="large" icon="mdi-delete" @click="deleteExperience(item)"></v-icon>
            </v-col>
            <v-divider class="d-block"></v-divider>
          </v-row>
        </v-card-text>
      </v-card>
      <v-col v-else-if="!loading && experiences.length === 0" class="text-h5 text-center">
        <span>Add Experience to your profile.</span>
      </v-col>
      <v-dialog persistent :model-value="isAdd || isEdit" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-item>
            <v-card-title class="headline mb-2">{{ isAdd ? "Add Experience" : isEdit ? "Edit Experience" : "" }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field v-model="newExperience.employer" label="Employer" required></v-text-field>
            <v-text-field v-model="newExperience.job_title" label="Title" required></v-text-field>
            <v-text-field v-model="newExperience.city" label="City" required></v-text-field>
            <v-text-field v-model="newExperience.state" label="State" required></v-text-field>
            <v-textarea v-model="newExperience.summary" label="Summary" required></v-textarea>
            <v-row align="center" class="mb-4">
              <v-col cols="12" sm="6">
                <v-text-field v-model="newExperience.start_year" label="Start year" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newExperience.end_year" label="End year" required></v-text-field>
              </v-col>
            </v-row>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="secondary"
              @click="isAdd ? closeAdd() : isEdit ? closeEdit() : false">Close</v-btn>
            <v-btn variant="flat" color="primary" @click="
              isAdd ? addExperience() : isEdit ? updateExperience() : false
              ">{{
                isAdd ? "Add Experience" : isEdit ? "Update Experience" : ""
              }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
