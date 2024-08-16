<template>
  <!-- prettier-ignore -->
  <button
    v-bind="$attrs"
    @click="onClick"
  >
    {{ props.text || 'Schedule time with me' }}
    <slot />
  </button>
  <PopupModal
    v-bind="props"
    :is-open="isOpen"
    :root-element="props.rootElement"
    @close="onClose"
  />
</template>

<script lang="ts" setup>
  import { ref } from "vue"
  import type { CalendlyPopupButtonOptions } from "../types"
  import PopupModal from "./PopupModal.vue"

  const props = defineProps<{
    url: CalendlyPopupButtonOptions["url"]
    rootElement: CalendlyPopupButtonOptions["rootElement"]
    text?: CalendlyPopupButtonOptions["text"]
    prefill?: CalendlyPopupButtonOptions["prefill"]
    utm?: CalendlyPopupButtonOptions["utm"]
    pageSettings?: CalendlyPopupButtonOptions["pageSettings"]
    iframeTitle?: CalendlyPopupButtonOptions["iframeTitle"]
  }>()

  const emit = defineEmits<{
    (e: "click"): void
    (e: "close"): void
  }>()

  const isOpen = ref<boolean>(false)

  defineExpose({
    isOpen,
  })

  const onClick = (e: Event) => {
    e.preventDefault()
    emit("click")
    isOpen.value = true
  }

  const onClose = (e: Event) => {
    e.stopPropagation()
    emit("close")
    isOpen.value = false
  }
</script>
