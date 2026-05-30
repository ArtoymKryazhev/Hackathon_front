import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // /api/* без rewrite: /api/auth/* и /api/chat/* на cashapps.ru тоже под /api/
      '/api': {
        target: 'https://cashapps.ru',
        changeOrigin: true,
      },
    },
  },
})
