import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mudules': path.resolve(__dirname, '/src/Apps/admin/modules'),
      '@utils': '/src/utils',
    },
  },
});