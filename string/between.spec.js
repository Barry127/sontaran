const between = require('./between');

test('between returns a function', () => {
  expect(between(0, 1)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const pairs = [
    [ 'Hello', 4, 6 ],
    [ 'Hi' , 1, 3 ],
    [ 'Hello World!', 0 , Number.POSITIVE_INFINITY ],
    [ 'Foo', 3, 4 ],
    [ 'This is always true' , Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY ]
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} has length between ${pair[1]} and ${pair[2]}`, () => {
      const myBetween = between(pair[1], pair[2]);
      expect(myBetween(pair[0])).toBe(true);
    });
  });
});

describe('If min and max are mixed up between is still valid', () => {
  const pairs = [
    [ 'Hello', 6, 4 ],
    [ 'Hi' , 3, 1 ]
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} has length between ${pair[1]} and ${pair[2]}`, () => {
      const myBetween = between(pair[1], pair[2]);
      expect(myBetween(pair[0])).toBe(true);
    });
  });
});

describe('Invalid pairs', () => {
  const pairs = [
    [ 'Hello', 1, 3 ],
    [ 'Hi', 3, 5 ],
    [ 'Awesome', 0, Number.NaN ]
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} does not have length between ${pair[1]} and ${pair[2]}`, () => {
      const myBetween = between(pair[1], pair[2]);
      expect(myBetween(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('between throws a type error if min is not a number', () => {
    expect(between.bind(null, '3', 4)).toThrow(TypeError);
  });

  test('between throws a type error if max is not a number', () => {
    expect(between.bind(null, 3, '4')).toThrow(TypeError);
  });
});
