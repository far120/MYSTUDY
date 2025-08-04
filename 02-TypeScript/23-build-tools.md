# Lesson 23: Build Tools - Compilation and Optimization ⚙️

## 🎯 What You'll Learn

By the end of this lesson, you'll understand:

- How the TypeScript compiler works
- Configuring tsconfig.json for different environments
- Setting up build pipelines with Webpack and Vite
- Optimizing TypeScript for production
- Source maps and debugging
- Tree shaking and code splitting

## 🤔 Why Do We Need Build Tools?

TypeScript needs to be compiled to JavaScript before it can run in browsers or Node.js. Build tools help us:

- **Compile TypeScript to JavaScript** - Convert .ts files to .js files
- **Bundle multiple files** - Combine many files into fewer files
- **Optimize for production** - Minify, tree shake, and compress code
- **Handle assets** - Process CSS, images, and other resources
- **Enable hot reloading** - See changes instantly during development

## 🔧 TypeScript Compiler (tsc)

### 1. **Basic Compilation**

```bash
# Compile a single file
tsc app.ts

# Compile all files in project
tsc

# Watch mode - recompile on changes
tsc --watch

# Compile to specific directory
tsc --outDir dist

# Compile with specific target
tsc --target ES2020
```

### 2. **tsconfig.json - The Heart of TypeScript Projects**

```json
// filepath: d:\React\02-TypeScript\tsconfig.json
{
  "compilerOptions": {
    // Target JavaScript version
    "target": "ES2020",

    // Module system to use
    "module": "commonjs",

    // Where to output compiled files
    "outDir": "./dist",

    // Where TypeScript files are located
    "rootDir": "./src",

    // Enable all strict type-checking options
    "strict": true,

    // Generate source maps for debugging
    "sourceMap": true,

    // Allow importing JSON files
    "resolveJsonModule": true,

    // Enable experimental decorators
    "experimentalDecorators": true,

    // Emit decorator metadata
    "emitDecoratorMetadata": true,

    // Skip type checking of declaration files
    "skipLibCheck": true,

    // Module resolution strategy
    "moduleResolution": "node",

    // Allow default imports from modules with no default export
    "allowSyntheticDefaultImports": true,

    // Enable interoperability between CommonJS and ES Modules
    "esModuleInterop": true,

    // Include type definitions
    "lib": ["ES2020", "DOM"],

    // Path mapping for imports
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  },

  // Which files to include
  "include": ["src/**/*"],

  // Which files to exclude
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### 3. **Multiple Configuration Files**

```json
// filepath: d:\React\02-TypeScript\tsconfig.dev.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "./dev-build",
    "target": "ES2020",
    "moduleResolution": "node"
  },
  "include": ["src/**/*", "tests/**/*"]
}
```

```json
// filepath: d:\React\02-TypeScript\tsconfig.prod.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": false,
    "outDir": "./dist",
    "target": "ES2018",
    "removeComments": true,
    "declaration": true,
    "declarationMap": false
  },
  "exclude": ["node_modules", "tests", "**/*.test.ts", "**/*.spec.ts"]
}
```

## 📦 Package.json Scripts

```json
// filepath: d:\React\02-TypeScript\package.json
{
  "name": "typescript-project",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc -p tsconfig.prod.json",
    "build:dev": "tsc -p tsconfig.dev.json",
    "watch": "tsc -p tsconfig.dev.json --watch",
    "clean": "rimraf dist dev-build",
    "prebuild": "npm run clean",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "ts-node": "^10.9.0",
    "@types/node": "^18.0.0",
    "rimraf": "^5.0.0",
    "eslint": "^8.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "@typescript-eslint/eslint-plugin": "^5.0.0"
  }
}
```

## 🚀 Modern Build Tools

### 1. **Vite (Recommended for Modern Projects)**

```bash
# Install Vite with TypeScript template
npm create vite@latest my-app -- --template vanilla-ts

# Or add to existing project
npm install --save-dev vite @vitejs/plugin-react
```

```typescript
// filepath: d:\React\02-TypeScript\vite.config.ts
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Entry points
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin.html"),
      },
    },
  },

  // Path aliases
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@utils": resolve(__dirname, "src/utils"),
    },
  },

  // Development server
  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
```

### 2. **Webpack Configuration**

```javascript
// filepath: d:\React\02-TypeScript\webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.ts",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      clean: true,
    },

    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css",
            }),
          ]
        : []),
    ],

    devtool: isProduction ? "source-map" : "eval-source-map",

    devServer: {
      static: "./dist",
      hot: true,
      port: 3000,
    },

    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };
};
```

## 🎯 Advanced Build Optimization

### 1. **Tree Shaking - Remove Unused Code**

```typescript
// filepath: d:\React\02-TypeScript\src\utils/index.ts
// Only export what you need

// ❌ This exports everything, preventing tree shaking
export * from "./math";
export * from "./string";
export * from "./date";

