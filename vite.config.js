import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, './src'), '~': path.resolve(__dirname, '/src') },
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      watchFiles: true,
      localEnabled: true,
      prodEnabled: false,
      supportTs: false,
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
    }),
  ],
});
