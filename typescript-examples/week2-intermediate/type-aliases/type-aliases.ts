/**
 * Week 2 - Type Aliases Examples
 * Create custom types for better code organization and reusability
 */

console.log('🏷️ Week 2: Type Aliases Examples\n');

// ======================================
// 1. BASIC TYPE ALIASES
// ======================================

console.log('1. Basic Type Aliases:');

// Simple type aliases
type UserID = number;
type UserName = string;
type EmailAddress = string;

// Using the aliases
const userId: UserID = 12345;
const userName: UserName = 'Alice Johnson';
const email: EmailAddress = 'alice@example.com';

console.log(`User: ${userName} (ID: ${userId}, Email: ${email})`);

// Function using type aliases
function createUserAccount(id: UserID, name: UserName, email: EmailAddress): void {
  console.log(`Creating account for ${name} with ID ${id}`);
}

createUserAccount(67890, 'Bob Smith', 'bob@example.com');

// ======================================
// 2. UNION TYPES
// ======================================

console.log('\n2. Union Types:');

// Union type alias
type Status = 'pending' | 'approved' | 'rejected';
type Theme = 'light' | 'dark' | 'auto';
type Size = 'small' | 'medium' | 'large' | 'extra-large';

// Using union types
function setApplicationStatus(status: Status): void {
  console.log(`Application status set to: ${status}`);
}

function applyTheme(theme: Theme): void {
  console.log(`Applying ${theme} theme`);
}

setApplicationStatus('approved');
setApplicationStatus('pending');
applyTheme('dark');

// Type with mixed unions
type StringOrNumber = string | number;
type BooleanOrNull = boolean | null;

const value1: StringOrNumber = 'hello';
const value2: StringOrNumber = 42;
const flag: BooleanOrNull = true;
const nullFlag: BooleanOrNull = null;

console.log('String or number values:', value1, value2);
console.log('Boolean or null values:', flag, nullFlag);

// ======================================
// 3. OBJECT TYPE ALIASES
// ======================================

console.log('\n3. Object Type Aliases:');

type User = {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  lastLogin?: Date; // Optional property
};

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type UserWithAddress = User & Address; // Intersection type

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  isActive: true
};

const userWithAddress: UserWithAddress = {
  id: 2,
  name: 'Jane Smith',
  email: 'jane@example.com',
  isActive: true,
  street: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zipCode: '12345',
  country: 'USA'
};

console.log('User:', user);
console.log('User with address:', userWithAddress);

// ======================================
// 4. FUNCTION TYPE ALIASES
// ======================================

console.log('\n4. Function Type Aliases:');

// Function type aliases
type MathOperation = (a: number, b: number) => number;
type StringFormatter = (input: string) => string;
type EventHandler<T> = (event: T) => void;

// Implementing the function types
const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

const uppercase: StringFormatter = (input) => input.toUpperCase();
const removeSpaces: StringFormatter = (input) => input.replace(/\s/g, '');

const clickHandler: EventHandler<string> = (buttonId) => {
  console.log(`Button ${buttonId} was clicked`);
};

console.log('add(5, 3):', add(5, 3));
console.log('multiply(4, 6):', multiply(4, 6));
console.log('uppercase("hello"):', uppercase('hello'));
console.log('removeSpaces("hello world"):', removeSpaces('hello world'));
clickHandler('submit-btn');

// ======================================
// 5. ARRAY TYPE ALIASES
// ======================================

console.log('\n5. Array Type Aliases:');

type NumberList = number[];
type StringList = string[];
type UserList = User[];

// Mixed array types
type MixedData = (string | number | boolean)[];
type TodoItem = { id: number; text: string; completed: boolean };
type TodoList = TodoItem[];

const scores: NumberList = [95, 87, 92, 78];
const names: StringList = ['Alice', 'Bob', 'Charlie'];
const users: UserList = [user, { id: 3, name: 'David', email: 'david@example.com', isActive: false }];

const mixed: MixedData = ['hello', 42, true, 'world', 100, false];

const todos: TodoList = [
  { id: 1, text: 'Learn TypeScript', completed: true },
  { id: 2, text: 'Build a project', completed: false },
  { id: 3, text: 'Deploy to production', completed: false }
];

console.log('Scores:', scores);
console.log('Names:', names);
console.log('Users count:', users.length);
console.log('Mixed data:', mixed);
console.log('Todos:', todos);

// ======================================
// 6. GENERIC TYPE ALIASES
// ======================================

console.log('\n6. Generic Type Aliases:');

