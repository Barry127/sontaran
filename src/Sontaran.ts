import { BaseValidator, ValidatorOptions } from './BaseValidator';

export class Sontaran extends BaseValidator {}

export const any = (options: Partial<ValidatorOptions> = {}) =>
  new Sontaran(options);
