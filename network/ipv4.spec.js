const ipv4 = require('./ipv4');

test('ipv4 returns a function', () => {
  expect(ipv4()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    '192.168.1.1',
    '255.255.255.255',
    '91.198.174.232',
    '127.0.0.1'
  ];

  validValues.forEach(value => {
    test(`${value} is a valid IPv4 address`, () => {
      expect(ipv4()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    '343',
    '192.168.1.666',
    '192.168.01.3',
    '255.168.300.1'
  ];

  invalidValues.forEach(value => {
    test(`${value} is not a valid IPv4 address`, () => {
      expect(ipv4()(value)).toBe(false);
    });
  });
});
