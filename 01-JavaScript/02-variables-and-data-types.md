# Variables and Data Types - Storing Information 📦

Now that you can display messages, let's learn how to **store and remember information** in your programs. This is where programming becomes really powerful!

## 🤔 What are Variables?

A **variable** is like a labeled box where you can store information. Just like you might have a box labeled "Photos" in your room, you can have a variable labeled "userName" in your program.

**Real-world example:**

- 📦 **Physical box**: Labeled "Birthday Cards" → Contains actual birthday cards
- 💻 **Variable**: Named "userAge" → Contains the number 25

## 📝 Creating Your First Variable

Let's create a variable to store your name:

```javascript
let myName = "Alex";
console.log(myName);
```

**What's happening here?**

- `let` tells JavaScript "I want to create a new variable"
- `myName` is the name we gave our variable (like a label on a box)
- `=` means "store this value"
- `"Alex"` is the value we're storing
- `console.log(myName)` displays what's inside the variable

### Try it yourself:

1. Create a new file called `variables.js`
2. Type the code above (change "Alex" to your name)
3. Run it with: `node variables.js`

## 🎯 Variable Rules and Best Practices

### ✅ Good Variable Names:

```javascript
let firstName = "John";
let userAge = 25;
let isLoggedIn = true;
let totalPrice = 99.99;
```

### ❌ Bad Variable Names:

```javascript
let x = "John";           // Not descriptive
let 1name = "John";       // Can't start with number
let first-name = "John";  // Can't use hyphens
let user age = 25;        // Can't have spaces
```

### 🏆 Naming Conventions:

- Use **camelCase**: `firstName`, `totalPrice`, `isLoggedIn`
- Make names **descriptive**: `userName` not `un`
- Start with **lowercase letter**
- Use **letters, numbers, underscore, or $** only

## 📊 Data Types - Different Kinds of Information

Just like real boxes can hold different types of items, variables can hold different types of data.

### 1. 🔤 String (Text)

Text information goes in quotes:

```javascript
let firstName = "Sarah";
let lastName = "Johnson";
let message = "Welcome to our website!";
let emptyText = ""; // Empty string

console.log(firstName);
console.log(message);
```

**String Examples:**

- Names: `"John"`, `"Sarah"`
- Messages: `"Hello World"`
- Email: `"user@email.com"`
- Even numbers as text: `"123"` (note: this is text, not a number)

### 2. 🔢 Number

Numbers don't need quotes:

```javascript
let age = 25;
let price = 19.99;
let temperature = -5;
let population = 1000000;

console.log(age);
console.log(price);
```

**Number Examples:**

- Whole numbers: `25`, `100`, `-10`
- Decimals: `19.99`, `3.14`, `0.5`
- Large numbers: `1000000`

### 3. ✅❌ Boolean (True/False)

Only two possible values: `true` or `false`:

```javascript
let isRaining = true;
let hasFinishedHomework = false;
let isLoggedIn = true;
let isWeekend = false;

console.log(isRaining);
console.log(hasFinishedHomework);
```

**Boolean Examples:**

- User status: `isLoggedIn = true`
- Conditions: `isRaining = false`
- Permissions: `canEdit = true`

### 4. 🚫 Undefined

When a variable exists but has no value:

```javascript
let userEmail; // Created but no value assigned
console.log(userEmail); // Shows: undefined
```

## 🔄 Changing Variable Values

Variables can be updated after they're created:

```javascript
let score = 0;
console.log(score); // Shows: 0

score = 10;
console.log(score); // Shows: 10

score = score + 5;
console.log(score); // Shows: 15
```

## 🧪 Practical Examples

### Example 1: User Profile

```javascript
let userName = "Alex";
let userAge = 28;
let isSubscribed = true;
let accountBalance = 150.75;

console.log("User Profile:");
console.log("Name: " + userName);
console.log("Age: " + userAge);
console.log("Subscribed: " + isSubscribed);
console.log("Balance: $" + accountBalance);
```

### Example 2: Shopping Cart

```javascript
let productName = "Laptop";
let productPrice = 999.99;
let inStock = true;
let quantity = 2;

let totalPrice = productPrice * quantity;

console.log("Product: " + productName);
console.log("Price: $" + productPrice);
console.log("Quantity: " + quantity);
console.log("Total: $" + totalPrice);
```

## 🎮 Interactive Exercises

### Exercise 1: About Me Variables

Create variables for yourself and display them:

```javascript
let myName = "Your Name Here";
let myAge = 25; // Your age
let myCity = "Your City";
let isCoffeeLover = true; // Do you love coffee?

// Display your information
console.log("Hi! My name is " + myName);
console.log("I am " + myAge + " years old");
console.log("I live in " + myCity);
console.log("Do I love coffee? " + isCoffeeLover);
```

### Exercise 2: Math with Variables

Practice using number variables:

```javascript
let number1 = 15;
let number2 = 7;

let sum = number1 + number2;
let difference = number1 - number2;
let product = number1 * number2;

console.log(number1 + " + " + number2 + " = " + sum);
console.log(number1 + " - " + number2 + " = " + difference);
console.log(number1 + " * " + number2 + " = " + product);
```

### Exercise 3: Update Variables

See how variables change:

```javascript
let bankAccount = 1000;
console.log("Starting balance: $" + bankAccount);

bankAccount = bankAccount - 50; // Spend $50
console.log("After spending $50: $" + bankAccount);

bankAccount = bankAccount + 200; // Earn $200
console.log("After earning $200: $" + bankAccount);
```

## 🔍 typeof Operator - Check Data Types

You can check what type of data is in a variable:

```javascript
let name = "John";
let age = 25;
let isStudent = true;

console.log(typeof name); // "string"
console.log(typeof age); // "number"
console.log(typeof isStudent); // "boolean"
```

## ⚠️ Common Beginner Mistakes

### 1. Forgetting Quotes for Strings

```javascript
// Wrong:
let name = John; // Error! JavaScript thinks John is a variable

// Right:
let name = "John";
```

### 2. Using Numbers as Strings

```javascript
let age1 = "25"; // This is text
let age2 = 25; // This is a number

console.log(age1 + 5); // Shows: "255" (text joining)
console.log(age2 + 5); // Shows: 30 (math)
```

### 3. Case Sensitivity

```javascript
let userName = "Alex";
console.log(username); // Error! JavaScript doesn't know "username"
```

## 🎯 Key Concepts to Remember

1. **Variables store information** like labeled boxes
2. **Use `let` to create variables**
3. **Strings need quotes**, numbers don't
4. **Booleans are `true` or `false`**
5. **Variable names should be descriptive**
6. **Use camelCase for multi-word names**
7. **Variables can be updated after creation**

## 💡 Tips for Success

- **Practice typing** these examples yourself
- **Experiment** with different values
- **Use descriptive names** for your variables
- **Check your spelling** - JavaScript is case-sensitive
- **Don't rush** - understanding is more important than speed

## 🚀 What's Next?

Great job! You now know how to store information in your programs. Next, we'll learn about **basic operations** - how to do math, combine text, and compare values. This is where you'll start building logic into your programs!

---

🎉 **You're building a solid foundation!** Variables are used in every program you'll ever write. Take time to really understand this concept before moving on.
