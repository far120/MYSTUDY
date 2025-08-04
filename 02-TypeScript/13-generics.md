# Generics - Write Flexible, Reusable Code 🔄

**Master Type Parameters!** Generics allow you to write flexible, reusable code that works with multiple types while maintaining type safety. Learn how to create generic functions, classes, and interfaces that adapt to any type you need.

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand generic type parameters and constraints
- Create generic functions, classes, and interfaces
- Use generic utility types and conditional types
- Build flexible, type-safe data structures
- Master advanced generic patterns for real-world applications

---

## 🤔 Why Generics Matter

Generics solve the problem of writing code that works with multiple types without sacrificing type safety.

### The Problem: Repetitive Code or Lost Type Safety

```typescript
// Without generics - repetitive code
function getFirstString(items: string[]): string | undefined {
    return items.length > 0 ? items[0] : undefined;
}

function getFirstNumber(items: number[]): number | undefined {
    return items.length > 0 ? items[0] : undefined;
}

function getFirstBoolean(items: boolean[]): boolean | undefined {
    return items.length > 0 ? items[0] : undefined;
}

// Or using any - lost type safety
function getFirstAny(items: any[]): any {
    return items.length > 0 ? items[0] : undefined;
}

// Problems with any approach:
const result = getFirstAny(["hello", "world"]); // result is type 'any'
console.log(result.toUpperCase()); // No type checking - could crash at runtime
```

### The Solution: Generic Type Parameters

```typescript
// Generic function - works with any type
function getFirst<T>(items: T[]): T | undefined {
    return items.length > 0 ? items[0] : undefined;
}

// Type-safe usage with different types
const firstString = getFirst(["hello", "world"]);    // Type: string | undefined
const firstNumber = getFirst([1, 2, 3]);             // Type: number | undefined
const firstBoolean = getFirst([true, false]);        // Type: boolean | undefined

// TypeScript maintains type safety
if (firstString) {
    console.log(firstString.toUpperCase()); // ✅ TypeScript knows it's a string
}

// Explicit type parameters when needed
const firstValue = getFirst<string>(["a", "b", "c"]); // Explicitly specify type
```

---

## 🔧 Generic Functions

### Basic Generic Functions:

```typescript
// Single type parameter
function identity<T>(value: T): T {
    return value;
}

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// Generic function with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Usage examples
const id1 = identity("hello");        // Type: string
const id2 = identity(42);             // Type: number
const id3 = identity({ name: "Alice" }); // Type: { name: string }

const pair1 = pair("name", 25);       // Type: [string, number]
const pair2 = pair(true, [1, 2, 3]);  // Type: [boolean, number[]]

const person = { name: "Bob", age: 30, city: "New York" };
const name = getProperty(person, "name");  // Type: string
const age = getProperty(person, "age");    // Type: number
// const invalid = getProperty(person, "invalid"); // ❌ Error: invalid key
```

### Generic Functions with Default Types:

```typescript
// Default type parameters
function createArray<T = string>(length: number, value: T): T[] {
    return Array(length).fill(value);
}

// Generic function with conditional logic
function processValue<T>(
    value: T,
    processor?: (val: T) => T
): T {
    return processor ? processor(value) : value;
}

// Usage examples
const stringArray = createArray(3, "hello");     // Type: string[]
const numberArray = createArray<number>(3, 42);  // Type: number[]
const defaultArray = createArray(3, "default");  // Uses default type (string)

const processed1 = processValue("hello");                    // Type: string
const processed2 = processValue(42, x => x * 2);           // Type: number
const processed3 = processValue([1, 2], arr => [...arr, 3]); // Type: number[]
```

### Advanced Generic Function Patterns:

```typescript
// Generic function with overloads
function combine<T>(items: T[]): T[];
function combine<T>(item1: T, item2: T): T[];
function combine<T>(...args: T[] | [T[]]): T[] {
    if (args.length === 1 && Array.isArray(args[0])) {
        return args[0];
    }
    return args as T[];
}

// Generic function factories
function createValidator<T>(
    validator: (value: any) => value is T
): (value: any) => T | null {
    return (value: any): T | null => {
        return validator(value) ? value : null;
    };
}

// Type guard functions
function isString(value: any): value is string {
    return typeof value === "string";
}

function isNumber(value: any): value is number {
    return typeof value === "number" && !isNaN(value);
}

// Usage examples
const items1 = combine([1, 2, 3]);        // Type: number[]
const items2 = combine("a", "b");         // Type: string[]

const stringValidator = createValidator(isString);
const numberValidator = createValidator(isNumber);

const validString = stringValidator("hello");     // Type: string | null
const validNumber = numberValidator(42);          // Type: number | null
const invalidNumber = numberValidator("hello");   // Type: number | null (returns null)

console.log("Valid string:", validString);       // "hello"
console.log("Valid number:", validNumber);       // 42
console.log("Invalid number:", invalidNumber);   // null
```

---

## 🏗️ Generic Interfaces and Types

### Generic Interfaces:

```typescript
// Basic generic interface
interface Container<T> {
    value: T;
    setValue(newValue: T): void;
    getValue(): T;
}

// Multiple type parameters
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

// Generic interface with constraints
interface Comparable<T> {
    compareTo(other: T): number;
}

// Generic interface with optional parameters
interface Repository<T, ID = string> {
    findById(id: ID): Promise<T | null>;
    save(entity: T): Promise<T>;
    delete(id: ID): Promise<boolean>;
    findAll(): Promise<T[]>;
}

// Implementation examples
class StringContainer implements Container<string> {
    constructor(private _value: string) {}
    
    setValue(newValue: string): void {
        this._value = newValue;
    }
    
    getValue(): string {
        return this._value;
    }
    
    get value(): string {
        return this._value;
    }
}

class NumberContainer implements Container<number> {
    constructor(private _value: number) {}
    
    setValue(newValue: number): void {
        this._value = newValue;
    }
    
    getValue(): number {
        return this._value;
    }
    
    get value(): number {
        return this._value;
    }
}

// Usage
const stringContainer = new StringContainer("hello");
const numberContainer = new NumberContainer(42);

stringContainer.setValue("world");
numberContainer.setValue(100);

console.log("String value:", stringContainer.getValue()); // "world"
console.log("Number value:", numberContainer.getValue()); // 100
```

