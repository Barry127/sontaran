import DefaultExport, {
  BaseValidator,
  bool,
  boolean,
  BooleanValidator,
  Sontaran
} from '.';

it('exports everything', () => {
  expect(DefaultExport).toBe(Sontaran);
  expect(BaseValidator).toBeDefined();
  expect(bool).toBeDefined();
  expect(boolean).toBeDefined();
  expect(BooleanValidator).toBeDefined();
  expect(Sontaran).toBeDefined();
});

describe('Sontaran', () => {
  it('has static methods that return instances of validators', () => {
    expect(Sontaran.bool()).toBeInstanceOf(BooleanValidator);
    expect(Sontaran.boolean()).toBeInstanceOf(BooleanValidator);
  });
});
