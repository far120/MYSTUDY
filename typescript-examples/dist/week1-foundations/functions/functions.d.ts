/**
 * Week 1 - Functions with Types Examples
 * Learn how to make functions bulletproof with TypeScript
 */
declare function add(a: number, b: number): number;
declare function greet(name: string): void;
declare function formatName(first: string, last: string): string;
declare function buildGreeting(name: string, title?: string): string;
declare function createUser(name: string, age?: number, active?: boolean): string;
declare const multiply: (x: number, y: number) => number;
declare const isAdult: (age: number) => boolean;
declare const formatNumbers: (numbers: number[]) => string[];
declare function combine(a: string, b: string): string;
declare function combine(a: number, b: number): number;
declare function processArray(numbers: number[], operation: (n: number) => number): number[];
declare const double: (n: number) => number;
declare const square: (n: number) => number;
declare const numbers: number[];
declare function fetchData(callback: (data: string) => void): void;
type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
declare function calculate(a: number, b: number, operation: Operation): number;
declare function safeDivide(a: number, b: number): {
    success: boolean;
    result?: number;
    error?: string;
};
declare const result1: {
    success: boolean;
    result?: number;
    error?: string;
};
declare const result2: {
    success: boolean;
    result?: number;
    error?: string;
};
//# sourceMappingURL=functions.d.ts.map