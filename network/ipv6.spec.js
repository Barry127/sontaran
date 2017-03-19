const { expect } = require('chai');
const ipv6 = require('./ipv6');

describe('network/ipv6', () => {

  const validValues = [
    '2001:0db8:85a3:0000:1319:8a2e:0370:7344',
    '2001:0db8:85a3:0:1319:8a2e:0370:7344',
    '2001:0db8:85a3::1319:8a2e:0370:7344',
    '2001:0db8:0000:0000:0000:0000:1428:57ab',
    '2001:0db8:0000:0000:0000::1428:57ab',
    '2001:0db8:0:0:0:0:1428:57ab',
    '2001:0db8:0::0:1428:57ab',
    '2001:0db8::1428:57ab',
    '2001:0db8:02de::0e13',
    '2001:db8:2de::e13',
    '::ffff:192.168.89.9'
  ];

  const invalidValues = [
    343,
    '2001::0db8::cade',
    '2001:0db8::02de::1428:57ab'
  ];

  validValues.forEach(value => {
    it(`${value} is a valid IPv6 address`, () => {
      expect(ipv6(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not a valid IPv6 address`, () => {
      expect(ipv6(value)).to.be.false;
    });
  });

});
