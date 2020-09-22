import { string } from './string/StringValidator';
import { email } from './string/EmailValidator';
import { number } from './number/NumberValidator';
import { object } from './object/ObjectValidator';

const asyncValidatorFunction = jest
  .fn()
  .mockImplementation((v) => Promise.resolve(v));

const schema = {
  username: string()
    .notEmpty()
    .min(3)
    .max(10)
    .match(/^[a-zA-Z0-9_\-]*$/),
  password: string().min(6).label('Password'),
  email: email(),
  age: number().min(18).optional()
};

const asyncSchema = {
  ...schema,
  email: email().custom(asyncValidatorFunction)
};

const validator = object().schema(schema);
const asyncValidator = object().schema(asyncSchema);

describe('schema validation', () => {
  it('is valid with a valid user', () => {
    const result = validator.validate({
      username: 'Barry_127',
      password: 'mySuperSecretPassword',
      email: 'my@email.com',
      age: 18
    });
    expect(result.valid).toBe(true);
  });

  it('is valid without a optional field', () => {
    const result = validator.validate({
      username: 'Barry_127',
      password: 'mySuperSecretPassword',
      email: 'my@email.com'
    });
    expect(result.valid).toBe(true);
  });

  it('is invalid when a required field is missing', () => {
    const result = validator.validate({
      username: 'Barry_127',
      email: 'my@email.com',
      age: 18
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('base.required');
    expect(error.field).toBe('Password');
  });

  it('is invalid when an optional field has an invalid value', () => {
    const result = validator.validate({
      username: 'Barry_127',
      password: 'mySuperSecretPassword',
      email: 'my@email.com',
      age: 17
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('number.min');
    expect(error.field).toBe('age');
  });

  it('is invalid when one field is invalid', () => {
    const result = validator.validate({
      username: 'Barry_127',
      password: 'my',
      email: 'my@email.com',
      age: 18
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('string.min');
    expect(error.field).toBe('Password');
  });

  it('is invalid when more fields are invalid', () => {
    const result = validator.validate({
      username: 'Barry_127!',
      password: 'my',
      email: 'my!email',
      age: 18
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);

    const [e1, e2, e3] = result.errors!;
    expect(e1.type).toBe('string.match');
    expect(e1.field).toBe('username');

    expect(e2.type).toBe('string.min');
    expect(e2.field).toBe('Password');

    expect(e3.type).toBe('email.email');
    expect(e3.field).toBe('email');
  });

  it('is invalid when a key not defined in schema', () => {
    const result = validator.validate({
      username: 'Barry_127',
      password: 'mySuperSecretPassword',
      email: 'my@email.com',
      age: 18,
      extraField: 3
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('object.notinschema');
    expect(error.field).toBe('extraField');
  });

  it('does not validate schema, when another validation function has failed and abortEarly is true', () => {
    const validator = object().schema(schema).min(2);
    const result = validator.validate({ a: 1 });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('object.min');
  });

  it('throws an error when a validator is async', () => {
    expect(
      asyncValidator.validate.bind(asyncValidator, {
        username: 'Barry_127',
        password: 'mySuperSecretPassword',
        email: 'my@email.com',
        age: 18
      })
    ).toThrow(Error);
  });
});

describe('async schema validation', () => {
  it('is valid with a valid user', async () => {
    const result = await asyncValidator.validateAsync({
      username: 'Barry_127',
      password: 'mySuperSecretPassword',
      email: 'my@email.com',
      age: 18
    });
    expect(result.valid).toBe(true);
  });

  it('is valid without a optional field', async () => {
    const result = await asyncValidator.validateAsync({
      username: 'Barry_127',
      password: 'mySuperSecretPassword',
      email: 'my@email.com'
    });
    expect(result.valid).toBe(true);
  });

  it('is invalid when a required field is missing', async () => {
    const result = await asyncValidator.validateAsync({
      username: 'Barry_127',
      email: 'my@email.com',
      age: 18
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('base.required');
    expect(error.field).toBe('Password');
  });

  it('is invalid when an optional field has an invalid value', async () => {
    const result = await asyncValidator.validateAsync({
      username: 'Barry_127',
      password: 'mySuperSecretPassword',
      email: 'my@email.com',
      age: 17
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('number.min');
    expect(error.field).toBe('age');
  });

  it('is invalid when one field is invalid', async () => {
    const result = await asyncValidator.validateAsync({
      username: 'Barry_127',
      password: 'my',
      email: 'my@email.com',
      age: 18
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('string.min');
    expect(error.field).toBe('Password');
  });

  it('is invalid when more fields are invalid', async () => {
    const result = await asyncValidator.validateAsync({
      username: 'Barry_127!',
      password: 'my',
      email: 'my!email',
      age: 18
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);

    const [e1, e2, e3] = result.errors!;
    expect(e1.type).toBe('string.match');
    expect(e1.field).toBe('username');

    expect(e2.type).toBe('string.min');
    expect(e2.field).toBe('Password');

    expect(e3.type).toBe('email.email');
    expect(e3.field).toBe('email');
  });

  it('is invalid when a key not defined in schema', async () => {
    const result = await asyncValidator.validateAsync({
      username: 'Barry_127',
      password: 'mySuperSecretPassword',
      email: 'my@email.com',
      age: 18,
      extraField: 3
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('object.notinschema');
    expect(error.field).toBe('extraField');
  });

  it('does not validate schema, when another validation function has failed and abortEarly is true', async () => {
    const validator = object().schema(asyncSchema).min(2);
    const result = await validator.validateAsync({ a: 1 });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('object.min');
  });

  it('is valid with a complete sync schema', async () => {
    const result = await validator.validateAsync({
      username: 'Barry_127',
      password: 'mySuperSecretPassword',
      email: 'my@email.com',
      age: 18
    });
    expect(result.valid).toBe(true);
  });

  it('validates async when no schema is set', async () => {
    const validator = object().min(2);
    const result = await validator.validateAsync({ a: 1 });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);

    const error = result.errors?.[0]!;
    expect(error.type).toBe('object.min');
  });
});
