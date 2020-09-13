import DefaultExport, {
  any,
  BaseValidator,
  BooleanValidator,
  badEmailDomains,
  bool,
  boolean,
  int,
  integer,
  NumberValidator,
  number,
  Sontaran,
  StringValidator,
  string
} from '.';
it('exports everything', () => {
  expect(any).toBeDefined();
  expect(DefaultExport).toBe(Sontaran);
  // expect(ArrayValidator).toBeDefined();
  // expect(array).toBeDefined();
  expect(BaseValidator).toBeDefined();
  expect(BooleanValidator).toBeDefined();
  expect(bool).toBeDefined();
  expect(boolean).toBeDefined();
  // expect(email).toBeDefined();
  // expect(EmailValidator).toBeDefined();
  expect(int).toBeDefined();
  expect(integer).toBeDefined();
  // expect(network).toBeDefined();
  // expect(NetworkValidator).toBeDefined();
  expect(NumberValidator).toBeDefined();
  expect(number).toBeDefined();
  expect(Sontaran).toBeDefined();
  expect(StringValidator).toBeDefined();
  expect(string).toBeDefined();

  expect(Array.isArray(badEmailDomains)).toBe(true);
});
