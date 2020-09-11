import { BaseValidator } from './BaseValidator';
import { ValidatorOptions } from './types';

export class Sontaran extends BaseValidator {}

export const any = (options: Partial<ValidatorOptions> = {}) =>
  new Sontaran(options);
