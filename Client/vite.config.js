import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://brickbybrick-a-real-estate-website.onrender.com", // Your backend server
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
