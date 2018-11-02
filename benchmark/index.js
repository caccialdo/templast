/* global process */
const request = require('superagent')

const Templast = require('..')
const rollupReplace = require('../benchmark/alternatives/rollup-plugin-replace')

const ITERATION_COUNT = 1000

async function main () {
  const reactResponse = await request.get('https://unpkg.com/react-dom@16.6.0/umd/react-dom.development.js')
  const longString = reactResponse.body.toString('utf8')

  console.time('rollup-plugin-replace')
  for (let i = 0; i < ITERATION_COUNT; i++) {
    rollupReplace(longString, { fiber: '__FIBERS__' })
  }
  console.timeEnd('rollup-plugin-replace')

  console.time('Templast.replace')
  for (let i = 0; i < ITERATION_COUNT; i++) {
    Templast.replace(longString, { fiber: '__FIBERS__' })
  }
  console.timeEnd('Templast.replace')

  console.time('Templast.template')
  const templateFn = Templast.template(longString, ['fiber'])
  for (let i = 0; i < ITERATION_COUNT; i++) {
    templateFn({ fiber: '__FIBERS__' })
  }
  console.timeEnd('Templast.template')

  const templastReplaceOutput = Templast.replace(longString, { fiber: '__FIBERS__' })
  const templastTemplateOutput = templateFn({ fiber: '__FIBERS__' })
  const rollupPluginReplaceOutput = rollupReplace(longString, { fiber: '__FIBERS__' })
  console.log(`Outputs match: ${templastReplaceOutput === rollupPluginReplaceOutput && templastTemplateOutput === rollupPluginReplaceOutput}`)
}

main().catch(err => {
  console.error(err.stack)
  process.exit(1)
})
