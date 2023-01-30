# 🗓️ Nuxt Calendly

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> [Calendly](https://www.calendly.com) integration for [Nuxt 3](https://nuxt.com)

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- 🧱 &nbsp;Pre-made components for [Inline Embed](https://help.calendly.com/hc/en-us/articles/223147027), [Popup widget](https://help.calendly.com/hc/en-us/articles/223147027), and [Pop-Up text](https://help.calendly.com/hc/en-us/articles/223147027)
- 🕹️ &nbsp;A `useCalendly()` composable to access all of calendly's [widget.js](https://assets.calendly.com/assets/external/widget.js) methods.
- 🔥 &nbsp;A `useCalendlyEventListener()` composable to listen to the windows [`message`](https://developer.calendly.com/api-docs/ZG9jOjI3ODM2MTAz-notifying-the-parent-window) events.

## Quick Setup

1. Add `nuxt-calendly` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-calendly

# Using yarn
yarn add --dev nuxt-calendly

# Using npm
npm install --save-dev nuxt-calendly
```

2. Add `nuxt-calendly` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["nuxt-calendly"],
})
```

That's it! You can now use 🗓️ Nuxt Calendly in your Nuxt app ✨

Check out the [Playground](https://nuxt-calendly.vercel.app) for a documentation, examples and a live demo.

---

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-calendly/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-calendly
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-calendly.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-calendly
[license-src]: https://img.shields.io/npm/l/nuxt-calendly.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-calendly
