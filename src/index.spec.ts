import DefaultExport, {
  BaseValidator,
  bool,
  boolean,
  BooleanValidator,
  Sontaran,
  StringValidator,
  string
} from '.';

it('exports everything', () => {
  expect(DefaultExport).toBe(Sontaran);
  expect(BaseValidator).toBeDefined();
  expect(bool).toBeDefined();
  expect(boolean).toBeDefined();
  expect(BooleanValidator).toBeDefined();
  expect(Sontaran).toBeDefined();
  expect(StringValidator).toBeDefined();
  expect(string).toBeDefined();
});

describe('Sontaran', () => {
  it('has static methods that return instances of validators', () => {
    expect(Sontaran.bool()).toBeInstanceOf(BooleanValidator);
    expect(Sontaran.boolean()).toBeInstanceOf(BooleanValidator);
    expect(Sontaran.string()).toBeInstanceOf(StringValidator);
  });
});
