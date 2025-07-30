# 8. Practice Project: Simple Calculator 🧮

## 🎯 Project Overview

Congratulations! You've learned variables, operations, conditions, comparisons, and logical operators. Now it's time to put it all together in your first real project - a simple calculator that can perform basic math operations and make smart decisions!

## 🎯 Learning Objectives

By building this calculator, you'll practice:

- Using all the concepts you've learned so far
- Writing a complete program from start to finish
- Debugging and testing your code
- Creating user-friendly output

## 📋 Project Requirements

Your calculator should be able to:

1. **Perform basic operations**: addition, subtraction, multiplication, division
2. **Handle different input types**: make sure inputs are valid numbers
3. **Prevent errors**: don't divide by zero!
4. **Provide clear feedback**: tell users what happened
5. **Be user-friendly**: clear instructions and output

## 🏗️ Step-by-Step Build Guide

### Step 1: Set Up Your Variables

```javascript
// Calculator inputs
let num1 = 10;
let num2 = 5;
let operation = "+"; // Can be: +, -, *, /

console.log("=== Simple Calculator ===");
console.log(`First number: ${num1}`);
console.log(`Second number: ${num2}`);
console.log(`Operation: ${operation}`);
console.log("========================");
```

### Step 2: Input Validation

```javascript
// Check if inputs are valid numbers
let isNum1Valid = typeof num1 === "number" && !isNaN(num1);
let isNum2Valid = typeof num2 === "number" && !isNaN(num2);
let inputsAreValid = isNum1Valid && isNum2Valid;

console.log("Input validation:");
console.log(`Number 1 is valid: ${isNum1Valid}`);
console.log(`Number 2 is valid: ${isNum2Valid}`);
console.log(`All inputs valid: ${inputsAreValid}`);
```

### Step 3: Basic Operations

```javascript
if (inputsAreValid) {
  let result;
  let operationSuccess = true;

  if (operation === "+") {
    result = num1 + num2;
    console.log(`${num1} + ${num2} = ${result}`);
  } else if (operation === "-") {
    result = num1 - num2;
    console.log(`${num1} - ${num2} = ${result}`);
  } else if (operation === "*") {
    result = num1 * num2;
    console.log(`${num1} × ${num2} = ${result}`);
  } else if (operation === "/") {
    if (num2 !== 0) {
      result = num1 / num2;
      console.log(`${num1} ÷ ${num2} = ${result}`);
    } else {
      console.log("Error: Cannot divide by zero!");
      operationSuccess = false;
    }
  } else {
    console.log(`Error: Unknown operation '${operation}'`);
    operationSuccess = false;
  }

  if (operationSuccess) {
    console.log(`Operation completed successfully!`);
  }
} else {
  console.log("Error: Invalid inputs. Please provide valid numbers.");
}
```

### Step 4: Enhanced Features

```javascript
// Add more features to make it better!

// Round result to 2 decimal places for division
if (operation === "/" && operationSuccess) {
  let roundedResult = Math.round(result * 100) / 100;
  console.log(`Rounded result: ${roundedResult}`);
}

// Categorize the result
if (operationSuccess && typeof result === "number") {
  let isPositive = result > 0;
  let isNegative = result < 0;
  let isZero = result === 0;
  let isWhole = result % 1 === 0;

  console.log("\nResult analysis:");
  console.log(`Is positive: ${isPositive}`);
  console.log(`Is negative: ${isNegative}`);
  console.log(`Is zero: ${isZero}`);
  console.log(`Is whole number: ${isWhole}`);
}
```

## 🚀 Complete Calculator Example

Here's a complete working calculator:

```javascript
// === SIMPLE CALCULATOR PROJECT ===

// Configuration - Change these values to test!
let num1 = 15;
let num2 = 4;
let operation = "/";

console.log("🧮 === SIMPLE CALCULATOR === 🧮");
console.log(`First number: ${num1}`);
console.log(`Second number: ${num2}`);
console.log(`Operation: ${operation}`);
console.log("================================");

// Input validation
let isNum1Valid = typeof num1 === "number" && !isNaN(num1);
let isNum2Valid = typeof num2 === "number" && !isNaN(num2);
let inputsAreValid = isNum1Valid && isNum2Valid;

// Valid operations
let validOperations = ["+", "-", "*", "/"];
let isOperationValid = validOperations.includes(operation);

if (!inputsAreValid) {
  console.log("❌ Error: Please provide valid numbers!");
} else if (!isOperationValid) {
  console.log(`❌ Error: '${operation}' is not a valid operation!`);
  console.log("Valid operations: +, -, *, /");
} else {
  // Perform calculation
  let result;
  let success = true;

  if (operation === "+") {
    result = num1 + num2;
    console.log(`✅ ${num1} + ${num2} = ${result}`);
  } else if (operation === "-") {
    result = num1 - num2;
    console.log(`✅ ${num1} - ${num2} = ${result}`);
  } else if (operation === "*") {
    result = num1 * num2;
    console.log(`✅ ${num1} × ${num2} = ${result}`);
  } else if (operation === "/") {
    if (num2 === 0) {
      console.log("❌ Error: Cannot divide by zero!");
      success = false;
    } else {
      result = num1 / num2;
      let roundedResult = Math.round(result * 100) / 100;
      console.log(`✅ ${num1} ÷ ${num2} = ${roundedResult}`);
      result = roundedResult;
    }
  }

  // Additional analysis if calculation was successful
  if (success) {
    console.log("\n📊 Result Analysis:");

    // Number properties
    let isPositive = result > 0;
    let isNegative = result < 0;
    let isZero = result === 0;
    let isWhole = result % 1 === 0;
    let isEven = isWhole && result % 2 === 0;
    let isOdd = isWhole && result % 2 !== 0;

    console.log(`Is positive: ${isPositive}`);
    console.log(`Is negative: ${isNegative}`);
    console.log(`Is zero: ${isZero}`);
    console.log(`Is whole number: ${isWhole}`);

    if (isWhole) {
      console.log(`Is even: ${isEven}`);
      console.log(`Is odd: ${isOdd}`);
    }

    // Size categories
    let isLarge = Math.abs(result) > 100;
    let isSmall = Math.abs(result) < 1 && result !== 0;

    if (isLarge) {
      console.log("📈 This is a large number!");
    } else if (isSmall) {
      console.log("📉 This is a small number!");
    }

    console.log("\n🎉 Calculation completed successfully!");
  }
}

console.log("\n=== Calculator End ===");
```

