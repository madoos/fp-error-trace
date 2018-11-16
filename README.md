[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

# fp-error-trace

_Small helper that show errors produced in function compositions._

## Getting Started

To install:

    npm i -S fp-error-trace

Trace a function:

``` javascript

const trace = require('fp-error-trace')
const R = require('ramda')
const pipe = trace(R.pipe)

const plus = add(1)
const unexpectedError = () => { throw new Error('some error')}

const triplePlus = pipe(
    unexpectedError
    plus, 
    plus, 
    plus
)

// in console: Error occurred in pipe at argument 1 (/your/file.js:3:18)

```


Trace all library:

``` javascript

const trace = require('fp-error-trace')
const {compose, add} = trace.all(require('ramda'))

const plus = add(1)
const unexpectedError = () => { throw new Error('some error')}

const triplePlus = compose(
    plus, 
    plus, 
    plus, 
    unexpectedError
)

// in console: Error occurred in compose at argument 4 (/your/file.js:3:18)

```

## License

MIT © [Maurice Domínguez](maurice.ronet.dominguez@gmail.com)

[npm-image]: https://badge.fury.io/js/fp-error-trace.svg
[npm-url]: https://npmjs.org/package/fp-error-trace
[travis-image]: https://travis-ci.org/madoos/fp-error-trace.svg?branch=develop
[travis-url]: https://travis-ci.org/madoos/fp-error-trace
[daviddm-image]: https://david-dm.org/madoos/fp-error-trace.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/madoos/fp-error-trace
[coveralls-image]: https://coveralls.io/repos/madoos/fp-error-trace/badge.svg
[coveralls-url]: https://coveralls.io/r/madoos/fp-error-trace

