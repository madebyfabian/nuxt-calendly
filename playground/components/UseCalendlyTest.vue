<template>
  <!-- prettier-ignore -->
  <div>
    <p>Input a Calendly URL (e.g. <code>https://calendly.com/demo/30min</code>)</p>
    <input
      v-model="url"
      type="url"
    >
    <div
      class="buttons buttons-grid"
      style="flex-direction: column; display: grid; grid-template-columns: repeat(3, 1fr);"
    >
      <button
        type="button"
        :disabled="!url"
        @click="handleInitBadgeWidget"
      >
        <code>initBadgeWidget()</code>
      </button>

      <button
        type="button"
        :disabled="!url"
        @click="handleInitPopupWidget"
      >
        <code>initPopupWidget()</code>
      </button>

      <button
        type="button"
        :disabled="!url"
        @click="handleInitInlineWidget"
      >
        <code>initInlineWidget()</code>
      </button>

      <button
        type="button"
        :disabled="!url"
        @click="handleShowPopupWidget"
      >
        <code>showPopupWidget()</code>
      </button>

      <button
        type="button"
        :disabled="!url"
        @click="handleClosePopupWidget"
      >
        Fire <code>showPopupWidget() + closePopupWidget() after 5s</code>
      </button>

      <button
        type="button"
        :disabled="!url"
        @click="handleDestroyBadgeWidget"
      >
        Fire <code>destroyBadgeWidget()</code>
      </button>
    </div>

    <div ref="rootElement" />

    <div
      v-if="initInlineWidgetFired"
      class="calendly-inline-widget"
      :data-url="url"
      style="min-width:320px; height: 630px; background: #f7f7f8"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useCalendly } from "#imports"
  import { ref } from "vue"
  const calendly = useCalendly()

  const rootElement = ref<HTMLElement>()

  const url = ref("https://calendly.com/demo/30min")
  const initInlineWidgetFired = ref(false)

  const handleInitBadgeWidget = () => {
    calendly.initBadgeWidget({
      url: url.value,
      text: "Schedule time with me",
      rootElement: rootElement.value,
    })
  }

  const handleInitPopupWidget = () => {
    calendly.initPopupWidget({
      url: url.value,
    })
  }

  const handleShowPopupWidget = () => {
    calendly.showPopupWidget(url.value)
  }

  const handleClosePopupWidget = () => {
    calendly.showPopupWidget(url.value)
    setTimeout(() => {
      calendly.closePopupWidget()
    }, 5000)
  }

  const handleDestroyBadgeWidget = () => {
    calendly.destroyBadgeWidget()
  }

  const handleInitInlineWidget = async () => {
    initInlineWidgetFired.value = true
    await new Promise((resolve) => setTimeout(resolve, 300))
    calendly.initInlineWidget()
  }
</script>

<style scoped>
  .buttons-grid button {
    height: 56px;
  }
</style>