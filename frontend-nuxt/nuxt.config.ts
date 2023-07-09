// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  devServer: {
    port: 8080,
  },
  components: [
    // { path: '~/components/authentication', prefix: 'Special' },
    { path: "~/components/icons", prefix: "Icon" },
    "~/components/authentication",
    "~/components",
  ],
});
