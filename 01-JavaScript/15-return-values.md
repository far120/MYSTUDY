# 15. Return Values - Getting Results Back ↩️

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- How to return values from functions and why it's important
- Different types of data you can return
- How to use returned values in your code
- When to return vs when to just perform actions
- Best practices for function return values

## 🤔 What Are Return Values?

A return value is data that a function sends back to the code that called it. Think of it like asking someone to do a calculation for you - they don't just tell you they did it, they give you the answer!

### Function Without Return (Action Only)

```javascript
function sayHello(name) {
  console.log(`Hello, ${name}!`);
  // This function DOES something but doesn't RETURN anything
}

sayHello("Alice"); // Prints: Hello, Alice!
let result = sayHello("Bob"); // result is undefined
console.log(result); // undefined
```

### Function With Return (Gives Back Data)

```javascript
function addNumbers(a, b) {
  let sum = a + b;
  return sum; // This function RETURNS the result
}

let result = addNumbers(5, 3); // result gets the value 8
console.log(result); // 8
console.log(addNumbers(10, 20)); // 30
```

## 🔄 Basic Return Examples

### Returning Numbers

```javascript
function calculateSquare(number) {
  console.log(`Calculating square of ${number}`);
  let square = number * number;
  return square;
}

function findLarger(a, b) {
  console.log(`Comparing ${a} and ${b}`);
  if (a > b) {
    return a;
  } else {
    return b;
  }
}

// Use the returned values
let squared = calculateSquare(7);
console.log(`7 squared is ${squared}`); // 7 squared is 49

let larger = findLarger(15, 23);
console.log(`The larger number is ${larger}`); // The larger number is 23
```

### Returning Strings

```javascript
function createFullName(firstName, lastName) {
  console.log(`Creating full name for ${firstName} ${lastName}`);
  return `${firstName} ${lastName}`;
}

function formatCurrency(amount) {
  console.log(`Formatting ${amount} as currency`);
  return `$${amount.toFixed(2)}`;
}

// Use the returned strings
let fullName = createFullName("John", "Doe");
console.log(`Full name: ${fullName}`); // Full name: John Doe

let price = formatCurrency(19.99);
console.log(`Price: ${price}`); // Price: $19.99
```

### Returning Booleans

```javascript
function isEven(number) {
  console.log(`Checking if ${number} is even`);
  return number % 2 === 0;
}

function isValidPassword(password) {
  console.log(`Validating password: ${password}`);
  let isLongEnough = password.length >= 8;
  let hasNumber = /\d/.test(password);
  let hasLetter = /[a-zA-Z]/.test(password);

  return isLongEnough && hasNumber && hasLetter;
}

// Use the returned booleans
if (isEven(12)) {
  console.log("12 is even!"); // This will run
}

if (isValidPassword("MyPass123")) {
  console.log("Password is valid!"); // This will run
} else {
  console.log("Password needs improvement!");
}
```

## 🎯 Real-World Return Examples

### Example 1: Shopping Cart Calculator

```javascript
function calculateSubtotal(items) {
  console.log("Calculating subtotal...");
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    let itemTotal = items[i].price * items[i].quantity;
    total += itemTotal;
    console.log(`${items[i].name}: $${itemTotal.toFixed(2)}`);
  }

  console.log(`Subtotal: $${total.toFixed(2)}`);
  return total;
}

function calculateTax(subtotal, taxRate) {
  console.log(`Calculating tax on $${subtotal} at ${taxRate}%`);
  let tax = subtotal * (taxRate / 100);
  return tax;
}

function calculateTotal(subtotal, tax, shipping) {
  console.log(`Calculating final total`);
  let total = subtotal + tax + shipping;
  return total;
}

// Use functions together with return values
let cartItems = [
  { name: "Laptop", price: 999.99, quantity: 1 },
  { name: "Mouse", price: 29.99, quantity: 2 },
];

let subtotal = calculateSubtotal(cartItems); // Returns 1059.97
let tax = calculateTax(subtotal, 8.5); // Returns ~90.10
let shipping = 9.99;
let finalTotal = calculateTotal(subtotal, tax, shipping); // Returns ~1159.06

console.log(`Final order total: $${finalTotal.toFixed(2)}`);
```

