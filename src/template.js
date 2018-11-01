const _ = require('lodash')

module.exports = function template (str, replaceVars = []) {
  if (!str) {
    return () => ''
  }

  if (!replaceVars.length) {
    return () => str
  }

  const regex = new RegExp(replaceVars.map(_.escapeRegExp).join('|'), 'g')
  const crumbs = []

  let scanIndex = 0
  str.replace(regex, (varName, startIndex) => {
    if (scanIndex < startIndex) {
      crumbs.push(str.substring(scanIndex, startIndex))
    }

    crumbs.push(replaceVars.indexOf(varName))
    scanIndex = startIndex + varName.length
  })

  if (scanIndex < str.length) {
    crumbs.push(str.substring(scanIndex, str.length))
  }

  // eslint-disable-next-line no-new-func
  return new Function(
    '__REPLACE_VARS__',
    'return ' + crumbs
      .map(crumb => {
        if (_.isNumber(crumb)) {
          return `(__REPLACE_VARS__["${replaceVars[crumb]}"] || "${replaceVars[crumb]}")`
        }

        return JSON.stringify(crumb)
      })
      .join('+')
  )
}
