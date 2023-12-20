// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxt/ui"],
    runtimeConfig: {
        public: {
            baseUrl: "http://127.0.0.1:8000",
        },
    },
});
