const domain = require('./domain');

test('domain returns a function', () => {
  expect(domain('')).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ 'john@doe.com', 'doe.com' ],
    [ 'john@doe.com', 'DoE.Com' ],
    [ 'janedoe@google.com', /google/ ],
    [ 'my@you.co.uk', /co.uk$/ ],
    [ 'bill@hotmail.com', /HotMail/i ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has domain ${pair[1]}`, () => {
      expect(domain(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ 'larry@gmail.com', 'hotmail.com' ],
    [ 'bill.hotmail.com', /gmail/ ],
    [ 'some@mail.ru', 'mail.com' ],
    [ '3', /notAnEmail/ ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not have domain ${pair[1]}`, () => {
      expect(domain(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('domain throws a type error if expectedDomain is not a string or an instance of RegExp', () => {
    expect(domain.bind(null, 127)).toThrow(TypeError);
  });
});
