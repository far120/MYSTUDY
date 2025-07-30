# Functions with Types - Making Function Calls Safe 🎯

Functions are the heart of JavaScript, and TypeScript makes them **bulletproof** by adding type safety to parameters, return values, and function signatures. Let's learn how to write functions that catch errors before they happen!

## 🎯 Why Type Functions?

### JavaScript Function Problems:

```javascript
// JavaScript - Dangerous and unpredictable!
function calculateArea(width, height) {
  return width * height;
}

calculateArea(5, 10); // Returns 50 ✅
calculateArea(5); // Returns NaN ❌
calculateArea("5", "10"); // Returns "510" ❌ (string concatenation)
calculateArea(5, 10, 20); // Returns 50 (ignores extra parameter)
calculateArea(); // Returns NaN ❌
```

### TypeScript Function Safety:

```typescript
// TypeScript - Safe and predictable!
function calculateArea(width: number, height: number): number {
  return width * height;
}

calculateArea(5, 10); // Returns 50 ✅
calculateArea(5); // ❌ Error: missing required parameter
calculateArea("5", "10"); // ❌ Error: strings are not numbers
calculateArea(5, 10, 20); // ❌ Error: too many parameters
calculateArea(); // ❌ Error: missing parameters
```

## 🔧 Function Parameter Types

### Basic Parameter Types:

```typescript
// Single parameter
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Multiple parameters
function addNumbers(a: number, b: number): number {
  return a + b;
}

// Mixed parameter types
function createUser(name: string, age: number, isActive: boolean): string {
  return `User: ${name}, Age: ${age}, Active: ${isActive}`;
}

// Real-world examples
function calculateTax(price: number, taxRate: number): number {
  return price * taxRate;
}

function formatCurrency(amount: number, currency: string): string {
  return `${currency}${amount.toFixed(2)}`;
}

function validateEmail(email: string): boolean {
  return email.includes("@") && email.includes(".");
}
```

### Optional Parameters:

```typescript
// Optional parameter with ?
function greetUser(firstName: string, lastName?: string): string {
  if (lastName) {
    return `Hello, ${firstName} ${lastName}!`;
  }
  return `Hello, ${firstName}!`;
}

greetUser("Alice"); // ✅ "Hello, Alice!"
greetUser("Alice", "Johnson"); // ✅ "Hello, Alice Johnson!"

// Multiple optional parameters
function createProduct(
  name: string,
  price: number,
  description?: string,
  category?: string
): object {
  return {
    name,
    price,
    description: description || "No description",
    category: category || "General",
  };
}

// Real-world example: API function
function fetchUser(
  id: number,
  includeProfile?: boolean,
  includePosts?: boolean
): Promise<any> {
  const params = { id };
  if (includeProfile) params.profile = true;
  if (includePosts) params.posts = true;

  return fetch(`/api/users/${id}`, { params });
}
```

### Default Parameters:

```typescript
// Default parameter values
function calculateDiscount(
  price: number,
  discountPercent: number = 10
): number {
  return price * (discountPercent / 100);
}

calculateDiscount(100); // Uses default 10%: returns 10
calculateDiscount(100, 15); // Uses 15%: returns 15

// Multiple defaults
function createConfig(
  host: string = "localhost",
  port: number = 3000,
  secure: boolean = false
): object {
  return { host, port, secure };
}

// Real-world example: Logger function
function log(
  message: string,
  level: string = "info",
  timestamp: boolean = true
): void {
  const time = timestamp ? new Date().toISOString() : "";
  console.log(`[${level.toUpperCase()}] ${time} ${message}`);
}

log("Server started"); // Uses defaults
log("Error occurred", "error"); // Custom level
log("Debug info", "debug", false); // No timestamp
```

### Rest Parameters:

```typescript
// Rest parameters for variable number of arguments
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3); // 6
sum(1, 2, 3, 4, 5); // 15
sum(); // 0

// Mixed parameters with rest
function logMessages(prefix: string, ...messages: string[]): void {
  messages.forEach((message) => {
    console.log(`${prefix}: ${message}`);
  });
}

logMessages("INFO", "Server started", "Database connected");
logMessages("ERROR", "Connection failed");

// Real-world example: Event emitter
function emitEvent(eventName: string, ...args: any[]): void {
  console.log(`Event: ${eventName}, Args:`, args);
  // Emit logic here
}
```

## 📤 Return Types

### Explicit Return Types:

```typescript
// Number return
function multiply(a: number, b: number): number {
  return a * b;
}

// String return
function formatName(first: string, last: string): string {
  return `${first} ${last}`;
}

// Boolean return
function isEven(num: number): boolean {
  return num % 2 === 0;
}

// Object return
function createPoint(x: number, y: number): { x: number; y: number } {
  return { x, y };
}

// Array return
function getEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((num) => num % 2 === 0);
}
```

### Void Return Type:

```typescript
// Functions that don't return anything
function logError(message: string): void {
  console.error(`Error: ${message}`);
}

function saveToDatabase(data: object): void {
  // Save logic here
  console.log("Data saved");
}

function updateUI(): void {
  // UI update logic
  document.title = "Updated!";
}

// Note: void functions can still have return statements
function processData(data: any[]): void {
  if (data.length === 0) {
    return; // Early return is OK
  }

  // Process data
  console.log("Processing complete");
}
```

### Union Return Types:

```typescript
// Function that can return different types
function getById(id: number): string | null {
  if (id > 0) {
    return `User ${id}`;
  }
  return null;
}

// Function with multiple possible return types
function parseInput(input: string): number | string | boolean {
  if (input === "true" || input === "false") {
    return input === "true";
  }

  const num = Number(input);
  if (!isNaN(num)) {
    return num;
  }

  return input;
}

// Real-world example: API response
function processApiResponse(response: any): {
  success: boolean;
  data?: any;
  error?: string;
} {
  if (response.ok) {
    return { success: true, data: response.data };
  }
  return { success: false, error: response.message };
}
```

## 🎭 Function Types

### Function Type Expressions:

```typescript
// Defining a function type
type MathOperation = (a: number, b: number) => number;

// Functions that match this type
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

// Using function types as parameters
function calculate(operation: MathOperation, x: number, y: number): number {
  return operation(x, y);
}

const result = calculate(add, 5, 3); // 8

// Real-world example: Event handlers
type EventHandler = (event: string, data: any) => void;

const logHandler: EventHandler = (event, data) => {
  console.log(`Event: ${event}`, data);
};

const saveHandler: EventHandler = (event, data) => {
  // Save to database
};
```

### Callback Functions:

```typescript
// Function that takes a callback
function processArray(
  numbers: number[],
  callback: (item: number, index: number) => number
): number[] {
  return numbers.map(callback);
}

// Usage
const doubled = processArray([1, 2, 3], (num) => num * 2);
const indexed = processArray([1, 2, 3], (num, index) => num + index);

// Real-world example: Async operations
function fetchData(
  url: string,
  onSuccess: (data: any) => void,
  onError: (error: string) => void
): void {
  fetch(url)
    .then((response) => response.json())
    .then(onSuccess)
    .catch((error) => onError(error.message));
}

// Usage
fetchData(
  "/api/users",
  (data) => console.log("Users:", data),
  (error) => console.error("Failed:", error)
);
```

## 🏭 Arrow Functions with Types

### Basic Arrow Functions:

```typescript
// Traditional function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function equivalent
const add = (a: number, b: number): number => {
  return a + b;
};

// Shorter arrow function
const add = (a: number, b: number): number => a + b;

// Single parameter (parentheses optional)
const square = (x: number): number => x * x;
const greet = (name: string): string => `Hello, ${name}!`;
```

### Arrow Functions in Context:

