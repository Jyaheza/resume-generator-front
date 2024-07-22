import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/createResume",
      name: "createResume",
      component: () => import("./views/CreateResume.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./views/AdminHomepage.vue"),
    },
    {
      path: "/resumes",
      name: "resumes",
      component: () => import("./views/ResumeList.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/UserProfile.vue"),
    },
    {
      path: "/careerseviceshome",
      name: "careerserviceshome",
      component: () => import("./views/CareerServicesHomePage.vue"),
    },
  ],
});

export default router;
