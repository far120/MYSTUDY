# Literal Types - Exact Values for Precise Control 🎯

**Master Exact Value Types!** Literal types allow you to specify exact values that variables can hold, creating highly precise and self-documenting APIs. Learn how to use string literals, numeric literals, boolean literals, and template literal types for type-safe, predictable code.

## 🎯 Learning Objectives

By the end of this lesson, you will:

- Understand and use string, number, and boolean literal types
- Create unions of literal types for controlled vocabularies
- Master template literal types for dynamic string patterns
- Build type-safe APIs with exact value constraints
- Combine literal types with other TypeScript features

---

## 🤔 Why Literal Types Matter

Literal types help you express exact values and create more precise type definitions than basic types alone.

### The Problem: Too Permissive Types

```typescript
// Too general - allows any string
interface Theme {
  name: string; // Could be ANYTHING: "dark", "light", "purple-unicorn", "asdfgh"
  primaryColor: string; // Could be ANYTHING: "blue", "#ff0000", "not-a-color"
  fontSize: string; // Could be ANYTHING: "16px", "large", "banana"
}

// No compile-time protection against typos or invalid values
const myTheme: Theme = {
  name: "drak", // Typo! Should be "dark"
  primaryColor: "not-a-color", // Invalid color
  fontSize: "banana", // Not a valid size
};

// Function that accepts any string - dangerous!
function setTheme(themeName: string) {
  // What if someone passes "invalid-theme"?
  // We have no compile-time protection
}

setTheme("drak"); // Typo, but TypeScript allows it
setTheme("unknown"); // Invalid theme, but TypeScript allows it
```

### The Solution: Literal Types

```typescript
// Precise types with exact values
type ThemeName = "light" | "dark" | "high-contrast";
type Color = "#ff0000" | "#00ff00" | "#0000ff" | "#ffffff" | "#000000";
type FontSize = "small" | "medium" | "large" | "x-large";

interface PreciseTheme {
  name: ThemeName; // Only these exact strings allowed
  primaryColor: Color; // Only these exact colors allowed
  fontSize: FontSize; // Only these exact sizes allowed
}

// Compile-time safety - TypeScript catches errors!
const myTheme: PreciseTheme = {
  name: "drak", // ❌ Error: Type '"drak"' is not assignable to type 'ThemeName'
  primaryColor: "not-a-color", // ❌ Error: Type '"not-a-color"' is not assignable to type 'Color'
  fontSize: "banana", // ❌ Error: Type '"banana"' is not assignable to type 'FontSize'
};

// Correct version:
const correctTheme: PreciseTheme = {
  name: "dark", // ✅ Valid
  primaryColor: "#000000", // ✅ Valid
  fontSize: "medium", // ✅ Valid
};

// Function with precise parameter type
function setTheme(themeName: ThemeName) {
  // We know themeName is one of the valid values
  console.log(`Setting theme to: ${themeName}`);
}

setTheme("dark"); // ✅ Valid
setTheme("drak"); // ❌ Error: Argument of type '"drak"' is not assignable to parameter of type 'ThemeName'
```

---

## 📝 String Literal Types

String literals represent exact string values:

