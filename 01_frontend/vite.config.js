import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// No postcss.config / tailwind.config needed: Tailwind v4 runs via its Vite plugin.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true, // bind 0.0.0.0 so the dev server is reachable from Docker
    strictPort: true,
  },
})
