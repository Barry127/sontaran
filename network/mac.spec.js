const { expect } = require('chai');
const mac = require('./mac');

describe('network/mac', () => {

  const validValues = [
    '00:0c:6e:d2:11:e6',
    'FF:FF:FF:FF:FF:FF',
    'b4:77:EE:00:00:43'
  ];

  const invalidValues = [
    123,
    '00:0h:6e:d2:11:e6',
    '127.0.0.1',
    '2001:0db8:85a3:0000:1319:8a2e:0370:7344'
  ];

  validValues.forEach(value => {
    it(`${value} is a valid MAC address`, () => {
      expect(mac(value)).to.be.true;
    });
  });

  invalidValues.forEach(value => {
    it(`${value} is not a valid MAC address`, () => {
      expect(mac(value)).to.be.false;
    });
  });

});
