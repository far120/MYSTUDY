# Union Types - Multiple Types, One Variable 🔗

Union types are one of TypeScript's most powerful features, allowing a variable to be **one of several types**. This provides flexibility while maintaining type safety - perfect for handling real-world scenarios where data can come in different forms.

## 🎯 What are Union Types?

A union type describes a value that can be **one of several types**. You create union types using the pipe (`|`) operator.

### Basic Concept:

```typescript
// JavaScript - No type safety
let id = 123; // Could be number
id = "abc-123"; // Or string
id = { uuid: "..." }; // Or object
// No way to know what's valid!

// TypeScript with Union Types - Safe and flexible
let id: number | string = 123; // Can be number OR string
id = "abc-123"; // ✅ OK - string is allowed
id = { uuid: "..." }; // ❌ Error - object not allowed

// Type safety is maintained
if (typeof id === "string") {
  console.log(id.toUpperCase()); // ✅ Safe - TypeScript knows it's string
} else {
  console.log(id * 2); // ✅ Safe - TypeScript knows it's number
}
```

## 🔀 Basic Union Types

### Simple Union Types:

```typescript
// Primitive union types
let status: "pending" | "approved" | "rejected";
let count: number | null;
let message: string | undefined;
let active: boolean | "unknown";

// Examples
status = "pending"; // ✅ OK
status = "approved"; // ✅ OK
status = "cancelled"; // ❌ Error - not in union

count = 42; // ✅ OK
count = null; // ✅ OK
count = undefined; // ❌ Error - undefined not in union

// Real-world examples
let userId: number | string; // Database ID could be either
let response: object | null; // API might return null
let theme: "light" | "dark" | "auto"; // Specific theme options
```

### Union with Arrays:

```typescript
// Array of different types
let data: (string | number)[] = ["Alice", 25, "Bob", 30];
let mixed: (boolean | string)[] = [true, "yes", false, "no"];

// Arrays that can be different types
let searchResults: string[] | null = null; // No results yet
let userList: User[] | "loading" = "loading"; // Loading state

// Working with array unions
function processData(input: string[] | number[]): void {
  input.forEach((item) => {
    if (typeof item === "string") {
      console.log(item.toUpperCase());
    } else {
      console.log(item * 2);
    }
  });
}
```

### Union with Objects:

```typescript
// Object unions
type PaymentMethod =
  | {
      type: "credit_card";
      cardNumber: string;
      expiryDate: string;
    }
  | {
      type: "paypal";
      email: string;
    }
  | {
      type: "bank_transfer";
      accountNumber: string;
      routingNumber: string;
    };

// Usage
function processPayment(method: PaymentMethod): void {
  switch (method.type) {
    case "credit_card":
      console.log(`Processing card: ${method.cardNumber}`);
      break;
    case "paypal":
      console.log(`Processing PayPal: ${method.email}`);
      break;
    case "bank_transfer":
      console.log(`Processing transfer: ${method.accountNumber}`);
      break;
  }
}
```

## 🔍 Type Guards and Narrowing

Type guards help TypeScript understand which specific type you're working with in a union.

### typeof Type Guards:

```typescript
function processId(id: number | string): string {
  if (typeof id === "string") {
    // TypeScript knows id is string here
    return id.toUpperCase();
  } else {
    // TypeScript knows id is number here
    return id.toString();
  }
}

function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return `"${value}"`; // String methods available
  } else if (typeof value === "number") {
    return value.toFixed(2); // Number methods available
  } else {
    return value ? "true" : "false"; // Boolean logic
  }
}
```

### instanceof Type Guards:

```typescript
class Cat {
  meow(): void {
    console.log("Meow!");
  }
}

class Dog {
  bark(): void {
    console.log("Woof!");
  }
}

function makeSound(animal: Cat | Dog): void {
  if (animal instanceof Cat) {
    animal.meow(); // Cat methods available
  } else {
    animal.bark(); // Dog methods available
  }
}

// Real-world example with built-in types
function handleError(error: Error | string): void {
  if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
    console.log(`Stack: ${error.stack}`);
  } else {
    console.log(`Error: ${error}`);
  }
}
```

### in Operator Type Guards:

