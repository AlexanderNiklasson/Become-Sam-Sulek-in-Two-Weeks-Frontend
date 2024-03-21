import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: "assets", // Specify the directory where assets will be copied to in the build output
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
