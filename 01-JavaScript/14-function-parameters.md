# 14. Function Parameters - Making Functions Flexible 🔧

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- How to create functions with multiple parameters
- The difference between parameters and arguments
- How to handle optional parameters and default values
- How to pass different data types to functions
- Best practices for function parameter design

## 🤔 Parameters vs Arguments

Before we dive in, let's clarify the terminology:

- **Parameters**: The variables listed in the function definition
- **Arguments**: The actual values passed when calling the function

```javascript
function greetPerson(name, age) {
  // name and age are PARAMETERS
  console.log(`Hello ${name}, you are ${age} years old!`);
}

greetPerson("Alice", 25); // "Alice" and 25 are ARGUMENTS
```

## 🔧 Single Parameter Functions

### Basic Single Parameter

```javascript
function doubleNumber(number) {
  let result = number * 2;
  console.log(`${number} doubled is ${result}`);
  return result;
}

// Test with different arguments
doubleNumber(5); // 5 doubled is 10
doubleNumber(12); // 12 doubled is 24
doubleNumber(-3); // -3 doubled is -6
```

### String Parameter

```javascript
function makeExciting(text) {
  let exciting = text.toUpperCase() + "!!!";
  console.log(`"${text}" becomes "${exciting}"`);
  return exciting;
}

makeExciting("hello world"); // "hello world" becomes "HELLO WORLD!!!"
makeExciting("javascript rocks"); // "javascript rocks" becomes "JAVASCRIPT ROCKS!!!"
```

### Boolean Parameter

```javascript
function describeMood(isHappy) {
  if (isHappy) {
    console.log("😊 You seem happy today!");
    return "positive";
  } else {
    console.log("😔 Hope your day gets better!");
    return "needs improvement";
  }
}

describeMood(true); // 😊 You seem happy today!
describeMood(false); // 😔 Hope your day gets better!
```

## 🔧 Multiple Parameter Functions

### Two Parameters

```javascript
function calculateRectangleArea(width, height) {
  console.log(`Calculating area of ${width} × ${height} rectangle`);
  let area = width * height;
  console.log(`Area: ${area} square units`);
  return area;
}

function createFullName(firstName, lastName) {
  let fullName = `${firstName} ${lastName}`;
  console.log(`Full name: ${fullName}`);
  return fullName;
}

// Test multiple parameters
calculateRectangleArea(10, 5); // Area: 50 square units
createFullName("John", "Doe"); // Full name: John Doe
```

### Three or More Parameters

```javascript
function calculateGrade(homework, midterm, final) {
  console.log(
    `Scores: Homework=${homework}, Midterm=${midterm}, Final=${final}`
  );

  // Weighted average: homework 30%, midterm 30%, final 40%
  let average = homework * 0.3 + midterm * 0.3 + final * 0.4;

  console.log(`Weighted average: ${average.toFixed(1)}`);
  return average;
}

function createAddress(street, city, state, zipCode) {
  let address = `${street}, ${city}, ${state} ${zipCode}`;
  console.log(`Address: ${address}`);
  return address;
}

// Test with multiple parameters
calculateGrade(85, 92, 88); // Weighted average: 88.1
createAddress("123 Main St", "Anytown", "CA", "90210");
```

## 🎯 Real-World Parameter Examples

### Example 1: User Account Creation

```javascript
function createUserAccount(username, email, age, isVerified) {
  console.log("Creating user account...");
  console.log(`Username: ${username}`);
  console.log(`Email: ${email}`);
  console.log(`Age: ${age}`);
  console.log(`Verified: ${isVerified ? "Yes" : "No"}`);

  // Validate the input
  let isValid = true;
  let errors = [];

  if (username.length < 3) {
    errors.push("Username must be at least 3 characters");
    isValid = false;
  }

  if (!email.includes("@")) {
    errors.push("Email must contain @");
    isValid = false;
  }

  if (age < 13) {
    errors.push("User must be at least 13 years old");
    isValid = false;
  }

  if (isValid) {
    console.log("✅ Account created successfully!");
    return {
      success: true,
      username: username,
      email: email,
      age: age,
      isVerified: isVerified,
    };
  } else {
    console.log("❌ Account creation failed:");
    errors.forEach((error) => console.log(`- ${error}`));
    return { success: false, errors: errors };
  }
}

// Test account creation
createUserAccount("john_doe", "john@email.com", 25, true);
createUserAccount("ab", "invalid-email", 10, false);
```

### Example 2: Shopping Cart Item

