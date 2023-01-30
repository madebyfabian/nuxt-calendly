import CalendlyModule from ".."

export default defineNuxtConfig({
  modules: [CalendlyModule],
  app: {
    head: {
      titleTemplate: "%s · 🗓️ Nuxt Calendly",
    },
  },
})
