const contains = require('./contains');

test('contains returns a function', () => {
  expect(contains()).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ [ 'a', 'b', 'c' ], 'b' ],
    [ [ 'a', 'b', 'c' ], 'a' ],
    [ [ 1, 2, 3 ], 2 ],
    [ [ 255, 333 ], 0xFF ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} contains ${pair[1]}`, () => {
      expect(contains(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], 'A' ],
    [ [ 'a', 'b', 'c' ], 'd' ],
    [ [ 'abc'], 'c' ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not contain ${pair[1]}`, () => {
      expect(contains(pair[1])(pair[0])).toBe(false);
    });
  });
});
