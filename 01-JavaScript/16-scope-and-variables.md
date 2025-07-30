# 16. Scope and Variables - Where Variables Live 🏠

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- The concept of variable scope and why it matters
- The difference between global and local variables
- How function scope works and creates isolated environments
- Block scope with let and const
- Best practices for variable scope management

## 🤔 What is Scope?

Scope determines where in your code a variable can be accessed. Think of scope like rooms in a house:

- **Global scope**: Like the living room - everyone can access it
- **Function scope**: Like a private bedroom - only that function can access its variables
- **Block scope**: Like a walk-in closet - only code inside that block can access it

## 🌍 Global Scope

Variables declared outside any function are in global scope - they can be accessed from anywhere in your code.

### Global Variables Example

```javascript
// These are GLOBAL variables
let playerName = "Alice";
let playerScore = 0;
let gameLevel = 1;

console.log("=== GLOBAL SCOPE DEMO ===");

function displayPlayerInfo() {
  // Can access global variables from inside functions
  console.log(`Player: ${playerName}`);
  console.log(`Score: ${playerScore}`);
  console.log(`Level: ${gameLevel}`);
}

function increaseScore(points) {
  // Can modify global variables from inside functions
  playerScore += points;
  console.log(`${playerName} gained ${points} points! Total: ${playerScore}`);
}

function levelUp() {
  // Can read and write global variables
  gameLevel++;
  playerScore += 1000; // Bonus for leveling up
  console.log(`${playerName} reached level ${gameLevel}!`);
}

// Test global scope
displayPlayerInfo(); // Can access from anywhere
increaseScore(250); // Modifies global playerScore
increaseScore(150); // Modifies global playerScore
levelUp(); // Modifies global gameLevel and playerScore
displayPlayerInfo(); // Shows updated values
```

### Global Scope Considerations

```javascript
// Global variables can be accidentally modified
let userName = "John";

function resetUserData() {
  userName = ""; // Oops! This modifies the global variable
  console.log("User data reset");
}

function displayWelcome() {
  console.log(`Welcome, ${userName}!`);
}

console.log("Before reset:");
displayWelcome(); // Welcome, John!

resetUserData();

console.log("After reset:");
displayWelcome(); // Welcome, ! (userName is now empty!)
```

## 🏠 Function Scope (Local Scope)

Variables declared inside a function are local to that function - they can only be accessed from within that function.

### Local Variables Example

```javascript
console.log("=== FUNCTION SCOPE DEMO ===");

function calculateTotalPrice() {
  // These variables are LOCAL to this function
  let basePrice = 19.99;
  let taxRate = 0.08;
  let discount = 2.0;

  let tax = basePrice * taxRate;
  let totalPrice = basePrice + tax - discount;

  console.log(`Base price: $${basePrice}`);
  console.log(`Tax: $${tax.toFixed(2)}`);
  console.log(`Discount: $${discount}`);
  console.log(`Total: $${totalPrice.toFixed(2)}`);

  return totalPrice;
}

function processOrder() {
  // These variables are LOCAL to this function
  let orderNumber = Math.floor(Math.random() * 1000000);
  let orderDate = new Date().toLocaleDateString();
  let customerEmail = "customer@email.com";

  console.log(`Order #${orderNumber}`);
  console.log(`Date: ${orderDate}`);
  console.log(`Email: ${customerEmail}`);

  // Can call other functions and use their return values
  let total = calculateTotalPrice();

  console.log(`Order total: $${total.toFixed(2)}`);
  return orderNumber;
}

// Test function scope
let orderId = processOrder();

// These will cause errors if uncommented - variables are not accessible outside their functions:
// console.log(basePrice);     // ERROR: basePrice is not defined
// console.log(orderNumber);   // ERROR: orderNumber is not defined
// console.log(tax);           // ERROR: tax is not defined

