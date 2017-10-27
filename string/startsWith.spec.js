const startsWith = require('./startsWith');

test('startsWith returns a function', () => {
  expect(startsWith('')).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'Hello World', 'Hello' ],
    [ 'Hello World', 'He' ],
    [ 'FooBar', 'Foo' ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} starts with ${pair[1]}`, () => {
      expect(startsWith(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 'Hello World', 'World' ],
    [ 'Hello World', ' Hello' ],
    [ 'FooBar', 'foo' ],
    [ '2FooBar', '2f' ],
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not start with ${pair[1]}`, () => {
      expect(startsWith(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('startsWith throws a type error if expectedStart is not a string', () => {
    expect(startsWith.bind(null, false)).toThrow(TypeError);
  });
});
