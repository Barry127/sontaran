const sontaran = {};
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
  sontaran[method] = require(`./${method}`);
});

module.exports = sontaran;
