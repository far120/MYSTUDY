# Lesson 24: Best Practices - Professional TypeScript Patterns 🏆

## 🎯 What You'll Learn

By the end of this lesson, you'll understand:

- Professional coding patterns and conventions
- How to structure large TypeScript projects
- Code organization and architectural principles
- Performance optimization techniques
- Team collaboration best practices
- Common anti-patterns to avoid

## 💼 Professional Project Structure

### 1. **Scalable Folder Organization**

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   ├── forms/           # Form-specific components
│   └── layout/          # Layout components
├── pages/               # Page-level components
├── services/            # API and business logic
├── hooks/               # Custom React hooks (if using React)
├── utils/               # Pure utility functions
├── types/               # Type definitions
│   ├── api.ts          # API response types
│   ├── domain.ts       # Business domain types
│   └── common.ts       # Shared types
├── constants/           # Application constants
├── config/              # Configuration files
├── assets/              # Static assets
└── __tests__/           # Test files
```

### 2. **Type Organization Strategy**

```typescript
// filepath: d:\React\02-TypeScript\src\types\domain.ts
// Business domain types - the heart of your application

// User domain
export interface User {
  readonly id: string;
  readonly email: string;
  readonly profile: UserProfile;
  readonly permissions: Permission[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface UserProfile {
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar?: string;
  readonly bio?: string;
}

// Product domain
export interface Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: Money;
  readonly category: Category;
  readonly inventory: Inventory;
  readonly createdAt: Date;
}

export interface Money {
  readonly amount: number;
  readonly currency: CurrencyCode;
}

export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY";

// Enums for controlled values
export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}
```

```typescript
// filepath: d:\React\02-TypeScript\src\types\api.ts
// API-specific types

export interface ApiResponse<T> {
  readonly data: T;
  readonly message: string;
  readonly success: boolean;
  readonly timestamp: string;
}

export interface PaginatedResponse<T> {
  readonly data: T[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
  };
}

export interface ApiError {
  readonly message: string;
  readonly code: string;
  readonly details?: Record<string, any>;
}

// Request types
export interface CreateUserRequest {
  readonly email: string;
  readonly password: string;
  readonly profile: Omit<UserProfile, "avatar">;
}

export interface UpdateUserRequest {
  readonly profile?: Partial<UserProfile>;
  readonly email?: string;
}
```

## 🏗️ Architectural Patterns

### 1. **Repository Pattern**

```typescript
// filepath: d:\React\02-TypeScript\src\services\repositories\user-repository.ts
import { User, CreateUserRequest, UpdateUserRequest } from "@/types/domain";
import { ApiResponse, PaginatedResponse } from "@/types/api";

// Abstract interface defines the contract
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(page: number, limit: number): Promise<PaginatedResponse<User>>;
  create(userData: CreateUserRequest): Promise<User>;
  update(id: string, userData: UpdateUserRequest): Promise<User>;
  delete(id: string): Promise<void>;
}

// Concrete implementation
export class ApiUserRepository implements UserRepository {
  constructor(private apiClient: ApiClient) {}

