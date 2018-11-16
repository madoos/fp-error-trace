const trace = require('../')
const {compose, add, path} = trace.all(require('ramda'))

const consoleMock = require('../__mocks__/console')
const foo = require('../__mocks__/dummy/foo')
const baz = require('../__mocks__/dummy/baz')

beforeAll(consoleMock.apply)
afterAll(consoleMock.restore)

test('Should to trace errors', () => {
    const program = compose(
        add(1),
        add(2),
        foo,
        baz
    )

    try {
        program(1)
    } catch (e) {
        const errors = console.getErrors()
        const bazError = path([0, 0], errors)
        const programError = path([1, 0], errors)

        expect(bazError.includes('pipe')).toEqual(true) // method
        expect(bazError.includes('2')).toEqual(true) // num arg
        expect(bazError.includes('__mocks__/dummy/baz.js')).toEqual(true) // file

        expect(programError.includes('compose')).toEqual(true) // method
        expect(programError.includes('3')).toEqual(true) // num arg
        expect(programError.includes('__tests__/index.js')).toEqual(true) // file
    }
})
