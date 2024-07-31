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
  await EducationServices.getEducationsByUserId(user.value.id)
    .then((response) => {
      educations.value = response.data;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
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
        });
    await getEducation();
}

function closeEdit() {
  isEdit.value = false;
}

async function deleteEducation(item) {
    if (confirm('Are you sure you want to delete ' + item.education_name)) {
        EducationServices.deleteEducation(item.id);
    }
    await getEducation();
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
                Education
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
            <th class="text-left">University</th>
            <th class="text-left">Degree</th>
            <th class="text-left">Awards</th>
            <th class="text-left">Start Date</th>
            <th class="text-left">End Date</th>
            <th class="text-left">Coursework</th>
            <th class="text-left">GPA</th>
          </tr>
        </thead>
        <tbody>
        
          <tr v-for="item in educations" :key="item.education_name">
            <td>{{ item.education_name }}</td>
            <td>{{ item.degree_name }}</td>
            <td>{{ item.awards }}</td>
            <td>{{ item.start_year }}</td>
            <td>{{ item.end_year }}</td>
            <td>{{ item.coursework }}</td>
            <td>{{ item.gpa }}</td>
            <td>
              <v-icon
                size="small"
                icon="mdi-pencil"
                @click="openEdit(item)"
              ></v-icon>
              <v-icon
                size="large"
                icon="mdi-delete"
                @click="deleteEducation(item)"
              ></v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-dialog persistent :model-value="isAdd || isEdit" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-item>
            <v-card-title class="headline mb-2"
              >{{ isAdd ? "Add Education" : isEdit ? "Edit Education" : "" }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field
              v-model="newEd.education_name"
              label="University name"
              required
            ></v-text-field>
            <v-text-field
              v-model="newEd.degree_name"
              label="Degree"
              required
            ></v-text-field>
            <v-text-field
              v-model="newEd.location"
              label="Location"
              required
            ></v-text-field>
            <v-text-field
              v-model="newEd.gpa"
              label="GPA"
              required
            ></v-text-field>
            <v-textarea
              v-model="newEd.awards"
              label="Awards"
              required
            ></v-textarea>
            <v-textarea
              v-model="newEd.coursework"
              label="Course Work"
              required
            ></v-textarea>
            <v-row align="center" class="mb-4">
              <v-col cols="12"  sm="6">
            <v-text-field
              v-model="newEd.start_year"
              label="Start year"
              required
            ></v-text-field>
              </v-col>
              <v-col cols="12"  sm="6">
            <v-text-field
              v-model="newEd.end_year"
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
                isAdd ? addEducation() : isEdit ? updateEducation() : false
              "
              >{{
                isAdd ? "Add Education" : isEdit ? "Update Education" : ""
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