# Basic Types - Complete TypeScript Foundation 🧱

**Master TypeScript's fundamental building blocks!** This comprehensive guide will teach you everything about TypeScript's basic types with real-world examples, hands-on exercises, and practical applications.

## 🎯 Learning Objectives

By the end of this lesson, you will:

- Master all primitive TypeScript types (string, number, boolean, etc.)
- Understand when and how to use each type
- Know how to work with special types (any, unknown, never, void)
- Be able to debug type-related errors
- Write more reliable and self-documenting code

---

## 🤔 Why Types Are Crucial

### The Problem: JavaScript's Type Confusion

```javascript
// JavaScript - This looks innocent but is dangerous!
function calculateTax(price, rate) {
  return price * rate;
}

// All of these "work" but give wrong results:
calculateTax(100, 0.08); // ✅ Correct: 8
calculateTax("100", "0.08"); // ❌ Wrong: "1000.08" (string concatenation!)
calculateTax(100, "8%"); // ❌ Wrong: "1008%"
calculateTax("$100", 0.08); // ❌ Wrong: NaN
calculateTax(); // ❌ Wrong: NaN
```

### The Solution: TypeScript's Type Safety

```typescript
// TypeScript - Clear, safe, and reliable!
function calculateTax(price: number, rate: number): number {
  return price * rate;
}

// TypeScript catches problems immediately:
calculateTax(100, 0.08); // ✅ Works: 8
calculateTax("100", "0.08"); // ❌ Error: strings not allowed
calculateTax(100, "8%"); // ❌ Error: string not allowed for rate
calculateTax("$100", 0.08); // ❌ Error: string not allowed for price
calculateTax(); // ❌ Error: missing required parameters
```

---

## 🔢 The Number Type - Working with All Numbers

In TypeScript, **all numbers are floating-point values**. There's no separate integer type.

### Basic Number Usage:

```typescript
// Different ways to declare numbers
let age: number = 25;
let price: number = 99.99;
let temperature: number = -5.5;
let distance: number = 1000;

// Scientific notation
let scientificNumber: number = 1.23e10; // 12,300,000,000

// Binary, octal, and hexadecimal
let binary: number = 0b1010; // Binary (10 in decimal)
let octal: number = 0o744; // Octal (484 in decimal)
let hex: number = 0xff; // Hexadecimal (255 in decimal)

// Special number values
let infinityValue: number = Infinity;
let negativeInfinity: number = -Infinity;
let notANumber: number = NaN;

console.log("Age:", age);
console.log("Price: $" + price);
console.log("Temperature:", temperature + "°C");
```

### Number Methods and Operations:

```typescript
// Mathematical operations
let a: number = 10;
let b: number = 3;

let addition: number = a + b; // 13
let subtraction: number = a - b; // 7
let multiplication: number = a * b; // 30
let division: number = a / b; // 3.333...
let remainder: number = a % b; // 1
let power: number = a ** b; // 1000

// Useful number methods
let decimal: number = 123.456789;
let rounded: number = Math.round(decimal); // 123
let ceiling: number = Math.ceil(decimal); // 124
let floor: number = Math.floor(decimal); // 123
let fixed: string = decimal.toFixed(2); // "123.46" (string!)

console.log("Operations:", { addition, subtraction, multiplication });
console.log("Rounding:", { rounded, ceiling, floor, fixed });
```

---

## 📝 The String Type - Working with Text

Strings represent textual data and are one of the most commonly used types.

### Basic String Usage:

```typescript
// Different ways to create strings
let firstName: string = "Alice";
let lastName: string = "Johnson"; // Single quotes work too
let city: string = `New York`; // Template literals (backticks)

// Template literals for interpolation
let fullName: string = `${firstName} ${lastName}`;
let greeting: string = `Hello, ${firstName}! Welcome to ${city}.`;
let age: number = 25;
let introduction: string = `I am ${fullName}, I'm ${age} years old.`;

// Multi-line strings (template literals only)
let poem: string = `
    Roses are red,
    Violets are blue,
    TypeScript is awesome,
    And so are you!
`;

console.log("Full Name:", fullName);
console.log("Greeting:", greeting);
console.log("Introduction:", introduction);
```

### String Methods and Operations:

```typescript
// String manipulation
let message: string = "Hello, TypeScript World!";

