# Lesson 21: Error Handling - Types for Error Management 🚨

## 🎯 What You'll Learn

By the end of this lesson, you'll understand:

- How to handle errors safely with TypeScript
- Creating custom error types
- Type-safe try-catch blocks
- Result patterns for error handling
- Best practices for error management

## 🤔 The Problem with JavaScript Error Handling

### JavaScript - Unpredictable Errors:

```javascript
// JavaScript - We don't know what errors might be thrown
function fetchUser(id) {
  if (id < 0) {
    throw "Invalid ID"; // String error
  }
  if (id === 999) {
    throw new Error("User not found"); // Error object
  }
  if (id === 1000) {
    throw { code: 404, message: "Not found" }; // Custom object
  }
  return { id, name: "John" };
}

// We have no idea what type of error we might catch
try {
  const user = fetchUser(-1);
} catch (error) {
  // error could be anything!
  console.log(error.message); // Might crash if error is a string
}
```

## 🛡️ TypeScript Solutions

### 1. **Basic Error Types**

```typescript
// Define what errors can occur
type UserError =
  | { type: "INVALID_ID"; message: string }
  | { type: "USER_NOT_FOUND"; id: number }
  | { type: "NETWORK_ERROR"; statusCode: number };

function fetchUser(id: number): { id: number; name: string } {
  if (id < 0) {
    throw new Error("Invalid ID provided");
  }
  if (id === 999) {
    throw new Error("User not found");
  }
  return { id, name: "John" };
}

// Type-safe error handling
try {
  const user = fetchUser(-1);
  console.log(user.name);
} catch (error) {
  // TypeScript knows this might be an Error
  if (error instanceof Error) {
    console.log("Error occurred:", error.message);
  }
}
```

### 2. **Custom Error Classes**

```typescript
// Create specific error types
class ValidationError extends Error {
  constructor(message: string, public field: string, public value: any) {
    super(message);
    this.name = "ValidationError";
  }
}

class NotFoundError extends Error {
  constructor(
    message: string,
    public resourceType: string,
    public id: string | number
  ) {
    super(message);
    this.name = "NotFoundError";
  }
}

class NetworkError extends Error {
  constructor(message: string, public statusCode: number, public url: string) {
    super(message);
    this.name = "NetworkError";
  }
}

// Usage with type safety
function validateUser(user: { name: string; age: number }): void {
  if (!user.name) {
    throw new ValidationError("Name is required", "name", user.name);
  }
  if (user.age < 0) {
    throw new ValidationError("Age must be positive", "age", user.age);
  }
}

// Type-safe error handling
try {
  validateUser({ name: "", age: -5 });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Validation failed for ${error.field}: ${error.message}`);
    console.log(`Invalid value: ${error.value}`);
  } else if (error instanceof NotFoundError) {
    console.log(`${error.resourceType} with ID ${error.id} not found`);
  } else if (error instanceof NetworkError) {
    console.log(`Network error (${error.statusCode}) at ${error.url}`);
  }
}
```

### 3. **Result Pattern (Recommended)**

```typescript
// Instead of throwing errors, return results
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Define specific error types
type UserFetchError =
  | { type: "INVALID_ID"; message: string }
  | { type: "NOT_FOUND"; id: number }
  | { type: "NETWORK_ERROR"; statusCode: number };

// Function that returns Result instead of throwing
function fetchUserSafe(
  id: number
): Result<{ id: number; name: string }, UserFetchError> {
  if (id < 0) {
    return {
      success: false,
      error: { type: "INVALID_ID", message: "ID must be positive" },
    };
  }

  if (id === 999) {
    return {
      success: false,
      error: { type: "NOT_FOUND", id },
    };
  }

  // Simulate network error
  if (id === 1000) {
    return {
      success: false,
      error: { type: "NETWORK_ERROR", statusCode: 500 },
    };
  }

  return {
    success: true,
    data: { id, name: "John Doe" },
  };
}

// Type-safe usage
const result = fetchUserSafe(999);

if (result.success) {
  // TypeScript knows this is the data
  console.log(`User found: ${result.data.name}`);
} else {
  // TypeScript knows this is an error
  switch (result.error.type) {
    case "INVALID_ID":
      console.log("Invalid ID:", result.error.message);
      break;
    case "NOT_FOUND":
      console.log(`User ${result.error.id} not found`);
      break;
    case "NETWORK_ERROR":
      console.log(`Network error: ${result.error.statusCode}`);
      break;
  }
}
```

### 4. **Async Error Handling**

```typescript
// Async functions with proper error types
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

type ApiError = {
  message: string;
  status: number;
  code: string;
};

