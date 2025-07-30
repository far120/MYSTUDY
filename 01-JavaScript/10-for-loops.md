# 10. For Loops - Counting and Iterating 🔢

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- The exact syntax and structure of for loops
- How to count up, down, and by different increments
- How to use for loops with strings and arrays
- How to create nested loops for complex patterns
- Common for loop patterns and best practices

## 🔍 Anatomy of a For Loop

A for loop has three main parts in its parentheses, separated by semicolons:

```javascript
for (initialization; condition; update) {
  // code to repeat
}
```

Let's break this down:

### The Three Parts Explained

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(`Count: ${i}`);
}

// Part 1: let i = 1     → Start with i = 1
// Part 2: i <= 5       → Keep going while i is 5 or less
// Part 3: i++          → Add 1 to i after each loop
```

### How It Works Step by Step

1. **Initialize**: `let i = 1` (happens once at the start)
2. **Check condition**: `i <= 5` (is 1 <= 5? Yes!)
3. **Run the code**: `console.log("Count: 1")`
4. **Update**: `i++` (i becomes 2)
5. **Check condition**: `i <= 5` (is 2 <= 5? Yes!)
6. **Run the code**: `console.log("Count: 2")`
7. **Update**: `i++` (i becomes 3)
8. ...and so on until i becomes 6, then 6 <= 5 is false, so stop!

## 📊 Basic For Loop Patterns

### Pattern 1: Count Up from 1

```javascript
console.log("Counting up from 1 to 10:");
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
// Output: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

### Pattern 2: Count Down from 10

```javascript
console.log("Countdown from 10 to 1:");
for (let i = 10; i >= 1; i--) {
  console.log(i);
}
console.log("Blast off! 🚀");
// Output: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, Blast off!
```

### Pattern 3: Count by 2s (Even Numbers)

```javascript
console.log("Even numbers from 2 to 20:");
for (let i = 2; i <= 20; i += 2) {
  console.log(i);
}
// Output: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20
```

### Pattern 4: Count by 5s

```javascript
console.log("Counting by 5s from 0 to 50:");
for (let i = 0; i <= 50; i += 5) {
  console.log(i);
}
// Output: 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50
```

## 🎯 Real-World For Loop Examples

### Example 1: Multiplication Table

```javascript
let number = 7;
console.log(`Multiplication table for ${number}:`);
console.log("=======================");

for (let i = 1; i <= 12; i++) {
  let result = number * i;
  console.log(`${number} × ${i} = ${result}`);
}
```

### Example 2: Grade Average Calculator

```javascript
// Calculate average of 5 test scores
let totalPoints = 0;
let numberOfTests = 5;

console.log("Calculating grade average...");

for (let test = 1; test <= numberOfTests; test++) {
  // Simulate different test scores
  let score = 80 + test * 3; // Scores: 83, 86, 89, 92, 95
  console.log(`Test ${test}: ${score} points`);
  totalPoints += score;
}

let average = totalPoints / numberOfTests;
console.log(`\nTotal points: ${totalPoints}`);
console.log(`Average: ${average}`);

// Determine letter grade
let letterGrade;
if (average >= 90) {
  letterGrade = "A";
} else if (average >= 80) {
  letterGrade = "B";
} else if (average >= 70) {
  letterGrade = "C";
} else if (average >= 60) {
  letterGrade = "D";
} else {
  letterGrade = "F";
}

console.log(`Letter Grade: ${letterGrade}`);
```

### Example 3: Password Generator

```javascript
// Generate a random password
let passwordLength = 8;
let characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let password = "";

console.log(`Generating ${passwordLength}-character password...`);

for (let i = 0; i < passwordLength; i++) {
  // Pick a random character
  let randomIndex = Math.floor(Math.random() * characters.length);
  let randomChar = characters[randomIndex];
  password += randomChar;
  console.log(`Character ${i + 1}: ${randomChar}`);
}

console.log(`\nGenerated password: ${password}`);
```

## 🎨 Working with Strings and Arrays

### Looping Through Strings

```javascript
let message = "HELLO";
console.log("Spelling out the message:");

for (let i = 0; i < message.length; i++) {
  let letter = message[i];
  console.log(`Letter ${i + 1}: ${letter}`);
}

// Count vowels in a string
let text = "JavaScript is awesome";
let vowels = "aeiouAEIOU";
let vowelCount = 0;

console.log(`\nCounting vowels in: "${text}"`);

for (let i = 0; i < text.length; i++) {
  let char = text[i];
  if (vowels.includes(char)) {
    console.log(`Found vowel: ${char} at position ${i}`);
    vowelCount++;
  }
}

console.log(`Total vowels: ${vowelCount}`);
```

### Looping Through Arrays

