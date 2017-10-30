const isSubset = require('./isSubset');

test('isSubset returns a function', () => {
  expect(isSubset([])).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ [ 1, 2 ], [ 1, 2 ] ],
    [ [ 'a', 'b', 'c' ], [ 'a', 'b', 'c', 'd' ] ],
    [ [ 'a', 'b', 'c' ], [ 'b', 'a', 'c' ] ],
    [ [ 1, 2, 3 ], [ 5, 4, 3, 2, 1] ],
    [ [ 255 ], [ 0xFF, 0xFE, 0xFD ] ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} is a subset of ${pair[1]}`, () => {
      expect(isSubset(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], [ 'a', 'b' ] ],
    [ [ '1', 2 ], [ 1, 2 ] ],
    [ [ { a: 1, b: 2 } ], [ { a: 1, b: 2 } ] ],
    [ [ 'c' ], [ 'a', 'b' ] ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} is not a subset of ${pair[1]}`, () => {
      expect(isSubset(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('isSubset throws a type error if superset is not an array', () => {
    expect(isSubset.bind(null, false)).toThrow(TypeError);
  });
});