// Length and character access
let length: number = message.length; // 23
let firstChar: string = message[0]; // "H"
let lastChar: string = message[message.length - 1]; // "!"

// Case conversion
let uppercase: string = message.toUpperCase(); // "HELLO, TYPESCRIPT WORLD!"
let lowercase: string = message.toLowerCase(); // "hello, typescript world!"

// Searching and replacing
let hasTypeScript: boolean = message.includes("TypeScript"); // true
let position: number = message.indexOf("TypeScript"); // 7
let replaced: string = message.replace("World", "Universe"); // "Hello, TypeScript Universe!"

// Trimming and splitting
let messy: string = "   trim me   ";
let clean: string = messy.trim(); // "trim me"
let words: string[] = message.split(" "); // ["Hello,", "TypeScript", "World!"]

// Real-world example: Email validation helper
function formatEmail(email: string): string {
  return email.toLowerCase().trim();
}

function isValidEmailFormat(email: string): boolean {
  return email.includes("@") && email.includes(".");
}

let userEmail: string = "  ALICE@EXAMPLE.COM  ";
let cleanEmail: string = formatEmail(userEmail); // "alice@example.com"
let isValid: boolean = isValidEmailFormat(cleanEmail); // true

console.log("String operations:", { length, uppercase, hasTypeScript });
console.log("Email processing:", { cleanEmail, isValid });
```

---

## ✅ The Boolean Type - True or False

Booleans represent logical values: `true` or `false`.

### Basic Boolean Usage:

```typescript
// Simple boolean values
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;
let isComplete: boolean = true;

// Booleans from expressions
let age: number = 25;
let isAdult: boolean = age >= 18; // true
let isTeenager: boolean = age >= 13 && age <= 19; // false
let canVote: boolean = age >= 18; // true

// String comparisons
let username: string = "alice";
let isValidUsername: boolean = username.length >= 3; // true
let hasSpecialChar: boolean = username.includes("@"); // false

// Real-world example: Feature flags
let isDarkModeEnabled: boolean = true;
let isNotificationsEnabled: boolean = false;
let hasProSubscription: boolean = true;

// Complex boolean logic
function canAccessFeature(
  hasSubscription: boolean,
  isLoggedIn: boolean
): boolean {
  return hasSubscription && isLoggedIn;
}

let canUseAdvancedFeatures: boolean = canAccessFeature(
  hasProSubscription,
  isLoggedIn
);

console.log("User status:", { isLoggedIn, isAdult, canUseAdvancedFeatures });
```

### Boolean in Conditions:

```typescript
// Using booleans in if statements
let userAge: number = 20;
let hasLicense: boolean = true;
let hasInsurance: boolean = true;

if (userAge >= 18 && hasLicense && hasInsurance) {
  console.log("Can drive legally!");
} else {
  console.log("Cannot drive yet.");
}

// Boolean functions
function isEven(num: number): boolean {
  return num % 2 === 0;
}

