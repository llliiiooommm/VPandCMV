import { describe, it, expect, expectTypeOf } from 'vitest';
import { QueryBuilder, query, user, ValidateWhere, ValidateGroupBy, ValidateHaving, ValidateSort } from './main';

describe('QueryBuilder', () => {
  const testData: user[] = [
    { id: 1, name: 'John', address: 'NY', age: 25 },
    { id: 2, name: 'Jane', address: 'LA', age: 30 },
    { id: 3, name: 'Bob', address: 'NY', age: 25 },
    { id: 4, name: 'Alice', address: 'LA', age: 35 },
    { id: 5, name: 'Charlie', address: 'NY', age: 30 }
  ];

  describe('Базовые операции', () => {
    it('where фильтрация', () => {
      const result = query<user>()
        .where('age', 25)
        .build()(testData);

      expect(result).toHaveLength(2);
      expect(result.every(item => item.age === 25)).toBe(true);
    });

    it('сортировка', () => {
      const result = query<user>()
        .sort('name')
        .build()(testData);

      expect(result[0].name).toBe('Alice');
      expect(result[4].name).toBe('John');
    });

    it('groupBy после where', () => {
      const result = query<user>()
        .where('age', 25)
        .groupBy('address')
        .build()(testData);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].key).toBe('NY');
      expect(result[0].items).toHaveLength(2);
    });

    it('having после groupBy', () => {
      const result = query<user>()
        .where('age', 25)
        .groupBy('address')
        .having(group => group.items.length > 1)
        .build()(testData);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].key).toBe('NY');
    });
  });

  describe('Последовательности операций', () => {
    it('цепочка: where -> groupBy -> having', () => {
      const result = query<user>()
        .where('age', 25)
        .groupBy('address')
        .having(group => group.items.length > 1)
        .build()(testData);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
    });

    it('sort в начале', () => {
      const result = query<user>()
        .sort('name')
        .build()(testData);

      expect(result).toBeDefined();
      expect(result[0].name).toBe('Alice');
    });

    it('sort после where', () => {
      const result = query<user>()
        .where('age', 25)
        .sort('name')
        .build()(testData);

      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Bob');
      expect(result[1].name).toBe('John');
    });
  });

  describe('Проверка типов', () => {
    it('типы параметров where и sort', () => {
      const builder = query<user>();

      expectTypeOf(builder.where).parameter(0).toEqualTypeOf<keyof user>();
      expectTypeOf(builder.sort).parameter(0).toEqualTypeOf<keyof user>();
    });

    it('тип возврата после цепочки where -> groupBy -> having', () => {
      const builder = query<user>()
        .where('age', 25)
        .groupBy('address')
        .having(group => group.items.length > 0);

      expectTypeOf(builder).toEqualTypeOf<QueryBuilder<user, 'having'>>();
    });

    it('тип возврата после sort', () => {
      const builder = query<user>()
        .where('age', 25)
        .sort('name');

      expectTypeOf(builder).toEqualTypeOf<QueryBuilder<user, 'sort'>>();
    });
  });

  describe('Валидация фаз', () => {
    it('проверка переходов между фазами', () => {
      expectTypeOf<ValidateWhere<'initial'>>().toEqualTypeOf<'where'>();
      expectTypeOf<ValidateGroupBy<'where'>>().toEqualTypeOf<'groupBy'>();
      expectTypeOf<ValidateHaving<'groupBy'>>().toEqualTypeOf<'having'>();
      expectTypeOf<ValidateSort<'having'>>().toEqualTypeOf<'sort'>();
      expectTypeOf<ValidateSort<'groupBy'>>().toEqualTypeOf<never>();
    });
  });

  describe('Интеграционные тесты', () => {
    it('запрос с where и sort', () => {
      const result = query<user>()
        .where('age', 25)
        .sort('name')
        .build()(testData);

      expect(result).toBeDefined();
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Bob');
      expect(result[1].name).toBe('John');
    });

    it('пустой результат после having', () => {
      const result = query<user>()
        .where('age', 100)
        .groupBy('address')
        .having(group => group.items.length > 0)
        .build()(testData);

      expect(result).toHaveLength(0);
    });
  });

  describe('Ошибки фаз выполнения', () => {
    it('groupBy без where должен бросать ошибку', () => {
      expect(() => {
        query<user>().groupBy('address');
      }).toThrow('groupBy может быть вызван только после where');
    });

    it('having без groupBy должен бросать ошибку', () => {
      expect(() => {
        query<user>().having(group => group.items.length > 0);
      }).toThrow('having может быть вызван только после groupBy');
    });

    it('where после where должен бросать ошибку', () => {
      expect(() => {
        query<user>().where('age', 25).where('name', 'John');
      }).toThrow('where может быть вызван только в начале');
    });
  });
});