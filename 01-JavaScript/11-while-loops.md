# 11. While Loops - Conditional Repetition 🔄

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- When and why to use while loops instead of for loops
- The syntax and structure of while and do...while loops
- How to prevent infinite loops
- Real-world scenarios where while loops shine
- Best practices for conditional repetition

## 🤔 What Are While Loops?

While loops repeat code as long as a condition is true. Unlike for loops (which are great for counting), while loops are perfect when you don't know exactly how many times you need to repeat something.

Think of while loops like this:

- "Keep asking for the password while it's wrong"
- "Keep rolling dice while the sum is less than 10"
- "Keep reading user input while they haven't typed 'quit'"

## 🔍 While Loop Syntax

### Basic While Loop

```javascript
while (condition) {
  // code to repeat
  // don't forget to update the condition!
}
```

### Example: Simple Countdown

```javascript
let count = 5;

while (count > 0) {
  console.log(`Count: ${count}`);
  count--; // This is crucial - it changes the condition!
}

console.log("Done!");

// Output:
// Count: 5
// Count: 4
// Count: 3
// Count: 2
// Count: 1
// Done!
```

## 🆚 While vs For Loops

### Use For Loops When:

- You know exactly how many times to repeat
- You're counting or iterating through a sequence
- You need a counter variable

```javascript
// Perfect for for loop - exact count
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

### Use While Loops When:

- You don't know how many times to repeat
- You're waiting for something to happen
- The repetition depends on user input or calculations

```javascript
// Perfect for while loop - unknown repetitions
let password = "";
while (password !== "secret") {
  password = "secret"; // Simulate user input
  console.log("Checking password...");
}
```

## 🎯 Real-World While Loop Examples

### Example 1: Password Validation

```javascript
let attempts = 0;
let maxAttempts = 3;
let correctPassword = "javascript123";
let userPassword = "";

console.log("Please enter the password:");

while (userPassword !== correctPassword && attempts < maxAttempts) {
  attempts++;

  // Simulate user input (in real code, you'd get actual input)
  if (attempts === 1) userPassword = "wrong1";
  else if (attempts === 2) userPassword = "wrong2";
  else userPassword = "javascript123";

  console.log(`Attempt ${attempts}: Entered "${userPassword}"`);

  if (userPassword !== correctPassword) {
    console.log("Incorrect password!");

    if (attempts < maxAttempts) {
      console.log(`You have ${maxAttempts - attempts} attempts left.`);
    }
  }
}

if (userPassword === correctPassword) {
  console.log("✅ Access granted!");
} else {
  console.log("❌ Account locked. Too many failed attempts.");
}
```

### Example 2: Number Guessing Game

```javascript
let secretNumber = 42;
let guess = 0;
let guessCount = 0;

console.log("I'm thinking of a number between 1 and 100...");

while (guess !== secretNumber) {
  guessCount++;

  // Simulate user guesses
  if (guessCount === 1) guess = 25;
  else if (guessCount === 2) guess = 60;
  else if (guessCount === 3) guess = 42;

  console.log(`Guess ${guessCount}: ${guess}`);

  if (guess < secretNumber) {
    console.log("Too low! Try higher.");
  } else if (guess > secretNumber) {
    console.log("Too high! Try lower.");
  } else {
    console.log(`🎉 Correct! You got it in ${guessCount} guesses!`);
  }
}
```

### Example 3: Bank Account Simulation

```javascript
let balance = 100;
let transactions = [
  { type: "deposit", amount: 50 },
  { type: "withdraw", amount: 30 },
  { type: "withdraw", amount: 80 },
  { type: "deposit", amount: 25 },
];

let transactionIndex = 0;

console.log(`Starting balance: $${balance}`);
console.log("Processing transactions...");

while (transactionIndex < transactions.length && balance >= 0) {
  let transaction = transactions[transactionIndex];

  console.log(
    `\nTransaction ${transactionIndex + 1}: ${transaction.type} $${
      transaction.amount
    }`
  );

  if (transaction.type === "deposit") {
    balance += transaction.amount;
    console.log(`Deposited $${transaction.amount}. New balance: $${balance}`);
  } else if (transaction.type === "withdraw") {
    if (balance >= transaction.amount) {
      balance -= transaction.amount;
      console.log(`Withdrew $${transaction.amount}. New balance: $${balance}`);
    } else {
      console.log(
        `❌ Insufficient funds! Cannot withdraw $${transaction.amount}`
      );
      console.log(`Current balance: $${balance}`);
      break; // Stop processing transactions
    }
  }

  transactionIndex++;
}

console.log(`\nFinal balance: $${balance}`);
```

## 🔁 Do...While Loops

Sometimes you want to run code at least once, then check the condition. That's where `do...while` comes in!

### Do...While Syntax

```javascript
do {
  // code to run at least once
} while (condition);
```

### Example: Menu System

```javascript
let choice = "";

