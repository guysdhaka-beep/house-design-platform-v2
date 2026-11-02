import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    target: "esnext",

    cssCodeSplit: true,

    modulePreload: {
      polyfill: false,
    },

    reportCompressedSize: false,

    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react-router-dom")) {
            return "router";
          }

          if (
            id.includes("react-dom") ||
            id.includes("/react/")
          ) {
            return "react";
          }

          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
    ],
  },
});