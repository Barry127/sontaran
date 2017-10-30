const array = {};
const methods = [
  'between',
  'contains',
  'each',
  'equals',
  'isArray',
  'isSubset',
  'isSuperset',
  'length',
  'max',
  'min',
  'of'
];

methods.forEach(method => {
  array[method] = require(`./${method}`);
});

module.exports = array;
