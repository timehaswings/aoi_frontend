import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { '@': '/src', '~': '/src' },
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      watchFiles: true,
      localEnabled: true,
      prodEnabled: false,
      supportTs: false,
    }),
  ],
});
