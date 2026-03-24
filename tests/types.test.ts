import { describe, it, expectTypeOf } from 'vitest';
import type { DeepReadonly, PickedByType, EventHandlers } from '../src/types';

describe('TypeScript utility types', () => {
  it('DeepReadonly', () => {
    type User = {
      name: string;
      info: {
        age: number;
      };
    };

    type Result = DeepReadonly<User>;

    expectTypeOf<Result>().toEqualTypeOf<{
      readonly name: string;
      readonly info: {
        readonly age: number;
      };
    }>();
  });

  it('PickedByType', () => {
    type User = {
      id: number;
      name: string;
      age: number;
      city: string;
    };

    type Result = PickedByType<User, string>;

    expectTypeOf<Result>().toEqualTypeOf<{
      name: string;
      city: string;
    }>();
  });

  it('EventHandlers', () => {
    type Events = {
      click: { x: number };
      submit: { value: string };
    };

    type Result = EventHandlers<Events>;

    expectTypeOf<Result>().toEqualTypeOf<{
      onClick: (event: { x: number }) => void;
      onSubmit: (event: { value: string }) => void;
    }>();
  });
})