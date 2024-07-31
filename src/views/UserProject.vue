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
  await ProjectsServices.addProject(user.value.id,newProject.value)
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
  await ProjectsServices.updateProject(newProject.value.id,newProject.value)
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

async function deleteProject(item)
{
  if(confirm('Are you sure you want to delete ' + item.project_title)) {
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
        <v-col cols="1"  sm="1">
            <v-btn color="primary" icon to="/userCrud">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12"  sm="4">
        <v-card-title class="pl-0 text-h4 font-weight-bold">
                Projects
        </v-card-title>
        </v-col>
        <v-col class="d-flex justify-end" cols="12"  sm="7">
          <v-btn v-if="user !== null" color="primary" @click="openAdd()"
            >Add</v-btn
          >
        </v-col>
      </v-row>

      <v-table class="rounded-lg elevation-5">
        <thead>
          <tr>
            <th class="text-left">Project Title</th>
            <th class="text-left">Location</th>
            <th class="text-left">Start Date</th>
            <th class="text-left">End Date</th>

            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
        
          <tr v-for="item in projects" :key="item.project_title">
            <td>{{ item.project_title }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.start_year }}</td>
            <td>{{ item.end_year }}</td>
            <td>
              <v-icon
                size="small"
                icon="mdi-pencil"
                @click="openEdit(item)"
              ></v-icon>
              <v-icon
                size="large"
                icon="mdi-delete"
                @click="deleteProject(item)"
              ></v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-dialog persistent :model-value="isAdd || isEdit" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-item>
            <v-card-title class="headline mb-2"
              >{{ isAdd ? "Add Project" : isEdit ? "Edit Project" : "" }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field
              v-model="newProject.project_title"
              label="Employer"
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
              <v-col cols="12"  sm="6">
            <v-text-field
              v-model="newProject.start_year"
              label="Start year"
              required
            ></v-text-field>
              </v-col>
              <v-col cols="12"  sm="6">
            <v-text-field
              v-model="newProject.end_year"
              label="End year"
              required
            ></v-text-field>
          </v-col>
            </v-row>
            
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="flat"
              color="secondary"
              @click="isAdd ? closeAdd() : isEdit ? closeEdit() : false"
              >Close</v-btn
            >
            <v-btn
              variant="flat"
              color="primary"
              @click="
                isAdd ? addProject() : isEdit ? updateProject() : false
              "
              >{{
                isAdd ? "Add Project" : isEdit ? "Update Project" : ""
              }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn
            :color="snackbar.color"
            variant="text"
            @click="closeSnackBar()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>