```typescript
// Single string literal type
type SuccessMessage = "Operation completed successfully";

// Union of string literals - common pattern
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
type UserRole = "admin" | "moderator" | "user" | "guest";

// Using string literal types in interfaces
interface ApiRequest {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  source: "server" | "client" | "database";
}

interface User {
  id: number;
  name: string;
  role: UserRole;
  status: "active" | "inactive" | "pending" | "suspended";
}

// Type-safe functions
function makeRequest(request: ApiRequest): Promise<any> {
  console.log(`Making ${request.method} request to ${request.url}`);

  // TypeScript knows method is one of the valid HTTP methods
  switch (request.method) {
    case "GET":
      return fetch(request.url);
    case "POST":
    case "PUT":
    case "PATCH":
      return fetch(request.url, {
        method: request.method,
        headers: request.headers,
      });
    case "DELETE":
      return fetch(request.url, { method: "DELETE" });
    default:
      // TypeScript knows this is unreachable
      const exhaustive: never = request.method;
      throw new Error(`Unhandled method: ${exhaustive}`);
  }
}

function log(entry: LogEntry): void {
  const prefix = {
    debug: "🐛",
    info: "ℹ️",
    warn: "⚠️",
    error: "❌",
    fatal: "💀",
  }[entry.level];

  console.log(`${prefix} [${entry.source}] ${entry.message}`);
}

function checkUserPermission(
  user: User,
  action: "read" | "write" | "delete"
): boolean {
  switch (user.role) {
    case "admin":
      return true; // Admin can do everything
    case "moderator":
      return action !== "delete"; // Moderator can read and write
    case "user":
      return action === "read"; // User can only read
    case "guest":
      return false; // Guest cannot do anything
    default:
      const exhaustive: never = user.role;
      return false;
  }
}

// Usage examples
const getRequest: ApiRequest = {
  method: "GET",
  url: "/api/users",
};

const postRequest: ApiRequest = {
  method: "POST",
  url: "/api/users",
  headers: { "Content-Type": "application/json" },
};

makeRequest(getRequest);
makeRequest(postRequest);

const logEntries: LogEntry[] = [
  {
    level: "info",
    message: "Server started",
    timestamp: new Date(),
    source: "server",
  },
  {
    level: "warn",
    message: "High memory usage",
    timestamp: new Date(),
    source: "server",
  },
  {
    level: "error",
    message: "Database connection failed",
    timestamp: new Date(),
    source: "database",
  },
];

logEntries.forEach(log);

const users: User[] = [
  { id: 1, name: "Alice", role: "admin", status: "active" },
  { id: 2, name: "Bob", role: "user", status: "active" },
  { id: 3, name: "Charlie", role: "guest", status: "pending" },
];

users.forEach((user) => {
  console.log(`${user.name} can read: ${checkUserPermission(user, "read")}`);
  console.log(`${user.name} can write: ${checkUserPermission(user, "write")}`);
  console.log(
    `${user.name} can delete: ${checkUserPermission(user, "delete")}`
  );
});
```

### Advanced String Literal Patterns:

```typescript
// Conditional types with string literals
type FileExtension = ".txt" | ".json" | ".csv" | ".xml";
type MimeType<T extends FileExtension> = T extends ".txt"
  ? "text/plain"
  : T extends ".json"
  ? "application/json"
  : T extends ".csv"
  ? "text/csv"
  : T extends ".xml"
  ? "application/xml"
  : never;

// Usage
type JsonMime = MimeType<".json">; // "application/json"
type TextMime = MimeType<".txt">; // "text/plain"

// Function that uses the conditional type
function getContentType<T extends FileExtension>(extension: T): MimeType<T> {
  const mimeTypes = {
    ".txt": "text/plain" as const,
    ".json": "application/json" as const,
    ".csv": "text/csv" as const,
    ".xml": "application/xml" as const,
  };

  return mimeTypes[extension] as MimeType<T>;
}

const jsonType = getContentType(".json"); // Type: "application/json"
const textType = getContentType(".txt"); // Type: "text/plain"

// Branded types with string literals
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

function createProductId(id: string): ProductId {
  return id as ProductId;
}

function getUserData(userId: UserId): any {
  // This function only accepts UserId, not any string
  console.log(`Fetching data for user: ${userId}`);
}

const userId = createUserId("user-123");
const productId = createProductId("product-456");

getUserData(userId); // ✅ Valid
// getUserData(productId);  // ❌ Error: ProductId is not assignable to UserId
// getUserData("user-123"); // ❌ Error: string is not assignable to UserId
```

---

## 🔢 Numeric and Boolean Literal Types

### Numeric Literal Types:

```typescript
// Numeric literals for exact values
type HttpStatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;
type Port = 3000 | 3001 | 8080 | 8000;
type Priority = 1 | 2 | 3 | 4 | 5;

// Using numeric literals in interfaces
interface ServerResponse {
  statusCode: HttpStatusCode;
  data?: any;
  error?: string;
}

interface ServerConfig {
  port: Port;
  workers: 1 | 2 | 4 | 8; // Only specific number of workers allowed
  timeout: 5000 | 10000 | 30000; // Timeout in milliseconds
}

interface Task {
  id: number;
  title: string;
  priority: Priority; // 1 (highest) to 5 (lowest)
  status: "pending" | "in-progress" | "completed";
}

// Functions with numeric literal types
function createResponse(
  statusCode: HttpStatusCode,
  data?: any,
  error?: string
): ServerResponse {
  const response: ServerResponse = { statusCode };

  if (statusCode >= 200 && statusCode < 300) {
    response.data = data;
  } else {
    response.error = error || "An error occurred";
  }

  return response;
}

function startServer(config: ServerConfig): void {
  console.log(`Starting server on port ${config.port}`);
  console.log(`Using ${config.workers} worker processes`);
  console.log(`Request timeout: ${config.timeout}ms`);
}

function prioritizeTask(task: Task, newPriority: Priority): Task {
  return { ...task, priority: newPriority };
}

// Usage examples
const successResponse = createResponse(200, { users: [] });
const errorResponse = createResponse(404, undefined, "User not found");

const serverConfig: ServerConfig = {
  port: 3000,
  workers: 4,
  timeout: 10000,
};

startServer(serverConfig);

const myTask: Task = {
  id: 1,
  title: "Implement user authentication",
  priority: 2,
  status: "in-progress",
};

const highPriorityTask = prioritizeTask(myTask, 1);
console.log("Updated task:", highPriorityTask);
```

