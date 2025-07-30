# 7. Logical Operators - Combining Conditions 🧠

## 🎯 Learning Objectives

By the end of this lesson, you'll understand:

- How to combine multiple conditions using AND, OR, and NOT
- How logical operators work with true/false values
- Real-world scenarios where you need multiple conditions
- Short-circuit evaluation and why it matters

## 🤔 What Are Logical Operators?

Logical operators let you combine multiple conditions or flip true/false values. Think of them as connecting words in decision-making:

- "If it's sunny AND I have free time, I'll go to the beach"
- "If it's raining OR snowing, I'll stay inside"
- "If I'm NOT busy, I can help you"

## 📋 The Three Logical Operators

### 1. AND Operator (&&)

Both conditions must be true for the result to be true.

```javascript
let age = 25;
let hasLicense = true;
let hasInsurance = true;

// Can drive if age >= 18 AND has license AND has insurance
let canDrive = age >= 18 && hasLicense && hasInsurance;
console.log("Can drive:", canDrive); // true

// If any condition is false, the whole thing is false
let canDriveWithoutLicense = age >= 18 && false && hasInsurance;
console.log("Can drive without license:", canDriveWithoutLicense); // false
```

### 2. OR Operator (||)

At least one condition must be true for the result to be true.

```javascript
let isWeekend = false;
let isHoliday = true;
let isVacationDay = false;

// Don't work if it's weekend OR holiday OR vacation day
let dayOff = isWeekend || isHoliday || isVacationDay;
console.log("Day off:", dayOff); // true (because it's a holiday)

// All conditions must be false for OR to be false
let workDay = false || false || false;
console.log("Work day:", workDay); // false
```

### 3. NOT Operator (!)

Flips true to false and false to true.

```javascript
let isLoggedIn = false;
let needsToLogin = !isLoggedIn;
console.log("Needs to login:", needsToLogin); // true

let isOnline = true;
let isOffline = !isOnline;
console.log("Is offline:", isOffline); // false

// Double NOT (!!) converts any value to boolean
let name = "John";
let hasName = !!name; // true (non-empty string is truthy)
console.log("Has name:", hasName); // true
```

## 🎯 Real-World Examples

### Example 1: User Access Control

```javascript
let userAge = 22;
let isVerified = true;
let hasPremium = false;
let isBanned = false;

// Can access content if:
// (18+ AND verified) AND (NOT banned)
let canAccessContent = userAge >= 18 && isVerified && !isBanned;
console.log("Can access content:", canAccessContent); // true

// Can access premium features if:
// Can access content AND has premium
let canAccessPremium = canAccessContent && hasPremium;
console.log("Can access premium:", canAccessPremium); // false
```

### Example 2: Weather Decision Making

```javascript
let temperature = 75;
let isRaining = false;
let isSunny = true;
let hasUmbrella = true;

// Good day for a picnic if:
// Temperature between 65-80 AND (sunny OR not raining)
let goodForPicnic =
  temperature >= 65 && temperature <= 80 && (isSunny || !isRaining);
console.log("Good for picnic:", goodForPicnic); // true

// Go outside if:
// Not raining OR (raining AND have umbrella)
let canGoOutside = !isRaining || (isRaining && hasUmbrella);
console.log("Can go outside:", canGoOutside); // true
```

### Example 3: Form Validation

```javascript
let username = "john_doe";
let password = "securepass123";
let email = "john@email.com";
let agreeToTerms = true;

// Username validation
let validUsername = username.length >= 3 && username.length <= 20;

// Password validation
let validPassword =
  (password.length >= 8 && password.includes("@")) || password.includes("!");

// Email validation (simplified)
let validEmail = email.includes("@") && email.includes(".");

// Form is valid if ALL fields are valid AND terms agreed
let formIsValid = validUsername && validPassword && validEmail && agreeToTerms;

console.log("Valid username:", validUsername); // true
console.log("Valid password:", validPassword); // false (no @ or !)
console.log("Valid email:", validEmail); // true
console.log("Form is valid:", formIsValid); // false
```

## 🧠 Understanding Truth Tables

### AND (&&) Truth Table

```javascript
true && true; // true
true && false; // false
false && true; // false
false && false; // false
```

### OR (||) Truth Table

```javascript
true || true; // true
true || false; // true
false || true; // true
false || false; // false
```

### NOT (!) Truth Table

```javascript
!true; // false
!false; // true
```

## ⚡ Short-Circuit Evaluation

JavaScript uses "short-circuit" evaluation - it stops checking as soon as it knows the answer:

### AND Short-Circuit

```javascript
// If first condition is false, it doesn't check the rest
let result1 = false && someExpensiveFunction(); // someExpensiveFunction never runs

// If first condition is true, it checks the next one
let result2 = true && someExpensiveFunction(); // someExpensiveFunction runs
```

