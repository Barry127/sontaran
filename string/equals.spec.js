const equals = require('./equals');

test('equals returns a function', () => {
  expect(equals('')).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'Hello World', 'Hello World' ],
    [ 'FooBar', 'FooBar' ],
    [ '♠♣♥♦', '♠♣♥♦' ],
    [ 'Woohoo', `Woohoo` ],
    [ '😍', '😍' ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 'Hello World', 'Hello world' ],
    [ 'Hello World', 'Hello  World' ],
    [ 'Fanta', 'SiSi' ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not equal ${pair[1]}`, () => {
      expect(equals(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('equals throws a type error if expectedValue is not a string', () => {
    expect(equals.bind(null, 127)).toThrow(TypeError);
  });
});
