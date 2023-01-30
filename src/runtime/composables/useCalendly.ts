import type { CalendlyClient } from "../types"
import { useRuntimeConfig, useNuxtApp } from "#imports"

const initInlineWidget = () => {}

export const useCalendly = (): CalendlyClient => {
  const nuxtApp = useNuxtApp()
  const runtimeConfig = useRuntimeConfig()

  // console.log("useCalendly called", { nuxtApp, runtimeConfig })

  return {
    initInlineWidget: initInlineWidget,
  }
}
