const localPart = require('./localPart');
const name = require('./name');

test('localPart exports name', () => {
  expect(localPart).toBe(name);
});
