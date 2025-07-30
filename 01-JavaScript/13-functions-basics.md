# 13. Functions Basics - Organizing Your Code 🏗️

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- What functions are and why they're essential for good code organization
- How to create and call your own functions
- The difference between function declarations and expressions
- How to make your code more readable and reusable
- Best practices for naming and organizing functions

## 🤔 What Are Functions?

Functions are like recipes in programming - they're named blocks of code that perform specific tasks. Just like a recipe for "Make Pancakes" contains all the steps to make pancakes, a function contains all the code to accomplish a particular goal.

Think of functions as:

- **Recipes**: A set of instructions with a name
- **Tools**: Reusable pieces that do specific jobs
- **Organizers**: Ways to break big problems into smaller pieces

### Why Use Functions?

#### Without Functions (Messy!)

```javascript
// Calculating area of circle 1
let radius1 = 5;
let area1 = 3.14159 * radius1 * radius1;
console.log(`Circle 1 area: ${area1}`);

// Calculating area of circle 2
let radius2 = 10;
let area2 = 3.14159 * radius2 * radius2;
console.log(`Circle 2 area: ${area2}`);

// Calculating area of circle 3
let radius3 = 7;
let area3 = 3.14159 * radius3 * radius3;
console.log(`Circle 3 area: ${area3}`);

// Repetitive and error-prone! 😰
```

#### With Functions (Clean!)

```javascript
function calculateCircleArea(radius) {
  return 3.14159 * radius * radius;
}

// Now we can reuse it easily!
console.log(`Circle 1 area: ${calculateCircleArea(5)}`);
console.log(`Circle 2 area: ${calculateCircleArea(10)}`);
console.log(`Circle 3 area: ${calculateCircleArea(7)}`);

// Clean, reusable, and easy to understand! ✨
```

## 🔧 Basic Function Syntax

### Function Declaration

```javascript
function functionName() {
  // code to execute
}

// Example: Simple greeting
function sayHello() {
  console.log("Hello, world!");
}

// Call (use) the function
sayHello(); // Output: Hello, world!
```

### Function with Parameters

```javascript
function functionName(parameter1, parameter2) {
  // code that uses the parameters
}

// Example: Personalized greeting
function greetPerson(name) {
  console.log(`Hello, ${name}! Nice to meet you!`);
}

// Call with different arguments
greetPerson("Alice"); // Output: Hello, Alice! Nice to meet you!
greetPerson("Bob"); // Output: Hello, Bob! Nice to meet you!
```

### Function with Return Value

```javascript
function functionName(parameters) {
  // do some work
  return result;
}

// Example: Simple calculator
function addNumbers(a, b) {
  let sum = a + b;
  return sum;
}

// Use the returned value
let result = addNumbers(5, 3);
console.log(`5 + 3 = ${result}`); // Output: 5 + 3 = 8
```

## 🎯 Real-World Function Examples

### Example 1: User Authentication

```javascript
function checkPassword(password) {
  console.log(`Checking password: ${password}`);

  // Check password requirements
  let isLongEnough = password.length >= 8;
  let hasNumber = /[0-9]/.test(password);
  let hasLetter = /[a-zA-Z]/.test(password);
  let hasSpecial = /[!@#$%^&*]/.test(password);

  console.log(`Length >= 8: ${isLongEnough}`);
  console.log(`Has number: ${hasNumber}`);
  console.log(`Has letter: ${hasLetter}`);
  console.log(`Has special char: ${hasSpecial}`);

  let isValid = isLongEnough && hasNumber && hasLetter && hasSpecial;

  if (isValid) {
    console.log("✅ Password is strong!");
  } else {
    console.log("❌ Password needs improvement.");
  }

  return isValid;
}

// Test different passwords
checkPassword("weak"); // Invalid
checkPassword("StrongPass123!"); // Valid
```

### Example 2: Grade Calculator

```javascript
function calculateLetterGrade(score) {
  console.log(`Calculating grade for score: ${score}`);

  let letterGrade;

  if (score >= 90) {
    letterGrade = "A";
  } else if (score >= 80) {
    letterGrade = "B";
  } else if (score >= 70) {
    letterGrade = "C";
  } else if (score >= 60) {
    letterGrade = "D";
  } else {
    letterGrade = "F";
  }

  console.log(`Score ${score} = Grade ${letterGrade}`);
  return letterGrade;
}

// Calculate grades for different students
let student1Grade = calculateLetterGrade(95);
let student2Grade = calculateLetterGrade(73);
let student3Grade = calculateLetterGrade(58);

console.log("Class Grades:", [student1Grade, student2Grade, student3Grade]);
```