```typescript
interface Car {
  drive(): void;
  wheels: number;
}

interface Boat {
  sail(): void;
  hasEngine: boolean;
}

function operateVehicle(vehicle: Car | Boat): void {
  if ("drive" in vehicle) {
    vehicle.drive(); // Car methods available
    console.log(`Has ${vehicle.wheels} wheels`);
  } else {
    vehicle.sail(); // Boat methods available
    console.log(`Engine: ${vehicle.hasEngine}`);
  }
}

// Complex object type guards
interface ApiSuccessResponse {
  success: true;
  data: any;
}

interface ApiErrorResponse {
  success: false;
  error: string;
  code: number;
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

function handleApiResponse(response: ApiResponse): void {
  if ("error" in response) {
    console.log(`Error ${response.code}: ${response.error}`);
  } else {
    console.log("Success:", response.data);
  }
}
```

### Custom Type Guards:

```typescript
// User-defined type guard functions
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  );
}

// Usage
function processInput(input: unknown): void {
  if (isString(input)) {
    console.log(input.toUpperCase()); // TypeScript knows it's string
  } else if (isNumber(input)) {
    console.log(input * 2); // TypeScript knows it's number
  }
}

function handleUserData(data: unknown): void {
  if (isUser(data)) {
    console.log(`User: ${data.name}`); // TypeScript knows it's User
    console.log(`Email: ${data.email}`);
  } else {
    console.log("Invalid user data");
  }
}
```

## 🎨 Advanced Union Patterns

### Discriminated Unions:

```typescript
// Shape example with discriminated unions
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      // Exhaustive check - ensures all cases are handled
      const exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape: ${exhaustiveCheck}`);
  }
}

// Usage
const circle: Circle = { kind: "circle", radius: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 10, height: 8 };
const triangle: Triangle = { kind: "triangle", base: 6, height: 4 };

console.log(calculateArea(circle)); // 78.54
console.log(calculateArea(rectangle)); // 80
console.log(calculateArea(triangle)); // 12
```

### State Machine Pattern:

```typescript
// Loading states with discriminated unions
interface LoadingState {
  status: "loading";
  progress?: number;
}

interface SuccessState {
  status: "success";
  data: any;
  timestamp: number;
}

interface ErrorState {
  status: "error";
  error: string;
  retryCount: number;
}

interface IdleState {
  status: "idle";
}

type AppState = LoadingState | SuccessState | ErrorState | IdleState;

function renderComponent(state: AppState): string {
  switch (state.status) {
    case "idle":
      return "<div>Ready to start</div>";

    case "loading":
      const progress = state.progress || 0;
      return `<div>Loading... ${progress}%</div>`;

    case "success":
      return `<div>Success! Data loaded at ${new Date(state.timestamp)}</div>`;

    case "error":
      return `<div>Error: ${state.error} (Retry ${state.retryCount})</div>`;

    default:
      const exhaustiveCheck: never = state;
      throw new Error(`Unhandled state: ${exhaustiveCheck}`);
  }
}
```

### Event System with Unions:

```typescript
// Event system using discriminated unions
interface UserLoginEvent {
  type: "user_login";
  userId: number;
  timestamp: number;
  method: "email" | "social" | "phone";
}

interface UserLogoutEvent {
  type: "user_logout";
  userId: number;
  timestamp: number;
  reason: "manual" | "timeout" | "forced";
}

interface ProductViewEvent {
  type: "product_view";
  userId: number;
  productId: number;
  timestamp: number;
  source: "search" | "category" | "recommendation";
}

interface PurchaseEvent {
  type: "purchase";
  userId: number;
  orderId: number;
  amount: number;
  timestamp: number;
  items: Array<{ productId: number; quantity: number }>;
}

type AnalyticsEvent =
  | UserLoginEvent
  | UserLogoutEvent
  | ProductViewEvent
  | PurchaseEvent;

// Event handler
function trackEvent(event: AnalyticsEvent): void {
  // Common logging
  console.log(`Event: ${event.type} at ${new Date(event.timestamp)}`);

  // Specific handling
  switch (event.type) {
    case "user_login":
      console.log(`User ${event.userId} logged in via ${event.method}`);
      updateUserLastSeen(event.userId);
      break;

    case "user_logout":
      console.log(`User ${event.userId} logged out (${event.reason})`);
      break;

    case "product_view":
      console.log(`User ${event.userId} viewed product ${event.productId}`);
      updateRecommendations(event.userId, event.productId);
      break;

    case "purchase":
      console.log(
        `User ${event.userId} purchased order ${event.orderId} for $${event.amount}`
      );
      processOrder(event.orderId);
      updateLoyaltyPoints(event.userId, event.amount);
      break;
  }
}

