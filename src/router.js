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
      path: "/reviewResume",
      name: "reviewResume",
      component: () => import("./views/ReviewResume.vue"),
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
      path: "/userCrud",
      name: "userCrud",
      component: () => import("./views/UserCrud.vue"),
    },
    {
      path: "/certificate",
      name: "certificate",
      component: () => import("./views/UserCertificate.vue"),
    },
    {
      path: "/education",
      name: "education",
      component: () => import("./views/UserEducation.vue"),
    },
    {
      path: "/experience",
      name: "experience",
      component: () => import("./views/UserExperience.vue"),
    },
    {
      path: "/project",
      name: "project",
      component: () => import("./views/UserProject.vue"),
    },
    {
      path: "/skill",
      name: "skill",
      component: () => import("./views/UserSkill.vue"),
    },
    {
      path: "/manageUsers",
      name: "manageUsers",
      component: () => import("./views/ManageUsers.vue"),
    },
  ],
});

export default router;