### Example 2: User Authentication System

```javascript
function validateUsername(username) {
  console.log(`Validating username: ${username}`);

  if (username.length < 3) {
    return { valid: false, message: "Username too short" };
  }

  if (username.length > 20) {
    return { valid: false, message: "Username too long" };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, message: "Username contains invalid characters" };
  }

  return { valid: true, message: "Username is valid" };
}

function validateEmail(email) {
  console.log(`Validating email: ${email}`);

  if (!email.includes("@")) {
    return { valid: false, message: "Email must contain @" };
  }

  if (!email.includes(".")) {
    return { valid: false, message: "Email must contain a domain" };
  }

  if (email.length < 5) {
    return { valid: false, message: "Email too short" };
  }

  return { valid: true, message: "Email is valid" };
}

function createAccount(username, email, password) {
  console.log("Attempting to create account...");

  let usernameCheck = validateUsername(username);
  let emailCheck = validateEmail(email);

  if (!usernameCheck.valid) {
    return { success: false, error: usernameCheck.message };
  }

  if (!emailCheck.valid) {
    return { success: false, error: emailCheck.message };
  }

  // If we get here, everything is valid
  return {
    success: true,
    user: {
      username: username,
      email: email,
      createdAt: new Date().toISOString(),
    },
  };
}

// Test account creation
let result1 = createAccount("john_doe", "john@email.com", "password123");
console.log("Account creation result:", result1);

let result2 = createAccount("ab", "invalid-email", "pass");
console.log("Account creation result:", result2);
```

### Example 3: Game Score Calculator

```javascript
function calculateBaseScore(level, enemiesDefeated, timeBonus) {
  console.log(`Calculating base score for level ${level}`);

  let levelMultiplier = level * 100;
  let enemyPoints = enemiesDefeated * 50;
  let baseScore = levelMultiplier + enemyPoints + timeBonus;

  console.log(`Level bonus: ${levelMultiplier}`);
  console.log(`Enemy points: ${enemyPoints}`);
  console.log(`Time bonus: ${timeBonus}`);
  console.log(`Base score: ${baseScore}`);

  return baseScore;
}

function applyDifficultyMultiplier(score, difficulty) {
  console.log(`Applying ${difficulty} difficulty multiplier`);

  let multipliers = {
    easy: 1.0,
    medium: 1.5,
    hard: 2.0,
    nightmare: 3.0,
  };

  let multiplier = multipliers[difficulty] || 1.0;
  let finalScore = Math.floor(score * multiplier);

  console.log(`Multiplier: ${multiplier}x`);
  console.log(`Final score: ${finalScore}`);

  return finalScore;
}

function determineRank(score) {
  console.log(`Determining rank for score: ${score}`);

  if (score >= 10000) {
    return { rank: "S", title: "Legendary" };
  } else if (score >= 7500) {
    return { rank: "A", title: "Master" };
  } else if (score >= 5000) {
    return { rank: "B", title: "Expert" };
  } else if (score >= 2500) {
    return { rank: "C", title: "Skilled" };
  } else {
    return { rank: "D", title: "Novice" };
  }
}

// Calculate complete game results
let baseScore = calculateBaseScore(5, 25, 500); // Returns 2250
let finalScore = applyDifficultyMultiplier(baseScore, "hard"); // Returns 4500
let ranking = determineRank(finalScore); // Returns { rank: "C", title: "Skilled" }

console.log(`\nGame Results:`);
console.log(`Final Score: ${finalScore}`);
console.log(`Rank: ${ranking.rank} - ${ranking.title}`);
```

