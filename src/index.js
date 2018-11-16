const DEBUGGED_KEY = Symbol('is debugged');
const FG_RED = '\x1b[31m';
const FG_YELLOW = '\x1b[33m';
const RESET_COLOR = '\x1b[0m';

const red = text => `${FG_RED}${text}${RESET_COLOR}`;
const yellow = text => `${FG_YELLOW}${text}${RESET_COLOR}`;
const logError = text => {
    console.error(text);
};

const trace = f => {
    return function debugWrapper(...args) {
        let origin;
        try {
            throw new Error();
        } catch (e) {
            origin = e.stack.split('\n')[2].match(/\([^)]+\)/)[0];
        }

        const debuggedArgs = args.map((arg, i) => {
            return typeof arg === 'function' && !arg[DEBUGGED_KEY]
                ? Object.assign(
                    (...otherArgs) => {
                        try {
                            return arg.apply(null, otherArgs);
                        } catch (e) {
                            logError(
                                `${red('Error occurred in')} ${yellow(
                                    f.name
                                )} ${red('at argument')} ${yellow(
                                    i + 1
                                )} ${red(origin)}`
                            );
                            throw e;
                        }
                    },
                    { [DEBUGGED_KEY] : true }
                )
                : arg;
        });

        return f.apply(null, debuggedArgs);
    };
};

trace.all = library => {
    Object.entries(library).forEach(([method, f]) => {
        library[method] = trace(f);
    });
    return library;
};

module.exports = trace;
