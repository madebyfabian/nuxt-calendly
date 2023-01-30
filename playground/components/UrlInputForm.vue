<template>
  <!-- prettier-ignore -->
  <form @submit.prevent="() => changeState('shouldLoad')">
    <label>
      Input a Calendly URL (e.g. `https://calendly.com/demo/30min`)
      <input
        v-model="url"
        type="url"
      ></label>

    <div class="buttons">
      <button
        type="submit"
        :disabled="!url || state === 'shouldLoad'"
        @click="() => changeState('shouldLoad')"
      >
        Load
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
  const url = ref("")
  const state = ref<State>("idle")

  const emit = defineEmits<{
    (e: "url", url: string): void
    (e: "changeState", state: State): void
  }>()

  watch(url, () => {
    emit("url", url.value)
  })

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

<style scoped>
  .buttons {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  input {
    width: 100%;
  }
</style>
