const equals = require('./equals');

test('equals returns a function', () => {
  expect(equals(true)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ true, true ],
    [ false, false ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ true, false ],
    [ false, true ],
    [ 'true', true ],
    [ 1, true ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not equal ${pair[1]}`, () => {
      expect(equals(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('equals throws a type error if expectedValue is not a boolean', () => {
    expect(equals.bind(null, 'true')).toThrow(TypeError);
  });
});
