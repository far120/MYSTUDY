# Basic Operations - Math and Text Magic ✨

Now that you can store information in variables, let's learn how to **manipulate and work with that information**. This is where your programs start becoming interactive and useful!

## 🧮 Math Operations (Numbers)

JavaScript can do math just like a calculator, but much more powerful!

### Basic Math Operators:

```javascript
let a = 10;
let b = 3;

let addition = a + b; // 13
let subtraction = a - b; // 7
let multiplication = a * b; // 30
let division = a / b; // 3.333...
let remainder = a % b; // 1 (remainder after division)

console.log("10 + 3 =", addition);
console.log("10 - 3 =", subtraction);
console.log("10 * 3 =", multiplication);
console.log("10 / 3 =", division);
console.log("10 % 3 =", remainder);
```

### 🤔 What is the % (Modulo) operator?

The `%` operator gives you the **remainder** after division:

```javascript
console.log(10 % 3); // 1 (10 ÷ 3 = 3 remainder 1)
console.log(15 % 4); // 3 (15 ÷ 4 = 3 remainder 3)
console.log(20 % 5); // 0 (20 ÷ 5 = 4 remainder 0)
```

**Practical uses:**

- Check if a number is even: `number % 2 === 0`
- Get last digit: `number % 10`
- Create patterns that repeat

## 📝 Text Operations (Strings)

### String Concatenation (Joining Text):

```javascript
let firstName = "John";
let lastName = "Smith";

// Method 1: Using + operator
let fullName = firstName + " " + lastName;
console.log(fullName); // "John Smith"

// Method 2: Template literals (modern way)
let greeting = `Hello, ${firstName} ${lastName}!`;
console.log(greeting); // "Hello, John Smith!"
```

### 🎯 Template Literals (Backticks)

