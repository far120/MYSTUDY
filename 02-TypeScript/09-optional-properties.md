# Optional Properties - Making Things Flexible 🔧

**Master Flexible Type Design!** Optional properties are essential for real-world applications where not all data is always present. Learn how to handle missing data, default values, and create flexible APIs that work in various scenarios.

## 🎯 Learning Objectives

By the end of this lesson, you will:

- Master optional properties with `?` syntax
- Handle null and undefined values safely
- Create flexible APIs with optional parameters
- Use default values and destructuring with optional properties
- Build robust applications that handle missing data gracefully

---

## 🤔 Why Optional Properties Matter

In real applications, data is often incomplete or varies by context. Optional properties let you model this reality while maintaining type safety.

### The Problem: Rigid Required Properties

```typescript
// Rigid interface - everything required
interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // Always required? What if user doesn't have phone?
  address: string; // Always required? What about users without addresses?
  profilePicture: string; // Always required? What about default avatars?
  bio: string; // Always required? What about new users?
}

// This becomes problematic:
const newUser: UserProfile = {
  id: 1,
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@example.com",
  phone: "", // Forced to provide empty string
  address: "", // Forced to provide empty string
  profilePicture: "", // Forced to provide empty string
  bio: "", // Forced to provide empty string
};

// What about imported users from systems with different data?
// What about user registration where some fields come later?
```

### The Solution: Optional Properties

```typescript
// Flexible interface - some properties optional
interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // Optional - user might not have phone
  address?: string; // Optional - might be provided later
  profilePicture?: string; // Optional - can use default avatar
  bio?: string; // Optional - can be added later
}

// Much more flexible and realistic:
const newUser: UserProfile = {
  id: 1,
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@example.com",
  // No need to provide optional properties
};

const completeUser: UserProfile = {
  id: 2,
  firstName: "Bob",
  lastName: "Smith",
  email: "bob@example.com",
  phone: "+1-555-0123",
  address: "123 Main St",
  profilePicture: "https://example.com/bob.jpg",
  bio: "Software developer who loves TypeScript",
};

// Both are valid! 🎉
```

---

## ❓ Optional Property Syntax and Usage

### Basic Optional Properties:

```typescript
interface Product {
  id: number;
  name: string;
  price: number;

  // Optional properties
  description?: string;
  category?: string;
  tags?: string[];
  discount?: {
    percentage: number;
    validUntil: Date;
  };

  // Nested optional properties
  inventory?: {
    inStock: boolean;
    quantity?: number;
    warehouse?: string;
  };
}

// All these are valid products:
const basicProduct: Product = {
  id: 1,
  name: "Laptop",
  price: 999,
};

const detailedProduct: Product = {
  id: 2,
  name: "Gaming Mouse",
  price: 79.99,
  description: "High-precision gaming mouse with RGB lighting",
  category: "Gaming",
  tags: ["gaming", "mouse", "rgb"],
  discount: {
    percentage: 15,
    validUntil: new Date("2024-12-31"),
  },
  inventory: {
    inStock: true,
    quantity: 150,
    warehouse: "West Coast",
  },
};

function displayProduct(product: Product): string {
  let display = `${product.name} - $${product.price}`;

  if (product.description) {
    display += `\nDescription: ${product.description}`;
  }

  if (product.category) {
    display += `\nCategory: ${product.category}`;
  }

  if (product.tags && product.tags.length > 0) {
    display += `\nTags: ${product.tags.join(", ")}`;
  }

  if (product.discount) {
    display += `\nDiscount: ${product.discount.percentage}% off`;
  }

  if (product.inventory) {
    display += `\nIn Stock: ${product.inventory.inStock}`;
    if (product.inventory.quantity !== undefined) {
      display += ` (${product.inventory.quantity} available)`;
    }
  }

  return display;
}

console.log(displayProduct(basicProduct));
console.log("\n" + displayProduct(detailedProduct));
```

### Optional Function Parameters:

