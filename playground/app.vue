<template>
  <NuxtPage />
</template>

<style>
  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }

  .container {
    max-width: 768px;
    padding: 2rem 1.5rem;
    margin: 0 auto;
  }

  input {
    display: block;
    margin: 1rem 0;
    width: 100%;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  pre {
    padding: 16px;
    background: #f7f7f8;
  }
</style>
