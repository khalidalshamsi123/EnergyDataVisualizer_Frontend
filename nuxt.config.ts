// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/ui"],
	runtimeConfig: {
		MAILHOST: process.env.MAILHOST,
		MAILPORT: process.env.MAILPORT,
		MAILUSER: process.env.MAILUSER,
		MAILPASSWORD: process.env.MAILPASSWORD,
		CONTACTMAIL: process.env.CONTACTMAIL,

		public: {
			baseUrl: process.env.BASE_URL || "http://127.0.0.1:8000",
		},
	},
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css'
	]
});