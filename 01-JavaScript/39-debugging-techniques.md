# Debugging Techniques - Finding and Fixing Bugs 🐛

Welcome to **Debugging Techniques** - your guide to becoming a bug-hunting master! Every developer spends significant time debugging, so learning effective techniques will make you much more productive and less frustrated.

## 🔍 What is Debugging?

**Debugging** is the process of finding and fixing errors (bugs) in your code. It's like being a detective - you gather clues, form hypotheses, and systematically test until you find the culprit.

### The Debugging Mindset:

```
🕵️ Detective Approach:
1. Observe the symptoms
2. Form hypotheses about causes
3. Test hypotheses systematically
4. Gather more evidence
5. Fix the root cause
6. Verify the fix works
```

## 🛠️ Browser Developer Tools

### Console Debugging:

```javascript
// 1. Basic console methods
console.log("Basic information");
console.info("ℹ️ Information message");
console.warn("⚠️ Warning message");
console.error("❌ Error message");

// 2. Console grouping
console.group("User Data Processing");
console.log("Loading user data...");
console.log("Validating user data...");
console.log("Saving user data...");
console.groupEnd();

// 3. Console table for objects/arrays
const users = [
  { id: 1, name: "Alice", age: 25, city: "New York" },
  { id: 2, name: "Bob", age: 30, city: "London" },
  { id: 3, name: "Charlie", age: 35, city: "Tokyo" },
];
console.table(users);

// 4. Console time for performance
console.time("Data Processing");
// ... some operation
setTimeout(() => {
  console.timeEnd("Data Processing");
}, 1000);

// 5. Console trace for call stack
function functionA() {
  functionB();
}

function functionB() {
  functionC();
}

function functionC() {
  console.trace("Call stack trace:");
}

functionA();

// 6. Console assert for conditional logging
const user = { name: "Alice", age: 25 };
console.assert(user.age >= 18, "User must be adult", user);
console.assert(user.name === "Bob", "Expected user Bob", user);

// 7. Console count for tracking occurrences
function processItem(item) {
  console.count("processItem called");
  return item * 2;
}

[1, 2, 3, 4, 5].forEach(processItem);
```

### Advanced Console Techniques:

```javascript
// Custom console logger with levels
class Logger {
  constructor(level = "INFO") {
    this.levels = {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3,
    };
    this.currentLevel = this.levels[level] || 2;
  }

  error(...args) {
    if (this.currentLevel >= this.levels.ERROR) {
      console.error("🔴 ERROR:", ...args);
    }
  }

  warn(...args) {
    if (this.currentLevel >= this.levels.WARN) {
      console.warn("🟡 WARN:", ...args);
    }
  }

  info(...args) {
    if (this.currentLevel >= this.levels.INFO) {
      console.info("🔵 INFO:", ...args);
    }
  }

  debug(...args) {
    if (this.currentLevel >= this.levels.DEBUG) {
      console.log("⚪ DEBUG:", ...args);
    }
  }

  trace(label, data = {}) {
    console.group(`🔍 TRACE: ${label}`);
    console.log("Data:", data);
    console.log("Timestamp:", new Date().toISOString());
    console.trace();
    console.groupEnd();
  }

  setLevel(level) {
    this.currentLevel = this.levels[level] || 2;
    this.info(`Log level set to: ${level}`);
  }
}

// Usage
const logger = new Logger("DEBUG");

function userLogin(username, password) {
  logger.debug("Login attempt", { username, passwordLength: password.length });

  if (!username) {
    logger.error("Username is required");
    return false;
  }

  if (password.length < 8) {
    logger.warn("Password is too short", { length: password.length });
    return false;
  }

  logger.info("User logged in successfully", { username });
  return true;
}

// Test logging
userLogin("", "short");
userLogin("alice", "verylongpassword");
```

## 🐛 Debugging Strategies

### 1. Rubber Duck Debugging:

```javascript
// Explain your code step by step to find issues
class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem(item) {
    // Rubber duck: "I'm adding an item to the cart..."
    console.log("🦆 Adding item:", item);

    // Rubber duck: "I need to validate the item first..."
    if (!item || !item.id || !item.price) {
      console.log("🦆 Invalid item detected!");
      throw new Error("Invalid item");
    }

    // Rubber duck: "Now I'll add it to the items array..."
    this.items.push(item);

    // Rubber duck: "And update the total..."
    this.total += item.price;

    console.log("🦆 Cart state after adding:", {
      itemCount: this.items.length,
      total: this.total,
    });
  }

  removeItem(itemId) {
    console.log("🦆 Removing item with ID:", itemId);

    const index = this.items.findIndex((item) => item.id === itemId);

    if (index === -1) {
      console.log("🦆 Item not found in cart!");
      return false;
    }

    const removedItem = this.items[index];
    console.log("🦆 Found item to remove:", removedItem);

    // Remove from array
    this.items.splice(index, 1);

    // Update total
    this.total -= removedItem.price;

    console.log("🦆 Cart state after removal:", {
      itemCount: this.items.length,
      total: this.total,
    });

    return true;
  }
}

// Test the cart with debugging
const cart = new ShoppingCart();

try {
  cart.addItem({ id: 1, name: "Book", price: 15.99 });
  cart.addItem({ id: 2, name: "Pen", price: 2.5 });
  cart.removeItem(1);
  cart.removeItem(999); // Item doesn't exist
} catch (error) {
  console.log("🦆 Error in cart operations:", error.message);
}
```

### 2. Binary Search Debugging:

```javascript
// When you have a large function, comment out half to isolate the issue
function complexDataProcessor(data) {
  console.log("🔍 Starting complex processing...");

  // Step 1: Input validation
  console.log("Step 1: Validating input");
  if (!Array.isArray(data)) {
    throw new Error("Data must be an array");
  }

  // Step 2: Filter invalid items
  console.log("Step 2: Filtering data");
  const validItems = data.filter((item) => {
    const isValid = item && typeof item === "object" && item.id;
    console.log(`Item ${item?.id || "unknown"} is valid: ${isValid}`);
    return isValid;
  });

  // Step 3: Transform data
  console.log("Step 3: Transforming data");
  const transformedItems = validItems.map((item) => {
    console.log(`Transforming item ${item.id}`);
    return {
      ...item,
      processed: true,
      timestamp: Date.now(),
    };
  });

  // Step 4: Sort by ID
  console.log("Step 4: Sorting data");
  const sortedItems = transformedItems.sort((a, b) => {
    console.log(`Comparing ${a.id} and ${b.id}`);
    return a.id - b.id;
  });

  // Step 5: Generate summary
  console.log("Step 5: Generating summary");
  const summary = {
    totalItems: sortedItems.length,
    processedAt: new Date().toISOString(),
    items: sortedItems,
  };

  console.log("🔍 Processing complete");
  return summary;
}

// Test data with intentional issues
const testData = [
  { id: 3, name: "Item 3" },
  null, // This will cause issues
  { id: 1, name: "Item 1" },
  { name: "No ID item" }, // Missing ID
  { id: 2, name: "Item 2" },
];

try {
  const result = complexDataProcessor(testData);
  console.log("✅ Result:", result);
} catch (error) {
  console.log("❌ Error in processing:", error.message);
}
```

### 3. Assertion-Based Debugging:

```javascript
// Use assertions to catch issues early
class Calculator {
  constructor() {
    this.history = [];
  }

  assert(condition, message) {
    if (!condition) {
      const error = new Error(`Assertion failed: ${message}`);
      console.error("💥 ASSERTION FAILED:", error.message);
      throw error;
    }
  }

  add(a, b) {
    // Pre-conditions
    this.assert(typeof a === "number", "First argument must be a number");
    this.assert(typeof b === "number", "Second argument must be a number");
    this.assert(!isNaN(a), "First argument cannot be NaN");
    this.assert(!isNaN(b), "Second argument cannot be NaN");

    const result = a + b;

    // Post-conditions
    this.assert(typeof result === "number", "Result must be a number");
    this.assert(!isNaN(result), "Result cannot be NaN");

    this.history.push({ operation: "add", operands: [a, b], result });

    // Invariants
    this.assert(
      this.history.length > 0,
      "History must not be empty after operation"
    );

    return result;
  }

  divide(a, b) {
    // Pre-conditions
    this.assert(typeof a === "number", "First argument must be a number");
    this.assert(typeof b === "number", "Second argument must be a number");
    this.assert(b !== 0, "Cannot divide by zero");
    this.assert(!isNaN(a), "First argument cannot be NaN");
    this.assert(!isNaN(b), "Second argument cannot be NaN");

    const result = a / b;

    // Post-conditions
    this.assert(typeof result === "number", "Result must be a number");
    this.assert(!isNaN(result), "Result cannot be NaN");
    this.assert(isFinite(result), "Result must be finite");

    this.history.push({ operation: "divide", operands: [a, b], result });

    return result;
  }

  getHistory() {
    // Invariant check
    this.assert(Array.isArray(this.history), "History must be an array");
    return [...this.history];
  }
}

// Test with assertions
const calc = new Calculator();

const testCases = [
  () => calc.add(5, 3),
  () => calc.add("5", 3), // Should fail assertion
  () => calc.divide(10, 2),
  () => calc.divide(10, 0), // Should fail assertion
  () => calc.add(NaN, 5), // Should fail assertion
];

testCases.forEach((testCase, index) => {
  try {
    console.log(`\n--- Test Case ${index + 1} ---`);
    const result = testCase();
    console.log("✅ Result:", result);
  } catch (error) {
    console.log("❌ Test failed:", error.message);
  }
});
```

## 🔧 Debugging Tools and Techniques

### State Inspection:

```javascript
// Deep object inspection utility
class ObjectInspector {
  static inspect(obj, options = {}) {
    const {
      maxDepth = 3,
      showFunctions = false,
      showPrivate = false,
    } = options;

    return this.inspectRecursive(
      obj,
      0,
      maxDepth,
      showFunctions,
      showPrivate,
      new Set()
    );
  }

  static inspectRecursive(
    obj,
    currentDepth,
    maxDepth,
    showFunctions,
    showPrivate,
    visited
  ) {
    // Prevent circular references
    if (visited.has(obj)) {
      return "[Circular Reference]";
    }

    if (currentDepth > maxDepth) {
      return "[Max Depth Exceeded]";
    }

    if (obj === null) return "null";
    if (obj === undefined) return "undefined";

    const type = typeof obj;

    if (type === "string") return `"${obj}"`;
    if (type === "number" || type === "boolean") return String(obj);
    if (type === "function") {
      return showFunctions
        ? `[Function: ${obj.name || "anonymous"}]`
        : "[Function]";
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]";

      visited.add(obj);
      const items = obj.map((item) =>
        this.inspectRecursive(
          item,
          currentDepth + 1,
          maxDepth,
          showFunctions,
          showPrivate,
          visited
        )
      );
      visited.delete(obj);

      return `[${items.join(", ")}]`;
    }

    if (type === "object") {
      const keys = Object.keys(obj);

      if (!showPrivate) {
        keys.filter((key) => !key.startsWith("_"));
      }

      if (keys.length === 0) return "{}";

      visited.add(obj);
      const props = keys.map((key) => {
        const value = this.inspectRecursive(
          obj[key],
          currentDepth + 1,
          maxDepth,
          showFunctions,
          showPrivate,
          visited
        );
        return `${key}: ${value}`;
      });
      visited.delete(obj);

      return `{${props.join(", ")}}`;
    }

    return String(obj);
  }

  static diff(obj1, obj2) {
    const differences = [];
    this.diffRecursive(obj1, obj2, "", differences);
    return differences;
  }

  static diffRecursive(obj1, obj2, path, differences) {
    if (obj1 === obj2) return;

    if (typeof obj1 !== typeof obj2) {
      differences.push({
        path,
        type: "TYPE_CHANGE",
        oldValue: obj1,
        newValue: obj2,
      });
      return;
    }

    if (obj1 === null || obj2 === null || typeof obj1 !== "object") {
      differences.push({
        path,
        type: "VALUE_CHANGE",
        oldValue: obj1,
        newValue: obj2,
      });
      return;
    }

    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    for (let key of allKeys) {
      const newPath = path ? `${path}.${key}` : key;

      if (!(key in obj1)) {
        differences.push({
          path: newPath,
          type: "ADDED",
          newValue: obj2[key],
        });
      } else if (!(key in obj2)) {
        differences.push({
          path: newPath,
          type: "REMOVED",
          oldValue: obj1[key],
        });
      } else {
        this.diffRecursive(obj1[key], obj2[key], newPath, differences);
      }
    }
  }
}

// Usage example
const user1 = {
  id: 1,
  name: "Alice",
  profile: {
    age: 25,
    interests: ["reading", "coding"],
    settings: {
      theme: "dark",
      notifications: true,
    },
  },
  _private: "secret",
};

const user2 = {
  id: 1,
  name: "Alice Johnson",
  profile: {
    age: 26,
    interests: ["reading", "coding", "gaming"],
    settings: {
      theme: "light",
      notifications: true,
      language: "en",
    },
  },
};

console.log("--- Object Inspection ---");
console.log("User1:", ObjectInspector.inspect(user1));
console.log(
  "User1 (with private):",
  ObjectInspector.inspect(user1, { showPrivate: true })
);

console.log("\n--- Object Differences ---");
const differences = ObjectInspector.diff(user1, user2);
differences.forEach((diff) => {
  console.log(`${diff.type} at ${diff.path}:`, diff);
});
```