### Generic Type Aliases:

```typescript
// Basic generic type aliases
type Result<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };

type Optional<T> = T | null | undefined;

type Handler<T> = (value: T) => void;

type Transformer<T, U> = (input: T) => U;

// Advanced generic type patterns
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type NonNullable<T> = T extends null | undefined ? never : T;

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Usage examples
type UserResult = Result<User, ValidationError>;
type OptionalString = Optional<string>;
type StringHandler = Handler<string>;
type NumberToString = Transformer<number, string>;

interface User {
    id: number;
    name: string;
    email: string;
    profile: {
        bio: string;
        avatar: string;
    };
}

interface ValidationError {
    field: string;
    message: string;
}

// Function using generic types
function createSuccessResult<T>(data: T): Result<T> {
    return { success: true, data };
}

function createErrorResult<E = Error>(error: E): Result<never, E> {
    return { success: false, error };
}

function handleResult<T, E>(
    result: Result<T, E>,
    onSuccess: (data: T) => void,
    onError: (error: E) => void
): void {
    if (result.success) {
        onSuccess(result.data);
    } else {
        onError(result.error);
    }
}

// Usage
const user: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    profile: {
        bio: "Software developer",
        avatar: "avatar.jpg"
    }
};

const userResult = createSuccessResult(user);
const errorResult = createErrorResult({ field: "email", message: "Invalid email" });

handleResult(
    userResult,
    (userData) => console.log("User loaded:", userData.name),
    (error) => console.error("Error:", error)
);

// Deep readonly example
type ReadonlyUser = DeepReadonly<User>;
// ReadonlyUser has all properties as readonly, including nested objects
```

---

## 🏛️ Generic Classes

### Basic Generic Classes:

```typescript
// Generic class with single type parameter
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

// Generic class with multiple type parameters
class Map<K, V> {
    private pairs: Array<{ key: K; value: V }> = [];
    
    set(key: K, value: V): void {
        const existingIndex = this.pairs.findIndex(pair => pair.key === key);
        if (existingIndex >= 0) {
            this.pairs[existingIndex].value = value;
        } else {
            this.pairs.push({ key, value });
        }
    }
    
    get(key: K): V | undefined {
        const pair = this.pairs.find(pair => pair.key === key);
        return pair?.value;
    }
    
    has(key: K): boolean {
        return this.pairs.some(pair => pair.key === key);
    }
    
    delete(key: K): boolean {
        const index = this.pairs.findIndex(pair => pair.key === key);
        if (index >= 0) {
            this.pairs.splice(index, 1);
            return true;
        }
        return false;
    }
    
    keys(): K[] {
        return this.pairs.map(pair => pair.key);
    }
    
    values(): V[] {
        return this.pairs.map(pair => pair.value);
    }
    
    entries(): Array<[K, V]> {
        return this.pairs.map(pair => [pair.key, pair.value]);
    }
    
    clear(): void {
        this.pairs = [];
    }
    
    size(): number {
        return this.pairs.length;
    }
}

// Usage examples
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log("Stack contents:", numberStack.toArray()); // [1, 2, 3]
console.log("Popped:", numberStack.pop());             // 3
console.log("Peek:", numberStack.peek());              // 2

const stringMap = new Map<string, number>();
stringMap.set("alice", 25);
stringMap.set("bob", 30);
stringMap.set("charlie", 35);

console.log("Alice's age:", stringMap.get("alice"));   // 25
console.log("All names:", stringMap.keys());           // ["alice", "bob", "charlie"]
console.log("All ages:", stringMap.values());          // [25, 30, 35]
```

### Generic Classes with Constraints:

```typescript
// Constraint requiring specific properties
interface Identifiable {
    id: string | number;
}

class Repository<T extends Identifiable> {
    private items: T[] = [];
    
    add(item: T): void {
        const existingIndex = this.items.findIndex(existing => existing.id === item.id);
        if (existingIndex >= 0) {
            this.items[existingIndex] = item;
        } else {
            this.items.push(item);
        }
    }
    
    findById(id: string | number): T | undefined {
        return this.items.find(item => item.id === id);
    }
    
    findAll(): T[] {
        return [...this.items];
    }
    
    remove(id: string | number): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index >= 0) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
    
    count(): number {
        return this.items.length;
    }
    
    exists(id: string | number): boolean {
        return this.items.some(item => item.id === id);
    }
}

// Constraint requiring constructor signature
interface Constructable {
    new (...args: any[]): any;
}

class Factory<T extends Constructable> {
    constructor(private constructor: T) {}
    
    create(...args: any[]): InstanceType<T> {
        return new this.constructor(...args);
    }
    
    createMultiple(count: number, ...args: any[]): Array<InstanceType<T>> {
        return Array(count).fill(null).map(() => this.create(...args));
    }
}

// Usage examples
interface Product extends Identifiable {
    id: number;
    name: string;
    price: number;
    category: string;
}

interface User extends Identifiable {
    id: string;
    name: string;
    email: string;
}

const productRepo = new Repository<Product>();
const userRepo = new Repository<User>();

// Add products
productRepo.add({ id: 1, name: "Laptop", price: 999, category: "Electronics" });
productRepo.add({ id: 2, name: "Mouse", price: 25, category: "Electronics" });

// Add users
userRepo.add({ id: "u1", name: "Alice", email: "alice@example.com" });
userRepo.add({ id: "u2", name: "Bob", email: "bob@example.com" });

console.log("All products:", productRepo.findAll());
console.log("User Alice:", userRepo.findById("u1"));

// Factory example
class Person {
    constructor(public name: string, public age: number) {}
}

class Car {
    constructor(public brand: string, public model: string) {}
}

const personFactory = new Factory(Person);
const carFactory = new Factory(Car);

const person = personFactory.create("Alice", 30);      // Type: Person
const people = personFactory.createMultiple(3, "Bob", 25); // Type: Person[]

const car = carFactory.create("Toyota", "Camry");       // Type: Car
const cars = carFactory.createMultiple(2, "Honda", "Civic"); // Type: Car[]

console.log("Created person:", person);
console.log("Created people:", people);
console.log("Created car:", car);
```

