const boolean = {};
const methods = [
  'equals',
  'isBool',
  'isBoolean',
  'isFalse',
  'isTrue'
];

methods.forEach(method => {
  boolean[method] = require(`./${method}`);
});

module.exports = boolean;
