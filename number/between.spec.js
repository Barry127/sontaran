const between = require('./between');

test('between returns a function', () => {
  expect(between(0, 1)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const pairs = [
    [ 4, 3, 5 ],
    [ -2, -5, -1 ],
    [ Math.PI, 3, 4 ]
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} is between ${pair[1]} and ${pair[2]}`, () => {
      const myBetween = between(pair[1], pair[2]);
      expect(myBetween(pair[0])).toBe(true);
    });
  });
});

describe('If min and max are mixed up between is still valid', () => {
  const pairs = [
    [ 4, 5, 3 ],
    [ -2, -1, -5 ],
    [ Math.PI, 4, 3 ]
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} is between ${pair[1]} and ${pair[2]}`, () => {
      const myBetween = between(pair[1], pair[2]);
      expect(myBetween(pair[0])).toBe(true);
    });
  });
});

describe('Invalid pairs', () => {
  const pairs = [
    [ 3, 3, 5 ],
    [ Number.NaN, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ],
    [ 2, 0, Number.NaN ],
    [ 4, 0, 3 ]
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} is not between ${pair[1]} and ${pair[2]}`, () => {
      const myBetween = between(pair[1], pair[2]);
      expect(myBetween(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('between throws a type error if min is not a number', () => {
    expect(between.bind(null, '3', 4)).toThrow(TypeError);
  });

  test('between throws a type error if max is not a number', () => {
    expect(between.bind(null, 3, '4')).toThrow(TypeError);
  });
});
