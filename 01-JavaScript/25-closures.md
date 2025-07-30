# 25. Closures - Functions that Remember 🧠

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- What closures are and how they work in JavaScript
- Lexical scoping and how it enables closures
- Practical applications of closures in real-world code
- Creating private variables and data encapsulation
- Function factories and higher-order functions with closures
- Common closure patterns and best practices

## 🤔 What is a Closure?

A **closure** is a function that has access to variables in its outer (enclosing) scope even after the outer function has finished executing. Think of it as a function that "remembers" its environment.

**Simple analogy**: Imagine a function as a person with a backpack. Even after leaving home (outer function finishes), they still carry their backpack (closure) with all the items (variables) they packed from home.

```javascript
console.log("=== BASIC CLOSURE INTRODUCTION ===");

function outerFunction(x) {
  // This variable is in the outer scope
  let outerVariable = x;

  function innerFunction(y) {
    // Inner function has access to outerVariable
    console.log(`Outer variable: ${outerVariable}`);
    console.log(`Inner parameter: ${y}`);
    return outerVariable + y;
  }

  return innerFunction; // Return the inner function
}

// Create a closure
let myClosure = outerFunction(10);

// Even though outerFunction has finished executing,
// the returned function still remembers outerVariable
console.log("Closure result:", myClosure(5)); // Uses outerVariable (10) + y (5) = 15

// Another closure with different outer variable
let anotherClosure = outerFunction(20);
console.log("Another closure result:", anotherClosure(5)); // 20 + 5 = 25

// Each closure maintains its own copy of the outer variables
console.log("First closure again:", myClosure(3)); // 10 + 3 = 13
console.log("Second closure again:", anotherClosure(3)); // 20 + 3 = 23
```

## 🔍 Understanding Lexical Scoping

Lexical scoping means that a function's access to variables is determined by where the function is defined, not where it's called.

```javascript
console.log("=== LEXICAL SCOPING ===");

let globalVar = "global";

function outerScope() {
  let outerVar = "outer";

  function middleScope() {
    let middleVar = "middle";

    function innerScope() {
      let innerVar = "inner";

      // Inner function can access all outer variables
      console.log("From inner scope:");
      console.log("  Global:", globalVar);
      console.log("  Outer:", outerVar);
      console.log("  Middle:", middleVar);
      console.log("  Inner:", innerVar);

      return {
        global: globalVar,
        outer: outerVar,
        middle: middleVar,
        inner: innerVar,
      };
    }

    return innerScope;
  }

  return middleScope;
}

// Create nested closures
let getMiddleScope = outerScope();
let getInnerScope = getMiddleScope();
let scopeValues = getInnerScope();

console.log("Accessed through closures:", scopeValues);

// Demonstrating that each call creates a new closure
function createCounter() {
  let count = 0;

  return function () {
    count++; // Modifies the count variable from outer scope
    return count;
  };
}

let counter1 = createCounter();
let counter2 = createCounter();

console.log("Counter 1:", counter1()); // 1
console.log("Counter 1:", counter1()); // 2
console.log("Counter 2:", counter2()); // 1 (independent counter)
console.log("Counter 1:", counter1()); // 3
console.log("Counter 2:", counter2()); // 2
```

## 🏭 Function Factories

Closures are perfect for creating function factories - functions that create other functions with specific behaviors.

