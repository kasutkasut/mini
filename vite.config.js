import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true,
    proxy: {
      '/api/doubao': {
        target: 'https://ark.cn-beijing.volces.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/doubao/, '/api/v3')
      },
      '/api/openai': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/openai/, '/v1')
      },
      '/api/elevenlabs': {
        target: 'https://api.elevenlabs.io',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/elevenlabs/, '/v1'),
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': process.env.VITE_ELEVENLABS_API_KEY
        }
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}) 