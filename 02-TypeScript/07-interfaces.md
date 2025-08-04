# Interfaces - Describing Object Shapes 🏗️

**Master TypeScript Interfaces!** Interfaces are one of TypeScript's most powerful features for defining the structure of objects. Think of them as blueprints or contracts that describe what properties an object should have.

## 🎯 Learning Objectives

By the end of this lesson, you will:

- Understand what interfaces are and why they're essential
- Create and use interfaces to type objects
- Work with optional and readonly properties
- Extend interfaces for code reuse
- Use interfaces for function types and arrays
- Apply interfaces in real-world scenarios

---

## 🤔 What Are Interfaces?

An **interface** is a contract that defines the structure of an object. It tells TypeScript exactly what properties an object should have and what types those properties should be.

### The Problem Without Interfaces:

```javascript
// JavaScript - No clear structure
function createUser(userData) {
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    age: userData.age,
  };
}

// What properties does userData need? We don't know!
let user1 = createUser({ id: 1, name: "Alice" }); // Missing properties?
let user2 = createUser({ id: 2, fullName: "Bob" }); // Wrong property name?
```

### The Solution With Interfaces:

```typescript
// TypeScript - Clear, explicit structure
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function createUser(userData: User): User {
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    age: userData.age,
  };
}

// Now TypeScript guides us exactly!
let user1 = createUser({
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 25,
}); // ✅ Perfect!

// let user2 = createUser({ id: 2, fullName: "Bob" }); // ❌ Error: Wrong structure!
```

---

## 🏗️ Basic Interface Declaration

### Simple Interface:

```typescript
// Define an interface
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

// Use the interface
const person1: Person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
};

const person2: Person = {
  firstName: "Jane",
  lastName: "Smith",
  age: 28,
};

// Function that accepts interface
function greetPerson(person: Person): string {
  return `Hello, ${person.firstName} ${person.lastName}!`;
}

console.log(greetPerson(person1)); // "Hello, John Doe!"
console.log(greetPerson(person2)); // "Hello, Jane Smith!"
```

### Interface with Different Property Types:

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  categories: string[];
  metadata: object;
}

const laptop: Product = {
  id: 1,
  name: "Gaming Laptop",
  price: 1299.99,
  inStock: true,
  categories: ["Electronics", "Computers", "Gaming"],
  metadata: {
    brand: "TechCorp",
    warranty: "2 years",
    weight: "2.5kg",
  },
};

function displayProduct(product: Product): void {
  console.log(`${product.name} - $${product.price}`);
  console.log(`In Stock: ${product.inStock}`);
  console.log(`Categories: ${product.categories.join(", ")}`);
}

displayProduct(laptop);
```

---

## ❓ Optional Properties

Sometimes objects might have properties that aren't always required. Use `?` to make properties optional:

### Basic Optional Properties:

```typescript
interface UserProfile {
  id: number;
  username: string;
  email: string;
  fullName?: string; // Optional
  phoneNumber?: string; // Optional
  avatar?: string; // Optional
}

// All of these are valid:
const user1: UserProfile = {
  id: 1,
  username: "alice123",
  email: "alice@example.com",
  // No optional properties provided
};

const user2: UserProfile = {
  id: 2,
  username: "bob456",
  email: "bob@example.com",
  fullName: "Bob Johnson", // Some optional properties
};

const user3: UserProfile = {
  id: 3,
  username: "charlie789",
  email: "charlie@example.com",
  fullName: "Charlie Brown",
  phoneNumber: "+1-555-0123",
  avatar: "https://example.com/avatar.jpg", // All optional properties
};

// Function handling optional properties
function displayUserInfo(user: UserProfile): string {
  let info = `${user.username} (${user.email})`;

  if (user.fullName) {
    info += `\nFull Name: ${user.fullName}`;
  }

  if (user.phoneNumber) {
    info += `\nPhone: ${user.phoneNumber}`;
  }

  if (user.avatar) {
    info += `\nAvatar: ${user.avatar}`;
  }

  return info;
}