async function fetchUserAsync(
  id: number
): Promise<Result<ApiResponse<User>, ApiError>> {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      return {
        success: false,
        error: {
          message: "Failed to fetch user",
          status: response.status,
          code: "FETCH_ERROR",
        },
      };
    }

    const userData = await response.json();
    return {
      success: true,
      data: {
        data: userData,
        status: response.status,
        message: "User fetched successfully",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error instanceof Error ? error.message : "Unknown error",
        status: 0,
        code: "NETWORK_ERROR",
      },
    };
  }
}

// Usage
async function handleUser() {
  const result = await fetchUserAsync(123);

  if (result.success) {
    console.log("User:", result.data.data);
  } else {
    console.log("Error:", result.error.message);

    // Handle specific error types
    if (result.error.status === 404) {
      console.log("User not found");
    } else if (result.error.status === 500) {
      console.log("Server error");
    }
  }
}
```

## 🏗️ Real-World Example: Form Validation

```typescript
// Complete form validation with typed errors
interface User {
  name: string;
  email: string;
  age: number;
  password: string;
}

type ValidationError = {
  field: keyof User;
  message: string;
  value: any;
};

type ValidationResult = Result<User, ValidationError[]>;

function validateUser(input: Partial<User>): ValidationResult {
  const errors: ValidationError[] = [];

  // Name validation
  if (!input.name || input.name.trim().length < 2) {
    errors.push({
      field: "name",
      message: "Name must be at least 2 characters",
      value: input.name,
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email)) {
    errors.push({
      field: "email",
      message: "Please provide a valid email",
      value: input.email,
    });
  }

  // Age validation
  if (!input.age || input.age < 13 || input.age > 120) {
    errors.push({
      field: "age",
      message: "Age must be between 13 and 120",
      value: input.age,
    });
  }

  // Password validation
  if (!input.password || input.password.length < 8) {
    errors.push({
      field: "password",
      message: "Password must be at least 8 characters",
      value: input.password ? "***" : undefined,
    });
  }

  if (errors.length > 0) {
    return { success: false, error: errors };
  }

  return {
    success: true,
    data: input as User, // We know it's valid now
  };
}

// Usage in a form handler
function handleFormSubmit(formData: Partial<User>) {
  const result = validateUser(formData);

  if (result.success) {
    console.log("Valid user:", result.data);
    // Proceed with saving user
  } else {
    console.log("Validation errors:");
    result.error.forEach((err) => {
      console.log(`- ${err.field}: ${err.message}`);
    });

    // Show errors in UI
    showFormErrors(result.error);
  }
}

function showFormErrors(errors: ValidationError[]) {
  errors.forEach((error) => {
    const field = document.getElementById(error.field);
    if (field) {
      field.classList.add("error");
      // Show error message
    }
  });
}
```

## 🎯 Practice Exercises

### Exercise 1: Basic Error Handling

Create a calculator with proper error handling:

```typescript
type CalculatorError =
  | { type: "DIVISION_BY_ZERO" }
  | { type: "INVALID_NUMBER"; value: any }
  | { type: "OVERFLOW"; result: number };

function safeDivide(a: number, b: number): Result<number, CalculatorError> {
  // Your implementation here
}

// Test cases
console.log(safeDivide(10, 2)); // Should succeed
console.log(safeDivide(10, 0)); // Should fail with DIVISION_BY_ZERO
```

### Exercise 2: API Error Handling

Create a type-safe API client:

```typescript
type Post = {
  id: number;
  title: string;
  content: string;
  authorId: number;
};

type ApiError = {
  status: number;
  message: string;
  timestamp: string;
};

async function createPost(
  post: Omit<Post, "id">
): Promise<Result<Post, ApiError>> {
  // Your implementation here
}
```

## 🏆 Best Practices

### ✅ Do This:

1. **Use Result patterns** for expected failures
2. **Create specific error types** for different scenarios
3. **Always handle errors explicitly** - don't ignore them
4. **Use type guards** to check error types
5. **Document what errors your functions can produce**

### ❌ Avoid This:

1. **Don't use `any` for errors** - be specific
2. **Don't throw strings** - use Error objects
3. **Don't ignore error cases** - handle them properly
4. **Don't make error handling overly complex** - keep it simple

## 🎯 Key Takeaways

1. **TypeScript helps you handle errors predictably**
2. **Result patterns are safer than throwing exceptions**
3. **Custom error types make debugging easier**
4. **Type guards help you handle different error types**
5. **Always be explicit about what can go wrong**

## 🚀 Next Steps

In the next lesson, we'll learn about **Testing with Types** - how to write type-safe tests that catch bugs before they reach production!

---

**Remember**: Good error handling is the difference between a crashed application and a professional user experience! 🛡️
