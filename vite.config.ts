import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'
import dotenv from 'dotenv'
import { fileURLToPath, URL } from 'node:url'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