console.log(displayUserInfo(user1));
console.log(displayUserInfo(user2));
console.log(displayUserInfo(user3));
```

### Real-World Example: Configuration Interface:

```typescript
interface AppConfig {
  appName: string;
  version: string;
  apiUrl: string;

  // Optional configuration
  debugMode?: boolean;
  maxRetries?: number;
  timeout?: number;
  theme?: "light" | "dark";
  features?: {
    notifications?: boolean;
    analytics?: boolean;
    betaFeatures?: boolean;
  };
}

// Minimal configuration
const basicConfig: AppConfig = {
  appName: "My App",
  version: "1.0.0",
  apiUrl: "https://api.myapp.com",
};

// Full configuration
const fullConfig: AppConfig = {
  appName: "My App",
  version: "1.0.0",
  apiUrl: "https://api.myapp.com",
  debugMode: true,
  maxRetries: 3,
  timeout: 5000,
  theme: "dark",
  features: {
    notifications: true,
    analytics: false,
    betaFeatures: true,
  },
};

function initializeApp(config: AppConfig): void {
  console.log(`Starting ${config.appName} v${config.version}`);
  console.log(`API URL: ${config.apiUrl}`);

  if (config.debugMode) {
    console.log("Debug mode enabled");
  }

  if (config.theme) {
    console.log(`Theme: ${config.theme}`);
  }
}

initializeApp(basicConfig);
initializeApp(fullConfig);
```

---

## 🔒 Readonly Properties

Use `readonly` to prevent properties from being modified after creation:

### Basic Readonly Properties:

```typescript
interface DatabaseConnection {
  readonly id: string;
  readonly host: string;
  readonly port: number;
  readonly database: string;

  // These can be modified
  isConnected: boolean;
  lastPing: Date;
}

const dbConnection: DatabaseConnection = {
  id: "db-001",
  host: "localhost",
  port: 5432,
  database: "myapp",
  isConnected: false,
  lastPing: new Date(),
};

// These work fine:
dbConnection.isConnected = true;
dbConnection.lastPing = new Date();

// These cause errors:
// dbConnection.id = "db-002";          // ❌ Error: readonly property
// dbConnection.host = "remote-host";   // ❌ Error: readonly property
// dbConnection.port = 3306;            // ❌ Error: readonly property

console.log("Database config:", {
  id: dbConnection.id,
  host: dbConnection.host,
  port: dbConnection.port,
  database: dbConnection.database,
});
```

### Real-World Example: Immutable User Data:

```typescript
interface ImmutableUser {
  readonly id: number;
  readonly createdAt: Date;
  readonly email: string;

  // Mutable properties
  name: string;
  lastLoginAt: Date;
  isActive: boolean;
}

function createUser(email: string, name: string): ImmutableUser {
  return {
    id: Date.now(), // Simple ID generation
    createdAt: new Date(),
    email: email,
    name: name,
    lastLoginAt: new Date(),
    isActive: true,
  };
}

const user = createUser("alice@example.com", "Alice Johnson");

// These work:
user.name = "Alice Smith"; // Name can change
user.lastLoginAt = new Date(); // Login time can update
user.isActive = false; // Status can change

// These don't work:
// user.id = 12345;                  // ❌ Error: readonly
// user.email = "new@example.com";   // ❌ Error: readonly
// user.createdAt = new Date();      // ❌ Error: readonly

console.log("User:", user);
```

---

## 🔗 Extending Interfaces

Interfaces can extend other interfaces, allowing you to build complex types from simpler ones:

### Basic Interface Extension:

```typescript
// Base interface
interface Animal {
  name: string;
  age: number;
  species: string;
}

// Extended interface
interface Pet extends Animal {
  owner: string;
  isVaccinated: boolean;
  favoriteToy?: string;
}

