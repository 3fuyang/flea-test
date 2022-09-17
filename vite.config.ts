import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCss from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), WindiCss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://106.15.78.201:8086/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup.ts']
  }
})