## 📋 Returning Different Data Types

### Returning Arrays

```javascript
function getTopScores(scores, topCount = 3) {
  console.log(`Finding top ${topCount} scores from:`, scores);

  // Sort scores in descending order
  let sortedScores = [...scores].sort((a, b) => b - a);

  // Get top scores
  let topScores = sortedScores.slice(0, topCount);

  console.log(`Top ${topCount} scores:`, topScores);
  return topScores;
}

function generateRandomNumbers(count, min = 1, max = 100) {
  console.log(`Generating ${count} random numbers between ${min} and ${max}`);

  let numbers = [];
  for (let i = 0; i < count; i++) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.push(randomNum);
  }

  console.log("Generated numbers:", numbers);
  return numbers;
}

// Use array returns
let allScores = [95, 87, 92, 78, 99, 85, 88];
let topThree = getTopScores(allScores, 3);
console.log("Top 3 scores:", topThree);

let randomNums = generateRandomNumbers(5, 10, 50);
console.log("Random numbers:", randomNums);
```

### Returning Objects

```javascript
function analyzeText(text) {
  console.log(`Analyzing text: "${text}"`);

  let wordCount = text.split(" ").length;
  let charCount = text.length;
  let vowelCount = (text.match(/[aeiouAEIOU]/g) || []).length;
  let consonantCount = (
    text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []
  ).length;

  let analysis = {
    originalText: text,
    wordCount: wordCount,
    characterCount: charCount,
    vowelCount: vowelCount,
    consonantCount: consonantCount,
    averageWordLength: (charCount / wordCount).toFixed(1),
  };

  console.log("Analysis complete:", analysis);
  return analysis;
}

function createPerson(name, age, occupation, hobbies) {
  console.log(`Creating person profile for ${name}`);

  let person = {
    name: name,
    age: age,
    occupation: occupation,
    hobbies: hobbies,
    isAdult: age >= 18,
    profileCreated: new Date().toISOString(),

    // Method inside the returned object
    introduce: function () {
      return `Hi, I'm ${this.name}, a ${this.age}-year-old ${this.occupation}.`;
    },
  };

  console.log("Person created:", person);
  return person;
}

// Use object returns
let textAnalysis = analyzeText("JavaScript is an amazing programming language");
console.log(
  `The text has ${textAnalysis.wordCount} words and ${textAnalysis.vowelCount} vowels`
);

let person = createPerson("Alice", 28, "Developer", [
  "coding",
  "reading",
  "hiking",
]);
console.log(person.introduce());
```

## 🔧 Early Returns and Multiple Return Points

Sometimes you want to return early from a function:

### Example 1: Input Validation with Early Returns

```javascript
function processOrder(orderData) {
  console.log("Processing order:", orderData);

  // Early return for invalid input
  if (!orderData) {
    console.log("❌ No order data provided");
    return { success: false, error: "No order data" };
  }

  if (!orderData.items || orderData.items.length === 0) {
    console.log("❌ No items in order");
    return { success: false, error: "No items in cart" };
  }

  if (!orderData.customerEmail) {
    console.log("❌ Customer email required");
    return { success: false, error: "Email required" };
  }

  // If we get here, the order is valid
  console.log("✅ Order is valid, processing...");

  let total = 0;
  for (let item of orderData.items) {
    total += item.price * item.quantity;
  }

  return {
    success: true,
    orderNumber: Math.floor(Math.random() * 1000000),
    total: total,
    customerEmail: orderData.customerEmail,
    estimatedDelivery: "3-5 business days",
  };
}

// Test order processing
let validOrder = {
  customerEmail: "customer@email.com",
  items: [
    { name: "Widget", price: 19.99, quantity: 2 },
    { name: "Gadget", price: 29.99, quantity: 1 },
  ],
};

let invalidOrder = {
  items: [],
};

