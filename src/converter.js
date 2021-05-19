const css = require('css');

function formatProperty(dec) {
  return dec.replace(/-(\w)/g, (a, b) => {
    return b.toUpperCase();
  });
}

function buildDeclarations(declarations) {
  const formattedDeclarations = {};
  declarations.forEach((dec) => {
    if (dec.type !== 'declaration') return;
    const property = formatProperty(dec.property);
    return (formattedDeclarations[property] = dec.value.replace(/"|'/g, ''));
  });
  return formattedDeclarations;
}

module.exports = function convertCSS(cssInput) {
  const ast = css.parse(cssInput);
  const cssInJs = {};

  ast.stylesheet.rules.forEach((rule) => {
    if (rule.type !== 'rule') return;

    const declarations = buildDeclarations(rule.declarations);
    const selector = rule.selectors.join(',\n');

    return (cssInJs[selector] = declarations);
  });

  return cssInJs;
};
