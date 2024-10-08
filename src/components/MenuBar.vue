<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import UserServices from '../services/UserServices';


const router = useRouter();

const drawer = ref(true);
const rail = ref(true);
const user = ref(null);
const title = ref("Resume Generator");

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user'));
  if (user.value != null) {
    user.value.firstName = JSON.parse(localStorage.getItem('menuBarFirst'));
    user.value.lastName = JSON.parse(localStorage.getItem('menuBarLast'));
    user.value.email = JSON.parse(localStorage.getItem('menuBarEmail'));
  }
  else {
    router.push({ name: "login" });
  }
});

function logout() {
  UserServices.logoutUser()
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
  localStorage.removeItem('user');
  localStorage.removeItem('menuBarFirst');
  localStorage.removeItem('menuBarLast');
  localStorage.removeItem('jobMatchResults');
  localStorage.removeItem('jobDescriptions');

  user.value = null;
  router.push({ name: 'login' });
}

function redirectToHome() {
  /*
  * Function to redirect user to proper homepage
  * based on the role
  */
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

}

const isMenuVisible = (menuItem) => {
  if (!user.value) return false;
  const role = user.value.role; // change role = "Admin" or "career services" to see the menu items change
  switch (role) {
    case 'admin':
      return true;
    case 'career_serv':
      return menuItem !== 'manageUsers';
    case 'student':
      return ['createResume', 'userCrud', 'home', 'matchWithJob'].includes(menuItem);
    default:
      return false;
  }
};
</script>

<template>
  <v-navigation-drawer expand-on-hover rail v-model="drawer" app permanent color="#000235">
    <v-list-item nav v-if='user'>
      <v-avatar color="accent" @click="router.push({ name: 'profile' })">
        <span class="white--text text-h5">
          {{ `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` }}
        </span>
      </v-avatar>
      <template v-slot:append>
        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divier></v-divier>
    <v-list density="compact" nav>
      <v-list-item v-if="isMenuVisible('home')" prepend-icon="mdi-home" title="Home"
        @click="redirectToHome()"></v-list-item>
      <v-list-item v-if="isMenuVisible('createResume')" prepend-icon="mdi-file-plus" title="Create Resume"
        @click="router.push({ name: 'createResume' })"></v-list-item>
      <v-list-item v-if="isMenuVisible('userCrud')" prepend-icon="mdi-account-tie" title="Professional Profile"
        @click="router.push({ name: 'userCrud' })"></v-list-item>
      <v-list-item v-if="isMenuVisible('review')" prepend-icon="mdi-star" title="Review Resumes"
        @click="router.push({ name: 'careerserviceshome' })"></v-list-item>
      <v-list-item v-if="isMenuVisible('manageUsers')" prepend-icon="mdi-account-multiple" title="Manage Users"
        @click="router.push({ name: 'manageUsers' })"></v-list-item>
      <v-list-item v-if="user" prepend-icon="mdi-logout" title="Logout" @click="logout()"></v-list-item>
      <v-list-item v-if="!user" prepend-icon="mdi-login" title="Login"
        @click="router.push({ name: 'login' })"></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app color="#000235" dark>
    <v-row>
      <v-col cols="3">
        <v-img @click="router.push({ name: 'resumes' })" style="cursor: pointer;" class="mx-2"
          :src="'https://c.animaapp.com/xe30pEHc/img/object-other-12.png'" height="50" width="50" contain></v-img>
      </v-col>
      <v-col cols="9" class="d-flex justify-center align-center">
        <v-toolbar-title class="title">
          {{ title }}
        </v-toolbar-title>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>


<style scoped>
/* Add any custom styles here */
</style>
