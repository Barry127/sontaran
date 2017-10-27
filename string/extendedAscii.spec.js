const extendedAscii = require('./extendedAscii');

let extendedAsciiRange = '';
for (i = 0; i < 256; i++) {
  extendedAsciiRange += String.fromCharCode(i);
}

test('extendedAscii returns a function', () => {
  expect(extendedAscii()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    'Hello World!',
    'FooBar~!',
    'Something',
    'not-wrøng',
    extendedAsciiRange
  ];

  validValues.forEach(value => {
    test(`${value} contains only extended ascii characters`, () => {
      expect(extendedAscii()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    '♠♣♥♦',
    '😍'
  ];

  invalidValues.forEach(value => {
    test(`${value} contains non-extended ascii characters`, () => {
      expect(extendedAscii()(value)).toBe(false);
    });
  });
});
