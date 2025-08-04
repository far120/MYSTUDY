# Lesson 22: Testing with Types - Type-safe Testing 🧪

## 🎯 What You'll Learn

By the end of this lesson, you'll understand:

- How to write type-safe tests with Jest
- Creating typed test helpers and mocks
- Testing TypeScript interfaces and types
- Setting up a testing environment for TypeScript
- Best practices for testing typed code

## 🤔 Why Test TypeScript Code?

While TypeScript catches many errors at compile time, you still need tests to:

- Verify business logic works correctly
- Test runtime behavior
- Ensure API contracts are maintained
- Catch integration issues
- Document expected behavior

## 🛠️ Setting Up TypeScript Testing

### 1. **Install Testing Dependencies**

```bash
# Install Jest and TypeScript support
npm install --save-dev jest @types/jest ts-jest typescript

# Install additional testing utilities
npm install --save-dev @testing-library/jest-dom
```

### 2. **Configure Jest for TypeScript**

```json
// filepath: d:\React\02-TypeScript\jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts']
};
```

### 3. **TypeScript Configuration for Testing**

```json
// filepath: d:\React\02-TypeScript\tsconfig.test.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["jest", "node"]
  },
  "include": ["src/**/*", "**/__tests__/**/*", "**/*.test.ts", "**/*.spec.ts"]
}
```

## 🧪 Basic Type-Safe Testing

### 1. **Testing Functions with Types**

```typescript
// filepath: d:\React\02-TypeScript\src\math.ts
export type CalculationResult = {
  result: number;
  operation: string;
  operands: number[];
};

export function add(a: number, b: number): CalculationResult {
  return {
    result: a + b,
    operation: "addition",
    operands: [a, b],
  };
}

export function divide(a: number, b: number): CalculationResult {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return {
    result: a / b,
    operation: "division",
    operands: [a, b],
  };
}
```

```typescript
// filepath: d:\React\02-TypeScript\src\math.test.ts
import { add, divide, CalculationResult } from "./math";

describe("Math functions", () => {
  describe("add", () => {
    it("should add two numbers correctly", () => {
      // TypeScript ensures we call the function correctly
      const result: CalculationResult = add(2, 3);

      // TypeScript ensures we access properties correctly
      expect(result.result).toBe(5);
      expect(result.operation).toBe("addition");
      expect(result.operands).toEqual([2, 3]);
    });

    it("should handle negative numbers", () => {
      const result = add(-1, 5);
      expect(result.result).toBe(4);
    });
  });

  describe("divide", () => {
    it("should divide two numbers correctly", () => {
      const result = divide(10, 2);
      expect(result.result).toBe(5);
      expect(result.operation).toBe("division");
    });

    it("should throw error when dividing by zero", () => {
      // TypeScript ensures we handle errors properly
      expect(() => divide(10, 0)).toThrow("Division by zero");
    });
  });
});
```

### 2. **Testing Classes with Types**

```typescript
// filepath: d:\React\02-TypeScript\src\user.ts
export interface UserData {
  id: number;
  name: string;
  email: string;
  age: number;
}

export class User {
  private data: UserData;

  constructor(userData: UserData) {
    this.data = { ...userData };
  }

  getName(): string {
    return this.data.name;
  }

  getEmail(): string {
    return this.data.email;
  }

  updateName(newName: string): void {
    if (newName.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }
    this.data.name = newName;
  }

  isAdult(): boolean {
    return this.data.age >= 18;
  }

  toJSON(): UserData {
    return { ...this.data };
  }
}
```

```typescript
// filepath: d:\React\02-TypeScript\src\user.test.ts
import { User, UserData } from "./user";

describe("User class", () => {
  let userData: UserData;
  let user: User;

  beforeEach(() => {
    // TypeScript ensures we provide all required properties
    userData = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      age: 25,
    };
    user = new User(userData);
  });

  it("should create user with correct data", () => {
    expect(user.getName()).toBe("John Doe");
    expect(user.getEmail()).toBe("john@example.com");
    expect(user.isAdult()).toBe(true);
  });

  it("should update name correctly", () => {
    user.updateName("Jane Doe");
    expect(user.getName()).toBe("Jane Doe");
  });

  it("should throw error for empty name", () => {
    expect(() => user.updateName("")).toThrow("Name cannot be empty");
    expect(() => user.updateName("   ")).toThrow("Name cannot be empty");
  });

  it("should determine adult status correctly", () => {
    const adultUser = new User({ ...userData, age: 18 });
    const minorUser = new User({ ...userData, age: 17 });

    expect(adultUser.isAdult()).toBe(true);
    expect(minorUser.isAdult()).toBe(false);
  });

  it("should return correct JSON representation", () => {
    const json = user.toJSON();

    // TypeScript ensures the JSON matches UserData interface
    expect(json).toEqual(userData);
    expect(json).not.toBe(userData); // Should be a copy
  });
});
```

