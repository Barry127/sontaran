const length = require('./length');

test('length returns a function', () => {
  expect(length(0)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'Hello World', 11 ],
    [ 'Hello', 5 ],
    [ 'Hello ', 6 ],
    [ '01', 0x02 ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has length ${pair[1]}`, () => {
      expect(length(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 'Hello World', 12 ],
    [ 'Hello', Number.NaN ],
    [ 'Hello World', -11 ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not have length ${pair[1]}`, () => {
      expect(length(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('length throws a type error if expectedLength is not a number', () => {
    expect(length.bind(null, false)).toThrow(TypeError);
  });
});
