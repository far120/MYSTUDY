# Conditions and Decision Making - Making Your Code Smart 🧠

Now that you can store information and do calculations, let's make your programs **smart**! Conditional statements let your code make decisions and respond differently to different situations.

## 🤔 What are Conditions?

In real life, you make decisions based on conditions all the time:

- 🌧️ **IF** it's raining, **THEN** take an umbrella
- 🍕 **IF** I'm hungry, **THEN** eat something
- 💰 **IF** I have enough money, **THEN** buy the item

In programming, we use **if statements** to make these same kinds of decisions!

## 🎯 Basic if Statement

The most basic way to make decisions in JavaScript:

```javascript
let age = 18;

if (age >= 18) {
  console.log("You are an adult!");
}
```

**How it works:**

1. `if` - The keyword that starts a condition
2. `(age >= 18)` - The condition to check (must be true or false)
3. `{ }` - The code block that runs if the condition is true

### Try it yourself:

```javascript
let temperature = 75;

if (temperature > 70) {
  console.log("It's a warm day!");
}

if (temperature < 32) {
  console.log("It's freezing!");
}
```

## 🔄 if-else Statement

What if you want something to happen when the condition is **false**?

```javascript
let age = 16;

if (age >= 18) {
  console.log("You can vote!");
} else {
  console.log("You're too young to vote.");
}
```

**What happens:**

- If `age >= 18` is **true** → "You can vote!"
- If `age >= 18` is **false** → "You're too young to vote."

### Practical Example:

```javascript
let weather = "sunny";

if (weather === "rainy") {
  console.log("Take an umbrella!");
} else {
  console.log("No umbrella needed!");
}
```

## 🎭 Multiple Conditions with else-if

When you have more than two possibilities:

```javascript
let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
```

**How it works:**

1. Checks each condition **in order**
2. Runs the **first** true condition
3. **Skips** all remaining conditions
4. If **nothing** is true, runs the `else` block

## 📊 Comparison Operators

These operators compare values and return `true` or `false`:

```javascript
let a = 10;
let b = 5;

console.log(a > b); // true  (10 is greater than 5)
console.log(a < b); // false (10 is not less than 5)
console.log(a >= 10); // true  (10 is greater than or equal to 10)
console.log(a <= 5); // false (10 is not less than or equal to 5)
console.log(a === 10); // true  (10 equals 10)
console.log(a !== b); // true  (10 does not equal 5)
```

### ⚠️ Important: === vs ==

```javascript
let age = "18"; // This is a string!
let number = 18; // This is a number!

console.log(age == number); // true  (converts types, then compares)
console.log(age === number); // false (compares type AND value)
```

**Always use `===`** (triple equals) - it's safer and more predictable!

## 🔗 Logical Operators

Combine multiple conditions:

### AND operator (&&)

**Both** conditions must be true:

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense === true) {
  console.log("You can drive!");
} else {
  console.log("You cannot drive.");
}
```

### OR operator (||)

**Either** condition can be true:

```javascript
let day = "Saturday";

if (day === "Saturday" || day === "Sunday") {
  console.log("It's the weekend!");
} else {
  console.log("It's a weekday.");
}
```

### NOT operator (!)

Reverses true/false:

```javascript
let isRaining = false;

if (!isRaining) {
  console.log("Go for a walk!"); // This will run because !false = true
}
```

## 🧪 Practical Examples

### Example 1: Password Strength Checker

```javascript
let password = "mypassword123";

console.log("Password Strength Check:");

if (password.length >= 12) {
  console.log("✅ Length: Strong (12+ characters)");
} else if (password.length >= 8) {
  console.log("⚠️ Length: Medium (8-11 characters)");
} else {
  console.log("❌ Length: Weak (less than 8 characters)");
}

if (password.includes("123")) {
  console.log("❌ Contains common sequence");
} else {
  console.log("✅ No common sequences detected");
}
```

### Example 2: Shopping Discount Calculator

```javascript
let totalPurchase = 150;
let isMember = true;
let discount = 0;

console.log(`Original total: $${totalPurchase}`);

if (isMember && totalPurchase >= 100) {
  discount = 0.2; // 20% discount
  console.log("🎉 Member + $100+ purchase: 20% discount!");
} else if (isMember) {
  discount = 0.1; // 10% discount
  console.log("👤 Member discount: 10% off!");
} else if (totalPurchase >= 200) {
  discount = 0.15; // 15% discount
  console.log("💰 Large purchase: 15% discount!");
} else {
  console.log("No discount applies.");
}

let discountAmount = totalPurchase * discount;
let finalTotal = totalPurchase - discountAmount;

console.log(`Discount: $${discountAmount.toFixed(2)}`);
console.log(`Final total: $${finalTotal.toFixed(2)}`);
```

### Example 3: Weather Advisor

```javascript
let temperature = 72;
let isRaining = false;
let windSpeed = 15;

console.log("🌤️ Weather Advisory:");

// Temperature advice
if (temperature >= 80) {
  console.log("🔥 It's hot! Wear light clothes and stay hydrated.");
} else if (temperature >= 65) {
  console.log("😊 Nice weather! Perfect for outdoor activities.");
} else if (temperature >= 50) {
  console.log("🧥 A bit cool. Consider a light jacket.");
} else {
  console.log("🥶 It's cold! Bundle up warm!");
}

