# 12. Practice Project: Number Guessing Game 🎯

## 🎯 Project Overview

Time to build your first interactive game! You'll create a number guessing game that combines everything you've learned: variables, conditions, loops, user input simulation, and random numbers. This project will challenge you to think like a programmer and solve real problems!

## 🎮 Game Requirements

Your number guessing game should:

1. **Generate a random secret number** between 1 and 100
2. **Give the player multiple attempts** to guess it
3. **Provide helpful hints** ("too high", "too low")
4. **Track the number of guesses**
5. **Celebrate when they win**
6. **Handle edge cases** (invalid guesses, etc.)
7. **Offer different difficulty levels**

## 🏗️ Step-by-Step Build Guide

### Step 1: Basic Game Setup

```javascript
console.log("🎯 === NUMBER GUESSING GAME === 🎯");
console.log("I'm thinking of a number between 1 and 100...");
console.log("Can you guess what it is?");
console.log("=====================================");

// Generate random number between 1 and 100
let secretNumber = Math.floor(Math.random() * 100) + 1;
let maxAttempts = 10;
let attempts = 0;
let hasWon = false;

console.log(`🤫 (Secret: The number is ${secretNumber})`); // For testing only!
```

### Step 2: Basic Guessing Loop

```javascript
while (attempts < maxAttempts && !hasWon) {
  attempts++;

  // Simulate user input (in real code, you'd get actual input)
  let guess;
  if (attempts === 1) guess = 50; // Start with middle
  else if (attempts === 2) guess = 25; // Adjust based on feedback
  else if (attempts === 3) guess = 75;
  else guess = secretNumber; // Win on 4th try for demo

  console.log(`\nAttempt ${attempts}: Your guess is ${guess}`);

  // Check the guess
  if (guess === secretNumber) {
    hasWon = true;
    console.log(`🎉 CONGRATULATIONS! You got it!`);
    console.log(`The number was ${secretNumber}`);
    console.log(`You won in ${attempts} attempts!`);
  } else if (guess < secretNumber) {
    console.log("📈 Too low! Try a higher number.");
  } else {
    console.log("📉 Too high! Try a lower number.");
  }

  // Show remaining attempts
  if (!hasWon && attempts < maxAttempts) {
    console.log(`You have ${maxAttempts - attempts} attempts left.`);
  }
}

// Game over message
if (!hasWon) {
  console.log(`\n💀 Game Over! You've used all ${maxAttempts} attempts.`);
  console.log(`The secret number was ${secretNumber}`);
}
```

## 🚀 Enhanced Version with Features

Here's a complete, feature-rich version:

```javascript
// === ADVANCED NUMBER GUESSING GAME ===

console.log("🎯 === ADVANCED NUMBER GUESSING GAME === 🎯");
console.log("Welcome to the ultimate guessing challenge!");

// Game configuration
let difficulty = "medium"; // easy, medium, hard
let gameSettings = {
  easy: { min: 1, max: 50, attempts: 15 },
  medium: { min: 1, max: 100, attempts: 10 },
  hard: { min: 1, max: 200, attempts: 8 },
};

let settings = gameSettings[difficulty];
let secretNumber =
  Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;

console.log(`Difficulty: ${difficulty.toUpperCase()}`);
console.log(
  `I'm thinking of a number between ${settings.min} and ${settings.max}`
);
console.log(`You have ${settings.attempts} attempts to guess it!`);
console.log("===============================================");

// Game state variables
let attempts = 0;
let hasWon = false;
let guessHistory = [];
let bestRange = { min: settings.min, max: settings.max };

// For demonstration, create some realistic guesses
let simulatedGuesses = [
  Math.floor((settings.min + settings.max) / 2), // Start with middle
  secretNumber < 50 ? 25 : 75, // Adjust based on first hint
  secretNumber < 25 ? 12 : secretNumber < 75 ? 37 : 87, // Further adjust
  secretNumber, // Final guess (wins the game)
];

console.log(`🤫 (Debug: Secret number is ${secretNumber})`);

