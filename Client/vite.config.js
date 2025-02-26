import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  /*server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your backend server
        changeOrigin: true,
      },
    },
  },*/
  plugins: [react(), tailwindcss()],
});
