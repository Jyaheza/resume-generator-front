import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: () => import("./views/Homepage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/SignUp.vue"),
    },
    {
      path: "/createresume",
      name: "createresume",
      component: () => import("./views/CreateResume.vue"),
    },
    {
      path: "/studentprofile",
      name: "studentprofile",
      component: () => import("./views/ProfilePageStudent.vue"),
    },
    {
      path: "/careerservprofile",
      name: "careerservprofile",
      component: () => import("./views/ProfilePageCareerServ.vue"),
    },
    {
      path: "/adminprofile",
      name: "adminprofile",
      component: () => import("./views/ProfilePageAdmin.vue"),
    },
    {
      path: "/maintain",
      name: "maintain",
      component: () => import("./views/StoryMaintain.vue"),
    },
    {
      path: "/stories/:id",
      name: "readStory",
      component: () => import("./views/ReadStory.vue"),
    },
    {
      path: "/stories",
      name: "stories",
      component: () => import("./views/StoriesList.vue"),
    },
    {
      path: "/characters",
      name: "characters",
      component: () => import("./views/StoryCharacters.vue"),
    },
    {
      path: "/countries",
      name: "countries",
      component: () => import("./views/StoryCountries.vue"),
    },
    {
      path: "/languages",
      name: "languages",
      component: () => import("./views/StoryLanguages.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("./views/StorySettings.vue"),
    },
    {
      path: "/storypdf",
      name: "storypdf",
      component: () => import("./views/StoryPDF.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/UserProfile.vue"),
    },
  ],
});

export default router;
