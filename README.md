# Templast

The "lightest and fastest"® way to interpolate a string with placeholder and have a blast!

Templast comes with two methods:

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

## Performance

You can run the benchmark task via `npm run benchmark`. This benchmark runs 1000 (identical) replace operations on the `react-dom` unminified source code.

On my early 2015 13in 2.7GHz i5 macbook pro, results are as follow:

```
rollup-plugin-replace: 9796.988ms (1x)
Templast.replace:      2499.369ms (~4x)
Templast.template:     69.188ms   (~140x)
``` 
