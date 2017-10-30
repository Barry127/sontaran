const between = require('./between');

test('between returns a function', () => {
  expect(between(0, 1)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const pairs = [
    [ [ 'a', 'b', 'c', 'd' ], 3, 5 ],
    [ [ 'a', 'b' ] , 1, 3 ],
    [ [ 1, 2, 3, 4, 5, 6 ], 0 , Number.POSITIVE_INFINITY ],
    [ [ 'a', 'b', 'c' ], 3, 4 ],
    [ [ 'a', 'b', 'c' ], 2, 3 ],
    [ [ 1 ] , Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ]
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} has length between ${pair[1]} and ${pair[2]}`, () => {
      const myBetween = between(pair[1], pair[2]);
      expect(myBetween(pair[0])).toBe(true);
    });
  });
});

describe('If min and max are mixed up between is still valid', () => {
  const pairs = [
    [ [ 'a', 'b', 'c', 'd' ], 5, 3 ],
    [ [ 'a', 'b' ] , 3, 1 ],
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} has length between ${pair[1]} and ${pair[2]}`, () => {
      const myBetween = between(pair[1], pair[2]);
      expect(myBetween(pair[0])).toBe(true);
    });
  });
});

describe('Invalid pairs', () => {
  const pairs = [
    [ [ 'a', 'b', 'c', 'd' ], 6, 8 ],
    [ [ 'a', 'b' ], 3, 5 ],
    [ [ 1, 2, 3 ], -1, 0],
    [ [ 1, 2 ], 0, Number.NaN ],
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} does not have length between ${pair[1]} and ${pair[2]}`, () => {
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
