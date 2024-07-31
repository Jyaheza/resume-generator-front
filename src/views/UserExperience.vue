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
  await ExperiencesServices.getExperiencesByUserId(user.value.id)
    .then((response) => {
      experiences.value = response.data;
      console.log(experiences)
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
}

async function addExperience() {
  isAdd.value = false;
  delete newExperience.id;
  await ExperiencesServices.addExperience(user.value.id, newExperience.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newExperience.value.name} added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getExperiences();
}

async function updateExperience() {
  isEdit.value = false;
  await ExperiencesServices.updateExperience(newExperience.value.id, newExperience.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newExperience.name} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getExperiences();
}

async function deleteExperience(item) {
  if (confirm('Are you sure you want to delete ' + item.job_title)) {
    ExperiencesServices.deleteExperience(item.id);
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

      <v-table class="rounded-lg elevation-5">
        <thead>
          <tr>
            <th class="text-left">Employer</th>
            <th class="text-left">Job Title</th>
            <th class="text-left">Start Date</th>
            <th class="text-left">End Date</th>

            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="item in experiences" :key="item.employer">
            <td>{{ item.employer }}</td>
            <td>{{ item.job_title }}</td>
            <td>{{ item.start_year }}</td>
            <td>{{ item.end_year }}</td>
            <td>
              <v-icon size="small" icon="mdi-pencil" @click="openEdit(item)"></v-icon>
              <v-icon size="large" icon="mdi-delete" @click="deleteExperience(item)"></v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>

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
            <v-textarea v-model="newExperience.summary" label="Summary" maxlength="120" counter single-line
              required></v-textarea>
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
