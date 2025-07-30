# Arrays and Objects - Typing Complex Data Structures 🏗️

Arrays and objects are the workhorses of JavaScript applications. TypeScript makes them **safe and predictable** by ensuring you know exactly what data structure you're working with and what operations are valid.

## 🎯 Why Type Arrays and Objects?

### JavaScript Data Structure Problems:

```javascript
// JavaScript - Unsafe and unpredictable
let users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: "thirty" }, // Oops! String instead of number
  { firstName: "Charlie", age: 35 }, // Oops! Different property name
];

users.forEach((user) => {
  console.log(user.name.toUpperCase()); // Runtime error for Charlie!
  console.log(user.age + 5); // "thirty5" for Bob!
});

// What properties does this object have? Who knows!
let config = getData();
config.theme.darkMode = true; // Might crash if theme doesn't exist
```

### TypeScript Data Structure Safety:

```typescript
// TypeScript - Safe and predictable
interface User {
  name: string;
  age: number;
}

let users: User[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: "thirty" }, // ❌ Error: string is not assignable to number
  { firstName: "Charlie", age: 35 }, // ❌ Error: missing 'name' property
];

users.forEach((user) => {
  console.log(user.name.toUpperCase()); // ✅ Safe - name is always string
  console.log(user.age + 5); // ✅ Safe - age is always number
});

// Clear structure definition
interface Config {
  theme: {
    darkMode: boolean;
    primaryColor: string;
  };
  apiUrl: string;
}

let config: Config = getData();
config.theme.darkMode = true; // ✅ Safe - TypeScript knows the structure
```

## 📚 Array Types

### Basic Array Typing:

```typescript
// Method 1: Type[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
let flags: boolean[] = [true, false, true];

// Method 2: Array<Type>
let scores: Array<number> = [95, 87, 92, 98];
let cities: Array<string> = ["New York", "London", "Tokyo"];

// Empty arrays with type annotation
let userIds: number[] = [];
let errorMessages: string[] = [];

// Multi-dimensional arrays
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

let gameBoard: string[][] = [
  ["X", "O", ""],
  ["", "X", "O"],
  ["O", "", "X"],
];
```

### Complex Array Types:

```typescript
// Arrays of objects
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

let products: Product[] = [
  { id: 1, name: "Laptop", price: 999.99, inStock: true },
  { id: 2, name: "Mouse", price: 29.99, inStock: false },
  { id: 3, name: "Keyboard", price: 79.99, inStock: true },
];

// Array of functions
type MathOperation = (a: number, b: number) => number;
let operations: MathOperation[] = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => a / b,
];

// Union type arrays
let mixedData: (string | number)[] = ["Alice", 25, "Bob", 30];
let nullableNumbers: (number | null)[] = [1, 2, null, 4, 5];

// Readonly arrays
let immutableList: readonly string[] = ["red", "green", "blue"];
// immutableList.push("yellow"); // ❌ Error: cannot modify readonly array
```

### Array Methods with Types:

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];

// map() - transforms each element
let doubled: number[] = numbers.map((num: number): number => num * 2);
let strings: string[] = numbers.map((num: number): string => `Number: ${num}`);

// filter() - filters elements
let evens: number[] = numbers.filter((num: number): boolean => num % 2 === 0);
let greaterThanThree: number[] = numbers.filter((num) => num > 3);

// reduce() - combines elements
let sum: number = numbers.reduce(
  (acc: number, num: number): number => acc + num,
  0
);
let product: number = numbers.reduce((acc, num) => acc * num, 1);

// find() - finds first matching element
let firstEven: number | undefined = numbers.find((num) => num % 2 === 0);

// Real-world example: User processing
interface User {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
}

let users: User[] = [
  { id: 1, name: "Alice", age: 25, isActive: true },
  { id: 2, name: "Bob", age: 17, isActive: false },
  { id: 3, name: "Charlie", age: 30, isActive: true },
];

// Get active adult users
let activeAdults: User[] = users.filter(
  (user) => user.isActive && user.age >= 18
);

