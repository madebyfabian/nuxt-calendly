<template>
  <!-- prettier-ignore -->
  <div class="container">
    <BackLink />

    <h1><code>useCalendlyEventListener() Composable</code></h1>

    <p>The <code>useCalendlyEventListener()</code> Composable is loaded like this:</p>

    <pre>
useCalendlyEventListener({
  onDateAndTimeSelected: event => {
    console.log("onDateAndTimeSelected", event)
  },
})
    </pre>

    <p>👋 Try to select a date + time in the widget and check your console</p>

    <br><br>
    <hr>
    <br><br>
    
    <UseCalendlyTest />
  </div>
</template>

<script lang="ts" setup>
  import { useCalendlyEventListener, useSeoMeta } from "#imports"


  useCalendlyEventListener({
    onDateAndTimeSelected: event => {
      console.log("onDateAndTimeSelected", event)
    },
  })


  useSeoMeta({
    title: "useCalendlyEventListener() Composable",
  })
</script>