console.log(`Order ID returned: ${orderId}`); // This works because orderId is returned
```

### Function Parameters Are Local

```javascript
function greetUser(userName, timeOfDay) {
  // userName and timeOfDay are LOCAL to this function
  let greeting = `Good ${timeOfDay}, ${userName}!`;
  let timestamp = new Date().toLocaleTimeString();

  console.log(`${greeting} (${timestamp})`);
  return greeting;
}

function processLogin(userEmail, userPassword) {
  // userEmail and userPassword are LOCAL to this function
  let isValidEmail = userEmail.includes("@");
  let isValidPassword = userPassword.length >= 8;

  console.log(`Validating login for: ${userEmail}`);
  console.log(`Email valid: ${isValidEmail}`);
  console.log(`Password valid: ${isValidPassword}`);

  return isValidEmail && isValidPassword;
}

// Test parameter scope
greetUser("Alice", "morning");
processLogin("alice@email.com", "secretpass123");

// These would cause errors - parameters are local to their functions:
// console.log(userName);      // ERROR: not defined
// console.log(userEmail);     // ERROR: not defined
```

## 🔒 Block Scope (let and const)

Variables declared with `let` and `const` inside blocks (between `{}`) are only accessible within that block.

### Block Scope with if Statements

```javascript
console.log("=== BLOCK SCOPE DEMO ===");

let age = 20;
let hasLicense = true;

if (age >= 18) {
  // These variables are BLOCK-SCOPED
  let canVote = true;
  let votingMessage = "You are eligible to vote!";
  const VOTING_AGE = 18;

  console.log(votingMessage);
  console.log(`Voting age requirement: ${VOTING_AGE}`);

  if (hasLicense) {
    // This is a nested block with its own scope
    let canDrive = true;
    let drivingMessage = "You can also drive!";

    console.log(drivingMessage);
    console.log(`Can vote: ${canVote}`); // Can access parent block variables
  }

  // console.log(drivingMessage); // ERROR: drivingMessage not accessible here
}

// These would cause errors - block-scoped variables not accessible outside:
// console.log(canVote);        // ERROR: not defined
// console.log(votingMessage);  // ERROR: not defined
// console.log(VOTING_AGE);     // ERROR: not defined
```

### Block Scope with Loops

```javascript
console.log("=== LOOP BLOCK SCOPE ===");

// The loop variable i is block-scoped to the for loop
for (let i = 1; i <= 3; i++) {
  let iterationMessage = `This is iteration ${i}`;
  console.log(iterationMessage);

  // Both i and iterationMessage are only accessible inside this loop
}

// console.log(i);              // ERROR: i not defined outside loop
// console.log(iterationMessage); // ERROR: iterationMessage not defined outside loop

// Demonstrate why block scope matters
let numbers = [10, 20, 30];

for (let index = 0; index < numbers.length; index++) {
  let currentNumber = numbers[index];
  let doubledNumber = currentNumber * 2;

  console.log(`Index ${index}: ${currentNumber} × 2 = ${doubledNumber}`);
}

// All loop variables are safely contained within the loop block
console.log("Loop completed - variables are contained");
```

## 🔍 Variable Shadowing

When a local variable has the same name as a global variable, the local variable "shadows" (hides) the global one.

### Shadowing Example

```javascript
console.log("=== VARIABLE SHADOWING ===");

let message = "Global message"; // Global variable

function demonstrateShadowing() {
  let message = "Local message"; // This shadows the global variable

  console.log(`Inside function: ${message}`); // Uses local variable

  function innerFunction() {
    let message = "Inner message"; // This shadows both global and outer local
    console.log(`Inside inner function: ${message}`);
  }

  innerFunction();
  console.log(`Back in outer function: ${message}`); // Still uses local variable
}

console.log(`Global scope: ${message}`); // Uses global variable
demonstrateShadowing();
console.log(`Back in global: ${message}`); // Global variable unchanged
```

### Practical Shadowing Example

```javascript
let userName = "GlobalUser"; // Global default