// Get user names
let userNames: string[] = users.map((user) => user.name);

// Calculate average age
let averageAge: number =
  users.reduce((sum, user) => sum + user.age, 0) / users.length;

// Find user by ID
function findUserById(id: number): User | undefined {
  return users.find((user) => user.id === id);
}
```

## 🏢 Object Types

### Basic Object Typing:

```typescript
// Inline object type
let user: { name: string; age: number; email: string } = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
};

// Object with optional properties
let product: {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional
  category?: string; // Optional
} = {
  id: 1,
  name: "Laptop",
  price: 999.99,
  // description and category are optional
};

// Object with readonly properties
let config: {
  readonly apiUrl: string;
  readonly version: string;
  debug: boolean;
} = {
  apiUrl: "https://api.example.com",
  version: "1.0.0",
  debug: false,
};

// config.apiUrl = "new-url"; // ❌ Error: readonly property
config.debug = true; // ✅ OK: not readonly
```

### Nested Objects:

```typescript
// Complex nested object structure
let customer: {
  id: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  preferences: {
    newsletter: boolean;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    theme: "light" | "dark";
  };
} = {
  id: 12345,
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-05-15",
  },
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    coordinates: {
      latitude: 40.7128,
      longitude: -74.006,
    },
  },
  preferences: {
    newsletter: true,
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    theme: "dark",
  },
};
```

### Index Signatures:

```typescript
// Objects with dynamic keys
let scores: { [studentName: string]: number } = {
  Alice: 95,
  Bob: 87,
  Charlie: 92,
};

scores["David"] = 88; // ✅ OK
scores["Eve"] = "A+"; // ❌ Error: string is not assignable to number

// More specific index signatures
let userSettings: { [key: string]: string | number | boolean } = {
  username: "alice123",
  age: 25,
  darkMode: true,
  lastLogin: "2024-01-15",
};

// Combining fixed and dynamic properties
let appConfig: {
  version: string; // Fixed property
  environment: "dev" | "prod"; // Fixed property
  [feature: string]: any; // Dynamic properties
} = {
  version: "1.0.0",
  environment: "dev",
  enableLogging: true,
  maxRetries: 3,
  apiEndpoints: ["users", "products"],
};
```

### Record Type:

```typescript
// Record<Keys, Type> for object types
type UserRole = "admin" | "user" | "moderator";
type RolePermissions = Record<UserRole, string[]>;

let permissions: RolePermissions = {
  admin: ["read", "write", "delete", "manage"],
  user: ["read"],
  moderator: ["read", "write"],
};

// Record with number keys
type ErrorMessages = Record<number, string>;
let httpErrors: ErrorMessages = {
  404: "Not Found",
  500: "Internal Server Error",
  401: "Unauthorized",
};

// Real-world example: API response cache
type CacheKey = string;
type ApiResponse = { data: any; timestamp: number };
let cache: Record<CacheKey, ApiResponse> = {};

function cacheResponse(key: string, data: any): void {
  cache[key] = { data, timestamp: Date.now() };
}
```

## 🔗 Combining Arrays and Objects

### Arrays of Objects:

```typescript
// E-commerce product catalog
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
  specifications: {
    [key: string]: string | number;
  };
  reviews: Array<{
    userId: number;
    rating: number;
    comment: string;
    date: string;
  }>;
}