## 🎭 Mocking with Types

### 1. **Creating Typed Mocks**

```typescript
// filepath: d:\React\02-TypeScript\src\api.ts
export interface ApiClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: any): Promise<T>;
  delete(url: string): Promise<void>;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

export class BlogService {
  constructor(private api: ApiClient) {}

  async getPost(id: number): Promise<Post> {
    return this.api.get<Post>(`/posts/${id}`);
  }

  async createPost(post: Omit<Post, "id">): Promise<Post> {
    return this.api.post<Post>("/posts", post);
  }

  async deletePost(id: number): Promise<void> {
    return this.api.delete(`/posts/${id}`);
  }
}
```

```typescript
// filepath: d:\React\02-TypeScript\src\api.test.ts
import { BlogService, ApiClient, Post } from "./api";

// Create a typed mock
const createMockApiClient = (): jest.Mocked<ApiClient> => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
});

describe("BlogService", () => {
  let mockApi: jest.Mocked<ApiClient>;
  let blogService: BlogService;

  beforeEach(() => {
    mockApi = createMockApiClient();
    blogService = new BlogService(mockApi);
  });

  describe("getPost", () => {
    it("should fetch post by id", async () => {
      // TypeScript ensures our mock return value matches Post interface
      const mockPost: Post = {
        id: 1,
        title: "Test Post",
        content: "Test content",
        authorId: 123,
      };

      mockApi.get.mockResolvedValue(mockPost);

      const result = await blogService.getPost(1);

      expect(mockApi.get).toHaveBeenCalledWith("/posts/1");
      expect(result).toEqual(mockPost);
    });
  });

  describe("createPost", () => {
    it("should create new post", async () => {
      const newPost: Omit<Post, "id"> = {
        title: "New Post",
        content: "New content",
        authorId: 456,
      };

      const createdPost: Post = {
        id: 2,
        ...newPost,
      };

      mockApi.post.mockResolvedValue(createdPost);

      const result = await blogService.createPost(newPost);

      expect(mockApi.post).toHaveBeenCalledWith("/posts", newPost);
      expect(result).toEqual(createdPost);
    });
  });

  describe("deletePost", () => {
    it("should delete post by id", async () => {
      mockApi.delete.mockResolvedValue();

      await blogService.deletePost(1);

      expect(mockApi.delete).toHaveBeenCalledWith("/posts/1");
    });
  });
});
```

### 2. **Testing with Custom Matchers**

```typescript
// filepath: d:\React\02-TypeScript\src\test\matchers.ts
export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveValidEmail(): R;
      toBeValidUser(): R;
    }
  }
}

// Custom matcher for email validation
expect.extend({
  toHaveValidEmail(received: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);

    return {
      message: () =>
        `expected ${received} ${pass ? "not " : ""}to be a valid email`,
      pass,
    };
  },

  toBeValidUser(received: any) {
    const isValid =
      received &&
      typeof received.id === "number" &&
      typeof received.name === "string" &&
      typeof received.email === "string" &&
      typeof received.age === "number" &&
      received.age >= 0;

    return {
      message: () =>
        `expected ${received} ${isValid ? "not " : ""}to be a valid user`,
      pass: isValid,
    };
  },
});
```

```typescript
// filepath: d:\React\02-TypeScript\src\test/setup.ts
import "./matchers";
```

```typescript
// filepath: d:\React\02-TypeScript\src\validation.test.ts
import { User, UserData } from "./user";

describe("Custom matchers", () => {
  it("should validate emails", () => {
    expect("test@example.com").toHaveValidEmail();
    expect("invalid-email").not.toHaveValidEmail();
  });

  it("should validate user objects", () => {
    const validUser: UserData = {
      id: 1,
      name: "John",
      email: "john@example.com",
      age: 25,
    };

    const invalidUser = {
      id: 1,
      name: "John",
      // missing email and age
    };

    expect(validUser).toBeValidUser();
    expect(invalidUser).not.toBeValidUser();
  });
});
```

