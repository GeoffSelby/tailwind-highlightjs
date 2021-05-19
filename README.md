# Tailwind Highlight.js Plugin

Bake [highlight.js](https://highlightjs.org) themes directly into your [Tailwind Css](https://tailwindcss.com) build.

## Installation

First, install with NPM or Yarn:

```bash
npm install tailwind-highlightjs
// or
yarn add tailwind-highlightjs
```

Then, initialize the plugin:

```js
// tailwind.config.js

module.exports = {
  theme: {},
  variants: {},
  plugins: [require('tailwind-highlightjs')],
};
```

> If you don't pass any options, the plugin uses the default theme for highlight.js.

## Configuration

This plugin allows you to configure which theme you want to use. You can choose from a list of the official themes or include a link to the raw css file you want to use.

To use an official theme:

```js
// tailwind.config.js

module.exports = {
  theme: {
    hljs: {
      theme: 'night-owl',
    },
  },
  plugins: [require('tailwind-highlightjs')],
};
```

Using a third-party theme is just as simple. Just pass the link to the raw css file:

```js
// tailwind.config.js

module.exports = {
  theme: {
    hljs: {
      theme: 'https://example.com/my-awesome-theme.css',
    },
  },
  plugins: [require('tailwind-highlightjs')],
};
```
