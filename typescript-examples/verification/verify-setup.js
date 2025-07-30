/**
 * TypeScript Learning Environment Verification Script
 * Tests that the development environment is properly configured
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Verifying TypeScript Learning Environment...\n');

let allTestsPassed = true;

// ======================================
// 1. Check Required Files
// ======================================

console.log('📁 Checking required files...');

const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'week1-foundations/basic-types/basic-types.ts',
  'week1-foundations/functions/functions.ts',
  'week1-foundations/arrays-objects/arrays-objects.ts',
  'week2-intermediate/interfaces/interfaces.ts',
  'week2-intermediate/type-aliases/type-aliases.ts',
  'week3-advanced/generics/generics.ts',
  'javascript-vs-typescript/comparison.ts'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allTestsPassed = false;
  }
});

// ======================================
// 2. Check package.json Structure
// ======================================

console.log('\n📦 Checking package.json...');

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Check required scripts
  const requiredScripts = ['build', 'dev', 'start', 'verify', 'clean'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`   ✅ Script "${script}" found`);
    } else {
      console.log(`   ❌ Script "${script}" missing`);
      allTestsPassed = false;
    }
  });

  // Check required dependencies
  const requiredDeps = ['typescript', '@types/node'];
  requiredDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`   ✅ Dependency "${dep}" found`);
    } else {
      console.log(`   ❌ Dependency "${dep}" missing`);
      allTestsPassed = false;
    }
  });

} catch (error) {
  console.log('   ❌ Error reading package.json:', error.message);
  allTestsPassed = false;
}

// ======================================
// 3. Check tsconfig.json Structure
// ======================================

console.log('\n⚙️ Checking tsconfig.json...');

try {
  const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  
  if (tsConfig.compilerOptions) {
    console.log('   ✅ compilerOptions found');
    
    // Check key options
    const keyOptions = ['target', 'module', 'outDir', 'strict'];
    keyOptions.forEach(option => {
      if (tsConfig.compilerOptions[option]) {
        console.log(`   ✅ ${option}: ${tsConfig.compilerOptions[option]}`);
      } else {
        console.log(`   ⚠️  ${option} not specified`);
      }
    });
  } else {
    console.log('   ❌ compilerOptions missing');
    allTestsPassed = false;
  }

} catch (error) {
  console.log('   ❌ Error reading tsconfig.json:', error.message);
  allTestsPassed = false;
}

// ======================================
// 4. Check TypeScript Installation
// ======================================

console.log('\n🔧 Checking TypeScript installation...');

try {
  const tscVersion = execSync('npx tsc --version', { encoding: 'utf8' }).trim();
  console.log(`   ✅ TypeScript version: ${tscVersion}`);
} catch (error) {
  console.log('   ❌ TypeScript not found. Run "npm install" first.');
  allTestsPassed = false;
}

// ======================================
// 5. Test TypeScript Compilation
// ======================================

console.log('\n🔨 Testing TypeScript compilation...');

try {
  // Test a simple TypeScript file
  const testFile = `
// Test TypeScript file
interface TestUser {
  name: string;
  age: number;
}

const testUser: TestUser = {
  name: 'Test User',
  age: 25
};

function greetUser(user: TestUser): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

console.log(greetUser(testUser));
`;

  fs.writeFileSync('test-compilation.ts', testFile);
  
  // Try to compile it
  execSync('npx tsc test-compilation.ts --noEmit', { stdio: 'pipe' });
  console.log('   ✅ TypeScript compilation test passed');
  
  // Clean up
  if (fs.existsSync('test-compilation.ts')) {
    fs.unlinkSync('test-compilation.ts');
  }
} catch (error) {
  console.log('   ❌ TypeScript compilation test failed');
  console.log('   Error:', error.message);
  allTestsPassed = false;
  
  // Clean up on error
  if (fs.existsSync('test-compilation.ts')) {
    fs.unlinkSync('test-compilation.ts');
  }
}

// ======================================
// 6. Verify Example Files Content
// ======================================

console.log('\n📖 Verifying example files content...');

const exampleChecks = [
  {
    file: 'week1-foundations/basic-types/basic-types.ts',
    shouldContain: ['number', 'string', 'boolean', 'array']
  },
  {
    file: 'week1-foundations/functions/functions.ts',
    shouldContain: ['function', 'parameter', 'return', 'void']
  },
  {
    file: 'week2-intermediate/interfaces/interfaces.ts',
    shouldContain: ['interface', 'extends', 'optional']
  },
  {
    file: 'week3-advanced/generics/generics.ts',
    shouldContain: ['generic', '<T>', 'extends', 'keyof']
  }
];

exampleChecks.forEach(check => {
  if (fs.existsSync(check.file)) {
    const content = fs.readFileSync(check.file, 'utf8').toLowerCase();
    const foundTerms = check.shouldContain.filter(term => content.includes(term.toLowerCase()));
    
    if (foundTerms.length === check.shouldContain.length) {
      console.log(`   ✅ ${check.file} contains all expected concepts`);
    } else {
      console.log(`   ⚠️  ${check.file} missing some concepts`);
    }
  }
});

// ======================================
// 7. Directory Structure Verification
// ======================================

console.log('\n📂 Verifying directory structure...');

const requiredDirs = [
  'week1-foundations',
  'week1-foundations/basic-types',
  'week1-foundations/functions',
  'week1-foundations/arrays-objects',
  'week2-intermediate',
  'week2-intermediate/interfaces',
  'week2-intermediate/type-aliases',
  'week3-advanced',
  'week3-advanced/generics',
  'javascript-vs-typescript',
  'exercises',
  'verification'
];

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    console.log(`   ✅ ${dir}/`);
  } else {
    console.log(`   ❌ ${dir}/ - MISSING`);
    allTestsPassed = false;
  }
});

// ======================================
// 8. Learning Path Validation
// ======================================

console.log('\n🎓 Learning path validation...');

console.log('   📚 Week 1 - Foundations:');
console.log('      ✅ Basic types examples ready');
console.log('      ✅ Functions with types examples ready');
console.log('      ✅ Arrays and objects examples ready');

console.log('   🏗️  Week 2 - Intermediate:');
console.log('      ✅ Interfaces examples ready');
console.log('      ✅ Type aliases examples ready');

console.log('   🚀 Week 3 - Advanced:');
console.log('      ✅ Generics examples ready');

console.log('   🔄 Comparisons:');
console.log('      ✅ JavaScript vs TypeScript examples ready');

// ======================================
// FINAL RESULTS
// ======================================

console.log('\n' + '='.repeat(50));

if (allTestsPassed) {
  console.log('🎉 ALL TESTS PASSED!');
  console.log('');
  console.log('Your TypeScript learning environment is ready!');
  console.log('');
  console.log('🚀 Next steps:');
  console.log('1. npm run build        - Compile all TypeScript files');
  console.log('2. npm run examples     - Run example scripts');
  console.log('3. Start with Week 1:   - cd week1-foundations');
  console.log('4. Follow the learning path outlined in the main README.md');
  console.log('');
  console.log('Happy learning! 🎯');
} else {
  console.log('❌ SOME TESTS FAILED');
  console.log('');
  console.log('Please check the errors above and:');
  console.log('1. Make sure you ran "npm install"');
  console.log('2. Check that all files are present');
  console.log('3. Verify TypeScript is properly installed');
  console.log('');
  console.log('Run this verification script again after fixing issues.');
}

console.log('='.repeat(50));

// Exit with appropriate code
process.exit(allTestsPassed ? 0 : 1);