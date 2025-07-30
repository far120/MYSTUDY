/**
 * TypeScript Learning Exercises
 * Complete these exercises to test your understanding
 */
console.log('📝 TypeScript Learning Exercises\n');
// ======================================
// WEEK 1 EXERCISES
// ======================================
console.log('=== WEEK 1 EXERCISES - FOUNDATIONS ===\n');
console.log('Exercise 1.1: Basic Types');
console.log('TODO: Fix the type errors in the following code:');
// TODO: Add proper types to make this code compile
/*
let studentName = "Alice";
let studentAge = 20;
let isEnrolled = true;
let grades = [95, 87, 92];

function calculateAverage(scores) {
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

// Test your function
console.log(`${studentName} (age ${studentAge}) average: ${calculateAverage(grades)}`);
*/
console.log('\nExercise 1.2: Function Types');
console.log('TODO: Create a function that converts temperature from Celsius to Fahrenheit');
// TODO: Implement this function with proper types
/*
function celsiusToFahrenheit(celsius) {
  // Formula: F = C * 9/5 + 32
}

// Test cases
console.log(celsiusToFahrenheit(0));   // Should return 32
console.log(celsiusToFahrenheit(100)); // Should return 212
*/
console.log('\nExercise 1.3: Array and Object Types');
console.log('TODO: Create a typed book inventory system');
// TODO: Define types and implement the functions
/*
// Define a Book type with: id, title, author, year, available

function addBook(inventory, book) {
  // Add book to inventory
}

function findBookById(inventory, id) {
  // Find book by ID
}

function findAvailableBooks(inventory) {
  // Return only available books
}

// Test your implementation
*/
// ======================================
// WEEK 2 EXERCISES
// ======================================
console.log('\n=== WEEK 2 EXERCISES - INTERMEDIATE ===\n');
console.log('Exercise 2.1: Interfaces');
console.log('TODO: Design interfaces for a simple e-commerce system');
// TODO: Create interfaces for Product, Customer, Order, OrderItem
/*
interface Product {
  // Define product properties
}

interface Customer {
  // Define customer properties
}

// Add more interfaces...

function createOrder(customer, products) {
  // Create an order with proper typing
}
*/
console.log('\nExercise 2.2: Type Aliases and Union Types');
console.log('TODO: Create a notification system with different message types');
// TODO: Create type aliases for different notification types
/*
type NotificationType = // Define possible notification types
type NotificationPriority = // Define priority levels

type Notification = {
  // Define notification structure
}

function sendNotification(notification) {
  // Process and send notification
}
*/
console.log('\nExercise 2.3: Optional Properties and Methods');
console.log('TODO: Create a configuration system with optional settings');
// TODO: Create an interface with optional properties
/*
interface AppConfig {
  // Mix of required and optional properties
}

function initializeApp(config) {
  // Initialize app with configuration
}
*/
// ======================================
// WEEK 3 EXERCISES
// ======================================
console.log('\n=== WEEK 3 EXERCISES - ADVANCED ===\n');
console.log('Exercise 3.1: Generic Functions');
console.log('TODO: Create generic utility functions');
// TODO: Implement these generic functions
/*
function findInArray<T>(array, predicate) {
  // Find first element matching predicate
}

function groupBy<T, K>(array, keySelector) {
  // Group array elements by a key
}

function unique<T>(array) {
  // Return array with unique elements only
}
*/
console.log('\nExercise 3.2: Generic Classes');
console.log('TODO: Create a generic EventEmitter class');
// TODO: Implement a type-safe event emitter
/*
class EventEmitter<T> {
  // Implement event emission and listening with proper types
}

// Usage example:
type UserEvents = {
  login: { userId: number; timestamp: Date };
  logout: { userId: number };
  error: { message: string; code: number };
};

const userEventEmitter = new EventEmitter<UserEvents>();
*/
console.log('\nExercise 3.3: Advanced Generic Patterns');
console.log('TODO: Create a generic Repository pattern with constraints');
// TODO: Implement a generic repository with proper constraints
/*
interface Entity {
  id: number | string;
}

class Repository<T extends Entity> {
  // Implement CRUD operations with proper typing
}
*/
// ======================================
// BONUS EXERCISES
// ======================================
console.log('\n=== BONUS EXERCISES ===\n');
console.log('Bonus 1: Type Guards');
console.log('TODO: Implement type guards for runtime type checking');
// TODO: Implement type guards
/*
function isString(value): value is string {
  // Implement type guard
}

function isNumber(value): value is number {
  // Implement type guard
}

function processValue(value: unknown) {
  // Use type guards to safely process unknown value
}
*/
console.log('\nBonus 2: Mapped Types');
console.log('TODO: Create utility types using mapped types');
// TODO: Implement these utility types
/*
type DeepReadonly<T> = {
  // Make all properties (including nested) readonly
};

type DeepPartial<T> = {
  // Make all properties (including nested) optional
};
*/
console.log('\nBonus 3: Conditional Types');
console.log('TODO: Create conditional type utilities');
// TODO: Implement conditional types
/*
type NonNullable<T> = // Remove null and undefined from T
type FunctionReturnType<T> = // Extract return type from function type
type IsArray<T> = // Check if T is an array type
*/
console.log('\n📚 Exercise Instructions:');
console.log('1. Uncomment each TODO section');
console.log('2. Add proper TypeScript types');
console.log('3. Implement the required functionality');
console.log('4. Test your code by running: npm run build');
console.log('5. Check that there are no TypeScript errors');
console.log('');
console.log('💡 Tips:');
console.log('- Start with Week 1 exercises and progress gradually');
console.log('- Use the examples in the week folders as reference');
console.log('- Don\'t hesitate to experiment and make mistakes');
console.log('- TypeScript error messages are very helpful - read them carefully');
console.log('');
console.log('🎯 Happy learning!');
//# sourceMappingURL=exercises.js.map