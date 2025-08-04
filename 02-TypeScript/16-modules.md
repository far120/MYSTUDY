# Modules and Namespaces - Organizing Code 📦

**Master Code Organization!** Learn how to structure large TypeScript applications using modules, namespaces, and modern import/export patterns.

## 🎯 Learning Objectives

- Use ES6 modules with TypeScript
- Create and consume TypeScript modules
- Organize code with namespaces
- Handle module resolution and declarations
- Build scalable project structures

---

## 📦 ES6 Modules

```typescript
// math.ts - Exporting utilities
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export const PI = 3.14159;

export default class Calculator {
  static divide(a: number, b: number): number {
    return a / b;
  }
}

// app.ts - Importing utilities
import Calculator, { add, multiply, PI } from "./math";
import * as MathUtils from "./math";

console.log(add(5, 3));
console.log(Calculator.divide(10, 2));
console.log(MathUtils.PI);
```

## 🏗️ Advanced Module Patterns

```typescript
// types.ts - Type definitions
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserRole = "admin" | "user" | "guest";

// services/userService.ts
import { User, UserRole } from "../types";

export class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getUsersByRole(role: UserRole): User[] {
    // Implementation here
    return this.users;
  }
}

// utils/index.ts - Barrel exports
export { UserService } from "../services/userService";
export { User, UserRole } from "../types";
export * from "./validation";
export * from "./formatting";
```

## 🏛️ Namespaces

```typescript
// geometry.ts
namespace Geometry {
  export namespace Shapes {
    export class Circle {
      constructor(public radius: number) {}

      area(): number {
        return Math.PI * this.radius * this.radius;
      }
    }

    export class Rectangle {
      constructor(public width: number, public height: number) {}

      area(): number {
        return this.width * this.height;
      }
    }
  }

  export namespace Utils {
    export function calculatePerimeter(shape: any): number {
      // Implementation
      return 0;
    }
  }
}

// Usage
const circle = new Geometry.Shapes.Circle(5);
const rectangle = new Geometry.Shapes.Rectangle(4, 6);
```

## 🚀 Real-World Project Structure

```typescript
// src/models/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

// src/services/ProductService.ts
import { Product } from "../models/Product";

export class ProductService {
  private products: Product[] = [];

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.find((p) => p.id === id) || null;
  }

  async createProduct(product: Omit<Product, "id">): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36),
    };
    this.products.push(newProduct);
    return newProduct;
  }
}

// src/controllers/ProductController.ts
import { ProductService } from "../services/ProductService";
import { Product } from "../models/Product";

export class ProductController {
  constructor(private productService: ProductService) {}

  async handleGetProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  async handleCreateProduct(productData: any): Promise<Product> {
    return await this.productService.createProduct(productData);
  }
}

// src/index.ts - Main application
import { ProductService } from "./services/ProductService";
import { ProductController } from "./controllers/ProductController";

const productService = new ProductService();
const productController = new ProductController(productService);

async function main() {
  const products = await productController.handleGetProducts();
  console.log("Products:", products);
}

main();
```

🎯 **Next**: Learn utility types in lesson 17!