```javascript
console.log("=== FUNCTION FACTORIES ===");

// Mathematical operation factories
function createMathOperation(operation) {
  return function (a, b) {
    switch (operation) {
      case "add":
        return a + b;
      case "subtract":
        return a - b;
      case "multiply":
        return a * b;
      case "divide":
        return b !== 0 ? a / b : "Cannot divide by zero";
      case "power":
        return Math.pow(a, b);
      default:
        return "Unknown operation";
    }
  };
}

let add = createMathOperation("add");
let multiply = createMathOperation("multiply");
let power = createMathOperation("power");

console.log("Addition:", add(5, 3)); // 8
console.log("Multiplication:", multiply(4, 7)); // 28
console.log("Power:", power(2, 3)); // 8

// Multiplier factory
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

let double = createMultiplier(2);
let triple = createMultiplier(3);
let byTen = createMultiplier(10);

console.log("Double 6:", double(6)); // 12
console.log("Triple 4:", triple(4)); // 12
console.log("Ten times 5:", byTen(5)); // 50

// Greeting factory
function createGreeting(greeting, punctuation = "!") {
  return function (name) {
    return `${greeting}, ${name}${punctuation}`;
  };
}

let sayHello = createGreeting("Hello");
let sayGoodMorning = createGreeting("Good morning", ".");
let sayHowdy = createGreeting("Howdy", "!");

console.log(sayHello("Alice")); // Hello, Alice!
console.log(sayGoodMorning("Bob")); // Good morning, Bob.
console.log(sayHowdy("Charlie")); // Howdy, Charlie!

// Validation factory
function createValidator(validationType) {
  const validationRules = {
    email: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    phone: (phone) => {
      const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
      return phoneRegex.test(phone);
    },
    password: (password) => {
      return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
      );
    },
    required: (value) => {
      return value !== null && value !== undefined && value !== "";
    },
  };

  return function (value) {
    const validator = validationRules[validationType];
    if (!validator) {
      return { valid: false, error: "Unknown validation type" };
    }

    const isValid = validator(value);
    return {
      valid: isValid,
      error: isValid ? null : `Invalid ${validationType}`,
    };
  };
}

let validateEmail = createValidator("email");
let validatePassword = createValidator("password");
let validateRequired = createValidator("required");

console.log("Email validation:", validateEmail("user@example.com"));
console.log("Email validation:", validateEmail("invalid-email"));
console.log("Password validation:", validatePassword("SecurePass123"));
console.log("Password validation:", validatePassword("weak"));
console.log("Required validation:", validateRequired(""));
console.log("Required validation:", validateRequired("value"));
```

## 🔒 Private Variables and Data Encapsulation

Closures provide a way to create private variables in JavaScript, which doesn't have built-in private variable syntax (until recently).