do {
  console.log("\n=== MENU ===");
  console.log("1. View Profile");
  console.log("2. Settings");
  console.log("3. Help");
  console.log("4. Exit");

  // Simulate user choice
  choice = "1"; // In real code, get actual user input

  console.log(`You selected: ${choice}`);

  if (choice === "1") {
    console.log("Showing profile...");
  } else if (choice === "2") {
    console.log("Opening settings...");
  } else if (choice === "3") {
    console.log("Displaying help...");
  } else if (choice === "4") {
    console.log("Goodbye!");
  } else {
    console.log("Invalid choice. Please try again.");
  }

  // For demo, exit after first choice
  choice = "4";
} while (choice !== "4");
```

## 🎲 Random Number Examples

While loops are great for working with random numbers when you need specific conditions:

### Example 1: Roll Until You Get a 6

```javascript
let roll = 0;
let rollCount = 0;

console.log("Rolling a die until we get a 6...");

while (roll !== 6) {
  roll = Math.floor(Math.random() * 6) + 1; // Random 1-6
  rollCount++;
  console.log(`Roll ${rollCount}: ${roll}`);
}

console.log(`🎯 Got a 6 after ${rollCount} rolls!`);
```

### Example 2: Generate Random Password Characters

```javascript
let password = "";
let targetLength = 8;
let characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

console.log(`Generating ${targetLength}-character password...`);

while (password.length < targetLength) {
  let randomIndex = Math.floor(Math.random() * characters.length);
  let randomChar = characters[randomIndex];
  password += randomChar;
  console.log(`Added '${randomChar}', password so far: ${password}`);
}

console.log(`Final password: ${password}`);
```

### Example 3: Sum Random Numbers Until Target

```javascript
let sum = 0;
let target = 50;
let count = 0;

console.log(`Adding random numbers (1-10) until sum reaches ${target}...`);

while (sum < target) {
  let randomNum = Math.floor(Math.random() * 10) + 1;
  sum += randomNum;
  count++;
  console.log(`Number ${count}: ${randomNum}, running sum: ${sum}`);
}

console.log(`🎯 Reached target! Sum: ${sum} after ${count} numbers.`);
```

## 🔍 Search and Find Examples

While loops are perfect for searching through data:

### Example 1: Find First Even Number

```javascript
let numbers = [1, 3, 7, 5, 8, 9, 12, 15];
let index = 0;
let found = false;

console.log("Looking for first even number...");

while (index < numbers.length && !found) {
  console.log(`Checking index ${index}: ${numbers[index]}`);

  if (numbers[index] % 2 === 0) {
    console.log(`✅ Found even number: ${numbers[index]} at index ${index}`);
    found = true;
  } else {
    console.log(`${numbers[index]} is odd, continuing...`);
  }

  index++;
}

if (!found) {
  console.log("❌ No even numbers found in the array.");
}
```

### Example 2: Search for Word in Text

```javascript
let text = "JavaScript is an amazing programming language";
let searchWord = "amazing";
let wordIndex = 0;
let words = text.split(" ");
let wordFound = false;

console.log(`Searching for "${searchWord}" in: "${text}"`);

while (wordIndex < words.length && !wordFound) {
  console.log(`Checking word ${wordIndex + 1}: "${words[wordIndex]}"`);

  if (words[wordIndex].toLowerCase() === searchWord.toLowerCase()) {
    console.log(`✅ Found "${searchWord}" at position ${wordIndex + 1}!`);
    wordFound = true;
  }

  wordIndex++;
}

if (!wordFound) {
  console.log(`❌ "${searchWord}" not found in the text.`);
}
```

## ⚠️ Avoiding Infinite Loops

The biggest danger with while loops is creating infinite loops - loops that never end!

### Common Infinite Loop Mistakes:

#### Mistake 1: Forgetting to Update the Condition

```javascript
// ❌ INFINITE LOOP - count never changes!
let count = 5;
while (count > 0) {
  console.log(count);
  // Missing count-- here!
}

// ✅ CORRECT - count decreases each time
let count = 5;
while (count > 0) {
  console.log(count);
  count--; // This makes the loop eventually end
}
```

#### Mistake 2: Wrong Update Direction

```javascript
// ❌ INFINITE LOOP - count keeps getting bigger!
let count = 1;
while (count <= 10) {
  console.log(count);
  count--; // Wrong direction! Should be count++
}

// ✅ CORRECT
let count = 1;
while (count <= 10) {
  console.log(count);
  count++; // Now it will reach 11 and stop
}
```

#### Mistake 3: Condition Never Becomes False

```javascript
// ❌ INFINITE LOOP - condition never changes
let name = "John";
while (name === "John") {
  console.log("Hello John");
  // name never changes!
}

// ✅ CORRECT - give the loop a way to end
let attempts = 0;
let name = "John";
while (name === "John" && attempts < 5) {
  console.log("Hello John");
  attempts++; // Safety counter
  // In real code, name might change based on user input
}
```

## 🛡️ Safety Techniques

### 1. Use Safety Counters

```javascript
let attempts = 0;
let maxAttempts = 100; // Safety limit

