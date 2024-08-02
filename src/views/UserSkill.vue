<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import SkillsServices from "../services/SkillsServices.js";

const skills = ref([]);
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

const newSkill = ref({
  name: "",
});

onMounted(async () => {
  await getSkills();
  user.value = JSON.parse(localStorage.getItem("user"));
});

async function getSkills() {
  loading.value = true;
  await SkillsServices.getSkillsByUserId(user.value.id)
    .then((response) => {
      skills.value = response.data;
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

async function addSkill() {
  loading.value = true;
  isAdd.value = false;
  delete newSkill.id;
  await SkillsServices.addSkill(user.value.id, newSkill.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newSkill.value.name} added successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      loading.value = false;
    });
  await getSkills();
}

async function updateSkill() {
  loading.value = true;
  isEdit.value = false;
  await SkillsServices.updateSkill(newSkill.value.id, newSkill.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = `${newSkill.value.name} updated successfully!`;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      loading.value = false;
    });
  await getSkills();
}

async function deleteSkill(item) {
  if (confirm('Are you sure you want to delete ' + item.name)) {
    loading.value = true;
    await SkillsServices.deleteSkill(item.id);
  }
  await getSkills();
}

function openAdd() {
  newSkill.value.name = "";
  isAdd.value = true;
}

function closeAdd() {
  isAdd.value = false;
}

function openEdit(item) {
  newSkill.value.id = item.id;
  newSkill.value.name = item.name;
  newSkill.value.user_id = user.value.id;
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
            Skills
          </v-card-title>
        </v-col>
        <v-row>
          <v-col cols="12" class="d-flex justify-center justify-md-end">
            <v-btn v-if="user !== null" color="primary" @click="openAdd()">Add</v-btn>
          </v-col>
        </v-row>
      </v-row>
      <v-card v-if="!loading && skills.length > 0" class="rounded-lg elevation-5">
        <v-card-text>
          <v-row class="d-none d-md-flex">
            <v-col cols="6" class="bg-indigo-lighten-2"><strong>Name</strong></v-col>
            <v-col cols="6" class="bg-indigo-lighten-2"><strong>Actions</strong></v-col>
          </v-row>
          <v-row v-for="item in skills" :key="item.name">
            <v-col cols="4" md="10"
              class="bg-indigo-lighten-2 d-md-none text-right border-b-sm"><strong>Name</strong></v-col>
            <v-col cols="8" md="6">{{ item.name }}</v-col>

            <v-col cols="4" md="2" class="bg-indigo-lighten-2 d-md-none text-right"><strong>Actions</strong></v-col>
            <v-col cols="8" md="6">
              <v-icon size="small" icon="mdi-pencil" class="mr-4" @click="openEdit(item)"></v-icon>
              <v-icon size="large" icon="mdi-delete" @click="deleteSkill(item)"></v-icon>
            </v-col>
            <v-divider class="d-block"></v-divider>
          </v-row>
        </v-card-text>
      </v-card>
      <v-col v-else-if="!loading && skills.length === 0" class="text-h5 text-center">
        <span>Add Skills to your profile.</span>
      </v-col>
      <v-dialog persistent :model-value="isAdd || isEdit" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-item>
            <v-card-title class="headline mb-2">{{ isAdd ? "Add Skill" : isEdit ? "Edit Skill" : "" }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field v-model="newSkill.name" label="Name" required></v-text-field>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="secondary"
              @click="isAdd ? closeAdd() : isEdit ? closeEdit() : false">Close</v-btn>
            <v-btn variant="flat" color="primary" @click="
              isAdd ? addSkill() : isEdit ? updateSkill() : false
              ">{{
                isAdd ? "Add Skill" : isEdit ? "Update Skill" : ""
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