```javascript
console.log("=== PRIVATE VARIABLES WITH CLOSURES ===");

// Bank account with private balance
function createBankAccount(initialBalance = 0) {
  let balance = initialBalance; // Private variable
  let transactionHistory = []; // Private variable

  return {
    // Public methods that access private variables
    deposit: function (amount) {
      if (amount > 0) {
        balance += amount;
        transactionHistory.push({
          type: "deposit",
          amount: amount,
          timestamp: new Date(),
          balanceAfter: balance,
        });
        return balance;
      } else {
        throw new Error("Deposit amount must be positive");
      }
    },

    withdraw: function (amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        transactionHistory.push({
          type: "withdrawal",
          amount: amount,
          timestamp: new Date(),
          balanceAfter: balance,
        });
        return balance;
      } else {
        throw new Error("Invalid withdrawal amount");
      }
    },

    getBalance: function () {
      return balance; // Controlled access to private variable
    },

    getTransactionHistory: function () {
      // Return a copy to prevent external modification
      return [...transactionHistory];
    },

    getStatement: function () {
      return {
        currentBalance: balance,
        transactionCount: transactionHistory.length,
        lastTransaction:
          transactionHistory[transactionHistory.length - 1] || null,
      };
    },
  };
}

let myAccount = createBankAccount(100);

console.log("Initial balance:", myAccount.getBalance()); // 100

myAccount.deposit(50);
console.log("After deposit:", myAccount.getBalance()); // 150

myAccount.withdraw(30);
console.log("After withdrawal:", myAccount.getBalance()); // 120

console.log("Account statement:", myAccount.getStatement());
console.log("Transaction history:", myAccount.getTransactionHistory());

// Private variables are truly private - cannot access them directly
console.log("Trying to access private balance:", myAccount.balance); // undefined

// User session manager with private data
function createUserSession(username) {
  let sessionId = Math.random().toString(36).substr(2, 9);
  let loginTime = new Date();
  let isActive = true;
  let permissions = [];
  let sessionData = {};

  return {
    getSessionInfo: function () {
      return {
        username: username,
        sessionId: sessionId,
        loginTime: loginTime,
        isActive: isActive,
        duration: Date.now() - loginTime.getTime(),
      };
    },

    setPermissions: function (newPermissions) {
      permissions = [...newPermissions];
    },

    hasPermission: function (permission) {
      return permissions.includes(permission);
    },

    getPermissions: function () {
      return [...permissions]; // Return copy
    },

    setData: function (key, value) {
      sessionData[key] = value;
    },

    getData: function (key) {
      return sessionData[key];
    },

    clearData: function () {
      sessionData = {};
    },

    logout: function () {
      isActive = false;
      sessionData = {};
      permissions = [];
    },

    isSessionActive: function () {
      return isActive;
    },
  };
}

let userSession = createUserSession("alice_smith");

console.log("Session info:", userSession.getSessionInfo());

userSession.setPermissions(["read", "write", "delete"]);
console.log("Has write permission:", userSession.hasPermission("write")); // true
console.log("Has admin permission:", userSession.hasPermission("admin")); // false

userSession.setData("lastPage", "/dashboard");
userSession.setData("preferences", { theme: "dark", lang: "en" });

console.log("Session data - last page:", userSession.getData("lastPage"));
console.log("Session data - preferences:", userSession.getData("preferences"));

// Configuration manager with private settings
function createConfigManager(defaultConfig = {}) {
  let config = { ...defaultConfig };
  let history = [{ ...defaultConfig }];
  let locked = false;

  return {
    get: function (key) {
      return key ? config[key] : { ...config };
    },

    set: function (key, value) {
      if (locked) {
        throw new Error("Configuration is locked");
      }

      if (typeof key === "object") {
        // Batch update
        const oldConfig = { ...config };
        config = { ...config, ...key };
        history.push({ ...config });
      } else {
        config[key] = value;
        history.push({ ...config });
      }
    },

    reset: function () {
      if (locked) {
        throw new Error("Configuration is locked");
      }
      config = { ...defaultConfig };
      history.push({ ...config });
    },

    lock: function () {
      locked = true;
    },

    unlock: function () {
      locked = false;
    },

    isLocked: function () {
      return locked;
    },

    getHistory: function () {
      return [...history];
    },

    rollback: function () {
      if (locked) {
        throw new Error("Configuration is locked");
      }
      if (history.length > 1) {
        history.pop(); // Remove current
        config = { ...history[history.length - 1] };
      }
    },
  };
}

let configManager = createConfigManager({
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
});

console.log("Initial config:", configManager.get());

configManager.set("timeout", 10000);
configManager.set({ retries: 5, debug: true });

console.log("Updated config:", configManager.get());
console.log("Config history length:", configManager.getHistory().length);

configManager.lock();
console.log("Config locked:", configManager.isLocked());

try {
  configManager.set("apiUrl", "https://new-api.com");
} catch (error) {
  console.log("Error:", error.message);
}

configManager.unlock();
configManager.rollback();
console.log("After rollback:", configManager.get());
```

## 🔄 Closures in Loops

A common gotcha with closures occurs in loops. Understanding this pattern helps avoid bugs.

