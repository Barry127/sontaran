import DefaultExport, { BaseValidator, Sontaran } from '.';

it('exports everything', () => {
  expect(DefaultExport).toBe(Sontaran);
  expect(BaseValidator).toBeDefined();
  expect(Sontaran).toBeDefined();
});
