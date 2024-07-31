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

const newSkill = ref({
    name: "",
});

onMounted(async () => {
  await getSkills();
  user.value = JSON.parse(localStorage.getItem("user"));
});

async function getSkills() {
  await SkillsServices.getSkillsByUserId(user.value.id)
    .then((response) => {
      skills.value = response.data;
      console.log(skills)
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
}

async function addSkill() {
  isAdd.value = false;
  delete newSkill.id;
  await SkillsServices.addSkill(user.value.id,newSkill.value)
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
    });
  await getSkills();
}

async function updateSkill() {
  isEdit.value = false;
  await SkillsServices.updateSkill(newSkill.value.id,newSkill.value)
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
    });
  await getSkills();
}

async function deleteSkill(item)
{
  if(confirm('Are you sure you want to delete ' + item.name)) {
    SkillsServices.deleteSkill(item.id);
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
                Skills
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
            <th class="text-left">Name</th>

            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
        
          <tr v-for="item in skills" :key="item.name">
            <td>{{ item.name }}</td>
            <td class="text-left">
              <v-icon
                size="small"
                icon="mdi-pencil"
                @click="openEdit(item)"
              ></v-icon>
              <v-icon
                size="large"
                icon="mdi-delete"
                @click="deleteSkill(item)"
              ></v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-dialog persistent :model-value="isAdd || isEdit" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-item>
            <v-card-title class="headline mb-2"
              >{{ isAdd ? "Add Skill" : isEdit ? "Edit Skill" : "" }}
            </v-card-title>
          </v-card-item>
          <v-card-text>
            <v-text-field
              v-model="newSkill.name"
              label="Name"
              required
            ></v-text-field>
            
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
                isAdd ? addSkill() : isEdit ? updateSkill() : false
              "
              >{{
                isAdd ? "Add Skill" : isEdit ? "Update Skill" : ""
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
