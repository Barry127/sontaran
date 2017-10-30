const noThrowAway = require('./noThrowAway');

test('noThrowAway returns a function', () => {
  expect(noThrowAway()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    'john@doe.com',
    'johndoe@hotmail.com',
    'janedoe@notatyopmail.com'
  ];

  validValues.forEach(value => {
    test(`${value} is not a throw away email account`, () => {
      expect(noThrowAway()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    'johndoe@yopmail.com',
    'johndoe@YopMail.com',
    'john.doe@toiea.com',
    'jane.doe@sub.fastmazda.com',
    'me@some.crazy.long.prefix.zehnminutenmail.de'
  ];

  invalidValues.forEach(value => {
    test(`${value} is a throw away email account`, () => {
      expect(noThrowAway()(value)).toBe(false);
    });
  });
});
