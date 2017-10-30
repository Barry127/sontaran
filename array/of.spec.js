const _of = require('./of');

test('of returns a function', () => {
  expect(_of('')).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ [ 'a', 'b', 'c' ], 'string' ],
    [ [ 1, 2, 3, 0xFF ], 'number' ],
    [ [ {}, {} ], 'object' ],
    [ [ true, true, false ], 'boolean' ],
    [ [ [], [], [] ], 'array' ],
    [ [ [], [], [] ], 'object' ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} is an array of ${pair[1]}`, () => {
      expect(_of(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], 'number' ],
    [ [ 'a', 'b', 2 ], 'string' ],
    [ [ 'abc', 0x7 ], 'string' ],
    [ [ 0, true ], 'boolean' ],
    [ [ {}, [] ], 'array' ],
    [ [ 1, 2, 3 ], 'integer' ],
    [ [ 3, 3, 3 ], '3' ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} is not an array of ${pair[1]}`, () => {
      expect(_of(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('of throws a type error if expectedType is not a string', () => {
    expect(_of.bind(null, Number)).toThrow(TypeError);
  });
});
