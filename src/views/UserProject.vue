<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import ProjectsServices from "../services/ProjectsServices.js";

const projects = ref([]);
const isAdd = ref(false);
const isEdit = ref(false);
const user = ref(null);
user.value = JSON.parse(localStorage.getItem("user"));
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});

const newProject = ref({
  project_title: "",
  location: "",
  summary: "",
  start_year: "",
  end_year: "",
});

onMounted(async () => {
  await getProjects();
  user.value = JSON.parse(localStorage.getItem("user"));
});

async function getProjects() {
  await ProjectsServices.getProjectsByUserId(user.value.id)
    .then((response) => {
      projects.value = response.data;
      console.log(projects)
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
}

async function addProject() {
  isAdd.value = false;
  delete newProject.id;
  await ProjectsServices.addProject(user.value.id, newProject.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newProject.value.project_title} added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getProjects();
}

async function updateProject() {
  isEdit.value = false;
  await ProjectsServices.updateProject(newProject.value.id, newProject.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newProject.name} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
  await getProjects();
}

async function deleteProject(item) {
  if (confirm('Are you sure you want to delete ' + item.project_title)) {
    ProjectsServices.deleteProject(item.id);
  }
  await getProjects();
}

function openAdd() {
  newProject.value.project_title = "",
    newProject.value.location = "",
    newProject.value.summary = "";
  newProject.value.start_year = "";
  newProject.value.end_year = "";
  isAdd.value = true;
}

function closeAdd() {
  isAdd.value = false;
}

function openEdit(item) {
  newProject.value.id = item.id;
  newProject.value.project_title = item.project_title,
    newProject.value.location = item.location,
    newProject.value.summary = item.summary;
  newProject.value.start_year = item.start_year;
  newProject.value.end_year = item.end_year;
  newProject.value.user_id = user.value.id;
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
            Projects
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
            <v-col cols="3" class="bg-indigo-lighten-2"><strong>Project Title</strong></v-col>
            <v-col cols="3" class="bg-indigo-lighten-2"><strong>Location</strong></v-col>
            <v-col cols="2" class="bg-indigo-lighten-2"><strong>Start Date</strong></v-col>
            <v-col cols="2" class="bg-indigo-lighten-2"><strong>End Date</strong></v-col>
            <v-col cols="2" class="bg-indigo-lighten-2"><strong>Actions</strong></v-col>
          </v-row>
          <v-row v-for="item in projects" :key="item.project_title">
            <v-col cols="4" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Project Title</strong></v-col>
            <v-col cols="8" md="3">{{ item.project_title }}</v-col>

            <v-col cols="4" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Location</strong></v-col>
            <v-col cols="8" md="3">{{ item.location }}</v-col>

            <v-col cols="4" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Start Date</strong></v-col>
            <v-col cols="8" md="2">{{ item.start_year }}</v-col>

            <v-col cols="4" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm "><strong>End Date</strong></v-col>
            <v-col cols="8" md="2">{{ item.end_year }}</v-col>

            <v-col cols="4" class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Actions</strong></v-col>
            <v-col cols="8" md="2">
              <v-icon size="small" icon="mdi-pencil" @click="openEdit(item)"></v-icon>
              <v-icon size="large" icon="mdi-delete" @click="deleteProject(item)"></v-icon>
            </v-col>
            <v-divider class="d-block"></v-divider>
          </v-row>
        </v-card-text>
      </v-card>

      <v-dialog persistent :model-value="isAdd || isEdit" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-item>
            <v-card-title class="headline mb-2">{{ isAdd ? "Add Project" : isEdit ? "Edit Project" : "" }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field
              v-model="newProject.project_title"
              label="Project Title"
              required
            ></v-text-field>
            <v-text-field
              v-model="newProject.location"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              v-model="newProject.summary"
              label="Summary"
              maxlength="120"
              counter
              single-line
              required
            ></v-textarea>
            <v-row align="center" class="mb-4">
              <v-col cols="12" sm="6">
                <v-text-field v-model="newProject.start_year" label="Start year" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newProject.end_year" label="End year" required></v-text-field>
              </v-col>
            </v-row>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="secondary"
              @click="isAdd ? closeAdd() : isEdit ? closeEdit() : false">Close</v-btn>
            <v-btn variant="flat" color="primary" @click="
              isAdd ? addProject() : isEdit ? updateProject() : false
              ">{{
                isAdd ? "Add Project" : isEdit ? "Update Project" : ""
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
