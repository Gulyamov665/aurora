import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["logo.png"],
      devOptions: {
        enabled: true, // 💥 это обязательно для локальной разработки!
      },

      manifest: {
        name: "Aurora",
        short_name: "Aurora",
        start_url: "/vendor",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@store": path.resolve(__dirname, "./src/store"), // Алиас для store
      "@": path.resolve(__dirname, "./src"), // Алиас для корня src
    },
  },
});
