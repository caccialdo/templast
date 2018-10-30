# Templast

The "lightest and fastest"® way to:

- replace placeholders in a string.
- compile the replacement operation into a re-usable function for maximum performance.

```sh
yarn add templast
```

## Using it

```js
import Templast from 'templast'

const someLargeString = '[...] If you __CALL_ME_AS_YOU_WISH__, get ready to BECAUSE_WHY_NOT! [...]'

/**
 * Option 1: Doing a one-off replacement
 */
const interpolatedString = Templast.replace(someLargeString, {
  '__CALL_ME_AS_YOU_WISH__': 'change your decision',
  'BECAUSE_WHY_NOT': 'face the consequences'
}) // => '[...] If you change your decision, get ready to face the consequences! [...]'

/**
 * Option 2: Compiling it for easy and fast re-usability
 */
const templateFn = Templast.compile(someLargeString, ['__CALL_ME_AS_YOU_WISH__', 'BECAUSE_WHY_NOT'])

const interpolatedString1 = templateFn({
  '__CALL_ME_AS_YOU_WISH__': 'jump in the pond',
  'BECAUSE_WHY_NOT': 'get wet'
}) // => '[...] If you jump in the pond, get ready to get wet! [...]'
const interpolatedString2 = templateFn({
  '__CALL_ME_AS_YOU_WISH__': 'skip breakfast',
  'BECAUSE_WHY_NOT': 'be hungry'
}) // => '[...] If you skip breakfast, get ready to be hungry! [...]'
```
