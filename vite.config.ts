import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/map/",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.svg"],
      manifest: {
        name: "SituationMap",
        short_name: "SituationMap",
        description: "Formularze SituationMap do opisu sytuacji i mapy środowiska.",
        theme_color: "#173b37",
        background_color: "#f7f6f2",
        display: "standalone",
        start_url: "/map/",
        scope: "/map/",
        lang: "pl",
        icons: [
          {
            src: "pwa-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "pwa-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable"
          },
          {
            src: "apple-touch-icon.svg",
            sizes: "180x180",
            type: "image/svg+xml",
            purpose: "any"
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallbackDenylist: [/^\/map\/pdf\//, /^\/pdf\//]
      }
    })
  ]
}));
