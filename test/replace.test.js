/* global test, expect */
const Templast = require('..')
const rollupReplace = require('../benchmark/alternatives/rollup-plugin-replace')

const scenarii = [{
  title: 'One var in the middle of the template',
  template: 'Hello WORLD!',
  replaceVars: { WORLD: 'world' },
  result: 'Hello world!'
}, {
  title: 'Two vars in the middle of the template',
  template: 'Hello NAME SURNAME!',
  replaceVars: { NAME: 'Harry', SURNAME: 'Potter' },
  result: 'Hello Harry Potter!'
}, {
  title: 'With a trailing var',
  template: 'Hello WORLD',
  replaceVars: { WORLD: 'world' },
  result: 'Hello world'
}, {
  title: 'With a leading var',
  template: 'HELLO world',
  replaceVars: { HELLO: 'Hello' },
  result: 'Hello world'
}, {
  title: 'With a replace var joint to another word',
  template: 'Hello WORLDs',
  templateVars: ['WORLD'],
  replaceVars: { WORLD: 'world' },
  result: 'Hello WORLDs'
}, {
  title: 'With more vars to replace than present',
  template: 'HELLO world',
  replaceVars: { HELLO: 'Hello', WORLD: 'world' },
  result: 'Hello world'
}, {
  title: 'With no var to replace',
  template: 'HELLO world',
  replaceVars: {},
  result: 'HELLO world'
}, {
  title: 'With empty template',
  template: '',
  replaceVars: { HELLO: 'Hello' },
  result: ''
}, {
  title: 'With basic multi-line template',
  template: 'This IS a simple\ntest case',
  replaceVars: { IS: 'is' },
  result: 'This is a simple\ntest case'
}, {
  title: 'With a more advanced multi-line template',
  template: 'THIS is a SIMPLE\nTEST CASE',
  replaceVars: { THIS: 'This', SIMPLE: 'simple', TEST: 'test', CASE: 'case' },
  result: 'This is a simple\ntest case'
}, {
  title: 'With a basic JS script as a template',
  template: `
    function isTrue(value) {
      return process.env.NODE_ENV === "production"
        ? Boolean(value)
        : value.toString() === TEST_VALUE;
    }`,
  replaceVars: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'TEST_VALUE': JSON.stringify('true')
  },
  result: `
    function isTrue(value) {
      return "production" === "production"
        ? Boolean(value)
        : value.toString() === "true";
    }`
}, {
  title: 'With a basic JS script as a template (bis)',
  template: `
    const isTrue = __SOME_TEST__;

    if (isTrue && __SOME_OTHER_TEST__) {
      doThis();
    }`,
  replaceVars: {
    '__SOME_TEST__': JSON.stringify(true),
    '__SOME_OTHER_TEST__': JSON.stringify(false)
  },
  result: `
    const isTrue = true;

    if (isTrue && false) {
      doThis();
    }`
}]

scenarii.forEach(scenario => {
  test(`#replace - ${scenario.title}`, () => {
    expect(Templast.replace(scenario.template, scenario.replaceVars)).toBe(scenario.result)
  })

  test(`(rollup-plugin-replace) #replace - ${scenario.title}`, () => {
    expect(rollupReplace(scenario.template, scenario.replaceVars)).toBe(scenario.result)
  })
})