// Rain advice
if (isRaining) {
  console.log("☔ It's raining. Take an umbrella!");
} else {
  console.log("☀️ No rain expected. Enjoy the dry weather!");
}

// Wind advice
if (windSpeed > 25) {
  console.log("💨 Very windy! Hold onto your hat!");
} else if (windSpeed > 15) {
  console.log("🍃 Breezy conditions.");
} else {
  console.log("🍃 Calm winds.");
}

// Combined advice
if (temperature > 75 && !isRaining && windSpeed < 10) {
  console.log("🏖️ Perfect beach weather!");
}
```

## 🎮 Interactive Exercises

### Exercise 1: Age Category Classifier

Create a program that categorizes people by age:

```javascript
let age = 25; // Change this to test different ages

console.log(`Age: ${age}`);

if (age < 13) {
  console.log("Category: Child");
} else if (age < 20) {
  console.log("Category: Teenager");
} else if (age < 65) {
  console.log("Category: Adult");
} else {
  console.log("Category: Senior");
}

// Add activities recommendation
if (age >= 16 && age < 18) {
  console.log("🚗 You can get a learner's permit!");
}

if (age >= 18) {
  console.log("🗳️ You can vote!");
}

if (age >= 21) {
  console.log("🍺 You can drink alcohol (in USA)!");
}
```

### Exercise 2: Grade Calculator

Convert numeric scores to letter grades:

```javascript
let score = 87; // Change this to test different scores

console.log(`Score: ${score}%`);

if (score >= 97) {
  console.log("Grade: A+");
} else if (score >= 93) {
  console.log("Grade: A");
} else if (score >= 90) {
  console.log("Grade: A-");
} else if (score >= 87) {
  console.log("Grade: B+");
} else if (score >= 83) {
  console.log("Grade: B");
} else if (score >= 80) {
  console.log("Grade: B-");
} else if (score >= 77) {
  console.log("Grade: C+");
} else if (score >= 73) {
  console.log("Grade: C");
} else if (score >= 70) {
  console.log("Grade: C-");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}

// Add performance message
if (score >= 90) {
  console.log("🌟 Excellent work!");
} else if (score >= 80) {
  console.log("👍 Good job!");
} else if (score >= 70) {
  console.log("📚 Keep studying!");
} else {
  console.log("💪 You can do better!");
}
```

### Exercise 3: Number Facts

Create a program that tells interesting facts about numbers:

```javascript
let number = 17; // Change this to test different numbers

console.log(`Number Facts for: ${number}`);

// Even or odd
if (number % 2 === 0) {
  console.log("✅ This number is even");
} else {
  console.log("✅ This number is odd");
}

// Positive, negative, or zero
if (number > 0) {
  console.log("✅ This number is positive");
} else if (number < 0) {
  console.log("✅ This number is negative");
} else {
  console.log("✅ This number is zero");
}

// Size categories
if (number >= 1000) {
  console.log("📏 This is a large number (1000+)");
} else if (number >= 100) {
  console.log("📏 This is a medium number (100-999)");
} else if (number >= 10) {
  console.log("📏 This is a small number (10-99)");
} else if (number >= 0) {
  console.log("📏 This is a single digit (0-9)");
}

// Special numbers
if (number === 7 || number === 13) {
  console.log("🍀 This is considered a lucky/unlucky number!");
}
```

## ⚠️ Common Mistakes to Avoid

### 1. Using = instead of ===

```javascript
let age = 18;

// Wrong:
if ((age = 18)) {
  // This assigns 18 to age, doesn't compare!
  console.log("Adult");
}

// Right:
if (age === 18) {
  // This compares age to 18
  console.log("Adult");
}
```

### 2. Forgetting Curly Braces

```javascript
// Risky (works but can cause issues):
if (age >= 18) console.log("Adult");
console.log("Can vote"); // This ALWAYS runs!

// Safe:
if (age >= 18) {
  console.log("Adult");
  console.log("Can vote"); // This only runs if condition is true
}
```

### 3. Wrong Logical Operator

```javascript
let age = 25;
let hasID = true;

// Wrong - wants BOTH conditions true, but uses OR:
if (age >= 21 || hasID === true) {
  // Anyone 21+ OR anyone with ID
  console.log("Can enter");
}

// Right - needs BOTH conditions true:
if (age >= 21 && hasID === true) {
  // Must be 21+ AND have ID
  console.log("Can enter");
}
```

## 🎯 Key Concepts to Remember

1. **if statements** make decisions based on conditions
2. **Conditions** must evaluate to `true` or `false`
3. **Use `===`** for comparison (not `==`)
4. **else if** handles multiple possibilities
5. **else** handles everything else
6. **&& (AND)** - both conditions must be true
7. **|| (OR)** - either condition can be true
8. **! (NOT)** - reverses true/false

## 🚀 What's Next?

Fantastic! Your programs can now make intelligent decisions. Next, we'll learn about **loops** - how to make your code repeat tasks automatically. This is where programming becomes incredibly powerful for handling repetitive work!

---

🎉 **You've unlocked the power of decision-making in code!** Every app you've ever used makes thousands of decisions like these every second. You're building the foundation for creating truly intelligent programs!
