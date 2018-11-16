const { pipe, add } = require('ramda');

module.exports = pipe(
    add(1),
    () => {
        throw new Error('some error');
    },
    add(1)
);