```javascript
let fruits = ["apple", "banana", "orange", "grape", "strawberry"];

console.log("Fruit inventory:");
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i + 1}. ${fruits[i]}`);
}

// Find the longest fruit name
let longestFruit = "";

for (let i = 0; i < fruits.length; i++) {
  if (fruits[i].length > longestFruit.length) {
    longestFruit = fruits[i];
  }
}

console.log(
  `\nLongest fruit name: ${longestFruit} (${longestFruit.length} letters)`
);
```

## 🏗️ Nested For Loops

Sometimes you need loops inside loops! This is called nesting.

### Example 1: Simple Pattern

```javascript
console.log("Creating a number grid:");

for (let row = 1; row <= 3; row++) {
  let rowString = "";

  for (let col = 1; col <= 4; col++) {
    rowString += `${row}${col} `;
  }

  console.log(rowString);
}

// Output:
// 11 12 13 14
// 21 22 23 24
// 31 32 33 34
```

### Example 2: Star Triangle

```javascript
console.log("Star triangle:");

for (let row = 1; row <= 5; row++) {
  let stars = "";

  for (let star = 1; star <= row; star++) {
    stars += "*";
  }

  console.log(stars);
}

// Output:
// *
// **
// ***
// ****
// *****
```

### Example 3: Multiplication Table Grid

```javascript
console.log("Multiplication table (1-5):");
console.log("   1  2  3  4  5");
console.log("   ============");

for (let row = 1; row <= 5; row++) {
  let line = `${row}| `;

  for (let col = 1; col <= 5; col++) {
    let product = row * col;
    line += `${product.toString().padStart(2)} `;
  }

  console.log(line);
}

// Output:
//    1  2  3  4  5
//    ============
// 1|  1  2  3  4  5
// 2|  2  4  6  8 10
// 3|  3  6  9 12 15
// 4|  4  8 12 16 20
// 5|  5 10 15 20 25
```

## 🧮 Mathematical Uses of For Loops

### Example 1: Calculate Factorial

```javascript
// Calculate 5! (5 factorial = 5 × 4 × 3 × 2 × 1)
let number = 5;
let factorial = 1;

console.log(`Calculating ${number}!`);

for (let i = 1; i <= number; i++) {
  factorial *= i;
  console.log(`${i}: factorial is now ${factorial}`);
}

console.log(`${number}! = ${factorial}`);
```

### Example 2: Sum of Squares

```javascript
// Calculate sum of squares: 1² + 2² + 3² + 4² + 5²
let limit = 5;
let sumOfSquares = 0;

console.log(`Calculating sum of squares from 1 to ${limit}:`);

for (let i = 1; i <= limit; i++) {
  let square = i * i;
  sumOfSquares += square;
  console.log(`${i}² = ${square}, running total = ${sumOfSquares}`);
}

console.log(`Final sum: ${sumOfSquares}`);
```

### Example 3: Find Prime Numbers

```javascript
// Find all prime numbers between 2 and 20
console.log("Prime numbers between 2 and 20:");

for (let num = 2; num <= 20; num++) {
  let isPrime = true;

  // Check if num is divisible by any number from 2 to num-1
  for (let divisor = 2; divisor < num; divisor++) {
    if (num % divisor === 0) {
      isPrime = false;
      break; // No need to check further
    }
  }

  if (isPrime) {
    console.log(num);
  }
}
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Basic Counting

```javascript
// 1. Count from 1 to 20, but only print odd numbers
console.log("Odd numbers from 1 to 20:");
for (let i = 1; i <= 20; i += 2) {
  console.log(i);
}

// 2. Count backwards from 100 to 80
console.log("\nCountdown from 100 to 80:");
for (let i = 100; i >= 80; i--) {
  console.log(i);
}

// 3. Count by 3s from 3 to 30
console.log("\nCounting by 3s:");
for (let i = 3; i <= 30; i += 3) {
  console.log(i);
}
```

### Exercise 2: String Processing

```javascript
let word = "programming";

// Count each letter in the word
console.log(`Letters in "${word}":`);
for (let i = 0; i < word.length; i++) {
  console.log(`Position ${i}: ${word[i]}`);
}

// Reverse the word
let reversed = "";
for (let i = word.length - 1; i >= 0; i--) {
  reversed += word[i];
}
console.log(`Reversed: ${reversed}`);
```

### Exercise 3: Array Operations

```javascript
let numbers = [10, 25, 30, 15, 40];

// Find the largest number
let largest = numbers[0];
for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > largest) {
    largest = numbers[i];
  }
}
console.log(`Largest number: ${largest}`);

// Calculate the sum
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log(`Sum: ${sum}`);
console.log(`Average: ${sum / numbers.length}`);
```

## 🧪 Challenge Problems

### Challenge 1: FizzBuzz