---

## 🔧 Generic Constraints and Conditional Types

### Generic Constraints:

```typescript
// Basic constraints
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(item: T): T {
    console.log(`Length: ${item.length}`);
    return item;
}

// Constraint using keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Multiple constraints
interface Serializable {
    serialize(): string;
}

interface Identifiable {
    id: string | number;
}

function saveEntity<T extends Serializable & Identifiable>(entity: T): void {
    console.log(`Saving entity ${entity.id}: ${entity.serialize()}`);
}

// Conditional constraints
type NonNullable<T> = T extends null | undefined ? never : T;

type ElementType<T> = T extends (infer U)[] ? U : T;

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Usage examples
logLength("hello");        // ✅ string has length
logLength([1, 2, 3]);      // ✅ array has length
// logLength(42);          // ❌ number doesn't have length

const person = { name: "Alice", age: 30, city: "New York" };
const name = getProperty(person, "name");  // Type: string
const age = getProperty(person, "age");    // Type: number

class User implements Serializable, Identifiable {
    constructor(public id: string, public name: string) {}
    
    serialize(): string {
        return JSON.stringify({ id: this.id, name: this.name });
    }
}

const user = new User("1", "Alice");
saveEntity(user); // ✅ User implements both interfaces

// Conditional type examples
type StringOrNumber = NonNullable<string | null>;        // string
type ArrayElement = ElementType<number[]>;               // number
type FunctionReturn = ReturnType<() => boolean>;         // boolean
```

### Advanced Conditional Types:

```typescript
// Conditional type for extracting promise types
type Awaited<T> = T extends Promise<infer U> ? U : T;

// Conditional type for function parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Conditional type for object key filtering
type PickByType<T, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
};

// Conditional type for excluding specific types
type ExcludeByType<T, U> = {
    [K in keyof T as T[K] extends U ? never : K]: T[K];
};

// Recursive conditional type
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Usage examples
interface ApiResponse {
    id: number;
    name: string;
    isActive: boolean;
    created: Date;
    tags: string[];
    metadata: Record<string, any>;
}

// Extract only string properties
type StringProps = PickByType<ApiResponse, string>;
// Result: { name: string }

// Extract only boolean properties  
type BooleanProps = PickByType<ApiResponse, boolean>;
// Result: { isActive: boolean }

// Exclude string properties
type NonStringProps = ExcludeByType<ApiResponse, string>;
// Result: { id: number; isActive: boolean; created: Date; tags: string[]; metadata: Record<string, any> }

// Deep partial type
type PartialApiResponse = DeepPartial<ApiResponse>;
// All properties optional, including nested objects

// Function type utilities
function fetchUser(id: string, includeDetails: boolean): Promise<User> {
    // Implementation
    return Promise.resolve(new User(id, "Alice"));
}

type FetchUserParams = Parameters<typeof fetchUser>;  // [string, boolean]
type FetchUserReturn = Awaited<ReturnType<typeof fetchUser>>; // User

// Helper function using conditional types
function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
    return value instanceof Promise;
}

async function resolveValue<T>(value: T | Promise<T>): Promise<Awaited<T>> {
    if (isPromise(value)) {
        return await value;
    }
    return value as Awaited<T>;
}

// Usage
const syncValue = "hello";
const asyncValue = Promise.resolve("world");

resolveValue(syncValue).then(result => {
    console.log("Sync result:", result);    // "hello"
});

resolveValue(asyncValue).then(result => {
    console.log("Async result:", result);   // "world"  
});
```

---

## 🎮 Hands-On Exercises

### Exercise 1: Generic Data Structures

Create a comprehensive generic data structures library:

```typescript
// Your task: Create generic data structures

// 1. Create a generic LinkedList class
class LinkedList<T> {
    // Implement: prepend, append, removeFirst, removeLast, find, toArray
}

// 2. Create a generic Queue class  
class Queue<T> {
    // Implement: enqueue, dequeue, peek, isEmpty, size
}

// 3. Create a generic Tree class
class TreeNode<T> {
    // Implement: addChild, removeChild, findChild, traverse
}

// 4. Create utility functions
function map<T, U>(list: LinkedList<T>, fn: (item: T) => U): LinkedList<U> {
    // Implementation
}

function filter<T>(list: LinkedList<T>, predicate: (item: T) => boolean): LinkedList<T> {
    // Implementation
}

// Test your implementations
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Generic Data Structures Library

// Generic LinkedList implementation
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: ListNode<T> | null = null;
    private tail: ListNode<T> | null = null;
    private count: number = 0;

    prepend(value: T): void {
        const newNode = new ListNode(value, this.head);
        this.head = newNode;
        
        if (!this.tail) {
            this.tail = newNode;
        }
        
        this.count++;
    }

    append(value: T): void {
        const newNode = new ListNode(value);
        
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        
        this.count++;
    }

    removeFirst(): T | null {
        if (!this.head) return null;
        
        const value = this.head.value;
        this.head = this.head.next;
        
        if (!this.head) {
            this.tail = null;
        }
        
        this.count--;
        return value;
    }

    removeLast(): T | null {
        if (!this.head) return null;
        
        if (this.head === this.tail) {
            const value = this.head.value;
            this.head = this.tail = null;
            this.count--;
            return value;
        }
        
        let current = this.head;
        while (current.next !== this.tail) {
            current = current.next!;
        }
        
        const value = this.tail!.value;
        current.next = null;
        this.tail = current;
        this.count--;
        return value;
    }

    find(predicate: (value: T) => boolean): T | null {
        let current = this.head;
        while (current) {
            if (predicate(current.value)) {
                return current.value;
            }
            current = current.next;
        }
        return null;
    }

    remove(value: T): boolean {
        if (!this.head) return false;
        
        if (this.head.value === value) {
            this.removeFirst();
            return true;
        }
        
        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }
        
        if (current.next) {
            if (current.next === this.tail) {
                this.tail = current;
            }
            current.next = current.next.next;
            this.count--;
            return true;
        }
        
        return false;
    }

    toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }

    isEmpty(): boolean {
        return this.count === 0;
    }

    size(): number {
        return this.count;
    }

    clear(): void {
        this.head = this.tail = null;
        this.count = 0;
    }

    forEach(callback: (value: T, index: number) => void): void {
        let current = this.head;
        let index = 0;
        while (current) {
            callback(current.value, index);
            current = current.next;
            index++;
        }
    }
}

// Generic Queue implementation
class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }

    toArray(): T[] {
        return [...this.items];
    }

    forEach(callback: (item: T, index: number) => void): void {
        this.items.forEach(callback);
    }
}

// Generic Tree implementation
class TreeNode<T> {
    private children: TreeNode<T>[] = [];

    constructor(public value: T) {}

    addChild(value: T): TreeNode<T> {
        const child = new TreeNode(value);
        this.children.push(child);
        return child;
    }

    addChildNode(child: TreeNode<T>): void {
        this.children.push(child);
    }

    removeChild(value: T): boolean {
        const index = this.children.findIndex(child => child.value === value);
        if (index >= 0) {
            this.children.splice(index, 1);
            return true;
        }
        return false;
    }

    findChild(value: T): TreeNode<T> | null {
        return this.children.find(child => child.value === value) || null;
    }

    getChildren(): TreeNode<T>[] {
        return [...this.children];
    }

    hasChildren(): boolean {
        return this.children.length > 0;
    }

    // Depth-first traversal
    traverse(callback: (value: T, depth: number) => void, depth: number = 0): void {
        callback(this.value, depth);
        this.children.forEach(child => child.traverse(callback, depth + 1));
    }

    // Breadth-first traversal
    traverseBreadthFirst(callback: (value: T, depth: number) => void): void {
        const queue = new Queue<{ node: TreeNode<T>; depth: number }>();
        queue.enqueue({ node: this, depth: 0 });

        while (!queue.isEmpty()) {
            const { node, depth } = queue.dequeue()!;
            callback(node.value, depth);
            
            node.children.forEach(child => {
                queue.enqueue({ node: child, depth: depth + 1 });
            });
        }
    }

    // Find node with specific value
    find(value: T): TreeNode<T> | null {
        if (this.value === value) return this;
        
        for (const child of this.children) {
            const found = child.find(value);
            if (found) return found;
        }
        
        return null;
    }

    // Convert to array (depth-first)
    toArray(): T[] {
        const result: T[] = [];
        this.traverse(value => result.push(value));
        return result;
    }

    // Get all leaf nodes
    getLeaves(): TreeNode<T>[] {
        if (!this.hasChildren()) return [this];
        
        const leaves: TreeNode<T>[] = [];
        this.children.forEach(child => {
            leaves.push(...child.getLeaves());
        });
        return leaves;
    }

    // Count total nodes
    count(): number {
        let count = 1; // Count this node
        this.children.forEach(child => {
            count += child.count();
        });
        return count;
    }

    // Get maximum depth
    maxDepth(): number {
        if (!this.hasChildren()) return 1;
        
        let maxChildDepth = 0;
        this.children.forEach(child => {
            maxChildDepth = Math.max(maxChildDepth, child.maxDepth());
        });
        return 1 + maxChildDepth;
    }
}

// Generic Tree class (wrapper for TreeNode)
class Tree<T> {
    constructor(private root: TreeNode<T> | null = null) {}

    setRoot(value: T): TreeNode<T> {
        this.root = new TreeNode(value);
        return this.root;
    }

    getRoot(): TreeNode<T> | null {
        return this.root;
    }

    isEmpty(): boolean {
        return this.root === null;
    }

    find(value: T): TreeNode<T> | null {
        return this.root?.find(value) || null;
    }

    toArray(): T[] {
        return this.root?.toArray() || [];
    }

    count(): number {
        return this.root?.count() || 0;
    }

    maxDepth(): number {
        return this.root?.maxDepth() || 0;
    }

    traverse(callback: (value: T, depth: number) => void): void {
        this.root?.traverse(callback);
    }

    traverseBreadthFirst(callback: (value: T, depth: number) => void): void {
        this.root?.traverseBreadthFirst(callback);
    }
}

// Utility functions for LinkedList
function map<T, U>(list: LinkedList<T>, fn: (item: T) => U): LinkedList<U> {
    const result = new LinkedList<U>();
    list.forEach(item => result.append(fn(item)));
    return result;
}

function filter<T>(list: LinkedList<T>, predicate: (item: T) => boolean): LinkedList<T> {
    const result = new LinkedList<T>();
    list.forEach(item => {
        if (predicate(item)) {
            result.append(item);
        }
    });
    return result;
}

function reduce<T, U>(
    list: LinkedList<T>, 
    reducer: (acc: U, current: T, index: number) => U, 
    initialValue: U
): U {
    let result = initialValue;
    list.forEach((item, index) => {
        result = reducer(result, item, index);
    });
    return result;
}

function concat<T>(...lists: LinkedList<T>[]): LinkedList<T> {
    const result = new LinkedList<T>();
    lists.forEach(list => {
        list.forEach(item => result.append(item));
    });
    return result;
}

// Demonstration and testing
console.log("=== Generic Data Structures Demo ===\n");

// LinkedList demo
console.log("1. LinkedList Demo:");
const numberList = new LinkedList<number>();
numberList.append(1);
numberList.append(2);
numberList.append(3);
numberList.prepend(0);

console.log("Original list:", numberList.toArray()); // [0, 1, 2, 3]
console.log("Size:", numberList.size()); // 4

const doubledList = map(numberList, x => x * 2);
console.log("Doubled list:", doubledList.toArray()); // [0, 2, 4, 6]

const evenList = filter(numberList, x => x % 2 === 0);
console.log("Even numbers:", evenList.toArray()); // [0, 2]

const sum = reduce(numberList, (acc, curr) => acc + curr, 0);
console.log("Sum:", sum); // 6

// Queue demo
console.log("\n2. Queue Demo:");
const taskQueue = new Queue<string>();
taskQueue.enqueue("Task 1");
taskQueue.enqueue("Task 2");
taskQueue.enqueue("Task 3");

console.log("Queue contents:", taskQueue.toArray()); // ["Task 1", "Task 2", "Task 3"]
console.log("Next task:", taskQueue.peek()); // "Task 1"
console.log("Processed:", taskQueue.dequeue()); // "Task 1"
console.log("Remaining tasks:", taskQueue.toArray()); // ["Task 2", "Task 3"]

// Tree demo
console.log("\n3. Tree Demo:");
const fileTree = new Tree<string>();
const root = fileTree.setRoot("root");

const documents = root.addChild("Documents");
const pictures = root.addChild("Pictures");
const downloads = root.addChild("Downloads");

documents.addChild("resume.pdf");
documents.addChild("notes.txt");

pictures.addChild("vacation.jpg");
pictures.addChild("family.png");

downloads.addChild("installer.exe");

console.log("Tree structure (depth-first):");
fileTree.traverse((value, depth) => {
    const indent = "  ".repeat(depth);
    console.log(`${indent}${value}`);
});

console.log("\nTree structure (breadth-first):");
fileTree.traverseBreadthFirst((value, depth) => {
    console.log(`Depth ${depth}: ${value}`);
});

console.log(`\nTree stats: ${fileTree.count()} nodes, max depth: ${fileTree.maxDepth()}`);

const found = fileTree.find("resume.pdf");
console.log("Found resume.pdf:", found?.value || "Not found");

// Complex example: Generic cache with TTL
class CacheEntry<T> {
    constructor(
        public value: T,
        public expiresAt: number
    ) {}

    isExpired(): boolean {
        return Date.now() > this.expiresAt;
    }
}

class TTLCache<K, V> {
    private cache = new Map<K, CacheEntry<V>>();
    private defaultTTL: number;

    constructor(defaultTTLMs: number = 60000) { // 1 minute default
        this.defaultTTL = defaultTTLMs;
    }

    set(key: K, value: V, ttlMs?: number): void {
        const ttl = ttlMs || this.defaultTTL;
        const expiresAt = Date.now() + ttl;
        this.cache.set(key, new CacheEntry(value, expiresAt));
    }

    get(key: K): V | undefined {
        const entry = this.cache.get(key);
        if (!entry) return undefined;

        if (entry.isExpired()) {
            this.cache.delete(key);
            return undefined;
        }

        return entry.value;
    }

    has(key: K): boolean {
        return this.get(key) !== undefined;
    }

    delete(key: K): boolean {
        return this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    cleanup(): number {
        let removed = 0;
        for (const [key, entry] of this.cache.entries()) {
            if (entry.isExpired()) {
                this.cache.delete(key);
                removed++;
            }
        }
        return removed;
    }

    size(): number {
        this.cleanup(); // Remove expired entries
        return this.cache.size;
    }

    keys(): K[] {
        this.cleanup();
        return Array.from(this.cache.keys());
    }

    values(): V[] {
        this.cleanup();
        return Array.from(this.cache.values()).map(entry => entry.value);
    }
}

// Cache demo
console.log("\n4. TTL Cache Demo:");
const userCache = new TTLCache<string, { name: string; email: string }>(2000); // 2 second TTL

userCache.set("user1", { name: "Alice", email: "alice@example.com" });
userCache.set("user2", { name: "Bob", email: "bob@example.com" }, 5000); // Custom TTL

console.log("User1:", userCache.get("user1"));
console.log("User2:", userCache.get("user2"));
console.log("Cache size:", userCache.size());

setTimeout(() => {
    console.log("\nAfter 3 seconds:");
    console.log("User1:", userCache.get("user1")); // Should be undefined (expired)
    console.log("User2:", userCache.get("user2")); // Should still exist
    console.log("Cache size:", userCache.size());
}, 3000);
```

