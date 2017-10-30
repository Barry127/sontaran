const min = require('./min');

test('min returns a function', () => {
  expect(min(0)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ [ 'a', 'b', 'c' ], 2 ],
    [ [ 'a', 'b', 'c', 'd' ], 4 ],
    [ [ 1 ], 1 ],
    [ [ 255, 333 ], 0x00 ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has min length of ${pair[1]}`, () => {
      expect(min(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], 4 ],
    [ [ 'a', 'b', 'c' ], 0b100 ],
    [ [ 1, 2 ,3 ], Number.NaN ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} length is less than ${pair[1]}`, () => {
      expect(min(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('min throws a type error if minLength is not a number', () => {
    expect(min.bind(null, '0')).toThrow(TypeError);
  });
});
