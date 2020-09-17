import { ObjectValidator, object } from './ObjectValidator';

describe('ObjectValidator', () => {
  //@ts-ignore
  const MyObject = function (): any {
    //@ts-ignore
    this.a = 1;
    //@ts-ignore
    this.b = 2;
    //@ts-ignore
    this.c = 3;
  };

  MyObject.prototype.x = 24;
  MyObject.prototype.y = 25;
  MyObject.prototype.z = 26;

  it('exports factory method', () => {
    expect(object()).toBeInstanceOf(ObjectValidator);
  });

  describe('object validation', () => {
    const validValues = [{}, new Object(), []];
    const invalidValues = ['42', '-3', true, '#4', undefined, null];
    const validator = object();

    validValues.forEach((value) => {
      it(`${value} is a valid object`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidValues.forEach((value) => {
      it(`${value} is not a valid object`, () => {
        const result = validator.validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = validator.label('myLabel').validate('true');
      const error = result.errors?.[0]!;
      expect(error.type).toBe('object.object');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('object');
    });
  });

  describe('contains', () => {
    const validPairs = [
      [{ a: 1, b: 2, c: 3 }, 3],
      [{ a: 1, b: 2, c: 3 }, 1],
      [{ foo: 'bar' }, 'bar'],
      [{ a: 255, b: 333 }, 0xff],
      [['aa'], 'aa']
    ];
    const invalidPairs = [
      [{ a: 1, b: 2, c: 3 }, 4],
      [{ a: 1, b: 2, c: 3 }, '3'],
      [{ foo: { bar: 'baz' } }, { bar: 'baz' }]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} contains ${argument}`, () => {
        const result = object().contains(argument).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not contains ${argument}`, () => {
        const result = object().contains(argument).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('sets correct error type and message', () => {
      const result = object().contains(2).label('myLabel').validate({ a: 1 });
      const error = result.errors?.[0]!;
      expect(error.type).toBe('object.contains');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('2');
    });
  });

  describe('equals', () => {
    const validPairs = [
      [{ foo: 'bar' }, { foo: 'bar' }],
      //@ts-ignore
      [new MyObject(), { a: 1, b: 2, c: 3 }],
      [
        [1, 2],
        [1, 2]
      ],
      [
        { a: 1, b: 2 },
        { b: 2, a: 1 }
      ],
      [{ a: 255 }, { a: 0xff }]
    ];
    const invalidPairs = [
      [{ foo: 'bar' }, { foo: 'bar', baz: 'quux' }],
      //@ts-ignore
      [new MyObject(), { a: 1, b: 2, c: 3, x: 24, y: 25, z: 26 }],
      [
        [1, 2],
        [2, 1]
      ],
      [{ a: 1 }, { a: '1' }],
      [{ foo: { bar: 'baz' } }, { foo: { bar: 'baz' } }]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} equals ${argument}`, () => {
        const result = object().equals(argument).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not equals ${argument}`, () => {
        const result = object().equals(argument).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('equals throws a TypeError when expectedValue is not an Array', () => {
      const validator = object();
      expect(validator.equals.bind(validator, 'a' as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = object()
        .equals({ a: 1, b: 2 })
        .label('myLabel')
        .validate({ a: 2 });
      const error = result.errors?.[0]!;
      expect(error.type).toBe('object.equals');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('{a:1,b:2}');
    });
  });

  describe('hasKey', () => {
    it('calls hasOwnProperty with key', () => {
      const key = 'a';
      const validator = object();
      validator.hasOwnProperty = jest.fn();

      expect(validator.hasOwnProperty).not.toBeCalled();

      validator.hasKey(key);

      expect(validator.hasOwnProperty).toBeCalledWith(key);
    });
  });

  describe('hasOwnProperty', () => {
    const validPairs = [
      [{ foo: 1, bar: 2 }, 'foo'],
      //@ts-ignore
      [new MyObject(), 'c']
    ];
    const invalidPairs = [
      [{ foo: 1, bar: 2 }, 'baz'],
      //@ts-ignore
      [new MyObject(), 'z'],
      [['aa'], 'aa'],
      [{ '2': 2 }, 'true']
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} has own property ${argument}`, () => {
        const result = object().hasOwnProperty(argument).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} does not have own property ${argument}`, () => {
        const result = object().hasOwnProperty(argument).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('hasOwnProperty throws a TypeError when expectedValue is not a string', () => {
      const validator = object();
      expect(validator.hasOwnProperty.bind(validator, 3 as any)).toThrow(
        TypeError
      );
    });

    it('sets correct error type and message', () => {
      const result = object()
        .hasOwnProperty('foo')
        .label('myLabel')
        .validate({ bar: 2 });
      const error = result.errors?.[0]!;
      expect(error.type).toBe('object.hasownproperty');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('foo');
    });
  });

  describe('includes', () => {
    it('calls contains with expectedValue', () => {
      const expectedValue = 'a';
      const validator = object();
      validator.contains = jest.fn();

      expect(validator.contains).not.toBeCalled();

      validator.includes(expectedValue);

      expect(validator.contains).toBeCalledWith(expectedValue);
    });
  });

  describe('isSubsetOf', () => {
    const validPairs = [
      [
        { a: 1, b: 2 },
        { a: 1, b: 2 }
      ],
      [
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3, d: 4 }
      ],
      [
        { a: 1, b: 2, c: 3 },
        { b: 2, a: 1, c: 3 }
      ],
      [
        [1, 2, 3],
        [1, 2, 3]
      ],
      [{ a: 255 }, { a: 0xff, b: 0xfe, c: 0xfd }]
    ];
    const invalidPairs = [
      [
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2 }
      ],
      [
        { a: '1', b: 2 },
        { a: 1, b: 2 }
      ],
      [{ foo: { bar: 'baz' } }, { foo: { bar: 'baz' } }],
      [{ b: 'a' }, { a: 'a' }],
      [
        [1, 2, 3],
        [3, 2, 1]
      ]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is a subset of ${argument}`, () => {
        const result = object().isSubsetOf(argument).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not a subset of ${argument}`, () => {
        const result = object().isSubsetOf(argument).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('isSubsetOf throws a TypeError when superset is not an Array', () => {
      const validator = object();
      expect(validator.isSubsetOf.bind(validator, '' as any)).toThrow(
        TypeError
      );
    });

    it('sets correct error type and message', () => {
      const result = object()
        .isSubsetOf({ a: 1 })
        .label('myLabel')
        .validate({ b: 1 });
      const error = result.errors?.[0]!;
      expect(error.type).toBe('object.subset');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('{a:1}');
    });
  });

  describe('isSupersetOf', () => {
    const validPairs = [
      [
        { a: 1, b: 2 },
        { a: 1, b: 2 }
      ],
      [
        { a: 1, b: 2, c: 3, d: 4 },
        { a: 1, b: 2, c: 3 }
      ],
      [
        { a: 1, b: 2, c: 3 },
        { b: 2, a: 1, c: 3 }
      ],
      [
        [1, 2, 3],
        [1, 2, 3]
      ],
      [{ a: 0xff, b: 0xfe, c: 0xfd }, { a: 255 }]
    ];
    const invalidPairs = [
      [
        { a: 1, b: 2 },
        { a: 1, b: 2, c: 3 }
      ],
      [
        { a: '1', b: 2 },
        { a: 1, b: 2 }
      ],
      [{ foo: { bar: 'baz' } }, { foo: { bar: 'baz' } }],
      [{ a: 'a' }, ['a']],
      [
        [1, 2, 3],
        [3, 2, 1]
      ]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} is a superset of ${argument}`, () => {
        const result = object().isSupersetOf(argument).validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} is not a superset of ${argument}`, () => {
        const result = object().isSupersetOf(argument).validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('isSupersetOf throws a TypeError when subset is not an Array', () => {
      const validator = object();
      expect(validator.isSupersetOf.bind(validator, '' as any)).toThrow(
        TypeError
      );
    });

    it('sets correct error type and message', () => {
      const result = object()
        .isSupersetOf({ a: 1 })
        .label('myLabel')
        .validate({ b: 1 });
      const error = result.errors?.[0]!;
      expect(error.type).toBe('object.superset');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('{a:1}');
    });
  });

  describe('length', () => {
    const validPairs = [
      [{ foo: 1, bar: 2 }, 2],
      //@ts-ignore
      [new MyObject(), 3],
      [['a', 'b', 'c'], 3]
    ];
    const invalidPairs = [
      [{ foo: 1, bar: 2 }, 3],
      //@ts-ignore
      [new MyObject(), 6],
      [['aa'], 2],
      [{ '2': 2 }, 2]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`${value} has length ${argument}`, () => {
        const result = object()
          .length(argument as number)
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`${value} has not length ${argument}`, () => {
        const result = object()
          .length(argument as number)
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('length throws a TypeError when expectedLength is not an number', () => {
      const validator = object();
      expect(validator.length.bind(validator, '2' as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = object().length(5).label('myLabel').validate({ a: 1 });
      const error = result.errors?.[0]!;
      expect(error.type).toBe('object.length');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('5');
    });
  });

  describe('max', () => {
    const validPairs = [
      [{ a: 1, b: 2, c: 3 }, 5],
      [{ a: 1, b: 2, c: 3, d: 4 }, 4],
      [[1], 1],
      [{ a: 255, b: 333 }, 0xff]
    ];
    const invalidPairs = [
      [{ a: 1, b: 2, c: 3 }, 2],
      [{ a: 1, b: 2, c: 3 }, 1],
      [{ a: 1, b: 2, c: 3 }, Number.NaN]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`length of ${value} is not greater than ${argument}`, () => {
        const result = object()
          .max(argument as number)
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`length of ${value} is greater than ${argument}`, () => {
        const result = object()
          .max(argument as number)
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('max throws a TypeError when maxLength is not an number', () => {
      const validator = object();
      expect(validator.max.bind(validator, '2' as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = object()
        .max(2)
        .label('myLabel')
        .validate({ a: 1, b: 2, c: 3 });
      const error = result.errors?.[0]!;
      expect(error.type).toBe('object.max');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('2');
    });
  });

  describe('min', () => {
    const validPairs = [
      [{ a: 1, b: 2, c: 3 }, 2],
      [{ a: 1, b: 2, c: 3, d: 4 }, 4],
      [[1], 1],
      [{ a: 255, b: 333 }, 0x00]
    ];
    const invalidPairs = [
      [{ a: 1, b: 2, c: 3 }, 4],
      [{ a: 1, b: 2, c: 3 }, 43],
      [{ a: 1, b: 2, c: 3 }, Number.NaN],
      [['abc'], 3]
    ];

    validPairs.forEach(([value, argument]) => {
      it(`length of ${value} is not less than ${argument}`, () => {
        const result = object()
          .min(argument as number)
          .validate(value);
        expect(result.valid).toBe(true);
      });
    });

    invalidPairs.forEach(([value, argument]) => {
      it(`length of ${value} is less than ${argument}`, () => {
        const result = object()
          .min(argument as number)
          .validate(value);
        expect(result.valid).toBe(false);
      });
    });

    it('min throws a TypeError when minLength is not an number', () => {
      const validator = object();
      expect(validator.min.bind(validator, '2' as any)).toThrow(TypeError);
    });

    it('sets correct error type and message', () => {
      const result = object()
        .min(4)
        .label('myLabel')
        .validate({ a: 1, b: 2, c: 3 });
      const error = result.errors?.[0]!;
      expect(error.type).toBe('object.min');
      expect(error.message).toContain('myLabel');
      expect(error.message).toContain('4');
    });
  });
});
