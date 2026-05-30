import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // auth: POST /api/auth/access/ — без rewrite (на /auth/access/ бэкенд отвечает 405)
      '/api/chat': {
        target: 'https://cashapps.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/chat'),
      },
      '/api': {
        target: 'https://cashapps.ru',
        changeOrigin: true,
      },
    },
  },
})
