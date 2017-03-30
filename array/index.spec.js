const { expect } = require('chai');
const array = require('./index');

describe('array', () => {

  const methods = [
    'between',
    'contains',
    'equals',
    'isArray',
    'isSubset',
    'isSuperset',
    'length',
    'max',
    'min',
    'of'
  ];

  methods.forEach(method => {
    it(`array exports ${method}`, () => {
      expect(array[method]).to.be.a('function');
    });
  });

});
