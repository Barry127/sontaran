const max = require('./max');

test('max returns a function', () => {
  expect(max(0)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ { a: 1, b: 2, c: 3 }, 5 ],
    [ { a: 1, b: 2, c: 3, d: 4 }, 4 ],
    [ [ 1 ], 1 ],
    [ { a: 255, b: 333 }, 0xFF ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has a max length of ${pair[1]}`, () => {
      expect(max(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ { a: 1, b: 2, c: 3 }, 2 ],
    [ { a: 1, b: 2, c: 3 }, 1 ],
    [ { a: 1, b: 2, c: 3 }, Number.NaN ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} has a length greater than ${pair[1]}`, () => {
      expect(max(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('max throws a type error if maxLength is not a number', () => {
    expect(max.bind(null, false)).toThrow(TypeError);
  });
});
