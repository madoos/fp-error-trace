let errors = [];
const error = console.error;

const mock = {
    error : (...args) => {
        errors.push(args);
        //error(...args)
        return args;
    },
    getErrors   : () => errors,
    flushErrors : () => {
        errors = [];
    }
};

module.exports = {
    apply   : () => Object.assign(console, mock),
    restore : () => {
        console.error = error;
        console.getErrors = undefined;
        console.flushErrors = undefined;
        return console;
    }
};
