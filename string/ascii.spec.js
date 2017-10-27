const ascii = require('./ascii');

let asciiRange = '';
for (i = 0; i < 128; i++) {
  asciiRange += String.fromCharCode(i);
}

test('ascii returns a function', () => {
  expect(ascii()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    'Hello World!',
    'FooBar~!',
    'Something',
    asciiRange
  ];

  validValues.forEach(value => {
    test(`${value} contains only ascii characters`, () => {
      expect(ascii()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    '♠♣♥♦',
    'wrøng',
    '😍'
  ];

  invalidValues.forEach(value => {
    test(`${value} contains non-ascii characters`, () => {
      expect(ascii()(value)).toBe(false);
    });
  });
});
