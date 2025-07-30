/**
 * Week 1 - Basic Types Examples
 * Demonstrating TypeScript's fundamental type system
 */

export function runBasicTypesExamples() {
  console.log('🧱 Week 1: Basic Types Examples\n');

// ======================================
// 1. PRIMITIVE TYPES
// ======================================

console.log('1. Primitive Types:');

// Numbers
let age: number = 25;
let price: number = 99.99;
let temperature: number = -5;

console.log(`Age: ${age}, Price: ${price}, Temperature: ${temperature}`);

// Strings
let firstName: string = "John";
let lastName: string = 'Doe';
let fullName: string = `${firstName} ${lastName}`;

console.log(`Full name: ${fullName}`);

// Booleans
let isActive: boolean = true;
let isComplete: boolean = false;

console.log(`Active: ${isActive}, Complete: ${isComplete}`);

// ======================================
// 2. EXPLICIT vs IMPLICIT TYPING
// ======================================

console.log('\n2. Explicit vs Implicit Typing:');

// Explicit typing (we specify the type)
let explicitString: string = "I'm explicitly typed";
let explicitNumber: number = 42;

// Implicit typing (TypeScript infers the type)
let implicitString = "TypeScript knows I'm a string";
let implicitNumber = 42;

console.log('Explicit:', explicitString, explicitNumber);
console.log('Implicit:', implicitString, implicitNumber);

// ======================================
// 3. ARRAYS
// ======================================

console.log('\n3. Array Types:');

// Array of numbers
let scores: number[] = [95, 87, 92, 78];
let moreScores: Array<number> = [88, 76, 94]; // Alternative syntax

console.log('Scores:', scores);
console.log('More scores:', moreScores);

// Array of strings
let colors: string[] = ["red", "green", "blue"];
let fruits: Array<string> = ["apple", "banana", "orange"];

console.log('Colors:', colors);
console.log('Fruits:', fruits);

// ======================================
// 4. COMMON TYPE ERRORS & SOLUTIONS
// ======================================

console.log('\n4. Type Safety in Action:');

// This would cause a TypeScript error:
// age = "twenty-five"; // ❌ Type 'string' is not assignable to type 'number'

// This would also cause an error:
// scores.push("hundred"); // ❌ Argument of type 'string' is not assignable to parameter of type 'number'

// Correct usage:
age = 26; // ✅ number assigned to number
scores.push(100); // ✅ number pushed to number array

console.log(`Updated age: ${age}`);
console.log('Updated scores:', scores);

// ======================================
// 5. ANY TYPE (USE SPARINGLY!)
// ======================================

console.log('\n5. Any Type (Emergency Escape Hatch):');

let anything: any = 42;
anything = "Now I'm a string";
anything = true;
anything = { name: "John" };

console.log('Anything can be:', anything);
console.log('⚠️  Note: Avoid "any" - it defeats TypeScript\'s purpose!');

// ======================================
// 6. PRACTICAL EXAMPLE
// ======================================

console.log('\n6. Practical Example - User Profile:');

function createUserProfile(
  name: string,
  age: number,
  isActive: boolean,
  favoriteColors: string[]
): void {
  console.log('--- User Profile ---');
  console.log(`Name: ${name}`);
  console.log(`Age: ${age}`);
  console.log(`Status: ${isActive ? 'Active' : 'Inactive'}`);
  console.log(`Favorite Colors: ${favoriteColors.join(', ')}`);
}

createUserProfile("Alice", 28, true, ["purple", "gold", "navy"]);

console.log('\n✅ Basic Types Examples Complete!');
console.log('Next: Check out functions examples in the functions folder');
}

// Run examples if this file is executed directly
if (require.main === module) {
  runBasicTypesExamples();
}