let productCatalog: Product[] = [
  {
    id: 1,
    name: "Gaming Laptop",
    price: 1299.99,
    category: "Electronics",
    tags: ["gaming", "laptop", "high-performance"],
    specifications: {
      processor: "Intel i7",
      ram: "16GB",
      storage: "512GB SSD",
      graphics: "RTX 3060",
    },
    reviews: [
      {
        userId: 101,
        rating: 5,
        comment: "Excellent performance!",
        date: "2024-01-10",
      },
      {
        userId: 102,
        rating: 4,
        comment: "Great laptop, bit expensive",
        date: "2024-01-12",
      },
    ],
  },
];
```

### Objects with Arrays:

```typescript
// Social media post structure
interface SocialPost {
  id: number;
  author: {
    id: number;
    username: string;
    displayName: string;
    avatar: string;
  };
  content: {
    text: string;
    images: string[];
    videos: string[];
    links: Array<{
      url: string;
      title: string;
      description: string;
    }>;
  };
  engagement: {
    likes: number[]; // Array of user IDs who liked
    comments: Array<{
      id: number;
      userId: number;
      text: string;
      timestamp: string;
      replies: Array<{
        userId: number;
        text: string;
        timestamp: string;
      }>;
    }>;
    shares: number[]; // Array of user IDs who shared
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    tags: string[];
    visibility: "public" | "private" | "friends";
  };
}
```

## 🔧 Advanced Object Patterns

### Optional and Partial Types:

```typescript
interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  website: string;
  location: string;
}

// Partial makes all properties optional
function updateUserProfile(id: number, updates: Partial<UserProfile>): void {
  // Can update any subset of properties
  console.log(`Updating user ${id}:`, updates);
}

updateUserProfile(123, { bio: "New bio" });
updateUserProfile(123, { firstName: "John", lastName: "Doe" });

// Pick specific properties
type PublicProfile = Pick<UserProfile, "username" | "bio" | "website">;

// Omit specific properties
type CreateUserData = Omit<UserProfile, "id">;
```

### Required and Readonly:

```typescript
interface Config {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

// Make all properties required
type RequiredConfig = Required<Config>;

// Make all properties readonly
type ReadonlyConfig = Readonly<Config>;

// Combine modifiers
type FinalConfig = Readonly<Required<Config>>;

let appConfig: FinalConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  debug: false,
};

// appConfig.timeout = 10000; // ❌ Error: readonly property
```

## 🏗️ Real-World Examples

### E-commerce Shopping Cart:

```typescript
interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  selectedOptions: {
    size?: "S" | "M" | "L" | "XL";
    color?: string;
    customization?: string;
  };
}

interface ShoppingCart {
  userId: number;
  items: CartItem[];
  discounts: Array<{
    code: string;
    type: "percentage" | "fixed";
    value: number;
  }>;
  totals: {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    expiresAt: string;
  };
}

// Cart operations
function addToCart(cart: ShoppingCart, item: CartItem): ShoppingCart {
  const existingItemIndex = cart.items.findIndex(
    (cartItem) => cartItem.productId === item.productId
  );

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity += item.quantity;
  } else {
    cart.items.push(item);
  }

  return recalculateTotals(cart);
}

function removeFromCart(cart: ShoppingCart, productId: number): ShoppingCart {
  cart.items = cart.items.filter((item) => item.productId !== productId);
  return recalculateTotals(cart);
}

function recalculateTotals(cart: ShoppingCart): ShoppingCart {
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const discount = cart.discounts.reduce((sum, d) => {
    return (
      sum + (d.type === "percentage" ? subtotal * (d.value / 100) : d.value)
    );
  }, 0);

  cart.totals = {
    subtotal,
    tax,
    shipping,
    discount,
    total: subtotal + tax + shipping - discount,
  };

  cart.metadata.updatedAt = new Date().toISOString();

  return cart;
}
```

### API Response Handling:

```typescript
// Generic API response structure
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  metadata: {
    timestamp: string;
    requestId: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

// Specific data types
interface User {
  id: number;
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
}

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  tags: string[];
  publishedAt: string;
}

// API functions with proper typing
async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const response = await fetch("/api/users");
  return response.json();
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

async function createPost(
  postData: Omit<Post, "id" | "publishedAt">
): Promise<ApiResponse<Post>> {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  return response.json();
}

// Response handlers
function handleApiResponse<T>(response: ApiResponse<T>): T | null {
  if (response.success) {
    return response.data;
  } else {
    console.error("API Error:", response.errors);
    return null;
  }
}
```

## 📝 Practice Exercises

### Exercise 1: Product Inventory

Create types for a product inventory system:

```typescript
// Define interfaces for:
// 1. Product with id, name, price, category, stock quantity
// 2. Category with id, name, description
// 3. Inventory operation (add, remove, transfer)
// 4. Inventory report

