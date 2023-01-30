<template>
  <!-- prettier-ignore -->
  <div class="container">
    <BackLink />

    <h1>Inline Widget</h1>

    <UrlInputForm
      @url="url = $event"
      @change-state="state = $event"
    />

    <CalendlyInlineWidget
      v-if="state === 'shouldLoad'"
      :url="url"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue"
  import { useHead } from "#app"
  import { CalendlyInlineWidget, BackLink } from "#components"
  import type { State } from "../components/UrlInputForm.vue"

  const state = ref<State>("idle")
  const url = ref("")

  useHead({
    title: "Inline Widget",
  })
</script>