### Performance Debugging:

```javascript
// Performance monitoring utility
class PerformanceMonitor {
  constructor() {
    this.timings = new Map();
    this.counters = new Map();
    this.memorySnapshots = [];
  }

  startTimer(label) {
    this.timings.set(label, {
      start: performance.now(),
      end: null,
      duration: null,
    });
  }

  endTimer(label) {
    if (!this.timings.has(label)) {
      console.warn(`Timer "${label}" was not started`);
      return null;
    }

    const timing = this.timings.get(label);
    timing.end = performance.now();
    timing.duration = timing.end - timing.start;

    console.log(`⏱️ ${label}: ${timing.duration.toFixed(2)}ms`);
    return timing.duration;
  }

  count(label) {
    const current = this.counters.get(label) || 0;
    this.counters.set(label, current + 1);
    console.log(`🔢 ${label}: ${current + 1}`);
  }

  takeMemorySnapshot(label) {
    if (performance.memory) {
      const snapshot = {
        label,
        timestamp: Date.now(),
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit,
      };

      this.memorySnapshots.push(snapshot);
      console.log(`📊 Memory snapshot "${label}":`, snapshot);
      return snapshot;
    } else {
      console.warn("Performance.memory not available");
    }
  }

  benchmark(func, iterations = 1000) {
    this.startTimer("benchmark");

    for (let i = 0; i < iterations; i++) {
      func();
    }

    const duration = this.endTimer("benchmark");
    const avgTime = duration / iterations;

    console.log(
      `🏁 Benchmark: ${iterations} iterations in ${duration.toFixed(2)}ms`
    );
    console.log(`📈 Average: ${avgTime.toFixed(4)}ms per iteration`);

    return { totalTime: duration, averageTime: avgTime, iterations };
  }

  profile(func, label = "profile") {
    this.takeMemorySnapshot(`${label}-start`);
    this.startTimer(label);

    const result = func();

    this.endTimer(label);
    this.takeMemorySnapshot(`${label}-end`);

    return result;
  }

  getReport() {
    return {
      timings: Object.fromEntries(this.timings),
      counters: Object.fromEntries(this.counters),
      memorySnapshots: this.memorySnapshots,
    };
  }

  reset() {
    this.timings.clear();
    this.counters.clear();
    this.memorySnapshots = [];
    console.log("🔄 Performance monitor reset");
  }
}

// Usage example
const monitor = new PerformanceMonitor();

// Test function that processes data
function processLargeDataset(size) {
  monitor.count("processLargeDataset calls");

  const data = [];

  // Generate data
  monitor.startTimer("data-generation");
  for (let i = 0; i < size; i++) {
    data.push({ id: i, value: Math.random() * 100 });
  }
  monitor.endTimer("data-generation");

  // Process data
  monitor.startTimer("data-processing");
  const processed = data
    .filter((item) => item.value > 50)
    .map((item) => ({ ...item, processed: true }))
    .sort((a, b) => b.value - a.value);
  monitor.endTimer("data-processing");

  return processed;
}

// Benchmark the function
console.log("--- Performance Testing ---");

monitor.takeMemorySnapshot("initial");

// Test with different data sizes
[1000, 5000, 10000].forEach((size) => {
  console.log(`\n--- Testing with ${size} items ---`);

  const result = monitor.profile(
    () => processLargeDataset(size),
    `dataset-${size}`
  );
  console.log(`Processed ${result.length} items`);
});

// Benchmark small operations
console.log("\n--- Benchmarking ---");
monitor.benchmark(() => {
  Math.random() * 100;
}, 10000);

console.log("\n--- Final Report ---");
console.log(monitor.getReport());
```

