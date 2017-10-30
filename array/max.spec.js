const max = require('./max');

test('max returns a function', () => {
  expect(max(0)).toBeInstanceOf(Function);
});

describe('Valid Pairs', () => {
  const validPairs = [
    [ [ 'a', 'b', 'c' ], 5 ],
    [ [ 'a', 'b', 'c', 'd' ], 4 ],
    [ [ 1 ], 1 ],
    [ [ 255, 333 ], 0xFF ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has a length not greater than ${pair[1]}`, () => {
      expect(max(pair[1])(pair[0])).toBe(true);
    });
  });
});

describe('Invalid Pairs', () => {
  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], 2 ],
    [ [ 'a', 'b', 'c' ], -3 ],
    [ [ 1, 2 ,3 ], Number.NaN ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} has a length greater than ${pair[1]}`, () => {
      expect(max(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid Arguments', () => {
  test('max throws a type error if max is not a number', () => {
    expect(max.bind(null, '3')).toThrow(TypeError);
  });
});