// Main game loop
while (attempts < settings.attempts && !hasWon) {
  attempts++;

  // Simulate intelligent guessing
  let guess;
  if (attempts <= simulatedGuesses.length) {
    guess = simulatedGuesses[attempts - 1];
  } else {
    // Random guess within current best range
    guess =
      Math.floor(Math.random() * (bestRange.max - bestRange.min + 1)) +
      bestRange.min;
  }

  // Validate guess (simulate input validation)
  if (guess < settings.min || guess > settings.max) {
    console.log(
      `\n❌ Invalid guess! Please enter a number between ${settings.min} and ${settings.max}.`
    );
    attempts--; // Don't count invalid attempts
    continue;
  }

  // Check for duplicate guess
  if (guessHistory.includes(guess)) {
    console.log(`\n⚠️ You already guessed ${guess}! Try a different number.`);
    console.log(`Previous guesses: ${guessHistory.join(", ")}`);
    attempts--; // Don't count duplicate attempts
    continue;
  }

  // Record the guess
  guessHistory.push(guess);

  console.log(`\n🎯 Attempt ${attempts}: Your guess is ${guess}`);

  // Evaluate the guess
  if (guess === secretNumber) {
    hasWon = true;
    console.log(`🎉 FANTASTIC! You guessed it!`);
    console.log(`The secret number was ${secretNumber}!`);

    // Performance evaluation
    let performance;
    if (attempts <= 3) {
      performance = "AMAZING! 🌟";
    } else if (attempts <= 5) {
      performance = "EXCELLENT! 👏";
    } else if (attempts <= 7) {
      performance = "GOOD JOB! 👍";
    } else {
      performance = "Nice work! 😊";
    }

    console.log(`You won in ${attempts} attempts - ${performance}`);
  } else {
    // Provide hints
    let difference = Math.abs(guess - secretNumber);

    if (guess < secretNumber) {
      console.log("📈 Too low!");
      bestRange.min = Math.max(bestRange.min, guess + 1);
    } else {
      console.log("📉 Too high!");
      bestRange.max = Math.min(bestRange.max, guess - 1);
    }

    // Give proximity hints
    if (difference <= 5) {
      console.log("🔥 You're VERY close!");
    } else if (difference <= 10) {
      console.log("🌡️ You're getting warm!");
    } else if (difference <= 20) {
      console.log("❄️ You're getting cold!");
    } else {
      console.log("🧊 You're ice cold!");
    }

    // Show optimal range
    console.log(`💡 Try between ${bestRange.min} and ${bestRange.max}`);

    // Show remaining attempts
    let remaining = settings.attempts - attempts;
    if (remaining > 0) {
      console.log(`⏱️ ${remaining} attempts remaining`);
    }
  }

  // Show guess history
  if (guessHistory.length > 1 && !hasWon) {
    console.log(`📝 Your guesses so far: ${guessHistory.join(", ")}`);
  }
}

// Game over analysis
console.log("\n" + "=".repeat(50));

if (!hasWon) {
  console.log("💀 GAME OVER!");
  console.log(`The secret number was ${secretNumber}`);
  console.log("Better luck next time!");
} else {
  console.log("🏆 VICTORY!");
}

// Final statistics
console.log(`\n📊 GAME STATISTICS:`);
console.log(`Difficulty: ${difficulty}`);
console.log(`Secret Number: ${secretNumber}`);
console.log(`Total Attempts: ${attempts}`);
console.log(`Guesses: ${guessHistory.join(", ")}`);

if (hasWon) {
  let efficiency = Math.round((attempts / settings.attempts) * 100);
  console.log(`Efficiency: ${efficiency}% of allowed attempts used`);
}

