const { expect }      = require('chai');
const { spy, stub }   = require('sinon');
const EmailValidator  = require('./Email');

const validEmails = [
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

const invalidEmails = [
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

describe('Validator / types / Email', () => {

  it('Throws a TypeError if given value is undefined', () => {
    const createValidator = () => {
      return new EmailValidator();
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given value is null', () => {
    const value = null;
    const createValidator = () => {
      return new EmailValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given value is boolean', () => {
    const value = true;
    const createValidator = () => {
      return new EmailValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given value is number', () => {
    const value = 42;
    const createValidator = () => {
      return new EmailValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Throws a TypeError if given value is object', () => {
    const value = {};
    const createValidator = () => {
      return new EmailValidator(value);
    }

    expect(createValidator).to.throw(TypeError);
  });

  it('Returns itself if given value is a valid email address', () => {
    const createValidator = (value) => {
      return new EmailValidator(value);
    }

    validEmails.forEach((email) => {
      expect(createValidator(email)).to.be.an.instanceof(EmailValidator);
    });
  });

  it('Throws an Error if given value is an invalid email address', () => {
    const createValidator = (value) => {
      return new EmailValidator(value);
    }

    invalidEmails.forEach((email) => {
      expect(createValidator.bind(null, email)).to.throw(Error);
    });
  });

  describe('domain', () => {
    const value = 'john@doe.com';
    const validator = new EmailValidator(value);

    it('Throws a TypeError if domainName is not of type string', () => {
      expect(validator.domain.bind(validator, {})).to.throw(TypeError);
    });

    it('Returns itself if the domain of the value email is domainName', () => {
      expect(validator.domain('doe.com')).to.be.an.instanceof(EmailValidator);
    });

    it('Returns itself if the domain of the value email is domainName but casing is different', () => {
      expect(validator.domain('DoE.cOm')).to.be.an.instanceof(EmailValidator);
    });

    it('Throws an Error if the domain of the value email does not equal domainName', () => {
      expect(validator.domain.bind(validator, 'dane.com')).to.throw(Error);
    });

  });

  describe('domainMatch', () => {

    const value = 'john.doe@gmail.com';
    const validator = new EmailValidator(value);

    it('Throws a TypeError if pattern is not of type RegExp', () => {
      expect(validator.domainMatch.bind(validator, {})).to.throw(TypeError);
    });

    it('Returns itself if the value matches pattern', () => {
      expect(validator.domainMatch(/gmail/)).to.be.an.instanceof(EmailValidator);
    });

    it('Calls pattern.test', () => {
      const regexp = /gmail/;
      regexp.test = stub();
      regexp.test.withArgs('gmail.com').returns(true);

      validator.domainMatch(regexp);
      expect(regexp.test.calledOnce).to.be.ok;
      expect(regexp.test.calledWithExactly('gmail.com')).to.be.ok;
    });

    it('Throws an Error if the value does not match pattern', () => {
      expect(validator.domainMatch.bind(validator, /\.org/)).to.throw(Error);
    });

    it('matchDomain is a shortcut for domainMatch', () => {
      const regexp = /gmail/;
      validator.domainMatch = spy();
      validator.matchDomain(regexp);

      expect(validator.domainMatch.calledOnce).to.be.ok;
      expect(validator.domainMatch.calledWithExactly(regexp)).to.be.ok;
    });

  });

  describe('name', () => {

    const value = 'john@doe.com';
    const validator = new EmailValidator(value);

    it('Throws a TypeError if checkValue is not of type string', () => {
      expect(validator.name.bind(validator, true)).to.throw(TypeError);
    });

    it('Returns itself if the local-part of the value email matches checkValue', () => {
      expect(validator.name('john')).to.be.an.instanceof(EmailValidator);
    });

    it('Throws an Error if the local-part of the value email matches checkValue but casing is different', () => {
      expect(validator.name.bind(validator, 'John')).to.throw(Error);
    });

    it('Throws an error if the local-part does not equal checkValue', () => {
      expect(validator.name.bind(validator, 'jane')).to.throw(Error);
    });

  });

  describe('nameMatch', () => {

    const value = 'john.doe@gmail.com';
    const validator = new EmailValidator(value);

    it('Throws a TypeError if pattern is not of type RegExp', () => {
      expect(validator.nameMatch.bind(validator, 42)).to.throw(TypeError);
    });

    it('Returns itself if the value matches pattern', () => {
      expect(validator.nameMatch(/john/)).to.be.an.instanceof(EmailValidator);
    });

    it('Calls pattern.test', () => {
      const regexp = /doe/;
      regexp.test = stub();
      regexp.test.withArgs('john.doe').returns(true);
      validator.nameMatch(regexp);

      expect(regexp.test.calledOnce).to.be.ok;
      expect(regexp.test.calledWithExactly('john.doe')).to.be.ok;
    });

    it('Throws an Error if the value does not match pattern', () => {
      expect(validator.nameMatch.bind(validator, /jane/)).to.throw(Error);
    });

    it('matchName is a shortcut for nameMatch', () => {
      const regexp = /john/;
      validator.nameMatch = spy();
      validator.matchName(regexp);

      expect(validator.nameMatch.calledOnce).to.be.ok;
      expect(validator.nameMatch.calledWithExactly(regexp)).to.be.ok;
    });

  });

  describe('noThrowAway', () => {

    it('Throws an Error if the domain of the value email ends with a blacklisted domain', () => {
      const a = 'john.doe@yopmail.com';
      const b = 'john.doe@sub.yopmail.com';
      const c = 'john.doe@some.crazy.long.prefix.yopmail.com';

      const validatorA = new EmailValidator(a);
      const validatorB = new EmailValidator(b);
      const validatorC = new EmailValidator(c);

      expect(validatorA.noThrowAway.bind(validatorA)).to.throw(Error);
      expect(validatorB.noThrowAway.bind(validatorB)).to.throw(Error);
      expect(validatorC.noThrowAway.bind(validatorC)).to.throw(Error);
    });

    it('Returns itself if domain is not blacklisted', () => {
      const validEmail = 'john.doe@notatyopmail.com';
      const validator = new EmailValidator(validEmail);

      expect(validator.noThrowAway()).to.be.an.instanceof(EmailValidator);
    });

  });

});
