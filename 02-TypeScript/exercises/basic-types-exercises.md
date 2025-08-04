## 🎮 Hands-On Exercises: Master Basic Types

### Exercise 1: Personal Information System

Create a TypeScript program that manages personal information with proper types:

```typescript
// src/personal-info.ts

// Your task: Add proper types to all variables and functions!

function createPersonProfile(
  firstName, // Add type here
  lastName, // Add type here
  age, // Add type here
  email, // Add type here
  isEmployed, // Add type here
  salary // Add type here - should be optional
) {
  return {
    fullName: firstName + " " + lastName,
    age: age,
    email: email,
    isEmployed: isEmployed,
    salary: salary || 0,
    isAdult: age >= 18,
    canRetire: age >= 65,
  };
}

// Test cases - make sure these work with your types:
let person1 = createPersonProfile(
  "John",
  "Doe",
  30,
  "john@email.com",
  true,
  50000
);
let person2 = createPersonProfile("Jane", "Smith", 17, "jane@email.com", false);
let person3 = createPersonProfile(
  "Bob",
  "Wilson",
  70,
  "bob@email.com",
  false,
  0
);

console.log("Person 1:", person1);
console.log("Person 2:", person2);
console.log("Person 3:", person3);
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// src/personal-info.ts - Solution

function createPersonProfile(
  firstName: string,
  lastName: string,
  age: number,
  email: string,
  isEmployed: boolean,
  salary?: number // Optional parameter
): {
  fullName: string;
  age: number;
  email: string;
  isEmployed: boolean;
  salary: number;
  isAdult: boolean;
  canRetire: boolean;
} {
  return {
    fullName: firstName + " " + lastName,
    age: age,
    email: email,
    isEmployed: isEmployed,
    salary: salary || 0,
    isAdult: age >= 18,
    canRetire: age >= 65,
  };
}

// Test cases work perfectly now!
let person1 = createPersonProfile(
  "John",
  "Doe",
  30,
  "john@email.com",
  true,
  50000
);
let person2 = createPersonProfile("Jane", "Smith", 17, "jane@email.com", false);
let person3 = createPersonProfile(
  "Bob",
  "Wilson",
  70,
  "bob@email.com",
  false,
  0
);

console.log("Person 1:", person1);
console.log("Person 2:", person2);
console.log("Person 3:", person3);
```

</details>

### Exercise 2: Type-Safe Calculator

Build a calculator that only accepts numbers and prevents common errors:

```typescript
// src/calculator.ts

// Your task: Add types to make this calculator bulletproof!

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  // Add division by zero protection!
  return a / b;
}

function calculatePercentage(value, percentage) {
  return value * (percentage / 100);
}

// Test your calculator - these should all work:
console.log("Addition:", add(10, 5));
console.log("Subtraction:", subtract(10, 5));
console.log("Multiplication:", multiply(10, 5));
console.log("Division:", divide(10, 5));
console.log("Division by zero:", divide(10, 0)); // Handle this!
console.log("Percentage:", calculatePercentage(200, 15));

// These should cause TypeScript errors:
// console.log("Bad addition:", add("10", "5"));
// console.log("Bad percentage:", calculatePercentage("200", "15"));
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// src/calculator.ts - Solution

function add(a: number, b: number): number {
  return a + b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

function calculatePercentage(value: number, percentage: number): number {
  return value * (percentage / 100);
}

// Safe division function that returns null instead of throwing
function safeDivide(a: number, b: number): number | null {
  if (b === 0) {
    return null;
  }
  return a / b;
}

// Test the calculator
console.log("Addition:", add(10, 5)); // 15
console.log("Subtraction:", subtract(10, 5)); // 5
console.log("Multiplication:", multiply(10, 5)); // 50
console.log("Division:", divide(10, 5)); // 2
console.log("Safe division by zero:", safeDivide(10, 0)); // null
console.log("Percentage:", calculatePercentage(200, 15)); // 30
```

</details>

### Exercise 3: String Processing Toolkit

Create a set of string utility functions with proper types:

```typescript
// src/string-utils.ts

// Your task: Add types and implement these string utilities!

function capitalizeFirstLetter(text) {
  // Capitalize the first letter of a string
}

function countWords(text) {
  // Count the number of words in a string
}

function isPalindrome(text) {
  // Check if a string reads the same forwards and backwards
}

function reverseString(text) {
  // Reverse a string
}

function containsOnlyNumbers(text) {
  // Check if string contains only numeric characters
}

function formatPhoneNumber(phoneNumber) {
  // Format a phone number like: (123) 456-7890
  // Assume input is 10 digits
}

// Test your functions:
console.log(capitalizeFirstLetter("hello world")); // "Hello world"
console.log(countWords("TypeScript is awesome")); // 3
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
console.log(reverseString("TypeScript")); // "tpircSepyT"
console.log(containsOnlyNumbers("12345")); // true
console.log(containsOnlyNumbers("123abc")); // false
console.log(formatPhoneNumber("1234567890")); // "(123) 456-7890"
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// src/string-utils.ts - Solution

function capitalizeFirstLetter(text: string): string {
  if (text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

function isPalindrome(text: string): boolean {
  const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}

function reverseString(text: string): string {
  return text.split("").reverse().join("");
}

function containsOnlyNumbers(text: string): boolean {
  return /^\d+$/.test(text);
}

function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length !== 10) {
    throw new Error("Phone number must be 10 digits");
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6)}`;
}

