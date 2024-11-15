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
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
