const plugin = require('tailwindcss/plugin');
const { util } = require('./utils');

module.exports = plugin(({ addComponents, theme }) => {
  const hljs = theme('hljs', {});

  if (!hljs.theme && !hljs.custom) {
    hljs.theme = 'default';
  }

  const hljsTheme = util.getTheme(hljs.theme);

  addComponents(hljsTheme);
});