// Test the functions
console.log(capitalizeFirstLetter("hello world")); // "Hello world"
console.log(countWords("TypeScript is awesome")); // 3
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
console.log(reverseString("TypeScript")); // "tpircSepyT"
console.log(containsOnlyNumbers("12345")); // true
console.log(containsOnlyNumbers("123abc")); // false
console.log(formatPhoneNumber("1234567890")); // "(123) 456-7890"
```

</details>

### Exercise 4: Type Safety Challenge

Fix the type errors in this problematic code:

```typescript
// src/type-challenge.ts

// This code has many type errors - fix them all!

function processUserData(data) {
  // Should accept an object with specific properties
  let name = data.firstName + " " + data.lastName;
  let age = data.age;
  let email = data.email;

  if (age >= 18) {
    return {
      fullName: name,
      age: age,
      email: email,
      status: "adult",
    };
  } else {
    return {
      fullName: name,
      age: age,
      email: email,
      status: "minor",
    };
  }
}

function sendWelcomeEmail(userInfo) {
  console.log(`Sending welcome email to ${userInfo.email}`);
  console.log(`Dear ${userInfo.fullName},`);
  console.log(`Welcome! You are ${userInfo.age} years old.`);
  return true;
}

// These calls should work:
let user1 = processUserData({
  firstName: "Alice",
  lastName: "Johnson",
  age: 25,
  email: "alice@example.com",
});

let user2 = processUserData({
  firstName: "Bob",
  lastName: "Smith",
  age: 16,
  email: "bob@example.com",
});

sendWelcomeEmail(user1);
sendWelcomeEmail(user2);

// These should cause errors:
// processUserData("invalid");
// processUserData({ firstName: "John" }); // Missing required properties
// sendWelcomeEmail("invalid");
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// src/type-challenge.ts - Solution

// Define interfaces for type safety
interface UserInput {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

interface ProcessedUser {
  fullName: string;
  age: number;
  email: string;
  status: "adult" | "minor";
}

function processUserData(data: UserInput): ProcessedUser {
  let name: string = data.firstName + " " + data.lastName;
  let age: number = data.age;
  let email: string = data.email;

  if (age >= 18) {
    return {
      fullName: name,
      age: age,
      email: email,
      status: "adult",
    };
  } else {
    return {
      fullName: name,
      age: age,
      email: email,
      status: "minor",
    };
  }
}

function sendWelcomeEmail(userInfo: ProcessedUser): boolean {
  console.log(`Sending welcome email to ${userInfo.email}`);
  console.log(`Dear ${userInfo.fullName},`);
  console.log(`Welcome! You are ${userInfo.age} years old.`);
  console.log(`Status: ${userInfo.status}`);
  return true;
}

// These calls work perfectly now:
let user1 = processUserData({
  firstName: "Alice",
  lastName: "Johnson",
  age: 25,
  email: "alice@example.com",
});

let user2 = processUserData({
  firstName: "Bob",
  lastName: "Smith",
  age: 16,
  email: "bob@example.com",
});

sendWelcomeEmail(user1);
sendWelcomeEmail(user2);

// TypeScript will now catch these errors:
// processUserData("invalid");                    // Error: string not assignable to UserInput
// processUserData({ firstName: "John" });        // Error: missing required properties
// sendWelcomeEmail("invalid");                   // Error: string not assignable to ProcessedUser
```

</details>

---

## 🚀 Test Your Knowledge

Run these exercises and make sure you understand why each works or fails:

```bash
# Create and run each exercise
npx ts-node src/personal-info.ts
npx ts-node src/calculator.ts
npx ts-node src/string-utils.ts
npx ts-node src/type-challenge.ts
```

---

## 💡 Key Takeaways

From these exercises, you should now understand:

1. **Type Annotations**: How to add types to variables and functions
2. **Function Parameters**: How to type parameters and return values
3. **Error Prevention**: How types catch bugs before runtime
4. **Optional Parameters**: Using `?` for optional function parameters
5. **Type Safety**: Why proper typing makes code more reliable

---

## 🎯 What's Next?

Congratulations! You've mastered TypeScript's basic types. You now know:

- ✅ **Number type**: For all numeric values
- ✅ **String type**: For text and template literals
- ✅ **Boolean type**: For true/false values
- ✅ **Any type**: When to use (and avoid) it
- ✅ **Unknown type**: Safer alternative to any
- ✅ **Void type**: For functions with no return value
- ✅ **Never type**: For values that never occur

**Next lesson**: `03-functions-with-types.md` - Deep dive into function typing, parameters, and advanced function patterns!

---

_Remember: Types are your friends! They catch errors early, improve code readability, and make your applications more reliable. Practice adding types to every variable and function you write!_ 🚀
