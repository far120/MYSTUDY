/**
 * Week 2 - Interfaces Examples
 * Learn to describe object shapes and create contracts for your code
 */
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}
declare const user1: User;
declare function displayUser(user: User): void;
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    category?: string;
}
declare const product1: Product;
declare const product2: Product;
interface Config {
    readonly apiUrl: string;
    readonly version: string;
    timeout: number;
}
declare const appConfig: Config;
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
}
declare const calculator: Calculator;
interface Animal {
    name: string;
    age: number;
}
interface Dog extends Animal {
    breed: string;
    isGoodBoy: boolean;
}
interface Cat extends Animal {
    indoorOnly: boolean;
    favoriteToy: string;
}
declare const myDog: Dog;
declare const myCat: Cat;
interface Flyable {
    fly(): void;
    maxAltitude: number;
}
interface Swimmable {
    swim(): void;
    maxDepth: number;
}
interface Duck extends Animal, Flyable, Swimmable {
    quack(): void;
}
declare const duck: Duck;
interface SearchFunction {
    (source: string, searchTerm: string): boolean;
}
declare const mySearch: SearchFunction;
interface StringArray {
    [index: number]: string;
}
declare const fruits: StringArray;
interface Dictionary {
    [key: string]: string;
}
declare const colors: Dictionary;
interface Point {
    x: number;
    y: number;
}
type Status = 'loading' | 'success' | 'error';
type UserWithStatus = User & {
    status: Status;
};
declare const userWithStatus: UserWithStatus;
interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[];
}
interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
    publishedAt: string;
    tags: string[];
}
declare const successResponse: ApiResponse<BlogPost[]>;
declare const errorResponse: ApiResponse<never>;
declare function handleApiResponse<T>(response: ApiResponse<T>): void;
//# sourceMappingURL=interfaces.d.ts.map