// Further extended interface
interface Dog extends Pet {
  breed: string;
  canFetch: boolean;
  barkVolume: "quiet" | "medium" | "loud";
}

// Using the extended interfaces
const myDog: Dog = {
  // From Animal
  name: "Buddy",
  age: 3,
  species: "Canis lupus",

  // From Pet
  owner: "Alice Johnson",
  isVaccinated: true,
  favoriteToy: "Tennis ball",

  // From Dog
  breed: "Golden Retriever",
  canFetch: true,
  barkVolume: "medium",
};

function petInfo(pet: Pet): string {
  return `${pet.name} is a ${pet.age}-year-old ${pet.species} owned by ${pet.owner}`;
}

function dogInfo(dog: Dog): string {
  return `${dog.name} is a ${dog.breed} who ${
    dog.canFetch ? "can" : "cannot"
  } fetch`;
}

console.log(petInfo(myDog));
console.log(dogInfo(myDog));
```

### Multiple Interface Extension:

```typescript
// Multiple base interfaces
interface Flyable {
  canFly: boolean;
  maxAltitude: number;
}

interface Swimmable {
  canSwim: boolean;
  maxDepth: number;
}

interface Walkable {
  canWalk: boolean;
  maxSpeed: number;
}

// Interface extending multiple interfaces
interface Duck extends Animal, Flyable, Swimmable, Walkable {
  quackVolume: number;
  preferredHabitat: "pond" | "lake" | "river";
}

const mallardDuck: Duck = {
  // From Animal
  name: "Donald",
  age: 2,
  species: "Anas platyrhynchos",

  // From Flyable
  canFly: true,
  maxAltitude: 1000,

  // From Swimmable
  canSwim: true,
  maxDepth: 5,

  // From Walkable
  canWalk: true,
  maxSpeed: 3,

  // From Duck
  quackVolume: 7,
  preferredHabitat: "pond",
};

function describeAbilities(creature: Flyable & Swimmable & Walkable): string {
  const abilities = [];
  if (creature.canFly) abilities.push(`fly up to ${creature.maxAltitude}m`);
  if (creature.canSwim) abilities.push(`swim down to ${creature.maxDepth}m`);
  if (creature.canWalk) abilities.push(`walk at ${creature.maxSpeed} km/h`);

  return `This creature can: ${abilities.join(", ")}`;
}

console.log(describeAbilities(mallardDuck));
```

---

## 🔧 Interfaces for Functions

Interfaces can also describe function signatures:

### Function Type Interfaces:

```typescript
// Interface for a function
interface Calculator {
  (a: number, b: number): number;
}

// Implement the interface
const add: Calculator = (x, y) => x + y;
const subtract: Calculator = (x, y) => x - y;
const multiply: Calculator = (x, y) => x * y;
const divide: Calculator = (x, y) => (y !== 0 ? x / y : 0);

// Interface for more complex function
interface StringProcessor {
  (
    input: string,
    options?: {
      uppercase?: boolean;
      removeSpaces?: boolean;
      maxLength?: number;
    }
  ): string;
}

const processString: StringProcessor = (input, options = {}) => {
  let result = input;

  if (options.removeSpaces) {
    result = result.replace(/\s/g, "");
  }

  if (options.uppercase) {
    result = result.toUpperCase();
  }

  if (options.maxLength && result.length > options.maxLength) {
    result = result.substring(0, options.maxLength) + "...";
  }

  return result;
};

// Usage
console.log(add(5, 3)); // 8
console.log(multiply(4, 7)); // 28
console.log(processString("Hello World")); // "Hello World"
console.log(
  processString("Hello World", {
    uppercase: true,
    removeSpaces: true,
  })
); // "HELLOWORLD"
```

### Interface with Methods:

```typescript
interface UserService {
  createUser(name: string, email: string): User;
  getUserById(id: number): User | null;
  updateUser(id: number, updates: Partial<User>): User | null;
  deleteUser(id: number): boolean;
  getAllUsers(): User[];
}

