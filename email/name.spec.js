const name = require('./name');

test('name returns a function', () => {
  expect(name('')).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'john@doe.com', 'john' ],
    [ 'janedoe@google.com', /jane/ ],
    [ 'my-check@you.co.uk', /check$/ ],
    [ 'bill@hotmail.com', /Bill/i ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has name ${pair[1]}`, () => {
      expect(name(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 'john@doe.com', 'JoHn' ],
    [ 'larry@gmail.com', 'sergei' ],
    [ 'bill@hotmail.com', /steve/ ],
    [ 'some@mail.ru', 'any' ],
    [ '3', /notAnEmail/ ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not have name ${pair[1]}`, () => {
      expect(name(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('name throws a type error if expectedName is not a string or an instance of RegExp', () => {
    expect(name.bind(null, 127)).toThrow(TypeError);
  });
});
