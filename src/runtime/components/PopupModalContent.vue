<template>
  <!-- prettier-ignore -->
  <LoadingSpinner v-if="isLoading" />
  <!-- prettier-ignore -->
  <iframe
    width="100%"
    height="100%"
    frameBorder="0"
    :title="props.iframeTitle || 'Calendly Scheduling Page'"
    :onLoad="onLoad"
    :src="src"
  />
</template>

<script lang="ts" setup>
  import { ref, computed } from "vue"
  import { formatCalendlyUrl } from "../utils"
  import type { PopupModalContentOptions } from "../types"
  import LoadingSpinner from "./LoadingSpinner.vue"

  const props = defineProps<{
    url: PopupModalContentOptions["url"]
    prefill?: PopupModalContentOptions["prefill"]
    utm?: PopupModalContentOptions["utm"]
    pageSettings?: PopupModalContentOptions["pageSettings"]
    iframeTitle?: PopupModalContentOptions["iframeTitle"]
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
