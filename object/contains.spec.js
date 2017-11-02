const contains = require('./contains');

test('contains returns a function', () => {
  expect(contains('')).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ { a: 1, b: 2, c: 3 }, 3 ],
    [ { a: 1, b: 2, c: 3 }, 1 ],
    [ { foo: 'bar' }, 'bar' ],
    [ { a: 255, b: 333 }, 0xFF ],
    [ [ 'aa' ], 'aa' ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} contains ${pair[1]}`, () => {
      expect(contains(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ { a: 1, b: 2, c: 3 }, 4 ],
    [ { a: 1, b: 2, c: 3 }, '3' ],
    [ { foo: { bar: 'baz' } }, { bar: 'baz' } ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not contain ${pair[1]}`, () => {
      expect(contains(pair[1])(pair[0])).toBe(false);
    });
  });
});
