import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Added Tailwind CSS plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // Included Tailwind CSS in plugins
})