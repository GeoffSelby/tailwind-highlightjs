const plugin = require('tailwindcss/plugin');
const getTheme = require('./utils');

module.exports = plugin(({ addComponents, theme }) => {
  const hljs = theme('hljs', {});

  if (!hljs.theme && !hljs.custom) {
    hljs.theme = 'default';
  }

  const hljsTheme = getTheme(hljs.theme, hljs.custom);

  addComponents(hljsTheme);
});