while (condition && attempts < maxAttempts) {
  // your code here
  attempts++;
}

if (attempts >= maxAttempts) {
  console.log("Safety limit reached!");
}
```

### 2. Use Break Statements

```javascript
while (true) {
  // your code here

  if (someCondition) {
    break; // Exit the loop
  }

  // Always have a way to break!
}
```

### 3. Debug with Console Logs

```javascript
let counter = 0;

while (someCondition) {
  console.log(`Loop iteration: ${counter}`); // Track progress

  // your code here

  counter++;

  if (counter > 1000) {
    console.log("Too many iterations, breaking!");
    break;
  }
}
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Countdown Timer

```javascript
// Create a countdown from 10 to 1, then say "Happy New Year!"
let countdown = 10;

while (countdown > 0) {
  console.log(countdown);
  countdown--;
}

console.log("🎉 Happy New Year!");
```

### Exercise 2: Double Until Large

```javascript
// Start with 1, keep doubling until >= 1000
let number = 1;
let steps = 0;

console.log("Doubling numbers until >= 1000:");

while (number < 1000) {
  console.log(`Step ${steps}: ${number}`);
  number *= 2;
  steps++;
}

console.log(`Final number: ${number} (reached in ${steps} steps)`);
```

### Exercise 3: Collect Positive Numbers

```javascript
// Collect numbers until you find a negative one
let numbers = [5, 10, 15, 3, 8, -2, 7, 12];
let index = 0;
let positiveNumbers = [];

while (index < numbers.length && numbers[index] >= 0) {
  positiveNumbers.push(numbers[index]);
  console.log(`Added ${numbers[index]} to collection`);
  index++;
}

console.log("Positive numbers collected:", positiveNumbers);
if (index < numbers.length) {
  console.log(`Stopped at negative number: ${numbers[index]}`);
}
```

## 🧪 Challenge Problems

### Challenge 1: Digital Root Calculator

```javascript
// Keep adding digits of a number until you get a single digit
let number = 9875;
let originalNumber = number;

console.log(`Finding digital root of ${originalNumber}:`);

while (number >= 10) {
  let sum = 0;
  let temp = number;

  // Add all digits
  while (temp > 0) {
    sum += temp % 10;
    temp = Math.floor(temp / 10);
  }

  console.log(`${number} -> ${sum}`);
  number = sum;
}

console.log(`Digital root of ${originalNumber} is ${number}`);
```

### Challenge 2: Perfect Number Finder

```javascript
// Find the first perfect number (number equals sum of its divisors)
let candidate = 2;
let found = false;

while (!found) {
  let divisorSum = 1; // 1 is always a divisor

  // Find all divisors (except the number itself)
  for (let i = 2; i < candidate; i++) {
    if (candidate % i === 0) {
      divisorSum += i;
    }
  }

  if (divisorSum === candidate) {
    console.log(`${candidate} is a perfect number!`);
    console.log(`Divisors: 1 + factors = ${divisorSum}`);
    found = true;
  } else {
    candidate++;
  }

  // Safety check
  if (candidate > 100) {
    console.log("Stopped search at 100");
    break;
  }
}
```

## 📚 While Loop Patterns

### Pattern 1: Input Validation

```javascript
while (input is invalid) {
    get new input
    validate input
}
```

### Pattern 2: Search Pattern

```javascript
while (not found and more items to check) {
    check current item
    move to next item
}
```

### Pattern 3: Accumulation Pattern

```javascript
while (condition not met) {
    add to accumulator
    update condition variable
}
```

### Pattern 4: Generation Pattern

```javascript
while (target not reached) {
    generate next value
    check if target reached
}
```

## 📚 Key Takeaways

1. **While loops repeat based on conditions** - Perfect when you don't know how many iterations
2. **Always update the condition** - Make sure the loop can end!
3. **Use safety counters** - Prevent infinite loops
4. **Do...while runs at least once** - Good for menus and validation
5. **Great for user input** - Keep asking until valid
6. **Perfect for searching** - Stop when found or end reached
7. **Excellent for random events** - Until specific condition met

## ➡️ What's Next?

Fantastic! You now understand both for loops and while loops - the two main types of repetition in programming. 🎉

Next, you'll put all your loop knowledge to work in an exciting **Practice Project: Number Guessing Game** where you'll combine loops, conditions, user input, and random numbers to create an interactive game!

Your next lesson: **12. Practice Project: Number Guessing Game**

## 🔗 Quick Reference

```javascript
// While loop syntax
while (condition) {
  // code to repeat
  // update condition variable!
}

// Do...while loop syntax
do {
  // code to run at least once
} while (condition);

// Common patterns
while (count > 0) {
  count--;
} // Countdown
while (!found) {
  /* search */
} // Search
while (input !== "quit") {
  /* */
} // User input
while (sum < target) {
  /* */
} // Accumulate
```

You're mastering the art of repetition! Keep practicing these patterns. 🚀