### Example 3: Shopping Cart Functions

```javascript
function calculateTax(price, taxRate) {
  let tax = price * (taxRate / 100);
  console.log(`Tax on $${price} at ${taxRate}%: $${tax.toFixed(2)}`);
  return tax;
}

function calculateTotal(price, taxRate) {
  let tax = calculateTax(price, taxRate);
  let total = price + tax;
  console.log(`Total: $${price} + $${tax.toFixed(2)} = $${total.toFixed(2)}`);
  return total;
}

function applyDiscount(price, discountPercent) {
  let discount = price * (discountPercent / 100);
  let finalPrice = price - discount;
  console.log(
    `Discount: ${discountPercent}% off $${price} = $${finalPrice.toFixed(2)}`
  );
  return finalPrice;
}

// Use the functions together
let itemPrice = 100;
let discountedPrice = applyDiscount(itemPrice, 20); // $80
let finalTotal = calculateTotal(discountedPrice, 8.5); // $86.80
```

## 🔄 Function Expressions

Besides function declarations, you can also create functions using expressions:

### Function Expression

```javascript
let functionName = function () {
  // code here
};

// Example
let multiply = function (a, b) {
  return a * b;
};

console.log(multiply(4, 5)); // Output: 20
```

### Arrow Functions (Preview - we'll learn more later)

```javascript
let functionName = (parameters) => {
  // code here
};

// Example
let divide = (a, b) => {
  return a / b;
};

console.log(divide(10, 2)); // Output: 5
```

## 🧮 Mathematical Functions

### Example 1: Area Calculators

```javascript
function calculateRectangleArea(width, height) {
  let area = width * height;
  console.log(`Rectangle ${width}×${height} = ${area} square units`);
  return area;
}

function calculateCircleArea(radius) {
  let area = Math.PI * radius * radius;
  console.log(`Circle radius ${radius} = ${area.toFixed(2)} square units`);
  return area;
}

function calculateTriangleArea(base, height) {
  let area = (base * height) / 2;
  console.log(`Triangle base ${base}, height ${height} = ${area} square units`);
  return area;
}

// Calculate different areas
let rectArea = calculateRectangleArea(10, 5);
let circleArea = calculateCircleArea(3);
let triArea = calculateTriangleArea(8, 6);

console.log(`Total area: ${rectArea + circleArea + triArea}`);
```

### Example 2: Temperature Converter

```javascript
function celsiusToFahrenheit(celsius) {
  let fahrenheit = (celsius * 9) / 5 + 32;
  console.log(`${celsius}°C = ${fahrenheit}°F`);
  return fahrenheit;
}

function fahrenheitToCelsius(fahrenheit) {
  let celsius = ((fahrenheit - 32) * 5) / 9;
  console.log(`${fahrenheit}°F = ${celsius.toFixed(1)}°C`);
  return celsius;
}

function kelvinToCelsius(kelvin) {
  let celsius = kelvin - 273.15;
  console.log(`${kelvin}K = ${celsius.toFixed(1)}°C`);
  return celsius;
}

// Convert temperatures
celsiusToFahrenheit(25); // 77°F
fahrenheitToCelsius(98.6); // 37°C
kelvinToCelsius(373.15); // 100°C
```

## 🎲 Game-Related Functions

### Example 1: Dice Rolling

```javascript
function rollDie() {
  let roll = Math.floor(Math.random() * 6) + 1;
  console.log(`🎲 Rolled: ${roll}`);
  return roll;
}

function rollMultipleDice(numberOfDice) {
  console.log(`Rolling ${numberOfDice} dice:`);
  let total = 0;
  let rolls = [];

  for (let i = 1; i <= numberOfDice; i++) {
    let roll = rollDie();
    rolls.push(roll);
    total += roll;
  }

  console.log(`Rolls: ${rolls.join(", ")}`);
  console.log(`Total: ${total}`);
  return { rolls: rolls, total: total };
}

// Roll dice
let singleRoll = rollDie();
let multipleRolls = rollMultipleDice(3);
```

### Example 2: Random Name Generator

