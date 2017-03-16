/**
 * check if value is of certain type
 * @param  {Mixed}  value Value to check
 * @param  {String} type  Type to check value for
 * @return {Boolean}      Result
 */
function checkType (value, type) {
  if (typeof type !== 'string') {
    return false;
  }

  return (typeof value === type.toLowerCase()); // eslint-disable-line valid-typeof
}

module.exports = checkType;
