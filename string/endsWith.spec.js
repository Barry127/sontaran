const endsWith = require('./endsWith');

test('endsWith returns a function', () => {
  expect(endsWith('')).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'Hello World', 'World' ],
    [ 'Hello World', 'ld' ],
    [ 'FooBar', 'Bar' ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} ends with ${pair[1]}`, () => {
      expect(endsWith(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 'Hello World', 'Hello' ],
    [ 'Hello World', 'World ' ],
    [ 'FooBar', 'bar' ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not end with ${pair[1]}`, () => {
      expect(endsWith(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('endsWith throws a type error if expectedEnd is not a string', () => {
    expect(endsWith.bind(null, false)).toThrow(TypeError);
  });
});
