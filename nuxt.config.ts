// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@netlify/nuxt'
  ],

  imports: {
    dirs: ['../composables']
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light'
  },

  ui: {
    icons: ['heroicons']
  },

  runtimeConfig: {
    // Public runtime config (exposed to client)
    public: {
      appUrl: process.env.APP_URL || 'http://localhost:3000'
    }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
