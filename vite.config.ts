import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ckan-api": {
        target: "https://ckan0.cf.opendata.inter.prod-toronto.ca",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ckan-api/, ""),
      },
    },
  },
});