```javascript
// Print numbers 1-30, but:
// - If divisible by 3, print "Fizz"
// - If divisible by 5, print "Buzz"
// - If divisible by both, print "FizzBuzz"

for (let i = 1; i <= 30; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
```

### Challenge 2: Diamond Pattern

```javascript
// Create a diamond pattern with stars
console.log("Diamond pattern:");

// Top half (including middle)
for (let row = 1; row <= 5; row++) {
  let spaces = "";
  let stars = "";

  // Add spaces
  for (let s = 1; s <= 5 - row; s++) {
    spaces += " ";
  }

  // Add stars
  for (let st = 1; st <= 2 * row - 1; st++) {
    stars += "*";
  }

  console.log(spaces + stars);
}

// Bottom half
for (let row = 4; row >= 1; row--) {
  let spaces = "";
  let stars = "";

  // Add spaces
  for (let s = 1; s <= 5 - row; s++) {
    spaces += " ";
  }

  // Add stars
  for (let st = 1; st <= 2 * row - 1; st++) {
    stars += "*";
  }

  console.log(spaces + stars);
}
```

### Challenge 3: Number Guessing Game Prep

```javascript
// Generate 10 random numbers and count how many are even/odd
let evenCount = 0;
let oddCount = 0;

console.log("Generating 10 random numbers (1-100):");

for (let i = 1; i <= 10; i++) {
  let randomNum = Math.floor(Math.random() * 100) + 1;

  if (randomNum % 2 === 0) {
    console.log(`${i}. ${randomNum} (even)`);
    evenCount++;
  } else {
    console.log(`${i}. ${randomNum} (odd)`);
    oddCount++;
  }
}

console.log(`\nResults: ${evenCount} even, ${oddCount} odd`);
```

## ⚠️ Common For Loop Mistakes

### Mistake 1: Wrong Condition Operator

```javascript
// ❌ This only runs 4 times (i = 1,2,3,4)
for (let i = 1; i < 5; i++) {
  console.log(i);
}

// ✅ This runs 5 times (i = 1,2,3,4,5)
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

### Mistake 2: Infinite Loop

```javascript
// ❌ i never changes, condition always true
for (let i = 1; i <= 5 /* missing i++ */; ) {
  console.log(i); // Runs forever!
}

// ✅ Proper increment
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

### Mistake 3: Array Index Error

```javascript
let arr = ["a", "b", "c"];

// ❌ This will cause an error (index 3 doesn't exist)
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]); // arr[3] is undefined!
}

// ✅ Correct array iteration
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

## 📚 For Loop Best Practices

### 1. Use Meaningful Variable Names

```javascript
// ❌ Not clear what these represent
for (let x = 0; x < stuff.length; x++) {
  console.log(stuff[x]);
}

// ✅ Clear and descriptive
for (let studentIndex = 0; studentIndex < students.length; studentIndex++) {
  console.log(students[studentIndex]);
}

// ✅ Short but conventional for simple counting
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

### 2. Be Consistent with Style

```javascript
// ✅ Consistent spacing and formatting
for (let i = 0; i < array.length; i++) {
  // code here
}
```

### 3. Cache Array Length for Performance

```javascript
// ✅ For very large arrays, cache the length
let items = [
  /* thousands of items */
];
let itemCount = items.length;

for (let i = 0; i < itemCount; i++) {
  // process items[i]
}
```

## 📊 For Loop Performance Tips

1. **Keep the loop body simple** - Complex operations slow down each iteration
2. **Avoid function calls in conditions** - Cache values outside the loop
3. **Use break and continue wisely** - Exit early when possible
4. **Consider the loop direction** - Sometimes backwards is more efficient

## 📚 Key Takeaways

1. **For loops are perfect for counting** - Use when you know how many iterations
2. **Three parts**: initialization, condition, update
3. **i++ means add 1, i-- means subtract 1**
4. **Arrays start at index 0** - Use `i < array.length`
5. **Nested loops multiply iterations** - Be careful with performance
6. **Always ensure the loop will end** - Check your condition and update

## ➡️ What's Next?

Excellent work mastering for loops! 🎉 Next, you'll learn about **while loops** - a different type of loop that's perfect for situations where you don't know exactly how many times to repeat something. While loops are great for user input, searching, and conditional repetition.

Your next lesson: **11. While Loops - Conditional Repetition**

## 🔗 Quick Reference

```javascript
// Basic for loop syntax
for (let i = start; i <= end; i++) {
    // code to repeat
}

// Common patterns
for (let i = 1; i <= 10; i++)     // Count up 1-10
for (let i = 10; i >= 1; i--)     // Count down 10-1
for (let i = 0; i < arr.length; i++) // Process array
for (let i = 2; i <= 20; i += 2)  // Even numbers 2-20
```

You're becoming a loop master! Keep practicing these patterns. 🚀
