const upperCase = require('./upperCase');
const uppercase = require('./uppercase');

test('upperCase exports uppercase', () => {
  expect(upperCase).toBe(uppercase);
});
