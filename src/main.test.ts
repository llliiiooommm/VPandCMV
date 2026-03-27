import { describe, test, expect } from 'vitest';
import { query, where, sort, groupBy, having } from './main';

// Тип User из задания
type User = {
  id: number;
  name: string;
  surname: string;
  age: number;
  city: string;
};

// Тестовые данные
const users: User[] = [
  { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
  { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
  { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
  { id: 4, name: "Mike", surname: "Doe", age: 35, city: "LA" },
];

describe('Фильтрация и сортировка (пример из задания)', () => {
  test('where + where + sort', () => {
    const search = query<User>(
      where("name", "John"),
      where("surname", "Doe"),
      sort("age")
    );

    const result: User[] = search(users);

    expect(result).toHaveLength(3);
    expect(result[0].age).toBe(33);
    expect(result[1].age).toBe(34);
    expect(result[2].age).toBe(35);
    expect(result[0].city).toBe("NY");
    expect(result[1].city).toBe("NY");
    expect(result[2].city).toBe("LA");
  });
});

describe('Группировка', () => {
  test('groupBy city', () => {
    const groupFn = query<User>(groupBy("city"));

    const result = groupFn(users) as any[];

    expect(result).toHaveLength(2);

    const nyGroup = result.find((g: any) => g.key === "NY");
    const laGroup = result.find((g: any) => g.key === "LA");

    expect(nyGroup).toBeDefined();
    expect(laGroup).toBeDefined();
    expect(nyGroup!.items).toHaveLength(2);
    expect(laGroup!.items).toHaveLength(2);
  });
});

describe('Группировка с having', () => {
  test('groupBy + having (группы с более чем одним элементом)', () => {
    const groupAndFilter = query<User>(
      groupBy("city"),
      having((group) => group.items.length > 1)
    );

    const result = groupAndFilter(users) as any[];

    expect(result).toHaveLength(2);

    const nyGroup = result.find((g: any) => g.key === "NY");
    const laGroup = result.find((g: any) => g.key === "LA");

    expect(nyGroup?.items).toHaveLength(2);
    expect(laGroup?.items).toHaveLength(2);
  });
});

describe('Комбинированный конвейер (пример из задания)', () => {
  test('where + groupBy + having', () => {
    const pipeline = query<User>(
      where("surname", "Doe"),
      groupBy("city"),
      having((group) => group.items.some((u) => u.age > 34))
    );

    const result = pipeline(users) as any[];

    expect(result).toHaveLength(1);

    const nyGroup = result.find((g: any) => g.key === "NY");
    const laGroup = result.find((g: any) => g.key === "LA");

    expect(nyGroup).toBeUndefined();
    expect(laGroup).toBeDefined();

    expect(laGroup!.items).toHaveLength(2);
    expect(laGroup!.items[0].age).toBe(35);
    expect(laGroup!.items[1].age).toBe(35);
  });
});

describe('Дополнительные тесты', () => {
  test('сортировка по городу', () => {
    const search = query<User>(sort("city"));
    const result: User[] = search(users);

    expect(result[0].city).toBe("LA");
    expect(result[1].city).toBe("LA");
    expect(result[2].city).toBe("NY");
    expect(result[3].city).toBe("NY");
  });

  test('пустой массив не вызывает ошибок', () => {
    const search = query<User>(
      where("name", "John"),
      sort("age")
    );

    const result = search([]);
    expect(result).toEqual([]);
  });

  test('фильтрация по возрасту', () => {
    const search = query<User>(where("age", 35));
    const result: User[] = search(users);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(3);
    expect(result[1].id).toBe(4);
  });

  test('having отбрасывает все группы', () => {
    const pipeline = query<User>(
      groupBy("city"),
      having((group) => group.items.length > 10)
    );

    const result = pipeline(users);
    expect(result).toHaveLength(0);
  });
});