## 🎯 Common Debugging Scenarios

### Async Issues:

```javascript
// Debugging async/await issues
class AsyncDebugger {
  static async debugAsyncChain() {
    console.log("🔍 Starting async debugging...");

    try {
      // Step 1: Initial data fetch
      console.log("Step 1: Fetching user data...");
      const user = await this.fetchUser(123);
      console.log("✅ User fetched:", user);

      // Step 2: Fetch related data
      console.log("Step 2: Fetching user posts...");
      const posts = await this.fetchUserPosts(user.id);
      console.log("✅ Posts fetched:", posts.length);

      // Step 3: Process all data
      console.log("Step 3: Processing data...");
      const result = await this.processUserData(user, posts);
      console.log("✅ Processing complete:", result);

      return result;
    } catch (error) {
      console.error("❌ Async chain failed at:", error.stack);
      throw error;
    }
  }

  static async fetchUser(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id <= 0) {
          reject(new Error("Invalid user ID"));
        } else if (id === 404) {
          reject(new Error("User not found"));
        } else {
          resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
        }
      }, Math.random() * 1000);
    });
  }

  static async fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.2) {
          reject(new Error("Posts service unavailable"));
        } else {
          const posts = Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            userId,
            title: `Post ${i + 1}`,
            content: `Content for post ${i + 1}`,
          }));
          resolve(posts);
        }
      }, Math.random() * 500);
    });
  }

  static async processUserData(user, posts) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            ...user,
            postCount: posts.length,
          },
          summary: `${user.name} has ${posts.length} posts`,
        });
      }, 200);
    });
  }

  // Debug race conditions
  static async debugRaceCondition() {
    console.log("🏁 Testing race conditions...");

    let counter = 0;

    const incrementAsync = async (id, delay) => {
      console.log(`Task ${id}: Starting (delay: ${delay}ms)`);
      await new Promise((resolve) => setTimeout(resolve, delay));

      const oldValue = counter;
      counter = oldValue + 1;

      console.log(`Task ${id}: Incremented from ${oldValue} to ${counter}`);
      return counter;
    };

    // Start multiple async operations
    const promises = [
      incrementAsync(1, 100),
      incrementAsync(2, 50),
      incrementAsync(3, 150),
      incrementAsync(4, 75),
      incrementAsync(5, 25),
    ];

    const results = await Promise.all(promises);
    console.log("Final counter value:", counter);
    console.log("Expected: 5, Actual:", counter);
    console.log("Results from each task:", results);

    if (counter !== 5) {
      console.warn("⚠️ Race condition detected!");
    }
  }
}

// Test async debugging
AsyncDebugger.debugAsyncChain()
  .then((result) => console.log("🎉 Async chain completed:", result))
  .catch((error) => console.error("💥 Async chain failed:", error.message));

AsyncDebugger.debugRaceCondition();
```

## 🎯 Key Concepts to Remember

1. **Console methods** are your first debugging tool
2. **Assertions** catch issues early in development
3. **Breakpoints** let you inspect code execution step by step
4. **Performance monitoring** identifies bottlenecks
5. **State inspection** reveals object changes over time
6. **Async debugging** requires special attention to timing
7. **Systematic approach** beats random code changes

## 🚀 What's Next?

Excellent! You now have a comprehensive toolkit for debugging JavaScript applications. You can use browser dev tools effectively, implement logging strategies, and systematically hunt down bugs.

Next, we'll start building **real projects** where you'll apply everything you've learned! We'll begin with a **Todo List Application** - a complete interactive app that demonstrates all the JavaScript concepts you've mastered.

---

🐛 **You're now a debugging master!** These skills will save you countless hours throughout your programming career. Good debugging techniques are what separate novice developers from professionals!
