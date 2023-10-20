import CalendlyModule from ".."

export default defineNuxtConfig({
  modules: [CalendlyModule],
  app: {
    head: {
      titleTemplate: "%s · Nuxt Calendly",
      link: [
        {
          rel: "icon",
          href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗓️</text></svg>",
        },
      ],
    },
  },
})
