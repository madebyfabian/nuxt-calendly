<template>
  <!-- prettier-ignore -->
  <form @submit.prevent="() => changeState('shouldLoad')">
    <p>Input a Calendly URL (e.g. <code>https://calendly.com/demo/30min</code>)</p>
    <input
      v-model="url"
      type="url"
    >

    <div class="buttons">
      <button
        type="submit"
        :disabled="!url || state === 'shouldLoad'"
        @click="() => changeState('shouldLoad')"
      >
        <slot name="primaryButton">
          Load
        </slot>
      </button>
      <button
        type="button"
        @click="() => changeState('idle')"
      >
        Destroy
      </button>
    </div>
  </form>
</template>

<script lang="ts">
  export type State = "idle" | "shouldLoad"

  //
</script>

<script setup lang="ts">
  import { ref, watch, onMounted } from "vue"

  const isLoaded = ref(false)
  const url = ref("https://calendly.com/demo/30min")
  const state = ref<State>("idle")

  const emit = defineEmits<{
    (e: "url", url: string): void
    (e: "changeState", state: State): void
  }>()

  watch(
    url,
    () => {
      emit("url", url.value)
    },
    { immediate: true }
  )

  const changeState = (state: State) => {
    emit("changeState", state)
    if (state === "idle") {
      isLoaded.value = false
    }
  }

  onMounted(() => {
    changeState("idle")
  })
</script>
