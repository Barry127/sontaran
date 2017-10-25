const min = require('./min');

test('min returns a function', () => {
  expect(min(0)).toBeInstanceOf(Function);
});

describe('Valid Pairs', () => {
  const validPairs = [
    [ 3, 2 ],
    [ 4, 4 ],
    [ Number.POSITIVE_INFINITY, 3 ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} is not less than ${pair[1]}`, () => {
      expect(min(pair[1])(pair[0])).toBe(true);
    });
  });
});

describe('Invalid Pairs', () => {
  const invalidPairs = [
    [ 3, Math.PI ],
    [ 4, Number.NaN ],
    [ Number.NaN, Number.NEGATIVE_INFINITY ],
    [ Number.NEGATIVE_INFINITY, Number.NaN ],
    [ 2, 0x03 ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} is less than ${pair[1]}`, () => {
      expect(min(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid Arguments', () => {
  test('min throws a type error if min is not a number', () => {
    expect(min.bind(null, '3')).toThrow(TypeError);
  });
});