### Boolean Literal Types:

```typescript
// Boolean literals - more specific than just boolean
type IsEnabled = true;
type IsDisabled = false;
type FeatureFlag = true | false; // Same as boolean, but more explicit

// Using boolean literals for exact control
interface FeatureToggles {
  darkMode: true | false;
  betaFeatures: true | false;
  analytics: true | false;
  notifications: true | false;
}

interface DatabaseConfig {
  ssl: true | false;
  autoConnect: true; // Must always be true
  debugMode: false; // Must always be false in production
  pooling: true | false;
}

// Conditional types with boolean literals
type ApiResponse<T extends boolean> = T extends true
  ? { success: true; data: any }
  : { success: false; error: string };

function callApi<T extends boolean>(shouldSucceed: T): ApiResponse<T> {
  if (shouldSucceed) {
    return { success: true, data: "some data" } as ApiResponse<T>;
  } else {
    return { success: false, error: "API call failed" } as ApiResponse<T>;
  }
}

// Usage - TypeScript knows the exact shape based on the parameter
const successResult = callApi(true); // Type: { success: true; data: any }
const failureResult = callApi(false); // Type: { success: false; error: string }

// TypeScript knows these properties exist
console.log(successResult.data); // ✅ Valid - TypeScript knows data exists
console.log(failureResult.error); // ✅ Valid - TypeScript knows error exists
// console.log(successResult.error);   // ❌ Error - error doesn't exist on success type
// console.log(failureResult.data);    // ❌ Error - data doesn't exist on failure type
```

---

## 🏗️ Template Literal Types

Template literal types allow you to create types from string templates:

```typescript
// Basic template literal types
type Greeting = `Hello, ${string}!`;
type ApiRoute = `/api/${string}`;
type CssUnit = `${number}px` | `${number}rem` | `${number}%`;

// Template literals with specific values
type Theme = "light" | "dark";
type Size = "small" | "medium" | "large";
type Component = "button" | "input" | "card";

// Generate class names
type ClassName = `${Theme}-${Component}` | `${Component}-${Size}`;
// Results in: "light-button" | "dark-button" | "light-input" | "dark-input" |
//             "light-card" | "dark-card" | "button-small" | "button-medium" | etc.

// More complex template patterns
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ResourceType = "user" | "product" | "order";
type ApiEndpoint = `/${ResourceType}` | `/${ResourceType}/${number}`;
type FullApiRoute = `${HttpMethod} ${ApiEndpoint}`;

// CSS property types
type CssProperty = "margin" | "padding" | "border";
type CssDirection = "top" | "right" | "bottom" | "left";
type SpecificCssProperty = `${CssProperty}-${CssDirection}`;
// Results in: "margin-top" | "margin-right" | "padding-left" | etc.

// Event handler types
type EventType = "click" | "focus" | "blur" | "change";
type EventHandler = `on${Capitalize<EventType>}`;
// Results in: "onClick" | "onFocus" | "onBlur" | "onChange"

// Database table and column patterns
type TableName = "users" | "products" | "orders";
type ColumnName = "id" | "name" | "email" | "price" | "status";
type QualifiedColumn = `${TableName}.${ColumnName}`;

interface ApiRoutes {
  users: {
    list: "GET /user";
    create: "POST /user";
    get: `GET /user/${number}`;
    update: `PUT /user/${number}`;
    delete: `DELETE /user/${number}`;
  };
  products: {
    list: "GET /product";
    create: "POST /product";
    get: `GET /product/${number}`;
    update: `PUT /product/${number}`;
    delete: `DELETE /product/${number}`;
  };
}

// Using template literal types in practice
interface StyledComponent {
  className: ClassName;
  cssProperties: Record<SpecificCssProperty, string>;
  eventHandlers: Partial<Record<EventHandler, () => void>>;
}

// Type-safe styling function
function createStyledComponent(
  theme: Theme,
  component: Component,
  size: Size
): StyledComponent {
  const className: ClassName = `${theme}-${component}`;

  return {
    className,
    cssProperties: {
      "margin-top": "10px",
      "padding-left": "15px",
      "border-bottom": "1px solid #ccc",
    },
    eventHandlers: {
      onClick: () => console.log(`${className} clicked`),
      onFocus: () => console.log(`${className} focused`),
    },
  };
}

// Advanced template literal manipulation
type RemovePrefix<
  T extends string,
  P extends string
> = T extends `${P}${infer Rest}` ? Rest : T;

type EventName = "onClick" | "onFocus" | "onBlur" | "onChange";
type CleanEventName = RemovePrefix<EventName, "on">;
// Results in: "Click" | "Focus" | "Blur" | "Change"

// Path parameter extraction
type ExtractPathParams<T extends string> =
  T extends `${string}/:${infer Param}/${infer Rest}`
    ? { [K in Param]: string } & ExtractPathParams<`/${Rest}`>
    : T extends `${string}/:${infer Param}`
    ? { [K in Param]: string }
    : {};

type UserPath = "/users/:userId/posts/:postId";
type UserPathParams = ExtractPathParams<UserPath>;
// Results in: { userId: string; postId: string }

// Type-safe route handler
function handleRoute<T extends string>(
  path: T,
  params: ExtractPathParams<T>,
  handler: (params: ExtractPathParams<T>) => void
): void {
  console.log(`Handling route: ${path}`);
  handler(params);
}

// Usage with type safety
handleRoute(
  "/users/:userId/posts/:postId",
  { userId: "123", postId: "456" },
  (params) => {
    // TypeScript knows params has userId and postId
    console.log(`User: ${params.userId}, Post: ${params.postId}`);
  }
);

console.log("Template literal examples:");
const styledButton = createStyledComponent("dark", "button", "large");
console.log("Styled component:", styledButton);

// SQL query builder with template literals
type SqlColumn = QualifiedColumn | ColumnName;
type SelectQuery = `SELECT ${string} FROM ${TableName}`;
type WhereClause = `WHERE ${SqlColumn} = ${string | number}`;

function buildQuery(
  select: string,
  from: TableName,
  where?: string
): SelectQuery {
  let query: SelectQuery = `SELECT ${select} FROM ${from}`;
  if (where) {
    query = `${query} ${where}` as SelectQuery;
  }
  return query;
}

const userQuery = buildQuery("*", "users", "WHERE users.id = 1");
console.log("Generated query:", userQuery);
```

---

## 🎮 Hands-On Exercises

### Exercise 1: Event System with Literal Types

Create a type-safe event system using literal types:

```typescript
// Your task: Create a comprehensive event system

// Define event types
type EventType =
  | "user:login"
  | "user:logout"
  | "product:created"
  | "product:updated"
  | "order:placed";

// Define event data based on event type
interface EventData {
  "user:login": { userId: string; timestamp: Date; ip: string };
  "user:logout": { userId: string; timestamp: Date; sessionDuration: number };
  "product:created": { productId: string; name: string; price: number };
  "product:updated": { productId: string; changes: Record<string, any> };
  "order:placed": {
    orderId: string;
    userId: string;
    total: number;
    items: Array<{ productId: string; quantity: number }>;
  };
}

// Create event listener and emitter functions
class EventEmitter {
  // Implementation here
}

// Test your event system
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Event System with Literal Types

type EventType =
  | "user:login"
  | "user:logout"
  | "product:created"
  | "product:updated"
  | "order:placed"
  | "system:error";

interface EventData {
  "user:login": {
    userId: string;
    timestamp: Date;
    ip: string;
    userAgent?: string;
  };
  "user:logout": { userId: string; timestamp: Date; sessionDuration: number };
  "product:created": {
    productId: string;
    name: string;
    price: number;
    category: string;
  };
  "product:updated": {
    productId: string;
    changes: Record<string, any>;
    updatedBy: string;
  };
  "order:placed": {
    orderId: string;
    userId: string;
    total: number;
    items: Array<{ productId: string; quantity: number; price: number }>;
    shippingAddress: string;
  };
  "system:error": {
    error: Error;
    context: string;
    severity: "low" | "medium" | "high" | "critical";
  };
}

type EventListener<T extends EventType> = (
  data: EventData[T]
) => void | Promise<void>;

class EventEmitter {
  private listeners: {
    [K in EventType]?: Array<EventListener<K>>;
  } = {};

  private eventHistory: Array<{
    type: EventType;
    data: EventData[EventType];
    timestamp: Date;
  }> = [];

  // Type-safe event listener registration
  on<T extends EventType>(eventType: T, listener: EventListener<T>): void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType]!.push(listener);
  }

  // Type-safe event emission
  async emit<T extends EventType>(
    eventType: T,
    data: EventData[T]
  ): Promise<void> {
    // Store in history
    this.eventHistory.push({
      type: eventType,
      data,
      timestamp: new Date(),
    });

    // Get listeners for this event type
    const eventListeners = this.listeners[eventType];
    if (!eventListeners || eventListeners.length === 0) {
      console.log(`No listeners for event: ${eventType}`);
      return;
    }

    // Execute all listeners
    const promises = eventListeners.map((listener) => {
      try {
        return Promise.resolve(listener(data));
      } catch (error) {
        console.error(`Error in event listener for ${eventType}:`, error);
        return Promise.resolve();
      }
    });

    await Promise.all(promises);
  }

  // Remove listener
  off<T extends EventType>(eventType: T, listener: EventListener<T>): void {
    const eventListeners = this.listeners[eventType];
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  // Get event history
  getHistory(): Array<{
    type: EventType;
    data: EventData[EventType];
    timestamp: Date;
  }> {
    return [...this.eventHistory];
  }

  // Get history for specific event type
  getHistoryFor<T extends EventType>(
    eventType: T
  ): Array<{
    type: T;
    data: EventData[T];
    timestamp: Date;
  }> {
    return this.eventHistory.filter(
      (event): event is { type: T; data: EventData[T]; timestamp: Date } =>
        event.type === eventType
    );
  }
}

// Create event emitter instance
const events = new EventEmitter();

// Set up event listeners
events.on("user:login", (data) => {
  console.log(
    `🔑 User ${data.userId} logged in from ${
      data.ip
    } at ${data.timestamp.toISOString()}`
  );
  if (data.userAgent) {
    console.log(`   User Agent: ${data.userAgent}`);
  }
});

events.on("user:logout", (data) => {
  const minutes = Math.round(data.sessionDuration / 60000);
  console.log(`👋 User ${data.userId} logged out after ${minutes} minutes`);
});

events.on("product:created", (data) => {
  console.log(
    `📦 New product created: ${data.name} (${data.productId}) - $${data.price} in ${data.category}`
  );
});

events.on("product:updated", (data) => {
  console.log(`📝 Product ${data.productId} updated by ${data.updatedBy}`);
  console.log(`   Changes:`, data.changes);
});

events.on("order:placed", (data) => {
  console.log(`🛒 Order ${data.orderId} placed by user ${data.userId}`);
  console.log(`   Total: $${data.total}`);
  console.log(`   Items: ${data.items.length}`);
  console.log(`   Shipping to: ${data.shippingAddress}`);
});

events.on("system:error", (data) => {
  const severityEmoji = {
    low: "ℹ️",
    medium: "⚠️",
    high: "❌",
    critical: "🚨",
  }[data.severity];

  console.log(
    `${severityEmoji} System error (${data.severity}): ${data.error.message}`
  );
  console.log(`   Context: ${data.context}`);
});

// Analytics listener that tracks all events
events.on("user:login", () => console.log("📊 Analytics: User login tracked"));
events.on("user:logout", () =>
  console.log("📊 Analytics: User logout tracked")
);
events.on("product:created", () =>
  console.log("📊 Analytics: Product creation tracked")
);
events.on("order:placed", () =>
  console.log("📊 Analytics: Order placement tracked")
);

// Test the event system
async function demonstrateEventSystem() {
  console.log("=== Event System Demo ===\n");

  // User login
  await events.emit("user:login", {
    userId: "user-123",
    timestamp: new Date(),
    ip: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  });

  // Product creation
  await events.emit("product:created", {
    productId: "prod-456",
    name: "Wireless Headphones",
    price: 99.99,
    category: "Electronics",
  });

  // Product update
  await events.emit("product:updated", {
    productId: "prod-456",
    changes: { price: 89.99, stock: 50 },
    updatedBy: "admin-789",
  });

  // Order placement
  await events.emit("order:placed", {
    orderId: "order-789",
    userId: "user-123",
    total: 179.98,
    items: [{ productId: "prod-456", quantity: 2, price: 89.99 }],
    shippingAddress: "123 Main St, Anytown, USA",
  });

  // System error
  await events.emit("system:error", {
    error: new Error("Database connection timeout"),
    context: "User profile update",
    severity: "high",
  });

  // User logout
  await events.emit("user:logout", {
    userId: "user-123",
    timestamp: new Date(),
    sessionDuration: 900000, // 15 minutes
  });

  // Show event history
  console.log("\n=== Event History ===");
  const history = events.getHistory();
  history.forEach((event, index) => {
    console.log(
      `${index + 1}. ${event.type} at ${event.timestamp.toISOString()}`
    );
  });

  // Show specific event history
  console.log("\n=== User Events ===");
  const userLoginHistory = events.getHistoryFor("user:login");
  const userLogoutHistory = events.getHistoryFor("user:logout");

  console.log(`Total logins: ${userLoginHistory.length}`);
  console.log(`Total logouts: ${userLogoutHistory.length}`);
}

demonstrateEventSystem();
```

