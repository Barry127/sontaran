const match = require('./match');

test('match returns a function', () => {
  expect(match(/./)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'hello world', /^[a-z ]+$/ ],
    [ 'Hello World', /hello/i ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} match ${pair[1]}`, () => {
      expect(match(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 'Hello World', /hello/ ],
    [ 'Hello World', /^[A-Z]$/ ],
    [ 'Hello World', /^[a-z ]+$/ ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not match ${pair[1]}`, () => {
      expect(match(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('match throws a type error if pattern is not an instance of RegExp', () => {
    expect(match.bind(null, {})).toThrow(TypeError);
  });
});
