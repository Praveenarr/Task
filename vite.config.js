// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace with your actual webhook URL from webhook.site
const WEBHOOK_URL = "https://webhook.site/e0a66c36-7e98-4155-9106-6736e76da698";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request starting with /api will be proxied to webhook.site
      "/api": {
        target: WEBHOOK_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove /api prefix when sending
      },
    },
  },
});
