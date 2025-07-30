/**
 * Week 1 - Functions with Types Examples
 * Learn how to make functions bulletproof with TypeScript
 */

console.log('🎯 Week 1: Functions with Types Examples\n');

// ======================================
// 1. BASIC FUNCTION TYPING
// ======================================

console.log('1. Basic Function Typing:');

// Function with typed parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Function with no return value (void)
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

// Function that returns a string
function formatName(first: string, last: string): string {
  return `${first} ${last}`;
}

console.log('add(5, 3):', add(5, 3));
greet('TypeScript');
console.log('formatName("John", "Doe"):', formatName("John", "Doe"));

// ======================================
// 2. OPTIONAL PARAMETERS
// ======================================

console.log('\n2. Optional Parameters:');

// Optional parameter with ?
function buildGreeting(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(buildGreeting("Alice"));
console.log(buildGreeting("Bob", "Dr."));

// ======================================
// 3. DEFAULT PARAMETERS
// ======================================

console.log('\n3. Default Parameters:');

function createUser(name: string, age: number = 18, active: boolean = true): string {
  return `User: ${name}, Age: ${age}, Active: ${active}`;
}

console.log(createUser("Charlie"));
console.log(createUser("Diana", 25));
console.log(createUser("Eve", 30, false));

// ======================================
// 4. ARROW FUNCTIONS WITH TYPES
// ======================================

console.log('\n4. Arrow Functions with Types:');

// Arrow function with explicit types
const multiply = (x: number, y: number): number => x * y;

// Arrow function with implicit return type
const isAdult = (age: number) => age >= 18;

// Arrow function for array processing
const formatNumbers = (numbers: number[]): string[] => {
  return numbers.map(n => `#${n}`);
};

console.log('multiply(4, 5):', multiply(4, 5));
console.log('isAdult(17):', isAdult(17));
console.log('isAdult(21):', isAdult(21));
console.log('formatNumbers([1, 2, 3]):', formatNumbers([1, 2, 3]));

// ======================================
// 5. FUNCTION OVERLOADS
// ======================================

console.log('\n5. Function Overloads:');

// Function overload signatures
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;

// Implementation
function combine(a: any, b: any): any {
  if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
  throw new Error('Invalid arguments');
}

console.log('combine("Hello", " World"):', combine("Hello", " World"));
console.log('combine(10, 20):', combine(10, 20));

// ======================================
// 6. FUNCTION TYPES AS PARAMETERS
// ======================================

console.log('\n6. Function Types as Parameters (Higher Order Functions):');

// Function that takes another function as parameter
function processArray(numbers: number[], operation: (n: number) => number): number[] {
  return numbers.map(operation);
}

// Different operations
const double = (n: number): number => n * 2;
const square = (n: number): number => n * n;

const numbers = [1, 2, 3, 4, 5];
console.log('Original:', numbers);
console.log('Doubled:', processArray(numbers, double));
console.log('Squared:', processArray(numbers, square));

// ======================================
// 7. CALLBACK FUNCTIONS
// ======================================

console.log('\n7. Callback Functions:');

// Function with callback parameter
function fetchData(callback: (data: string) => void): void {
  // Simulate async operation
  setTimeout(() => {
    callback("Data loaded successfully!");
  }, 100);
}

// Usage with callback
fetchData((result: string) => {
  console.log('Callback result:', result);
});

// ======================================
// 8. PRACTICAL EXAMPLE - CALCULATOR
// ======================================

console.log('\n8. Practical Example - Type-Safe Calculator:');

type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

function calculate(a: number, b: number, operation: Operation): number {
  switch (operation) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) {
        throw new Error('Division by zero!');
      }
      return a / b;
    default:
      throw new Error('Invalid operation');
  }
}

console.log('calculate(10, 5, "add"):', calculate(10, 5, 'add'));
console.log('calculate(10, 5, "multiply"):', calculate(10, 5, 'multiply'));
console.log('calculate(10, 2, "divide"):', calculate(10, 2, 'divide'));

// ======================================
// 9. ERROR HANDLING WITH TYPES
// ======================================

console.log('\n9. Error Handling with Types:');

function safeDivide(a: number, b: number): { success: boolean; result?: number; error?: string } {
  if (b === 0) {
    return { success: false, error: 'Cannot divide by zero' };
  }
  return { success: true, result: a / b };
}

const result1 = safeDivide(10, 2);
const result2 = safeDivide(10, 0);

console.log('safeDivide(10, 2):', result1);
console.log('safeDivide(10, 0):', result2);

console.log('\n✅ Functions with Types Examples Complete!');
console.log('Next: Check out arrays and objects examples!');