```typescript
// Optional parameters in functions
function createUser(
  firstName: string,
  lastName: string,
  email: string,
  age?: number, // Optional parameter
  phoneNumber?: string, // Optional parameter
  address?: {
    // Optional complex parameter
    street: string;
    city: string;
    zipCode: string;
  }
): UserProfile {
  const user: UserProfile = {
    id: Math.floor(Math.random() * 10000),
    firstName,
    lastName,
    email,
  };

  // Handle optional parameters
  if (age !== undefined) {
    user.age = age;
  }

  if (phoneNumber) {
    user.phone = phoneNumber;
  }

  if (address) {
    user.address = `${address.street}, ${address.city}, ${address.zipCode}`;
  }

  return user;
}

// All these calls are valid:
const user1 = createUser("Alice", "Johnson", "alice@example.com");

const user2 = createUser("Bob", "Smith", "bob@example.com", 30);

const user3 = createUser(
  "Charlie",
  "Brown",
  "charlie@example.com",
  25,
  "+1-555-0123",
  {
    street: "123 Oak St",
    city: "Somewhere",
    zipCode: "12345",
  }
);

console.log("User 1:", user1);
console.log("User 2:", user2);
console.log("User 3:", user3);
```

---

## 🛡️ Handling Optional Properties Safely

### Type Guards and Checking:

```typescript
interface BlogPost {
  id: number;
  title: string;
  content: string;
  publishedAt?: Date;
  author?: {
    name: string;
    email: string;
    bio?: string;
  };
  tags?: string[];
  metadata?: {
    wordCount?: number;
    readingTime?: number;
    featured?: boolean;
  };
}

function formatBlogPost(post: BlogPost): string {
  let formatted = `# ${post.title}\n\n${post.content}`;

  // Safe checking for optional properties
  if (post.publishedAt) {
    formatted += `\n\nPublished: ${post.publishedAt.toDateString()}`;
  }

  // Check nested optional properties
  if (post.author) {
    formatted += `\n\nBy: ${post.author.name}`;
    if (post.author.bio) {
      formatted += `\nBio: ${post.author.bio}`;
    }
  }

  // Check optional arrays
  if (post.tags && post.tags.length > 0) {
    formatted += `\n\nTags: ${post.tags.join(", ")}`;
  }

  // Check nested optional properties
  if (post.metadata) {
    if (post.metadata.readingTime) {
      formatted += `\n\nReading time: ${post.metadata.readingTime} minutes`;
    }
    if (post.metadata.featured) {
      formatted += `\n\n⭐ Featured Article`;
    }
  }

  return formatted;
}

// Sample blog posts
const draftPost: BlogPost = {
  id: 1,
  title: "Getting Started with TypeScript",
  content: "TypeScript is a powerful superset of JavaScript...",
  // No optional properties - it's a draft
};

const publishedPost: BlogPost = {
  id: 2,
  title: "Advanced TypeScript Patterns",
  content: "In this post, we'll explore advanced TypeScript patterns...",
  publishedAt: new Date("2024-01-15"),
  author: {
    name: "Alice Johnson",
    email: "alice@example.com",
    bio: "TypeScript enthusiast and software engineer",
  },
  tags: ["typescript", "programming", "web-development"],
  metadata: {
    wordCount: 1250,
    readingTime: 5,
    featured: true,
  },
};

console.log("Draft Post:");
console.log(formatBlogPost(draftPost));
console.log("\n" + "=" * 50 + "\n");
console.log("Published Post:");
console.log(formatBlogPost(publishedPost));
```

### Using Logical Operators:

```typescript
interface Settings {
  theme?: "light" | "dark" | "auto";
  language?: string;
  notifications?: {
    email?: boolean;
    push?: boolean;
    frequency?: "immediate" | "daily" | "weekly";
  };
  privacy?: {
    profileVisible?: boolean;
    analyticsEnabled?: boolean;
  };
}

function applySettings(settings: Settings): void {
  // Using logical OR for defaults
  const theme = settings.theme || "light";
  const language = settings.language || "en";

  console.log(`Applying theme: ${theme}`);
  console.log(`Language: ${language}`);

  // Using optional chaining (TypeScript 3.7+)
  const emailNotifications = settings.notifications?.email ?? true;
  const pushNotifications = settings.notifications?.push ?? false;
  const frequency = settings.notifications?.frequency ?? "daily";

  console.log(`Email notifications: ${emailNotifications}`);
  console.log(`Push notifications: ${pushNotifications}`);
  console.log(`Notification frequency: ${frequency}`);

  // Nested optional checking
  const profileVisible = settings.privacy?.profileVisible ?? true;
  const analyticsEnabled = settings.privacy?.analyticsEnabled ?? false;

  console.log(`Profile visible: ${profileVisible}`);
  console.log(`Analytics enabled: ${analyticsEnabled}`);
}

