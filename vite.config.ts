import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        "/api": "https://6762644f46efb37323746876.mockapi.io/",
    },
},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
