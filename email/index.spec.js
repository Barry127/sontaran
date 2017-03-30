const { expect } = require('chai');
const email = require('./index');

describe('email', () => {

  const methods = [
    'domain',
    'isEmail',
    'name',
    'noThrowAway'
  ];

  methods.forEach(method => {
    it(`email exports ${method}`, () => {
      expect(email[method]).to.be.a('function');
    });
  });

});
