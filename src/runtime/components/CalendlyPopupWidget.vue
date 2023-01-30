<template>
  <!-- prettier-ignore -->
  <div
    className="calendly-badge-widget"
    @click="onClick"
  >
    <div
      className="calendly-badge-content"
      :style="style"
    >
      {{ props.text || "Schedule time with me" }}
      <span v-if="props.branding !== false">powered by Calendly</span>
    </div>
    <PopupModal
      v-bind="props"
      :is-open="isOpen"
      :root-element="props.rootElement"
      @close="onClose"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue"
  import type { CalendlyPopupWidgetOptions } from "../types"
  import PopupModal from "./PopupModal.vue"
  import { config } from "../../config"

  const props = defineProps<{
    url: CalendlyPopupWidgetOptions["url"]
    rootElement: Exclude<CalendlyPopupWidgetOptions["rootElement"], undefined>
    text?: CalendlyPopupWidgetOptions["text"]
    color?: CalendlyPopupWidgetOptions["color"]
    textColor?: CalendlyPopupWidgetOptions["textColor"]
    branding?: CalendlyPopupWidgetOptions["branding"]
    prefill?: CalendlyPopupWidgetOptions["prefill"]
    utm?: CalendlyPopupWidgetOptions["utm"]
    pageSettings?: CalendlyPopupWidgetOptions["pageSettings"]
    iframeTitle?: CalendlyPopupWidgetOptions["iframeTitle"]
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

  const style = computed(() => ({
    background: props.color || config.defaults.widgetBackgroundColor,
    color: props.textColor || config.defaults.widgetTextColor,
  }))
</script>
