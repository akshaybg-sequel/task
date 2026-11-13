import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'          // NEW
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],                 // NEW: tailwindcss() added
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      },
    },
  },
})