```javascript
console.log("=== CLOSURES IN LOOPS ===");

// Problem: All functions reference the same variable
console.log("PROBLEM - Incorrect closure in loop:");
let functions = [];

for (var i = 0; i < 3; i++) {
  functions[i] = function () {
    return i; // All functions reference the same 'i'
  };
}

// All functions return 3 (final value of i)
functions.forEach((fn, index) => {
  console.log(`Function ${index} returns:`, fn()); // All return 3
});

// Solution 1: Use let instead of var (block scoping)
console.log("SOLUTION 1 - Using let:");
let correctFunctions = [];

for (let i = 0; i < 3; i++) {
  correctFunctions[i] = function () {
    return i; // Each iteration has its own 'i'
  };
}

correctFunctions.forEach((fn, index) => {
  console.log(`Function ${index} returns:`, fn()); // Returns 0, 1, 2
});

// Solution 2: Use IIFE (Immediately Invoked Function Expression)
console.log("SOLUTION 2 - Using IIFE:");
let iifeFunctions = [];

for (var i = 0; i < 3; i++) {
  iifeFunctions[i] = (function (index) {
    return function () {
      return index; // Captures the current value of i
    };
  })(i);
}

iifeFunctions.forEach((fn, index) => {
  console.log(`Function ${index} returns:`, fn()); // Returns 0, 1, 2
});

// Solution 3: Use bind method
console.log("SOLUTION 3 - Using bind:");
let bindFunctions = [];

function returnValue(value) {
  return value;
}

for (var i = 0; i < 3; i++) {
  bindFunctions[i] = returnValue.bind(null, i);
}

bindFunctions.forEach((fn, index) => {
  console.log(`Function ${index} returns:`, fn()); // Returns 0, 1, 2
});

// Solution 4: Create a closure factory
console.log("SOLUTION 4 - Closure factory:");
function createFunction(value) {
  return function () {
    return value;
  };
}

let factoryFunctions = [];
for (var i = 0; i < 3; i++) {
  factoryFunctions[i] = createFunction(i);
}

factoryFunctions.forEach((fn, index) => {
  console.log(`Function ${index} returns:`, fn()); // Returns 0, 1, 2
});

// Practical example: Event handlers with closures
console.log("PRACTICAL EXAMPLE - Event handler simulation:");

function simulateEventHandlers() {
  let handlers = [];

  // Simulate creating click handlers for buttons
  for (let i = 0; i < 5; i++) {
    handlers[i] = (function (buttonIndex) {
      return function (event) {
        console.log(`Button ${buttonIndex} clicked!`);
        return {
          buttonId: buttonIndex,
          message: `Handler for button ${buttonIndex}`,
          timestamp: new Date(),
        };
      };
    })(i);
  }

  return handlers;
}

let eventHandlers = simulateEventHandlers();

// Simulate clicking buttons
eventHandlers.forEach((handler, index) => {
  let result = handler({ type: "click" });
  console.log(`Button ${index} result:`, result);
});
```

## 🎯 Real-World Examples

### Example 1: Module Pattern with Closures

