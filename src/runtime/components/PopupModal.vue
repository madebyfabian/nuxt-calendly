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
      <div class="calendly-popup">
        <div class="calendly-popup-content">
          <PopupModalContent v-bind="childProps" />
        </div>
      </div>
      <button
        class="calendly-popup-close"
        aria-label="Close modal"
        style="display: block; border: none; padding: 0;"
        @click="e => emit('close', e)"
      />
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
  import { computed  } from "vue"
  import PopupModalContent from "../components/PopupModalContent.vue"
  import type { PopupModalOptions, PopupModalContentOptions } from "../types"
  
  interface BaseProps {}

  interface ContentProps extends BaseProps {
    url: PopupModalContentOptions["url"]
    prefill?: PopupModalContentOptions["prefill"]
    utm?: PopupModalContentOptions["utm"]
    pageSettings?: PopupModalContentOptions["pageSettings"]
    iframeTitle?: PopupModalContentOptions["iframeTitle"]
  }

  interface Props extends ContentProps {
    isOpen: PopupModalOptions["isOpen"]
    rootElement: PopupModalOptions["rootElement"]
  }

  const props = defineProps<Props>()

  const childProps = computed(() => {
    type Clone = ContentProps & Partial<Props>
    const copy: Clone = JSON.parse(JSON.stringify(props))
    delete copy.isOpen
    delete copy.rootElement
    return copy as Omit<Clone, 'isOpen' | 'rootElement'>
  })

  const emit = defineEmits<{
    (e: "close", event: Event): void
  }>()
</script>
