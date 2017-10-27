const contains = require('./contains');

test('contains returns a function', () => {
  expect(contains('')).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'Hello World', 'Hello' ],
    [ 'Hello World', 'World' ],
    [ 'Hello World', 'o W' ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} contains ${pair[1]}`, () => {
      expect(contains(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 'Hello World', 'hello' ],
    [ 'Hello World', 'World ' ],
    [ 'Hello World', 'Earth' ],
    [ 'Coca Cola', 'Pepsi' ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not contain ${pair[1]}`, () => {
      expect(contains(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('contains throws a type error if expectedValue is not a string', () => {
    expect(contains.bind(null, false)).toThrow(TypeError);
  });
});
