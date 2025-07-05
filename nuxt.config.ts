// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", '@nuxt/image', 'nuxt-snackbar'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      siteURL: process.env.HOST,
    }
  },
  devServer: {
    port: 3000,
  },
  snackbar: {
    top: true,
    right: true,
    shadow: true,
    border: "left",
    duration: 5000,
  }
})