<template>
  <!-- prettier-ignore -->
  <div class="container">
    <BackLink />

    <h1><code>useCalendly() Composable</code></h1>

    <p>The <code>useCalendly()</code> Composable is loaded like this:</p>

    <!-- eslint-disable vue/no-v-html -->
    <pre
      v-html="`
const calendly = useCalendly()
const rootElement = ref<HTMLElement>()

calendly.initBadgeWidget({
  url: url.value,
  text: 'Schedule time with me',
  rootElement: rootElement.value,
})
`"
    />

    <UseCalendlyTest />
  </div>
</template>

<script lang="ts" setup>
  import { useHead } from "#app"

  useHead({
    title: "useCalendly() Composable",
  })
</script>
