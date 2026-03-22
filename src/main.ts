// Тип Transform<T>
export type Transform<T> = (data: T[]) => T[];

// Тип Where<T>
export type Where<T> = <K extends keyof T>(key: K, value: T[K]) => Transform<T>;

// Тип Sort<T>
export type Sort<T> = <K extends keyof T>(key: K) => Transform<T>;

// Тип Group<T, K>
export type Group<T, K extends keyof T> = {
    key: T[K];
    items: T[];
};

// Тип GroupBy<T>
export type GroupBy<T> = <K extends keyof T>(key: K) => (data: T[]) => Group<T, K>[];

// Тип GroupTransform<T, K>
export type GroupTransform<T, K extends keyof T> = (groups: Group<T, K>[]) => Group<T, K>[];

// Тип Having<T>
export type Having<T> = <K extends keyof T>(predicate: (group: Group<T, K>) => boolean) => GroupTransform<T, K>;

// Функция query - создаёт конвейер преобразований
export function query<T>(
    ...steps: Array<Transform<T> | GroupTransform<T, any>>
): Transform<T> {
    return function(data: T[]): T[] {
        let result: any = data;
        
        for (let i = 0; i < steps.length; i++) {
            result = steps[i](result);
        }
        
        return result;
    };
}

// Фабричная функция для создания фильтра Where
export function where<T>(): Where<T> {
    return function<K extends keyof T>(key: K, value: T[K]): Transform<T> {
        return function(data: T[]): T[] {
            return data.filter(function(item: T): boolean {
                return item[key] === value;
            });
        };
    };
}

// Функция для создания сортировки Sort
export function sort<T>(): Sort<T> {
    return function<K extends keyof T>(key: K): Transform<T> {
        return function(data: T[]): T[] {
            const copy: T[] = [...data];
            return copy.sort(function(a: T, b: T): number {
                const av: T[K] = a[key];
                const bv: T[K] = b[key];
                if (av < bv) return -1;
                if (av > bv) return 1;
                return 0;
            });
        };
    };
}

//  Функция для создания группировки GroupBy
export function groupBy<T>(): GroupBy<T> {
    return function<K extends keyof T>(key: K): (data: T[]) => Group<T, K>[] {
        return function(data: T[]): Group<T, K>[] {
            const groups: Record<string, Group<T, K>> = {};
            
            for (let i = 0; i < data.length; i++) {
                const item: T = data[i];
                const keyValue: T[K] = item[key];
                const groupKey: string = String(keyValue);
                
                if (!groups[groupKey]) {
                    groups[groupKey] = {
                        key: keyValue,
                        items: []
                    };
                }
                groups[groupKey].items.push(item);
            }
            
            return Object.values(groups);
        };
    };
}

// Функция для создания фильтра групп Having
export function having<T>(): Having<T> {
    return function<K extends keyof T>(predicate: (group: Group<T, K>) => boolean): GroupTransform<T, K> {
        return function(groups: Group<T, K>[]): Group<T, K>[] {
            return groups.filter(predicate);
        };
    };
}