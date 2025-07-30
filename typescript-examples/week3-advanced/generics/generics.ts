/**
 * Week 3 - Generics Examples
 * Master reusable, flexible types that work with multiple data types
 */

console.log('🔄 Week 3: Generics Examples\n');

// ======================================
// 1. BASIC GENERICS
// ======================================

console.log('1. Basic Generics:');

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Usage with different types
const stringResult = identity<string>('hello');
const numberResult = identity<number>(42);
const booleanResult = identity<boolean>(true);

// Type inference (TypeScript figures out the type)
const inferredString = identity('world'); // TypeScript infers string
const inferredNumber = identity(100);     // TypeScript infers number

console.log('String identity:', stringResult);
console.log('Number identity:', numberResult);
console.log('Boolean identity:', booleanResult);
console.log('Inferred string:', inferredString);
console.log('Inferred number:', inferredNumber);

// ======================================
// 2. GENERIC FUNCTIONS
// ======================================

console.log('\n2. Generic Functions:');

// Generic function to get first element of array
function getFirstElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

const numbers = [1, 2, 3, 4, 5];
const strings = ['apple', 'banana', 'cherry'];
const booleans = [true, false, true];

console.log('First number:', getFirstElement(numbers));
console.log('First string:', getFirstElement(strings));
console.log('First boolean:', getFirstElement(booleans));

// Generic function with multiple type parameters
function pair<T, U>(first: T, second: U): { first: T; second: U } {
  return { first, second };
}

const stringNumberPair = pair('hello', 42);
const numberBooleanPair = pair(100, true);
const stringStringPair = pair('key', 'value');

console.log('String-Number pair:', stringNumberPair);
console.log('Number-Boolean pair:', numberBooleanPair);
console.log('String-String pair:', stringStringPair);

// ======================================
// 3. GENERIC INTERFACES
// ======================================

console.log('\n3. Generic Interfaces:');

// Generic interface for API responses
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

// Generic interface for repository pattern
interface Repository<T> {
  findById(id: number): T | undefined;
  findAll(): T[];
  create(item: Omit<T, 'id'>): T;
  update(id: number, item: Partial<T>): T | undefined;
  delete(id: number): boolean;
}

// User type for demonstration
type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

// Product type for demonstration
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

// Implementation of generic repository
class InMemoryRepository<T extends { id: number }> implements Repository<T> {
  private items: T[] = [];
  private nextId = 1;

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  findAll(): T[] {
    return [...this.items];
  }

  create(item: Omit<T, 'id'>): T {
    const newItem = { ...item, id: this.nextId++ } as T;
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, item: Partial<T>): T | undefined {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return undefined;
    
    this.items[index] = { ...this.items[index], ...item };
    return this.items[index];
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    this.items.splice(index, 1);
    return true;
  }
}

// Usage with different types
const userRepository = new InMemoryRepository<User>();
const productRepository = new InMemoryRepository<Product>();

const user1 = userRepository.create({
  name: 'Alice Johnson',
  email: 'alice@example.com',
  age: 28
});

const product1 = productRepository.create({
  name: 'Laptop',
  price: 999,
  category: 'Electronics'
});

console.log('Created user:', user1);
console.log('Created product:', product1);

// ======================================
// 4. GENERIC CLASSES
// ======================================

console.log('\n4. Generic Classes:');

// Generic Stack class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }
}

// Usage with different types
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

const stringStack = new Stack<string>();
stringStack.push('first');
stringStack.push('second');
stringStack.push('third');

console.log('Number stack:', numberStack.toArray());
console.log('String stack:', stringStack.toArray());
console.log('Number stack pop:', numberStack.pop());
console.log('String stack peek:', stringStack.peek());

// ======================================
// 5. CONSTRAINED GENERICS
// ======================================

console.log('\n5. Constrained Generics:');

// Generic constraint - T must have a length property
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): T {
  console.log(`Item has length: ${item.length}`);
  return item;
}

// These work because they have length property
logLength('hello world');
logLength([1, 2, 3, 4, 5]);
logLength({ length: 10, value: 'test' });

// This would cause an error:
// logLength(42); // ❌ number doesn't have length property

