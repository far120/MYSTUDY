# Project Setup - Configuring TypeScript Projects 🚀

**Master Project Configuration!** Learn how to set up professional TypeScript projects with proper tooling, configuration, and development workflows.

## 🎯 Learning Objectives

- Create and configure TypeScript projects from scratch
- Understand tsconfig.json options and best practices
- Set up development workflows with build tools
- Configure linting, formatting, and testing
- Organize project structure for scalability

---

## 🏗️ Creating a New TypeScript Project

```bash
# Create project directory
mkdir my-typescript-app
cd my-typescript-app

# Initialize npm project
npm init -y

# Install TypeScript
npm install -D typescript @types/node

# Create TypeScript config
npx tsc --init

# Install development dependencies
npm install -D ts-node nodemon eslint prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D jest @types/jest ts-jest
```

## ⚙️ TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    // Language and Environment
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "CommonJS",
    "moduleResolution": "node",

    // Emit
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Interop Constraints
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,

    // Type Checking
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,

    // Completeness
    "skipLibCheck": true,

    // Advanced
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "resolveJsonModule": true,

    // Path Mapping
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@models/*": ["src/models/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
```

## 📦 Package.json Scripts

```json
{
  "name": "my-typescript-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write src/**/*.ts",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "@types/jest": "^29.0.0",
    "@types/node": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "nodemon": "^2.0.0",
    "prettier": "^2.7.0",
    "ts-jest": "^29.0.0",
    "ts-node": "^10.0.0",
    "typescript": "^4.8.0"
  }
}
```

## 🎯 ESLint Configuration (.eslintrc.json)

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-const": "error",
    "@typescript-eslint/no-inferrable-types": "off",
    "prefer-const": "error",
    "no-var": "error"
  },
  "env": {
    "node": true,
    "es6": true,
    "jest": true
  }
}
```

## 🎨 Prettier Configuration (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## 🧪 Jest Configuration (jest.config.js)

```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.test.ts",
    "!src/**/*.spec.ts",
    "!src/index.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
```

## 📁 Recommended Project Structure

```
my-typescript-app/
├── src/
│   ├── controllers/
│   │   ├── UserController.ts
│   │   └── ProductController.ts
│   ├── models/
│   │   ├── User.ts
│   │   └── Product.ts
│   ├── services/
│   │   ├── UserService.ts
│   │   └── ProductService.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validation.ts
│   │   └── helpers.ts
│   ├── types/
│   │   ├── api.ts
│   │   └── common.ts
│   ├── __tests__/
│   │   ├── services/
│   │   └── utils/
│   └── index.ts
├── dist/ (generated)
├── coverage/ (generated)
├── node_modules/
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## 🚀 Advanced Build Setup with Webpack

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@models": path.resolve(__dirname, "src/models"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

## 🔧 Development Workflow

```typescript
// src/index.ts - Main application entry point
import { UserService } from "@services/UserService";
import { ProductService } from "@services/ProductService";
import { logger } from "@utils/logger";

class Application {
  private userService: UserService;
  private productService: ProductService;

  constructor() {
    this.userService = new UserService();
    this.productService = new ProductService();
  }

  public async start(): Promise<void> {
    try {
      logger.info("Starting application...");

      // Initialize services
      await this.userService.initialize();
      await this.productService.initialize();

      logger.info("Application started successfully");
    } catch (error) {
      logger.error("Failed to start application:", error);
      process.exit(1);
    }
  }
}

const app = new Application();
app.start().catch(console.error);
```

## 🎮 Quick Start Template

```bash
# Clone or create this structure
mkdir my-app && cd my-app

# Copy configuration files
# (tsconfig.json, package.json, etc.)

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production
npm start
```

🎯 **Next**: Learn working with libraries in lesson 20!
