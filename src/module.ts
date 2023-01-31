import { defineNuxtModule, createResolver, addComponent } from "@nuxt/kit"
import { fileURLToPath } from "url"
import { defu } from "defu"

// Module options TypeScript inteface definition
export interface ModuleOptions {
  /**
   * Setting to `false` disables the module.
   * @default true
   * @description Use this setting to disable the module.
   */
  isEnabled?: boolean

  /**
   * Loads the required CSS for Calendly directly into your app. Saves a HTTP Request.
   * @default true
   * @description Disable if you already load https://assets.calendly.com/assets/external/widget.css by yourself, or you want to load a custom CSS.
   */
  loadWidgetCSS?: boolean

  /**
   * Loads a required SVG Asset for Calendly directly into your app. Saves a HTTP Request.
   * @default true
   * @description Disable if you already load https://assets.calendly.com/assets/external/close-icon.svg by yourself, or you want to load a custom SVG.
   */
  loadWidgetCloseIconSvg?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-calendly",
    configKey: "calendly",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    isEnabled: true,
    loadWidgetCSS: true,
    loadWidgetCloseIconSvg: true,
  },
  setup(options, nuxt) {
    if (!options.isEnabled) {
      console.warn("[nuxt-calendly] Module is disabled (`isEnabled` = `false`) and will not be loaded.")
      return
    }

    const resolver = createResolver(import.meta.url)

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url))

    // Add components
    addComponent({
      name: "CalendlyInlineWidget",
      filePath: resolver.resolve(runtimeDir, "components", "CalendlyInlineWidget.vue"),
    })
    addComponent({
      name: "CalendlyPopupButton",
      filePath: resolver.resolve(runtimeDir, "components", "CalendlyPopupButton.vue"),
    })
    addComponent({
      name: "CalendlyPopupWidget",
      filePath: resolver.resolve(runtimeDir, "components", "CalendlyPopupWidget.vue"),
    })

    // Add styles
    if (options.loadWidgetCSS) {
      nuxt.options.css.push(resolver.resolve(runtimeDir, "assets/external/widget.css"))
    }

    // Add composables
    nuxt.hook("imports:dirs", dirs => {
      dirs.push(resolver.resolve(runtimeDir, "composables"))
    })

    nuxt.hook("nitro:config", nitroConfig => {
      nitroConfig.alias = nitroConfig.alias || {}

      // Inline module runtime in Nitro bundle
      nitroConfig.externals = defu(typeof nitroConfig.externals === "object" ? nitroConfig.externals : {}, {
        inline: [resolver.resolve("./runtime")],
      })
    })

    nuxt.hook("prepare:types", options => {
      options.references.push({ path: resolver.resolve(nuxt.options.buildDir, "types/supabase.d.ts") })
    })

    nuxt.options.build.transpile.push(runtimeDir)
  },
})
