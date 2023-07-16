import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  console.log('mode', mode);
  const API_URL = mode === 'production' ? 'https://rolling-2szg.onrender.com' : 'http://localhost:5000';

  return {
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
  };
});
