const lessThan = require('./lessThan');

test('lessThan returns a function', () => {
  expect(lessThan(0)).toBeInstanceOf(Function);
});

describe('Valid Pairs', () => {
  const validPairs = [
    [ 2, 3 ],
    [ -6, -2 ],
    [ 3, Number.POSITIVE_INFINITY ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} is less than ${pair[1]}`, () => {
      expect(lessThan(pair[1])(pair[0])).toBe(true);
    });
  });
});

describe('Invalid Pairs', () => {
  const invalidPairs = [
    [ 4, 4 ],
    [ 4, Math.PI ],
    [ 4, Number.NaN ],
    [ Number.NaN, Number.POSITIVE_INFINITY ],
    [ 0x03, 2 ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} is not less than ${pair[1]}`, () => {
      expect(lessThan(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid Arguments', () => {
  test('lessThan throws a type error if lt is not a number', () => {
    expect(lessThan.bind(null, '3')).toThrow(TypeError);
  });
});
