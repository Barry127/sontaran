const oneOf = require('./oneOf');

test('oneOf returns a function', () => {
  expect(oneOf([])).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'Hello', [ 'Hello', 'World' ] ],
    [ 'World', [ 'Hello', 'World' ] ],
    [ 'Bar', [ 'Foo', 'Bar', 'Baz' ] ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} is one of ${pair[1]}`, () => {
      expect(oneOf(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ '2', [ 1, 2, 3 ] ],
    [ 'hello', [ 'Hello', 'World' ] ],
    [ 'Hello', ['Hellos'] ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} is not one of ${pair[1]}`, () => {
      expect(oneOf(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('oneOf throws a type error if expectedValues is not an array', () => {
    expect(oneOf.bind(null, {})).toThrow(TypeError);
  });
});