```javascript
function generateRandomName() {
  let firstNames = ["Alex", "Sam", "Jordan", "Casey", "Riley"];
  let lastNames = ["Smith", "Johnson", "Brown", "Davis", "Wilson"];

  let randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
  let randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];

  let fullName = `${randomFirst} ${randomLast}`;
  console.log(`Generated name: ${fullName}`);
  return fullName;
}

function generateRandomCharacter() {
  let name = generateRandomName();
  let age = Math.floor(Math.random() * 50) + 18; // 18-67
  let professions = ["Warrior", "Mage", "Archer", "Healer", "Thief"];
  let profession = professions[Math.floor(Math.random() * professions.length)];

  let character = {
    name: name,
    age: age,
    profession: profession,
  };

  console.log(
    `Character: ${character.name}, age ${character.age}, ${character.profession}`
  );
  return character;
}

// Generate characters
let hero = generateRandomCharacter();
let villain = generateRandomCharacter();
```

## 🔧 Utility Functions

### Example 1: Text Processing

```javascript
function capitalizeWord(word) {
  if (word.length === 0) return word;
  let capitalized = word[0].toUpperCase() + word.slice(1).toLowerCase();
  console.log(`"${word}" → "${capitalized}"`);
  return capitalized;
}

function capitalizeWords(sentence) {
  console.log(`Capitalizing: "${sentence}"`);
  let words = sentence.split(" ");
  let capitalizedWords = [];

  for (let i = 0; i < words.length; i++) {
    capitalizedWords.push(capitalizeWord(words[i]));
  }

  let result = capitalizedWords.join(" ");
  console.log(`Result: "${result}"`);
  return result;
}

function countWords(text) {
  let words = text.split(" ").filter((word) => word.length > 0);
  let count = words.length;
  console.log(`"${text}" has ${count} words`);
  return count;
}

// Use text functions
capitalizeWords("hello world javascript");
countWords("Functions make code organization easy");
```

### Example 2: Array Helpers

```javascript
function findLargest(numbers) {
  console.log(`Finding largest in: [${numbers.join(", ")}]`);

  if (numbers.length === 0) {
    console.log("Empty array - no largest number");
    return null;
  }

  let largest = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }

  console.log(`Largest number: ${largest}`);
  return largest;
}

function calculateAverage(numbers) {
  console.log(`Calculating average of: [${numbers.join(", ")}]`);

  if (numbers.length === 0) {
    console.log("Empty array - no average");
    return 0;
  }

  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  let average = sum / numbers.length;
  console.log(`Average: ${sum} ÷ ${numbers.length} = ${average}`);
  return average;
}

// Test array functions
let testNumbers = [15, 3, 9, 21, 7];
findLargest(testNumbers);
calculateAverage(testNumbers);
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Basic Functions

```javascript
// Create a function that greets someone with their age
function greetWithAge(name, age) {
  console.log(`Hello ${name}! You are ${age} years old.`);
}

// Create a function that calculates the square of a number
function square(number) {
  let result = number * number;
  console.log(`${number}² = ${result}`);
  return result;
}

// Create a function that checks if a number is even
function isEven(number) {
  let even = number % 2 === 0;
  console.log(`${number} is ${even ? "even" : "odd"}`);
  return even;
}

// Test your functions
greetWithAge("Alice", 25);
square(7);
isEven(12);
isEven(15);
```

### Exercise 2: More Complex Functions

```javascript
// Function to validate email format (simple version)
function isValidEmail(email) {
  let hasAt = email.includes("@");
  let hasDot = email.includes(".");
  let isValid = hasAt && hasDot && email.length > 5;

  console.log(`Email "${email}" is ${isValid ? "valid" : "invalid"}`);
  return isValid;
}

// Function to generate a simple password
function generatePassword(length) {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  console.log(`Generated ${length}-character password: ${password}`);
  return password;
}

// Test your functions
isValidEmail("user@example.com");
isValidEmail("invalid-email");
generatePassword(8);
```

## 🧪 Challenge Problems

### Challenge 1: Calculator Functions

```javascript
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
  if (b === 0) {
    console.log("Error: Cannot divide by zero!");
    return null;
  }
  return a / b;
}

function calculate(operation, a, b) {
  console.log(`Calculating: ${a} ${operation} ${b}`);

  let result;
  if (operation === "+") {
    result = add(a, b);
  } else if (operation === "-") {
    result = subtract(a, b);
  } else if (operation === "*") {
    result = multiply(a, b);
  } else if (operation === "/") {
    result = divide(a, b);
  } else {
    console.log("Error: Unknown operation!");
    return null;
  }

  console.log(`Result: ${result}`);
  return result;
}

