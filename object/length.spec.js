const length = require('./length');

test('length returns a function', () => {
  expect(length(0)).toBeInstanceOf(Function);
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
    [ { foo: 1, bar: 2 }, 2 ],
    [ new MyObject(), 3 ],
    [ [ 'a', 'b', 'c' ], 3]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has length ${pair[1]}`, () => {
      expect(length(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ { foo: 1, bar: 2 }, 3 ],
    [ new MyObject(), 6 ],
    [ ['aa'], 2 ],
    [ { '2': 2 }, 2 ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not have length ${pair[1]}`, () => {
      expect(length(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('length throws a type error if expectedLength is not a number', () => {
    expect(length.bind(null, false)).toThrow(TypeError);
  });
});
