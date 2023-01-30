# 🗓️ Nuxt Calendly (⚠️ WIP)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> [Calendly](https://www.calendly.com) integration for [Nuxt 3](https://nuxt.com). This package is currently under development, but you can already use it in your Nuxt 3 projects.

- [✨ &nbsp;Release Notes](https://github.com/madebyfabian/nuxt-calendly/blob/main/CHANGELOG.md)
- [📖 &nbsp;Documentation](https://nuxt-calendly.vercel.app)
- [🛝 &nbsp;Playground](https://nuxt-calendly-playground.vercel.app/)
- [📦 &nbsp;NPM](https://www.npmjs.com/package/nuxt-calendly)

## Features

<!-- Highlight some of the features your module provide here -->

- 💪 &nbsp;Type safe integration of Calendly into your project
- 🧱 &nbsp;Auto-loaded components for [Inline Embed](https://help.calendly.com/hc/en-us/articles/223147027), [Popup widget](https://help.calendly.com/hc/en-us/articles/223147027), and [Pop-Up text](https://help.calendly.com/hc/en-us/articles/223147027)
- 🕹️ &nbsp;A `useCalendly()` composable to access all of calendly's [widget.js](https://assets.calendly.com/assets/external/widget.js) methods.
- 🔥 &nbsp;A `useCalendlyEventListener()` composable to listen to the windows [`message`](https://developer.calendly.com/api-docs/ZG9jOjI3ODM2MTAz-notifying-the-parent-window) events.
- 🛝 &nbsp;Visit the [Playground](https://nuxt-calendly-playground.vercel.app/) to try out all the functionalities of the module.
- 📦 &nbsp;All scripts, styles and assets are automatically injected into your project (no external scripts or stylesheets).
- ⚛️ &nbsp;Inspired by [react-calendly](https://github.com/tcampb/react-calendly)

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

  // entirely optional
  calendly: {},
})
```

That's it! You can now use 🗓️ Nuxt Calendly in your Nuxt app ✨

Check out the [Documentation](https://nuxt-calendly.vercel.app).

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