</details>

### Exercise 2: Configuration System with Template Literals

```typescript
// Create a type-safe configuration system using template literals

// Environment types
type Environment = "development" | "staging" | "production";
type Service = "api" | "database" | "cache" | "auth";

// Generate configuration keys using template literals
type ConfigKey =
  | `${Environment}_${Service}_url`
  | `${Environment}_${Service}_timeout`;

// Create configuration interface and validation functions
interface AppConfig {
  // Define configuration structure
}

// Configuration builder functions
function buildConfig(env: Environment): AppConfig {
  // Implementation
}

function validateConfig(config: AppConfig): boolean {
  // Implementation
}

// Test your configuration system
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Configuration System with Template Literals

type Environment = "development" | "staging" | "production";
type Service = "api" | "database" | "cache" | "auth" | "storage";
type ConfigType = "url" | "timeout" | "retries" | "pool_size" | "ssl_enabled";

// Generate all possible configuration keys
type ConfigKey = `${Environment}_${Service}_${ConfigType}`;

// Service-specific configuration
type ServiceConfig = {
  url: string;
  timeout: number;
  retries: number;
  pool_size?: number;
  ssl_enabled: boolean;
};

// Environment-specific service configurations
type EnvironmentConfig = {
  [K in Service]: ServiceConfig;
};

// Full application configuration
interface AppConfig {
  environment: Environment;
  services: EnvironmentConfig;
  global: {
    app_name: string;
    version: string;
    debug: boolean;
    log_level: "debug" | "info" | "warn" | "error";
  };
}

// Configuration templates for each environment
const configTemplates: Record<Environment, Partial<EnvironmentConfig>> = {
  development: {
    api: {
      url: "http://localhost:3000",
      timeout: 5000,
      retries: 1,
      ssl_enabled: false,
    },
    database: {
      url: "mongodb://localhost:27017/myapp_dev",
      timeout: 3000,
      retries: 2,
      pool_size: 5,
      ssl_enabled: false,
    },
    cache: {
      url: "redis://localhost:6379",
      timeout: 1000,
      retries: 1,
      ssl_enabled: false,
    },
    auth: {
      url: "http://localhost:3001",
      timeout: 2000,
      retries: 2,
      ssl_enabled: false,
    },
    storage: {
      url: "file://./uploads",
      timeout: 5000,
      retries: 1,
      ssl_enabled: false,
    },
  },
  staging: {
    api: {
      url: "https://api-staging.example.com",
      timeout: 8000,
      retries: 3,
      ssl_enabled: true,
    },
    database: {
      url: "mongodb://staging-db.example.com:27017/myapp_staging",
      timeout: 5000,
      retries: 3,
      pool_size: 10,
      ssl_enabled: true,
    },
    cache: {
      url: "redis://staging-cache.example.com:6379",
      timeout: 2000,
      retries: 2,
      ssl_enabled: true,
    },
    auth: {
      url: "https://auth-staging.example.com",
      timeout: 3000,
      retries: 3,
      ssl_enabled: true,
    },
    storage: {
      url: "s3://staging-bucket",
      timeout: 10000,
      retries: 2,
      ssl_enabled: true,
    },
  },
  production: {
    api: {
      url: "https://api.example.com",
      timeout: 10000,
      retries: 5,
      ssl_enabled: true,
    },
    database: {
      url: "mongodb://prod-cluster.example.com:27017/myapp",
      timeout: 8000,
      retries: 5,
      pool_size: 20,
      ssl_enabled: true,
    },
    cache: {
      url: "redis://prod-cache.example.com:6379",
      timeout: 3000,
      retries: 3,
      ssl_enabled: true,
    },
    auth: {
      url: "https://auth.example.com",
      timeout: 5000,
      retries: 4,
      ssl_enabled: true,
    },
    storage: {
      url: "s3://production-bucket",
      timeout: 15000,
      retries: 3,
      ssl_enabled: true,
    },
  },
};

// Type-safe configuration builder
function buildConfig(env: Environment): AppConfig {
  const template = configTemplates[env];

  // Build complete configuration with defaults
  const services: EnvironmentConfig = {} as EnvironmentConfig;

  (Object.keys(template) as Service[]).forEach((service) => {
    const serviceTemplate = template[service];
    if (serviceTemplate) {
      services[service] = {
        pool_size: 5, // Default pool size
        ...serviceTemplate,
      };
    }
  });

  return {
    environment: env,
    services,
    global: {
      app_name: "MyApp",
      version: "1.0.0",
      debug: env === "development",
      log_level:
        env === "development" ? "debug" : env === "staging" ? "info" : "warn",
    },
  };
}

// Configuration validation
function validateConfig(config: AppConfig): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate global configuration
  if (!config.global.app_name) {
    errors.push("App name is required");
  }

  if (!config.global.version) {
    errors.push("Version is required");
  }

  // Validate service configurations
  const requiredServices: Service[] = ["api", "database", "cache", "auth"];

  for (const service of requiredServices) {
    const serviceConfig = config.services[service];

    if (!serviceConfig) {
      errors.push(`Service configuration missing: ${service}`);
      continue;
    }

    if (!serviceConfig.url) {
      errors.push(`URL is required for service: ${service}`);
    }

    if (serviceConfig.timeout <= 0) {
      errors.push(`Invalid timeout for service: ${service}`);
    }

    if (serviceConfig.retries < 0) {
      errors.push(`Invalid retry count for service: ${service}`);
    }

    // Validate URLs
    if (serviceConfig.url) {
      try {
        new URL(serviceConfig.url);
      } catch {
        // For non-standard URLs like file:// or mongodb://, do basic validation
        if (!serviceConfig.url.includes("://")) {
          errors.push(`Invalid URL format for service: ${service}`);
        }
      }
    }

    // Production-specific validations
    if (config.environment === "production") {
      if (!serviceConfig.ssl_enabled) {
        errors.push(
          `SSL must be enabled in production for service: ${service}`
        );
      }

      if (serviceConfig.timeout < 5000) {
        errors.push(`Timeout too low for production service: ${service}`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Configuration key generator for environment variables
function generateEnvKeys(env: Environment): ConfigKey[] {
  const services: Service[] = ["api", "database", "cache", "auth", "storage"];
  const configTypes: ConfigType[] = [
    "url",
    "timeout",
    "retries",
    "pool_size",
    "ssl_enabled",
  ];

  const keys: ConfigKey[] = [];

  for (const service of services) {
    for (const configType of configTypes) {
      keys.push(`${env}_${service}_${configType}`);
    }
  }

  return keys;
}

// Configuration loader from environment variables
function loadConfigFromEnv(env: Environment): Partial<AppConfig> {
  const envKeys = generateEnvKeys(env);
  const config: Partial<AppConfig> = {
    environment: env,
    services: {} as EnvironmentConfig,
  };

  // Simulate reading from environment variables
  const mockEnvVars: Partial<Record<ConfigKey, string>> = {
    [`${env}_api_url`]: `https://api-${env}.example.com`,
    [`${env}_api_timeout`]: "5000",
    [`${env}_database_url`]: `mongodb://${env}-db.example.com:27017/myapp`,
    [`${env}_database_pool_size`]: "10",
  };

  console.log(`Loading configuration for ${env} from environment variables:`);
  envKeys.forEach((key) => {
    const value = mockEnvVars[key];
    if (value) {
      console.log(`  ${key}=${value}`);
    }
  });

  return config;
}