function processUserLogin(userName) {
  // Parameter shadows global
  console.log(`Processing login for: ${userName}`); // Uses parameter

  let loginAttempts = 0;

  function attemptLogin() {
    let userName = "TemporaryUser"; // Shadows both global and parameter
    loginAttempts++;

    console.log(`Attempt ${loginAttempts}: Trying to log in ${userName}`);

    if (loginAttempts >= 3) {
      console.log("Too many attempts!");
      return false;
    }

    return true;
  }

  attemptLogin();
  console.log(`Original login user: ${userName}`); // Back to parameter value
}

console.log(`Global user: ${userName}`);
processUserLogin("Alice");
console.log(`Global user still: ${userName}`);
```

## 🎮 Real-World Scope Examples

### Example 1: Game Inventory System

```javascript
// Global game state
let gameTitle = "Adventure Quest";
let playerGold = 1000;

function manageInventory() {
  // Local inventory data
  let inventory = [
    { item: "Sword", value: 150, quantity: 1 },
    { item: "Shield", value: 100, quantity: 1 },
    { item: "Potion", value: 25, quantity: 5 },
  ];

  function calculateInventoryValue() {
    // Local calculation variables
    let totalValue = 0;
    let itemCount = 0;

    for (let i = 0; i < inventory.length; i++) {
      let item = inventory[i]; // Block-scoped loop variable
      let itemTotal = item.value * item.quantity;
      totalValue += itemTotal;
      itemCount += item.quantity;

      console.log(
        `${item.item}: ${item.quantity} × $${item.value} = $${itemTotal}`
      );
    }

    console.log(`Total items: ${itemCount}`);
    console.log(`Total value: $${totalValue}`);
    return totalValue;
  }

  function sellItem(itemName, quantity = 1) {
    // Local variables for sale processing
    let itemFound = false;
    let saleValue = 0;

    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i].item === itemName) {
        itemFound = true;

        if (inventory[i].quantity >= quantity) {
          saleValue = inventory[i].value * quantity;
          inventory[i].quantity -= quantity;

          // Modify global gold
          playerGold += saleValue;

          console.log(`Sold ${quantity} ${itemName} for $${saleValue}`);
          console.log(`New gold total: $${playerGold}`);
        } else {
          console.log(`Not enough ${itemName} to sell`);
        }
        break;
      }
    }

    if (!itemFound) {
      console.log(`${itemName} not found in inventory`);
    }

    return saleValue;
  }

  // Return functions to access private inventory data
  return {
    calculateValue: calculateInventoryValue,
    sell: sellItem,
    getInventory: function () {
      return [...inventory]; // Return copy, not original
    },
  };
}

// Test inventory system
console.log(`Starting ${gameTitle} with $${playerGold}`);

let playerInventory = manageInventory();
playerInventory.calculateValue();
playerInventory.sell("Potion", 2);
playerInventory.calculateValue();

console.log(`Current gold: $${playerGold}`);
```

### Example 2: User Settings Manager

```javascript
// Global application state
let appName = "My Application";
let appVersion = "1.0.0";

