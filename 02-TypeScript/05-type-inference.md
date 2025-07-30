# Type Inference - Let TypeScript Figure It Out 🧠

TypeScript has a powerful **type inference system** that can automatically determine types without you explicitly writing them. Learning when to use inference vs explicit types is crucial for writing clean, maintainable TypeScript code.

## 🎯 What is Type Inference?

Type inference is TypeScript's ability to **automatically determine** the type of a variable, function return, or expression based on the code you write.

### Basic Example:

```typescript
// Explicit typing (you specify the type)
let name: string = "Alice";
let age: number = 25;
let isActive: boolean = true;

// Type inference (TypeScript figures it out)
let name = "Alice"; // TypeScript infers: string
let age = 25; // TypeScript infers: number
let isActive = true; // TypeScript infers: boolean

// Both approaches are equally type-safe!
name = 123; // ❌ Error in both cases
age = "thirty"; // ❌ Error in both cases
isActive = "yes"; // ❌ Error in both cases
```

## 🤖 How Type Inference Works

### Variable Initialization:

```typescript
// TypeScript looks at the initial value
let message = "Hello World"; // inferred as string
let count = 42; // inferred as number
let items = ["apple", "banana"]; // inferred as string[]
let user = { name: "Alice", age: 25 }; // inferred as { name: string; age: number }

// Without initialization, TypeScript defaults to 'any'
let something; // inferred as any (avoid this!)
something = "text"; // still any
something = 123; // still any

// Better approach: provide initial value or explicit type
let something = ""; // inferred as string
let something: string; // explicit type, no initial value
```

### Array Inference:

```typescript
// Simple arrays
let numbers = [1, 2, 3, 4, 5]; // inferred as number[]
let names = ["Alice", "Bob", "Charlie"]; // inferred as string[]
let flags = [true, false, true]; // inferred as boolean[]

// Mixed arrays
let mixed = [1, "hello", true]; // inferred as (string | number | boolean)[]
let nullableNumbers = [1, 2, null, 4]; // inferred as (number | null)[]

// Empty arrays need help
let empty = []; // inferred as any[] (not ideal)
let emptyNumbers: number[] = []; // explicit type needed
let emptyNames = [] as string[]; // type assertion

// Best practice: provide context
function getNumbers(): number[] {
  return []; // inferred as number[] from return type
}
```

### Object Inference:

```typescript
// Object literal inference
let person = {
  name: "Alice", // string
  age: 25, // number
  isEmployed: true, // boolean
  hobbies: ["reading", "coding"], // string[]
};

// TypeScript infers:
// {
//   name: string;
//   age: number;
//   isEmployed: boolean;
//   hobbies: string[];
// }

// Nested object inference
let config = {
  api: {
    baseUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
  },
  ui: {
    theme: "dark",
    language: "en",
  },
};

// TypeScript automatically infers the full nested structure!
```

## 🔄 Function Return Type Inference

### Basic Function Inference:

```typescript
// TypeScript infers return types
function add(a: number, b: number) {
  return a + b; // inferred return type: number
}

function greet(name: string) {
  return `Hello, ${name}!`; // inferred return type: string
}

function isEven(num: number) {
  return num % 2 === 0; // inferred return type: boolean
}

// Complex return type inference
function getUser(id: number) {
  return {
    id: id,
    name: "User " + id,
    isActive: true,
    createdAt: new Date(),
  };
}

// TypeScript infers:
// {
//   id: number;
//   name: string;
//   isActive: boolean;
//   createdAt: Date;
// }
```

### Conditional Return Types:

```typescript
function processValue(input: string | number) {
  if (typeof input === "string") {
    return input.toUpperCase(); // string
  } else {
    return input * 2; // number
  }
}
// Inferred return type: string | number

function findUser(id: number) {
  if (id > 0) {
    return { id, name: `User ${id}` };
  }
  return null;
}
// Inferred return type: { id: number; name: string } | null
```

## ⚡ Advanced Inference Patterns

### Array Method Inference:

```typescript
let numbers = [1, 2, 3, 4, 5];

// map() inference
let doubled = numbers.map((n) => n * 2); // inferred as number[]
let strings = numbers.map((n) => `Number: ${n}`); // inferred as string[]

// filter() inference
let evens = numbers.filter((n) => n % 2 === 0); // inferred as number[]

// reduce() inference
let sum = numbers.reduce((acc, n) => acc + n, 0); // inferred as number
let joined = numbers.reduce((acc, n) => acc + n.toString(), ""); // inferred as string

// Complex object transformations
interface User {
  id: number;
  name: string;
  age: number;
}

let users: User[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

// TypeScript infers the complex return types
let userNames = users.map((u) => u.name); // string[]
let adults = users.filter((u) => u.age >= 18); // User[]
let userSummaries = users.map((u) => ({
  // { id: number; summary: string }[]
  id: u.id,
  summary: `${u.name} (${u.age})`,
}));
```

