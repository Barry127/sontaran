const _enum = require('./enum');
const oneOf = require('./oneOf');

test('enum exports oneOf', () => {
  expect(_enum).toBe(oneOf);
});
