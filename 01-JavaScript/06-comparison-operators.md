# 6. Comparison Operators - Comparing Values 🔍

## 🎯 Learning Objectives

By the end of this lesson, you'll understand:

- What comparison operators are and why they're essential
- How to compare numbers, strings, and other values
- The difference between == and === (very important!)
- Common mistakes and how to avoid them

## 🤔 What Are Comparison Operators?

Comparison operators let you compare two values and get a true/false answer. Think of them as questions you ask about your data:

- "Is this number bigger than that one?"
- "Are these two things equal?"
- "Is this person old enough to vote?"

## 📋 The Complete List of Comparison Operators

### 1. Equality Operators

```javascript
// == (loose equality) - compares values, allows type conversion
5 == "5"; // true (string "5" converted to number)
true == 1; // true (true converted to 1)
false == 0; // true (false converted to 0)

// === (strict equality) - compares values AND types
5 === "5"; // false (different types: number vs string)
5 === 5; // true (same value and type)
true === 1; // false (different types: boolean vs number)

// != (loose inequality)
5 != "3"; // true
5 != "5"; // false

// !== (strict inequality)
5 !== "5"; // true (different types)
5 !== 5; // false
```

### 2. Relational Operators

```javascript
let age = 25;
let votingAge = 18;

// Greater than
age > votingAge; // true (25 > 18)
10 > 20; // false

// Greater than or equal
age >= 18; // true
18 >= 18; // true (equal counts!)

// Less than
10 < 20; // true
30 < 25; // false

// Less than or equal
age <= 30; // true
25 <= 25; // true (equal counts!)
```

## 🎯 Real-World Examples

### Example 1: Age Verification

```javascript
let userAge = 16;
let canVote = userAge >= 18;
let canDrive = userAge >= 16;
let canDrink = userAge >= 21;

console.log("Can vote:", canVote); // false
console.log("Can drive:", canDrive); // true
console.log("Can drink:", canDrink); // false
```

### Example 2: Password Strength

```javascript
let password = "mypassword123";
let isLongEnough = password.length >= 8;
let isSecure = password.length >= 12;

console.log("Password length:", password.length); // 13
console.log("Long enough:", isLongEnough); // true
console.log("Secure:", isSecure); // true
```

### Example 3: Grade Comparison

```javascript
let studentScore = 85;
let passingGrade = 60;
let honorRoll = 90;

let isPassing = studentScore >= passingGrade;
let isHonorRoll = studentScore >= honorRoll;
let needsHelp = studentScore < passingGrade;

console.log("Passing:", isPassing); // true
console.log("Honor roll:", isHonorRoll); // false
console.log("Needs help:", needsHelp); // false
```

## ⚠️ Common Pitfalls and Best Practices

### 1. Always Use === Instead of ==

```javascript
// ❌ Avoid this (can cause unexpected results)
if (userInput == 0) {
  // This will be true for: 0, "0", false, "", null
}

// ✅ Do this instead
if (userInput === 0) {
  // This will ONLY be true for the number 0
}
```

### 2. String Comparisons

```javascript
// Strings are compared alphabetically
"apple" < "banana"; // true
"Apple" < "apple"; // true (capital letters come first)
"10" < "9"; // true (string comparison, not numeric!)

// For numbers as strings, convert first:
Number("10") < Number("9"); // false (correct numeric comparison)
```

### 3. Comparing with null and undefined

```javascript
let data = null;
let info; // undefined

// Be careful with these comparisons
data == undefined; // true (null loosely equals undefined)
data === undefined; // false (different types)
info === undefined; // true
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Basic Comparisons

```javascript
// Create variables and test comparisons
let a = 10;
let b = 20;
let c = "10";

// What will these return? Try to guess, then test:
console.log(a < b); // ?
console.log(a == c); // ?
console.log(a === c); // ?
console.log(b >= 20); // ?
console.log(a !== c); // ?
```

### Exercise 2: Age Categories

```javascript
// Write a program that categorizes people by age
let age = 25; // Try different ages

let isChild = age < 13;
let isTeenager = age >= 13 && age < 20; // We'll learn && in the next lesson
let isAdult = age >= 18;
let isSenior = age >= 65;

console.log("Child:", isChild);
console.log("Teenager:", isTeenager);
console.log("Adult:", isAdult);
console.log("Senior:", isSenior);
```

### Exercise 3: Shopping Cart

```javascript
// Shopping cart logic
let itemPrice = 29.99;
let customerMoney = 35.0;
let freeShippingThreshold = 50.0;

let canAfford = customerMoney >= itemPrice;
let qualifiesForFreeShipping = itemPrice >= freeShippingThreshold;
let needsMoreMoney = itemPrice > customerMoney;

console.log("Can afford:", canAfford);
console.log("Free shipping:", qualifiesForFreeShipping);
console.log("Needs more money:", needsMoreMoney);
```

## 🧪 Challenge Problems

### Challenge 1: Temperature Checker

Create variables for temperature and determine:

- Is it freezing? (below 32°F)
- Is it comfortable? (between 65-75°F)
- Is it hot? (above 85°F)

### Challenge 2: Login Validator

Create a simple login checker:

- Username must be at least 3 characters
- Password must be at least 8 characters
- Check if both conditions are met

### Challenge 3: Discount Calculator

A store offers discounts:

- 10% off if you spend $100 or more
- 20% off if you spend $200 or more
- Create logic to determine which discount applies

## 📚 Key Takeaways

1. **Use === instead of ==** - Always prefer strict equality
2. **Comparison operators return booleans** - true or false
3. **Be careful with string vs number comparisons**
4. **>=** and **<=** include equality
5. **String comparisons are alphabetical, not numeric**

## ➡️ What's Next?

You now know how to compare values! In the next lesson, you'll learn **Logical Operators** - how to combine multiple comparisons using AND, OR, and NOT. This will let you create more sophisticated conditions like "if age is over 18 AND has valid ID".

## 🔗 Quick Reference

```javascript
// Equality
===   // Strict equal (preferred)
!==   // Strict not equal (preferred)
==    // Loose equal (avoid)
!=    // Loose not equal (avoid)

// Comparison
>     // Greater than
>=    // Greater than or equal
<     // Less than
<=    // Less than or equal
```

Practice these comparisons until they feel natural - they're the building blocks of smart programs! 🎯
