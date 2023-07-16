// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const API_URL = process.env.NODE_ENV === 'production' ? 'https://rolling-2szg.onrender.com' : 'http://localhost:5000';

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