```javascript
console.log("=== MODULE PATTERN WITH CLOSURES ===");

// Shopping cart module
const ShoppingCart = (function () {
  // Private variables
  let items = [];
  let total = 0;
  let discountPercentage = 0;
  let taxRate = 0.08; // 8% tax

  // Private helper functions
  function calculateItemTotal(item) {
    return item.price * item.quantity;
  }

  function updateTotal() {
    total = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  }

  function findItemIndex(productId) {
    return items.findIndex((item) => item.productId === productId);
  }

  function validateItem(item) {
    return (
      item &&
      typeof item.productId === "string" &&
      typeof item.name === "string" &&
      typeof item.price === "number" &&
      item.price > 0 &&
      typeof item.quantity === "number" &&
      item.quantity > 0
    );
  }

  // Public API
  return {
    addItem: function (productId, name, price, quantity = 1) {
      const newItem = { productId, name, price, quantity };

      if (!validateItem(newItem)) {
        throw new Error("Invalid item data");
      }

      const existingIndex = findItemIndex(productId);

      if (existingIndex !== -1) {
        // Update existing item
        items[existingIndex].quantity += quantity;
      } else {
        // Add new item
        items.push(newItem);
      }

      updateTotal();
      return this.getCartSummary();
    },

    removeItem: function (productId) {
      const index = findItemIndex(productId);
      if (index !== -1) {
        items.splice(index, 1);
        updateTotal();
      }
      return this.getCartSummary();
    },

    updateQuantity: function (productId, newQuantity) {
      if (newQuantity <= 0) {
        return this.removeItem(productId);
      }

      const index = findItemIndex(productId);
      if (index !== -1) {
        items[index].quantity = newQuantity;
        updateTotal();
      }
      return this.getCartSummary();
    },

    applyDiscount: function (percentage) {
      if (percentage >= 0 && percentage <= 100) {
        discountPercentage = percentage;
      }
      return this.getCartSummary();
    },

    clearCart: function () {
      items = [];
      total = 0;
      discountPercentage = 0;
      return this.getCartSummary();
    },

    getItems: function () {
      return items.map((item) => ({ ...item })); // Return copies
    },

    getCartSummary: function () {
      const subtotal = total;
      const discountAmount = (subtotal * discountPercentage) / 100;
      const afterDiscount = subtotal - discountAmount;
      const taxAmount = afterDiscount * taxRate;
      const finalTotal = afterDiscount + taxAmount;

      return {
        itemCount: items.length,
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: subtotal.toFixed(2),
        discountPercentage: discountPercentage,
        discountAmount: discountAmount.toFixed(2),
        taxRate: (taxRate * 100).toFixed(1) + "%",
        taxAmount: taxAmount.toFixed(2),
        finalTotal: finalTotal.toFixed(2),
      };
    },

    generateInvoice: function () {
      const summary = this.getCartSummary();
      return {
        ...summary,
        items: this.getItems(),
        invoiceNumber: "INV-" + Date.now(),
        timestamp: new Date().toISOString(),
      };
    },
  };
})();

// Test the shopping cart
console.log("Adding items to cart:");
ShoppingCart.addItem("laptop-001", "Gaming Laptop", 1299.99, 1);
ShoppingCart.addItem("mouse-001", "Wireless Mouse", 29.99, 2);
ShoppingCart.addItem("keyboard-001", "Mechanical Keyboard", 89.99, 1);

console.log("Cart summary:", ShoppingCart.getCartSummary());

console.log("Applying 10% discount:");
ShoppingCart.applyDiscount(10);
console.log("Cart with discount:", ShoppingCart.getCartSummary());

console.log("Updating mouse quantity to 3:");
ShoppingCart.updateQuantity("mouse-001", 3);

console.log("Final invoice:");
console.log(ShoppingCart.generateInvoice());

// Private variables are not accessible
console.log("Trying to access private items:", ShoppingCart.items); // undefined
```

### Example 2: Cache System with Closures

