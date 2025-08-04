# Type Aliases - Creating Custom Types 🏷️

**Master Custom Types!** Type aliases allow you to create custom names for any type, making your code more readable and maintainable. Learn when to use type aliases vs interfaces and how to build complex type systems.

## 🎯 Learning Objectives

By the end of this lesson, you will:

- Understand what type aliases are and when to use them
- Create type aliases for primitive types, unions, and complex structures
- Know the differences between type aliases and interfaces
- Use type aliases for function types and generic patterns
- Build scalable type systems with aliases

---

## 🤔 What Are Type Aliases?

A **type alias** creates a new name for an existing type. Think of it as creating a shortcut or nickname for types that you use frequently.

### The Problem: Repetitive Complex Types

```typescript
// Without type aliases - repetitive and hard to maintain
function processUser(user: {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}): {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
} {
  return user;
}

function updateUser(
  id: number,
  updates: { name?: string; email?: string; role?: "admin" | "user" | "guest" }
): {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
} | null {
  // Implementation here
  return null;
}

// What if we need to change the user structure? Update it everywhere! 😱
```

### The Solution: Type Aliases

```typescript
// With type aliases - clean, maintainable, reusable
type UserRole = "admin" | "user" | "guest";

type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

type UserUpdates = {
  name?: string;
  email?: string;
  role?: UserRole;
};

function processUser(user: User): User {
  return user;
}

function updateUser(id: number, updates: UserUpdates): User | null {
  // Implementation here
  return null;
}

// Now changes are centralized and easy to maintain! 🎉
```

---

## 🏷️ Basic Type Aliases

### Primitive Type Aliases:

```typescript
// Aliases for primitive types (for semantic meaning)
type UserId = number;
type Username = string;
type Email = string;
type Password = string;
type Timestamp = number;

// Usage makes code more self-documenting
function createUser(
  id: UserId,
  username: Username,
  email: Email,
  password: Password
): void {
  const createdAt: Timestamp = Date.now();
  console.log(`User ${username} created at ${createdAt}`);
}

// Compare this clarity:
createUser(123, "alice", "alice@example.com", "secret123");

// vs generic types:
// function createUser(id: number, username: string, email: string, password: string)
```

### Union Type Aliases:

```typescript
// Common union types
type Status = "pending" | "approved" | "rejected" | "cancelled";
type Theme = "light" | "dark" | "auto";
type Size = "small" | "medium" | "large" | "extra-large";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Using union type aliases
type ApiRequest = {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
};

type OrderStatus = {
  orderId: string;
  status: Status;
  updatedAt: Date;
};

function makeApiRequest(request: ApiRequest): Promise<any> {
  console.log(`Making ${request.method} request to ${request.url}`);
  // Implementation here
  return Promise.resolve({});
}

function updateOrderStatus(orderId: string, newStatus: Status): OrderStatus {
  return {
    orderId,
    status: newStatus,
    updatedAt: new Date(),
  };
}

// Usage
const apiCall: ApiRequest = {
  url: "/api/users",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: { name: "Alice" },
};

makeApiRequest(apiCall);

const order = updateOrderStatus("order-123", "approved");
console.log(order);
```

---

## 🔧 Complex Type Aliases

### Object Type Aliases:

```typescript
// Complex object structures
type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type ContactInfo = {
  email: string;
  phone?: string;
  address?: Address;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
};

type Person = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  contactInfo: ContactInfo;
  preferences: {
    theme: Theme;
    notifications: boolean;
    language: string;
  };
};

// Using complex type aliases
const person: Person = {
  id: 1,
  firstName: "Alice",
  lastName: "Johnson",
  dateOfBirth: new Date("1990-05-15"),
  contactInfo: {
    email: "alice@example.com",
    phone: "+1-555-0123",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA",
    },
    socialMedia: {
      github: "alice-codes",
      linkedin: "alice-johnson",
    },
  },
  preferences: {
    theme: "dark",
    notifications: true,
    language: "en",
  },
};

function formatPersonInfo(person: Person): string {
  const { firstName, lastName, contactInfo } = person;
  let info = `${firstName} ${lastName} (${contactInfo.email})`;

  if (contactInfo.phone) {
    info += `\nPhone: ${contactInfo.phone}`;
  }

  if (contactInfo.address) {
    const addr = contactInfo.address;
    info += `\nAddress: ${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}`;
  }

  return info;
}

console.log(formatPersonInfo(person));
```

### Array and Function Type Aliases:

