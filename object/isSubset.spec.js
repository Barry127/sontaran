const isSubset = require('./isSubset');

test('isSubset returns a function', () => {
  expect(isSubset({})).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ { a: 1, b: 2 }, { a: 1, b: 2 } ],
    [ { a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3, d: 4 } ],
    [ { a: 1, b: 2, c: 3 }, { b: 2, a: 1, c: 3 } ],
    [ [ 1, 2, 3 ], [ 1, 2, 3 ] ],
    [ { a: 255 }, { a: 0xFF, b: 0xFE, c: 0xFD } ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} is a subset of ${pair[1]}`, () => {
      expect(isSubset(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ { a: 1, b: 2, c: 3 }, { a: 1, b: 2 } ],
    [ { a: '1', b: 2 }, { a: 1, b: 2 } ],
    [ { foo: { bar: 'baz' } } , { foo: { bar: 'baz' } } ],
    [ 'a', { a: 'a' } ],
    [ [ 1, 2, 3 ], [ 3, 2, 1 ] ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} is not a subset of ${pair[1]}`, () => {
      expect(isSubset(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('isSubset throws a type error if superset is not an object', () => {
    expect(isSubset.bind(null, false)).toThrow(TypeError);
  });
});