// Helper functions (implementation not shown)
declare function updateUserLastSeen(userId: number): void;
declare function updateRecommendations(userId: number, productId: number): void;
declare function processOrder(orderId: number): void;
declare function updateLoyaltyPoints(userId: number, amount: number): void;
```

## 🏗️ Real-World Union Type Examples

### API Response Handling:

```typescript
// Generic API response types
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message: string;
}

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Specific response types
type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;
type LoginResponse = ApiResponse<{ token: string; user: User }>;

// API client functions
async function fetchUser(id: number): Promise<UserResponse> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// Response handling
async function handleLogin(
  email: string,
  password: string
): Promise<User | null> {
  const result = await login(email, password);

  if (result.success) {
    localStorage.setItem("token", result.data.token);
    return result.data.user;
  } else {
    console.error(`Login failed: ${result.error.message}`);
    return null;
  }
}
```

### Form Validation:

```typescript
// Field validation results
interface ValidField {
  valid: true;
  value: string;
}

interface InvalidField {
  valid: false;
  value: string;
  errors: string[];
}

type FieldValidation = ValidField | InvalidField;

// Form validation
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
}

interface ValidationResult {
  [key: string]: FieldValidation;
}

function validateForm(data: FormData): ValidationResult {
  const result: ValidationResult = {};

  // Email validation
  const emailErrors: string[] = [];
  if (!data.email) emailErrors.push("Email is required");
  if (!data.email.includes("@")) emailErrors.push("Invalid email format");

  result.email =
    emailErrors.length === 0
      ? { valid: true, value: data.email }
      : { valid: false, value: data.email, errors: emailErrors };

  // Password validation
  const passwordErrors: string[] = [];
  if (!data.password) passwordErrors.push("Password is required");
  if (data.password.length < 8)
    passwordErrors.push("Password must be at least 8 characters");

  result.password =
    passwordErrors.length === 0
      ? { valid: true, value: data.password }
      : { valid: false, value: data.password, errors: passwordErrors };

  // Confirm password validation
  const confirmErrors: string[] = [];
  if (data.password !== data.confirmPassword)
    confirmErrors.push("Passwords do not match");

  result.confirmPassword =
    confirmErrors.length === 0
      ? { valid: true, value: data.confirmPassword }
      : { valid: false, value: data.confirmPassword, errors: confirmErrors };

  // Age validation
  const ageErrors: string[] = [];
  const ageNum = parseInt(data.age);
  if (isNaN(ageNum)) ageErrors.push("Age must be a number");
  if (ageNum < 18) ageErrors.push("Must be 18 or older");

  result.age =
    ageErrors.length === 0
      ? { valid: true, value: data.age }
      : { valid: false, value: data.age, errors: ageErrors };

  return result;
}

// Using validation results
function handleFormSubmit(data: FormData): boolean {
  const validation = validateForm(data);

  // Check if all fields are valid
  const isFormValid = Object.values(validation).every((field) => field.valid);

  if (isFormValid) {
    console.log("Form is valid, submitting...");
    return true;
  } else {
    // Display errors
    Object.entries(validation).forEach(([fieldName, fieldResult]) => {
      if (!fieldResult.valid) {
        console.log(`${fieldName} errors:`, fieldResult.errors);
      }
    });
    return false;
  }
}
```

### Database Query Results:

```typescript
// Database operation results
interface QuerySuccess<T> {
  success: true;
  data: T;
  rowCount: number;
  executionTime: number;
}

interface QueryError {
  success: false;
  error: string;
  sqlState?: string;
  executionTime: number;
}

type QueryResult<T> = QuerySuccess<T> | QueryError;

// Database operations
async function findUserById(id: number): Promise<QueryResult<User | null>> {
  try {
    const startTime = Date.now();
    // Simulate database query
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const executionTime = Date.now() - startTime;

    return {
      success: true,
      data: user,
      rowCount: user ? 1 : 0,
      executionTime,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      sqlState: error.code,
      executionTime: Date.now() - startTime,
    };
  }
}

async function findUsers(filters: UserFilters): Promise<QueryResult<User[]>> {
  try {
    const startTime = Date.now();
    const users = await db.query("SELECT * FROM users WHERE ...", []);
    const executionTime = Date.now() - startTime;

    return {
      success: true,
      data: users,
      rowCount: users.length,
      executionTime,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      executionTime: Date.now() - startTime,
    };
  }
}

// Usage
async function getUserProfile(id: number): Promise<User | null> {
  const result = await findUserById(id);

  if (result.success) {
    console.log(`Query executed in ${result.executionTime}ms`);
    return result.data;
  } else {
    console.error(`Database error: ${result.error}`);
    if (result.sqlState) {
      console.error(`SQL State: ${result.sqlState}`);
    }
    return null;
  }
}
```

## 📝 Practice Exercises

### Exercise 1: Basic Union Types

Create union types for these scenarios:

```typescript
// 1. Theme setting that can be "light", "dark", or "auto"
// Your type definition here

