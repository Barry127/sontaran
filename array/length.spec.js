const length = require('./length');

test('length returns a function', () => {
  expect(length(0)).toBeInstanceOf(Function);
});

describe('Valid pairs', () => {
  const validPairs = [
    [ [ 'a', 'b', 'c' ], 3 ],
    [ [ 'a', 'b', 'c', 'd' ], 4 ],
    [ [ 1 ], 1 ],
    [ [ 255, 333 ], 0x02 ]
  ];

  validPairs.forEach(pair => {
    test(`${pair[0]} has length ${pair[1]}`, () => {
      expect(length(pair[1])(pair[0])).toBe(true);
    })
  });
});

describe('Invalid pairs', () => {
  const invalidPairs = [
    [ [ 'a', 'b', 'c' ], 2 ],
    [ [ 'a', 'b', 'c' ], -3 ],
    [ [ 1, 2 ,3 ], Number.NaN ]
  ];

  invalidPairs.forEach(pair => {
    test(`${pair[0]} does not have length ${pair[1]}`, () => {
      expect(length(pair[1])(pair[0])).toBe(false);
    });
  });
});

describe('Invalid arguments', () => {
  test('length throws a type error if expectedLength is not a number', () => {
    expect(length.bind(null, '3')).toThrow(TypeError);
  });
});