// Test with various setting combinations
const minimalSettings: Settings = {};

const partialSettings: Settings = {
  theme: "dark",
  notifications: {
    email: false,
  },
};

const completeSettings: Settings = {
  theme: "auto",
  language: "es",
  notifications: {
    email: true,
    push: true,
    frequency: "immediate",
  },
  privacy: {
    profileVisible: false,
    analyticsEnabled: true,
  },
};

console.log("Minimal Settings:");
applySettings(minimalSettings);

console.log("\nPartial Settings:");
applySettings(partialSettings);

console.log("\nComplete Settings:");
applySettings(completeSettings);
```

---

## 🎯 Default Values and Destructuring

### Destructuring with Default Values:

```typescript
interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
  auth?: {
    type: "bearer" | "basic";
    token?: string;
    username?: string;
    password?: string;
  };
}

function makeApiCall(config: ApiConfig): Promise<any> {
  // Destructuring with default values
  const {
    baseUrl,
    timeout = 5000, // Default timeout
    retries = 3, // Default retries
    headers = {}, // Default empty headers
    auth,
  } = config;

  console.log(`Making API call to: ${baseUrl}`);
  console.log(`Timeout: ${timeout}ms`);
  console.log(`Max retries: ${retries}`);
  console.log(`Headers:`, headers);

  // Handle optional auth
  if (auth) {
    const {
      type,
      token = "", // Default empty token
      username = "", // Default empty username
      password = "", // Default empty password
    } = auth;

    console.log(`Auth type: ${type}`);
    if (type === "bearer" && token) {
      console.log(`Using bearer token: ${token.substring(0, 10)}...`);
    } else if (type === "basic" && username) {
      console.log(`Using basic auth for user: ${username}`);
    }
  }

  // Simulate API call
  return Promise.resolve({ status: 200, data: "Success" });
}

// Various configuration examples
const minimalConfig: ApiConfig = {
  baseUrl: "https://api.example.com",
};

const configWithTimeout: ApiConfig = {
  baseUrl: "https://api.example.com",
  timeout: 10000,
};

const fullConfig: ApiConfig = {
  baseUrl: "https://api.example.com",
  timeout: 8000,
  retries: 5,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "MyApp/1.0",
  },
  auth: {
    type: "bearer",
    token: "abc123def456ghi789",
  },
};

// Test configurations
console.log("Minimal Config:");
makeApiCall(minimalConfig);

console.log("\nConfig with Timeout:");
makeApiCall(configWithTimeout);

console.log("\nFull Config:");
makeApiCall(fullConfig);
```

### Function Overloads with Optional Parameters:

```typescript
interface SearchOptions {
  query: string;
  filters?: {
    category?: string;
    priceRange?: {
      min?: number;
      max?: number;
    };
    inStock?: boolean;
    rating?: number;
  };
  sorting?: {
    field: "name" | "price" | "rating" | "date";
    direction: "asc" | "desc";
  };
  pagination?: {
    page?: number;
    limit?: number;
  };
}

interface SearchResult {
  products: Product[];
  totalCount: number;
  page: number;
  totalPages: number;
}

function searchProducts(options: SearchOptions): SearchResult {
  const {
    query,
    filters = {},
    sorting = { field: "name", direction: "asc" },
    pagination = { page: 1, limit: 10 },
  } = options;

  console.log(`Searching for: "${query}"`);

  // Handle optional filters
  const { category, priceRange = {}, inStock, rating } = filters;

  if (category) console.log(`Category filter: ${category}`);
  if (priceRange.min !== undefined)
    console.log(`Min price: $${priceRange.min}`);
  if (priceRange.max !== undefined)
    console.log(`Max price: $${priceRange.max}`);
  if (inStock !== undefined) console.log(`In stock only: ${inStock}`);
  if (rating !== undefined) console.log(`Min rating: ${rating}`);

  // Handle pagination with defaults
  const { page = 1, limit = 10 } = pagination;

  console.log(`Page: ${page}, Limit: ${limit}`);
  console.log(`Sorting by: ${sorting.field} (${sorting.direction})`);

  // Simulate search results
  return {
    products: [],
    totalCount: 0,
    page,
    totalPages: 0,
  };
}

