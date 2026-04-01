"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = exports.having = exports.groupBy = exports.sort = exports.where = void 0;
exports.query = query;
const where = (key, value) => {
    return (data) => data.filter((item) => item[key] === value);
};
exports.where = where;
const sort = (key) => {
    return (data) => [...data].sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        if (av < bv)
            return -1;
        if (av > bv)
            return 1;
        return 0;
    });
};
exports.sort = sort;
const groupBy = (key) => {
    return (data) => Object.values(data.reduce((acc, item) => {
        const k = String(item[key]);
        if (!acc[k]) {
            acc[k] = { key: item[key], items: [] };
        }
        acc[k].items.push(item);
        return acc;
    }, {}));
};
exports.groupBy = groupBy;
const having = (predicate) => {
    return (groups) => groups.filter(predicate);
};
exports.having = having;
class QueryBuilder {
    constructor(state) {
        this.state = state;
    }
    isPhase(phase, expected) {
        return phase === expected;
    }
    where(key, value) {
        if (!this.isPhase(this.state.phase, 'initial')) {
            throw new Error('where может быть вызван только в начале');
        }
        const whereFn = (0, exports.where)(key, value);
        const newSteps = [...this.state.steps, whereFn];
        return new QueryBuilder({
            phase: 'where',
            steps: newSteps
        });
    }
    groupBy(key) {
        if (!this.isPhase(this.state.phase, 'where')) {
            throw new Error('groupBy может быть вызван только после where');
        }
        const groupByFn = (0, exports.groupBy)(key);
        const newSteps = [...this.state.steps, groupByFn];
        return new QueryBuilder({
            phase: 'groupBy',
            steps: newSteps
        });
    }
    having(predicate) {
        if (!this.isPhase(this.state.phase, 'groupBy')) {
            throw new Error('having может быть вызван только после groupBy');
        }
        const havingFn = (0, exports.having)(predicate);
        const newSteps = [...this.state.steps, havingFn];
        return new QueryBuilder({
            phase: 'having',
            steps: newSteps
        });
    }
    sort(key) {
        if (!['initial', 'where', 'having'].includes(this.state.phase)) {
            throw new Error('sort может быть вызван после where, having или в начале');
        }
        const sortFn = (0, exports.sort)(key);
        const newSteps = [...this.state.steps, sortFn];
        return new QueryBuilder({
            phase: 'sort',
            steps: newSteps
        });
    }
    build() {
        return (input) => {
            return this.state.steps.reduce((data, step) => step(data), input);
        };
    }
}
exports.QueryBuilder = QueryBuilder;
function query() {
    return new QueryBuilder({
        phase: 'initial',
        steps: []
    });
}
