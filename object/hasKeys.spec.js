const hasKeys = require('./hasKeys');
const hasOwnProperties = require('./hasOwnProperties');

test('hasKeys exports hasOwnProperties', () => {
  expect(hasKeys).toBe(hasOwnProperties);
});
