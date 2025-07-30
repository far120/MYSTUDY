#!/usr/bin/env node

/**
 * TypeScript Learning Environment Setup Script
 * 
 * This script creates a complete TypeScript development environment
 * with examples, exercises, and verification tools following the
 * 3-week learning path outlined in the README.md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up TypeScript Learning Environment...\n');

// Create main directory structure
const baseDir = path.join(__dirname, 'typescript-examples');
const directories = [
  'week1-foundations',
  'week1-foundations/basic-types',
  'week1-foundations/functions',
  'week1-foundations/arrays-objects',
  'week2-intermediate',
  'week2-intermediate/interfaces',
  'week2-intermediate/type-aliases',
  'week2-intermediate/optional-properties',
  'week3-advanced',
  'week3-advanced/generics',
  'week3-advanced/classes',
  'week3-advanced/modules',
  'javascript-vs-typescript',
  'exercises',
  'verification'
];

console.log('📁 Creating directory structure...');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir);
}

directories.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`   ✅ Created: ${dir}`);
  }
});

console.log('\n📦 Creating package.json...');
const packageJson = {
  "name": "typescript-learning-examples",
  "version": "1.0.0",
  "description": "Comprehensive TypeScript learning examples and exercises",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/index.js",
    "verify": "node verification/verify-setup.js",
    "clean": "rm -rf dist",
    "examples": "npm run build && node dist/examples/run-examples.js"
  },
  "keywords": ["typescript", "learning", "examples", "tutorial"],
  "author": "TypeScript Learning Track",
  "license": "MIT",
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
};

fs.writeFileSync(
  path.join(baseDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

console.log('⚙️ Creating tsconfig.json...');
const tsConfig = {
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
};

fs.writeFileSync(
  path.join(baseDir, 'tsconfig.json'),
  JSON.stringify(tsConfig, null, 2)
);

console.log('📚 Setup complete! Next steps:');
console.log('');
console.log('1. cd typescript-examples');
console.log('2. npm install');
console.log('3. npm run verify');
console.log('4. Start learning with Week 1 examples!');
console.log('');
console.log('🎯 Your TypeScript learning environment is ready! 🎉');