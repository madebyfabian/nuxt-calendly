<template>
  <!-- prettier-ignore -->
  <Teleport
    v-if="isOpen"
    :to="rootElement"
  >
    <div
      v-bind="$attrs"
      class="calendly-overlay"
    >
      <div
        class="calendly-close-overlay"
        @click="e => emit('close', e)"
      />
      <div className="calendly-popup">
        <div className="calendly-popup-content">
          <PopupModalContent v-bind="childProps" />
        </div>
      </div>
      <button
        className="calendly-popup-close"
        aria-label="Close modal"
        style="display: block; border: none; padding: 0;"
        @click="e => emit('close', e)"
      />
    </div>
  </Teleport>
</template>

<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>

<script setup lang="ts">
  import { onMounted, computed } from "vue"
  import PopupModalContent from "../components/PopupModalContent.vue"
  import type { PopupModalOptions, PopupModalContentOptions } from "../types"

  const props = defineProps<{
    // content
    url: PopupModalContentOptions["url"]
    prefill?: PopupModalContentOptions["prefill"]
    utm?: PopupModalContentOptions["utm"]
    pageSettings?: PopupModalContentOptions["pageSettings"]
    iframeTitle?: PopupModalContentOptions["iframeTitle"]

    // main
    isOpen: PopupModalOptions["isOpen"]
    rootElement: PopupModalOptions["rootElement"]
  }>()

  const childProps = computed(() => {
    const { isOpen, rootElement, ...rest } = props
    return rest
  })

  const emit = defineEmits<{
    (e: "close", event: Event): void
  }>()

  onMounted(() => {
    if (!props.rootElement) {
      throw new Error("[nuxt-calendly]: PopupModal rootElement property cannot be undefined")
    }
  })
</script>