```javascript
console.log("=== CACHE SYSTEM WITH CLOSURES ===");

function createCacheSystem(maxSize = 100, ttl = 300000) {
  // 5 minutes TTL
  let cache = new Map();
  let accessCount = new Map();
  let lastAccess = new Map();

  // Private helper functions
  function isExpired(key) {
    const accessTime = lastAccess.get(key);
    return accessTime && Date.now() - accessTime > ttl;
  }

  function cleanup() {
    const now = Date.now();
    for (let [key, accessTime] of lastAccess) {
      if (now - accessTime > ttl) {
        cache.delete(key);
        accessCount.delete(key);
        lastAccess.delete(key);
      }
    }
  }

  function evictLeastUsed() {
    if (cache.size >= maxSize) {
      let leastUsedKey = null;
      let minCount = Infinity;

      for (let [key, count] of accessCount) {
        if (count < minCount) {
          minCount = count;
          leastUsedKey = key;
        }
      }

      if (leastUsedKey) {
        cache.delete(leastUsedKey);
        accessCount.delete(leastUsedKey);
        lastAccess.delete(leastUsedKey);
      }
    }
  }

  function updateAccess(key) {
    accessCount.set(key, (accessCount.get(key) || 0) + 1);
    lastAccess.set(key, Date.now());
  }

  return {
    set: function (key, value) {
      cleanup();
      evictLeastUsed();

      cache.set(key, value);
      updateAccess(key);

      return this;
    },

    get: function (key) {
      cleanup();

      if (cache.has(key) && !isExpired(key)) {
        updateAccess(key);
        return cache.get(key);
      }

      return undefined;
    },

    has: function (key) {
      cleanup();
      return cache.has(key) && !isExpired(key);
    },

    delete: function (key) {
      const result = cache.delete(key);
      accessCount.delete(key);
      lastAccess.delete(key);
      return result;
    },

    clear: function () {
      cache.clear();
      accessCount.clear();
      lastAccess.clear();
      return this;
    },

    size: function () {
      cleanup();
      return cache.size;
    },

    getStats: function () {
      cleanup();

      const stats = {
        size: cache.size,
        maxSize: maxSize,
        ttl: ttl,
        usage: ((cache.size / maxSize) * 100).toFixed(1) + "%",
        entries: [],
      };

      for (let [key, value] of cache) {
        stats.entries.push({
          key: key,
          accessCount: accessCount.get(key) || 0,
          lastAccessed: new Date(lastAccess.get(key) || 0).toISOString(),
          valueType: typeof value,
          size: JSON.stringify(value).length,
        });
      }

      // Sort by access count (most used first)
      stats.entries.sort((a, b) => b.accessCount - a.accessCount);

      return stats;
    },

    createMemoizedFunction: function (fn) {
      return (...args) => {
        const key = JSON.stringify(args);

        if (this.has(key)) {
          return this.get(key);
        }

        const result = fn(...args);
        this.set(key, result);
        return result;
      };
    },
  };
}

// Test cache system
let cache = createCacheSystem(5, 10000); // Max 5 items, 10 second TTL

console.log("Setting cache values:");
cache.set("user:1", { name: "Alice", age: 30 });
cache.set("user:2", { name: "Bob", age: 25 });
cache.set("config", { theme: "dark", lang: "en" });

console.log("Getting values:");
console.log("User 1:", cache.get("user:1"));
console.log("User 2:", cache.get("user:2"));
console.log("Config:", cache.get("config"));

console.log("Cache stats:", cache.getStats());

// Test memoization
console.log("Creating memoized function:");
let fibonacci = cache.createMemoizedFunction(function (n) {
  console.log(`Computing fibonacci(${n})`);
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log("Fibonacci 10 (first call):", fibonacci(10));
console.log("Fibonacci 10 (second call - cached):", fibonacci(10));
console.log("Fibonacci 12 (uses cached values):", fibonacci(12));

console.log("Final cache stats:", cache.getStats());

// Test cache eviction
console.log("Testing cache eviction:");
cache.set("item1", "value1");
cache.set("item2", "value2");
cache.set("item3", "value3");
cache.set("item4", "value4");
cache.set("item5", "value5");
cache.set("item6", "value6"); // This should evict least used item

console.log("Cache after eviction:", cache.getStats());
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Counter with Limits

```javascript
console.log("=== CLOSURE EXERCISE 1: COUNTER WITH LIMITS ===");

function createLimitedCounter(min = 0, max = 10, step = 1) {
  let count = min;

  return {
    increment: function () {
      if (count + step <= max) {
        count += step;
      }
      return count;
    },

    decrement: function () {
      if (count - step >= min) {
        count -= step;
      }
      return count;
    },

    getValue: function () {
      return count;
    },

    reset: function () {
      count = min;
      return count;
    },

    canIncrement: function () {
      return count + step <= max;
    },

    canDecrement: function () {
      return count - step >= min;
    },
  };
}

let counter = createLimitedCounter(0, 5, 1);

console.log("Initial value:", counter.getValue()); // 0
console.log("Increment:", counter.increment()); // 1
console.log("Increment:", counter.increment()); // 2
console.log("Can increment?", counter.canIncrement()); // true

// Try to go beyond max
for (let i = 0; i < 10; i++) {
  console.log("Increment attempt:", counter.increment());
}

console.log("Can increment?", counter.canIncrement()); // false
console.log("Reset:", counter.reset()); // 0
```

### Exercise 2: Secret Vault

```javascript
console.log("=== CLOSURE EXERCISE 2: SECRET VAULT ===");

