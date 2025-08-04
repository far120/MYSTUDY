# Decorators - Metadata and Annotations 🎨

**Master Decorators!** Learn how to use decorators for clean, declarative code that adds metadata and functionality to classes, methods, and properties.

## 🎯 Learning Objectives

- Understand decorator syntax and concepts
- Create class, method, and property decorators
- Use decorators for validation and transformation
- Build reusable decorator patterns
- Apply decorators in real-world scenarios

---

## 🎨 Basic Decorator Concepts

```typescript
// Enable decorators in tsconfig.json:
// "experimentalDecorators": true,
// "emitDecoratorMetadata": true

// Simple class decorator
function Component(constructor: Function) {
  console.log(`Component decorator called on ${constructor.name}`);
  constructor.prototype.isComponent = true;
}

@Component
class MyButton {
  label: string = "Click me";
}

const button = new MyButton();
console.log((button as any).isComponent); // true

// Method decorator
function Log(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyName} with arguments:`, args);
    const result = method.apply(this, args);
    console.log(`${propertyName} returned:`, result);
    return result;
  };
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(5, 3); // Logs method call and result
```

## 🛡️ Validation Decorators

```typescript
// Property decorator for validation
function Required(target: any, propertyName: string) {
  const requiredFields = target.constructor.requiredFields || [];
  requiredFields.push(propertyName);
  target.constructor.requiredFields = requiredFields;
}

function MinLength(length: number) {
  return function (target: any, propertyName: string) {
    const minLengthFields = target.constructor.minLengthFields || {};
    minLengthFields[propertyName] = length;
    target.constructor.minLengthFields = minLengthFields;
  };
}

function Email(target: any, propertyName: string) {
  const emailFields = target.constructor.emailFields || [];
  emailFields.push(propertyName);
  target.constructor.emailFields = emailFields;
}

// Validation function
function validate(obj: any): string[] {
  const errors: string[] = [];
  const constructor = obj.constructor;

  // Check required fields
  const requiredFields = constructor.requiredFields || [];
  requiredFields.forEach((field: string) => {
    if (!obj[field]) {
      errors.push(`${field} is required`);
    }
  });

  // Check min length
  const minLengthFields = constructor.minLengthFields || {};
  Object.keys(minLengthFields).forEach((field) => {
    const minLength = minLengthFields[field];
    if (obj[field] && obj[field].length < minLength) {
      errors.push(`${field} must be at least ${minLength} characters`);
    }
  });

  // Check email format
  const emailFields = constructor.emailFields || [];
  emailFields.forEach((field: string) => {
    if (obj[field] && !obj[field].includes("@")) {
      errors.push(`${field} must be a valid email`);
    }
  });

  return errors;
}

class User {
  @Required
  @MinLength(2)
  name: string = "";

  @Required
  @Email
  email: string = "";

  @MinLength(8)
  password: string = "";
}

// Usage
const user = new User();
user.name = "A"; // Too short
user.email = "invalid-email"; // Invalid format
user.password = "123"; // Too short

const errors = validate(user);
console.log(errors);
// ["name must be at least 2 characters", "email must be a valid email", "password must be at least 8 characters"]
```

## 🏗️ Real-World Example: API Controller

```typescript
// Route decorator
function Route(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const routes = target.constructor.routes || [];
    routes.push({
      path,
      method,
      handler: propertyName,
    });
    target.constructor.routes = routes;
  };
}

// Authentication decorator
function Auth(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    // Simulate auth check
    const isAuthenticated = args[0]?.headers?.authorization;
    if (!isAuthenticated) {
      throw new Error("Unauthorized");
    }
    return originalMethod.apply(this, args);
  };
}

// Validation decorator
function ValidateBody(schema: any) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const body = args[1]; // Assuming second argument is body
      const errors = validate(Object.assign(new schema(), body));
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(", ")}`);
      }
      return originalMethod.apply(this, args);
    };
  };
}

// Cache decorator
function Cache(ttl: number = 60000) {
  // TTL in milliseconds
  const cache = new Map<string, { data: any; timestamp: number }>();

  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const cacheKey = `${propertyName}_${JSON.stringify(args)}`;
      const cached = cache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < ttl) {
        console.log(`Cache hit for ${cacheKey}`);
        return cached.data;
      }

      const result = originalMethod.apply(this, args);
      cache.set(cacheKey, { data: result, timestamp: Date.now() });
      console.log(`Cache miss for ${cacheKey}, cached result`);
      return result;
    };
  };
}

// Product controller with decorators
class ProductController {
  @Route("/products", "GET")
  @Cache(30000) // Cache for 30 seconds
  async getAllProducts(req: any, res: any) {
    // Simulate database call
    return [
      { id: "1", name: "Laptop", price: 1000 },
      { id: "2", name: "Phone", price: 500 },
    ];
  }

  @Route("/products/:id", "GET")
  @Cache(60000) // Cache for 1 minute
  async getProductById(req: any, res: any) {
    const { id } = req.params;
    return { id, name: "Laptop", price: 1000 };
  }

  @Route("/products", "POST")
  @Auth
  @ValidateBody(
    class {
      @Required name: string = "";
      @Required price: number = 0;
    }
  )
  async createProduct(req: any, res: any) {
    const product = {
      id: Math.random().toString(),
      ...req.body,
      createdAt: new Date(),
    };
    return product;
  }

  @Route("/products/:id", "PUT")
  @Auth
  async updateProduct(req: any, res: any) {
    const { id } = req.params;
    return { id, ...req.body, updatedAt: new Date() };
  }

  @Route("/products/:id", "DELETE")
  @Auth
  async deleteProduct(req: any, res: any) {
    const { id } = req.params;
    return { message: `Product ${id} deleted` };
  }
}

// Route registration helper
function registerRoutes(controller: any) {
  const routes = controller.constructor.routes || [];
  routes.forEach((route: any) => {
    console.log(
      `Registering ${route.method} ${route.path} -> ${route.handler}`
    );
    // In real app, this would register with Express/Fastify/etc.
  });
}

// Usage
const productController = new ProductController();
registerRoutes(productController);

// Simulate API calls
try {
  const products = productController.getAllProducts({}, {});
  console.log("Products:", products);

  // This will throw an error due to missing auth
  // productController.createProduct({}, { body: { name: "New Product", price: 100 } });

  // This will work with auth header
  const newProduct = productController.createProduct(
    { headers: { authorization: "Bearer token" } },
    { body: { name: "New Product", price: 100 } }
  );
  console.log("New product:", newProduct);
} catch (error) {
  console.error("Error:", error.message);
}
```

🎯 **Next**: Learn project setup in lesson 19!
