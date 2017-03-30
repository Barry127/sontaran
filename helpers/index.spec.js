const { expect } = require('chai');
const helpers = require('./index');

describe('helpers', () => {

  const methods = [
    'checkType',
    'getOwnProperties'
  ];

  methods.forEach(method => {
    it(`helpers exports ${method}`, () => {
      expect(helpers[method]).to.be.a('function');
    });
  });

});