// Generic type aliases
type Result<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type Pair<T, U> = {
  first: T;
  second: U;
};

type KeyValuePair<T> = {
  [key: string]: T;
};

// Using generic types
const stringResult: Result<string> = {
  success: true,
  data: 'Operation completed successfully'
};

const numberResult: Result<number> = {
  success: false,
  error: 'Invalid input provided'
};

const coordinates: Pair<number, number> = {
  first: 10,
  second: 20
};

const nameAge: Pair<string, number> = {
  first: 'Alice',
  second: 30
};

const settings: KeyValuePair<string> = {
  theme: 'dark',
  language: 'en',
  timezone: 'UTC'
};

const counters: KeyValuePair<number> = {
  visitors: 1000,
  pageViews: 5000,
  downloads: 250
};

console.log('String result:', stringResult);
console.log('Number result:', numberResult);
console.log('Coordinates:', coordinates);
console.log('Name and age:', nameAge);
console.log('Settings:', settings);
console.log('Counters:', counters);

// ======================================
// 7. CONDITIONAL TYPE ALIASES
// ======================================

console.log('\n7. Conditional Type Aliases:');

// Conditional type example
type NonNullable<T> = T extends null | undefined ? never : T;
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type SafeString = NonNullable<string | null>; // string
type SafeNumber = NonNullable<number | undefined>; // number

type NumberFromArray = ArrayElement<number[]>; // number
type StringFromArray = ArrayElement<string[]>; // string

const safeStr: SafeString = 'hello'; // null and undefined are excluded
const safeNum: SafeNumber = 42;

console.log('Safe string:', safeStr);
console.log('Safe number:', safeNum);

// ======================================
// 8. MAPPED TYPE ALIASES
// ======================================

console.log('\n8. Mapped Type Aliases:');

// Mapped type examples
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type OptionalProduct = Optional<Product>; // All properties become optional
type ReadOnlyProduct = ReadOnly<Product>; // All properties become readonly

const partialProduct: OptionalProduct = {
  name: 'Smartphone'
  // id, price, and category are optional
};

const immutableProduct: ReadOnlyProduct = {
  id: 1,
  name: 'Laptop',
  price: 999,
  category: 'Electronics'
};

console.log('Partial product:', partialProduct);
console.log('Immutable product:', immutableProduct);

// This would cause an error:
// immutableProduct.price = 1200; // ❌ Cannot assign to readonly property

// ======================================
// 9. PRACTICAL EXAMPLE - API CLIENT
// ======================================

console.log('\n9. Practical Example - API Client:');

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ContentType = 'application/json' | 'application/xml' | 'text/plain';

type ApiRequest = {
  url: string;
  method: HttpMethod;
  headers?: { [key: string]: string };
  body?: any;
};

type ApiResponse<T> = {
  status: number;
  statusText: string;
  data: T;
  headers: { [key: string]: string };
};

type ApiClient = {
  get<T>(url: string): Promise<ApiResponse<T>>;
  post<T>(url: string, data: any): Promise<ApiResponse<T>>;
  put<T>(url: string, data: any): Promise<ApiResponse<T>>;
  delete<T>(url: string): Promise<ApiResponse<T>>;
};

// Mock implementation
const apiClient: ApiClient = {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    console.log(`GET request to ${url}`);
    return {
      status: 200,
      statusText: 'OK',
      data: {} as T,
      headers: { 'content-type': 'application/json' }
    };
  },

  async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    console.log(`POST request to ${url} with data:`, data);
    return {
      status: 201,
      statusText: 'Created',
      data: {} as T,
      headers: { 'content-type': 'application/json' }
    };
  },

  async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
    console.log(`PUT request to ${url} with data:`, data);
    return {
      status: 200,
      statusText: 'OK',
      data: {} as T,
      headers: { 'content-type': 'application/json' }
    };
  },

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    console.log(`DELETE request to ${url}`);
    return {
      status: 204,
      statusText: 'No Content',
      data: {} as T,
      headers: {}
    };
  }
};

// Usage
async function demonstrateApiClient() {
  const getUserResponse = await apiClient.get<User>('/api/users/1');
  console.log('Get user response status:', getUserResponse.status);

  const createUserResponse = await apiClient.post<User>('/api/users', {
    name: 'New User',
    email: 'new@example.com'
  });
  console.log('Create user response status:', createUserResponse.status);
}

demonstrateApiClient();

console.log('\n✅ Type Aliases Examples Complete!');
console.log('Next: Explore optional properties and advanced type features!');