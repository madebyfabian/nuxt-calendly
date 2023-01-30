<template>
  <div class="container">
    <h1>🗓️ Nuxt Calendly</h1>
    <p>Demo Playground</p>

    <h2>Components</h2>
    <ul>
      <li>
        <NuxtLink to="/inline-widget">
          <span>Inline Widget</span>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/popup-button">
          <span>Popup Button</span>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/popup-widget">
          <span>Popup Widget</span>
        </NuxtLink>
      </li>
    </ul>

    <h2><code>useCalendly()</code> Composable</h2>
    <ul>
      <li>
        <NuxtLink to="/use-calendly">
          <span><code>useCalendly()</code></span>
        </NuxtLink>
      </li>
    </ul>

    <h2><code>useCalendlyEventListener()</code> Composable</h2>
    <ul>
      <li>
        <NuxtLink to="/use-calendly-event-listener">
          <span><code>useCalendlyEventListener()</code></span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { useHead } from "#app"

  useHead({
    title: "Playground",
  })
</script>

<style scoped>
  h2 {
    margin-top: 2rem;
  }
</style>
