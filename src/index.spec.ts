import DefaultExport, {
  ArrayValidator,
  array,
  BaseValidator,
  bool,
  boolean,
  BooleanValidator,
  int,
  integer,
  number,
  NumberValidator,
  Sontaran,
  StringValidator,
  string
} from '.';

it('exports everything', () => {
  expect(DefaultExport).toBe(Sontaran);
  expect(ArrayValidator).toBeDefined();
  expect(array).toBeDefined();
  expect(BaseValidator).toBeDefined();
  expect(bool).toBeDefined();
  expect(boolean).toBeDefined();
  expect(BooleanValidator).toBeDefined();
  expect(int).toBeDefined();
  expect(integer).toBeDefined();
  expect(number).toBeDefined();
  expect(NumberValidator).toBeDefined();
  expect(Sontaran).toBeDefined();
  expect(StringValidator).toBeDefined();
  expect(string).toBeDefined();
});

describe('Sontaran', () => {
  it('has static methods that return instances of validators', () => {
    expect(Sontaran.array()).toBeInstanceOf(ArrayValidator);
    expect(Sontaran.bool()).toBeInstanceOf(BooleanValidator);
    expect(Sontaran.boolean()).toBeInstanceOf(BooleanValidator);
    expect(Sontaran.int()).toBeInstanceOf(NumberValidator);
    expect(Sontaran.integer()).toBeInstanceOf(NumberValidator);
    expect(Sontaran.number()).toBeInstanceOf(NumberValidator);
    expect(Sontaran.string()).toBeInstanceOf(StringValidator);
  });
});
