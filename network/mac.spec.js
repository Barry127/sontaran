const mac = require('./mac');

test('mac returns a function', () => {
  expect(mac()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    '00:0c:6e:d2:11:e6',
    'FF:FF:FF:FF:FF:FF',
    'b4:77:EE:00:00:43'
  ];

  validValues.forEach(value => {
    test(`${value} is a valid MAC address`, () => {
      expect(mac()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    '123',
    '00:0h:6e:d2:11:e6',
    '127.0.0.1',
    '2001:0db8:85a3:0000:1319:8a2e:0370:7344'
  ];

  invalidValues.forEach(value => {
    test(`${value} is not a valid MAC address`, () => {
      expect(mac()(value)).toBe(false);
    });
  });
});
