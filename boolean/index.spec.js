const { expect } = require('chai');
const boolean = require('./index');

describe('boolean', () => {

  const methods = [
    'equals',
    'isBoolean',
    'isFalse',
    'isTrue',
  ];

  methods.forEach(method => {
    it(`boolean exports ${method}`, () => {
      expect(boolean[method]).to.be.a('function');
    });
  });

});