// Implementation
class InMemoryUserService implements UserService {
  private users: User[] = [];
  private nextId: number = 1;

  createUser(name: string, email: string): User {
    const user: User = {
      id: this.nextId++,
      name,
      email,
      age: 0, // Default age
    };
    this.users.push(user);
    return user;
  }

  getUserById(id: number): User | null {
    return this.users.find((user) => user.id === id) || null;
  }

  updateUser(id: number, updates: Partial<User>): User | null {
    const user = this.getUserById(id);
    if (user) {
      Object.assign(user, updates);
      return user;
    }
    return null;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  getAllUsers(): User[] {
    return [...this.users]; // Return copy
  }
}

// Usage
const userService: UserService = new InMemoryUserService();

const alice = userService.createUser("Alice", "alice@example.com");
const bob = userService.createUser("Bob", "bob@example.com");

console.log("All users:", userService.getAllUsers());

userService.updateUser(alice.id, { age: 25 });
console.log("Updated Alice:", userService.getUserById(alice.id));

userService.deleteUser(bob.id);
console.log("After deletion:", userService.getAllUsers());
```

---

## 📋 Interfaces for Arrays and Indexable Types

### Array-like Interfaces:

```typescript
// Interface for array-like objects
interface StringArray {
  [index: number]: string;
  length: number;
}

interface NumberDictionary {
  [key: string]: number;
}

interface MixedDictionary {
  [key: string]: string | number;
  // You can also specify known properties
  name: string;
  age: number;
}

// Usage examples
const fruits: StringArray = ["apple", "banana", "orange"];
console.log(fruits[0]); // "apple"
console.log(fruits.length); // 3

const scores: NumberDictionary = {
  math: 95,
  science: 87,
  english: 92,
};

const userInfo: MixedDictionary = {
  name: "Alice",
  age: 25,
  city: "New York",
  zipCode: 10001,
};
```

---

## 🎮 Hands-On Exercises

### Exercise 1: E-commerce Product System

Create interfaces for an e-commerce system:

```typescript
// Your task: Define these interfaces!

// 1. Basic product interface
interface Product {
  // Add properties for id, name, price, category, inStock
}

// 2. Product with optional properties
interface DetailedProduct {
  // Extend Product and add optional: description, images, rating, reviews
}

// 3. Shopping cart item
interface CartItem {
  // Should have product and quantity
}

// 4. Shopping cart
interface ShoppingCart {
  // Should have items, total, and methods to add/remove items
}

// Test your interfaces:
const laptop: DetailedProduct = {
  id: 1,
  name: "Gaming Laptop",
  price: 1299.99,
  category: "Electronics",
  inStock: true,
  description: "High-performance gaming laptop",
  rating: 4.5,
};

// Implement a shopping cart class using your interfaces
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: E-commerce Product System

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface DetailedProduct extends Product {
  description?: string;
  images?: string[];
  rating?: number;
  reviews?: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingCart {
  items: CartItem[];
  readonly total: number;
  addItem(product: Product, quantity: number): void;
  removeItem(productId: number): void;
  updateQuantity(productId: number, quantity: number): void;
  clear(): void;
}

class Cart implements ShoppingCart {
  items: CartItem[] = [];

  get total(): number {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  addItem(product: Product, quantity: number): void {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeItem(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  clear(): void {
    this.items = [];
  }
}

// Test the implementation
const laptop: DetailedProduct = {
  id: 1,
  name: "Gaming Laptop",
  price: 1299.99,
  category: "Electronics",
  inStock: true,
  description: "High-performance gaming laptop",
  rating: 4.5,
};

const cart = new Cart();
cart.addItem(laptop, 1);
console.log("Cart total:", cart.total); // 1299.99
```

</details>

### Exercise 2: User Management System

```typescript
// Create a comprehensive user management system

// 1. Base user interface
interface BaseUser {
  // id, email, createdAt (readonly)
}

// 2. User with profile
interface UserProfile extends BaseUser {
  // Add: firstName, lastName, avatar?, phoneNumber?
}

// 3. Admin user
interface AdminUser extends UserProfile {
  // Add: permissions, lastLogin?, canManageUsers
}

// 4. User repository interface
interface UserRepository {
  // Methods: create, findById, findByEmail, update, delete, getAll
}

// Implement and test your interfaces
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: User Management System

interface BaseUser {
  readonly id: string;
  email: string;
  readonly createdAt: Date;
}

interface UserProfile extends BaseUser {
  firstName: string;
  lastName: string;
  avatar?: string;
  phoneNumber?: string;
}

interface AdminUser extends UserProfile {
  permissions: string[];
  lastLogin?: Date;
  canManageUsers: boolean;
}

interface UserRepository<T extends BaseUser> {
  create(user: Omit<T, "id" | "createdAt">): T;
  findById(id: string): T | null;
  findByEmail(email: string): T | null;
  update(id: string, updates: Partial<T>): T | null;
  delete(id: string): boolean;
  getAll(): T[];
}

class InMemoryUserRepository implements UserRepository<UserProfile> {
  private users: UserProfile[] = [];

  create(userData: Omit<UserProfile, "id" | "createdAt">): UserProfile {
    const user: UserProfile = {
      ...userData,
      id: Math.random().toString(36),
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  findById(id: string): UserProfile | null {
    return this.users.find((user) => user.id === id) || null;
  }

  findByEmail(email: string): UserProfile | null {
    return this.users.find((user) => user.email === email) || null;
  }

  update(id: string, updates: Partial<UserProfile>): UserProfile | null {
    const user = this.findById(id);
    if (user) {
      Object.assign(user, updates);
      return user;
    }
    return null;
  }

  delete(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  getAll(): UserProfile[] {
    return [...this.users];
  }
}

// Test the system
const userRepo = new InMemoryUserRepository();

const alice = userRepo.create({
  email: "alice@example.com",
  firstName: "Alice",
  lastName: "Johnson",
});

const bob = userRepo.create({
  email: "bob@example.com",
  firstName: "Bob",
  lastName: "Smith",
  phoneNumber: "+1-555-0123",
});

console.log("All users:", userRepo.getAll());
console.log("Find Alice:", userRepo.findByEmail("alice@example.com"));
```

</details>

---

## 🎯 Key Takeaways

After completing this lesson, you should understand:

### ✅ Interface Fundamentals:

- **Interfaces define object structure** - they're blueprints for objects
- **Type safety** - catch errors at compile time, not runtime
- **Self-documenting code** - interfaces serve as clear documentation
- **Flexible design** - optional properties for real-world scenarios

### ✅ Interface Features:

- **Optional properties** (`?`) - for properties that might not exist
- **Readonly properties** - for immutable data
- **Extending interfaces** - building complex types from simple ones
- **Function interfaces** - typing function signatures
- **Method interfaces** - defining object behavior contracts

### ✅ Best Practices:

- **Use descriptive names** - `UserProfile` not `UP`
- **Start simple** - add complexity as needed
- **Extend interfaces** - don't repeat yourself
- **Optional vs required** - think about real-world usage

---

## 🚀 What's Next?

Congratulations! You've mastered TypeScript interfaces. You now know how to:

- ✅ **Create interfaces** to define object structures
- ✅ **Use optional and readonly properties** for flexible designs
- ✅ **Extend interfaces** for code reuse and organization
- ✅ **Interface functions and methods** for complete type safety
- ✅ **Build complex systems** with well-defined contracts

**Next Lesson**: `08-type-aliases.md` - Learn how to create custom types and when to use type aliases vs interfaces!

---

_Remember: Interfaces are contracts that make your code more reliable, readable, and maintainable. They're one of TypeScript's most powerful features for building large applications!_ 🏗️
