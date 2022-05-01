/* eslint-disable */

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const tailwindHighlight = require('../src/index');

describe('highlight.js plugin', () => {
  it('generates the default theme styles', () => {
    const inputPath = path.resolve(`${__dirname}/stubs/input.css`);
    const input = fs.readFileSync(inputPath, 'utf8');

    return postcss(
      tailwindcss({
        safelist: [
          {
            pattern: /hljs+/,
          },
        ],
        corePlugins: false,
        plugins: [tailwindHighlight],
      }),
    )
      .process(input, { from: inputPath })
      .then((result) => {
        const expected = fs.readFileSync(
          path.resolve(`${__dirname}/stubs/output.css`),
          'utf8',
        );

        expect(result.css).toBe(expected);
      });
  });

  it('generates the given official theme styles', () => {
    const inputPath = path.resolve(`${__dirname}/stubs/input.css`);
    const input = fs.readFileSync(inputPath, 'utf8');

    return postcss(
      tailwindcss({
        safelist: [
          {
            pattern: /hljs+/,
          },
        ],
        corePlugins: false,
        theme: {
          hljs: {
            theme: 'night-owl',
          },
        },
        plugins: [tailwindHighlight],
      }),
    )
      .process(input, { from: inputPath })
      .then((result) => {
        const expected = fs.readFileSync(
          path.resolve(`${__dirname}/stubs/output-night-owl.css`),
          'utf8',
        );

        expect(result.css).toBe(expected);
      });
  });

  it('generates the given theme styles from url', () => {
    const inputPath = path.resolve(`${__dirname}/stubs/input.css`);
    const input = fs.readFileSync(inputPath, 'utf8');
    const theme =
      'https://raw.githubusercontent.com/dracula/highlightjs/master/dracula.css';

    return postcss(
      tailwindcss({
        safelist: [
          {
            pattern: /hljs+/,
          },
        ],
        corePlugins: false,
        theme: {
          hljs: {
            theme: theme,
          },
        },
        plugins: [tailwindHighlight],
      }),
    )
      .process(input, { from: inputPath })
      .then((result) => {
        const expected = fs.readFileSync(
          path.resolve(`${__dirname}/stubs/output-from-url.css`),
          'utf8',
        );

        expect(result.css).toBe(expected);
      });
  });

  it('generates a custom theme from config', () => {
    const inputPath = path.resolve(`${__dirname}/stubs/input.css`);
    const input = fs.readFileSync(inputPath, 'utf8');

    return postcss(
      tailwindcss({
        safelist: [
          {
            pattern: /hljs+/,
          },
        ],
        corePlugins: false,
        theme: {
          hljs: {
            custom: {
              base: {
                padding: '1em',
                background: '#011627',
                color: '#d6deeb',
              },
              general: {
                keyword: {
                  color: '#000',
                  fontStyle: 'italic',
                },
                built_in: {
                  color: '#666',
                },
                type: {
                  color: '#000',
                },
              },
              meta: {
                'meta-keyword': {
                  color: '#000',
                },
              },
              tags: {
                tag: {
                  color: '#666',
                },
              },
            },
          },
        },
        plugins: [tailwindHighlight],
      }),
    )
      .process(input, { from: inputPath })
      .then((result) => {
        const expected = fs.readFileSync(
          path.resolve(`${__dirname}/stubs/output-from-custom.css`),
          'utf8',
        );

        expect(result.css).toBe(expected);
      });
  });

  it('customizes an official theme when custom styles are given', () => {
    const inputPath = path.resolve(`${__dirname}/stubs/input.css`);
    const input = fs.readFileSync(inputPath, 'utf8');

    return postcss(
      tailwindcss({
        safelist: [
          {
            pattern: /hljs+/,
          },
        ],
        corePlugins: false,
        theme: {
          hljs: {
            theme: 'night-owl',
            custom: {
              general: {
                type: {
                  fontStyle: 'italic',
                },
              },
            },
          },
        },
        plugins: [tailwindHighlight],
      }),
    )
      .process(input, { from: inputPath })
      .then((result) => {
        const expected = fs.readFileSync(
          path.resolve(`${__dirname}/stubs/output-customized-night-owl.css`),
          'utf8',
        );

        expect(result.css).toBe(expected);
      });
  });
});
