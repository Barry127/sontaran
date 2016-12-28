const Validator = require('./src/validator/Validator');

const validate = function validate (value) {
  return new Validator(value);
};

module.exports = {
  validate
};