```javascript
function addToCart(itemName, price, quantity, hasDiscount) {
  console.log(`Adding to cart: ${itemName}`);

  let subtotal = price * quantity;
  let discount = 0;

  if (hasDiscount) {
    discount = subtotal * 0.1; // 10% discount
    console.log(`Discount applied: $${discount.toFixed(2)}`);
  }

  let total = subtotal - discount;

  console.log(`Price: $${price} × ${quantity} = $${subtotal.toFixed(2)}`);
  console.log(`Final total: $${total.toFixed(2)}`);

  return {
    item: itemName,
    price: price,
    quantity: quantity,
    subtotal: subtotal,
    discount: discount,
    total: total,
  };
}

// Test shopping cart
addToCart("Laptop", 999.99, 1, true); // With discount
addToCart("Mouse", 29.99, 2, false); // Without discount
```

### Example 3: Weather Report

```javascript
function generateWeatherReport(city, temperature, humidity, isRaining) {
  console.log(`Weather Report for ${city}:`);
  console.log(`Temperature: ${temperature}°F`);
  console.log(`Humidity: ${humidity}%`);
  console.log(`Precipitation: ${isRaining ? "Rain" : "No rain"}`);

  // Determine weather conditions
  let condition;
  if (isRaining) {
    condition = "Rainy";
  } else if (temperature >= 80) {
    condition = "Hot";
  } else if (temperature >= 65) {
    condition = "Pleasant";
  } else if (temperature >= 50) {
    condition = "Cool";
  } else {
    condition = "Cold";
  }

  // Determine comfort level
  let comfort;
  if (humidity > 70) {
    comfort = "Humid";
  } else if (humidity < 30) {
    comfort = "Dry";
  } else {
    comfort = "Comfortable";
  }

  console.log(`Conditions: ${condition} and ${comfort}`);

  // Activity recommendation
  let recommendation;
  if (isRaining) {
    recommendation = "Stay indoors";
  } else if (temperature >= 70 && temperature <= 85 && humidity <= 60) {
    recommendation = "Perfect for outdoor activities!";
  } else if (temperature > 90) {
    recommendation = "Stay hydrated and seek shade";
  } else {
    recommendation = "Dress appropriately for the weather";
  }

  console.log(`Recommendation: ${recommendation}`);

  return {
    city,
    temperature,
    humidity,
    isRaining,
    condition,
    comfort,
    recommendation,
  };
}

// Test weather reports
generateWeatherReport("Miami", 85, 75, false);
generateWeatherReport("Seattle", 62, 45, true);
generateWeatherReport("Phoenix", 105, 15, false);
```

## 🔄 Default Parameters (ES6 Feature)

Sometimes you want parameters to have default values if no argument is provided:

### Basic Default Parameters

```javascript
function greetPerson(name = "Guest", greeting = "Hello") {
  console.log(`${greeting}, ${name}!`);
}

// Test default parameters
greetPerson(); // Hello, Guest!
greetPerson("Alice"); // Hello, Alice!
greetPerson("Bob", "Hi"); // Hi, Bob!
greetPerson("Charlie", "Hey"); // Hey, Charlie!
```

### Mathematical Function with Defaults

```javascript
function calculateInterest(principal, rate = 5, years = 1) {
  console.log(`Calculating interest:`);
  console.log(`Principal: $${principal}`);
  console.log(`Rate: ${rate}%`);
  console.log(`Years: ${years}`);

  let interest = principal * (rate / 100) * years;
  let total = principal + interest;

  console.log(`Interest: $${interest.toFixed(2)}`);
  console.log(`Total: $${total.toFixed(2)}`);

  return { principal, rate, years, interest, total };
}

// Test with different parameter combinations
calculateInterest(1000); // Uses default rate (5%) and years (1)
calculateInterest(1000, 7); // Uses default years (1)
calculateInterest(1000, 7, 3); // All parameters provided
```

### Configuration Function with Defaults

```javascript
function createGameCharacter(name, health = 100, strength = 10, magic = 5) {
  console.log(`Creating character: ${name}`);
  console.log(`Health: ${health}`);
  console.log(`Strength: ${strength}`);
  console.log(`Magic: ${magic}`);

  let totalPower = strength + magic;
  console.log(`Total Power: ${totalPower}`);

  return {
    name: name,
    health: health,
    strength: strength,
    magic: magic,
    totalPower: totalPower,
  };
}

// Test character creation
createGameCharacter("Warrior"); // Default stats
createGameCharacter("Mage", 80, 5, 20); // Custom stats
createGameCharacter("Archer", 90, 15); // Partial custom stats
```

## 🔧 Parameter Validation

It's important to validate parameters to prevent errors:

### Basic Validation

