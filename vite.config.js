import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/situationmap/",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "favicon.svg", "favicon-16x16.png", "favicon-32x32.png", "apple-touch-icon.png"],
      manifest: {
        name: "SituationMap",
        short_name: "SituationMap",
        description: "Formularze SituationMap do opisu sytuacji i mapy środowiska.",
        theme_color: "#173b37",
        background_color: "#f7f6f2",
        display: "standalone",
        start_url: "/situationmap/",
        scope: "/situationmap/",
        lang: "pl",
        icons: [
          {
            src: "pwa-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any"
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024
      }
    })
  ]
}));
