# Utility Types - Built-in Type Helpers 🛠️

**Master Type Utilities!** Learn TypeScript's powerful built-in utility types that help you manipulate and transform types effectively.

## 🎯 Learning Objectives

- Use common utility types (Partial, Required, Pick, Omit)
- Transform types with conditional utilities
- Create flexible APIs with utility types
- Build type-safe applications with advanced utilities
- Understand when and how to use each utility type

---

## 🔧 Essential Utility Types

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

// Partial<T> - Makes all properties optional
type PartialUser = Partial<User>;
// Same as: { id?: string; name?: string; email?: string; age?: number; isActive?: boolean; }

function updateUser(id: string, updates: Partial<User>): User {
  // Implementation
  return {} as User;
}

updateUser("123", { name: "John" }); // ✅ Only update name
updateUser("123", { email: "john@email.com", age: 30 }); // ✅ Update multiple fields

// Required<T> - Makes all properties required
type RequiredUser = Required<Partial<User>>;

// Pick<T, K> - Select specific properties
type UserSummary = Pick<User, "id" | "name" | "email">;
// Same as: { id: string; name: string; email: string; }

// Omit<T, K> - Exclude specific properties
type CreateUserRequest = Omit<User, "id">;
// Same as: { name: string; email: string; age: number; isActive: boolean; }

function createUser(userData: CreateUserRequest): User {
  return {
    id: Math.random().toString(),
    ...userData,
  };
}
```

## 🔄 Advanced Transformation Types

```typescript
// Record<K, T> - Create object type with specific keys and values
type UserRoles = Record<string, "admin" | "user" | "guest">;
const userRoles: UserRoles = {
  user1: "admin",
  user2: "user",
  user3: "guest",
};

// Exclude<T, U> - Remove types from union
type AllColors = "red" | "green" | "blue" | "yellow";
type PrimaryColors = Exclude<AllColors, "yellow">;
// Same as: 'red' | 'green' | 'blue'

// Extract<T, U> - Extract types from union
type WarmColors = Extract<AllColors, "red" | "yellow">;
// Same as: 'red' | 'yellow'

// NonNullable<T> - Remove null and undefined
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;
// Same as: string

// ReturnType<T> - Get function return type
function getUser(): User {
  return {} as User;
}
type UserReturnType = ReturnType<typeof getUser>;
// Same as: User

// Parameters<T> - Get function parameter types
function createProduct(name: string, price: number, category: string): void {}
type CreateProductParams = Parameters<typeof createProduct>;
// Same as: [string, number, string]
```

## 🏗️ Real-World Example: API Response Handler

```typescript
// Base API response interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Utility types for different scenarios
type ProductListResponse = ApiResponse<Product[]>;
type ProductDetailResponse = ApiResponse<Product>;

// Create product request (no id, dates, or inStock)
type CreateProductRequest = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "inStock"
>;

// Update product request (partial, no id or dates)
type UpdateProductRequest = Partial<
  Omit<Product, "id" | "createdAt" | "updatedAt">
>;

// Product summary for lists (only essential fields)
type ProductSummary = Pick<Product, "id" | "name" | "price" | "inStock">;

// Search filters (all optional)
type ProductSearchFilters = Partial<Pick<Product, "category" | "inStock">> & {
  minPrice?: number;
  maxPrice?: number;
  nameContains?: string;
};

class ProductAPI {
  async getAllProducts(
    filters?: ProductSearchFilters
  ): Promise<ProductListResponse> {
    // Implementation
    return {} as ProductListResponse;
  }

  async getProductById(id: string): Promise<ProductDetailResponse> {
    // Implementation
    return {} as ProductDetailResponse;
  }

  async createProduct(
    product: CreateProductRequest
  ): Promise<ProductDetailResponse> {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(),
      inStock: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return {
      data: newProduct,
      status: 201,
      message: "Product created successfully",
      timestamp: new Date(),
    };
  }

  async updateProduct(
    id: string,
    updates: UpdateProductRequest
  ): Promise<ProductDetailResponse> {
    // Implementation
    return {} as ProductDetailResponse;
  }

  async getProductSummaries(): Promise<ApiResponse<ProductSummary[]>> {
    // Implementation
    return {} as ApiResponse<ProductSummary[]>;
  }
}

// Usage examples
const api = new ProductAPI();

// Create product with required fields only
api.createProduct({
  name: "Laptop",
  description: "Gaming laptop",
  price: 1200,
  category: "Electronics",
});

// Update with partial data
api.updateProduct("123", {
  price: 1100,
  description: "Updated description",
});

// Search with filters
api.getAllProducts({
  category: "Electronics",
  minPrice: 500,
  maxPrice: 2000,
  inStock: true,
});
```

## 🎮 Exercise: Form Builder System

```typescript
// Base form field interface
interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "number" | "password" | "checkbox";
  required: boolean;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

// Create utility types for different use cases
type CreateFieldRequest = Omit<FormField, "id">;
type UpdateFieldRequest = Partial<Omit<FormField, "id">>;
type FieldSummary = Pick<FormField, "id" | "label" | "type" | "required">;

// Form configuration
type FormConfig = Record<string, FormField>;
type FormValues = Record<string, any>;
type FormErrors = Partial<Record<string, string>>;

class FormBuilder {
  private fields: FormConfig = {};

  addField(fieldData: CreateFieldRequest): FormField {
    const field: FormField = {
      ...fieldData,
      id: Math.random().toString(36),
    };
    this.fields[field.id] = field;
    return field;
  }

  updateField(id: string, updates: UpdateFieldRequest): FormField | null {
    if (!this.fields[id]) return null;

    this.fields[id] = { ...this.fields[id], ...updates };
    return this.fields[id];
  }

  getFieldSummaries(): FieldSummary[] {
    return Object.values(this.fields).map((field) => ({
      id: field.id,
      label: field.label,
      type: field.type,
      required: field.required,
    }));
  }

  validateForm(values: FormValues): FormErrors {
    const errors: FormErrors = {};

    Object.values(this.fields).forEach((field) => {
      const value = values[field.id];

      if (field.required && !value) {
        errors[field.id] = `${field.label} is required`;
      }

      // Additional validation logic
    });

    return errors;
  }
}
```

🎯 **Next**: Learn decorators in lesson 18!
