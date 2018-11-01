# Templast

The "lightest and fastest"® way to:

- replace placeholders in a string.
- compile the replacement operation into a re-usable function for maximum performance.

```sh
npm install templast
yarn add templast
```

## Using it

```js
import Templast from 'templast'

const someLargeString = '[...] If you __DO_THIS__, get ready to __FOR_THAT__! [...]'

/**
 * Option 1: Doing a one-off replacement
 */
const interpolatedString = Templast.replace(someLargeString, {
  '__DO_THIS__': 'travel around the world',
  '__FOR_THAT__': 'make new friends'
}) // => '[...] If you travel around the world, get ready to make new friends! [...]'

/**
 * Option 2: Compiling it for easy and fast re-usability
 */
const templateFn = Templast.compile(someLargeString, ['__DO_THIS__', '__FOR_THAT__'])

const interpolatedString1 = templateFn({
  '__DO_THIS__': 'jump in the pond',
  '__FOR_THAT__': 'get wet'
}) // => '[...] If you jump in the pond, get ready to get wet! [...]'
const interpolatedString2 = templateFn({
  '__DO_THIS__': 'skip breakfast',
  '__FOR_THAT__': 'be hungry'
}) // => '[...] If you skip breakfast, get ready to be hungry! [...]'
```
