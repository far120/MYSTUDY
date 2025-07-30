# Basic Types - The Building Blocks of TypeScript 🧱

Welcome to TypeScript's type system! Understanding basic types is fundamental to everything else you'll learn. Think of types as **labels** that tell TypeScript (and other developers) what kind of data you're working with.

## 🎯 Why Types Matter

### JavaScript Without Types:

```javascript
// JavaScript - No clarity about data types
let username = "john_doe";
let userAge = 25;
let isActive = true;

// Later in code...
username = 123; // Oops! Now it's a number
userAge = "twenty"; // Oops! Now it's a string
isActive = "yes"; // Oops! Now it's a string

// These mistakes cause runtime errors!
console.log(username.toUpperCase()); // Error if username is a number
```

### TypeScript With Types:

```typescript
// TypeScript - Crystal clear data types
let username: string = "john_doe";
let userAge: number = 25;
let isActive: boolean = true;

// Later in code...
username = 123; // ❌ Compile Error: number is not assignable to string
userAge = "twenty"; // ❌ Compile Error: string is not assignable to number
isActive = "yes"; // ❌ Compile Error: string is not assignable to boolean

// These errors are caught before your code runs!
```

## 🔢 Primitive Types

### 1. **Number Type**

In TypeScript, all numbers are floating point values.

```typescript
// Basic number types
let age: number = 25;
let price: number = 99.99;
let temperature: number = -5;

// Special number values
let infinity: number = Infinity;
let notANumber: number = NaN;

// Hexadecimal, binary, and octal
let hexValue: number = 0xff; // 255 in decimal
let binaryValue: number = 0b1010; // 10 in decimal
let octalValue: number = 0o744; // 484 in decimal

// Real-world examples
const TAX_RATE: number = 0.08;
const MAX_USERS: number = 1000;
let currentScore: number = 0;

function calculateTotal(price: number, tax: number): number {
  return price + price * tax;
}

const total: number = calculateTotal(100, TAX_RATE); // 108
```

### 2. **String Type**

Strings represent textual data.

```typescript
// Basic string types
let firstName: string = "Alice";
let lastName: string = "Johnson";
let city: string = "New York";

// Template literals (backticks)
let fullName: string = `${firstName} ${lastName}`;
let greeting: string = `Hello, ${firstName}! Welcome to ${city}.`;

// Multi-line strings
let poem: string = `
    Roses are red,
    Violets are blue,
    TypeScript is awesome,
    And so are you!
`;

// Real-world examples
const API_BASE_URL: string = "https://api.example.com";
let userEmail: string = "alice@example.com";
let errorMessage: string = "";

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function validateEmail(email: string): boolean {
  return email.includes("@") && email.includes(".");
}
```

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
```

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

```typescript
// any type - avoid when possible!
let anything: any = 42;
anything = "hello"; // OK
anything = true; // OK
anything = [1, 2, 3]; // OK
anything.foo.bar.baz; // OK (but dangerous!)

// When any might be useful (rare cases)
let userInput: any = getUserInput(); // From a form or API
let legacyData: any = JSON.parse(jsonString);

// Converting from any to specific types
let someValue: any = "hello world";
let strLength: number = (someValue as string).length;
```

### 7. **Void Type**

Used for functions that don't return anything.

```typescript
// Functions with no return value
function logMessage(message: string): void {
  console.log(message);
}

function saveToDatabase(data: object): void {
  // Save logic here
  // No return statement needed
}

// Variables of type void (rare)
let unusable: void = undefined; // Only undefined can be assigned
```

### 8. **Null and Undefined**

```typescript
// Null and undefined as types
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// More commonly used with union types
let optionalName: string | null = null;
let optionalAge: number | undefined = undefined;

// Checking for null/undefined
function greetUser(name: string | null): string {
  if (name === null) {
    return "Hello, Guest!";
  }
  return `Hello, ${name}!`;
}
```

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
```

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
