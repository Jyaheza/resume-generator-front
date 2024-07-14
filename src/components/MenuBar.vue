<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import UserServices from '../services/UserServices';

const router = useRouter();

const drawer = ref(true);
const rail = ref(true);
const user = ref(null);

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem('user'));
  if (user.value != null) {
    user.value.firstName = JSON.parse(localStorage.getItem('menuBarFirst'));
    user.value.lastName = JSON.parse(localStorage.getItem('menuBarLast'));
    user.value.email = JSON.parse(localStorage.getItem('menuBarEmail'));
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
  user.value = null;
  router.push({ name: 'login' });
}

const isMenuVisible = (menuItem) => {
  if (!user.value) return false;
  const role = user.value.role;
  switch (role) {
    case 'Admin':
      return true;
    case 'career services':
      return menuItem !== 'manageUsers';
    case 'Student':
      return ['createResume', 'home', 'matchWithJob'].includes(menuItem);
    default:
      return false;
  }
};
</script>

<template>
  <v-app>
    <v-navigation-drawer
      expand-on-hover rail
      v-model="drawer"
      app
      permanent

      color="#000235"
    >
      <v-list-item nav v-if = 'user'>
        <v-avatar color="accent" @click="router.push({ name: 'profile'})">
                <span class="white--text text-h5">
                  {{ `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` }}
                </span>
              </v-avatar>
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
      </v-list-item>
       
      <v-divier></v-divier>

      <v-list density="compact" nav>
        <v-list-item
          v-if="isMenuVisible('createResume')"
          prepend-icon="mdi-pencil"
          title="Create Resume"
          @click="router.push({ name: 'createResume' })"
        ></v-list-item>
        <v-list-item
          v-if="isMenuVisible('matchWithJob')"
          prepend-icon="mdi-briefcase-search"
          title="Match With Job"
          @click="router.push({ name: 'matchWithJob' })"
        ></v-list-item>
        <v-list-item
          v-if="isMenuVisible('review')"
          prepend-icon="mdi-star"
          title="Review"
          @click="router.push({ name: 'review' })"
        ></v-list-item>
        <v-list-item
          v-if="isMenuVisible('home')"
          prepend-icon="mdi-home"
          title="Home"
          @click="router.push({ name: 'resumes' })"
        ></v-list-item>
        <v-list-item
          v-if="isMenuVisible('manageUsers')"
          prepend-icon="mdi-account-multiple"
          title="Manage Users"
          @click="router.push({ name: 'manageUsers' })"
        ></v-list-item>
        <v-list-item
          v-if="user"
          prepend-icon="mdi-logout"
          title="Logout"
          @click="logout()"
        ></v-list-item>
        <v-list-item
          v-if="!user"
          prepend-icon="mdi-login"
          title="Login"
          @click="router.push({ name: 'login' })"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#000235" dark>
      <v-toolbar-title class="title">
        {{ 'Resume Generator' }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
/* Add any custom styles here */
</style>
