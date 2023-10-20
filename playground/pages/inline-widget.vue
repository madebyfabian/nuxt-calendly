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
  import { useSeoMeta } from "#imports"
  import { CalendlyInlineWidget, BackLink } from "#components"
  import type { UrlInputFormState } from "@/types";

  const state = ref<UrlInputFormState>("idle")
  const url = ref("")

  useSeoMeta({
    title: "Inline Widget",
  })
</script>
