export type Transform<T> = (items: T[]) => T[];
export type Where<T> = <K extends keyof T>(key: K, value: T[K]) => Transform<T>;
export type Sort<T> = <K extends keyof T>(key: K) => Transform<T>;
export type Group<T, K extends keyof T> = {
    key: T[K];
    items: T[];
};
export type GroupBy<T> = <K extends keyof T>(key: K) => (items: T[]) => Group<T, K>[];
export type GroupTransform<T, K extends keyof T> = (groups: Group<T, K>[]) => Group<T, K>[];
export type Having<T> = <K extends keyof T>(predicate: (group: Group<T, K>) => boolean) => GroupTransform<T, K>;
export interface user {
    id: number;
    name: string;
    address: string;
    age: number;
}
export type QueryPhase = 'initial' | 'where' | 'groupBy' | 'having' | 'sort';
export interface QueryState<Phase extends QueryPhase = 'initial'> {
    readonly phase: Phase;
    readonly steps: ReadonlyArray<(data: any) => any>;
}
export type ValidateWhere<CurrentPhase extends QueryPhase> = CurrentPhase extends 'initial' ? 'where' : never;
export type ValidateGroupBy<CurrentPhase extends QueryPhase> = CurrentPhase extends 'where' ? 'groupBy' : never;
export type ValidateHaving<CurrentPhase extends QueryPhase> = CurrentPhase extends 'groupBy' ? 'having' : never;
export type ValidateSort<CurrentPhase extends QueryPhase> = CurrentPhase extends 'having' | 'where' | 'initial' ? 'sort' : never;
export declare const where: <T, K extends keyof T>(key: K, value: T[K]) => Transform<T>;
export declare const sort: <T, K extends keyof T>(key: K) => Transform<T>;
export declare const groupBy: <T, K extends keyof T>(key: K) => (data: T[]) => Group<T, K>[];
export declare const having: <T, K extends keyof T>(predicate: (group: Group<T, K>) => boolean) => GroupTransform<T, K>;
export declare class QueryBuilder<T, Phase extends QueryPhase = 'initial'> {
    private state;
    constructor(state: QueryState<Phase>);
    private isPhase;
    where<K extends keyof T>(key: K, value: T[K]): QueryBuilder<T, 'where'>;
    groupBy<K extends keyof T>(key: K): QueryBuilder<T, 'groupBy'>;
    having<K extends keyof T>(predicate: (group: Group<T, K>) => boolean): QueryBuilder<T, 'having'>;
    sort<K extends keyof T>(key: K): QueryBuilder<T, 'sort'>;
    build(): (data: T[]) => any[];
}
export declare function query<T>(): QueryBuilder<T, 'initial'>;
export type ValidQuerySequence<T> = QueryBuilder<T, 'initial'> | QueryBuilder<T, 'where'> | QueryBuilder<T, 'groupBy'> | QueryBuilder<T, 'having'> | QueryBuilder<T, 'sort'>;
