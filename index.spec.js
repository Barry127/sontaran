const { expect } = require('chai');
const sontaran = require('./index');

describe('sontaran', () => {

  const validator = [
    'array',
    'boolean',
    'email',
    'helpers',
    'network',
    'number',
    'object',
    'string'
  ];

  validator.forEach(method => {
    it(`sontaran exports ${method}`, () => {
      expect(sontaran[method]).to.be.a('object');
    });
  });

});
