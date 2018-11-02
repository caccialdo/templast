const _ = require('lodash')

module.exports = function replace (templateStr, replaceVars = {}) {
  if (!templateStr) {
    return ''
  }

  if (_.isEmpty(replaceVars)) {
    return templateStr
  }

  const templateVars = Object.keys(replaceVars)
  const regex = new RegExp('\\b(' + templateVars.map(_.escapeRegExp).join('|') + ')\\b', 'g')

  let output = ''
  let scanIndex = 0
  templateStr.replace(regex, (__, varName, startIndex) => {
    if (scanIndex < startIndex) {
      output += templateStr.substring(scanIndex, startIndex)
    }

    if (replaceVars[varName]) {
      output += replaceVars[varName]
    } else {
      output += varName
    }

    scanIndex = startIndex + varName.length
  })

  if (scanIndex < templateStr.length) {
    output += templateStr.substring(scanIndex, templateStr.length)
  }

  return output
}