function createUserSettings(userId) {
  // Private user data (local scope)
  let userSettings = {
    theme: "light",
    notifications: true,
    language: "en",
    autoSave: true,
  };

  let settingsHistory = [];

  function updateSetting(settingName, newValue) {
    // Local variables for update process
    let oldValue = userSettings[settingName];
    let timestamp = new Date().toISOString();

    if (oldValue !== undefined) {
      // Record the change
      settingsHistory.push({
        setting: settingName,
        oldValue: oldValue,
        newValue: newValue,
        timestamp: timestamp,
      });

      userSettings[settingName] = newValue;
      console.log(`${settingName} changed from ${oldValue} to ${newValue}`);
    } else {
      console.log(`Setting ${settingName} does not exist`);
    }
  }

  function getSettings() {
    // Return copy to prevent external modification
    return { ...userSettings };
  }

  function getHistory() {
    let historyCount = settingsHistory.length;
    console.log(`Settings history (${historyCount} changes):`);

    for (let i = 0; i < settingsHistory.length; i++) {
      let change = settingsHistory[i];
      console.log(
        `${change.timestamp}: ${change.setting} (${change.oldValue} → ${change.newValue})`
      );
    }

    return [...settingsHistory]; // Return copy
  }

  function resetToDefaults() {
    // Local default values
    let defaults = {
      theme: "light",
      notifications: true,
      language: "en",
      autoSave: true,
    };

    for (let setting in defaults) {
      updateSetting(setting, defaults[setting]);
    }

    console.log("Settings reset to defaults");
  }

  // Public interface
  return {
    update: updateSetting,
    get: getSettings,
    getHistory: getHistory,
    reset: resetToDefaults,
    userId: userId, // Expose user ID
  };
}

// Test settings manager
console.log(`${appName} v${appVersion} - User Settings Demo`);

let user1Settings = createUserSettings("user123");
let user2Settings = createUserSettings("user456");

// Each user has isolated settings
user1Settings.update("theme", "dark");
user1Settings.update("notifications", false);

user2Settings.update("language", "es");
user2Settings.update("autoSave", false);

console.log("\nUser 1 settings:", user1Settings.get());
console.log("User 2 settings:", user2Settings.get());

console.log("\nUser 1 history:");
user1Settings.getHistory();
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Understanding Scope

```javascript
// Global variables
let globalCounter = 0;
let appStatus = "running";

function incrementCounter() {
  // Local variable
  let localIncrement = 1;
  globalCounter += localIncrement;

  console.log(`Counter incremented by ${localIncrement}`);
  console.log(`Global counter is now: ${globalCounter}`);
}

function processData() {
  // Local variables
  let dataProcessed = 0;
  let batchSize = 10;

  for (let i = 0; i < batchSize; i++) {
    // Block-scoped variables
    let currentItem = `item_${i}`;
    dataProcessed++;

    console.log(`Processing ${currentItem}`);
  }

  console.log(`Processed ${dataProcessed} items in batch of ${batchSize}`);
  return dataProcessed;
}

// Test the functions
console.log(`App status: ${appStatus}`);
incrementCounter();
incrementCounter();

let result = processData();
console.log(`Function returned: ${result}`);
console.log(`Final global counter: ${globalCounter}`);
```

### Exercise 2: Creating Isolated Environments

```javascript
function createCalculator(name) {
  // Private variables (local scope)
  let currentValue = 0;
  let operationHistory = [];

  function add(number) {
    let oldValue = currentValue;
    currentValue += number;

    operationHistory.push(`${oldValue} + ${number} = ${currentValue}`);
    console.log(`${name}: ${oldValue} + ${number} = ${currentValue}`);

    return currentValue;
  }

  function subtract(number) {
    let oldValue = currentValue;
    currentValue -= number;

    operationHistory.push(`${oldValue} - ${number} = ${currentValue}`);
    console.log(`${name}: ${oldValue} - ${number} = ${currentValue}`);

    return currentValue;
  }

  function getHistory() {
    console.log(`${name} History:`);
    for (let i = 0; i < operationHistory.length; i++) {
      console.log(`${i + 1}. ${operationHistory[i]}`);
    }
  }

  function reset() {
    let oldValue = currentValue;
    currentValue = 0;
    operationHistory = [];

    console.log(`${name}: Reset from ${oldValue} to 0`);
  }

  // Return public interface
  return {
    add: add,
    subtract: subtract,
    getValue: () => currentValue,
    getHistory: getHistory,
    reset: reset,
  };
}

// Test isolated calculators
let calc1 = createCalculator("Calculator A");
let calc2 = createCalculator("Calculator B");

calc1.add(10);
calc1.subtract(3);

calc2.add(20);
calc2.add(5);

console.log(`\nCalc1 value: ${calc1.getValue()}`);
console.log(`Calc2 value: ${calc2.getValue()}`);

calc1.getHistory();
calc2.getHistory();
```