console.log("\nThanks for playing! 🎮");
```

## 🎲 Advanced Features to Add

### Feature 1: Multiple Difficulty Levels

```javascript
function chooseDifficulty() {
  console.log("Choose your difficulty:");
  console.log("1. EASY (1-50, 15 attempts)");
  console.log("2. MEDIUM (1-100, 10 attempts)");
  console.log("3. HARD (1-200, 8 attempts)");
  console.log("4. NIGHTMARE (1-500, 5 attempts)");

  // Simulate user choice
  let choice = "2"; // Medium difficulty

  switch (choice) {
    case "1":
      return { name: "easy", min: 1, max: 50, attempts: 15 };
    case "2":
      return { name: "medium", min: 1, max: 100, attempts: 10 };
    case "3":
      return { name: "hard", min: 1, max: 200, attempts: 8 };
    case "4":
      return { name: "nightmare", min: 1, max: 500, attempts: 5 };
    default:
      return { name: "medium", min: 1, max: 100, attempts: 10 };
  }
}
```

### Feature 2: Hint System

```javascript
function giveHint(secretNumber, attempts) {
  if (attempts >= 5) {
    // Only give hints after 5 attempts
    console.log("\n💡 HINT AVAILABLE!");

    // Different types of hints
    let hintType = Math.floor(Math.random() * 3);

    if (hintType === 0) {
      // Even/odd hint
      let evenOdd = secretNumber % 2 === 0 ? "even" : "odd";
      console.log(`🔢 The number is ${evenOdd}!`);
    } else if (hintType === 1) {
      // Divisibility hint
      if (secretNumber % 5 === 0) {
        console.log("🎯 The number is divisible by 5!");
      } else if (secretNumber % 3 === 0) {
        console.log("🎯 The number is divisible by 3!");
      } else {
        console.log("🔢 The number is prime or has no obvious factors!");
      }
    } else {
      // Range hint
      let midpoint = Math.floor((1 + 100) / 2);
      let half = secretNumber <= midpoint ? "lower" : "upper";
      console.log(`📍 The number is in the ${half} half of the range!`);
    }
  }
}
```

### Feature 3: Score System

```javascript
function calculateScore(attempts, maxAttempts, difficulty) {
  let baseScore = 1000;
  let attemptPenalty = Math.floor((attempts / maxAttempts) * 500);
  let difficultyBonus = {
    easy: 0,
    medium: 200,
    hard: 500,
    nightmare: 1000,
  };

  let finalScore = baseScore - attemptPenalty + difficultyBonus[difficulty];
  return Math.max(finalScore, 100); // Minimum 100 points
}
```

### Feature 4: High Score Tracking

```javascript
// Simulate high score system
let highScores = [
  { name: "Alice", score: 950, attempts: 3, difficulty: "medium" },
  { name: "Bob", score: 800, attempts: 5, difficulty: "medium" },
  { name: "Charlie", score: 1200, attempts: 2, difficulty: "hard" },
];

function checkHighScore(score, attempts, difficulty) {
  console.log(`\n🏆 Your Score: ${score} points`);

  // Check if it's a high score
  let lowestHigh = Math.min(...highScores.map((s) => s.score));

  if (score > lowestHigh || highScores.length < 10) {
    console.log("🎉 NEW HIGH SCORE! 🎉");

    // Add to high scores (simulated)
    highScores.push({
      name: "Player",
      score: score,
      attempts: attempts,
      difficulty: difficulty,
    });

    // Sort and keep top 10
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
  }

  // Show high scores
  console.log("\n🏆 HIGH SCORES 🏆");
  highScores.forEach((score, index) => {
    console.log(
      `${index + 1}. ${score.name}: ${score.score} pts (${
        score.attempts
      } attempts, ${score.difficulty})`
    );
  });
}
```

## 🧠 Game AI: Smart Computer Guessing

Create a version where the computer tries to guess your number:

```javascript
function computerGuessesYourNumber() {
  console.log("🤖 Now I'll try to guess YOUR number!");
  console.log("Think of a number between 1 and 100...");
  console.log("Tell me if my guess is too high, too low, or correct!");

  let min = 1;
  let max = 100;
  let attempts = 0;
  let found = false;

  // Simulate user's secret number
  let userSecret = 73;
  console.log(`(You're thinking of: ${userSecret})`);

  while (!found && attempts < 10) {
    attempts++;

    // Binary search strategy
    let guess = Math.floor((min + max) / 2);
    console.log(`\nAttempt ${attempts}: Is your number ${guess}?`);

    if (guess === userSecret) {
      console.log("🎉 I got it! Your number was " + guess);
      console.log(`I found it in ${attempts} attempts using binary search!`);
      found = true;
    } else if (guess < userSecret) {
      console.log("You said: Too low!");
      min = guess + 1;
    } else {
      console.log("You said: Too high!");
      max = guess - 1;
    }

    if (!found) {
      console.log(`Narrowing down: ${min} to ${max}`);
    }
  }

  if (!found) {
    console.log(
      "Hmm, I couldn't guess it! Are you sure you followed the rules? 🤔"
    );
  }
}
```

## 🏋️‍♂️ Mini-Challenges

### Challenge 1: Reverse Game

Create a version where YOU think of a number and the computer guesses it using binary search.

### Challenge 2: Multiplayer Mode

Simulate two players taking turns guessing the same number.

### Challenge 3: Category Guessing

Instead of numbers, guess categories like animals, colors, or countries.

### Challenge 4: Math-Based Hints

Give hints like "The number is a perfect square" or "The sum of digits is 12".

## 🧪 Testing Your Game

Test these scenarios to make sure your game works properly:

### Test Case 1: Edge Cases

```javascript
// Test with boundary numbers
let testNumbers = [1, 50, 100]; // Min, middle, max

