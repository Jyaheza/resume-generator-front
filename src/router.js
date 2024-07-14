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
      path: "/createresume",
      name: "createresume",
      component: () => import("./views/CreateResume.vue"),
    },
    {
      path: "/resumetemplate",
      name: "resumetemplate",
      component: () => import("./views/ResumeTemplate.vue"),
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
  ],
});

export default router;
