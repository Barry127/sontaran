const isBool = require('./isBool');
const isBoolean = require('./isBoolean');

test('isBool exports isBoolean', () => {
  expect(isBool).toBe(isBoolean);
});