// Configuration comparison
function compareConfigs(
  config1: AppConfig,
  config2: AppConfig
): {
  differences: Array<{
    path: string;
    value1: any;
    value2: any;
  }>;
} {
  const differences: Array<{ path: string; value1: any; value2: any }> = [];

  // Compare global settings
  if (config1.global.debug !== config2.global.debug) {
    differences.push({
      path: "global.debug",
      value1: config1.global.debug,
      value2: config2.global.debug,
    });
  }

  if (config1.global.log_level !== config2.global.log_level) {
    differences.push({
      path: "global.log_level",
      value1: config1.global.log_level,
      value2: config2.global.log_level,
    });
  }

  // Compare service configurations
  const services: Service[] = ["api", "database", "cache", "auth", "storage"];

  services.forEach((service) => {
    const service1 = config1.services[service];
    const service2 = config2.services[service];

    if (service1 && service2) {
      if (service1.url !== service2.url) {
        differences.push({
          path: `services.${service}.url`,
          value1: service1.url,
          value2: service2.url,
        });
      }

      if (service1.timeout !== service2.timeout) {
        differences.push({
          path: `services.${service}.timeout`,
          value1: service1.timeout,
          value2: service2.timeout,
        });
      }

      if (service1.ssl_enabled !== service2.ssl_enabled) {
        differences.push({
          path: `services.${service}.ssl_enabled`,
          value1: service1.ssl_enabled,
          value2: service2.ssl_enabled,
        });
      }
    }
  });

  return { differences };
}