// Test invalid inputs (simulate)
let invalidInputs = [-5, 0, 101, "abc", null];
```

### Test Case 2: Different Strategies

```javascript
// Test different guessing strategies:
// 1. Random guessing
// 2. Sequential guessing (1, 2, 3, ...)
// 3. Binary search (optimal)
// 4. Human-like guessing patterns
```

### Test Case 3: Game Balance

```javascript
// Make sure the game is:
// - Not too easy (too many attempts)
// - Not too hard (too few attempts)
// - Fun and engaging
// - Provides helpful feedback
```

## 🐛 Common Issues and Solutions

### Issue 1: Infinite Loops

```javascript
// ❌ Problem: Loop never ends
while (true) {
  // No break condition!
}

// ✅ Solution: Always have exit conditions
while (attempts < maxAttempts && !hasWon) {
  // Clear exit conditions
}
```

### Issue 2: Poor Random Numbers

```javascript
// ❌ Problem: Predictable or out of range
let bad = Math.random() * 100; // Could be 0-99.999...

// ✅ Solution: Proper range generation
let good = Math.floor(Math.random() * 100) + 1; // 1-100
```

### Issue 3: Unhelpful Feedback

```javascript
// ❌ Problem: Vague hints
console.log("Wrong!");

// ✅ Solution: Specific, helpful hints
if (guess < secretNumber) {
  console.log("Too low! Try a higher number.");
  console.log(`Hint: Try between ${guess + 1} and ${max}`);
}
```

## 📚 What You've Learned

By building this game, you've successfully combined:

✅ **Random number generation** - Creating unpredictable challenges  
✅ **While loops** - Repeating until win or lose condition  
✅ **Conditional logic** - Complex if/else decision making  
✅ **User input simulation** - Handling different types of input  
✅ **Game state management** - Tracking attempts, history, ranges  
✅ **User experience design** - Helpful hints and feedback  
✅ **Edge case handling** - Invalid inputs and boundary conditions  
✅ **Problem decomposition** - Breaking complex problems into parts

## 🎯 Extension Ideas

Take your game further:

- **GUI Version**: Create with HTML/CSS later
- **Themed Versions**: Guess the price, guess the year, etc.
- **Multiplayer**: Online competition
- **AI Analysis**: Track player patterns
- **Sound Effects**: Add audio feedback
- **Animations**: Visual feedback for hints

## ➡️ What's Next?

Congratulations on creating your first complete game! 🎉 You've shown you can combine multiple programming concepts to build something fun and interactive.

Next, you'll learn about **Functions** - a powerful way to organize your code into reusable pieces. Functions will help you write cleaner, more organized programs and avoid repeating yourself.

Your next lesson: **13. Functions Basics - Organizing Your Code**

## 🔗 Game Development Takeaways

- **Start simple, add features gradually**
- **Test edge cases thoroughly**
- **User experience matters as much as code quality**
- **Good feedback keeps players engaged**
- **Organization makes complex projects manageable**

You're becoming a real programmer! 🚀
