const { pipe, add } = require('ramda');

module.exports = pipe(
    add(2),
    add(2)
);
