const equals = require('./equals');

test('equals returns a function', () => {
  expect(equals({})).toBeInstanceOf(Function);
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
    [ { foo: 'bar' }, { foo: 'bar' } ],
    [ new MyObject(), { a: 1, b: 2, c: 3 } ],
    [ [1, 2 ], [ 1, 2] ],
    [ { a: 1, b: 2 }, { b: 2, a: 1 } ],
    [ { a: 255 }, { a: 0xFF } ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} equals ${pair[1]}`, () => {
      expect(equals(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ { foo: 'bar' }, { foo: 'bar', 'baz': 'quux' } ],
    [ new MyObject(), { a: 1, b: 2, c: 3, x: 24, y: 25, z:26 } ],
    [ [ 1, 2 ], [ 2, 1 ] ],
    [ { a: 1 }, { a: '1' } ],
    [ { foo: { bar: 'baz' } }, { foo: { bar: 'baz' } } ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not equal ${pair[1]}`, () => {
      expect(equals(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('equals throws a type error if expectedValue is not an object', () => {
    expect(equals.bind(null, false)).toThrow(TypeError);
  });
});
