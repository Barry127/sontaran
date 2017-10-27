const min = require('./min');

test('min returns a function', () => {
  expect(min(0)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'Hello World', 1 ],
    [ 'Hello', 5 ],
    [ 'd', Number.NEGATIVE_INFINITY ],
    [ '01', 0o01 ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has min length of ${pair[1]}`, () => {
      expect(min(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 'Hello World', 20 ],
    [ 'Hello', Number.NaN ],
    [ 'Hello World', 0xDE ]
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