```typescript
// Array methods with typed arrow functions
const numbers: number[] = [1, 2, 3, 4, 5];

const doubled: number[] = numbers.map((num: number): number => num * 2);
const evens: number[] = numbers.filter((num: number): boolean => num % 2 === 0);
const sum: number = numbers.reduce(
  (acc: number, num: number): number => acc + num,
  0
);

// Event handlers
const handleClick = (event: MouseEvent): void => {
  console.log("Button clicked!", event.target);
};

const handleSubmit = (formData: FormData): Promise<void> => {
  return fetch("/api/submit", {
    method: "POST",
    body: formData,
  }).then(() => console.log("Submitted!"));
};

// Real-world example: API utilities
const apiCall =
  (endpoint: string, method: string = "GET") =>
  (data?: any): Promise<any> => {
    return fetch(`/api/${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
    }).then((response) => response.json());
  };

const getUsers = apiCall("users");
const createUser = apiCall("users", "POST");
```

## 🔄 Function Overloads

Function overloads allow a function to have multiple signatures:

```typescript
// Overload signatures
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: boolean, b: boolean): boolean;

// Implementation signature
function combine(a: any, b: any): any {
  return a + b;
}

// Usage
const str = combine("Hello", "World"); // string
const num = combine(5, 3); // number
const bool = combine(true, false); // boolean

// Real-world example: Element creation
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: "button"): HTMLButtonElement;
function createElement(tag: string): HTMLElement;

function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const div = createElement("div"); // HTMLDivElement
const button = createElement("button"); // HTMLButtonElement
```

## 🏗️ Real-World Function Examples

### E-commerce Functions:

```typescript
// Product interfaces for type safety
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Product functions
function calculateItemTotal(item: CartItem): number {
  return item.product.price * item.quantity;
}

function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + calculateItemTotal(item), 0);
}

function applyDiscount(total: number, discountPercent: number): number {
  return total * (1 - discountPercent / 100);
}

function isProductAvailable(
  product: Product,
  requestedQuantity: number = 1
): boolean {
  return product.inStock && requestedQuantity > 0;
}

function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
}

// Search and filter functions
function searchProducts(
  products: Product[],
  query: string,
  category?: string
): Product[] {
  return products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = !category || product.category === category;
    return matchesQuery && matchesCategory;
  });
}

function sortProducts(
  products: Product[],
  sortBy: "name" | "price" | "category",
  direction: "asc" | "desc" = "asc"
): Product[] {
  return [...products].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "category":
        comparison = a.category.localeCompare(b.category);
        break;
    }

    return direction === "asc" ? comparison : -comparison;
  });
}
```

### User Management Functions:

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  age: number;
  isActive: boolean;
  roles: string[];
}

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return { valid: errors.length === 0, errors };
}

// User utility functions
function getFullName(
  firstName: string,
  lastName: string,
  middleName?: string
): string {
  if (middleName) {
    return `${firstName} ${middleName} ${lastName}`;
  }
  return `${firstName} ${lastName}`;
}

function hasPermission(user: User, requiredRole: string): boolean {
  return user.isActive && user.roles.includes(requiredRole);
}

function getUserAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();

  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Async functions
async function fetchUser(id: number): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

async function createUser(userData: Omit<User, "id">): Promise<User> {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return await response.json();
}
```

## 📝 Practice Exercises

### Exercise 1: Basic Function Typing

Convert these JavaScript functions to TypeScript:

```javascript
// 1. Calculate rectangle area
function calculateRectangleArea(length, width) {
  return length * width;
}

// 2. Format phone number
function formatPhoneNumber(areaCode, exchange, number) {
  return `(${areaCode}) ${exchange}-${number}`;
}

// 3. Check if user is adult
function isAdult(age) {
  return age >= 18;
}

// 4. Get initials from name
function getInitials(firstName, lastName, middleName) {
  if (middleName) {
    return `${firstName[0]}${middleName[0]}${lastName[0]}`;
  }
  return `${firstName[0]}${lastName[0]}`;
}
```

