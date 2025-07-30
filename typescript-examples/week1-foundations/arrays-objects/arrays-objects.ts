/**
 * Week 1 - Arrays and Objects with Types
 * Master typing for collections and structured data
 */

console.log('📚 Week 1: Arrays and Objects with Types Examples\n');

// ======================================
// 1. TYPED ARRAYS
// ======================================

console.log('1. Typed Arrays:');

// Array of numbers
const scores: number[] = [95, 87, 92, 78, 89];
const temperatures: Array<number> = [-5, 0, 15, 25, 30]; // Alternative syntax

console.log('Scores:', scores);
console.log('Temperatures:', temperatures);

// Array of strings
const fruits: string[] = ['apple', 'banana', 'orange'];
const colors: Array<string> = ['red', 'green', 'blue'];

console.log('Fruits:', fruits);
console.log('Colors:', colors);

// Array of booleans
const checkboxes: boolean[] = [true, false, true, false];

console.log('Checkboxes:', checkboxes);

// ======================================
// 2. MIXED TYPE ARRAYS (UNION TYPES)
// ======================================

console.log('\n2. Mixed Type Arrays:');

// Array that can contain strings or numbers
const mixedData: (string | number)[] = ['Alice', 25, 'Bob', 30];
console.log('Mixed data:', mixedData);

// Array that can contain strings, numbers, or booleans
const variousTypes: (string | number | boolean)[] = ['hello', 42, true, 'world', false];
console.log('Various types:', variousTypes);

// ======================================
// 3. ARRAY METHODS WITH TYPES
// ======================================

console.log('\n3. Array Methods with Types:');

const numbers: number[] = [1, 2, 3, 4, 5];

// Map with type inference
const doubled: number[] = numbers.map((num: number) => num * 2);
console.log('Doubled:', doubled);

// Filter with type inference
const evenNumbers: number[] = numbers.filter((num: number) => num % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Reduce with type inference
const sum: number = numbers.reduce((acc: number, num: number) => acc + num, 0);
console.log('Sum:', sum);

// Find with type inference (returns number | undefined)
const found: number | undefined = numbers.find((num: number) => num > 3);
console.log('First number > 3:', found);

// ======================================
// 4. OBJECT TYPES
// ======================================

console.log('\n4. Object Types:');

// Inline object type
const user: { name: string; age: number; email: string } = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com'
};

console.log('User:', user);

// Object with optional properties
const product: { name: string; price: number; description?: string } = {
  name: 'Laptop',
  price: 999
  // description is optional
};

console.log('Product:', product);

// ======================================
// 5. NESTED OBJECTS
// ======================================

console.log('\n5. Nested Objects:');

const employee: {
  personal: { name: string; age: number };
  work: { department: string; position: string; salary: number };
  active: boolean;
} = {
  personal: {
    name: 'Alice Smith',
    age: 28
  },
  work: {
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 75000
  },
  active: true
};

console.log('Employee:', employee);
console.log('Employee name:', employee.personal.name);
console.log('Employee department:', employee.work.department);

// ======================================
// 6. ARRAYS OF OBJECTS
// ======================================

console.log('\n6. Arrays of Objects:');

const students: { name: string; grade: number; subjects: string[] }[] = [
  { name: 'Emma', grade: 95, subjects: ['Math', 'Science'] },
  { name: 'Oliver', grade: 87, subjects: ['English', 'History'] },
  { name: 'Sophia', grade: 92, subjects: ['Math', 'Art'] }
];

console.log('Students:', students);

// Working with arrays of objects
const highAchievers = students.filter(student => student.grade >= 90);
console.log('High achievers:', highAchievers);

const studentNames = students.map(student => student.name);
console.log('Student names:', studentNames);

// ======================================
// 7. OBJECT METHODS
// ======================================

console.log('\n7. Object Methods:');

const calculator: {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  history: number[];
  addToHistory: (result: number) => void;
} = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  history: [],
  addToHistory: function(result: number) {
    this.history.push(result);
  }
};

const result1 = calculator.add(5, 3);
calculator.addToHistory(result1);

const result2 = calculator.multiply(4, 6);
calculator.addToHistory(result2);

console.log('Addition result:', result1);
console.log('Multiplication result:', result2);
console.log('Calculator history:', calculator.history);

// ======================================
// 8. DESTRUCTURING WITH TYPES
// ======================================

console.log('\n8. Destructuring with Types:');

// Array destructuring
const coordinates: [number, number] = [10, 20];
const [x, y]: [number, number] = coordinates;
console.log(`Coordinates: x=${x}, y=${y}`);

// Object destructuring
const person: { name: string; age: number; city: string } = {
  name: 'Charlie',
  age: 35,
  city: 'New York'
};

const { name, age, city }: { name: string; age: number; city: string } = person;
console.log(`Person: ${name}, ${age}, ${city}`);

// ======================================
// 9. PRACTICAL EXAMPLE - SHOPPING CART
// ======================================

console.log('\n9. Practical Example - Shopping Cart:');

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

const cart: ShoppingCart = {
  items: [],
  
  addItem: function(item: CartItem) {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  },
  
  removeItem: function(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  },
  
  getTotal: function() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getItemCount: function() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
};

// Add items to cart
cart.addItem({ id: 1, name: 'Laptop', price: 999, quantity: 1 });
cart.addItem({ id: 2, name: 'Mouse', price: 25, quantity: 2 });
cart.addItem({ id: 3, name: 'Keyboard', price: 75, quantity: 1 });

console.log('Cart items:', cart.items);
console.log('Total items:', cart.getItemCount());
console.log('Total price: $', cart.getTotal());

// Remove an item
cart.removeItem(2);
console.log('After removing mouse:', cart.items);
console.log('New total: $', cart.getTotal());

console.log('\n✅ Arrays and Objects with Types Examples Complete!');
console.log('🎉 Week 1 Foundations Complete! Ready for Week 2 Intermediate concepts!');