## ⚠️ Common Scope Mistakes

### Mistake 1: Unintentional Global Variables

```javascript
function badFunction() {
  // ❌ Forgot 'let' - creates global variable!
  accidentalGlobal = "Oops!";

  let properLocal = "This is local";
  console.log(properLocal);
}

badFunction();

// ❌ This accidentally works because accidentalGlobal is global
console.log(accidentalGlobal); // "Oops!"

// ✅ Better approach
function goodFunction() {
  let properLocal = "This stays local";
  let anotherLocal = "This too";

  console.log(properLocal);
  console.log(anotherLocal);
}
```

### Mistake 2: Variable Hoisting Confusion

```javascript
// ❌ Confusing behavior with var
function confusingFunction() {
  console.log(myVar); // undefined (not error)

  if (true) {
    var myVar = "Hello"; // var is function-scoped, not block-scoped
  }

  console.log(myVar); // "Hello"
}

// ✅ Clear behavior with let
function clearFunction() {
  // console.log(myLet); // Would cause error - cannot access before declaration

  if (true) {
    let myLet = "Hello"; // let is block-scoped
    console.log(myLet); // "Hello"
  }

  // console.log(myLet); // Would cause error - myLet not accessible here
}
```

## 📚 Scope Best Practices

### 1. Keep Variables as Local as Possible

```javascript
// ✅ Good: Minimal global variables
let appConfig = { theme: "light", version: "1.0" };

function processUser(userData) {
  // ✅ Local variables for function-specific work
  let processedData = {};
  let validationErrors = [];

  // Process locally, return result
  return { processedData, validationErrors };
}
```

### 2. Use Block Scope Effectively

```javascript
function processItems(items) {
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < items.length; i++) {
    // ✅ Block-scoped variables for each iteration
    let currentItem = items[i];
    let processingResult = processItem(currentItem);

    if (processingResult.success) {
      successCount++;
    } else {
      errorCount++;
    }
  }

  return { successCount, errorCount };
}
```

### 3. Avoid Variable Shadowing When Possible

```javascript
// ❌ Confusing shadowing
let userName = "GlobalUser";

function processUser(userName) {
  // Shadows global
  let userName = "LocalUser"; // Shadows parameter!
  // Very confusing!
}

// ✅ Clear, distinct names
let defaultUserName = "GlobalUser";

function processUser(inputUserName) {
  let processedUserName = inputUserName.trim().toLowerCase();
  // Much clearer!
}
```

## 📚 Key Takeaways

1. **Global scope**: Variables accessible everywhere (use sparingly)
2. **Function scope**: Variables only accessible within the function
3. **Block scope**: Variables only accessible within the block (with let/const)
4. **Scope isolation**: Functions create their own private environments
5. **Variable shadowing**: Inner scope variables hide outer scope variables with same name
6. **Keep scope minimal**: Declare variables in the smallest scope needed

## ➡️ What's Next?

Fantastic! You now understand how variable scope works and how to create isolated environments in your functions. 🎉

You've completed Phase 4 - Organization! Next, you'll move into **Phase 5: Data Structures** where you'll learn about **Arrays** - powerful tools for storing and working with lists of data.

Your next lesson: **17. Arrays - Lists of Information**

## 🔗 Quick Reference

```javascript
// Global scope
let globalVar = "accessible everywhere";

// Function scope
function myFunction() {
  let localVar = "only in this function";

  // Block scope
  if (true) {
    let blockVar = "only in this block";
  }
}

// Variable shadowing
let name = "global";
function test(name) {
  // parameter shadows global
  let name = "local"; // variable shadows parameter
}

// Best practice: minimal scope
function calculate() {
  let result = 0; // local scope
  return result;
}
```

You're mastering code organization and data privacy! 🚀