### Generic Function Inference:

```typescript
// TypeScript can infer generic types
function identity<T>(value: T): T {
  return value;
}

let stringValue = identity("hello"); // T inferred as string
let numberValue = identity(42); // T inferred as number
let arrayValue = identity([1, 2, 3]); // T inferred as number[]

// More complex generic inference
function createPair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

let pair1 = createPair("hello", 42); // [string, number]
let pair2 = createPair(true, ["a", "b"]); // [boolean, string[]]

// Array helper with inference
function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

let numbers = [1, 2, 3];
let firstNumber = getFirstElement(numbers); // number | undefined

let names = ["Alice", "Bob"];
let firstName = getFirstElement(names); // string | undefined
```

## 🎯 When to Use Inference vs Explicit Types

### ✅ Good Cases for Inference:

```typescript
// 1. Simple variable assignments
let name = "Alice"; // Clear from value
let age = 25; // Clear from value
let items = ["apple", "banana"]; // Clear from value

// 2. Function returns with simple logic
function double(x: number) {
  return x * 2; // Obviously returns number
}

// 3. Array operations
let users = getUsers();
let activeUsers = users.filter((u) => u.isActive); // Type flows through

// 4. Object transformations
let userProfiles = users.map((u) => ({
  id: u.id,
  displayName: `${u.firstName} ${u.lastName}`,
}));
```

### ✅ Good Cases for Explicit Types:

```typescript
// 1. Function parameters (always explicit)
function calculateTax(price: number, rate: number): number {
  return price * rate;
}

// 2. Public API functions (for clarity)
export function processPayment(
  amount: number,
  method: "credit" | "debit"
): Promise<PaymentResult> {
  // Implementation
}

// 3. Complex types that aren't obvious
let config: DatabaseConfig = {
  host: "localhost",
  port: 5432,
};

// 4. Variables declared without initialization
let userId: number;
let errorMessage: string | null;

// 5. When you want stricter typing than inference
let status: "pending" | "approved" | "rejected" = "pending";
// Without explicit type, it would be inferred as string
```

## 🏗️ Real-World Inference Examples

### API Response Processing:

```typescript
// API response type
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

// Function with good inference
async function fetchUsers() {
  const response = await fetch("/api/users");
  const result: ApiResponse<User[]> = await response.json();

  // TypeScript infers types throughout the chain
  if (result.success) {
    return result.data.map((user) => ({
      id: user.id, // number
      fullName: `${user.firstName} ${user.lastName}`, // string
      isActive: user.isActive, // boolean
    }));
    // Return type inferred as: { id: number; fullName: string; isActive: boolean }[]
  }

  return [];
}

// Usage with inference
async function displayUsers() {
  const users = await fetchUsers(); // Type inferred from return

  const activeUsers = users.filter((u) => u.isActive); // Inference flows
  const userNames = users.map((u) => u.fullName); // string[]

  return {
    total: users.length,
    active: activeUsers.length,
    names: userNames,
  };
  // Return type automatically inferred
}
```

### State Management Pattern:

```typescript
// Initial state with inference
const initialState = {
  user: null as User | null,
  loading: false,
  error: null as string | null,
  preferences: {
    theme: "light" as "light" | "dark",
    notifications: true,
  },
};

// TypeScript infers the complete state shape
type AppState = typeof initialState;

// Reducer with good inference
function appReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload, // User | null inferred
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload, // boolean inferred
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload, // string | null inferred
        loading: false,
      };

    default:
      return state;
  }
}
```

### Form Handling with Inference:

```typescript
// Form data with inference
function createFormHandler<T>(initialValues: T) {
  let values = { ...initialValues }; // T inferred
  let errors = {} as Partial<Record<keyof T, string>>;

  return {
    getValue: <K extends keyof T>(key: K): T[K] => {
      return values[key]; // Return type inferred
    },

    setValue: <K extends keyof T>(key: K, value: T[K]) => {
      values[key] = value; // Type safety maintained
    },

    validate: () => {
      const errorEntries = Object.entries(values)
        .filter(([key, value]) => !value) // Inference works here
        .map(([key]) => [key, "This field is required"]);

      errors = Object.fromEntries(errorEntries);
      return Object.keys(errors).length === 0;
    },

    getFormData: () => ({
      values, // T inferred
      errors, // Partial<Record<keyof T, string>> inferred
      isValid: Object.keys(errors).length === 0,
    }),
  };
}

// Usage with full type inference
const userForm = createFormHandler({
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
});

// All operations are type-safe with inference
userForm.setValue("firstName", "Alice"); // ✅ OK
userForm.setValue("age", 25); // ✅ OK
userForm.setValue("firstName", 123); // ❌ Error: number not assignable to string
```

