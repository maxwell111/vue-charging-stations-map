import { createApp } from "vue";

import "./assets/scss/style.scss";
import "leaflet/dist/leaflet.css";

import App from "./App.vue";
import { router } from "./router/index";

createApp(App).use(router).mount("#app");
