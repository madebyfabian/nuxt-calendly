<template>
  <!-- prettier-ignore -->
  <div>
    <button
      v-bind="$attrs"
      @click="onClick"
    >
      {{ props.text || 'Schedule time with me' }}
    </button>
    <PopupModal
      v-bind="props"
      :is-open="isOpen"
      :root-element="props.rootElement"
      @close="onClose"
    />
  </div>
</template>

<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>

<script setup lang="ts">
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
