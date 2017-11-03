const sontaran = require('./index');

const methods = [
  'array',
  'boolean',
  'email',
  'network',
  'number',
  'object',
  'string'
];

methods.forEach(method => {
  test(`sontaran exports ${method}`, () => {
    expect(sontaran[method]).toBe(require(`./${method}`));
  });
});