// Different search scenarios
const basicSearch: SearchOptions = {
  query: "laptop",
};

const filteredSearch: SearchOptions = {
  query: "gaming laptop",
  filters: {
    category: "Electronics",
    priceRange: {
      min: 500,
      max: 2000,
    },
    inStock: true,
  },
};

const complexSearch: SearchOptions = {
  query: "wireless headphones",
  filters: {
    category: "Audio",
    priceRange: { max: 300 },
    rating: 4,
  },
  sorting: {
    field: "price",
    direction: "desc",
  },
  pagination: {
    page: 2,
    limit: 20,
  },
};

console.log("Basic Search:");
searchProducts(basicSearch);

console.log("\nFiltered Search:");
searchProducts(filteredSearch);

console.log("\nComplex Search:");
searchProducts(complexSearch);
```

---

## 🎮 Hands-On Exercises

### Exercise 1: User Profile Management

Create a flexible user profile system with optional properties:

```typescript
// Your task: Create interfaces for a user profile system

interface UserProfile {
  // Required: id, email, createdAt
  // Optional: firstName, lastName, dateOfBirth, phone, address, avatar, bio, preferences
}

interface Address {
  // Required: street, city, country
  // Optional: state, zipCode, apartment
}

interface UserPreferences {
  // Optional: theme, language, notifications, privacy, accessibility
}

interface NotificationSettings {
  // Optional: email, push, sms, frequency
}

// Create functions that work with these optional properties:
function createUserProfile(
  email: string,
  options?: Partial<UserProfile>
): UserProfile {
  // Implementation here
}

function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): UserProfile | null {
  // Implementation here
}

function getUserDisplayName(user: UserProfile): string {
  // Return full name if available, otherwise email
}

// Test your implementation
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: User Profile Management

interface Address {
  street: string;
  city: string;
  country: string;
  state?: string;
  zipCode?: string;
  apartment?: string;
}

interface NotificationSettings {
  email?: boolean;
  push?: boolean;
  sms?: boolean;
  frequency?: "immediate" | "daily" | "weekly" | "never";
}

interface UserPreferences {
  theme?: "light" | "dark" | "auto";
  language?: string;
  timezone?: string;
  notifications?: NotificationSettings;
  privacy?: {
    profileVisible?: boolean;
    showEmail?: boolean;
    showPhone?: boolean;
  };
  accessibility?: {
    highContrast?: boolean;
    fontSize?: "small" | "medium" | "large";
    screenReader?: boolean;
  };
}

interface UserProfile {
  id: string;
  email: string;
  createdAt: Date;

  // Optional personal information
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  phone?: string;
  address?: Address;
  avatar?: string;
  bio?: string;

  // Optional preferences
  preferences?: UserPreferences;

  // Optional metadata
  lastLoginAt?: Date;
  isActive?: boolean;
  emailVerified?: boolean;
}

// In-memory storage for demo
const users: UserProfile[] = [];
let nextUserId = 1;

function createUserProfile(
  email: string,
  options: Partial<Omit<UserProfile, "id" | "email" | "createdAt">> = {}
): UserProfile {
  const user: UserProfile = {
    id: `user-${nextUserId++}`,
    email,
    createdAt: new Date(),
    ...options,
  };

  users.push(user);
  return user;
}

function updateUserProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, "id" | "createdAt">>
): UserProfile | null {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) return null;

  const user = users[userIndex];

  // Deep merge for nested objects
  if (updates.preferences && user.preferences) {
    updates.preferences = {
      ...user.preferences,
      ...updates.preferences,
      // Handle nested notification settings
      ...(updates.preferences.notifications && {
        notifications: {
          ...user.preferences.notifications,
          ...updates.preferences.notifications,
        },
      }),
    };
  }

  users[userIndex] = { ...user, ...updates };
  return users[userIndex];
}