function isPalindrome(text: string): boolean {
  const cleaned = text.toLowerCase().replace(/[^a-z]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

console.log("Is 10 even?", isEven(10)); // true
console.log("Is 'racecar' a palindrome?", isPalindrome("racecar")); // true
```

---

## 🔤 The Any Type - Use with Caution!

The `any` type disables TypeScript's type checking. **Use sparingly!**

### When to Use Any:

```typescript
// 1. Migrating from JavaScript gradually
let legacyValue: any = 42;
legacyValue = "now it's a string";
legacyValue = true;
legacyValue = { key: "value" };
// No type errors, but no type safety either!

// 2. Working with dynamic content (use unknown instead when possible)
function parseJsonUnsafe(json: string): any {
  return JSON.parse(json);
}

// 3. Third-party libraries without type definitions
declare const someOldLibrary: any;
someOldLibrary.doSomething();

console.log("Any value:", legacyValue);
```

### Why to Avoid Any:

```typescript
// Bad: Using any defeats the purpose of TypeScript
function badFunction(data: any): any {
  return data.someProperty.anotherProperty; // No type checking!
}

// Good: Use specific types instead
interface UserData {
  name: string;
  email: string;
  age: number;
}

function goodFunction(data: UserData): string {
  return data.name; // Type-safe!
}

// If you must use any, at least validate it
function saferFunction(data: any): string {
  if (typeof data === "object" && data !== null && "name" in data) {
    return data.name;
  }
  throw new Error("Invalid data structure");
}
```

---

## ❓ The Unknown Type - Safer Any

The `unknown` type is like `any` but requires type checking before use.

### Using Unknown Safely:

```typescript
// Unknown requires type checking
function parseJsonSafe(json: string): unknown {
  return JSON.parse(json);
}

let result: unknown = parseJsonSafe('{"name": "Alice", "age": 25}');

// Must check type before using
if (typeof result === "object" && result !== null) {
  const obj = result as { name: string; age: number };
  console.log("Name:", obj.name);
}

// Type guards with unknown
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function processUnknownValue(value: unknown): void {
  if (isString(value)) {
    console.log("String:", value.toUpperCase()); // TypeScript knows it's a string
  } else if (isNumber(value)) {
    console.log("Number:", value.toFixed(2)); // TypeScript knows it's a number
  } else {
    console.log("Unknown type:", value);
  }
}

processUnknownValue("hello"); // String: HELLO
processUnknownValue(42.567); // Number: 42.57
processUnknownValue(true); // Unknown type: true
```

---

## 🚫 The Void Type - No Return Value

The `void` type means a function doesn't return anything.

### Using Void:

```typescript
// Functions that don't return values
function logMessage(message: string): void {
  console.log("Log:", message);
  // No return statement needed
}

function updateUserProfile(userId: string, name: string): void {
  console.log(`Updating user ${userId} with name ${name}`);
  // Performs side effects but doesn't return anything
}

// Variables of type void (rarely used)
let voidValue: void = undefined; // Only undefined can be assigned

// Real-world examples
function sendEmail(to: string, subject: string, body: string): void {
  console.log(`Sending email to ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  // Would actually send email, but returns nothing
}

function saveToDatabase(data: object): void {
  console.log("Saving to database:", data);
  // Database operation, no return value needed
}

logMessage("TypeScript is awesome!");
sendEmail("alice@example.com", "Welcome!", "Thanks for joining us!");
```

---

## ⛔ The Never Type - Values That Never Occur

The `never` type represents values that never occur.

### Using Never:

```typescript
// Functions that never return (throw errors or infinite loops)
function throwError(message: string): never {
  throw new Error(message);
  // This line is never reached
}

function infiniteLoop(): never {
  while (true) {
    console.log("Running forever...");
  }
  // This line is never reached
}

// Exhaustive checking in switch statements
type Color = "red" | "green" | "blue";

function processColor(color: Color): string {
  switch (color) {
    case "red":
      return "Stop";
    case "green":
      return "Go";
    case "blue":
      return "Caution";
    default:
      // If we add a new color to the type, TypeScript will error here
      const exhaustiveCheck: never = color;
      throw new Error(`Unhandled color: ${exhaustiveCheck}`);
  }
}

// Real-world example: API error handling
function handleApiError(errorCode: number): never {
  switch (errorCode) {
    case 404:
      throw new Error("Resource not found");
    case 401:
      throw new Error("Unauthorized");
    case 500:
      throw new Error("Internal server error");
    default:
      throw new Error(`Unknown error code: ${errorCode}`);
  }
}

console.log(processColor("red")); // "Stop"
// handleApiError(404);             // Throws error: Resource not found
```

const API_BASE_URL: string = "https://api.example.com";
let userEmail: string = "alice@example.com";
let errorMessage: string = "";

function formatCurrency(amount: number): string {
return `$${amount.toFixed(2)}`;
}

function validateEmail(email: string): boolean {
return email.includes("@") && email.includes(".");
}

````

### 3. **Boolean Type**

Booleans represent true/false values.

```typescript
// Basic boolean types
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;
let isLoading: boolean = false;

// Boolean from expressions
let isAdult: boolean = age >= 18;
let isEmpty: boolean = items.length === 0;
let isValidEmail: boolean = email.includes("@");

// Real-world examples
let isDarkMode: boolean = false;
let showNotifications: boolean = true;
let acceptTerms: boolean = false;

function canVote(age: number): boolean {
  return age >= 18;
}

function isWeekend(day: string): boolean {
  return day === "Saturday" || day === "Sunday";
}

// Feature flags
const FEATURE_ENABLED: boolean = true;
const DEBUG_MODE: boolean = false;
````

## 📚 Complex Types

### 4. **Array Type**

Arrays can be typed in two ways:

```typescript
// Method 1: Type followed by []
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let flags: boolean[] = [true, false, true];

// Method 2: Array<Type> syntax
let scores: Array<number> = [95, 87, 92];
let colors: Array<string> = ["red", "green", "blue"];

// Mixed arrays (we'll cover union types later)
let mixed: (string | number)[] = ["Alice", 25, "Bob", 30];

// Array methods with types
let fruits: string[] = ["apple", "banana", "orange"];
fruits.push("grape"); // ✅ OK - string
fruits.push(123); // ❌ Error - number not allowed

// Real-world examples
let shoppingCart: string[] = [];
let userIds: number[] = [101, 102, 103];
let completedTasks: boolean[] = [true, false, true, true];

// Array operations
function getTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0);
}

function getUniqueItems(items: string[]): string[] {
  return [...new Set(items)];
}
```

### 5. **Object Type**

Objects can be typed inline or with interfaces (we'll learn interfaces later).

```typescript
// Inline object typing
let user: { name: string; age: number; isActive: boolean } = {
  name: "Alice",
  age: 25,
  isActive: true,
};

// Object with optional properties (? means optional)
let product: {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional property
} = {
  id: 1,
  name: "Laptop",
  price: 999.99,
  // description is optional, so we can omit it
};

// Nested objects
let address: {
  street: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
} = {
  street: "123 Main St",
  city: "New York",
  country: "USA",
  coordinates: {
    lat: 40.7128,
    lng: -74.006,
  },
};

// Real-world examples
let apiResponse: {
  success: boolean;
  data: string[];
  message: string;
} = {
  success: true,
  data: ["item1", "item2"],
  message: "Data retrieved successfully",
};
```

## 🔍 Special Types

### 6. **Any Type** (Use Sparingly!)

The `any` type disables TypeScript's type checking.

````typescript
// any type - avoid when possible!
let anything: any = 42;
anything = "hello"; // OK
---

## 🔄 Null and Undefined Types

These represent absence of value and are important for handling optional data.

### Basic Usage:

```typescript
// Explicit null and undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// More commonly used with union types
let optionalName: string | null = null;
let optionalAge: number | undefined = undefined;
let userEmail: string | null | undefined = undefined;

// Checking for null/undefined safely
function greetUser(name: string | null): string {
    if (name === null) {
        return "Hello, Guest!";
    }
    return `Hello, ${name}!`;
}

function calculateLength(text: string | undefined): number {
    if (text === undefined) {
        return 0;
    }
    return text.length;
}

// Real-world example: Optional user data
interface UserProfile {
    name: string;
    email: string;
    phone?: string;           // Optional (can be undefined)
    avatar: string | null;    // Explicitly nullable
}

function displayUserInfo(user: UserProfile): void {
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);

    if (user.phone) {
        console.log(`Phone: ${user.phone}`);
    } else {
        console.log("Phone: Not provided");
    }

    if (user.avatar !== null) {
        console.log(`Avatar: ${user.avatar}`);
    } else {
        console.log("Avatar: No image");
    }
}

let user: UserProfile = {
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: null
    // phone is undefined (not provided)
};

displayUserInfo(user);
````

---

## 📋 Complete Type Reference

### Type Declaration Syntax:

```typescript
// Variable declarations
let variableName: type = value;
const constantName: type = value;

// Function declarations
function functionName(param: type): returnType {
  return value;
}

// Arrow functions
const arrowFunction = (param: type): returnType => value;

// Optional parameters
function optionalParam(required: type, optional?: type): returnType {
  return value;
}
```

### Common Type Combinations:

```typescript
// Union types (value can be one of several types)
let id: string | number = "user123";
id = 456; // Also valid

// Optional types (shorthand for Type | undefined)
let optionalValue?: string = undefined;

// Nullable types
let nullableValue: string | null = null;

// Arrays of specific types
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Function types
let calculator: (a: number, b: number) => number;
calculator = (x, y) => x + y;
```

---

## 🎮 Complete Practical Example

Let's build a comprehensive example using all basic types:

```typescript
// src/complete-example.ts

// User management system with all basic types

// Type definitions
type UserRole = "admin" | "user" | "guest";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  role: UserRole;
  lastLogin: Date | null;
  preferences: unknown; // Could be any structure
}

// Global state
let users: User[] = [];
let currentUserId: number = 1;
let systemMessage: string = "Welcome to the User Management System";

// Core functions
function createUser(
  name: string,
  email: string,
  age: number,
  role: UserRole = "user"
): User {
  const newUser: User = {
    id: currentUserId++,
    name: name,
    email: email,
    age: age,
    isActive: true,
    role: role,
    lastLogin: null,
    preferences: {},
  };

  users.push(newUser);
  logActivity(`Created user: ${name}`);
  return newUser;
}

function findUserById(id: number): User | undefined {
  return users.find((user) => user.id === id);
}

function updateUserStatus(id: number, isActive: boolean): void {
  const user = findUserById(id);
  if (user) {
    user.isActive = isActive;
    logActivity(
      `Updated user ${user.name} status to ${isActive ? "active" : "inactive"}`
    );
  } else {
    logActivity(`User with ID ${id} not found`);
  }
}

function loginUser(id: number): boolean {
  const user = findUserById(id);
  if (user && user.isActive) {
    user.lastLogin = new Date();
    logActivity(`User ${user.name} logged in`);
    return true;
  }
  return false;
}

function isAdultUser(user: User): boolean {
  return user.age >= 18;
}

function getUsersByRole(role: UserRole): User[] {
  return users.filter((user) => user.role === role);
}

function logActivity(message: string): void {
  const timestamp: string = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

function displaySystemStats(): void {
  const totalUsers: number = users.length;
  const activeUsers: number = users.filter((user) => user.isActive).length;
  const adultUsers: number = users.filter(isAdultUser).length;

  console.log("\n=== System Statistics ===");
  console.log(`Total Users: ${totalUsers}`);
  console.log(`Active Users: ${activeUsers}`);
  console.log(`Adult Users: ${adultUsers}`);
  console.log(`System Message: ${systemMessage}`);
}

// Error handling function
function handleError(error: unknown): never {
  if (error instanceof Error) {
    console.error("Application Error:", error.message);
  } else {
    console.error("Unknown Error:", error);
  }
  throw new Error("Application terminated due to error");
}

// Usage example
try {
  console.log(systemMessage);

  // Create some users
  const alice = createUser("Alice Johnson", "alice@example.com", 25, "admin");
  const bob = createUser("Bob Smith", "bob@example.com", 17, "user");
  const charlie = createUser("Charlie Brown", "charlie@example.com", 30);

  // User operations
  loginUser(alice.id);
  loginUser(bob.id);
  updateUserStatus(bob.id, false);

  // Display information
  displaySystemStats();

  console.log("\n=== User Details ===");
  users.forEach((user) => {
    console.log(
      `${user.name} (${user.role}): ${
        user.isActive ? "Active" : "Inactive"
      }, Adult: ${isAdultUser(user)}`
    );
  });
} catch (error) {
  handleError(error);
}
```

### Run the example:

```bash
npx ts-node src/complete-example.ts
```

---

## 📊 Type Comparison Table

| Type        | Example                    | Use Case              | Pros                     | Cons                         |
| ----------- | -------------------------- | --------------------- | ------------------------ | ---------------------------- |
| `number`    | `42`, `3.14`               | Numeric values        | Type-safe math           | No integer/float distinction |
| `string`    | `"hello"`, `` `${name}` `` | Text data             | Rich string operations   | Immutable                    |
| `boolean`   | `true`, `false`            | Logical values        | Clear intentions         | Limited to two values        |
| `any`       | Any value                  | Legacy code migration | Maximum flexibility      | No type safety               |
| `unknown`   | Any value                  | External data         | Safer than any           | Requires type checking       |
| `void`      | `undefined`                | Function returns      | Clear no-return intent   | Limited usage                |
| `never`     | Never occurs               | Error functions       | Exhaustive checking      | Advanced concept             |
| `null`      | `null`                     | Intentional absence   | Explicit nullability     | Requires checking            |
| `undefined` | `undefined`                | Uninitialized         | JavaScript compatibility | Implicit absence             |

---

## 🎯 Key Learning Points

After completing this lesson, you should understand:

### ✅ Type Safety Benefits:

- **Catch errors early** - before your code runs
- **Better autocomplete** - IDEs know what's available
- **Self-documenting code** - types explain what data looks like
- **Safer refactoring** - TypeScript tracks changes across files

### ✅ When to Use Each Type:

- **`number`**: All numeric values (integers, decimals, etc.)
- **`string`**: Text data, use template literals for interpolation
- **`boolean`**: Logical true/false values, great for flags
- **`any`**: Only when migrating from JavaScript (use sparingly!)
- **`unknown`**: When you need dynamic typing but want safety
- **`void`**: Functions that perform actions but don't return data
- **`never`**: Functions that never return (errors, infinite loops)

### ✅ Best Practices:

- **Always specify types** - don't rely on inference for function parameters
- **Avoid `any`** - use `unknown` when you need dynamic typing
- **Use strict mode** - catches more potential errors
- **Check for null/undefined** - handle optional data safely

---

## 🚀 What's Next?

Congratulations! You've mastered TypeScript's fundamental types. You now have the foundation to:

- ✅ **Declare variables** with appropriate types
- ✅ **Create functions** with typed parameters and return values
- ✅ **Handle optional and nullable** data safely
- ✅ **Choose the right type** for each situation
- ✅ **Understand error messages** when types don't match

**Next Lesson**: `03-functions-with-types.md` - Learn advanced function typing including optional parameters, default values, overloads, and function expressions!

---

## 📚 Additional Practice

Before moving on, try these challenges:

1. **Convert a JavaScript project** - Take a small JavaScript project and add types
2. **Create a mini-application** - Build a simple todo list with proper types
3. **Practice type debugging** - Intentionally create type errors and fix them
4. **Explore VS Code features** - See how autocomplete works with types

---

_Remember: Types are not just for preventing errors - they're documentation, they improve development experience, and they make your code more maintainable. Every type you add makes your code more professional!_ 🎯

````

### 9. **Never Type**

Represents values that never occur.

```typescript
// Function that never returns (throws error)
function throwError(message: string): never {
  throw new Error(message);
}

// Function with infinite loop
function infiniteLoop(): never {
  while (true) {
    // This function never returns
  }
}

// Exhaustive checks (advanced concept)
function handleStatus(status: "loading" | "success" | "error"): string {
  switch (status) {
    case "loading":
      return "Please wait...";
    case "success":
      return "Operation completed!";
    case "error":
      return "Something went wrong!";
    default:
      // This should never be reached
      const exhaustiveCheck: never = status;
      throw new Error(`Unhandled status: ${exhaustiveCheck}`);
  }
}
````

## 🎨 Type Annotations vs Type Inference

### Explicit Type Annotations:

```typescript
// Explicitly telling TypeScript the type
let message: string = "Hello";
let count: number = 42;
let isReady: boolean = false;
```

### Type Inference:

```typescript
// TypeScript figures out the type automatically
let message = "Hello"; // TypeScript infers: string
let count = 42; // TypeScript infers: number
let isReady = false; // TypeScript infers: boolean

// Type inference with functions
function add(a: number, b: number) {
  return a + b; // TypeScript infers return type: number
}

// When to use explicit types vs inference
let username = "alice"; // Inference is fine
let userId: number; // Explicit needed (no initial value)
let config: object = {}; // Explicit for clarity
```

## 🏗️ Real-World Examples

### User Management System:

```typescript
// User data
let userId: number = 12345;
let username: string = "alice_wonder";
let email: string = "alice@example.com";
let isEmailVerified: boolean = false;
let lastLoginDate: string = "2024-01-15";

// User preferences
let preferredLanguage: string = "en";
let isDarkModeEnabled: boolean = true;
let notificationSettings: boolean[] = [true, false, true]; // email, sms, push

// User functions
function createUser(
  name: string,
  email: string,
  age: number
): { id: number; name: string; email: string; age: number } {
  return {
    id: Math.floor(Math.random() * 10000),
    name: name,
    email: email,
    age: age,
  };
}

function validateAge(age: number): boolean {
  return age >= 0 && age <= 150;
}

function formatUserInfo(name: string, age: number, isActive: boolean): string {
  const status: string = isActive ? "Active" : "Inactive";
  return `${name} (${age} years old) - ${status}`;
}
```

### E-commerce Product Catalog:

```typescript
// Product information
let productId: number = 1001;
let productName: string = "Wireless Headphones";
let price: number = 99.99;
let isInStock: boolean = true;
let categories: string[] = ["Electronics", "Audio", "Wireless"];
let ratings: number[] = [4.5, 5.0, 4.2, 4.8];

// Product functions
function calculateAverageRating(ratings: number[]): number {
  const sum: number = ratings.reduce((total, rating) => total + rating, 0);
  return sum / ratings.length;
}

function applyDiscount(originalPrice: number, discountPercent: number): number {
  return originalPrice * (1 - discountPercent / 100);
}

function isProductAvailable(stock: number, minRequired: number): boolean {
  return stock >= minRequired;
}

// Calculate final price
const originalPrice: number = 99.99;
const discountPercent: number = 15;
const finalPrice: number = applyDiscount(originalPrice, discountPercent);
```

## 📝 Practice Exercises

### Exercise 1: Basic Type Annotations

Convert this JavaScript to TypeScript by adding appropriate type annotations:

```javascript
// JavaScript version
let customerName = "John Doe";
let customerId = 5432;
let isVip = false;
let purchaseHistory = [99.99, 149.5, 75.25];
let totalSpent = 324.74;

function calculateDiscount(total, isVipCustomer) {
  if (isVipCustomer) {
    return total * 0.1;
  }
  return total * 0.05;
}
```

### Exercise 2: Function Types

Create TypeScript functions with proper type annotations:

```typescript
// 1. Function that takes two numbers and returns their product
// Your function here

// 2. Function that takes a string and returns its length
// Your function here

// 3. Function that takes an array of numbers and returns the largest one
// Your function here

// 4. Function that takes a name and optional age, returns a greeting
// Your function here
```

### Exercise 3: Object Types

Define types for these objects:

```typescript
// 1. A book object with title, author, pages, and optional ISBN
// Your type definition and object here

// 2. A weather report with temperature, humidity, conditions, and location
// Your type definition and object here

// 3. A shopping cart item with product name, quantity, price, and optional discount
// Your type definition and object here
```

## 🐛 Common Mistakes and How to Avoid Them

### 1. **Using `any` Too Much**

```typescript
// ❌ Bad - loses all type safety
let data: any = getApiData();
data.anything.can.happen; // No error checking!

// ✅ Good - use specific types
let data: { name: string; age: number } = getApiData();
data.name.toUpperCase(); // TypeScript knows this is safe
```

### 2. **Forgetting Optional Properties**

```typescript
// ❌ Bad - all properties required
let user: { name: string; email: string; phone: string } = {
  name: "Alice",
  email: "alice@example.com",
  // Error: phone is missing
};

// ✅ Good - make optional properties optional
let user: { name: string; email: string; phone?: string } = {
  name: "Alice",
  email: "alice@example.com",
  // phone is optional, so this is fine
};
```

### 3. **Mixing Up Array Syntax**

```typescript
// ❌ Inconsistent
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["a", "b"];

// ✅ Consistent (choose one style and stick with it)
let numbers: number[] = [1, 2, 3];
let names: string[] = ["a", "b"];

// OR

let numbers: Array<number> = [1, 2, 3];
let names: Array<string> = ["a", "b"];
```

## 🎯 Best Practices

### 1. **Use Type Inference When Obvious**

```typescript
// ✅ Good - inference is clear
let name = "Alice";
let age = 25;
let isActive = true;

// ✅ Good - explicit when needed
let userId: number; // Will be assigned later
let config: object = {}; // Type isn't obvious from value
```

### 2. **Be Specific with Types**

```typescript
// ❌ Too generic
let status: string = "pending";

// ✅ More specific (we'll learn about literal types later)
let status: "pending" | "approved" | "rejected" = "pending";
```

### 3. **Use Descriptive Variable Names**

```typescript
// ❌ Unclear
let x: number = 25;
let flag: boolean = true;

// ✅ Clear
let userAge: number = 25;
let isEmailVerified: boolean = true;
```

## 🌟 Key Takeaways

- **Basic types** are the foundation of TypeScript's type system
- **Primitive types**: `number`, `string`, `boolean`
- **Complex types**: Arrays, objects, and more
- **Special types**: `any`, `void`, `null`, `undefined`, `never`
- **Type inference** vs **explicit annotations**
- **Avoid `any`** when possible - it defeats the purpose of TypeScript

## 🚀 What's Next?

Now that you understand basic types, we'll explore **Functions with Types** - learning how to add type safety to function parameters, return values, and more complex function patterns.

Remember: Types are your friends! They help catch bugs early and make your code more readable and maintainable.

---

💡 **Pro Tip**: Start with the basic types (`number`, `string`, `boolean`) and gradually add more complex typing as you become comfortable. Don't try to type everything perfectly from the start!
