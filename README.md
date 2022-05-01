# Tailwind Highlight.js Plugin

Bake [highlight.js](https://highlightjs.org) themes directly into your [Tailwind Css](https://tailwindcss.com) build.

## Installation

First, install with NPM or Yarn:

```bash
npm install tailwind-highlightjs

## or

yarn add tailwind-highlightjs
```

Then, initialize the plugin:

```js
// tailwind.config.js

module.exports = {
  content: ['./src/**/*.html'],
  safelist: [{
    pattern: /hljs+/,
  }],
  theme: {},
  variants: {},
  plugins: [require('tailwind-highlightjs')],
};
```

> If you don't pass any options, the plugin uses the default theme for highlight.js.

## Don't Get Purged

Tailwind's JIT compiler will only generate css for classes used in your content by default. To ensure your Higlight.js theme styles are generated, you need to be sure to add them to the `safelist`. The easiest way to do that is by adding a regex pattern like the example below.

```js
// tailwind.config.js

module.exports = {
  content: ['./src/**/*.html'],
  safelist: [{
    pattern: /hljs+/,
  }],
  ...
};
```

> This will preserve all classes beginning with `hljs`.

## Configuration

This plugin allows you to configure which theme you want to use. You can choose from a list of the official themes or include a link to the raw css file you want to use.

To use an official theme:

```js
// tailwind.config.js

module.exports = {
  content: ['./src/**/*.html'],
  safelist: [{
    pattern: /hljs+/,
  }],
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
  content: ['./src/**/*.html'],
  safelist: [{
    pattern: /hljs+/,
  }],
  theme: {
    hljs: {
      theme: 'https://example.com/my-awesome-theme.css',
    },
  },
  plugins: [require('tailwind-highlightjs')],
};
```

### Custom Themes

This plugin also allows you to create a custom theme.

```js
// tailwind.config.js

module.exports = {
  content: ['./src/**/*.html'],
  safelist: [{
    pattern: /hljs+/,
  }],
  theme: {
    hljs: {
      custom: {
        base: {
          background: '#011627',
          color: '#d6deeb',
        },
        general: {
          keyword: {
            color: '#c792ea',
            fontStyle: 'italic',
          },
          built_in: {
            color: '#addb67',
            fontStyle: 'italic',
          },
          // other general styles
        },
        meta: {
          // meta styles
        },
        tags: {
          // tags, attributes, configs styles
        },
        text: {
          // text markup styles
        },
        css: {
          // css styles
        },
        templates: {
          // templates styles
        },
        diff: {
          // diff styles
        },
      },
    },
  },
  plugins: [require('tailwind-highlightjs')],
};
```

> The data structure is broken up into sections based on the official [hightlight.js css class reference](https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html). I highly recommend checking it out to learn more about custom themes.

#### Customizing another theme

Sometimes you may want to simply customize an existing theme. This plugin makes it as simple as can be. All you have to do is provide your custom styles along with the theme you want to customize.

```js
// tailwind.config.js

module.exports = {
  content: ['./src/**/*.html'],
  safelist: [{
    pattern: /hljs+/,
  }],
  theme: {
    hljs: {
      theme: 'night-owl',
      custom: {
        general: {
          type: {
            fontStyle: 'italic',
          },
          // other customizations
        },
      },
    },
  },
  plugins: [require('tailwind-highlightjs')],
};
```

This will merge your customizations with the theme you provide, overwriting any conflicting styles with your customizations.

## License

Tailwind Highlight.js Plugin is open-sourced software licensed under the [MIT license](LICENSE.md).