console.log(processOrder(validOrder));
console.log(processOrder(invalidOrder));
```

### Example 2: Search Function with Early Return

```javascript
function findStudent(students, searchId) {
  console.log(`Searching for student with ID: ${searchId}`);

  // Early return for invalid input
  if (!students || students.length === 0) {
    console.log("❌ No students to search");
    return null;
  }

  if (!searchId) {
    console.log("❌ No search ID provided");
    return null;
  }

  // Search through students
  for (let i = 0; i < students.length; i++) {
    let student = students[i];

    if (student.id === searchId) {
      console.log(`✅ Found student: ${student.name}`);
      return student; // Early return when found
    }
  }

  // If we get here, student wasn't found
  console.log(`❌ Student with ID ${searchId} not found`);
  return null;
}

// Test student search
let classList = [
  { id: 101, name: "Alice Johnson", grade: 85 },
  { id: 102, name: "Bob Smith", grade: 92 },
  { id: 103, name: "Charlie Brown", grade: 78 },
];

let foundStudent = findStudent(classList, 102);
if (foundStudent) {
  console.log(
    `Student found: ${foundStudent.name} (Grade: ${foundStudent.grade})`
  );
}

let notFound = findStudent(classList, 999);
console.log("Search result:", notFound);
```

## 🧮 Mathematical Return Functions

### Example 1: Statistical Calculations

```javascript
function calculateStats(numbers) {
  console.log("Calculating statistics for:", numbers);

  if (!numbers || numbers.length === 0) {
    return { error: "No numbers provided" };
  }

  let sum = 0;
  let min = numbers[0];
  let max = numbers[0];

  for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    sum += num;

    if (num < min) min = num;
    if (num > max) max = num;
  }

  let average = sum / numbers.length;
  let range = max - min;

  let stats = {
    count: numbers.length,
    sum: sum,
    average: parseFloat(average.toFixed(2)),
    min: min,
    max: max,
    range: range,
  };

  console.log("Statistics calculated:", stats);
  return stats;
}

function calculateFactorial(n) {
  console.log(`Calculating factorial of ${n}`);

  if (n < 0) {
    return { error: "Factorial not defined for negative numbers" };
  }

  if (n === 0 || n === 1) {
    return { result: 1, calculation: `${n}! = 1` };
  }

  let result = 1;
  let calculation = "";

  for (let i = n; i >= 1; i--) {
    result *= i;
    calculation += i;
    if (i > 1) calculation += " × ";
  }

  return {
    result: result,
    calculation: `${n}! = ${calculation} = ${result}`,
  };
}

// Test mathematical functions
let testNumbers = [85, 92, 78, 95, 88];
let stats = calculateStats(testNumbers);
console.log(`Average: ${stats.average}, Range: ${stats.range}`);

let factorial = calculateFactorial(5);
console.log(factorial.calculation); // 5! = 5 × 4 × 3 × 2 × 1 = 120
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Basic Return Functions

```javascript
// Create a function that returns the larger of two numbers
function max(a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}

// Create a function that returns true if a number is positive
function isPositive(number) {
  return number > 0;
}

// Create a function that returns a formatted greeting
function formatGreeting(name, timeOfDay) {
  return `Good ${timeOfDay}, ${name}!`;
}

// Test your functions
console.log(max(15, 23)); // 23
console.log(isPositive(-5)); // false
console.log(formatGreeting("Alice", "morning")); // Good morning, Alice!
```

### Exercise 2: Complex Return Functions

```javascript
// Create a function that returns detailed information about a rectangle
function analyzeRectangle(width, height) {
  let area = width * height;
  let perimeter = 2 * (width + height);
  let diagonal = Math.sqrt(width * width + height * height);
  let isSquare = width === height;

  return {
    width: width,
    height: height,
    area: area,
    perimeter: perimeter,
    diagonal: parseFloat(diagonal.toFixed(2)),
    isSquare: isSquare,
    aspectRatio: parseFloat((width / height).toFixed(2)),
  };
}

// Test rectangle analysis
let rectInfo = analyzeRectangle(10, 6);
console.log("Rectangle info:", rectInfo);
console.log(`Area: ${rectInfo.area}, Is Square: ${rectInfo.isSquare}`);
```

