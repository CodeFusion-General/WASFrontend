import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        // Eğer birden fazla giriş noktası varsa, onları burada belirtebilirsiniz
        // about: 'about.html',
        // contact: 'contact.html'
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Tüm node_modules dosyalarını ayrı bir chunk içine al
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Chunk boyutu uyarı limitini artırmak için
  },
  base: './', // Bu ayar, dosya yollarının doğru çalışmasını sağlar
});
