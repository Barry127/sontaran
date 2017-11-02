const hasOwnProperty = require('./hasOwnProperty');

test('hasOwnProperty returns a function', () => {
  expect(hasOwnProperty('')).toBeInstanceOf(Function);
});

const MyObject = function () {
  this.a = 1;
  this.b = 2;
  this.c = 3;

  return this;
}

MyObject.prototype.x = 24;
MyObject.prototype.y = 25;
MyObject.prototype.z = 26;

describe('Valid pairs', () => {
  const validPairs = [
    [ { foo: 1, bar: 2 }, 'foo' ],
    [ new MyObject(), 'c' ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has own property ${pair[1]}`, () => {
      expect(hasOwnProperty(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ { foo: 1, bar: 2 }, 'baz' ],
    [ new MyObject(), 'z' ],
    [ ['aa'], 'aa' ],
    [ { '2': 2 }, true ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not have own property ${pair[1]}`, () => {
      expect(hasOwnProperty(pair[1])(pair[0])).toBe(false);
    });
  });
});
