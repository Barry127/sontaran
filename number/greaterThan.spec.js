const greaterThan = require('./greaterThan');

test('greaterThan returns a function', () => {
  expect(greaterThan(0)).toBeInstanceOf(Function);
});

describe('Valid Pairs', () => {
  const validPairs = [
    [ 3, 2 ],
    [ -2, -6 ],
    [ 3, Number.NEGATIVE_INFINITY ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} is greater than ${pair[1]}`, () => {
      expect(greaterThan(pair[1])(pair[0])).toBe(true);
    });
  });
});

describe('Invalid Pairs', () => {
  const invalidPairs = [
    [ 4, 4 ],
    [ Math.PI, 4 ],
    [ 4, Number.NaN ],
    [ Number.NaN, Number.NEGATIVE_INFINITY ],
    [ 2, 0x03 ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} is not greater than ${pair[1]}`, () => {
      expect(greaterThan(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid Arguments', () => {
  test('greaterThan throws a type error if gt is not a number', () => {
    expect(greaterThan.bind(null, '3')).toThrow(TypeError);
  });
});