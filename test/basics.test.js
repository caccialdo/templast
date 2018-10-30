const Templast = require('..')

test('Hello world!', () => {
  const templateFn = Templast.template('Hello WORLD!', ['WORLD'])
  expect(templateFn({ WORLD: 'world' })).toBe('Hello world!')
})

test('Hello Harry Potter', () => {
  const templateFn = Templast.template('Hello NAME SURNAME', ['NAME', 'SURNAME'])
  expect(templateFn({ NAME: 'Harry', SURNAME: 'Potter' })).toBe('Hello Harry Potter')
})
