import { createRouter, createWebHistory } from "vue-router";
import SimpleFormView from "./views/SimpleFormView.vue";
import ExtendedView from "./views/ExtendedView.vue";
import AboutView from "./views/AboutView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "simple",
      component: SimpleFormView,
      meta: { heroKey: "forms", variant: "simple" },
    },
    {
      path: "/incident",
      name: "incident",
      component: ExtendedView,
      meta: { heroKey: "forms", variant: "extended", mode: "incident" },
    },
    {
      path: "/environment",
      name: "environment",
      component: ExtendedView,
      meta: { heroKey: "forms", variant: "extended", mode: "map" },
    },
    { path: "/extended", redirect: "/incident" },
    { path: "/extended/incident", redirect: "/incident" },
    { path: "/extended/map", redirect: "/environment" },
    { path: "/extended/environment", redirect: "/environment" },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: { heroKey: "about" },
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});
