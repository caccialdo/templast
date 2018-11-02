const replacePlugin = require('rollup-plugin-replace')

module.exports = function rollupReplace (templateStr, replaceVars = {}) {
  const options = {
    // rollup-plugin-replace requires at least one replace var :(
    values: Object.assign({ 'sÃƒÂ¥': '' }, replaceVars),
    // cf. https://github.com/rollup/rollup-plugin-replace/pull/23
    sourcemap: false,
    sourceMap: false
  }

  // The second argument of .transform() is normally the path to the file
  // being processed by rollup.
  // This file path is normally tested against a path minimatch expression.
  // Using empty string as the file path allows by-passing the minimatch test.
  const transformOutput = replacePlugin(options).transform(templateStr, '')

  if (!transformOutput || !transformOutput.code) {
    // There were no replacements to be made.
    // `rollup-plugin-replace` returns `null` in this scenario.
    return templateStr
  }

  return transformOutput.code
}
