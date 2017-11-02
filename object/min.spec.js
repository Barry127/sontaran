const min = require('./min');

test('min returns a function', () => {
  expect(min(0)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ { a: 1, b: 2, c: 3 }, 2 ],
    [ { a: 1, b: 2, c: 3, d: 4 }, 4 ],
    [ [ 1 ], 1 ],
    [ { a: 255, b: 333 }, 0x00 ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has a min length of ${pair[1]}`, () => {
      expect(min(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ { a: 1, b: 2, c: 3 }, 4 ],
    [ { a: 1, b: 2, c: 3 }, 43 ],
    [ { a: 1, b: 2, c: 3 }, Number.NaN ],
    [ [ 'abc' ], 3 ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} has a length less than ${pair[1]}`, () => {
      expect(min(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('min throws a type error if minLength is not a number', () => {
    expect(min.bind(null, false)).toThrow(TypeError);
  });
});
