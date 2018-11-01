const _ = require('lodash')

module.exports = function template (templateStr, templateVars = []) {
  if (!templateStr) {
    return () => ''
  }

  if (!templateVars.length) {
    return () => templateStr
  }

  const regex = new RegExp(templateVars.map(_.escapeRegExp).join('|'), 'g')
  const crumbs = []

  let scanIndex = 0
  templateStr.replace(regex, (varName, startIndex) => {
    if (scanIndex < startIndex) {
      crumbs.push(templateStr.substring(scanIndex, startIndex))
    }

    crumbs.push(templateVars.indexOf(varName))
    scanIndex = startIndex + varName.length
  })

  if (scanIndex < templateStr.length) {
    crumbs.push(templateStr.substring(scanIndex, templateStr.length))
  }

  // eslint-disable-next-line no-new-func
  return new Function(
    '__REPLACE_VARS__',
    'return ' + crumbs
      .map(crumb => {
        if (_.isNumber(crumb)) {
          return `(__REPLACE_VARS__["${templateVars[crumb]}"] || "${templateVars[crumb]}")`
        }

        return JSON.stringify(crumb)
      })
      .join('+')
  )
}
