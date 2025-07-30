/**
 * Week 3 - Generics Examples
 * Master reusable, flexible types that work with multiple data types
 */
declare function identity<T>(arg: T): T;
declare const stringResult: string;
declare const numberResult: number;
declare const booleanResult: boolean;
declare const inferredString = "world";
declare const inferredNumber = 100;
declare function getFirstElement<T>(array: T[]): T | undefined;
declare const numbers: number[];
declare const strings: string[];
declare const booleans: boolean[];
declare function pair<T, U>(first: T, second: U): {
    first: T;
    second: U;
};
declare const stringNumberPair: {
    first: string;
    second: number;
};
declare const numberBooleanPair: {
    first: number;
    second: boolean;
};
declare const stringStringPair: {
    first: string;
    second: string;
};
interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[];
}
interface Repository<T> {
    findById(id: number): T | undefined;
    findAll(): T[];
    create(item: Omit<T, 'id'>): T;
    update(id: number, item: Partial<T>): T | undefined;
    delete(id: number): boolean;
}
type User = {
    id: number;
    name: string;
    email: string;
    age: number;
};
type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};
declare class InMemoryRepository<T extends {
    id: number;
}> implements Repository<T> {
    private items;
    private nextId;
    findById(id: number): T | undefined;
    findAll(): T[];
    create(item: Omit<T, 'id'>): T;
    update(id: number, item: Partial<T>): T | undefined;
    delete(id: number): boolean;
}
declare const userRepository: InMemoryRepository<User>;
declare const productRepository: InMemoryRepository<Product>;
declare const user1: User;
declare const product1: Product;
declare class Stack<T> {
    private items;
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    toArray(): T[];
}
declare const numberStack: Stack<number>;
declare const stringStack: Stack<string>;
interface Lengthwise {
    length: number;
}
declare function logLength<T extends Lengthwise>(item: T): T;
declare function getProperty<T, K extends keyof T>(obj: T, key: K): T[K];
declare const person: {
    name: string;
    age: number;
    email: string;
};
declare const name: string;
declare const age: number;
declare const email: string | number;
type UserForCreation = Omit<User, 'id'>;
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type UserNameOnly = Pick<User, 'name'>;
declare const newUser: UserForCreation;
declare const partialUpdate: PartialUser;
declare const nameOnly: UserNameOnly;
type Theme = 'light' | 'dark' | 'auto';
type ThemeConfig = Record<Theme, {
    background: string;
    text: string;
}>;
declare const themeConfig: ThemeConfig;
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type StringArrayElement = ArrayElement<string[]>;
type NumberArrayElement = ArrayElement<number[]>;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
declare function getString(): string;
declare function getNumber(): number;
type StringReturn = ReturnType<typeof getString>;
type NumberReturn = ReturnType<typeof getNumber>;
type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};
type UserWithOptionalEmail = MakeOptional<User, 'email'>;
type NullableUser = Nullable<User>;
declare const userWithOptionalEmail: UserWithOptionalEmail;
declare const nullableUser: NullableUser;
declare class Cache<K, V> {
    private cache;
    private maxSize;
    constructor(maxSize?: number);
    set(key: K, value: V): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
    size(): number;
    keys(): K[];
    values(): V[];
}
declare const stringCache: Cache;
declare const numberCache: Cache;
//# sourceMappingURL=generics.d.ts.map