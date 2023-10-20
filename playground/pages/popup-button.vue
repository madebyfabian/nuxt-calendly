<template>
  <!-- prettier-ignore -->
  <div class="container">
    <BackLink />

    <h1>Popup Button</h1>

    <UrlInputForm
      @url="url = $event"
      @change-state="state = $event"
    />

    <div ref="rootElement" />

    <CalendlyPopupButton
      v-if="rootElement && state === 'shouldLoad'"
      :url="url"
      text="Schedule time with me"
      :root-element="rootElement"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue"
  import { useSeoMeta } from "#imports"
  import { CalendlyPopupButton } from "#components"

  const rootElement = ref<HTMLElement>()

  const url = ref("")
  const state = ref<"idle" | "shouldLoad">("idle")

  useSeoMeta({
    title: "Popup Button",
  })
</script>