function getUserDisplayName(user: UserProfile): string {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  } else if (user.firstName) {
    return user.firstName;
  } else if (user.lastName) {
    return user.lastName;
  } else {
    return user.email;
  }
}

function formatUserProfile(user: UserProfile): string {
  let profile = `User: ${getUserDisplayName(user)} (${user.email})`;
  profile += `\nCreated: ${user.createdAt.toDateString()}`;

  if (user.dateOfBirth) {
    const age = new Date().getFullYear() - user.dateOfBirth.getFullYear();
    profile += `\nAge: ${age}`;
  }

  if (user.phone) {
    profile += `\nPhone: ${user.phone}`;
  }

  if (user.address) {
    profile += `\nAddress: ${user.address.street}, ${user.address.city}`;
    if (user.address.state) profile += `, ${user.address.state}`;
    profile += `, ${user.address.country}`;
  }

  if (user.bio) {
    profile += `\nBio: ${user.bio}`;
  }

  if (user.preferences?.theme) {
    profile += `\nTheme: ${user.preferences.theme}`;
  }

  if (user.lastLoginAt) {
    profile += `\nLast login: ${user.lastLoginAt.toDateString()}`;
  }

  return profile;
}

// Test the implementation
const user1 = createUserProfile("alice@example.com");
console.log("Basic user:");
console.log(formatUserProfile(user1));

const user2 = createUserProfile("bob@example.com", {
  firstName: "Bob",
  lastName: "Smith",
  dateOfBirth: new Date("1990-06-15"),
  phone: "+1-555-0123",
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    country: "USA",
    zipCode: "12345",
  },
  bio: "Software engineer passionate about TypeScript",
  preferences: {
    theme: "dark",
    language: "en",
    notifications: {
      email: true,
      push: false,
      frequency: "daily",
    },
  },
});

console.log("\nComplete user:");
console.log(formatUserProfile(user2));

// Update user profile
updateUserProfile(user1.id, {
  firstName: "Alice",
  lastName: "Johnson",
  preferences: {
    theme: "light",
    notifications: {
      email: false,
      push: true,
    },
  },
});

console.log("\nUpdated user:");
console.log(formatUserProfile(users[0]));
```

</details>

### Exercise 2: Form Builder System

```typescript
// Create a flexible form builder system with optional validation

interface FormField {
  // Required: id, type, label
  // Optional: placeholder, defaultValue, required, validation, helpText
}

interface ValidationRule {
  // Required: type
  // Optional: min, max, pattern, message, custom
}

interface FormConfig {
  // Required: title, fields
  // Optional: description, submitText, cancelText, styling, behavior
}

// Create functions to work with forms
function createForm(config: FormConfig): Form {
  // Implementation
}

function validateField(field: FormField, value: any): ValidationResult {
  // Implementation
}

function validateForm(
  form: Form,
  data: Record<string, any>
): FormValidationResult {
  // Implementation
}

// Test your form system
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Form Builder System

type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "select"
  | "checkbox"
  | "textarea"
  | "date";
type ValidationType =
  | "required"
  | "minLength"
  | "maxLength"
  | "pattern"
  | "email"
  | "number"
  | "custom";

interface ValidationRule {
  type: ValidationType;
  min?: number;
  max?: number;
  pattern?: RegExp;
  message?: string;
  custom?: (value: any) => boolean | string;
}

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: any;
  required?: boolean;
  validation?: ValidationRule[];
  helpText?: string;
  options?: { value: any; label: string }[]; // For select fields
  disabled?: boolean;
}

interface FormStyling {
  theme?: "default" | "modern" | "minimal";
  layout?: "vertical" | "horizontal" | "grid";
  spacing?: "compact" | "normal" | "relaxed";
}

interface FormBehavior {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  showErrorsInline?: boolean;
  resetAfterSubmit?: boolean;
}

