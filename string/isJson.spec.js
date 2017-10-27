const isJson = require('./isJson');

test('isJson returns a function', () => {
  expect(isJson()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    '{"title":"My Title", "slug": "my-title"}',
    '[ 1, 2, 3 ]',
    '{"number": 3, "boolean": true}',
    '[ "String", 42, true, {} ]',
    '{}',
    '[]'
  ];

  validValues.forEach(value => {
    test(`${value} is valid JSON`, () => {
      expect(isJson()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    '"String"', // no single values
    '{ \'Key\': \'No Single Quotes\'}', // no single quites
    '{"title":"wrong", }', // trailing space
    '[ 1, ]',
    4
  ];

  invalidValues.forEach(value => {
    test(`${value} is not valid JSON`, () => {
      expect(isJson()(value)).toBe(false);
    });
  });
});
