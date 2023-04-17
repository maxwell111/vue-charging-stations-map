import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import StationPage from "../pages/StationPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/stations",
      name: "home",
      component: HomePage,
    },
    {
      path: "/stations/:id",
      name: "station",
      component: StationPage,
    },
  ],
});

export { router };