```javascript
function divideSafely(a, b) {
  console.log(`Attempting to divide ${a} by ${b}`);

  // Validate parameters
  if (typeof a !== "number" || typeof b !== "number") {
    console.log("❌ Error: Both parameters must be numbers");
    return null;
  }

  if (b === 0) {
    console.log("❌ Error: Cannot divide by zero");
    return null;
  }

  let result = a / b;
  console.log(`✅ Result: ${result}`);
  return result;
}

// Test validation
divideSafely(10, 2); // ✅ Result: 5
divideSafely(10, 0); // ❌ Error: Cannot divide by zero
divideSafely("10", 2); // ❌ Error: Both parameters must be numbers
```

### Advanced Validation

```javascript
function registerForEvent(name, age, email, eventType) {
  console.log(`Registering for ${eventType} event:`);

  let errors = [];

  // Validate name
  if (!name || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  // Validate age
  if (!age || age < 0 || age > 120) {
    errors.push("Age must be between 0 and 120");
  }

  // Validate email
  if (!email || !email.includes("@") || !email.includes(".")) {
    errors.push("Email must be valid format");
  }

  // Validate event type
  let validEvents = ["workshop", "seminar", "conference", "webinar"];
  if (!validEvents.includes(eventType)) {
    errors.push(`Event type must be one of: ${validEvents.join(", ")}`);
  }

  // Age restrictions for certain events
  if (eventType === "conference" && age < 18) {
    errors.push("Must be 18+ for conference events");
  }

  if (errors.length > 0) {
    console.log("❌ Registration failed:");
    errors.forEach((error) => console.log(`- ${error}`));
    return { success: false, errors: errors };
  } else {
    console.log("✅ Registration successful!");
    return {
      success: true,
      participant: { name, age, email, eventType },
    };
  }
}

// Test event registration
registerForEvent("Alice Johnson", 25, "alice@email.com", "workshop");
registerForEvent("", 16, "invalid-email", "unknown");
```

## 🎲 Fun Parameter Examples

### Example 1: Dice Rolling with Parameters

```javascript
function rollDice(numberOfDice = 1, sides = 6) {
  console.log(`Rolling ${numberOfDice} ${sides}-sided dice:`);

  let rolls = [];
  let total = 0;

  for (let i = 0; i < numberOfDice; i++) {
    let roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
    total += roll;
  }

  console.log(`Rolls: ${rolls.join(", ")}`);
  console.log(`Total: ${total}`);

  return { rolls, total, average: total / numberOfDice };
}

// Test dice rolling
rollDice(); // 1 six-sided die
rollDice(2); // 2 six-sided dice
rollDice(3, 20); // 3 twenty-sided dice
```

### Example 2: Story Generator

```javascript
function generateStory(hero, villain, location, weapon) {
  console.log("Generating adventure story...");

  let story =
    `Once upon a time, ${hero} lived peacefully until ${villain} ` +
    `attacked ${location}. Our brave hero grabbed a ${weapon} and ` +
    `fought valiantly to save the day!`;

  console.log(`Story: ${story}`);
  return story;
}

// Generate different stories
generateStory("Alice", "the Dragon", "the village", "magic sword");
generateStory("Bob", "Evil Wizard", "the castle", "bow and arrow");
generateStory("Charlie", "Giant Spider", "the forest", "shield");
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Simple Parameter Functions

```javascript
// Create a function that takes two numbers and returns their sum
function addNumbers(a, b) {
  let sum = a + b;
  console.log(`${a} + ${b} = ${sum}`);
  return sum;
}

// Create a function that takes a name and age and creates a greeting
function createGreeting(name, age) {
  let greeting = `Hi ${name}! You are ${age} years old.`;
  console.log(greeting);
  return greeting;
}

// Create a function that calculates the area of a circle
function calculateCircleArea(radius) {
  let area = Math.PI * radius * radius;
  console.log(`Circle with radius ${radius} has area ${area.toFixed(2)}`);
  return area;
}

// Test your functions
addNumbers(15, 27);
createGreeting("Sarah", 30);
calculateCircleArea(5);
```

### Exercise 2: Default Parameters

```javascript
// Create a function with default parameters for a coffee order
function orderCoffee(size = "medium", type = "regular", addSugar = false) {
  console.log(`Coffee order: ${size} ${type}${addSugar ? " with sugar" : ""}`);

  let prices = { small: 2.5, medium: 3.0, large: 3.5 };
  let price = prices[size] || 3.0;

  if (type === "premium") price += 0.5;
  if (addSugar) price += 0.25;

  console.log(`Total: $${price.toFixed(2)}`);
  return { size, type, addSugar, price };
}

