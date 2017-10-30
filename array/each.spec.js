const each = require('./each');

test('each returns a function', () => {
  expect(each(() => true)).toBeInstanceOf(Function);
});

describe('validator function calls', () => {
  test('each calls the validator function the length of value number of times', () => {
    const spy = jest.fn()
      .mockReturnValue(true);

    each(spy)([ 1, 2, 3 ]);

    expect(spy.mock.calls.length).toBe(3);
  });

  test('each passes the value as argument to validator', () => {
    const spy = jest.fn()
      .mockReturnValue(true);

    each(spy)([ 'a', 'b', 'c' ]);

    expect(spy.mock.calls[0][0]).toBe('a');
    expect(spy.mock.calls[1][0]).toBe('b');
    expect(spy.mock.calls[2][0]).toBe('c');
  });
});

describe('Valid pairs', () => {
  const validPairs = [
    [ [ 1, 0, 2, 2, 1 ], value => value < 3 ],
    [ [ 'a', 'ab', 'abc' ], value => value.startsWith('a') ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} is valid`, () => {
      expect(each(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], value => value.startsWith('a') ],
    [ [ '1', 2 ], value => typeof value === 'number' ],
    [ [ 1, 2, 3 ], value => value < 3 ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} is invalid`, () => {
      expect(each(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('each throws a type error if validator is not a function', () => {
    expect(each.bind(null, false)).toThrow(TypeError);
  });
});
