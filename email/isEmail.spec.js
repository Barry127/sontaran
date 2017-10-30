const isEmail = require('./isEmail');

test('isEmail returns a function', () => {
  expect(isEmail()).toBeInstanceOf(Function);
});

describe('Valid values', () => {
  const validValues = [
    'prettyandsimple@example.com',
    'very.common@example.com',
    'disposable.style.email.with+symbol@example.com',
    'other.email-with-dash@example.com',
    'x@example.com', // one-letter local-part
    '"much.more unusual"@example.com',
    '"very.unusual.@.unusual.com"@example.com',
    'example-indeed@strange-example.com',
    `#!$%&'*+-/=?^_\`{}|~@example.org`,
    `"()<>[]:,;@\\\"!#$%&'-/=?^_\`{}| ~.a"@example.org`,
    '" "@example.org', // space between the quotes
    'example@s.solutions', // new TLD
    'user@[IPv6:2001:DB8::1]', // IPv6 address
    'user@172.217.17.101' // IPv4 address
  ];

  validValues.forEach(value => {
    test(`${value} is a valid email`, () => {
      expect(isEmail()(value)).toBe(true);
    });
  });
});

describe('Invalid values', () => {
  const invalidValues = [
    33,
    true,
    {},
    'Abc.example.com', // no @ character
    'A@b@c@example.com', // only one @ character is allowed outside quotation marks
    'user@localserver', // https://www.icann.org/news/announcement-2013-08-30-en
    'user@tt', // https://www.icann.org/news/announcement-2013-08-30-en
    'a"b(c)d,e:f;g<h>i[j\k]l@example.com', // none of the special characters in this local-part are allowed outside quotation marks
    'just"not"right@example.com', // quoted strings must be dot separated or the only element making up the local-part
    'this is"not\allowed@example.com', // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
    'this\ still\"not\\allowed@example.com', // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
    'john..doe@example.com', // double dot before @
    'john.doe@example..com', // double dot after @
    ' john@doe.com', // a valid email address with a leading space
    'john@doe.com ', // a valid email address with a trailing space
  ];

  invalidValues.forEach(value => {
    test(`${value} is not a valid email`, () => {
      expect(isEmail()(value)).toBe(false);
    });
  });
});
