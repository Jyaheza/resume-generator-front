<script setup>
import { onMounted } from "vue";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";

const router = useRouter();
const isCreateAccount = ref(false);
let isLoading = ref(false);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "" 
});

onMounted(async () => {
  if (localStorage.getItem("user") !== null) {
    router.push({ name: "resumes" }); // TODO: change this to appropriate landing page for signed in user's
  }
});

async function createAccount() {
  isLoading.value = true;
  user.value.role = "student";
  await UserServices.addUser(user.value)
    .then(() => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = "Account created successfully!";
      router.push({ name: "login" });
      user.value = {};
      isCreateAccount.value = false;
      isLoading.value = false;
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      isLoading.value = false;
    });
}

async function login() {
  isLoading.value = true;
  await UserServices.loginUser(user)
    .then((data) => {
      // Take the first and last name of the data from the window and set to a 
      // storage called menuBar to display in the menu bar
      window.localStorage.setItem("menuBarFirst", JSON.stringify(data.data.firstName));
      window.localStorage.setItem("menuBarLast", JSON.stringify(data.data.lastName));
      window.localStorage.setItem("menuBarEmail", JSON.stringify(data.data.email));
      // Save the data of the users login to local storage user
      window.localStorage.setItem("user", JSON.stringify(data.data));
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = "Login successful!";
      /*
      TODO: resume default redirect to resumes 
      after we create appropriate homepages for every user 
      */
      user.value = JSON.parse(localStorage.getItem('user'));
      if (user.value === null) {
        router.push({ name: "login" });
      } else {
        if (user.value.role == 'admin') {
          router.push({ name: "manageUsers" });
        }
        if (user.value.role == 'student') {
          router.push({ name: "resumes" });
        }
        if (user.value.role == 'career_serv') {
          router.push({ name: "careerserviceshome" });
        }
      }
    
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      isLoading.value = false;
    });
}

function openCreateAccount() {
  isCreateAccount.value = true;
}

function closeCreateAccount() {
  isCreateAccount.value = false;
}

function closeSnackBar() {
  snackbar.value.value = false;
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5 card">
        <v-card-title class="headline mb-2">Login </v-card-title>
        <v-card-text>
          <v-text-field v-model="user.email" label="Email" required></v-text-field>

          <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="outlined" @click="openCreateAccount()">Create Account</v-btn>
          <v-spacer></v-spacer>

          <v-btn variant="elevated" color="#000235" @click="login()">Sign in</v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog persistent v-model="isCreateAccount" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-title variant="outlined">Create Account </v-card-title>
          <v-card-text>
            <v-text-field v-model="user.firstName" label="First Name" required></v-text-field>

            <v-text-field v-model="user.lastName" label="Last Name" required></v-text-field>

            <v-text-field v-model="user.email" label="Email" required></v-text-field>

            <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeCreateAccount()">Close</v-btn>
            <v-btn @click="createAccount()">Create Account</v-btn>
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