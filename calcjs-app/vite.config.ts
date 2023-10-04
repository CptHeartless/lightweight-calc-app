import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [react()],
  server: {
    watch: {
      ignored: ['!**/node_modules/lw-math/**'],
    },
  },
  optimizeDeps: {
    exclude: ['lw-math'],
  },
  resolve: {
    preserveSymlinks: true,
  },
});
