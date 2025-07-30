/**
 * Week 1 - Arrays and Objects with Types
 * Master typing for collections and structured data
 */
declare const scores: number[];
declare const temperatures: Array<number>;
declare const fruits: string[];
declare const colors: Array<string>;
declare const checkboxes: boolean[];
declare const mixedData: (string | number)[];
declare const variousTypes: (string | number | boolean)[];
declare const numbers: number[];
declare const doubled: number[];
declare const evenNumbers: number[];
declare const sum: number;
declare const found: number | undefined;
declare const user: {
    name: string;
    age: number;
    email: string;
};
declare const product: {
    name: string;
    price: number;
    description?: string;
};
declare const employee: {
    personal: {
        name: string;
        age: number;
    };
    work: {
        department: string;
        position: string;
        salary: number;
    };
    active: boolean;
};
declare const students: {
    name: string;
    grade: number;
    subjects: string[];
}[];
declare const highAchievers: {
    name: string;
    grade: number;
    subjects: string[];
}[];
declare const studentNames: string[];
declare const calculator: {
    add: (a: number, b: number) => number;
    subtract: (a: number, b: number) => number;
    multiply: (a: number, b: number) => number;
    history: number[];
    addToHistory: (result: number) => void;
};
declare const result1: number;
declare const result2: number;
declare const coordinates: [number, number];
declare const x: number, y: number;
declare const person: {
    name: string;
    age: number;
    city: string;
};
declare const name: string, age: number, city: string;
type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};
type ShoppingCart = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    getTotal: () => number;
    getItemCount: () => number;
};
declare const cart: ShoppingCart;
//# sourceMappingURL=arrays-objects.d.ts.map