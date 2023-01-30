<template>
  <!-- prettier-ignore -->
  <div>
    <p>Input a Calendly URL (e.g. <code>https://calendly.com/demo/30min</code>)</p>
    <input
      v-model="url"
      type="url"
    >
    <div
      class="buttons"
      style="flex-direction: column"
    >
      <button
        type="button"
        :disabled="!url"
        @click="handleInitBadgeWidget"
      >
        Fire <code>handleInitBadgeWidget()</code>
      </button>

      <button
        type="button"
        :disabled="!url"
        @click="handleInitPopupWidget"
      >
        Fire <code>initPopupWidget()</code>
      </button>

      <button
        type="button"
        :disabled="!url"
        @click="handleShowPopupWidget"
      >
        Fire <code>showPopupWidget()</code>
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

      <button
        type="button"
        :disabled="!url"
        @click="handleInitInlineWidget"
      >
        Fire <code>initInlineWidget() (places it in a <code>.calendly-inline-widget</code> element)</code>
      </button>
    </div>

    <div ref="rootElement" />
    <div
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

  const handleInitInlineWidget = () => {
    calendly.initInlineWidget()
  }
</script>
