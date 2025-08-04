# TypeScript Setup Guide 🛠️

This guide will help you set up a complete TypeScript development environment for learning and practicing.

## 🚀 Quick Setup (5 minutes)

### Step 1: Verify Prerequisites

```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, download from: https://nodejs.org
```

### Step 2: Install TypeScript

```bash
# Install TypeScript globally
npm install -g typescript

# Install helpful development tools
npm install -g ts-node nodemon

# Verify installation
tsc --version
ts-node --version
```

### Step 3: Create Your Learning Project

```bash
# Create project directory
mkdir typescript-learning
cd typescript-learning

# Initialize npm project
npm init -y

# Install development dependencies
npm install --save-dev @types/node typescript

# Create TypeScript configuration
tsc --init
```

### Step 4: Set Up Project Structure

```bash
# Create directories
mkdir src
mkdir dist
mkdir exercises
mkdir examples

# Create your first TypeScript file
echo 'console.log("Hello, TypeScript!");' > src/index.ts
```

### Step 5: Configure TypeScript

Replace your `tsconfig.json` with this beginner-friendly configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "removeComments": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src/**/*", "exercises/**/*", "examples/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 6: Add npm Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "watch": "tsc --watch",
    "dev:watch": "nodemon --exec ts-node src/index.ts",
    "clean": "rm -rf dist",
    "test": "ts-node exercises/test-runner.ts"
  }
}
```

### Step 7: Test Your Setup

```bash
# Run your first TypeScript file
npm run dev

# Should output: Hello, TypeScript!
```

---

## 🎯 Development Workflow

### Option 1: Compile and Run

```bash
# Compile TypeScript to JavaScript
npm run build

# Run the compiled JavaScript
npm start
```

### Option 2: Run TypeScript Directly

```bash
# Run TypeScript file directly
npm run dev

# Or run specific file
npx ts-node src/specific-file.ts
```

### Option 3: Watch Mode (Recommended for Learning)

```bash
# Auto-compile on file changes
npm run watch

# Auto-run on file changes
npm run dev:watch
```

---

## 📁 Recommended Project Structure

```
typescript-learning/
├── src/                    # Main TypeScript source files
│   ├── index.ts           # Entry point
│   ├── basics/            # Basic concepts practice
│   ├── functions/         # Function-related examples
│   └── exercises/         # Completed exercises
├── exercises/             # Exercise files
│   ├── 01-basic-types.ts
│   ├── 02-functions.ts
│   └── test-runner.ts
├── examples/              # Example code from lessons
│   ├── hello-world.ts
│   └── calculator.ts
├── dist/                  # Compiled JavaScript (auto-generated)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ VS Code Setup (Recommended)

### Essential Extensions:

1. **TypeScript Importer** - Auto import suggestions
2. **Bracket Pair Colorizer** - Visual bracket matching
3. **Error Lens** - Inline error display
4. **Auto Rename Tag** - Rename paired tags
5. **GitLens** - Git integration

### VS Code Settings:

Add this to your VS Code settings (`Ctrl+,` then click the `{}` icon):

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "files.autoSave": "onFocusChange",
  "editor.formatOnSave": true,
  "editor.tabSize": 2
}
```

---

## 🎮 Quick Test Files

### Create `src/test-setup.ts`:

```typescript
// Test your TypeScript setup

// Basic types
const message: string = "TypeScript setup is working! 🎉";
const version: number = 1.0;
const isReady: boolean = true;

// Function with types
function greet(name: string, age: number): string {
  return `Hello ${name}, you are ${age} years old!`;
}

// Object with types
const developer: {
  name: string;
  skills: string[];
  yearsExperience: number;
} = {
  name: "Future TypeScript Expert",
  skills: ["JavaScript", "TypeScript", "React"],
  yearsExperience: 0,
};

// Array with types
const scores: number[] = [95, 87, 92, 100];

// Test output
console.log("=== TypeScript Setup Test ===");
console.log(message);
console.log(`Version: ${version}`);
console.log(`Ready: ${isReady}`);
console.log(greet(developer.name, developer.yearsExperience));
console.log(`Skills: ${developer.skills.join(", ")}`);
console.log(`Average score: ${scores.reduce((a, b) => a + b) / scores.length}`);

// Type error test (uncomment to see TypeScript catch the error)
// const wrongType: string = 123; // Should show error
```

### Run the test:

```bash
npx ts-node src/test-setup.ts
```

---

## 🔧 Troubleshooting

### Common Issues:

**Error: "tsc: command not found"**

```bash
# Solution: Install TypeScript globally
npm install -g typescript
```

**Error: "ts-node: command not found"**

```bash
# Solution: Install ts-node globally or use npx
npm install -g ts-node
# OR
npx ts-node filename.ts
```

**Error: "Cannot find module '@types/node'"**

```bash
# Solution: Install Node.js types
npm install --save-dev @types/node
```

**VS Code not showing TypeScript errors**

- Restart VS Code
- Check that you're in a TypeScript project
- Verify your `tsconfig.json` is valid
- Try `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

**TypeScript compilation errors**

- Check your `tsconfig.json` configuration
- Make sure all files are in the correct directories
- Verify your TypeScript version: `tsc --version`

---

## 🎯 Next Steps

Once your setup is complete:

1. **Test the installation** with the test file above
2. **Create your first program** following lesson examples
3. **Start with basic types** from `02-basic-types.md`
4. **Practice daily** with small exercises
5. **Build projects** to reinforce learning

---

## 📚 Additional Resources

### Official Documentation:

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)

### Helpful Tools:

- [TypeScript AST Viewer](https://ts-ast-viewer.com/)
- [TypeScript Error Translator](https://ts-error-translator.vercel.app/)

### Practice Platforms:

- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Exercism TypeScript Track](https://exercism.org/tracks/typescript)

---

_🎉 Congratulations! Your TypeScript development environment is ready. Start coding and enjoy the journey to becoming a TypeScript expert!_