function createSecretVault(masterPassword) {
  let secrets = new Map();
  let isUnlocked = false;
  let failedAttempts = 0;
  let maxAttempts = 3;
  let lockoutTime = 5000; // 5 seconds
  let lockoutEnd = null;

  function isLockedOut() {
    return lockoutEnd && Date.now() < lockoutEnd;
  }

  function checkAccess() {
    if (isLockedOut()) {
      throw new Error(
        `Vault locked until ${new Date(lockoutEnd).toLocaleTimeString()}`
      );
    }
    if (!isUnlocked) {
      throw new Error("Vault is locked. Please unlock first.");
    }
  }

  return {
    unlock: function (password) {
      if (isLockedOut()) {
        throw new Error(
          `Vault locked until ${new Date(lockoutEnd).toLocaleTimeString()}`
        );
      }

      if (password === masterPassword) {
        isUnlocked = true;
        failedAttempts = 0;
        console.log("Vault unlocked successfully!");
        return true;
      } else {
        failedAttempts++;
        console.log(
          `Wrong password. Attempts: ${failedAttempts}/${maxAttempts}`
        );

        if (failedAttempts >= maxAttempts) {
          lockoutEnd = Date.now() + lockoutTime;
          isUnlocked = false;
          console.log("Too many failed attempts. Vault locked.");
        }
        return false;
      }
    },

    lock: function () {
      isUnlocked = false;
      console.log("Vault locked.");
    },

    store: function (key, secret) {
      checkAccess();
      secrets.set(key, secret);
      console.log(`Secret '${key}' stored safely.`);
    },

    retrieve: function (key) {
      checkAccess();
      return secrets.get(key);
    },

    list: function () {
      checkAccess();
      return Array.from(secrets.keys());
    },

    delete: function (key) {
      checkAccess();
      const result = secrets.delete(key);
      if (result) {
        console.log(`Secret '${key}' deleted.`);
      }
      return result;
    },

    isUnlocked: function () {
      return isUnlocked && !isLockedOut();
    },

    getStatus: function () {
      return {
        unlocked: this.isUnlocked(),
        secretCount: isUnlocked ? secrets.size : "Hidden",
        failedAttempts: failedAttempts,
        isLockedOut: isLockedOut(),
        lockoutEnds: lockoutEnd
          ? new Date(lockoutEnd).toLocaleTimeString()
          : null,
      };
    },
  };
}

// Test the secret vault
let vault = createSecretVault("super-secret-123");

console.log("Initial status:", vault.getStatus());

// Try wrong passwords
try {
  vault.unlock("wrong1");
  vault.unlock("wrong2");
  vault.unlock("wrong3");
  vault.unlock("wrong4"); // This should fail due to lockout
} catch (error) {
  console.log("Error:", error.message);
}

// Wait for lockout to end (in real scenario)
setTimeout(() => {
  console.log("Trying correct password after lockout:");
  vault.unlock("super-secret-123");

  vault.store("api-key", "abc123def456");
  vault.store("password", "mySecretPassword");

  console.log("Stored secrets:", vault.list());
  console.log("Retrieved secret:", vault.retrieve("api-key"));

  vault.lock();
  console.log("Final status:", vault.getStatus());
}, 5100);
```

## 📚 Key Takeaways

1. **Closures** = Functions that remember their outer scope
2. **Lexical scoping** - Variable access is determined by where functions are defined
3. **Private variables** - Closures enable data encapsulation in JavaScript
4. **Function factories** - Create specialized functions with closures
5. **Module pattern** - Use closures to create private and public methods
6. **Memory considerations** - Closures can prevent garbage collection
7. **Loop gotchas** - Be careful with closures in loops (use `let` or IIFE)

## ➡️ What's Next?

Excellent work mastering closures! 🧠 You now understand one of JavaScript's most powerful and sometimes confusing features. Closures are the foundation for many advanced JavaScript patterns.

Next, you'll explore **Prototypes** - JavaScript's unique approach to object inheritance that's different from class-based languages like Java or C#.

Your next lesson: **26. Prototypes - Object Inheritance**

## 🔗 Quick Reference

```javascript
// Basic closure
function outer(x) {
  return function (y) {
    return x + y; // Remembers x
  };
}

// Private variables
function createModule() {
  let private = "secret";
  return {
    getPrivate: () => private,
    setPrivate: (val) => (private = val),
  };
}

// Function factory
function createMultiplier(n) {
  return (x) => x * n;
}

// IIFE for immediate closure
let result = (function (param) {
  return param * 2;
})(5);
```

You're mastering advanced JavaScript concepts! 🚀
