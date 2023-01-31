import { defineNuxtModule, createResolver, addComponent } from "@nuxt/kit"
import { fileURLToPath } from "url"
import { defu } from "defu"
import { promises as fsp } from "fs"
import { join, dirname } from "path"

// Module options TypeScript inteface definition
export interface ModuleOptions {
  /**
   * Setting to `false` disables the module.
   * @default true
   * @description Use this setting to disable the module.
   */
  isEnabled?: boolean

  /**
   * Loads the required CSS for Calendly.
   * @default true
   * @description Disable if you already load https://assets.calendly.com/assets/external/widget.css by yourself, or you want to load a custom CSS.
   */
  loadWidgetCSS?: boolean

  /**
   * Loads the required JS for Calendly, but only if you use the `useCalendly` composable.
   * @default true
   * @description Disable if you already load https://assets.calendly.com/assets/external/widget.js by yourself, or you want to load a custom JS.
   */
  loadWidgetJS?: boolean

  /**
   * Loads a required SVG Asset for Calendly.
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
    loadWidgetJS: true,
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

    const getJSAssetPath = ({ targetPath }: { targetPath: string }) => {
      // Write file to public dir of nuxt project
      const newFilePathBase = join(nuxt.options.rootDir, nuxt.options.dir.public)
      const newFilePath = join(newFilePathBase, targetPath)
      const newDirPath = dirname(newFilePath)
      console.log({public: nuxt.options.dir.public, rootDir: nuxt.options.rootDir, newFilePathBase, newFilePath, newDirPath});
      return { newDirPath, newFilePath }
    }

    /**
     * only works for JS files.
     * Since nuxt strips out everything else when `nuxt generate`, but not `nuxt build`.
     **/
    const addJSAsset = async ({ sourceFile, targetPath }: { sourceFile: string; targetPath: string }) => {
      // Read file from runtime dir
      const file = await fsp.readFile(join(runtimeDir, sourceFile), "utf-8")
      const { newDirPath, newFilePath } = getJSAssetPath({ targetPath })
      await fsp.mkdir(newDirPath, { recursive: true })
      await fsp.writeFile(newFilePath, file)
    }

    // Nuxt 3 and Bridge - inject script on runtime
    nuxt.hook("nitro:build:before", async () => {
      if (options.loadWidgetJS) {
        addJSAsset({ sourceFile: "/assets/external/widget.mjs", targetPath: "/nuxt-calendly/widget.js" })
      }
    })

    nuxt.options.build.transpile.push(runtimeDir)
  },
})
