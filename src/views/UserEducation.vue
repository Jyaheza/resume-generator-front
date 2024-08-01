<script setup>

import { onMounted } from "vue";
import { ref } from "vue";
import EducationServices from "../services/EducationServices";

const isAdd = ref(false);
const isEdit = ref(false);
const user = ref(null);
const educations = ref([]);
user.value = JSON.parse(localStorage.getItem("user"));
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

const loading = ref(true);

const newEd = ref({
  education_name: "",
  location: "",
  start_year: "",
  end_year: "",
  degree_name: "",
  gpa: "",
  awards: "",
  coursework: "",
  user_id: "",
});

onMounted(async () => {
  await getEducation();
  user.value = JSON.parse(localStorage.getItem("user"));
});

async function getEducation() {
  loading.value = true;
  await EducationServices.getEducationsByUserId(user.value.id)
    .then((response) => {
      educations.value = response.data;
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

function openAdd() {
  newEd.value.education_name = "",
  newEd.value.awards = "",
  newEd.value.degree_name = "";
  newEd.value.start_year = "";
  newEd.value.end_year = "";
  newEd.value.coursework = "";
  newEd.value.location = "";
  newEd.value.gpa = "";
  isAdd.value = true;
}


async function addEducation() {
  loading.value = true;
  isAdd.value = false;
  newEd.value.user_id = user.value.id;
  await EducationServices.addEducation(newEd.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newEd.value.education_title} added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      loading.value = false;
    });
  await getEducation();
}

function closeAdd() {
  isAdd.value = false;
}

function openEdit(item) {
  newEd.value.education_name = item.education_name,
  newEd.value.location = item.location,
  newEd.value.awards = item.awards;
  newEd.value.start_year = item.start_year;
  newEd.value.end_year = item.end_year;
  newEd.value.degree_name = item.degree_name;
  newEd.value.coursework = item.coursework;
  newEd.value.gpa = item.gpa;
  newEd.value.id = item.id;
  isEdit.value = true;
}

async function updateEducation() {
  loading.value = true;
  isEdit.value = false;
  newEd.value.user_id = user.value.id;
  await EducationServices.updateEducation(newEd.value.id, newEd.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newEd.value.education_name} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      loading.value = false;
    });
  await getEducation();
}

function closeEdit() {
  isEdit.value = false;
}

async function deleteEducation(item) {
  if (confirm('Are you sure you want to delete ' + item.education_name)) {
    loading.value = true;
    await EducationServices.deleteEducation(item.id);
  }
  await getEducation();
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
            Education
          </v-card-title>
        </v-col>
        <v-row>
          <v-col cols="12" class="d-flex justify-center justify-md-end">
            <v-btn v-if="user !== null" color="primary" @click="openAdd()">Add</v-btn>
          </v-col>
        </v-row>
      </v-row>
      <v-card class="rounded-lg elevation-5">
        <v-card-text>
          <v-row class="d-none d-md-flex">
            <v-col cols="3" class="bg-indigo-lighten-2"><strong>University</strong></v-col>
            <v-col cols="3" class="bg-indigo-lighten-2"><strong>Degree</strong></v-col>
            <v-col cols="2" class="bg-indigo-lighten-2"><strong>Start Date</strong></v-col>
            <v-col cols="2" class="bg-indigo-lighten-2"><strong>End Date</strong></v-col>
            <v-col cols="2" class="bg-indigo-lighten-2"><strong>Actions</strong></v-col>
          </v-row>
          <v-row v-for="item in educations" :key="item.education_name">
            <v-col cols="3"
              class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>University</strong></v-col>
            <v-col cols="9" md="3">{{ item.education_name }}</v-col>

            <v-col cols="3" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Degree</strong></v-col>
            <v-col cols="9" md="3">{{ item.degree_name }}</v-col>

            <v-col cols="3" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Start
                Date</strong></v-col>
            <v-col cols="9" md="2">{{ item.start_year }}</v-col>

            <v-col cols="3" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>End
                Date</strong></v-col>
            <v-col cols="9" md="2">{{ item.end_year }}</v-col>

            <v-col cols="3"
              class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Actions</strong></v-col>
            <v-col cols="9" md="2">
              <v-icon size="small" icon="mdi-pencil mr-4" @click="openEdit(item)"></v-icon>
              <v-icon size="large" icon="mdi-delete" @click="deleteEducation(item)"></v-icon>
            </v-col>
            <v-divider class="d-block"></v-divider>
          </v-row>
        </v-card-text>
      </v-card>

      <v-dialog persistent :model-value="isAdd || isEdit" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-item>
            <v-card-title class="headline mb-2">{{ isAdd ? "Add Education" : isEdit ? "Edit Education" : "" }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field v-model="newEd.education_name" label="University name" required></v-text-field>
            <v-text-field v-model="newEd.degree_name" label="Degree" required></v-text-field>
            <v-text-field v-model="newEd.location" label="Location" required></v-text-field>
            <v-text-field v-model="newEd.gpa" label="GPA" required></v-text-field>
            <v-textarea v-model="newEd.awards" label="Awards" required></v-textarea>
            <v-textarea v-model="newEd.coursework" label="Course Work" required></v-textarea>
            <v-row align="center" class="mb-4">
              <v-col cols="12" sm="6">
                <v-text-field v-model="newEd.start_year" label="Start year" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newEd.end_year" label="End year" required></v-text-field>
              </v-col>
            </v-row>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="secondary"
              @click="isAdd ? closeAdd() : isEdit ? closeEdit() : false">Close</v-btn>
            <v-btn variant="flat" color="primary" @click="
              isAdd ? addEducation() : isEdit ? updateEducation() : false
              ">{{
                isAdd ? "Add Education" : isEdit ? "Update Education" : ""
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