```typescript
// Array type aliases
type NumberList = number[];
type StringList = string[];
type UserList = User[];
type StatusHistory = { status: Status; timestamp: Date; notes?: string }[];

// Function type aliases
type EventHandler = (event: string, data: any) => void;
type Validator<T> = (value: T) => boolean;
type Transformer<T, U> = (input: T) => U;
type AsyncProcessor<T> = (data: T) => Promise<void>;

// Using function type aliases
type StringValidator = Validator<string>;
type NumberTransformer = Transformer<string, number>;
type UserProcessor = AsyncProcessor<User>;

const emailValidator: StringValidator = (email) => {
  return email.includes("@") && email.includes(".");
};

const stringToNumber: NumberTransformer = (str) => {
  const num = parseInt(str, 10);
  return isNaN(num) ? 0 : num;
};

const processUser: UserProcessor = async (user) => {
  console.log(`Processing user: ${user.name}`);
  // Simulate async processing
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log(`User ${user.name} processed`);
};

// Usage examples
console.log(emailValidator("alice@example.com")); // true
console.log(emailValidator("invalid-email")); // false

console.log(stringToNumber("123")); // 123
console.log(stringToNumber("abc")); // 0

// processUser({ id: 1, name: "Alice", email: "alice@example.com", role: "user" });
```

---

## ⚖️ Type Aliases vs Interfaces

Understanding when to use type aliases vs interfaces is crucial:

### When to Use Type Aliases:

```typescript
// 1. Union types (interfaces can't do this)
type Status = "loading" | "success" | "error";
type ID = string | number;

// 2. Primitive type aliases for semantic meaning
type Email = string;
type Price = number;

// 3. Function types
type EventCallback = (event: string) => void;

// 4. Computed/conditional types (advanced)
type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};

// 5. Tuple types
type Coordinates = [number, number];
type RGB = [number, number, number];
```

### When to Use Interfaces:

```typescript
// 1. Object shapes that might be extended
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
}

// 2. Class contracts
interface Drawable {
  draw(): void;
}

class Circle implements Drawable {
  draw(): void {
    console.log("Drawing circle");
  }
}

// 3. Declaration merging (advanced feature)
interface Window {
  myCustomProperty: string;
}

// Later in another file:
interface Window {
  anotherProperty: number;
}
// Now Window has both properties!
```

### Side-by-Side Comparison:

```typescript
// Type alias approach
type UserType = {
  id: number;
  name: string;
  email: string;
};

type AdminUserType = UserType & {
  permissions: string[];
};

// Interface approach
interface UserInterface {
  id: number;
  name: string;
  email: string;
}

interface AdminUserInterface extends UserInterface {
  permissions: string[];
}

// Both work similarly for basic object typing!
// Choose based on your specific needs and team preferences
```

---

## 🔄 Generic Type Aliases

Type aliases can be generic, making them reusable for different types:

### Basic Generic Type Aliases:

```typescript
// Generic type aliases
type Result<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type ApiResponse<T> = {
  status: number;
  message: string;
  payload: T;
  timestamp: Date;
};

type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

// Using generic type aliases
type UserResult = Result<User>;
type UserListResult = Result<User[]>;
type StringResult = Result<string>;

function fetchUser(id: number): UserResult {
  // Simulate API call
  if (id > 0) {
    return {
      success: true,
      data: {
        id,
        name: "Alice",
        email: "alice@example.com",
        role: "user",
      },
    };
  } else {
    return {
      success: false,
      error: "Invalid user ID",
    };
  }
}

function handleUserResult(result: UserResult): void {
  if (result.success && result.data) {
    console.log(`User: ${result.data.name}`);
  } else {
    console.error(`Error: ${result.error}`);
  }
}

// API response examples
type ProductsApiResponse = ApiResponse<Product[]>;
type UserApiResponse = ApiResponse<User>;

const productsResponse: ProductsApiResponse = {
  status: 200,
  message: "Products retrieved successfully",
  payload: [
    {
      id: 1,
      name: "Laptop",
      price: 999,
      category: "Electronics",
      inStock: true,
    },
    {
      id: 2,
      name: "Phone",
      price: 699,
      category: "Electronics",
      inStock: true,
    },
  ],
  timestamp: new Date(),
};

// Nullable and optional examples
type UserId = Nullable<number>; // number | null
type UserName = Optional<string>; // string | undefined
type UserEmail = Maybe<string>; // string | null | undefined

function findUser(id: UserId): Maybe<User> {
  if (id === null) {
    return null;
  }
  // Search logic here
  return undefined; // Not found
}
```

### Advanced Generic Patterns:

```typescript
// Utility type aliases
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// Custom utility types
type RequiredKeys<T> = {
  [K in keyof T]-?: T[K];
};

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Usage examples
type PartialUser = Partial<User>; // All properties optional
type UserBasics = Pick<User, "id" | "name">; // Only id and name
type StatusCounts = Record<Status, number>; // { pending: number, approved: number, etc. }

const userUpdates: PartialUser = {
  name: "Alice Smith", // Only updating name
};

const userBasics: UserBasics = {
  id: 1,
  name: "Alice",
  // email and role not needed
};

const statusCounts: StatusCounts = {
  pending: 5,
  approved: 23,
  rejected: 2,
  cancelled: 1,
};
```

---

## 🎮 Hands-On Exercises

### Exercise 1: E-commerce Type System

Create a comprehensive type system for an e-commerce platform:

```typescript
// Your task: Create type aliases for an e-commerce system

// 1. Basic types
type ProductId = // string or number?
type CategoryId = // string or number?
type Price = // number with currency info?

// 2. Status types
type OrderStatus = // "pending" | "processing" | "shipped" | "delivered" | "cancelled"
type PaymentStatus = // "pending" | "completed" | "failed" | "refunded"

// 3. Product system
type Product = {
    // id, name, price, category, inStock, description?, images?
};

type ProductCategory = {
    // id, name, description, parentCategory?
};

// 4. Order system
type OrderItem = {
    // product, quantity, priceAtTime
};

type Order = {
    // id, customerId, items, status, paymentStatus, total, createdAt, shippedAt?
};

// 5. Customer system
type Customer = {
    // id, name, email, addresses, orderHistory
};

// Test your types by creating sample data
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: E-commerce Type System

// 1. Basic types
type ProductId = string;
type CategoryId = string;
type CustomerId = string;
type OrderId = string;

type Price = {
  amount: number;
  currency: string;
};

// 2. Status types
type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

// 3. Product system
type Product = {
  id: ProductId;
  name: string;
  price: Price;
  category: CategoryId;
  inStock: boolean;
  description?: string;
  images?: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
};

type ProductCategory = {
  id: CategoryId;
  name: string;
  description: string;
  parentCategory?: CategoryId;
  subcategories?: CategoryId[];
};

// 4. Order system
type OrderItem = {
  product: Product;
  quantity: number;
  priceAtTime: Price; // Price when ordered (for historical accuracy)
};

type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type Order = {
  id: OrderId;
  customerId: CustomerId;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: Price;
  shippingAddress: ShippingAddress;
  createdAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  notes?: string;
};

// 5. Customer system
type Customer = {
  id: CustomerId;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addresses: ShippingAddress[];
  orderHistory: OrderId[];
  createdAt: Date;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    preferredPaymentMethod?: string;
  };
};

// 6. Helper types
type OrderSummary = Pick<Order, "id" | "total" | "status" | "createdAt">;
type ProductSummary = Pick<Product, "id" | "name" | "price" | "inStock">;
type CustomerSummary = Pick<
  Customer,
  "id" | "firstName" | "lastName" | "email"
>;

// Sample data
const sampleProduct: Product = {
  id: "prod-001",
  name: "Wireless Headphones",
  price: { amount: 199.99, currency: "USD" },
  category: "cat-electronics",
  inStock: true,
  description: "High-quality wireless headphones with noise cancellation",
  images: ["headphones-1.jpg", "headphones-2.jpg"],
  weight: 0.3,
};

const sampleOrder: Order = {
  id: "order-001",
  customerId: "cust-001",
  items: [
    {
      product: sampleProduct,
      quantity: 1,
      priceAtTime: { amount: 199.99, currency: "USD" },
    },
  ],
  status: "pending",
  paymentStatus: "pending",
  total: { amount: 199.99, currency: "USD" },
  shippingAddress: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "USA",
  },
  createdAt: new Date(),
};

console.log("Sample product:", sampleProduct);
console.log("Sample order:", sampleOrder);
```

</details>

### Exercise 2: Event System Types

