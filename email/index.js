const email = {};
const methods = [
  'domain',
  'isEmail',
  'localPart',
  'name',
  'noThrowAway'
];

methods.forEach(method => {
  email[method] = require(`./${method}`);
});

module.exports = email;