// Test coffee orders
orderCoffee(); // Default order
orderCoffee("large"); // Large regular
orderCoffee("small", "premium", true); // Small premium with sugar
```

## 🧪 Challenge Problems

### Challenge 1: Grade Calculator with Multiple Tests

```javascript
function calculateFinalGrade(
  homework,
  quiz1,
  quiz2,
  midterm,
  final,
  extraCredit = 0
) {
  console.log("Calculating final grade...");
  console.log(`Homework: ${homework}`);
  console.log(`Quiz 1: ${quiz1}`);
  console.log(`Quiz 2: ${quiz2}`);
  console.log(`Midterm: ${midterm}`);
  console.log(`Final: ${final}`);
  console.log(`Extra Credit: ${extraCredit}`);

  // Weight calculation
  let weighted =
    homework * 0.2 +
    quiz1 * 0.1 +
    quiz2 * 0.1 +
    midterm * 0.3 +
    final * 0.3 +
    extraCredit;

  // Cap at 100%
  let finalGrade = Math.min(weighted, 100);

  console.log(`Final Grade: ${finalGrade.toFixed(1)}%`);

  // Letter grade
  let letterGrade;
  if (finalGrade >= 90) letterGrade = "A";
  else if (finalGrade >= 80) letterGrade = "B";
  else if (finalGrade >= 70) letterGrade = "C";
  else if (finalGrade >= 60) letterGrade = "D";
  else letterGrade = "F";

  console.log(`Letter Grade: ${letterGrade}`);

  return { finalGrade, letterGrade };
}

// Test grade calculation
calculateFinalGrade(85, 92, 88, 87, 91, 3);
```

### Challenge 2: Shopping Cart Calculator

```javascript
function calculateCartTotal(
  items,
  taxRate = 8.5,
  shippingCost = 5.99,
  discountPercent = 0
) {
  console.log("Calculating cart total...");
  console.log(`Tax Rate: ${taxRate}%`);
  console.log(`Shipping: $${shippingCost}`);
  console.log(`Discount: ${discountPercent}%`);

  let subtotal = 0;

  console.log("\nItems:");
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    console.log(
      `${item.name}: $${item.price} × ${item.quantity} = $${itemTotal.toFixed(
        2
      )}`
    );
  }

  console.log(`\nSubtotal: $${subtotal.toFixed(2)}`);

  // Apply discount
  let discount = subtotal * (discountPercent / 100);
  let afterDiscount = subtotal - discount;

  if (discount > 0) {
    console.log(`Discount (-${discountPercent}%): -$${discount.toFixed(2)}`);
    console.log(`After Discount: $${afterDiscount.toFixed(2)}`);
  }

  // Calculate tax
  let tax = afterDiscount * (taxRate / 100);
  console.log(`Tax (${taxRate}%): $${tax.toFixed(2)}`);

  // Add shipping (free if over $50 after discount)
  let shipping = afterDiscount >= 50 ? 0 : shippingCost;
  if (shipping === 0) {
    console.log("Shipping: FREE (order over $50)");
  } else {
    console.log(`Shipping: $${shipping.toFixed(2)}`);
  }

  let total = afterDiscount + tax + shipping;
  console.log(`\nFinal Total: $${total.toFixed(2)}`);

  return {
    subtotal,
    discount,
    tax,
    shipping,
    total,
  };
}

// Test cart calculation
let cart = [
  { name: "Laptop", price: 999.99, quantity: 1 },
  { name: "Mouse", price: 29.99, quantity: 2 },
  { name: "Keyboard", price: 79.99, quantity: 1 },
];

calculateCartTotal(cart, 8.5, 5.99, 10);
```

## 📚 Key Takeaways

1. **Parameters make functions flexible** - Same function, different inputs
2. **Arguments are the actual values** - Parameters are the variables
3. **Default parameters provide fallbacks** - Handle missing arguments gracefully
4. **Validate parameters early** - Prevent errors and unexpected behavior
5. **Use descriptive parameter names** - Make function purpose clear
6. **Don't use too many parameters** - Consider using objects for complex input

## ➡️ What's Next?

Great work mastering function parameters! 🎉 You now know how to create flexible, reusable functions that can handle different types of input.

Next, you'll learn about **Return Values** - how functions can send data back to the code that called them, and how to use those returned values effectively.

Your next lesson: **15. Return Values - Getting Results Back**

## 🔗 Quick Reference

```javascript
// Basic parameters
function myFunc(param1, param2) {
  /* ... */
}

// Default parameters
function myFunc(param1 = "default", param2 = 0) {
  /* ... */
}

// Parameter validation
if (typeof param !== "number") {
  console.log("Error: Parameter must be a number");
  return null;
}

// Multiple parameter types
function example(str, num, bool, arr) {
  // Handle different data types
}
```

You're getting great at making functions work exactly how you want them! 🚀