Template literals use backticks (\`) and allow you to embed variables directly:

```javascript
let name = "Sarah";
let age = 25;
let city = "New York";

// Old way (harder to read):
let intro1 =
  "Hi! I'm " + name + ", I'm " + age + " years old and I live in " + city;

// New way (much cleaner):
let intro2 = `Hi! I'm ${name}, I'm ${age} years old and I live in ${city}`;

console.log(intro2);
```

### String Methods (Built-in Functions):

```javascript
let message = "Hello World";

console.log(message.length); // 11 (number of characters)
console.log(message.toUpperCase()); // "HELLO WORLD"
console.log(message.toLowerCase()); // "hello world"
console.log(message.charAt(0)); // "H" (first character)
console.log(message.charAt(6)); // "W" (7th character)
```

## 🔄 Assignment Operators (Shortcuts)

Instead of writing `x = x + 5`, you can use shortcuts:

```javascript
let score = 100;

// Long way:
score = score + 10; // score is now 110

// Short way:
score += 10; // Same as score = score + 10
score -= 5; // Same as score = score - 5
score *= 2; // Same as score = score * 2
score /= 3; // Same as score = score / 3

console.log(score); // Shows the final result
```

### Increment and Decrement:

```javascript
let counter = 5;

counter++; // Same as counter = counter + 1
console.log(counter); // 6

counter--; // Same as counter = counter - 1
console.log(counter); // 5
```

## 🧪 Practical Examples

### Example 1: Simple Calculator

```javascript
let num1 = 15;
let num2 = 4;

console.log(`Calculator Results:`);
console.log(`${num1} + ${num2} = ${num1 + num2}`);
console.log(`${num1} - ${num2} = ${num1 - num2}`);
console.log(`${num1} * ${num2} = ${num1 * num2}`);
console.log(`${num1} / ${num2} = ${num1 / num2}`);
```

### Example 2: Price Calculator

```javascript
let productPrice = 19.99;
let quantity = 3;
let taxRate = 0.08; // 8% tax

let subtotal = productPrice * quantity;
let tax = subtotal * taxRate;
let total = subtotal + tax;

console.log(`Product Price: $${productPrice}`);
console.log(`Quantity: ${quantity}`);
console.log(`Subtotal: $${subtotal.toFixed(2)}`);
console.log(`Tax: $${tax.toFixed(2)}`);
console.log(`Total: $${total.toFixed(2)}`);
```

### Example 3: Personal Information

```javascript
let firstName = "Alex";
let lastName = "Johnson";
let birthYear = 1995;
let currentYear = 2024;

let age = currentYear - birthYear;
let fullName = firstName + " " + lastName;
let initials = firstName.charAt(0) + lastName.charAt(0);

console.log(`Full Name: ${fullName}`);
console.log(`Age: ${age} years old`);
console.log(`Initials: ${initials}`);
console.log(`Name Length: ${fullName.length} characters`);
```

## 🎮 Interactive Exercises

### Exercise 1: Area Calculator

Calculate the area of different shapes:

```javascript
// Rectangle
let length = 10;
let width = 5;
let rectangleArea = length * width;
console.log(`Rectangle area: ${rectangleArea} square units`);

// Circle (π × radius²)
let radius = 7;
let pi = 3.14159;
let circleArea = pi * radius * radius;
console.log(`Circle area: ${circleArea.toFixed(2)} square units`);

// Triangle
let base = 8;
let height = 6;
let triangleArea = (base * height) / 2;
console.log(`Triangle area: ${triangleArea} square units`);
```

### Exercise 2: Text Manipulator

Work with strings in different ways:

```javascript
let userInput = "JavaScript is Amazing";

console.log(`Original: ${userInput}`);
console.log(`Uppercase: ${userInput.toUpperCase()}`);
console.log(`Lowercase: ${userInput.toLowerCase()}`);
console.log(`Length: ${userInput.length} characters`);
console.log(`First letter: ${userInput.charAt(0)}`);
console.log(`Last letter: ${userInput.charAt(userInput.length - 1)}`);
```

### Exercise 3: Time Converter

Convert time to different units:

```javascript
let totalMinutes = 125;

let hours = Math.floor(totalMinutes / 60); // Math.floor removes decimals
let minutes = totalMinutes % 60;

console.log(`${totalMinutes} minutes equals:`);
console.log(`${hours} hours and ${minutes} minutes`);

// Convert to seconds
let totalSeconds = totalMinutes * 60;
console.log(`${totalSeconds} seconds`);
```

## 🔍 Understanding Operator Precedence

Just like in math, JavaScript follows order of operations:

```javascript
let result1 = 5 + 3 * 2; // 11 (not 16) - multiplication first
let result2 = (5 + 3) * 2; // 16 - parentheses change order

console.log(result1); // 11
console.log(result2); // 16

// More examples:
let calc1 = 10 + 5 * 2; // 20 (5*2=10, then 10+10=20)
let calc2 = (10 + 5) * 2; // 30 (10+5=15, then 15*2=30)
let calc3 = 10 / 2 + 3; // 8 (10/2=5, then 5+3=8)
```

**Order of operations (PEMDAS):**

1. **P**arentheses `()`
2. **E**xponents `**` (we'll learn this later)
3. **M**ultiplication `*` and **D**ivision `/`
4. **A**ddition `+` and **S**ubtraction `-`

## ⚠️ Common Mistakes to Avoid

### 1. String vs Number Addition

```javascript
let age = "25"; // This is a string!
let years = 5; // This is a number

console.log(age + years); // "255" (string concatenation)
console.log(Number(age) + years); // 30 (math)
```

### 2. Forgetting Parentheses

```javascript
let price = 10;
let tax = 0.08;

// Wrong:
let total1 = price + price * tax; // 10.8 (math order: 10*0.08=0.8, then 10+0.8=10.8)

// Right:
let total2 = price * (1 + tax); // 10.8 (same result, clearer intention)
```

### 3. Division by Zero

```javascript
console.log(10 / 0); // Infinity (not an error, but usually not what you want)
console.log(0 / 0); // NaN (Not a Number)
```

## 🎯 Key Concepts to Remember

1. **Math operators**: `+`, `-`, `*`, `/`, `%`
2. **String concatenation**: Join text with `+` or template literals
3. **Template literals**: Use backticks and `${variable}` syntax
4. **Assignment shortcuts**: `+=`, `-=`, `*=`, `/=`
5. **Increment/decrement**: `++`, `--`
6. **Order of operations**: Parentheses change calculation order
7. **Strings and numbers behave differently** with `+` operator

## 💡 Tips for Success

- **Practice with real examples** (calculate your age, format names, etc.)
- **Use parentheses** when you're unsure about order of operations
- **Experiment with different values** to see how operations work
- **Use template literals** for cleaner string formatting
- **Remember**: String + Number = String concatenation

## 🚀 What's Next?

Excellent! You now know how to manipulate data in your programs. Next, we'll learn about **making decisions with if/else statements** - this is where your programs become truly smart and interactive!

---

🎉 **You're doing great!** These operations are the building blocks of every calculation and text manipulation you'll ever do in programming. Practice them until they feel natural!
