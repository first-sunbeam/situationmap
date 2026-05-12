import { createApp } from "vue";
import { registerSW } from "virtual:pwa-register";
import App from "./App.vue";
import { router } from "./router";
import "./styles.css";

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    updateSW(true);
  }
});

createApp(App).use(router).mount("#app");
