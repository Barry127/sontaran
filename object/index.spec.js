const { expect } = require('chai');
const object = require('./index');

describe('object', () => {

  const methods = [
    'contains',
    'equals',
    'hasKey',
    'hasKeys',
    'hasOwnProperty',
    'isObject',
    'isSubset',
    'isSuperset',
    'length',
    'max',
    'min'
  ];

  methods.forEach(method => {
    it(`object exports ${method}`, () => {
      expect(object[method]).to.be.a('function');
    });
  });

});
