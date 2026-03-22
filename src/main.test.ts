import { query, where, sort, groupBy, having, Group } from './main';
import { describe, test, expect } from 'vitest';

// Тип User из задания
type User = {
    id: number;
    name: string;
    surname: string;
    age: number;
    city: string;
};

// Тестовые данные из задания
const users: User[] = [
    { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
    { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
    { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
    { id: 4, name: "Mike", surname: "Doe", age: 35, city: "LA" },
];

describe('Фильтрация и сортировка (пример из задания)', () => {
    test('where + where + sort', () => {
        const w = where<User>();
        const s = sort<User>();
        
        const search = query<User>(
            w("name", "John"),
            w("surname", "Doe"),
            s("age")
        );
        
        const result = search(users);
        
        expect(result).toHaveLength(3);
        expect(result[0].age).toBe(33);
        expect(result[1].age).toBe(34);
        expect(result[2].age).toBe(35);
        expect(result[0].city).toBe("NY");
        expect(result[1].city).toBe("NY");
        expect(result[2].city).toBe("LA");
    });
});

describe('Группировка (пример из задания)', () => {
    test('groupBy city', () => {
        const gb = groupBy<User>();
        
        const groupAndFilter = query<User>(
            gb("city")
        );
        
        const result = groupAndFilter(users);
        
        expect(result).toHaveLength(2);
        expect(result[0].key).toBe("NY");
        expect(result[0].items).toHaveLength(2);
        expect(result[1].key).toBe("LA");
        expect(result[1].items).toHaveLength(2);
    });
});

describe('Группировка с фильтром групп (having)', () => {
    test('groupBy + having (группы с более чем одним элементом)', () => {
        const gb = groupBy<User>();
        const h = having<User>();
        
        const groupAndFilter = query<User>(
            gb("city"),
            h((group) => group.items.length > 1)
        );
        
        const result = groupAndFilter(users);
        
        expect(result).toHaveLength(2);
        expect(result[0].key).toBe("NY");
        expect(result[1].key).toBe("LA");
    });
});

describe('Комбинированный конвейер (пример из задания)', () => {
    test('where + groupBy + having', () => {
        const w = where<User>();
        const gb = groupBy<User>();
        const h = having<User>();
        
        const pipeline = query<User>(
            w("surname", "Doe"),
            gb("city"),
            h((group) => group.items.some((u) => u.age > 34))
        );
        
        const result = pipeline(users);
        
        expect(result).toHaveLength(1);
        expect(result[0].key).toBe("LA");
        expect(result[0].items).toHaveLength(2);
        expect(result[0].items[0].age).toBe(35);
    });
});

describe('Дополнительные тесты', () => {
    test('сортировка по городу', () => {
        const s = sort<User>();
        
        const search = query<User>(
            s("city")
        );
        
        const result = search(users);
        
        expect(result[0].city).toBe("LA");
        expect(result[1].city).toBe("LA");
        expect(result[2].city).toBe("NY");
        expect(result[3].city).toBe("NY");
    });
    
    test('пустой массив не вызывает ошибок', () => {
        const w = where<User>();
        const s = sort<User>();
        
        const search = query<User>(
            w("name", "John"),
            s("age")
        );
        
        const result = search([]);
        expect(result).toEqual([]);
    });
    
    test('фильтрация по возрасту', () => {
        const w = where<User>();
        
        const search = query<User>(
            w("age", 35)
        );
        
        const result = search(users);
        
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(3);
        expect(result[1].id).toBe(4);
    });
});