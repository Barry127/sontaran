const equals = require('./equals');

test('equals returns a function', () => {
  expect(equals([])).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ [ 1, 2 ], [ 1, 2 ] ],
    [ [ 'a', 'b', 'c' ], [ 'a', 'b', 'c' ] ],
    [ [ 'a', 'b', 'c' ], [ 'b', 'a', 'c' ] ],
    [ [ 1, 2, 3 ], [ 3, 2, 1] ],
    [ [ 255 ], [ 0xFF ] ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], [ 'a', 'b' ] ],
    [ [ '1', 2 ], [ 1, 2 ] ],
    [ [ { a: 1, b: 2 } ], [ { a: 1, b: 2 } ] ],
    [ [ 'a' ], [ 'a', 'b' ] ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not equal ${pair[1]}`, () => {
      expect(equals(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('equals throws a type error if expectedValue is not an array', () => {
    expect(equals.bind(null, false)).toThrow(TypeError);
  });
});
