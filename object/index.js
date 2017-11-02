const object = {};
const methods = [
  'contains',
  'equals',
  'hasKey',
  'hasKeys',
  'hasOwnProperties',
  'hasOwnProperty',
  'isObject',
  'isSubset',
  'isSuperset',
  'length',
  'max',
  'min'
];

methods.forEach(method => {
  object[method] = require(`./${method}`);
});

module.exports = object;
