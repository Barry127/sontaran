const equals = require('./equals');

test('equals returns a function', () => {
  expect(equals(0)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 3, 3 ],
    [ -2, -2 ],
    [ 3.33, 3.33 ],
    [ Math.PI, Math.PI ],
    [ Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY ],
    [ 0xC0, 192 ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 4, 8 ],
    [Math.PI, 3.14 ],
    [ -2, 4 ],
    [ 3, -3 ],
    [ Number.NaN, Number.NaN ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not equal ${pair[1]}`, () => {
      expect(equals(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('equals throws a type error if expectedValue is not a number', () => {
    expect(equals.bind(null, 'five')).toThrow(TypeError);
  });
});