## 📝 Practice Exercises

### Exercise 1: Inference Analysis

Analyze these code snippets and determine what TypeScript infers:

```typescript
// What types are inferred here?
let a = 42;
let b = "hello";
let c = [1, 2, 3];
let d = { name: "Alice", age: 25 };
let e = [1, "hello", true];

function mystery(x) {
  if (x > 10) {
    return "big";
  }
  return x * 2;
}

// What is the return type of mystery?
```

### Exercise 2: Improve with Inference

Refactor this over-typed code to use appropriate inference:

```typescript
// Over-typed version
let count: number = 0;
let message: string = "Hello";
let items: string[] = ["apple", "banana"];

function processItems(list: string[]): string[] {
  const result: string[] = list.map((item: string): string => {
    return item.toUpperCase();
  });
  return result;
}

// Your improved version here
```

### Exercise 3: Balance Inference and Explicit Types

Create a shopping cart system that uses inference where appropriate and explicit types where necessary:

```typescript
// Create a system with:
// 1. Product interface (explicit)
// 2. Cart operations (good mix of inference and explicit)
// 3. Calculation functions (leverage inference)
// 4. State management (strategic explicit types)
```

## 🐛 Common Inference Pitfalls

### 1. **Over-relying on Inference**

```typescript
// ❌ Too much inference - unclear intent
let status = "pending"; // Just string, not specific values
status = "whatever"; // This shouldn't be allowed!

// ✅ Better - explicit when you need specific values
let status: "pending" | "approved" | "rejected" = "pending";
```

### 2. **Empty Array Inference**

```typescript
// ❌ Problematic inference
let items = []; // any[]
items.push("string"); // Now it's still any[]
items.push(123); // This should probably be an error

// ✅ Better - provide context
let items: string[] = []; // Clear intent
let items = [] as string[]; // Type assertion
let items = ["initial"] as string[]; // With initial value
```

### 3. **Function Parameter Inference**

```typescript
// ❌ Don't rely on inference for parameters
function processUser(user) {
  // Parameter 'user' implicitly has 'any' type
  return user.name.toUpperCase();
}

// ✅ Always type parameters
function processUser(user: User): string {
  return user.name.toUpperCase();
}
```

### 4. **Widening vs Narrowing**

```typescript
// TypeScript sometimes widens types
let x = null; // Inferred as any (in older TS versions)
let y = undefined; // Inferred as any (in older TS versions)

// Better to be explicit
let x: string | null = null;
let y: number | undefined = undefined;

// Or use strict null checks in tsconfig.json
```

## 🎯 Best Practices for Type Inference

### 1. **Use Inference for Obvious Cases**

```typescript
// ✅ Good inference usage
let name = "Alice"; // Obviously string
let numbers = [1, 2, 3]; // Obviously number[]
let user = { id: 1, name: "Alice" }; // Object shape is clear
```

### 2. **Be Explicit for Public APIs**

```typescript
// ✅ Explicit for public functions
export function calculateTax(price: number, rate: number): number {
  return price * rate;
}

// ✅ Explicit for important types
export interface User {
  id: number;
  name: string;
  email: string;
}
```

### 3. **Use `typeof` for Complex Inference**

```typescript
// ✅ Leverage typeof for complex objects
const defaultConfig = {
  api: {
    baseUrl: "https://api.example.com",
    timeout: 5000,
  },
  ui: {
    theme: "light" as "light" | "dark",
    language: "en",
  },
};

type Config = typeof defaultConfig; // Infer the complex type
```

### 4. **Combine Inference with Utility Types**

```typescript
// ✅ Let inference and utility types work together
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

function updateUser(id: number, updates: Partial<User>) {
  // TypeScript infers the merged type
  return {
    ...existingUser,
    ...updates,
    updatedAt: new Date(), // Inferred as Date
  };
}
```

## 🌟 Key Takeaways

- **Type inference** reduces boilerplate while maintaining type safety
- **Use inference** for obvious cases (variable initialization, simple returns)
- **Be explicit** for function parameters, public APIs, and complex scenarios
- **Trust inference** for array operations and object transformations
- **Combine inference** with explicit types strategically
- **Avoid over-typing** - let TypeScript do the work when it's clear
- **Watch for widening** - be explicit when you need narrow types

## 🚀 What's Next?

Now that you understand type inference, we'll explore **Union Types** - learning how to create types that can be one of several different types, making your code more flexible while remaining type-safe.

Remember: Good TypeScript is about finding the right balance between explicit types and letting the compiler infer what it can!

---

💡 **Pro Tip**: Start with inference and add explicit types only when you need them. Your IDE will show you what TypeScript infers, helping you learn when inference works well and when you need to be explicit!