interface FormConfig {
  title: string;
  fields: FormField[];
  description?: string;
  submitText?: string;
  cancelText?: string;
  styling?: FormStyling;
  behavior?: FormBehavior;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface FormValidationResult {
  isValid: boolean;
  fieldErrors: Record<string, string[]>;
  generalErrors?: string[];
}

interface Form {
  config: FormConfig;
  data: Record<string, any>;
  errors: Record<string, string[]>;
  isValid: boolean;
}

function createForm(config: FormConfig): Form {
  const data: Record<string, any> = {};

  // Initialize form data with default values
  config.fields.forEach((field) => {
    if (field.defaultValue !== undefined) {
      data[field.id] = field.defaultValue;
    } else {
      // Set appropriate default based on field type
      switch (field.type) {
        case "checkbox":
          data[field.id] = false;
          break;
        case "number":
          data[field.id] = 0;
          break;
        default:
          data[field.id] = "";
      }
    }
  });

  return {
    config,
    data,
    errors: {},
    isValid: false,
  };
}

function validateField(field: FormField, value: any): ValidationResult {
  const errors: string[] = [];

  // Required validation
  if (
    field.required &&
    (value === undefined || value === null || value === "")
  ) {
    errors.push(`${field.label} is required`);
    return { isValid: false, errors };
  }

  // Skip other validations if field is empty and not required
  if (
    !field.required &&
    (value === undefined || value === null || value === "")
  ) {
    return { isValid: true, errors: [] };
  }

  // Apply validation rules
  if (field.validation) {
    for (const rule of field.validation) {
      switch (rule.type) {
        case "minLength":
          if (
            typeof value === "string" &&
            rule.min &&
            value.length < rule.min
          ) {
            errors.push(
              rule.message ||
                `${field.label} must be at least ${rule.min} characters`
            );
          }
          break;

        case "maxLength":
          if (
            typeof value === "string" &&
            rule.max &&
            value.length > rule.max
          ) {
            errors.push(
              rule.message ||
                `${field.label} cannot exceed ${rule.max} characters`
            );
          }
          break;

        case "pattern":
          if (
            typeof value === "string" &&
            rule.pattern &&
            !rule.pattern.test(value)
          ) {
            errors.push(rule.message || `${field.label} format is invalid`);
          }
          break;

        case "email":
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (typeof value === "string" && !emailPattern.test(value)) {
            errors.push(
              rule.message || `${field.label} must be a valid email address`
            );
          }
          break;

        case "number":
          const numValue = Number(value);
          if (isNaN(numValue)) {
            errors.push(
              rule.message || `${field.label} must be a valid number`
            );
          } else {
            if (rule.min !== undefined && numValue < rule.min) {
              errors.push(
                rule.message || `${field.label} must be at least ${rule.min}`
              );
            }
            if (rule.max !== undefined && numValue > rule.max) {
              errors.push(
                rule.message || `${field.label} cannot exceed ${rule.max}`
              );
            }
          }
          break;

        case "custom":
          if (rule.custom) {
            const result = rule.custom(value);
            if (typeof result === "string") {
              errors.push(result);
            } else if (!result) {
              errors.push(rule.message || `${field.label} is invalid`);
            }
          }
          break;
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function validateForm(
  form: Form,
  data: Record<string, any>
): FormValidationResult {
  const fieldErrors: Record<string, string[]> = {};
  let isValid = true;

  // Validate each field
  for (const field of form.config.fields) {
    const fieldValue = data[field.id];
    const validation = validateField(field, fieldValue);

    if (!validation.isValid) {
      fieldErrors[field.id] = validation.errors;
      isValid = false;
    }
  }

  return {
    isValid,
    fieldErrors,
  };
}

function updateFormData(form: Form, fieldId: string, value: any): Form {
  const newData = { ...form.data, [fieldId]: value };
  const validation = validateForm(form, newData);

  return {
    ...form,
    data: newData,
    errors: validation.fieldErrors,
    isValid: validation.isValid,
  };
}

function getFormSummary(form: Form): string {
  const { config, data, errors, isValid } = form;
  let summary = `Form: ${config.title}\n`;

  if (config.description) {
    summary += `Description: ${config.description}\n`;
  }

  summary += `Valid: ${isValid}\n\n`;

  summary += "Fields:\n";
  config.fields.forEach((field) => {
    const value = data[field.id];
    const fieldErrors = errors[field.id] || [];

    summary += `  ${field.label}: ${value}`;
    if (fieldErrors.length > 0) {
      summary += ` (❌ ${fieldErrors.join(", ")})`;
    } else {
      summary += ` (✅)`;
    }
    summary += "\n";
  });

  return summary;
}

// Test the form system
const registrationForm = createForm({
  title: "User Registration",
  description: "Create your account to get started",
  submitText: "Register",
  cancelText: "Cancel",
  styling: {
    theme: "modern",
    layout: "vertical",
    spacing: "normal",
  },
  behavior: {
    validateOnChange: true,
    showErrorsInline: true,
  },
  fields: [
    {
      id: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      required: true,
      validation: [
        {
          type: "minLength",
          min: 2,
          message: "First name must be at least 2 characters",
        },
      ],
    },
    {
      id: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      required: true,
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      required: true,
      validation: [{ type: "email" }],
    },
    {
      id: "password",
      type: "password",
      label: "Password",
      required: true,
      validation: [
        {
          type: "minLength",
          min: 8,
          message: "Password must be at least 8 characters",
        },
        {
          type: "custom",
          custom: (value: string) => {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
              return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
            }
            return true;
          },
        },
      ],
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      required: true,
      validation: [
        {
          type: "number",
          min: 13,
          max: 120,
          message: "Age must be between 13 and 120",
        },
      ],
    },
    {
      id: "newsletter",
      type: "checkbox",
      label: "Subscribe to newsletter",
      defaultValue: true,
      helpText: "Stay updated with our latest news and updates",
    },
  ],
});

console.log("Initial form:");
console.log(getFormSummary(registrationForm));

// Simulate user input
let updatedForm = registrationForm;
updatedForm = updateFormData(updatedForm, "firstName", "Alice");
updatedForm = updateFormData(updatedForm, "lastName", "Johnson");
updatedForm = updateFormData(updatedForm, "email", "alice@example.com");
updatedForm = updateFormData(updatedForm, "password", "SecurePass123");
updatedForm = updateFormData(updatedForm, "age", 25);

console.log("\nCompleted form:");
console.log(getFormSummary(updatedForm));

// Test with invalid data
let invalidForm = registrationForm;
invalidForm = updateFormData(invalidForm, "firstName", "A"); // Too short
invalidForm = updateFormData(invalidForm, "email", "invalid-email"); // Invalid email
invalidForm = updateFormData(invalidForm, "password", "weak"); // Weak password
invalidForm = updateFormData(invalidForm, "age", 5); // Too young

console.log("\nInvalid form:");
console.log(getFormSummary(invalidForm));
```

</details>

---

## 🎯 Key Takeaways

After completing this lesson, you should understand:

### ✅ Optional Property Fundamentals:

- **Use `?` syntax** to make properties optional
- **Handle missing data gracefully** in real-world applications
- **Provide defaults** for optional values when needed
- **Use type guards** to safely access optional properties

### ✅ Best Practices:

- **Think about user experience** - not all data is always available
- **Use optional chaining** (`?.`) for safe property access
- **Provide meaningful defaults** with destructuring
- **Document what's optional** and why in your interfaces

### ✅ Common Patterns:

- **Configuration objects** - most settings should be optional
- **API responses** - external data is often incomplete
- **User input** - forms and user-provided data
- **Progressive enhancement** - start minimal, add features

### ✅ Safety Techniques:

- **Type guards** - check before using optional properties
- **Logical operators** - `||`, `??` for default values
- **Destructuring defaults** - clean syntax for fallbacks
- **Optional chaining** - safe navigation through nested properties

---

## 🚀 What's Next?

Congratulations! You've mastered optional properties in TypeScript. You now know how to:

- ✅ **Create flexible interfaces** that work with incomplete data
- ✅ **Handle optional parameters** in functions safely
- ✅ **Use default values** and destructuring patterns
- ✅ **Build robust applications** that gracefully handle missing data
- ✅ **Apply real-world patterns** for configuration and user input

**Next Lesson**: `10-literal-types.md` - Learn about literal types for exact values, template literals, and building precise type constraints!

---

_Remember: Optional properties make your types flexible and realistic. Real-world applications rarely have complete data, so designing for optionality from the start saves time and prevents bugs!_ 🔧
