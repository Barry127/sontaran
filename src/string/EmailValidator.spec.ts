import { EmailValidator, email } from './EmailValidator';
import { badEmailDomains as blacklist } from './badEmailDomains';

describe('StringValidator', () => {
  it('exports factory method', () => {
    expect(email()).toBeInstanceOf(EmailValidator);
  });

  describe('email validation', () => {
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
    const invalidValues = [
      'Abc.example.com', // no @ character
      'A@b@c@example.com', // only one @ character is allowed outside quotation marks
      'user@localserver', // https://www.icann.org/news/announcement-2013-08-30-en
      'user@tt', // https://www.icann.org/news/announcement-2013-08-30-en
      'a"b(c)d,e:f;g<h>i[jk]l@example.com', // none of the special characters in this local-part are allowed outside quotation marks
      'just"not"right@example.com', // quoted strings must be dot separated or the only element making up the local-part
      'this is"notallowed@example.com', // spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash
      'this still"not\\allowed@example.com', // even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes
      'john..doe@example.com', // double dot before @
      'john.doe@example..com', // double dot after @
      ' john@doe.com', // a valid email address with a leading space
      'john@doe.com ' // a valid email address with a trailing space
    ];
    const validator = email();

    validValues.forEach((value) => {
      it(`${value} is a valid email`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid email`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });
  });

  describe('domain', () => {
    const validPairs = [
      ['john@doe.com', 'doe.com'],
      ['john@doe.com', 'DoE.Com'],
      ['janedoe@google.com', /google/],
      ['my@you.co.uk', /co.uk$/],
      ['bill@hotmail.com', /HotMail/i]
    ];
    const invalidPairs = [
      ['larry@gmail.com', 'hotmail.com'],
      ['bill.hotmail.com', /gmail/],
      ['some@mail.ru', 'mail.com']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} has domain ${argument}`, async () => {
        const result = await email()
          .domain(argument as string | RegExp)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not have domain ${argument}`, async () => {
        const result = await email()
          .domain(argument as string | RegExp)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when expectedDomain is not a string or RegExp', () => {
      const validator = email();
      expect(validator.domain.bind(validator, {})).toThrow(TypeError);
    });
  });

  describe('domainBlacklist', () => {
    const validValues = [
      'john@doe.com',
      'johndoe@hotmail.com',
      'janedoe@notatyopmail.com'
    ];
    const invalidValues = [
      'johndoe@yopmail.com',
      'johndoe@YopMail.com',
      'john.doe@toiea.com',
      'jane.doe@sub.fastmazda.com',
      'me@some.crazy.long.prefix.zehnminutenmail.de'
    ];
    const validator = email().domainBlacklist(blacklist);

    validValues.forEach((value) => {
      it(`${value} is a valid email`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is on blacklist`, async () => {
        const result = await validator.validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when blacklist is not an array', () => {
      const validator = email();
      expect(validator.domainBlacklist.bind(validator, 'yopmail.com')).toThrow(
        TypeError
      );
    });
  });

  describe('localPart', () => {
    it('calls name with expectedName', () => {
      const expectedName = 'a';
      const validator = email();
      validator.name = jest.fn();

      expect(validator.name).not.toBeCalled();

      validator.localPart(expectedName);

      expect(validator.name).toBeCalledWith(expectedName);
    });
  });

  describe('name', () => {
    const validPairs = [
      ['john@doe.com', 'john'],
      ['janedoe@google.com', /jane/],
      ['my-check@you.co.uk', /check$/],
      ['bill@hotmail.com', /Bill/i]
    ];
    const invalidPairs = [
      ['john@doe.com', 'JoHn'],
      ['larry@gmail.com', 'sergei'],
      ['bill@hotmail.com', /steve/],
      ['some@mail.ru', 'any']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} has local part ${argument}`, async () => {
        const result = await email()
          .name(argument as string | RegExp)
          .validate({ field: 'test', value });
        expect(result).toBeNull();
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not have local part ${argument}`, async () => {
        const result = await email()
          .name(argument as string | RegExp)
          .validate({ field: 'test', value });
        expect(result).not.toBeNull();
      });
    });

    it('throws a type error when expectedName is not a string or RegExp', () => {
      const validator = email();
      expect(validator.name.bind(validator, {})).toThrow(TypeError);
    });
  });
});