// Generic constraint with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: 'John', age: 30, email: 'john@example.com' };

const name = getProperty(person, 'name');     // string
const age = getProperty(person, 'age');       // number
const email = getProperty(person, 'email');   // string

console.log('Name:', name);
console.log('Age:', age);
console.log('Email:', email);

// This would cause an error:
// const invalid = getProperty(person, 'height'); // ❌ 'height' doesn't exist on person

// ======================================
// 6. GENERIC UTILITY TYPES
// ======================================

console.log('\n6. Generic Utility Types:');

type UserForCreation = Omit<User, 'id'>; // Remove 'id' property
type PartialUser = Partial<User>;         // Make all properties optional
type RequiredUser = Required<User>;       // Make all properties required
type UserNameOnly = Pick<User, 'name'>;   // Pick only 'name' property

const newUser: UserForCreation = {
  name: 'Bob Smith',
  email: 'bob@example.com',
  age: 35
};

const partialUpdate: PartialUser = {
  age: 36 // Only updating age
};

const nameOnly: UserNameOnly = {
  name: 'Charlie Brown'
};

console.log('New user (no ID):', newUser);
console.log('Partial update:', partialUpdate);
console.log('Name only:', nameOnly);

// Record utility type
type Theme = 'light' | 'dark' | 'auto';
type ThemeConfig = Record<Theme, { background: string; text: string }>;

const themeConfig: ThemeConfig = {
  light: { background: '#ffffff', text: '#000000' },
  dark: { background: '#000000', text: '#ffffff' },
  auto: { background: '#f0f0f0', text: '#333333' }
};

console.log('Theme config:', themeConfig);

// ======================================
// 7. CONDITIONAL TYPES
// ======================================

console.log('\n7. Conditional Types:');

// Conditional type that extracts array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArrayElement = ArrayElement<string[]>; // string
type NumberArrayElement = ArrayElement<number[]>; // number

// Conditional type for function return types
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getString(): string { return 'hello'; }
function getNumber(): number { return 42; }

type StringReturn = ReturnType<typeof getString>; // string
type NumberReturn = ReturnType<typeof getNumber>; // number

console.log('Conditional types help extract types from complex structures');

// ======================================
// 8. MAPPED TYPES WITH GENERICS
// ======================================

console.log('\n8. Mapped Types with Generics:');

// Generic mapped type that makes properties optional
type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Generic mapped type that makes properties nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type UserWithOptionalEmail = MakeOptional<User, 'email'>;
type NullableUser = Nullable<User>;

const userWithOptionalEmail: UserWithOptionalEmail = {
  id: 1,
  name: 'David Wilson',
  age: 25
  // email is optional
};

const nullableUser: NullableUser = {
  id: 2,
  name: null, // Can be null
  email: 'test@example.com',
  age: null   // Can be null
};

console.log('User with optional email:', userWithOptionalEmail);
console.log('Nullable user:', nullableUser);

// ======================================
// 9. PRACTICAL EXAMPLE - GENERIC CACHE
// ======================================

console.log('\n9. Practical Example - Generic Cache:');

class Cache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      // Remove oldest entry (first entry in Map)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get(key: K): V | undefined {
    return this.cache.get(key);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  keys(): K[] {
    return Array.from(this.cache.keys());
  }

  values(): V[] {
    return Array.from(this.cache.values());
  }
}

// Usage with different key-value types
const stringCache = new Cache<string, User>(5);
const numberCache = new Cache<number, Product>(10);

stringCache.set('user1', { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 });
stringCache.set('user2', { id: 2, name: 'Bob', email: 'bob@example.com', age: 25 });

numberCache.set(1, { id: 1, name: 'Laptop', price: 999, category: 'Electronics' });
numberCache.set(2, { id: 2, name: 'Mouse', price: 25, category: 'Accessories' });

console.log('String cache size:', stringCache.size());
console.log('Cached user1:', stringCache.get('user1'));
console.log('Number cache keys:', numberCache.keys());
console.log('Cached product:', numberCache.get(1));

console.log('\n✅ Generics Examples Complete!');
console.log('🎉 You now understand how to create flexible, reusable types!');
console.log('Next: Explore classes and advanced object-oriented patterns!');