const validator = require('./validator');

test('validator returns a function', () => {
  expect(validator(() => true)).toBeInstanceOf(Function);
});

test('validator passes the test value to all functions', () => {
  const spy1 = jest.fn().mockReturnValue(true);
  const spy2 = jest.fn().mockReturnValue(true);
  const spy3 = jest.fn().mockReturnValue(true);

  const myValidator = validator(spy1, spy2, spy3);
  const testValue = 'TEST';
  myValidator(testValue);

  expect(spy1.mock.calls[0][0]).toBe(testValue);
  expect(spy2.mock.calls[0][0]).toBe(testValue);
  expect(spy3.mock.calls[0][0]).toBe(testValue);
});

test('validator calls all functions in order', () => {
  let a, b, c;
  let i = 1;
  function fnA () {
    a = i++;
    return true;
  }
  function fnB () {
    b = i++;
    return true;
  }
  function fnC () {
    c = i++;
    return true;
  }

  const myValidator = validator(fnA, fnB, fnC);
  myValidator();

  expect(i).toBe(4);
  expect(a).toBe(1);
  expect(b).toBe(2);
  expect(c).toBe(3);
});

test('validator does not run any function after a previous function has returned a falsy value', () => {
  const spy1 = jest.fn().mockReturnValue(true);
  const spy2 = jest.fn().mockReturnValue(false);
  const spy3 = jest.fn().mockReturnValue(true);

  const myValidator = validator(spy1, spy2, spy3);
  myValidator();

  expect(spy1.mock.calls.length).toBe(1);
  expect(spy2.mock.calls.length).toBe(1);
  expect(spy3.mock.calls.length).toBe(0);
});

describe('Real world examples', () => {

  describe('Username', () => {
    const isString = require('./string/isString');
    const notEmpty = require('./string/notEmpty');
    const min      = require('./string/min');
    const max      = require('./string/max');
    const match    = require('./string/match');

    const usernameValidator = validator(
      isString(),
      notEmpty(),
      min(3),
      max(10),
      match(/^[a-zA-Z0-9_\-]*$/)
    );

    const validValues = [
      'Barry127',
      'barry_127',
      'JohnDoe',
      'hi-world'
    ];

    const invalidValues = [
      7331, // no string
      '  \t\r', // empty
      'aa', // too short
      'Doctor__Who', // too long
      'h@ashT#g' // invalid characters
    ];

    validValues.forEach(value => {
      test(`${value} is a valid username`, () => {
        expect(usernameValidator(value)).toBe(true);
      });
    });

    invalidValues.forEach(value => {
      test(`${value} is not a valid username`, () => {
        expect(usernameValidator(value)).toBe(false);
      });
    });
  });

  describe('Email', () => {
    const isString = require('./string/isString');
    const isEmail = require('./email/isEmail');
    const noThrowAway = require('./email/noThrowAway');

    const emailValidator = validator(
      isString(),
      isEmail(),
      noThrowAway()
    );

    const validValues = [
      'me@you.com',
      'info@my.sub.domain.co.uk',
      'email@domain.tld'
    ];

    const invalidValues = [
      7331, // no string
      'meAtYou.com', // no email
      'throwAway@yopmail.com' // throw away email
    ];

    validValues.forEach(value => {
      test(`${value} is a valid email`, () => {
        expect(emailValidator(value)).toBe(true);
      });
    });

    invalidValues.forEach(value => {
      test(`${value} is not a valid email`, () => {
        expect(emailValidator(value)).toBe(false);
      });
    });
  });

  describe('Age', () => {
    const isNumber = require('./number/isNumber');
    const isInteger = require('./number/isInteger');
    const between = require('./number/between');

    const ageValidator = validator(
      isNumber(),
      isInteger(),
      between(17, 120)
    );

    const validValues = [
      18,
      89,
      119,
      47
    ];

    const invalidValues = [
      '18', // not a number,
      Number.NaN, // not between 17 and 120
      17, // too young
      120, // nobody is that old
      23.5 // not an integer
    ];

    validValues.forEach(value => {
      test(`${value} is a valid age`, () => {
        expect(ageValidator(value)).toBe(true);
      });
    });

    invalidValues.forEach(value => {
      test(`${value} is not a valid age`, () => {
        expect(ageValidator(value)).toBe(false);
      });
    });
  });

});

describe('Invalid arguments', () => {
  test('validator throws a type error if the arument is not a function', () => {
    expect(validator.bind(null, true)).toThrow(TypeError);
  });

  test('validator throws a type error if one of the aruments is not a function', () => {
    expect(validator.bind(null, () => true, true)).toThrow(TypeError);
  });
});
