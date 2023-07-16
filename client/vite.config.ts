import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const API_URL = process.env.NODE_ENV === 'production' ? 'https://rolling-2szg.onrender.com' : 'http://localhost:5000'
console.log('API_URL', API_URL[process.env.MODE || 'development'], process.env.MODE);
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    target: 'esnext',
    outDir: './dist',
    sourcemap: true,
  },
  define: {
    'process.env': {}, // Prevent process.env from being replaced during the build
  },
});
