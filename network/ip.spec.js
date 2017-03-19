const { expect } = require('chai');
const ip = require('./ip');

describe('network/ip', () => {

  const validValues = [
    '192.168.1.1',
    '255.255.255.255',
    '91.198.174.232',
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
    '192.168.1.666',
    '192.168.01.3',
    '255.168.300.1',
    '2001::0db8::cade',
    '2001:0db8::02de::1428:57ab'
  ];

  validValues.forEach(value => {
    it(`${value} is a valid ip address`, () => {
      expect(ip(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not a valid ip address`, () => {
      expect(ip(value)).to.be.false;
    });
  });

});
