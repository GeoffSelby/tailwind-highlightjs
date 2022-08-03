const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');
const fetch = require('sync-fetch');
const merge = require('lodash.merge');
const convertCss = require('./converter');

module.exports = function getTheme(theme = null, custom = null) {
  let themeContents = {};
  let customTheme = {};

  if (theme) {
    themeContents = findTheme(theme);
  }

  if (custom) {
    customTheme = generateCustomTheme(custom);
  }

  return merge(themeContents, customTheme);
};

function findTheme(theme) {
  return isThemeOfficial(theme)
    ? getOfficialTheme(theme)
    : getThemeFromLink(theme);
}

function generateCustomTheme(custom) {
  let baseStyles = {};
  let customStyles = {};

  if (custom.base) {
    baseStyles = generateBaseStyles(custom.base);
  }

  Object.entries(custom).forEach(([key, value]) => {
    if (key !== 'base') {
      Object.entries(value).forEach(([key, value]) => {
        customStyles[`.hljs-${key}`] = value;
      });
    }
  });

  return merge(baseStyles, customStyles);
}

function generateBaseStyles(baseStyles) {
  const base = {
    '.hljs': {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
    },
  };

  const merged = merge(base['.hljs'], baseStyles);

  return {
    '.hljs': Object.assign(merged, {}),
  };
}

function isThemeOfficial(theme) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !pattern.test(theme);
}

function getOfficialTheme(theme) {
  const themePath = path.resolve(
    `${appRoot}/node_modules/highlight.js/styles/${theme}.css`,
  );
  const themeContents = fs.readFileSync(themePath, 'utf8');

  const styles = convertCss(themeContents);

  return styles;
}

function getThemeFromLink(theme) {
  const css = fetch(theme).text();

  return convertCss(css);
}