// ✅ This allows tree shaking
export { add, subtract } from "./math";
export { capitalize } from "./string";
export { formatDate } from "./date";
```

```typescript
// filepath: d:\React\02-TypeScript\src\app.ts
// Import only what you need
import { add, capitalize } from "@utils"; // ✅ Only these functions will be bundled
```

### 2. **Code Splitting with Dynamic Imports**

```typescript
// filepath: d:\React\02-TypeScript\src\app.ts
class App {
  async loadAdminModule() {
    // Dynamically import modules when needed
    const adminModule = await import("./admin/admin-dashboard");
    return adminModule.AdminDashboard;
  }

  async loadChartLibrary() {
    // Lazy load heavy libraries
    const chartLibrary = await import("chart.js");
    return chartLibrary;
  }

  async handleRoute(route: string) {
    switch (route) {
      case "/admin":
        const AdminDashboard = await this.loadAdminModule();
        return new AdminDashboard();

      case "/charts":
        const charts = await this.loadChartLibrary();
        return charts;

      default:
        // Load default content synchronously
        return import("./home/home-page");
    }
  }
}
```

### 3. **Environment-Specific Builds**

```typescript
// filepath: d:\React\02-TypeScript\src\config.ts
interface Config {
  apiUrl: string;
  debug: boolean;
  version: string;
}

const configs: Record<string, Config> = {
  development: {
    apiUrl: "http://localhost:3001/api",
    debug: true,
    version: process.env.npm_package_version || "1.0.0",
  },

  production: {
    apiUrl: "https://api.myapp.com",
    debug: false,
    version: process.env.npm_package_version || "1.0.0",
  },

  test: {
    apiUrl: "http://localhost:3001/api",
    debug: false,
    version: "1.0.0-test",
  },
};

const environment = process.env.NODE_ENV || "development";
export const config = configs[environment];
```

## 🔍 Source Maps and Debugging

### 1. **Source Map Configuration**

```json
// Different source map options for different needs
{
  "compilerOptions": {
    // Development - fast rebuilds, larger files
    "sourceMap": true,

    // Production - slower builds, smaller files, external maps
    "sourceMap": false,
    "inlineSourceMap": false,
    "declarationMap": true
  }
}
```

### 2. **Debugging Setup for VS Code**

```json
// filepath: d:\React\02-TypeScript\.vscode\launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug TypeScript",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/index.ts",
      "runtimeArgs": ["-r", "ts-node/register"],
      "env": {
        "NODE_ENV": "development"
      },
      "sourceMaps": true,
      "cwd": "${workspaceRoot}",
      "protocol": "inspector"
    },
    {
      "name": "Debug Compiled JS",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/dist/index.js",
      "sourceMaps": true,
      "smartStep": true
    }
  ]
}
```

## 🏗️ Complete Project Setup Example

```bash
# Project structure
my-typescript-app/
├── src/
│   ├── components/
│   ├── utils/
│   ├── types/
│   └── index.ts
├── tests/
├── dist/
├── package.json
├── tsconfig.json
├── tsconfig.prod.json
├── webpack.config.js
└── .eslintrc.js
```

```json
// filepath: d:\React\02-TypeScript\package.json
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production --config webpack.config.js",
    "build:analyze": "webpack-bundle-analyzer dist/main.*.js",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "lint": "eslint src --ext .ts",
    "clean": "rimraf dist"
  }
}
```

## 🎯 Production Optimization Checklist

### ✅ Build Optimization:

1. **Enable strict mode** in tsconfig.json
2. **Use tree shaking** to remove unused code
3. **Split code** into chunks for better caching
4. **Minimize bundle size** with proper imports
5. **Generate source maps** for debugging
6. **Use content hashing** for cache busting

### ✅ Performance:

1. **Lazy load** heavy modules
2. **Preload critical** resources
3. **Compress assets** (gzip/brotli)
4. **Optimize images** and static assets
5. **Use CDN** for libraries when possible

## 🏆 Best Practices

### ✅ Do This:

1. **Use different configs** for dev/prod environments
2. **Enable source maps** for debugging
3. **Split vendor and app code** for better caching
4. **Monitor bundle size** regularly
5. **Use dynamic imports** for code splitting

### ❌ Avoid This:

1. **Don't import entire libraries** - import only what you need
2. **Don't ignore build warnings** - they indicate potential issues
3. **Don't ship source maps to production** - unless needed for debugging
4. **Don't bundle dev dependencies** in production

## 🎯 Key Takeaways

1. **TypeScript compilation is highly configurable** through tsconfig.json
2. **Modern build tools like Vite offer better developer experience**
3. **Source maps are essential for debugging compiled code**
4. **Code splitting and tree shaking reduce bundle sizes**
5. **Different configurations for different environments improve performance**

## 🚀 Next Steps

In our final lesson, we'll cover **Best Practices** - professional patterns and conventions that will make you a TypeScript expert!

---

**Remember**: A well-configured build system is the foundation of professional TypeScript development! ⚙️