</details>

### Exercise 2: Generic API Client

```typescript
// Create a type-safe generic API client

// Define request/response types
interface ApiRequest<T = any> {
    // Implementation
}

interface ApiResponse<T = any> {
    // Implementation
}

// Create generic API client
class ApiClient {
    // Implement GET, POST, PUT, DELETE methods with proper typing
}

// Create endpoint definitions
class UserApi {
    // Implement user-specific API methods
}

// Test your API client
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Generic API Client

// HTTP method types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Request configuration
interface ApiRequest<TBody = any> {
    method: HttpMethod;
    url: string;
    headers?: Record<string, string>;
    body?: TBody;
    params?: Record<string, string | number | boolean>;
    timeout?: number;
}

// Response types
interface ApiResponse<TData = any> {
    data: TData;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

interface ApiError {
    message: string;
    status: number;
    code?: string;
    details?: any;
}

// Result type for handling success/error states
type ApiResult<TData, TError = ApiError> = 
    | { success: true; data: TData; response: ApiResponse<TData> }
    | { success: false; error: TError };

// Generic API client
class ApiClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;
    private timeout: number;

    constructor(
        baseURL: string, 
        defaultHeaders: Record<string, string> = {},
        timeout: number = 10000
    ) {
        this.baseURL = baseURL.replace(/\/$/, "");
        this.defaultHeaders = {
            "Content-Type": "application/json",
            ...defaultHeaders
        };
        this.timeout = timeout;
    }

    // Generic request method
    async request<TResponse = any, TBody = any>(
        config: ApiRequest<TBody>
    ): Promise<ApiResult<TResponse>> {
        try {
            const url = this.buildURL(config.url, config.params);
            const headers = { ...this.defaultHeaders, ...config.headers };
            const timeout = config.timeout || this.timeout;

            // Simulate API request (in real app, use fetch)
            const response = await this.simulateRequest<TResponse, TBody>(
                config, url, headers, timeout
            );

            return {
                success: true,
                data: response.data,
                response
            };
        } catch (error) {
            return {
                success: false,
                error: this.handleError(error)
            };
        }
    }

    // GET request
    async get<TResponse = any>(
        url: string,
        params?: Record<string, string | number | boolean>,
        headers?: Record<string, string>
    ): Promise<ApiResult<TResponse>> {
        return this.request<TResponse>({
            method: "GET",
            url,
            params,
            headers
        });
    }

    // POST request
    async post<TResponse = any, TBody = any>(
        url: string,
        body?: TBody,
        headers?: Record<string, string>
    ): Promise<ApiResult<TResponse>> {
        return this.request<TResponse, TBody>({
            method: "POST",
            url,
            body,
            headers
        });
    }

    // PUT request
    async put<TResponse = any, TBody = any>(
        url: string,
        body?: TBody,
        headers?: Record<string, string>
    ): Promise<ApiResult<TResponse>> {
        return this.request<TResponse, TBody>({
            method: "PUT",
            url,
            body,
            headers
        });
    }

    // DELETE request
    async delete<TResponse = any>(
        url: string,
        headers?: Record<string, string>
    ): Promise<ApiResult<TResponse>> {
        return this.request<TResponse>({
            method: "DELETE",
            url,
            headers
        });
    }

    // PATCH request
    async patch<TResponse = any, TBody = any>(
        url: string,
        body?: TBody,
        headers?: Record<string, string>
    ): Promise<ApiResult<TResponse>> {
        return this.request<TResponse, TBody>({
            method: "PATCH",
            url,
            body,
            headers
        });
    }

    // Helper methods
    private buildURL(path: string, params?: Record<string, string | number | boolean>): string {
        let url = path.startsWith("http") ? path : `${this.baseURL}${path}`;
        
        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                searchParams.append(key, String(value));
            });
            const paramString = searchParams.toString();
            if (paramString) {
                url += (url.includes("?") ? "&" : "?") + paramString;
            }
        }
        
        return url;
    }

    private async simulateRequest<TResponse, TBody>(
        config: ApiRequest<TBody>,
        url: string,
        headers: Record<string, string>,
        timeout: number
    ): Promise<ApiResponse<TResponse>> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

        console.log(`🌐 ${config.method} ${url}`);

        // Simulate different responses based on URL patterns
        if (url.includes("/users")) {
            return this.simulateUserAPI<TResponse>(config, url);
        }
        
        if (url.includes("/posts")) {
            return this.simulatePostAPI<TResponse>(config, url);
        }

        if (url.includes("/error")) {
            throw new Error("Simulated server error");
        }

        // Default response
        return {
            data: { message: "Success", method: config.method, url } as TResponse,
            status: 200,
            statusText: "OK",
            headers: { "content-type": "application/json" }
        };
    }

    private simulateUserAPI<TResponse>(
        config: ApiRequest,
        url: string
    ): ApiResponse<TResponse> {
        const userIdMatch = url.match(/\/users\/(\d+)/);
        const userId = userIdMatch ? parseInt(userIdMatch[1]) : null;

        switch (config.method) {
            case "GET":
                if (userId) {
                    // Get single user
                    return {
                        data: {
                            id: userId,
                            name: `User ${userId}`,
                            email: `user${userId}@example.com`,
                            createdAt: new Date().toISOString()
                        } as TResponse,
                        status: 200,
                        statusText: "OK",
                        headers: { "content-type": "application/json" }
                    };
                } else {
                    // Get all users
                    return {
                        data: [
                            { id: 1, name: "Alice", email: "alice@example.com" },
                            { id: 2, name: "Bob", email: "bob@example.com" },
                            { id: 3, name: "Charlie", email: "charlie@example.com" }
                        ] as TResponse,
                        status: 200,
                        statusText: "OK",
                        headers: { "content-type": "application/json" }
                    };
                }

            case "POST":
                // Create user
                const newUser = {
                    id: Math.floor(Math.random() * 1000),
                    ...config.body,
                    createdAt: new Date().toISOString()
                };
                return {
                    data: newUser as TResponse,
                    status: 201,
                    statusText: "Created",
                    headers: { "content-type": "application/json" }
                };

            case "PUT":
                // Update user
                return {
                    data: {
                        id: userId,
                        ...config.body,
                        updatedAt: new Date().toISOString()
                    } as TResponse,
                    status: 200,
                    statusText: "OK",
                    headers: { "content-type": "application/json" }
                };

            case "DELETE":
                // Delete user
                return {
                    data: { success: true, deletedId: userId } as TResponse,
                    status: 200,
                    statusText: "OK",
                    headers: { "content-type": "application/json" }
                };

            default:
                throw new Error(`Method ${config.method} not supported`);
        }
    }

    private simulatePostAPI<TResponse>(
        config: ApiRequest,
        url: string
    ): ApiResponse<TResponse> {
        const postIdMatch = url.match(/\/posts\/(\d+)/);
        const postId = postIdMatch ? parseInt(postIdMatch[1]) : null;

        switch (config.method) {
            case "GET":
                if (postId) {
                    return {
                        data: {
                            id: postId,
                            title: `Post ${postId}`,
                            content: `Content for post ${postId}`,
                            authorId: 1,
                            createdAt: new Date().toISOString()
                        } as TResponse,
                        status: 200,
                        statusText: "OK",
                        headers: { "content-type": "application/json" }
                    };
                } else {
                    return {
                        data: [
                            { id: 1, title: "First Post", content: "Hello world!" },
                            { id: 2, title: "Second Post", content: "More content here" }
                        ] as TResponse,
                        status: 200,
                        statusText: "OK",
                        headers: { "content-type": "application/json" }
                    };
                }

            case "POST":
                return {
                    data: {
                        id: Math.floor(Math.random() * 1000),
                        ...config.body,
                        createdAt: new Date().toISOString()
                    } as TResponse,
                    status: 201,
                    statusText: "Created",
                    headers: { "content-type": "application/json" }
                };

            default:
                throw new Error(`Method ${config.method} not supported`);
        }
    }

    private handleError(error: any): ApiError {
        if (error.response) {
            return {
                message: error.response.data?.message || "API Error",
                status: error.response.status,
                code: error.response.data?.code,
                details: error.response.data
            };
        }

        if (error.message?.includes("timeout")) {
            return {
                message: "Request timeout",
                status: 408,
                code: "TIMEOUT"
            };
        }

        if (error.message?.includes("network")) {
            return {
                message: "Network error",
                status: 0,
                code: "NETWORK_ERROR"
            };
        }

        return {
            message: error.message || "Unknown error",
            status: 500,
            code: "UNKNOWN_ERROR"
        };
    }
}

// Type definitions for domain models
interface User {
    id: number;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

interface CreateUserRequest {
    name: string;
    email: string;
}

interface UpdateUserRequest {
    name?: string;
    email?: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt?: string;
    updatedAt?: string;
}

interface CreatePostRequest {
    title: string;
    content: string;
    authorId: number;
}

// Type-safe API endpoints
class UserApi {
    constructor(private client: ApiClient) {}

    async getUsers(): Promise<ApiResult<User[]>> {
        return this.client.get<User[]>("/users");
    }

    async getUserById(id: number): Promise<ApiResult<User>> {
        return this.client.get<User>(`/users/${id}`);
    }

    async createUser(userData: CreateUserRequest): Promise<ApiResult<User>> {
        return this.client.post<User, CreateUserRequest>("/users", userData);
    }

    async updateUser(id: number, userData: UpdateUserRequest): Promise<ApiResult<User>> {
        return this.client.put<User, UpdateUserRequest>(`/users/${id}`, userData);
    }

    async deleteUser(id: number): Promise<ApiResult<{ success: boolean; deletedId: number }>> {
        return this.client.delete(`/users/${id}`);
    }

    async searchUsers(query: string, limit: number = 10): Promise<ApiResult<User[]>> {
        return this.client.get<User[]>("/users", { q: query, limit });
    }
}

class PostApi {
    constructor(private client: ApiClient) {}

    async getPosts(): Promise<ApiResult<Post[]>> {
        return this.client.get<Post[]>("/posts");
    }

    async getPostById(id: number): Promise<ApiResult<Post>> {
        return this.client.get<Post>(`/posts/${id}`);
    }

    async createPost(postData: CreatePostRequest): Promise<ApiResult<Post>> {
        return this.client.post<Post, CreatePostRequest>("/posts", postData);
    }

    async getPostsByAuthor(authorId: number): Promise<ApiResult<Post[]>> {
        return this.client.get<Post[]>("/posts", { authorId });
    }
}

// Utility functions for handling API results
function isSuccess<T>(result: ApiResult<T>): result is { success: true; data: T; response: ApiResponse<T> } {
    return result.success;
}

function isError<T>(result: ApiResult<T>): result is { success: false; error: ApiError } {
    return !result.success;
}

async function handleApiResult<T>(
    result: ApiResult<T>,
    onSuccess: (data: T) => void,
    onError: (error: ApiError) => void
): Promise<void> {
    if (isSuccess(result)) {
        onSuccess(result.data);
    } else {
        onError(result.error);
    }
}

// Generic retry utility
async function withRetry<T>(
    apiCall: () => Promise<ApiResult<T>>,
    maxRetries: number = 3,
    delayMs: number = 1000
): Promise<ApiResult<T>> {
    let lastError: ApiError | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const result = await apiCall();
        
        if (isSuccess(result)) {
            return result;
        }

        lastError = result.error;
        
        // Don't retry on client errors (4xx)
        if (result.error.status >= 400 && result.error.status < 500) {
            break;
        }

        if (attempt < maxRetries) {
            console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delayMs}ms`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
            delayMs *= 2; // Exponential backoff
        }
    }

    return { success: false, error: lastError! };
}

