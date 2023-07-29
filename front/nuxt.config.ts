// nuxt.config.js
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", '@pinia/nuxt'],
  devServer: {
    port: 8080,
  },
  components: [
    // { path: '~/components/authentication', prefix: 'Special' },
    { path: "~/components/icons", prefix: "Icon" },
    { path: "~/components/ui", prefix: "Ui" },
    "~/components/authentication",
    "~/components",
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
});