```typescript
// Create a type system for an event management platform

// 1. Basic event types
type EventId = // string
type UserId = // string
type VenueId = // string

// 2. Event categories and types
type EventCategory = // "conference" | "workshop" | "webinar" | "meetup" | "party"
type EventStatus = // "draft" | "published" | "cancelled" | "completed"

// 3. Event structure
type Event = {
    // id, title, description, category, status, organizer, venue?, startDate, endDate, maxAttendees?
};

// 4. Attendee and registration
type AttendeeStatus = // "registered" | "confirmed" | "attended" | "no-show"
type Registration = {
    // userId, eventId, status, registeredAt, notes?
};

// 5. Venue information
type Venue = {
    // id, name, address, capacity, amenities?
};

// Implement functions that use these types
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Event System Types

// 1. Basic types
type EventId = string;
type UserId = string;
type VenueId = string;
type RegistrationId = string;

// 2. Status and category types
type EventCategory = "conference" | "workshop" | "webinar" | "meetup" | "party";
type EventStatus = "draft" | "published" | "cancelled" | "completed";
type AttendeeStatus = "registered" | "confirmed" | "attended" | "no-show";

// 3. Address and contact types
type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type ContactInfo = {
  email: string;
  phone?: string;
  website?: string;
};

// 4. Event structure
type Event = {
  id: EventId;
  title: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  organizerId: UserId;
  venueId?: VenueId;
  startDate: Date;
  endDate: Date;
  maxAttendees?: number;
  price?: {
    amount: number;
    currency: string;
  };
  tags?: string[];
  requirements?: string[];
  createdAt: Date;
  updatedAt: Date;
};

// 5. Registration system
type Registration = {
  id: RegistrationId;
  userId: UserId;
  eventId: EventId;
  status: AttendeeStatus;
  registeredAt: Date;
  confirmedAt?: Date;
  attendedAt?: Date;
  notes?: string;
  specialRequests?: string;
};

// 6. Venue system
type Venue = {
  id: VenueId;
  name: string;
  address: Address;
  capacity: number;
  contactInfo: ContactInfo;
  amenities?: string[];
  accessibility?: {
    wheelchairAccessible: boolean;
    parkingAvailable: boolean;
    publicTransport: boolean;
  };
  pricing?: {
    hourlyRate: number;
    currency: string;
  };
};

// 7. User/Organizer
type User = {
  id: UserId;
  firstName: string;
  lastName: string;
  email: string;
  contactInfo?: ContactInfo;
  bio?: string;
  profileImage?: string;
};

// 8. Helper types
type EventSummary = Pick<
  Event,
  "id" | "title" | "category" | "startDate" | "status"
>;
type RegistrationSummary = Pick<
  Registration,
  "id" | "userId" | "status" | "registeredAt"
>;

// 9. Response types
type EventRegistrationResult = {
  success: boolean;
  registration?: Registration;
  error?: string;
  waitlisted?: boolean;
};

type EventSearchFilter = {
  category?: EventCategory;
  status?: EventStatus;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  maxPrice?: number;
};

// Sample implementation
function createEvent(
  eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
): Event {
  return {
    ...eventData,
    id: `event-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function registerForEvent(
  userId: UserId,
  eventId: EventId
): EventRegistrationResult {
  // Implementation would check capacity, status, etc.
  const registration: Registration = {
    id: `reg-${Date.now()}`,
    userId,
    eventId,
    status: "registered",
    registeredAt: new Date(),
  };

  return {
    success: true,
    registration,
  };
}

// Sample data
const sampleEvent: Event = createEvent({
  title: "TypeScript Workshop",
  description: "Learn TypeScript from zero to hero",
  category: "workshop",
  status: "published",
  organizerId: "user-001",
  startDate: new Date("2024-02-15T09:00:00"),
  endDate: new Date("2024-02-15T17:00:00"),
  maxAttendees: 50,
  price: { amount: 99, currency: "USD" },
  tags: ["typescript", "programming", "web-development"],
});

console.log("Sample event:", sampleEvent);
```

</details>

---

## 🎯 Key Takeaways

After completing this lesson, you should understand:

### ✅ Type Alias Fundamentals:

- **Create custom names** for any type combination
- **Improve code readability** with semantic type names
- **Centralize type definitions** for easier maintenance
- **Build complex type systems** from simple building blocks

### ✅ When to Use Type Aliases:

- **Union types** - `type Status = "pending" | "approved"`
- **Function types** - `type Handler = (data: any) => void`
- **Primitive aliases** - `type UserId = string`
- **Complex object structures** - reusable across modules

### ✅ Type Aliases vs Interfaces:

- **Type aliases**: Better for unions, primitives, computed types
- **Interfaces**: Better for object shapes, extension, declaration merging
- **Both**: Can often be used interchangeably for object types

### ✅ Best Practices:

- **Use descriptive names** - `UserRole` not `UR`
- **Group related types** - keep them organized
- **Prefer type aliases for unions** - cleaner syntax
- **Use generics** for reusable type patterns

---

## 🚀 What's Next?

Congratulations! You've mastered TypeScript type aliases. You now know how to:

- ✅ **Create custom type names** for better code organization
- ✅ **Use union types effectively** for restricted value sets
- ✅ **Build complex type systems** with reusable components
- ✅ **Choose between type aliases and interfaces** appropriately
- ✅ **Apply generic patterns** for flexible type definitions

**Next Lesson**: `09-optional-properties.md` - Deep dive into optional properties, null handling, and making your types flexible for real-world use!

---

_Remember: Type aliases are about making your code more expressive and maintainable. Good type names serve as documentation and make your intentions clear to other developers!_ 🏷️