// Test the configuration system
console.log("=== Configuration System Demo ===\n");

// Build configurations for different environments
const devConfig = buildConfig("development");
const stagingConfig = buildConfig("staging");
const prodConfig = buildConfig("production");

console.log("Development Configuration:");
console.log(`Environment: ${devConfig.environment}`);
console.log(`Debug mode: ${devConfig.global.debug}`);
console.log(`Log level: ${devConfig.global.log_level}`);
console.log(`API URL: ${devConfig.services.api.url}`);
console.log(`Database URL: ${devConfig.services.database.url}`);
console.log(`SSL enabled: ${devConfig.services.api.ssl_enabled}\n`);

console.log("Production Configuration:");
console.log(`Environment: ${prodConfig.environment}`);
console.log(`Debug mode: ${prodConfig.global.debug}`);
console.log(`Log level: ${prodConfig.global.log_level}`);
console.log(`API URL: ${prodConfig.services.api.url}`);
console.log(`Database URL: ${prodConfig.services.database.url}`);
console.log(`SSL enabled: ${prodConfig.services.api.ssl_enabled}\n`);

// Validate configurations
console.log("=== Configuration Validation ===");
[devConfig, stagingConfig, prodConfig].forEach((config) => {
  const validation = validateConfig(config);
  console.log(`${config.environment} config valid: ${validation.isValid}`);
  if (!validation.isValid) {
    console.log("Errors:", validation.errors);
  }
});

// Compare configurations
console.log("\n=== Configuration Comparison ===");
const devVsProd = compareConfigs(devConfig, prodConfig);
console.log("Differences between development and production:");
devVsProd.differences.forEach((diff) => {
  console.log(`  ${diff.path}: ${diff.value1} → ${diff.value2}`);
});

// Generate environment variable keys
console.log("\n=== Environment Variable Keys ===");
const prodEnvKeys = generateEnvKeys("production");
console.log("Production environment variables needed:");
prodEnvKeys.slice(0, 10).forEach((key) => console.log(`  ${key}`));
console.log(`  ... and ${prodEnvKeys.length - 10} more`);

// Load configuration from environment variables
console.log("\n=== Loading from Environment Variables ===");
loadConfigFromEnv("staging");
```

</details>

---

## 🎯 Key Takeaways

After completing this lesson, you should understand:

### ✅ Literal Type Fundamentals:

- **String literals** for exact string values and controlled vocabularies
- **Numeric literals** for specific numbers and status codes
- **Boolean literals** for exact true/false constraints
- **Template literals** for dynamic string pattern types

### ✅ Practical Applications:

- **API design** - exact HTTP methods, status codes, and endpoints
- **Configuration** - valid themes, environments, and settings
- **Event systems** - type-safe event names and data structures
- **CSS and styling** - precise class names and property combinations

### ✅ Advanced Patterns:

- **Union types** with literals for controlled choices
- **Template literal manipulation** for dynamic type generation
- **Conditional types** with literal constraints
- **Branded types** for additional type safety

### ✅ Best Practices:

- **Use literals for finite sets** of valid values
- **Combine with unions** to create controlled vocabularies
- **Leverage template literals** for systematic naming patterns
- **Apply exhaustiveness checking** with switch statements

---

## 🚀 What's Next?

Congratulations! You've mastered literal types in TypeScript. You now know how to:

- ✅ **Create precise type constraints** with exact values
- ✅ **Build type-safe APIs** with controlled vocabularies
- ✅ **Use template literals** for dynamic string patterns
- ✅ **Combine literal types** with other TypeScript features
- ✅ **Design robust systems** with compile-time guarantees

**Next Lesson**: `11-enums.md` - Learn about enums for named constants, computed values, and when to use enums vs literal types!

---

_Remember: Literal types give you exact control over possible values. They're perfect for APIs, configurations, and any scenario where you want to restrict choices to specific, known values!_ 🎯