// Demonstration
async function demonstrateApiClient() {
    console.log("=== Generic API Client Demo ===\n");

    // Create API client and endpoints
    const apiClient = new ApiClient("https://api.example.com", {
        "Authorization": "Bearer token123",
        "X-API-Version": "v1"
    });

    const userApi = new UserApi(apiClient);
    const postApi = new PostApi(apiClient);

    // 1. Get all users
    console.log("1. Getting all users:");
    const usersResult = await userApi.getUsers();
    await handleApiResult(
        usersResult,
        (users) => console.log(`✅ Found ${users.length} users:`, users.map(u => u.name)),
        (error) => console.error(`❌ Error: ${error.message}`)
    );

    // 2. Create a new user
    console.log("\n2. Creating new user:");
    const createResult = await userApi.createUser({
        name: "David",
        email: "david@example.com"
    });
    
    if (isSuccess(createResult)) {
        console.log(`✅ Created user: ${createResult.data.name} (ID: ${createResult.data.id})`);
    } else {
        console.error(`❌ Error: ${createResult.error.message}`);
    }

    // 3. Get specific user
    console.log("\n3. Getting user by ID:");
    const userResult = await userApi.getUserById(1);
    await handleApiResult(
        userResult,
        (user) => console.log(`✅ User details:`, user),
        (error) => console.error(`❌ Error: ${error.message}`)
    );

    // 4. Update user
    console.log("\n4. Updating user:");
    const updateResult = await userApi.updateUser(1, {
        name: "Alice Updated"
    });
    
    if (isSuccess(updateResult)) {
        console.log(`✅ Updated user: ${updateResult.data.name}`);
    } else {
        console.error(`❌ Error: ${updateResult.error.message}`);
    }

    // 5. Search users
    console.log("\n5. Searching users:");
    const searchResult = await userApi.searchUsers("alice", 5);
    await handleApiResult(
        searchResult,
        (users) => console.log(`✅ Search results:`, users.map(u => u.name)),
        (error) => console.error(`❌ Error: ${error.message}`)
    );

    // 6. Work with posts
    console.log("\n6. Getting posts:");
    const postsResult = await postApi.getPosts();
    await handleApiResult(
        postsResult,
        (posts) => console.log(`✅ Found ${posts.length} posts:`, posts.map(p => p.title)),
        (error) => console.error(`❌ Error: ${error.message}`)
    );

    // 7. Create post
    console.log("\n7. Creating new post:");
    const createPostResult = await postApi.createPost({
        title: "My First Post",
        content: "This is the content of my first post!",
        authorId: 1
    });
    
    if (isSuccess(createPostResult)) {
        console.log(`✅ Created post: ${createPostResult.data.title}`);
    } else {
        console.error(`❌ Error: ${createPostResult.error.message}`);
    }

    // 8. Test retry mechanism
    console.log("\n8. Testing retry mechanism:");
    const retryResult = await withRetry(
        () => apiClient.get("/error"), // This will fail
        2,
        500
    );
    
    if (isError(retryResult)) {
        console.log(`❌ After retries: ${retryResult.error.message}`);
    }

    // 9. Test with parameters
    console.log("\n9. Testing with query parameters:");
    const paramResult = await apiClient.get("/users", { page: 1, limit: 5, active: true });
    if (isSuccess(paramResult)) {
        console.log("✅ Request with parameters successful");
    }

    console.log("\n=== Demo Complete ===");
}