// 2. ID that can be either a number or a string
// Your type definition here

// 3. API response that can be data or an error message
// Your type definition here

// 4. Function that accepts string or number and returns formatted string
// Your function here
```

### Exercise 2: Discriminated Unions

Create a notification system using discriminated unions:

```typescript
// Create types for:
// 1. Email notification with recipient and subject
// 2. SMS notification with phone number and message
// 3. Push notification with title, body, and icon
// 4. In-app notification with user ID and content

// Then create a function that processes any notification type
```

### Exercise 3: Type Guards

Create type guards for these scenarios:

```typescript
// 1. Type guard to check if a value is a valid user object
// 2. Type guard to distinguish between different payment methods
// 3. Type guard for API response success/error
// 4. Custom type guard for form validation results
```

## 🐛 Common Union Type Mistakes

### 1. **Not Using Type Guards**

```typescript
// ❌ Bad - no type narrowing
function processValue(value: string | number): string {
  return value.toUpperCase(); // Error: toUpperCase doesn't exist on number
}

// ✅ Good - use type guards
function processValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toString();
  }
}
```

### 2. **Overly Complex Unions**

```typescript
// ❌ Bad - too many options, hard to work with
type Status =
  | "loading"
  | "success"
  | "error"
  | "idle"
  | "pending"
  | "retrying"
  | "cancelled"
  | "timeout";

// ✅ Better - use discriminated unions
type Status =
  | { state: "loading"; progress?: number }
  | { state: "success"; data: any }
  | { state: "error"; error: string; retryable: boolean }
  | { state: "idle" };
```

### 3. **Missing Exhaustive Checks**

```typescript
// ❌ Bad - might miss cases
function handleStatus(status: "loading" | "success" | "error"): string {
  switch (status) {
    case "loading":
      return "Loading...";
    case "success":
      return "Done!";
    // Missing error case!
  }
}

// ✅ Good - exhaustive check
function handleStatus(status: "loading" | "success" | "error"): string {
  switch (status) {
    case "loading":
      return "Loading...";
    case "success":
      return "Done!";
    case "error":
      return "Error occurred";
    default:
      const exhaustiveCheck: never = status;
      throw new Error(`Unhandled status: ${exhaustiveCheck}`);
  }
}
```

## 🎯 Best Practices

### 1. **Use Discriminated Unions for Complex Types**

```typescript
// ✅ Clear, type-safe, and easy to work with
interface LoadingState {
  status: "loading";
}
interface SuccessState {
  status: "success";
  data: any;
}
interface ErrorState {
  status: "error";
  message: string;
}

type AppState = LoadingState | SuccessState | ErrorState;
```

### 2. **Prefer Specific Types Over Broad Unions**

```typescript
// ❌ Too broad
let status: string = "pending";

// ✅ Specific and safe
let status: "pending" | "approved" | "rejected" = "pending";
```

### 3. **Use Type Guards for Complex Logic**

```typescript
// ✅ Custom type guards for complex scenarios
function isErrorResponse(response: ApiResponse): response is ApiErrorResponse {
  return !response.success;
}

if (isErrorResponse(response)) {
  // TypeScript knows this is an error response
  console.log(response.error.message);
}
```

### 4. **Document Union Types**

```typescript
// ✅ Well-documented union types
/**
 * Represents the current state of a file upload
 * - "idle": No upload in progress
 * - "uploading": File is currently being uploaded
 * - "success": Upload completed successfully
 * - "error": Upload failed
 */
type UploadStatus = "idle" | "uploading" | "success" | "error";
```

## 🌟 Key Takeaways

- **Union types** provide flexibility while maintaining type safety
- **Type guards** help narrow unions to specific types
- **Discriminated unions** are perfect for state machines and complex objects
- **Exhaustive checking** ensures all cases are handled
- **Custom type guards** enable complex type checking logic
- **Never type** helps catch unhandled cases at compile time

## 🚀 What's Next?

Now that you've mastered union types, we'll explore **Interfaces** - learning how to define clear contracts for object shapes, extend interfaces, and create reusable type definitions that make your code more maintainable.

Remember: Union types are about flexibility with safety - they let you handle multiple possibilities while keeping TypeScript's type checking benefits!

---

💡 **Pro Tip**: When designing union types, think about how you'll distinguish between the different possibilities. Discriminated unions with a common property (like `type` or `kind`) make type narrowing much easier!
