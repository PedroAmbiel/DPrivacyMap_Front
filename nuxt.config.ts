// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules:[
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  primevue: {},
})