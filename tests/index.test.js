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
});
