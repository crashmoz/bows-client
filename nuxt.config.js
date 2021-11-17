import colors from "vuetify/es5/util/colors";

export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: "static",
	server: {
		port: 3000,
		host: "0.0.0.0"
	},

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		titleTemplate: "%s - bows",
		title: "bows",
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ hid: "description", name: "description", content: "" }
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: [],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		{ src: "~/plugins/vuetify.js", ssr: false }
		// { src: '~/plugins/chart.js', ssr: false}
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		"@nuxtjs/vuetify"
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
		// https://go.nuxtjs.dev/pwa
		"@nuxtjs/pwa",
		// https://go.nuxtjs.dev/content
		"@nuxt/content",
		"vue-sweetalert2/nuxt",
		// 'cookie-universal-nuxt',
		["cookie-universal-nuxt", { alias: "cookiz" }],
		"nuxt-socket-io"
	],
	io: {
		sockets: [
			{
				url: "http://localhost:5000", // IO server lives here
				withCredentials: true
				// extraHeaders: {
				//   'my-custom-header': 'abcd',
				// },
			}
		]
	},
	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: {
		baseURL: "http://192.168.1.16:5000/"
	},

	// Content module configuration (https://go.nuxtjs.dev/config-content)
	content: {},

	// Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
	vuetify: {
		customVariables: ["~/assets/variables.scss"],
		theme: {
			options: {
				customProperties: true
			},
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {}
};