// Run demonstration
demonstrateApiClient();
```

</details>

---

## 🎯 Key Takeaways

After completing this lesson, you should understand:

### ✅ Generic Fundamentals:
- **Type parameters** `<T>` for flexible, reusable code
- **Multiple type parameters** `<T, U, V>` for complex scenarios
- **Generic constraints** `<T extends Type>` for type safety
- **Default type parameters** `<T = string>` for convenience

### ✅ Generic Patterns:
- **Generic functions** for type-safe operations
- **Generic classes** for reusable data structures
- **Generic interfaces** for flexible contracts
- **Conditional types** for advanced type logic

### ✅ Real-World Applications:
- **API clients** with full type safety
- **Data structures** that work with any type
- **Utility functions** with preserved types
- **Framework patterns** for scalable code

### ✅ Best Practices:
- **Use meaningful names** for type parameters
- **Apply constraints** when needed for type safety
- **Provide defaults** for optional type parameters
- **Design for reusability** without sacrificing clarity

---

## 🚀 What's Next?

Congratulations! You've mastered generics in TypeScript. You now know how to:

- ✅ **Write flexible, reusable code** with type parameters
- ✅ **Create type-safe data structures** and APIs
- ✅ **Use advanced generic patterns** like conditional types
- ✅ **Build scalable applications** with generic foundations
- ✅ **Apply constraints and defaults** for better developer experience

**Next Lesson**: `14-classes.md` - Learn about TypeScript classes with proper typing, access modifiers, and object-oriented patterns!

---

*Remember: Generics let you write code once and use it with many types. They're the foundation of type-safe, reusable code in TypeScript!* 🔄
