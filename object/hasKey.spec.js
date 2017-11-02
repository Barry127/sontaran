const hasKey = require('./hasKey');
const hasOwnProperty = require('./hasOwnProperty');

test('hasKey exports hasOwnProperty', () => {
  expect(hasKey).toBe(hasOwnProperty);
});