## 🧪 Testing Your Calculator

Test your calculator with these different scenarios:

### Test Case 1: Basic Operations

```javascript
// Test addition
let num1 = 10,
  num2 = 5,
  operation = "+"; // Expected: 15

// Test subtraction
let num1 = 10,
  num2 = 3,
  operation = "-"; // Expected: 7

// Test multiplication
let num1 = 6,
  num2 = 4,
  operation = "*"; // Expected: 24

// Test division
let num1 = 15,
  num2 = 3,
  operation = "/"; // Expected: 5
```

### Test Case 2: Edge Cases

```javascript
// Division by zero
let num1 = 10,
  num2 = 0,
  operation = "/"; // Expected: Error message

// Division with decimals
let num1 = 10,
  num2 = 3,
  operation = "/"; // Expected: 3.33

// Negative numbers
let num1 = -5,
  num2 = 3,
  operation = "+"; // Expected: -2

// Zero operations
let num1 = 0,
  num2 = 5,
  operation = "*"; // Expected: 0
```

### Test Case 3: Invalid Inputs

```javascript
// Invalid operation
let num1 = 5,
  num2 = 3,
  operation = "%"; // Expected: Error message

// Invalid numbers (you can simulate this by changing the validation)
let num1 = "hello",
  num2 = 5,
  operation = "+"; // Expected: Error message
```

## 🏋️‍♂️ Enhancement Challenges

Once your basic calculator works, try adding these features:

### Challenge 1: More Operations

Add support for:

- `%` for modulus (remainder)
- `**` for exponentiation (power)
- `sqrt` for square root

### Challenge 2: Multiple Numbers

Modify your calculator to work with three numbers:

```javascript
let num1 = 10,
  num2 = 5,
  num3 = 2;
let operation1 = "+",
  operation2 = "*";
// Calculate: (10 + 5) * 2 = 30
```

### Challenge 3: Memory Feature

Add a memory feature:

```javascript
let memory = 0;
let useMemory = true;

if (useMemory) {
  num1 = memory; // Use stored result as first number
}

// After calculation, store result in memory
memory = result;
```

### Challenge 4: Scientific Calculator

Add scientific functions:

```javascript
// Add these operations
if (operation === "sin") {
  result = Math.sin((num1 * Math.PI) / 180); // Convert degrees to radians
} else if (operation === "cos") {
  result = Math.cos((num1 * Math.PI) / 180);
} else if (operation === "log") {
  result = Math.log10(num1);
}
```

## 🐛 Common Issues and Solutions

### Issue 1: Unexpected Results

```javascript
// Problem: 0.1 + 0.2 doesn't equal 0.3
let result = 0.1 + 0.2; // 0.30000000000000004

// Solution: Round decimal operations
let result = Math.round((0.1 + 0.2) * 100) / 100; // 0.3
```

### Issue 2: Division by Zero

```javascript
// Always check before dividing
if (operation === "/" && num2 === 0) {
  console.log("Cannot divide by zero!");
} else {
  result = num1 / num2;
}
```

### Issue 3: Invalid Operations

```javascript
// Check if operation is supported
let validOps = ["+", "-", "*", "/"];
if (!validOps.includes(operation)) {
  console.log(`Invalid operation: ${operation}`);
}
```

## 📚 What You've Learned

By completing this calculator project, you've successfully:

✅ **Combined multiple concepts** - variables, operations, conditions, comparisons, logical operators  
✅ **Created a complete program** - from input to output  
✅ **Handled edge cases** - division by zero, invalid inputs  
✅ **Added user-friendly features** - clear messages, result analysis  
✅ **Practiced debugging** - testing different scenarios  
✅ **Built something useful** - a working calculator!

## ➡️ What's Next?

Congratulations on building your first complete program! 🎉

In the next phase, you'll learn about **loops** - a powerful way to repeat tasks efficiently. You'll discover how to make your programs do repetitive work automatically, which will open up a whole new world of possibilities!

Your next lesson: **9. What are Loops? - Repeating Tasks Efficiently**

## 💡 Project Ideas for Later

Keep these ideas in mind as you learn more concepts:

- **Grade Calculator** - Calculate GPA from multiple grades
- **Tip Calculator** - Calculate tips and split bills
- **Unit Converter** - Convert between different measurements
- **Loan Calculator** - Calculate monthly payments
- **BMI Calculator** - Calculate body mass index

You now have the foundation to build any of these! 🚀