// Test calculator
calculate("+", 10, 5); // 15
calculate("/", 10, 3); // 3.333...
calculate("/", 10, 0); // Error
```

### Challenge 2: String Analyzer

```javascript
function analyzeString(text) {
  console.log(`Analyzing: "${text}"`);

  let analysis = {
    length: text.length,
    words: text.split(" ").length,
    vowels: 0,
    consonants: 0,
    numbers: 0,
    spaces: 0,
  };

  let vowelLetters = "aeiouAEIOU";

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    if (char === " ") {
      analysis.spaces++;
    } else if (char >= "0" && char <= "9") {
      analysis.numbers++;
    } else if (vowelLetters.includes(char)) {
      analysis.vowels++;
    } else if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) {
      analysis.consonants++;
    }
  }

  console.log("Analysis results:");
  console.log(`Length: ${analysis.length}`);
  console.log(`Words: ${analysis.words}`);
  console.log(`Vowels: ${analysis.vowels}`);
  console.log(`Consonants: ${analysis.consonants}`);
  console.log(`Numbers: ${analysis.numbers}`);
  console.log(`Spaces: ${analysis.spaces}`);

  return analysis;
}

// Test string analyzer
analyzeString("Hello World 123!");
```

## ⚠️ Common Function Mistakes

### Mistake 1: Forgetting to Return

```javascript
// ❌ Function doesn't return anything
function addNumbers(a, b) {
  let sum = a + b;
  // Missing return statement!
}

let result = addNumbers(5, 3);
console.log(result); // undefined

// ✅ Proper return
function addNumbers(a, b) {
  let sum = a + b;
  return sum; // Now it returns the result
}
```

### Mistake 2: Wrong Parameter Names

```javascript
// ❌ Confusing parameter names
function calculateArea(x, y) {
  return x * y; // What are x and y?
}

// ✅ Clear parameter names
function calculateRectangleArea(width, height) {
  return width * height; // Much clearer!
}
```

### Mistake 3: Functions Too Complex

```javascript
// ❌ Function doing too many things
function processUserDataAndCalculateAndDisplay(user) {
  // Validates user
  // Calculates something
  // Formats data
  // Displays result
  // Too much in one function!
}

// ✅ Break into smaller functions
function validateUser(user) {
  /* ... */
}
function calculateSomething(data) {
  /* ... */
}
function formatData(data) {
  /* ... */
}
function displayResult(result) {
  /* ... */
}
```

## 📚 Function Best Practices

### 1. Use Descriptive Names

```javascript
// ❌ Unclear names
function calc(x, y) {
  return x + y;
}
function process(data) {
  /* ... */
}

// ✅ Clear, descriptive names
function addNumbers(a, b) {
  return a + b;
}
function validateEmailAddress(email) {
  /* ... */
}
```

### 2. Keep Functions Small

```javascript
// ✅ One function, one purpose
function calculateTax(price, rate) {
  return price * (rate / 100);
}

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}
```

### 3. Use Consistent Style

```javascript
// ✅ Consistent formatting
function calculateTotal(price, tax) {
  let total = price + tax;
  return total;
}

function calculateDiscount(price, percent) {
  let discount = price * (percent / 100);
  return discount;
}
```

## 📚 Key Takeaways

1. **Functions organize code** - Break big problems into smaller pieces
2. **Functions promote reuse** - Write once, use many times
3. **Functions improve readability** - Clear names explain what code does
4. **Functions take parameters** - Input data to work with
5. **Functions can return values** - Output results for use elsewhere
6. **Functions should do one thing well** - Single responsibility principle

## ➡️ What's Next?

Excellent! You now understand the basics of functions and how they help organize your code. 🎉

Next, you'll learn about **Function Parameters** - how to make your functions more flexible by accepting different types of input, handling optional parameters, and providing default values.

Your next lesson: **14. Function Parameters - Making Functions Flexible**

## 🔗 Quick Reference

```javascript
// Function declaration
function functionName(parameters) {
  // code here
  return result; // optional
}

// Function call
let result = functionName(arguments);

// Function expression
let myFunc = function (parameters) {
  // code here
};

// Basic patterns
function greet(name) {
  console.log(`Hello ${name}!`);
}
function add(a, b) {
  return a + b;
}
function isEven(num) {
  return num % 2 === 0;
}
```

You're building the foundation for clean, organized code! 🚀
