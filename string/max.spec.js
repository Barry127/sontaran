const max = require('./max');

test('max returns a function', () => {
  expect(max(0)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'Hello World', 20 ],
    [ 'Hello', 5 ],
    [ 'FooBar ', Number.POSITIVE_INFINITY ],
    [ '01', 0xAB ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has max length of ${pair[1]}`, () => {
      expect(max(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 'Hello World', 1 ],
    [ 'Hello', Number.NaN ],
    [ 'Hello World', -11 ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} length is greater than ${pair[1]}`, () => {
      expect(max(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('max throws a type error if maxLength is not a number', () => {
    expect(max.bind(null, false)).toThrow(TypeError);
  });
});
