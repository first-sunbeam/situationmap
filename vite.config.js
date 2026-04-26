import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/situationmap/",
  plugins: [vue()]
}));
