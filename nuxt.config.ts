// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules:[
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, tailwind-utilities, primevue '
        },
      },
    },
  },
  ssr: false,
})