  async findById(id: string): Promise<User | null> {
    try {
      const response = await this.apiClient.get<ApiResponse<User>>(
        `/users/${id}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof NotFoundError) {
        return null;
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const response = await this.apiClient.get<ApiResponse<User[]>>("/users", {
      params: { email },
    });
    return response.data[0] || null;
  }

  async findAll(page: number, limit: number): Promise<PaginatedResponse<User>> {
    const response = await this.apiClient.get<PaginatedResponse<User>>(
      "/users",
      {
        params: { page, limit },
      }
    );
    return response;
  }

  async create(userData: CreateUserRequest): Promise<User> {
    const response = await this.apiClient.post<ApiResponse<User>>(
      "/users",
      userData
    );
    return response.data;
  }

  async update(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await this.apiClient.patch<ApiResponse<User>>(
      `/users/${id}`,
      userData
    );
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete(`/users/${id}`);
  }
}
```

### 2. **Service Layer Pattern**

```typescript
// filepath: d:\React\02-TypeScript\src\services\user-service.ts
import { UserRepository } from "./repositories/user-repository";
import { User, CreateUserRequest } from "@/types/domain";
import { ValidationError, BusinessLogicError } from "@/utils/errors";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private emailService: EmailService
  ) {}

  async createUser(userData: CreateUserRequest): Promise<User> {
    // Business logic and validation
    await this.validateUserData(userData);
    await this.ensureEmailIsUnique(userData.email);

    // Hash password
    const hashedPassword = await this.passwordService.hash(userData.password);

    // Create user
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // Send welcome email
    await this.emailService.sendWelcomeEmail(
      user.email,
      user.profile.firstName
    );

    return user;
  }

  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found", "User", userId);
    }
    return user;
  }

  private async validateUserData(userData: CreateUserRequest): Promise<void> {
    const errors: ValidationError[] = [];

    if (!userData.email || !this.isValidEmail(userData.email)) {
      errors.push(
        new ValidationError("Invalid email format", "email", userData.email)
      );
    }

    if (!userData.password || userData.password.length < 8) {
      errors.push(
        new ValidationError(
          "Password must be at least 8 characters",
          "password"
        )
      );
    }

    if (!userData.profile.firstName?.trim()) {
      errors.push(new ValidationError("First name is required", "firstName"));
    }

    if (errors.length > 0) {
      throw new BusinessLogicError("Validation failed", errors);
    }
  }

  private async ensureEmailIsUnique(email: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BusinessLogicError("Email already exists", "email");
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
```

### 3. **Dependency Injection Pattern**

```typescript
// filepath: d:\React\02-TypeScript\src\container.ts
// Simple dependency injection container

interface Container {
  get<T>(token: string): T;
  register<T>(token: string, factory: () => T): void;
}

class DIContainer implements Container {
  private dependencies = new Map<string, () => any>();

  register<T>(token: string, factory: () => T): void {
    this.dependencies.set(token, factory);
  }

  get<T>(token: string): T {
    const factory = this.dependencies.get(token);
    if (!factory) {
      throw new Error(`Dependency ${token} not found`);
    }
    return factory();
  }
}

// Setup dependencies
export const container = new DIContainer();

// Register dependencies
container.register("ApiClient", () => new ApiClient(config.apiUrl));
container.register(
  "UserRepository",
  () => new ApiUserRepository(container.get("ApiClient"))
);
container.register("PasswordService", () => new PasswordService());
container.register("EmailService", () => new EmailService(config.emailConfig));
container.register(
  "UserService",
  () =>
    new UserService(
      container.get("UserRepository"),
      container.get("PasswordService"),
      container.get("EmailService")
    )
);
```

## 🎯 Advanced TypeScript Patterns

### 1. **Builder Pattern with Types**

```typescript
// filepath: d:\React\02-TypeScript\src\builders\query-builder.ts
interface QueryOptions {
  readonly select?: string[];
  readonly where?: Record<string, any>;
  readonly orderBy?: { field: string; direction: "asc" | "desc" }[];
  readonly limit?: number;
  readonly offset?: number;
}

export class QueryBuilder {
  private options: QueryOptions = {};

  select(...fields: string[]): this {
    this.options = { ...this.options, select: fields };
    return this;
  }

  where(conditions: Record<string, any>): this {
    this.options = {
      ...this.options,
      where: { ...this.options.where, ...conditions },
    };
    return this;
  }

  orderBy(field: string, direction: "asc" | "desc" = "asc"): this {
    const orderBy = this.options.orderBy || [];
    this.options = {
      ...this.options,
      orderBy: [...orderBy, { field, direction }],
    };
    return this;
  }

  limit(count: number): this {
    this.options = { ...this.options, limit: count };
    return this;
  }

  offset(count: number): this {
    this.options = { ...this.options, offset: count };
    return this;
  }

  build(): QueryOptions {
    return { ...this.options };
  }

  toString(): string {
    // Convert to SQL query string
    const { select, where, orderBy, limit, offset } = this.options;

    let query = "SELECT ";
    query += select?.join(", ") || "*";
    query += " FROM table";

    if (where) {
      const conditions = Object.entries(where)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(" AND ");
      query += ` WHERE ${conditions}`;
    }

    if (orderBy) {
      const orderClauses = orderBy
        .map(({ field, direction }) => `${field} ${direction.toUpperCase()}`)
        .join(", ");
      query += ` ORDER BY ${orderClauses}`;
    }

    if (limit) {
      query += ` LIMIT ${limit}`;
    }

    if (offset) {
      query += ` OFFSET ${offset}`;
    }

    return query;
  }
}

// Usage
const query = new QueryBuilder()
  .select("id", "name", "email")
  .where({ active: true, role: "admin" })
  .orderBy("name", "asc")
  .limit(10)
  .build();
```

### 2. **State Management Pattern**

```typescript
// filepath: d:\React\02-TypeScript\src\state\store.ts
// Type-safe state management

type StateListener<T> = (state: T) => void;

interface Store<T> {
  getState(): T;
  setState(newState: Partial<T>): void;
  subscribe(listener: StateListener<T>): () => void; // Returns unsubscribe function
}

export class TypedStore<T> implements Store<T> {
  private state: T;
  private listeners: Set<StateListener<T>> = new Set();

  constructor(initialState: T) {
    this.state = { ...initialState };
  }

  getState(): T {
    return { ...this.state };
  }

  setState(newState: Partial<T>): void {
    const prevState = this.state;
    this.state = { ...this.state, ...newState };

    // Notify all listeners
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (error) {
        console.error('Error in state listener:', error);
      }
    });
  }

  subscribe(listener: StateListener<T>): () => void {
    this.listeners.add(listener);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }
}

// Application state interface
interface AppState {
  user: User | null;
  isLoading: boolean;
  errors: string[];
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

// Create typed store
export const appStore = new TypedStore<AppState>({
  user: null,
  isLoading: false,
  errors: [],
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true
  }
});

// Actions for state management
export const actions = {
  setUser: (user: User | null) => {
    appStore.setState({ user });
  },

  setLoading: (isLoading: boolean) => {
    appStore.setState({ isLoading });
  },

  addError: (error: string) => {
    const currentErrors = appStore.getState().errors;
    appStore.setState({ errors: [...currentErrors, error] });
  },

  clearErrors: () => {
    appStore.<!-- filepath: d:\React\02-TypeScript\lessons\24-best-practices.md -->
# Lesson 24: Best Practices - Professional TypeScript Patterns 🏆

## 🎯 What You'll Learn

By the end of this lesson, you'll understand:
- Professional coding patterns and conventions
- How to structure large TypeScript projects
- Code organization and architectural principles
- Performance optimization techniques
- Team collaboration best practices
- Common anti-patterns to avoid

## 💼 Professional Project Structure

### 1. **Scalable Folder Organization**

```

src/
├── components/ # Reusable UI components
│ ├── common/ # Shared components
│ ├── forms/ # Form-specific components
│ └── layout/ # Layout components
├── pages/ # Page-level components
├── services/ # API and business logic
├── hooks/ # Custom React hooks (if using React)
├── utils/ # Pure utility functions
├── types/ # Type definitions
│ ├── api.ts # API response types
│ ├── domain.ts # Business domain types
│ └── common.ts # Shared types
├── constants/ # Application constants
├── config/ # Configuration files
├── assets/ # Static assets
└── **tests**/ # Test files

````

### 2. **Type Organization Strategy**

```typescript
// filepath: d:\React\02-TypeScript\src\types\domain.ts
// Business domain types - the heart of your application

// User domain
export interface User {
  readonly id: string;
  readonly email: string;
  readonly profile: UserProfile;
  readonly permissions: Permission[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface UserProfile {
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar?: string;
  readonly bio?: string;
}

// Product domain
export interface Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: Money;
  readonly category: Category;
  readonly inventory: Inventory;
  readonly createdAt: Date;
}

export interface Money {
  readonly amount: number;
  readonly currency: CurrencyCode;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

// Enums for controlled values
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}
````

```typescript
// filepath: d:\React\02-TypeScript\src\types\api.ts
// API-specific types

export interface ApiResponse<T> {
  readonly data: T;
  readonly message: string;
  readonly success: boolean;
  readonly timestamp: string;
}

export interface PaginatedResponse<T> {
  readonly data: T[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
  };
}

export interface ApiError {
  readonly message: string;
  readonly code: string;
  readonly details?: Record<string, any>;
}

// Request types
export interface CreateUserRequest {
  readonly email: string;
  readonly password: string;
  readonly profile: Omit<UserProfile, "avatar">;
}

export interface UpdateUserRequest {
  readonly profile?: Partial<UserProfile>;
  readonly email?: string;
}
```

## 🏗️ Architectural Patterns

### 1. **Repository Pattern**

```typescript
// filepath: d:\React\02-TypeScript\src\services\repositories\user-repository.ts
import { User, CreateUserRequest, UpdateUserRequest } from "@/types/domain";
import { ApiResponse, PaginatedResponse } from "@/types/api";

// Abstract interface defines the contract
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(page: number, limit: number): Promise<PaginatedResponse<User>>;
  create(userData: CreateUserRequest): Promise<User>;
  update(id: string, userData: UpdateUserRequest): Promise<User>;
  delete(id: string): Promise<void>;
}

// Concrete implementation
export class ApiUserRepository implements UserRepository {
  constructor(private apiClient: ApiClient) {}

  async findById(id: string): Promise<User | null> {
    try {
      const response = await this.apiClient.get<ApiResponse<User>>(
        `/users/${id}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof NotFoundError) {
        return null;
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const response = await this.apiClient.get<ApiResponse<User[]>>("/users", {
      params: { email },
    });
    return response.data[0] || null;
  }

  async findAll(page: number, limit: number): Promise<PaginatedResponse<User>> {
    const response = await this.apiClient.get<PaginatedResponse<User>>(
      "/users",
      {
        params: { page, limit },
      }
    );
    return response;
  }

  async create(userData: CreateUserRequest): Promise<User> {
    const response = await this.apiClient.post<ApiResponse<User>>(
      "/users",
      userData
    );
    return response.data;
  }

  async update(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await this.apiClient.patch<ApiResponse<User>>(
      `/users/${id}`,
      userData
    );
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete(`/users/${id}`);
  }
}
```

### 2. **Service Layer Pattern**

```typescript
// filepath: d:\React\02-TypeScript\src\services\user-service.ts
import { UserRepository } from "./repositories/user-repository";
import { User, CreateUserRequest } from "@/types/domain";
import { ValidationError, BusinessLogicError } from "@/utils/errors";

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private emailService: EmailService
  ) {}

  async createUser(userData: CreateUserRequest): Promise<User> {
    // Business logic and validation
    await this.validateUserData(userData);
    await this.ensureEmailIsUnique(userData.email);

    // Hash password
    const hashedPassword = await this.passwordService.hash(userData.password);

    // Create user
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // Send welcome email
    await this.emailService.sendWelcomeEmail(
      user.email,
      user.profile.firstName
    );

    return user;
  }

  async getUserProfile(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found", "User", userId);
    }
    return user;
  }

  private async validateUserData(userData: CreateUserRequest): Promise<void> {
    const errors: ValidationError[] = [];

    if (!userData.email || !this.isValidEmail(userData.email)) {
      errors.push(
        new ValidationError("Invalid email format", "email", userData.email)
      );
    }

    if (!userData.password || userData.password.length < 8) {
      errors.push(
        new ValidationError(
          "Password must be at least 8 characters",
          "password"
        )
      );
    }

    if (!userData.profile.firstName?.trim()) {
      errors.push(new ValidationError("First name is required", "firstName"));
    }

    if (errors.length > 0) {
      throw new BusinessLogicError("Validation failed", errors);
    }
  }

  private async ensureEmailIsUnique(email: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BusinessLogicError("Email already exists", "email");
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
```

### 3. **Dependency Injection Pattern**

```typescript
// filepath: d:\React\02-TypeScript\src\container.ts
// Simple dependency injection container

interface Container {
  get<T>(token: string): T;
  register<T>(token: string, factory: () => T): void;
}

class DIContainer implements Container {
  private dependencies = new Map<string, () => any>();

  register<T>(token: string, factory: () => T): void {
    this.dependencies.set(token, factory);
  }

  get<T>(token: string): T {
    const factory = this.dependencies.get(token);
    if (!factory) {
      throw new Error(`Dependency ${token} not found`);
    }
    return factory();
  }
}

// Setup dependencies
export const container = new DIContainer();

// Register dependencies
container.register("ApiClient", () => new ApiClient(config.apiUrl));
container.register(
  "UserRepository",
  () => new ApiUserRepository(container.get("ApiClient"))
);
container.register("PasswordService", () => new PasswordService());
container.register("EmailService", () => new EmailService(config.emailConfig));
container.register(
  "UserService",
  () =>
    new UserService(
      container.get("UserRepository"),
      container.get("PasswordService"),
      container.get("EmailService")
    )
);
```

## 🎯 Advanced TypeScript Patterns

### 1. **Builder Pattern with Types**

```typescript
// filepath: d:\React\02-TypeScript\src\builders\query-builder.ts
interface QueryOptions {
  readonly select?: string[];
  readonly where?: Record<string, any>;
  readonly orderBy?: { field: string; direction: "asc" | "desc" }[];
  readonly limit?: number;
  readonly offset?: number;
}

export class QueryBuilder {
  private options: QueryOptions = {};

  select(...fields: string[]): this {
    this.options = { ...this.options, select: fields };
    return this;
  }

  where(conditions: Record<string, any>): this {
    this.options = {
      ...this.options,
      where: { ...this.options.where, ...conditions },
    };
    return this;
  }

  orderBy(field: string, direction: "asc" | "desc" = "asc"): this {
    const orderBy = this.options.orderBy || [];
    this.options = {
      ...this.options,
      orderBy: [...orderBy, { field, direction }],
    };
    return this;
  }

  limit(count: number): this {
    this.options = { ...this.options, limit: count };
    return this;
  }

  offset(count: number): this {
    this.options = { ...this.options, offset: count };
    return this;
  }

  build(): QueryOptions {
    return { ...this.options };
  }

  toString(): string {
    // Convert to SQL query string
    const { select, where, orderBy, limit, offset } = this.options;

    let query = "SELECT ";
    query += select?.join(", ") || "*";
    query += " FROM table";

    if (where) {
      const conditions = Object.entries(where)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(" AND ");
      query += ` WHERE ${conditions}`;
    }

    if (orderBy) {
      const orderClauses = orderBy
        .map(({ field, direction }) => `${field} ${direction.toUpperCase()}`)
        .join(", ");
      query += ` ORDER BY ${orderClauses}`;
    }

    if (limit) {
      query += ` LIMIT ${limit}`;
    }

    if (offset) {
      query += ` OFFSET ${offset}`;
    }

    return query;
  }
}

// Usage
const query = new QueryBuilder()
  .select("id", "name", "email")
  .where({ active: true, role: "admin" })
  .orderBy("name", "asc")
  .limit(10)
  .build();
```

### 2. **State Management Pattern**

```typescript
// filepath: d:\React\02-TypeScript\src\state\store.ts
// Type-safe state management

type StateListener<T> = (state: T) => void;

interface Store<T> {
  getState(): T;
  setState(newState: Partial<T>): void;
  subscribe(listener: StateListener<T>): () => void; // Returns unsubscribe function
}

export class TypedStore<T> implements Store<T> {
  private state: T;
  private listeners: Set<StateListener<T>> = new Set();

  constructor(initialState: T) {
    this.state = { ...initialState };
  }

  getState(): T {
    return { ...this.state };
  }

  setState(newState: Partial<T>): void {
    const prevState = this.state;
    this.state = { ...this.state, ...newState };

    // Notify all listeners
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (error) {
        console.error('Error in state listener:', error);
      }
    });
  }

  subscribe(listener: StateListener<T>): () => void {
    this.listeners.add(listener);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }
}

// Application state interface
interface AppState {
  user: User | null;
  isLoading: boolean;
  errors: string[];
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

// Create typed store
export const appStore = new TypedStore<AppState>({
  user: null,
  isLoading: false,
  errors: [],
  preferences: {
    theme: 'light',
    language: 'en',
    notifications: true
  }
});

// Actions for state management
export const actions = {
  setUser: (user: User | null) => {
    appStore.setState({ user });
  },

  setLoading: (isLoading: boolean) => {
    appStore.setState({ isLoading });
  },

  addError: (error: string) => {
    const currentErrors = appStore.getState().errors;
    appStore.setState({ errors:
```