### Exercise 2: Advanced Function Features

Create TypeScript functions with these requirements:

```typescript
// 1. Function that takes variable number of scores and returns average
// Your function here

// 2. Function with overloads for different parameter types
// Your function here

// 3. Function that returns different types based on input
// Your function here

// 4. Async function that handles API calls with error handling
// Your function here
```

### Exercise 3: Function Types

Create type definitions and implementations:

```typescript
// 1. Type for a validation function
// Your type definition here

// 2. Type for an event handler function
// Your type definition here

// 3. Function that takes other functions as parameters
// Your function here
```

## 🐛 Common Mistakes and Solutions

### 1. **Forgetting Return Types**

```typescript
// ❌ Bad - return type unclear
function processData(data: any[]) {
  return data.map((item) => item.id);
}

// ✅ Good - explicit return type
function processData(data: any[]): number[] {
  return data.map((item) => item.id);
}
```

### 2. **Incorrect Optional Parameter Order**

```typescript
// ❌ Bad - required parameter after optional
function createUser(name?: string, age: number) {} // Error!

// ✅ Good - optional parameters last
function createUser(age: number, name?: string) {}

// ✅ Also good - use default values
function createUser(name: string = "Anonymous", age: number) {}
```

### 3. **Overcomplicating Function Types**

```typescript
// ❌ Bad - too complex
function processCallback(
  callback: (
    data: { id: number; name: string; metadata: { [key: string]: any } }[],
    options: { sort: boolean; filter: string | null; transform: boolean }
  ) => { result: any[]; success: boolean; error?: string }
): void {
  // Complex function signature is hard to read and maintain
}

// ✅ Good - use interfaces
interface DataItem {
  id: number;
  name: string;
  metadata: { [key: string]: any };
}

interface ProcessOptions {
  sort: boolean;
  filter: string | null;
  transform: boolean;
}

interface ProcessResult {
  result: any[];
  success: boolean;
  error?: string;
}

type ProcessCallback = (
  data: DataItem[],
  options: ProcessOptions
) => ProcessResult;

function processCallback(callback: ProcessCallback): void {
  // Much clearer!
}
```

## 🎯 Best Practices

### 1. **Always Type Function Parameters**

```typescript
// ✅ Always specify parameter types
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

### 2. **Be Explicit with Return Types for Public Functions**

```typescript
// ✅ Explicit return types for important functions
export function calculateTax(price: number, rate: number): number {
  return price * rate;
}
```

### 3. **Use Function Overloads Sparingly**

```typescript
// ✅ Good use case - different return types
function getValue(key: "count"): number;
function getValue(key: "name"): string;
function getValue(key: string): any {
  // Implementation
}

// ❌ Avoid overloads when union types work better
function processInput(input: string | number): string {
  return String(input);
}
```

### 4. **Prefer Specific Types Over `any`**

```typescript
// ❌ Too generic
function processApiResponse(response: any): any {
  return response.data;
}

// ✅ More specific
function processApiResponse(response: { data: any; status: number }): any {
  return response.data;
}
```

## 🌟 Key Takeaways

- **Parameter types** prevent wrong arguments from being passed
- **Return types** ensure functions return expected values
- **Optional parameters** make functions flexible
- **Default parameters** provide sensible fallbacks
- **Rest parameters** handle variable arguments
- **Function types** enable higher-order functions
- **Arrow functions** provide concise syntax with full type support

## 🚀 What's Next?

Now that you've mastered function typing, we'll explore **Arrays and Objects** in depth - learning how to type complex data structures, nested objects, and array operations safely.

Remember: Well-typed functions are self-documenting and catch errors before they reach production!

---

💡 **Pro Tip**: Start by typing the most important functions in your codebase - the ones that handle user input, API calls, and business logic. These are where type safety provides the most value!