### OR Short-Circuit

```javascript
// If first condition is true, it doesn't check the rest
let result1 = true || someExpensiveFunction(); // someExpensiveFunction never runs

// If first condition is false, it checks the next one
let result2 = false || someExpensiveFunction(); // someExpensiveFunction runs
```

### Practical Use of Short-Circuit

```javascript
// Common pattern: provide default value
let userName = userInput || "Guest"; // If userInput is empty, use "Guest"

// Safe property access
let userEmail = user && user.email; // Only access email if user exists
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Basic Logic

```javascript
// Test your understanding
let a = true;
let b = false;
let c = true;

console.log(a && b); // ?
console.log(a || b); // ?
console.log(!a); // ?
console.log((a && b) || c); // ?
console.log(!(a && b)); // ?
```

### Exercise 2: Age and Status Checker

```javascript
let age = 17;
let hasParentPermission = true;
let isStudent = true;

// Can enter movie if:
// (18+ OR (under 18 AND has parent permission)) AND is student
let canEnterMovie =
  (age >= 18 || (age < 18 && hasParentPermission)) && isStudent;

console.log("Can enter movie:", canEnterMovie);

// Try with different values:
// age = 20, hasParentPermission = false, isStudent = true
// age = 16, hasParentPermission = false, isStudent = true
```

### Exercise 3: Shopping Cart Logic

```javascript
let cartTotal = 75;
let hasCoupon = true;
let isMember = false;
let freeShippingMinimum = 50;

// Free shipping if:
// Cart total >= $50 OR is member
let freeShipping = cartTotal >= freeShippingMinimum || isMember;

// Gets discount if:
// Has coupon AND (is member OR cart total > $100)
let getsDiscount = hasCoupon && (isMember || cartTotal > 100);

console.log("Free shipping:", freeShipping);
console.log("Gets discount:", getsDiscount);
```

## 🧪 Challenge Problems

### Challenge 1: Gaming Access Control

Create a system that determines if a player can access a game level:

- Must be level 5+ AND (have premium account OR completed tutorial)
- Must NOT be banned
- Must have internet connection OR be playing offline mode

### Challenge 2: Job Application Filter

Create logic for filtering job applications:

- Must have degree OR 5+ years experience
- Must be willing to relocate OR job is remote
- Must NOT have employment gaps > 2 years
- Must pass background check AND drug test

### Challenge 3: Smart Home System

Create conditions for a smart home:

- Turn on AC if: temperature > 75 AND (someone is home OR pets are present)
- Turn on security if: NOT home AND (nighttime OR vacation mode)
- Send alert if: (door open AND NOT home) OR (motion detected AND security on)

## 📚 Common Patterns

### 1. Default Values

```javascript
let userName = inputName || "Anonymous";
let userAge = inputAge || 18;
```

### 2. Safety Checks

```javascript
let userEmail = user && user.profile && user.profile.email;
```

### 3. Complex Conditions

```javascript
let canProceed = (condition1 && condition2) || (condition3 && !condition4);
```

### 4. Validation

```javascript
let isValid = field1 && field2 && field3 && !hasErrors;
```

## ⚠️ Common Mistakes

1. **Confusing && and ||**

   ```javascript
   // Wrong: User must be admin AND moderator (both required)
   if (isAdmin || isModerator) {
     /* This allows either one */
   }

   // Correct: User must be admin AND moderator
   if (isAdmin && isModerator) {
     /* Both required */
   }
   ```

2. **Not using parentheses for clarity**

   ```javascript
   // Unclear precedence
   if (a || (b && c)) {
     /* What gets evaluated first? */
   }

   // Clear with parentheses
   if (a || (b && c)) {
     /* Much clearer */
   }
   ```

## 📚 Key Takeaways

1. **&& requires ALL conditions to be true**
2. **|| requires AT LEAST ONE condition to be true**
3. **! flips true/false**
4. **Use parentheses to group conditions clearly**
5. **Short-circuit evaluation can improve performance**
6. **Logical operators are essential for complex decision-making**

## ➡️ What's Next?

Congratulations! You now understand all the basic building blocks of programming logic. In the next lesson, you'll put everything together in a **Practice Project: Simple Calculator** where you'll use variables, operations, conditions, comparisons, and logical operators to build something real!

## 🔗 Quick Reference

```javascript
// Logical Operators
&&    // AND - all must be true
||    // OR - at least one must be true
!     // NOT - flips true/false

// Common Patterns
value || default        // Use default if value is falsy
obj && obj.property    // Safe property access
!condition             // Opposite of condition
```

Keep practicing these operators - they're the key to making smart, responsive programs! 🎯