// Then create functions to:
// - Add products to inventory
// - Update stock quantities
// - Generate low-stock reports
// - Calculate total inventory value
```

### Exercise 2: Student Grade System

Create a comprehensive grade tracking system:

```typescript
// Define interfaces for:
// 1. Student with personal info and enrolled courses
// 2. Course with details and enrolled students
// 3. Assignment with type, due date, and points
// 4. Grade with student, assignment, and score

// Then create functions to:
// - Calculate student GPA
// - Get course averages
// - Find students on academic probation
// - Generate transcript reports
```

### Exercise 3: Event Management

Design an event management system:

```typescript
// Define interfaces for:
// 1. Event with details, location, and attendees
// 2. Attendee with registration info
// 3. Venue with capacity and amenities
// 4. Registration with payment and preferences

// Then create functions to:
// - Register attendees for events
// - Check event capacity
// - Generate attendee lists
// - Calculate event revenue
```

## 🐛 Common Mistakes and Solutions

### 1. **Mixing Array Syntax**

```typescript
// ❌ Inconsistent
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// ✅ Consistent (pick one style)
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];
```

### 2. **Overly Complex Object Types**

```typescript
// ❌ Too complex inline
let user: {
    id: number;
    profile: {
        personal: {
            name: { first: string; last: string; middle?: string };
            contact: { email: string; phone?: string };
        };
        preferences: { theme: string; notifications: boolean[] };
    };
} = // ... very hard to read

// ✅ Use interfaces
interface UserName {
    first: string;
    last: string;
    middle?: string;
}

interface UserContact {
    email: string;
    phone?: string;
}

interface UserProfile {
    personal: {
        name: UserName;
        contact: UserContact;
    };
    preferences: {
        theme: string;
        notifications: boolean[];
    };
}

interface User {
    id: number;
    profile: UserProfile;
}
```

### 3. **Not Using Utility Types**

```typescript
// ❌ Manually creating similar types
interface CreateUser {
  name: string;
  email: string;
  age: number;
}

interface UpdateUser {
  name?: string;
  email?: string;
  age?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// ✅ Use utility types
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type CreateUser = Omit<User, "id">;
type UpdateUser = Partial<CreateUser>;
```

## 🎯 Best Practices

### 1. **Use Interfaces for Object Shapes**

```typescript
// ✅ Define clear interfaces
interface Product {
  id: number;
  name: string;
  price: number;
}

let products: Product[] = [];
```

### 2. **Make Optional Properties Explicit**

```typescript
// ✅ Clear optional properties
interface UserSettings {
  theme: "light" | "dark";
  notifications: boolean;
  language?: string; // Clearly optional
  timezone?: string; // Clearly optional
}
```

### 3. **Use Readonly for Immutable Data**

```typescript
// ✅ Protect important data
interface Config {
  readonly apiUrl: string;
  readonly version: string;
  debug: boolean; // Can be changed
}
```

### 4. **Leverage Utility Types**

```typescript
// ✅ Use built-in utility types
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

type UserUpdate = Partial<Pick<User, "name" | "email">>;
type PublicUser = Omit<User, "email">;
```

## 🌟 Key Takeaways

- **Array types** ensure homogeneous collections and safe operations
- **Object types** define clear data structures and expected properties
- **Optional properties** provide flexibility while maintaining type safety
- **Index signatures** handle dynamic object keys
- **Utility types** reduce code duplication and maintain consistency
- **Nested structures** can be complex but remain type-safe
- **Interfaces** make complex types readable and reusable

## 🚀 What's Next?

Now that you've mastered arrays and objects, we'll explore **Type Inference** - learning how TypeScript automatically determines types and when you need to be explicit vs when you can let TypeScript figure it out.

Remember: Well-typed data structures are the foundation of reliable applications!

---

💡 **Pro Tip**: Start with simple object and array types, then gradually add complexity. Use interfaces liberally - they make your code self-documenting and easier to maintain!
