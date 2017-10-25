const notNan = require('./notNan');
const notNaN = require('./notNaN');

test('notNan exports notNaN', () => {
  expect(notNan).toBe(notNaN);
});
