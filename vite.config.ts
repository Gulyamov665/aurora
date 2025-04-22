import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.lottie"],
  resolve: {
    alias: {
      "@store": path.resolve(__dirname, "./src/store"), // Алиас для store
      "@": path.resolve(__dirname, "./src"), // Алиас для корня src
    },
  },
});