## 🧪 Challenge Problems

### Challenge 1: Advanced Calculator

```javascript
function advancedCalculate(operation, ...numbers) {
  console.log(`Performing ${operation} on:`, numbers);

  if (numbers.length === 0) {
    return { error: "No numbers provided" };
  }

  let result;

  switch (operation) {
    case "sum":
      result = numbers.reduce((total, num) => total + num, 0);
      break;

    case "product":
      result = numbers.reduce((total, num) => total * num, 1);
      break;

    case "average":
      result = numbers.reduce((total, num) => total + num, 0) / numbers.length;
      break;

    case "max":
      result = Math.max(...numbers);
      break;

    case "min":
      result = Math.min(...numbers);
      break;

    default:
      return { error: `Unknown operation: ${operation}` };
  }

  return {
    operation: operation,
    inputs: numbers,
    result: parseFloat(result.toFixed(2)),
  };
}

// Test advanced calculator
console.log(advancedCalculate("sum", 1, 2, 3, 4, 5)); // {result: 15}
console.log(advancedCalculate("average", 10, 20, 30)); // {result: 20}
console.log(advancedCalculate("unknown", 5, 10)); // {error: "Unknown operation"}
```

### Challenge 2: Text Processor

```javascript
function processText(text, options = {}) {
  console.log(`Processing text with options:`, options);

  if (!text) {
    return { error: "No text provided" };
  }

  let processed = text;
  let transformations = [];

  // Apply transformations based on options
  if (options.uppercase) {
    processed = processed.toUpperCase();
    transformations.push("uppercase");
  }

  if (options.removeSpaces) {
    processed = processed.replace(/\s/g, "");
    transformations.push("removed spaces");
  }

  if (options.reverse) {
    processed = processed.split("").reverse().join("");
    transformations.push("reversed");
  }

  if (options.maxLength && processed.length > options.maxLength) {
    processed = processed.substring(0, options.maxLength) + "...";
    transformations.push(`truncated to ${options.maxLength} chars`);
  }

  return {
    original: text,
    processed: processed,
    transformations: transformations,
    originalLength: text.length,
    processedLength: processed.length,
  };
}

// Test text processor
let result = processText("Hello World", {
  uppercase: true,
  reverse: true,
  maxLength: 8,
});

console.log("Text processing result:", result);
```

## 📚 Key Takeaways

1. **Return values pass data back** - Functions can send results to the caller
2. **Use return for calculations** - Functions that compute should return results
3. **Use return for validation** - Send back success/failure information
4. **Return early when appropriate** - Exit functions as soon as you have an answer
5. **Return consistent data types** - Make your functions predictable
6. **Document what you return** - Make it clear what the function gives back

## ➡️ What's Next?

Excellent work mastering return values! 🎉 You now understand how to get data back from functions and use those results in your programs.

Next, you'll learn about **Scope and Variables** - understanding where variables can be accessed in your code, the difference between local and global variables, and how functions create their own isolated environments.

Your next lesson: **16. Scope and Variables - Where Variables Live**

## 🔗 Quick Reference

```javascript
// Basic return
function add(a, b) {
  return a + b;
}

// Return object
function getInfo() {
  return { name: "John", age: 25 };
}

// Return array
function getNumbers() {
  return [1, 2, 3, 4, 5];
}

// Early return
function validate(input) {
  if (!input) return { error: "Required" };
  return { valid: true };
}

// Multiple returns
function checkNumber(num) {
  if (num > 0) return "positive";
  if (num < 0) return "negative";
  return "zero";
}
```

You're mastering the art of function communication! 🚀
