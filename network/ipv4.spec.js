const { expect } = require('chai');
const ipv4 = require('./ipv4');

describe('network/ipv4', () => {

  const validValues = [
    '192.168.1.1',
    '255.255.255.255',
    '91.198.174.232'
  ];

  const invalidValues = [
    343,
    '192.168.1.666',
    '192.168.01.3',
    '255.168.300.1'
  ];

  validValues.forEach(value => {
    it(`${value} is a valid IPv4 address`, () => {
      expect(ipv4(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not a valid IPv4 address`, () => {
      expect(ipv4(value)).to.be.false;
    });
  });

});