## 🏗️ Integration Testing

### 1. **Testing API Integration**

```typescript
// filepath: d:\React\02-TypeScript\src\integration.test.ts
import { BlogService, Post } from "./api";

// Real API client for integration testing
class RealApiClient {
  private baseUrl = "http://localhost:3001/api";

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  }

  async delete(url: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
  }
}

describe("BlogService Integration", () => {
  let blogService: BlogService;

  beforeAll(() => {
    blogService = new BlogService(new RealApiClient());
  });

  it("should create, fetch, and delete post", async () => {
    // Create post
    const newPost: Omit<Post, "id"> = {
      title: "Integration Test Post",
      content: "This is a test post",
      authorId: 1,
    };

    const createdPost = await blogService.createPost(newPost);
    expect(createdPost).toMatchObject(newPost);
    expect(typeof createdPost.id).toBe("number");

    // Fetch post
    const fetchedPost = await blogService.getPost(createdPost.id);
    expect(fetchedPost).toEqual(createdPost);

    // Delete post
    await blogService.deletePost(createdPost.id);

    // Verify deletion
    await expect(blogService.getPost(createdPost.id)).rejects.toThrow();
  });
});
```

## 🎯 Testing Best Practices

### 1. **Test Utilities and Helpers**

```typescript
// filepath: d:\React\02-TypeScript\src\test\helpers.ts
import { UserData, Post } from "../types";

// Factory functions for test data
export const createTestUser = (
  overrides: Partial<UserData> = {}
): UserData => ({
  id: 1,
  name: "Test User",
  email: "test@example.com",
  age: 25,
  ...overrides,
});

export const createTestPost = (overrides: Partial<Post> = {}): Post => ({
  id: 1,
  title: "Test Post",
  content: "Test content",
  authorId: 1,
  ...overrides,
});

// Type-safe test builders
export class UserBuilder {
  private userData: UserData = createTestUser();

  withId(id: number): this {
    this.userData.id = id;
    return this;
  }

  withName(name: string): this {
    this.userData.name = name;
    return this;
  }

  withEmail(email: string): this {
    this.userData.email = email;
    return this;
  }

  withAge(age: number): this {
    this.userData.age = age;
    return this;
  }

  build(): UserData {
    return { ...this.userData };
  }
}

// Usage in tests
export const aUser = () => new UserBuilder();
```

```typescript
// filepath: d:\React\02-TypeScript\src\builder.test.ts
import { aUser, createTestPost } from "./test/helpers";
import { User } from "./user";

describe("Test helpers", () => {
  it("should create test data easily", () => {
    // Using factory function
    const userData = createTestUser({ name: "Alice", age: 30 });
    const user = new User(userData);

    expect(user.getName()).toBe("Alice");
    expect(user.isAdult()).toBe(true);
  });

  it("should use builder pattern", () => {
    // Using builder pattern
    const userData = aUser()
      .withName("Bob")
      .withAge(17)
      .withEmail("bob@example.com")
      .build();

    const user = new User(userData);

    expect(user.getName()).toBe("Bob");
    expect(user.isAdult()).toBe(false);
  });
});
```

## 🏆 Testing Checklist

### ✅ Do This:

1. **Use TypeScript for all test files** - get type safety in tests
2. **Create typed test helpers** - make test data creation easier
3. **Mock external dependencies** - isolate units under test
4. **Test both happy and error paths** - cover all scenarios
5. **Use descriptive test names** - make intent clear

### ❌ Avoid This:

1. **Don't use `any` in tests** - defeats the purpose of TypeScript
2. **Don't test TypeScript compilation** - focus on runtime behavior
3. **Don't duplicate type checking** - let TypeScript handle types
4. **Don't ignore test type errors** - fix them properly

## 🎯 Key Takeaways

1. **TypeScript makes tests more reliable** by catching type errors
2. **Typed mocks prevent integration issues** between tests and code
3. **Custom matchers can encode domain knowledge** in tests
4. **Test helpers reduce boilerplate** and improve maintainability
5. **Integration tests verify TypeScript types work at runtime**

## 🚀 Next Steps

In the next lesson, we'll explore **Build Tools** - how to compile, bundle, and optimize your TypeScript code for production!

---

**Remember**: Type-safe tests are your safety net - they catch bugs that even TypeScript's compiler might miss! 🛡️
