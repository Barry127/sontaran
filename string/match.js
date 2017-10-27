function match (pattern) {
  if (!(pattern instanceof RegExp)) {
    throw new TypeError('match: pattern argument is not an instance of RegExp');
  }

  return value => pattern.test(value);
}

module.exports = match;
