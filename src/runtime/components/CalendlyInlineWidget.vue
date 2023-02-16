<template>
  <!-- prettier-ignore -->
  <div
    class="calendly-inline-widget"
    style="min-width: 320px; height: 630px;"
  >
    <LoadingSpinner v-if="isLoading" />
    <iframe
      v-if="url"
      width="100%"
      height="100%"
      frameBorder="0"
      :title="props.iframeTitle || 'Calendly Scheduling Page'"
      :onLoad="onLoad"
      :src="src"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from "vue"
  import type { CalendlyInlineWidgetOptions } from "../types"
  import { formatCalendlyUrl } from "../utils"
  import LoadingSpinner from "./LoadingSpinner.vue"

  const props = defineProps<{
    url: string
    prefill?: CalendlyInlineWidgetOptions["prefill"]
    utm?: CalendlyInlineWidgetOptions["utm"]
    pageSettings?: CalendlyInlineWidgetOptions["pageSettings"]
    iframeTitle?: CalendlyInlineWidgetOptions["iframeTitle"]
  }>()

  const emit = defineEmits<{
    (e: "load"): void
  }>()

  const isLoading = ref<boolean>(true)

  const onLoad = () => {
    emit("load")
    isLoading.value = false
  }

  const src = computed(() => {
    return formatCalendlyUrl({
      url: props.url,
      pageSettings: props.pageSettings,
      prefill: props.prefill,
      utm: props.utm,
      embedType: "Inline",
    })
  })
</script>
