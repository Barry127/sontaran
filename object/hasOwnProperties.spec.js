const hasOwnProperties = require('./hasOwnProperties');

test('hasOwnProperties returns a function', () => {
  expect(hasOwnProperties([])).toBeInstanceOf(Function);
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
    [ { foo: 1, bar: 2 }, ['foo', 'bar' ] ],
    [ new MyObject(), ['c'] ],
    [ new MyObject(), ['a', 'c'] ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has own properties ${pair[1]}`, () => {
      expect(hasOwnProperties(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ { foo: 1, bar: 2 }, [ 'foo', 'baz' ] ],
    [ new MyObject(), ['z'] ],
    [ new MyObject(), [ 'a', 'z'] ],
    [ ['aa'], ['aa'] ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not have own properties ${pair[1]}`, () => {
      expect(hasOwnProperties(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('hasOwnProperties throws a type error if expectedKeys is not an array', () => {
    expect(hasOwnProperties.bind(null, false)).toThrow(TypeError);
  });
});
