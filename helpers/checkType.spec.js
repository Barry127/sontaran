const checkType = require('./checkType');

describe('Boolean checks', () => {
  const validBooleans = [
    true,
    false
  ];

  const invalidBooleans = [
    1,
    0,
    -1,
    'true',
    'false'
  ];

  validBooleans.forEach(value => {
    test(`${value} is a boolean`, () => {
      expect(checkType(value, 'boolean')).toBe(true);
    });
  });

  invalidBooleans.forEach(value => {
    test(`${value} is not a boolean`, () => {
      expect(checkType(value, 'boolean')).toBe(false);
    });
  });
});

describe('Function checks', () => {
  function myFunc () {
    return;
  }

  const validFunctions = [
    () => null,
    myFunc,
    Math.round,
    new Function()
  ];

  const invalidFunctions = [
    new Object(),
    {},
    'function'
  ];

  validFunctions.forEach(value => {
    test(`${value} is a function`, () => {
      expect(checkType(value, 'function')).toBe(true);
    });
  });

  invalidFunctions.forEach(value => {
    test(`${value} is not a function`, () => {
      expect(checkType(value, 'function')).toBe(false);
    });
  });
});

describe('Number checks', () => {
  const validNumbers = [
    1,
    12.34,
    Math.PI,
    Number.NaN,
    -3,
    0xFF,
    0o23,
    0b1010
  ];

  const invalidNumbers = [
    '3',
    'five',
    {},
    Math.ceil
  ];

  validNumbers.forEach(value => {
    test(`${value} is a number`, () => {
      expect(checkType(value, 'number')).toBe(true);
    });
  });

  invalidNumbers.forEach(value => {
    test(`${value} is not a number`, () => {
      expect(checkType(value, 'number')).toBe(false);
    });
  });
});

describe('Object checks', () => {
  const validObjects = [
    [],
    {},
    new Map(),
    new Array()
  ];

  const invalidObjects = [
    'string',
    5,
    true
  ];

  validObjects.forEach(value => {
    test(`${value} is an object`, () => {
      expect(checkType(value, 'object')).toBe(true);
    });
  });

  invalidObjects.forEach(value => {
    test(`${value} is not an object`, () => {
      expect(checkType(value, 'object')).toBe(false);
    });
  });
});

describe('String checks', () => {
  const validStrings = [
    'qwerty',
    'helloWorld'
  ];

  const invalidStrings = [
    4,
    []
  ];

  validStrings.forEach(value => {
    test(`${value} is a string`, () => {
      expect(checkType(value, 'string')).toBe(true);
    });
  });

  invalidStrings.forEach(value => {
    test(`${value} is not a string`, () => {
      expect(checkType(value, 'string')).toBe(false);
    });
  });
});

describe('checkType allows different casing for the type argument', () => {
  const pairs = [
    [ true, 'boolEAN' ],
    [ 'abs', 'STRING' ],
    [ {}, 'ObJecT' ]
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} is of type ${pair[1]}`, () => {
      expect(checkType(pair[0], pair[1])).toBe(true);
    });
  });
});

describe('checkType throws a TypeError if type argument is no string', () => {
  const pairs = [
    [ true, Boolean ],
    [ 'a', {} ],
    [ 6, 6 ]
  ];

  pairs.forEach(pair => {
    test(`${pair[0]} throws a TypeError with ${pair[1]} as type argument`, () => {
      expect(checkType.bind(null, pair[0], pair[1])).toThrow(TypeError);
    });
  });
});
