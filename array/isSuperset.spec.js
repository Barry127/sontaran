const isSuperset = require('./isSuperset');

test('isSuperset returns a function', () => {
  expect(isSuperset([])).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ [ 1, 2 ], [ 1, 2 ] ],
    [ [ 'a', 'b', 'c', 'd' ], [ 'a', 'b', 'c' ] ],
    [ [ 'a', 'b', 'c' ], [ 'b', 'a', 'c' ] ],
    [ [ 5, 4, 3, 2, 1], [ 1, 2, 3 ] ],
    [ [ 0xFF, 0xFE, 0xFD ], [ 255 ] ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} is a superset of ${pair[1]}`, () => {
      expect(isSuperset(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ [ 'a', 'b' ], [ 'a', 'b', 'c' ] ],
    [ [ '1', 2 ], [ 1, 2 ] ],
    [ [ { a: 1, b: 2 } ], [ { a: 1, b: 2 } ] ],
    [ [ 'a' ], [ 'a', 'b' ] ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} is not a superset of ${pair[1]}`, () => {
      expect(isSuperset(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('isSuperset throws a type error if subset is not an array', () => {
    expect(isSuperset.bind(null, false)).toThrow(TypeError);
  });
});
