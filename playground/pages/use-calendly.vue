<template>
  <!-- prettier-ignore -->
  <div class="container">
    <BackLink />

    <h1><code>useCalendly() Composable</code></h1>

    <UseCalendlyTest />
  </div>
</template>

<script setup lang="ts">
  import { useHead } from "#app"

  useHead({
    title: "useCalendly() Composable",
  })
</script>
