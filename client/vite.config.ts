// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { API_URL } from './apiConfig';
console.log('API_URL', API_URL)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext',
    outDir: './dist',
    sourcemap: true,
  },
});
