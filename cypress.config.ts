import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
