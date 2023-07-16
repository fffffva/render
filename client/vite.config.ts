import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const API_URL = {
  development: 'http://localhost:5000',
  production: 'https://rolling-2szg.onrender.com',
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: API_URL[process.env.MODE || 'development'], // Fallback to development if MODE is not set
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
