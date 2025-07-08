import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // vite.config.js or setupProxy.js (for CRA)
  proxy: {
    "/conversation/messages": {
      target: "http://localhost:3000", // or wherever your API runs
      changeOrigin: true,
      ws: true,
    },
  },
});
