import { createRouter, createWebHistory } from "vue-router";
import SimpleFormView from "./views/SimpleFormView.vue";
import ExtendedView from "./views/ExtendedView.vue";
import AboutView from "./views/AboutView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "simple",
      component: SimpleFormView,
      meta: { heroKey: "forms", variant: "simple" },
    },
    {
      path: "/extended/:mode(incident|map)",
      name: "extended",
      component: ExtendedView,
      meta: { heroKey: "forms", variant: "extended" },
    },
    { path: "/extended", redirect: "/extended/incident" },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: { heroKey: "about" },
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});
