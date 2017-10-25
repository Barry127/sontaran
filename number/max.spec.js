const max = require('./max');

test('max returns a function', () => {
  expect(max(0)).toBeInstanceOf(Function);
});

describe('Valid Pairs', () => {
  const validPairs = [
    [ 2, 3 ],
    [ 4, 4 ],
    [ Number.NEGATIVE_INFINITY, 3 ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} is not greater than ${pair[1]}`, () => {
      expect(max(pair[1])(pair[0])).toBe(true);
    });
  });
});

describe('Invalid Pairs', () => {
  const invalidPairs = [
    [ Math.PI, 3 ],
    [ 4, Number.NaN ],
    [ Number.NaN, Number.POSITIVE_INFINITY ],
    [ Number.POSITIVE_INFINITY, Number.NaN ],
    [ 2, 0x01 ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} is greater than ${pair[1]}`, () => {
      expect(max(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid Arguments', () => {
  test('max throws a type error if max is not a number', () => {
    expect(max.bind(null, '3')).toThrow(TypeError);
  });
});
