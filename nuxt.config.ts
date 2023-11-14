// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],

	runtimeConfig:{
		public: {
			baseUrl: process.env.BASE_URL || "http://127.0.0.1:8000",
		},
	},
});