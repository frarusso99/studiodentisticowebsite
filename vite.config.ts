import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/studiodentisticowebsite/', // Deve corrispondere al nome del tuo repository
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
