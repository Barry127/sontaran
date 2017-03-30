const { expect } = require('chai');
const isJson = require('./isJson');

describe('string/isJson', () => {

  const validValues = [
    '{"title":"My Title", "slug": "my-title"}',
    '[ 1, 2, 3 ]',
    '{"number": 3, "boolean": true}',
    '[ "String", 42, true, {} ]',
    '{}',
    '[]'
  ];

  const invalidValues = [
    '"String"', // no single values
    '{ \'Key\': \'No Single Quotes\'}', // no single quites
    '{"title":"wrong", }', // trailing space
    '[ 1, ]',
    4
  ];

  validValues.forEach(value => {
    it(`${value} contains valid JSON`, () => {
      expect(isJson(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} does not contain valid JSON`, () => {
      expect(isJson(value)).to.be.false;
    });
  });

});
