# Working with Libraries - Type Definitions 📚

**Master Library Integration!** Learn how to work with JavaScript libraries in TypeScript, handle type definitions, and create your own declaration files.

## 🎯 Learning Objectives

- Install and use type definitions for libraries
- Work with DefinitelyTyped (@types packages)
- Create custom declaration files
- Handle untyped libraries safely
- Integrate popular libraries with TypeScript

---

## 📦 Installing Type Definitions

```bash
# Install library and its types
npm install express
npm install -D @types/express

# Install library with built-in types
npm install axios  # Already includes TypeScript types

# Check if types are available
npm search @types/library-name

# Popular libraries with types
npm install -D @types/node @types/jest @types/lodash
```

## 🔧 Using Typed Libraries

```typescript
// Express with types
import express, { Request, Response, NextFunction } from "express";

const app = express();

// Type-safe middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Type-safe route handlers
app.get("/users/:id", (req: Request, res: Response) => {
  const userId: string = req.params.id; // TypeScript knows this is a string
  res.json({ id: userId, name: "John Doe" });
});

// Lodash with types
import _ from "lodash";

const numbers: number[] = [1, 2, 3, 4, 5];
const doubled: number[] = _.map(numbers, (n) => n * 2); // Type-safe

// Axios with types (built-in)
import axios, { AxiosResponse } from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response: AxiosResponse<User> = await axios.get(`/api/users/${id}`);
  return response.data; // TypeScript knows this is a User
}
```

## 📝 Creating Declaration Files

```typescript
// types/myLibrary.d.ts - Custom declaration file
declare module "untyped-library" {
  export interface Config {
    apiKey: string;
    endpoint: string;
  }

  export class Client {
    constructor(config: Config);
    get(path: string): Promise<any>;
    post(path: string, data: any): Promise<any>;
  }

  export function createClient(config: Config): Client;
}

// types/global.d.ts - Global type extensions
declare global {
  interface Window {
    myGlobalFunction: (data: any) => void;
    APP_CONFIG: {
      version: string;
      environment: "development" | "production";
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      PORT?: string;
    }
  }
}

export {}; // Make this a module

// Usage in your code
const client = createClient({
  apiKey: "your-api-key",
  endpoint: "https://api.example.com",
});

window.myGlobalFunction({ message: "Hello" });
console.log(process.env.DATABASE_URL); // Type-safe environment variables
```

## 🛡️ Handling Untyped Libraries

```typescript
// Method 1: Basic declaration
declare module "untyped-lib" {
  const untypedLib: any;
  export default untypedLib;
}

// Method 2: Partial typing
declare module "partially-typed-lib" {
  export interface Options {
    timeout?: number;
    retries?: number;
  }

  export function connect(url: string, options?: Options): Promise<any>;
  export function disconnect(): void;
}

// Method 3: Type assertions
import someLib from "untyped-lib";

interface ExpectedAPI {
  getData(): Promise<any[]>;
  setConfig(config: object): void;
}

const typedLib = someLib as ExpectedAPI;
typedLib.getData().then((data) => {
  // TypeScript now knows getData returns Promise<any[]>
});

// Method 4: Wrapper approach
class SafeLibWrapper {
  private lib: any;

  constructor() {
    this.lib = require("unsafe-lib");
  }

  public async fetchData(id: string): Promise<{ id: string; data: any }> {
    try {
      const result = await this.lib.fetch(id);
      return { id, data: result };
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  public configure(options: { timeout: number; maxRetries: number }): void {
    this.lib.setOptions(options);
  }
}
```

## 🏗️ Real-World Example: Database Integration

```typescript
// types/database.d.ts
declare module "awesome-db" {
  export interface ConnectionConfig {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    ssl?: boolean;
  }

  export interface QueryResult<T = any> {
    rows: T[];
    rowCount: number;
    command: string;
  }

  export class Database {
    constructor(config: ConnectionConfig);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    query<T = any>(sql: string, params?: any[]): Promise<QueryResult<T>>;
    transaction<T>(callback: (db: Database) => Promise<T>): Promise<T>;
  }

  export function createConnection(config: ConnectionConfig): Database;
}

// src/database/Connection.ts
import { Database, ConnectionConfig, QueryResult } from "awesome-db";

export class DatabaseService {
  private db: Database;

  constructor(config: ConnectionConfig) {
    this.db = new Database(config);
  }

  async initialize(): Promise<void> {
    await this.db.connect();
    console.log("Database connected");
  }

  async findUserById(id: string): Promise<User | null> {
    const result: QueryResult<User> = await this.db.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async createUser(userData: Omit<User, "id">): Promise<User> {
    const result: QueryResult<User> = await this.db.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [userData.name, userData.email]
    );
    return result.rows[0];
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    return await this.db.transaction(async (txDb) => {
      const user = await this.findUserById(id);
      if (!user) return null;

      const result: QueryResult<User> = await txDb.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [updates.name || user.name, updates.email || user.email, id]
      );
      return result.rows[0];
    });
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
```

## 🔧 Advanced Library Integration

```typescript
// src/services/ExternalAPIService.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { z } from "zod"; // Runtime validation library

// API response schemas
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zipcode: z.string(),
  }),
});

const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

type User = z.infer<typeof UserSchema>;
type Post = z.infer<typeof PostSchema>;

export class ExternalAPIService {
  private client: AxiosInstance;

  constructor(baseURL: string, apiKey: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Type-safe interceptors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  async getUser(id: number): Promise<User> {
    const response = await this.client.get(`/users/${id}`);
    return UserSchema.parse(response.data); // Runtime validation
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    const response = await this.client.get(`/users/${userId}/posts`);
    return z.array(PostSchema).parse(response.data);
  }

  async createPost(post: Omit<Post, "id">): Promise<Post> {
    const response = await this.client.post("/posts", post);
    return PostSchema.parse(response.data);
  }

  async updatePost(
    id: number,
    updates: Partial<Omit<Post, "id">>
  ): Promise<Post> {
    const response = await this.client.patch(`/posts/${id}`, updates);
    return PostSchema.parse(response.data);
  }
}

// src/config/environment.ts
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string(),
  API_KEY: z.string(),
  JWT_SECRET: z.string(),
});

export const env = EnvSchema.parse(process.env);

// Usage
const apiService = new ExternalAPIService(
  "https://jsonplaceholder.typicode.com",
  env.API_KEY
);

async function example() {
  try {
    const user = await apiService.getUser(1);
    console.log("User:", user);

    const posts = await apiService.getUserPosts(user.id);
    console.log("Posts:", posts);

    const newPost = await apiService.createPost({
      title: "My New Post",
      body: "This is the content",
      userId: user.id,
    });
    console.log("Created post:", newPost);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

🎯 **Next**: Learn error handling in lesson 21!
