const { expect } = require('chai');
const network = require('./index');

describe('network', () => {

  const methods = [
    'ip',
    'ipv4',
    'ipv6',
    'mac'
  ];

  methods.forEach(method => {
    it(`network exports ${method}`, () => {
      expect(network[method]).to.be.a('function');
    });
  });

});
