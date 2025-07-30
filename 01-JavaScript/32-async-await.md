# Async/Await - Modern Async Syntax 🚀

Welcome to **async/await** - the most elegant way to handle asynchronous code in JavaScript! It makes Promise-based code look and feel like regular synchronous code, making it easier to read, write, and debug.

## 🤔 What is Async/Await?

**Async/await** is syntactic sugar over Promises. It's a newer way to write asynchronous code that looks synchronous, making it much more readable and easier to understand.

### Real-World Analogy: Making Coffee

```
Promise way:
getCoffeeBean()
  .then(bean => grindBean(bean))
  .then(ground => brewCoffee(ground))
  .then(coffee => addMilk(coffee))
  .then(latte => console.log("Latte ready!"))

Async/Await way:
async function makeLatte() {
  const bean = await getCoffeeBean();
  const ground = await grindBean(bean);
  const coffee = await brewCoffee(ground);
  const latte = await addMilk(coffee);
  console.log("Latte ready!");
}
```

### Key Benefits:

- **Cleaner syntax** - No more .then() chains
- **Better error handling** - Use try/catch
- **Easier debugging** - Stack traces are clearer
- **Sequential logic** - Reads like regular code

## 📝 Basic Async/Await Syntax

### Converting Promises to Async/Await:

**Promise Version:**

```javascript
function fetchUserData(userId) {
  return fetchUser(userId)
    .then((user) => {
      console.log("User:", user);
      return fetchUserPosts(user.id);
    })
    .then((posts) => {
      console.log("Posts:", posts);
      return posts.length;
    })
    .catch((error) => {
      console.log("Error:", error);
      return 0;
    });
}
```

**Async/Await Version:**

```javascript
async function fetchUserData(userId) {
  try {
    const user = await fetchUser(userId);
    console.log("User:", user);

    const posts = await fetchUserPosts(user.id);
    console.log("Posts:", posts);

    return posts.length;
  } catch (error) {
    console.log("Error:", error);
    return 0;
  }
}
```

### Basic Rules:

1. **async** keyword before function declaration
2. **await** keyword before Promise calls
3. **await** only works inside async functions
4. **async functions always return a Promise**

## 🔧 Creating Async Functions

### Different Ways to Declare Async Functions:

```javascript
// Function declaration
async function fetchData() {
  return "data";
}

// Function expression
const fetchData2 = async function () {
  return "data";
};

// Arrow function
const fetchData3 = async () => {
  return "data";
};

// Method in object
const api = {
  async getData() {
    return "data";
  },
};

// Method in class
class DataService {
  async fetchData() {
    return "data";
  }
}
```

### Understanding Async Function Returns:

```javascript
async function example1() {
  return "Hello"; // Returns Promise.resolve("Hello")
}

async function example2() {
  return Promise.resolve("World"); // Returns Promise.resolve("World")
}

async function example3() {
  throw new Error("Oops"); // Returns Promise.reject(Error("Oops"))
}

// All async functions return Promises
example1().then((result) => console.log(result)); // "Hello"
example2().then((result) => console.log(result)); // "World"
example3().catch((error) => console.log(error.message)); // "Oops"
```

## ⏰ Practical Examples

### Example 1: Simple Data Fetcher

```javascript
// Simulate API calls
function fetchFromAPI(endpoint, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        "/users": { id: 1, name: "Alice" },
        "/posts": [{ title: "Hello World" }],
        "/settings": { theme: "dark", lang: "en" },
      };

      if (data[endpoint]) {
        resolve(data[endpoint]);
      } else {
        reject(new Error(`Endpoint ${endpoint} not found`));
      }
    }, delay);
  });
}

// Promise-based approach
function loadUserDataPromise() {
  console.log("🔄 Loading with Promises...");

  return fetchFromAPI("/users")
    .then((user) => {
      console.log("👤 User loaded:", user);
      return fetchFromAPI("/posts");
    })
    .then((posts) => {
      console.log("📝 Posts loaded:", posts);
      return fetchFromAPI("/settings");
    })
    .then((settings) => {
      console.log("⚙️ Settings loaded:", settings);
      return "All data loaded";
    })
    .catch((error) => {
      console.log("❌ Promise error:", error.message);
      throw error;
    });
}

// Async/await approach
async function loadUserDataAsync() {
  console.log("🔄 Loading with Async/Await...");

  try {
    const user = await fetchFromAPI("/users");
    console.log("👤 User loaded:", user);

    const posts = await fetchFromAPI("/posts");
    console.log("📝 Posts loaded:", posts);

    const settings = await fetchFromAPI("/settings");
    console.log("⚙️ Settings loaded:", settings);

    return "All data loaded";
  } catch (error) {
    console.log("❌ Async error:", error.message);
    throw error;
  }
}

// Test both approaches
loadUserDataPromise().then((result) =>
  console.log("✅ Promise result:", result)
);

loadUserDataAsync().then((result) => console.log("✅ Async result:", result));
```

### Example 2: File Processing System

```javascript
function simulateFileOperation(operation, filename, delay) {
  return new Promise((resolve, reject) => {
    console.log(`📂 ${operation}: ${filename}`);

    setTimeout(() => {
      // Simulate occasional failures
      if (Math.random() < 0.1) {
        reject(new Error(`${operation} failed for ${filename}`));
      } else {
        resolve(`${operation} completed for ${filename}`);
      }
    }, delay);
  });
}

async function processFiles(files) {
  console.log("🚀 Starting file processing...");
  const results = [];

  try {
    // Process files sequentially
    for (let filename of files) {
      console.log(`\n📋 Processing: ${filename}`);

      // Step 1: Read file
      const readResult = await simulateFileOperation("Read", filename, 500);
      console.log("✅", readResult);

      // Step 2: Validate file
      const validateResult = await simulateFileOperation(
        "Validate",
        filename,
        300
      );
      console.log("✅", validateResult);

      // Step 3: Process file
      const processResult = await simulateFileOperation(
        "Process",
        filename,
        800
      );
      console.log("✅", processResult);

      // Step 4: Save file
      const saveResult = await simulateFileOperation("Save", filename, 400);
      console.log("✅", saveResult);

      results.push({
        filename: filename,
        status: "success",
        steps: [readResult, validateResult, processResult, saveResult],
      });
    }

    return results;
  } catch (error) {
    console.log("❌ Processing failed:", error.message);

    // You can choose to stop or continue with other files
    throw error; // Stop processing

    // Or add failed file to results and continue:
    // results.push({ filename: 'unknown', status: 'failed', error: error.message });
    // return results;
  }
}

// Test file processing
const filesToProcess = ["document.pdf", "image.jpg", "data.csv"];

processFiles(filesToProcess)
  .then((results) => {
    console.log("\n🎉 All files processed successfully!");
    console.log("📊 Results:", results);
  })
  .catch((error) => {
    console.log("\n💥 File processing failed:", error.message);
  });
```

### Example 3: Parallel vs Sequential Operations

```javascript
function downloadFile(filename, size) {
  return new Promise((resolve) => {
    const delay = size * 10; // Bigger files take longer
    console.log(`📥 Starting download: ${filename} (${size}MB)`);

    setTimeout(() => {
      console.log(`✅ Downloaded: ${filename}`);
      resolve({
        filename: filename,
        size: size,
        downloadTime: delay,
      });
    }, delay);
  });
}

// Sequential downloading (one after another)
async function downloadSequential(files) {
  console.log("🔄 Sequential downloading...");
  const startTime = Date.now();
  const results = [];

  for (let file of files) {
    const result = await downloadFile(file.name, file.size);
    results.push(result);
  }

  const totalTime = Date.now() - startTime;
  console.log(`⏱️ Sequential total time: ${totalTime}ms`);
  return { results, totalTime };
}

// Parallel downloading (all at once)
async function downloadParallel(files) {
  console.log("⚡ Parallel downloading...");
  const startTime = Date.now();

  // Start all downloads at once
  const downloadPromises = files.map((file) =>
    downloadFile(file.name, file.size)
  );

  // Wait for all to complete
  const results = await Promise.all(downloadPromises);

  const totalTime = Date.now() - startTime;
  console.log(`⏱️ Parallel total time: ${totalTime}ms`);
  return { results, totalTime };
}

// Mixed approach: Control concurrency
async function downloadWithLimit(files, maxConcurrent = 2) {
  console.log(`🎛️ Limited parallel downloading (max ${maxConcurrent})...`);
  const startTime = Date.now();
  const results = [];

  // Process files in batches
  for (let i = 0; i < files.length; i += maxConcurrent) {
    const batch = files.slice(i, i + maxConcurrent);
    console.log(`📦 Processing batch: ${batch.map((f) => f.name).join(", ")}`);

    const batchPromises = batch.map((file) =>
      downloadFile(file.name, file.size)
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  const totalTime = Date.now() - startTime;
  console.log(`⏱️ Limited parallel total time: ${totalTime}ms`);
  return { results, totalTime };
}

// Test different approaches
const filesToDownload = [
  { name: "video.mp4", size: 100 },
  { name: "music.mp3", size: 50 },
  { name: "document.pdf", size: 20 },
  { name: "image.jpg", size: 30 },
];

async function compareDownloadMethods() {
  try {
    // Sequential
    const sequential = await downloadSequential([...filesToDownload]);
    console.log("📊 Sequential results:", sequential.results.length, "files");

    console.log("\n" + "=".repeat(50) + "\n");

    // Parallel
    const parallel = await downloadParallel([...filesToDownload]);
    console.log("📊 Parallel results:", parallel.results.length, "files");

    console.log("\n" + "=".repeat(50) + "\n");

    // Limited parallel
    const limited = await downloadWithLimit([...filesToDownload], 2);
    console.log(
      "📊 Limited parallel results:",
      limited.results.length,
      "files"
    );

    // Compare times
    console.log("\n⏱️ Time Comparison:");
    console.log(`Sequential: ${sequential.totalTime}ms`);
    console.log(`Parallel: ${parallel.totalTime}ms`);
    console.log(`Limited: ${limited.totalTime}ms`);
  } catch (error) {
    console.log("❌ Download comparison failed:", error.message);
  }
}

compareDownloadMethods();
```

## 🎮 Advanced Async Patterns

### Pattern 1: Retry Logic

```javascript
async function fetchWithRetry(url, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries}: ${url}`);

      // Simulate fetch that might fail
      const success = Math.random() > 0.3; // 70% success rate

      if (success) {
        const data = `Data from ${url}`;
        console.log(`✅ Success on attempt ${attempt}`);
        return data;
      } else {
        throw new Error(`Network error for ${url}`);
      }
    } catch (error) {
      console.log(`❌ Attempt ${attempt} failed:`, error.message);

      if (attempt === maxRetries) {
        console.log("💥 All retries exhausted");
        throw new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
      }

      // Wait before retrying
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Exponential backoff
      delay *= 2;
    }
  }
}

// Test retry logic
async function testRetry() {
  try {
    const data = await fetchWithRetry("https://api.example.com/data");
    console.log("🎉 Final result:", data);
  } catch (error) {
    console.log("💔 Final failure:", error.message);
  }
}

testRetry();
```

### Pattern 2: Timeout Wrapper

```javascript
function withTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Operation timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    }),
  ]);
}

async function slowOperation(name, delay) {
  console.log(`🐌 Starting slow operation: ${name}`);
  await new Promise((resolve) => setTimeout(resolve, delay));
  console.log(`✅ Completed: ${name}`);
  return `Result from ${name}`;
}

async function testTimeout() {
  try {
    // This should succeed
    const result1 = await withTimeout(
      slowOperation("Fast Task", 1000),
      2000 // 2 second timeout
    );
    console.log("✅ Fast result:", result1);

    // This should timeout
    const result2 = await withTimeout(
      slowOperation("Slow Task", 3000),
      2000 // 2 second timeout
    );
    console.log("✅ Slow result:", result2);
  } catch (error) {
    console.log("⏰ Timeout error:", error.message);
  }
}

testTimeout();
```

### Pattern 3: Async Queue Processor

```javascript
class AsyncQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  async add(asyncFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        fn: asyncFunction,
        resolve,
        reject,
      });

      this.process();
    });
  }

  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { fn, resolve, reject } = this.queue.shift();

    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process(); // Process next item
    }
  }
}

// Test async queue
async function testAsyncQueue() {
  const queue = new AsyncQueue(2); // Max 2 concurrent operations

  const tasks = [
    () => slowOperation("Task 1", 1000),
    () => slowOperation("Task 2", 1500),
    () => slowOperation("Task 3", 800),
    () => slowOperation("Task 4", 1200),
    () => slowOperation("Task 5", 900),
  ];

  console.log("🚀 Adding tasks to queue...");

  // Add all tasks to queue
  const promises = tasks.map((task) => queue.add(task));

  // Wait for all to complete
  try {
    const results = await Promise.all(promises);
    console.log("🎉 All tasks completed:", results);
  } catch (error) {
    console.log("❌ Queue processing failed:", error.message);
  }
}

testAsyncQueue();
```

## ⚠️ Common Async/Await Mistakes

### 1. Forgetting async keyword

```javascript
// Wrong: await without async
function fetchData() {
    const data = await fetch('/api/data');  // SyntaxError!
    return data;
}

// Right: async function
async function fetchData() {
    const data = await fetch('/api/data');
    return data;
}
```

### 2. Not awaiting Promises

```javascript
// Wrong: Forgetting await
async function processData() {
  const data = fetchData(); // Returns Promise, not data!
  console.log(data); // Logs: Promise { <pending> }
}

// Right: Using await
async function processData() {
  const data = await fetchData(); // Waits for Promise to resolve
  console.log(data); // Logs: actual data
}
```

### 3. Sequential when you want parallel

```javascript
// Wrong: Sequential execution (slow)
async function fetchMultipleSlowly() {
  const user = await fetchUser(); // Wait 1 second
  const posts = await fetchPosts(); // Wait another 1 second
  const comments = await fetchComments(); // Wait another 1 second
  // Total: 3 seconds
}

// Right: Parallel execution (fast)
async function fetchMultipleFastly() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(), // All start at the same time
    fetchPosts(),
    fetchComments(),
  ]);
  // Total: 1 second (time of slowest operation)
}
```

### 4. Not handling errors properly

```javascript
// Wrong: Unhandled async errors
async function riskyOperation() {
  const data = await fetchData(); // Might throw error
  return data.process(); // Will crash if fetchData fails
}

// Right: Proper error handling
async function safeOperation() {
  try {
    const data = await fetchData();
    return data.process();
  } catch (error) {
    console.log("Operation failed:", error.message);
    return null; // Or handle error appropriately
  }
}
```

### 5. Mixing async/await with .then()

```javascript
// Wrong: Mixing styles (confusing)
async function mixedStyle() {
  const data = await fetchData()
    .then((data) => data.process())
    .catch((error) => console.log(error));
  return data;
}

// Right: Consistent async/await style
async function consistentStyle() {
  try {
    const data = await fetchData();
    return data.process();
  } catch (error) {
    console.log(error);
    return null;
  }
}
```

## 🎮 Interactive Exercises

### Exercise 1: Weather App

```javascript
// Simulate weather API
function fetchWeatherData(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const weatherData = {
        "new york": { temp: 22, condition: "sunny", humidity: 65 },
        london: { temp: 15, condition: "rainy", humidity: 80 },
        tokyo: { temp: 28, condition: "cloudy", humidity: 70 },
        paris: { temp: 18, condition: "sunny", humidity: 55 },
      };

      const cityKey = city.toLowerCase();
      if (weatherData[cityKey]) {
        resolve({
          city: city,
          ...weatherData[cityKey],
          timestamp: new Date(),
        });
      } else {
        reject(new Error(`Weather data not found for ${city}`));
      }
    }, Math.random() * 1000 + 500); // 500-1500ms delay
  });
}

async function getWeatherReport(cities) {
  console.log("🌤️ Fetching weather report...");

  try {
    // Get weather for all cities in parallel
    const weatherPromises = cities.map((city) =>
      fetchWeatherData(city).catch((error) => ({
        city: city,
        error: error.message,
      }))
    );

    const results = await Promise.all(weatherPromises);

    // Separate successful and failed results
    const successful = results.filter((r) => !r.error);
    const failed = results.filter((r) => r.error);

    // Display report
    console.log("\n📊 Weather Report:");
    console.log("==================");

    successful.forEach((weather) => {
      console.log(
        `🌍 ${weather.city}: ${weather.temp}°C, ${weather.condition} (${weather.humidity}% humidity)`
      );
    });

    if (failed.length > 0) {
      console.log("\n❌ Failed to fetch:");
      failed.forEach((f) => console.log(`  ${f.city}: ${f.error}`));
    }

    return {
      successful: successful,
      failed: failed,
      totalCities: cities.length,
    };
  } catch (error) {
    console.log("💥 Weather report failed:", error.message);
    throw error;
  }
}

// Test weather app
const cities = ["New York", "London", "Tokyo", "Paris", "Unknown City"];

getWeatherReport(cities)
  .then((report) => {
    console.log(
      `\n✅ Report complete: ${report.successful.length}/${report.totalCities} cities`
    );
  })
  .catch((error) => {
    console.log("❌ Report generation failed:", error.message);
  });
```

### Exercise 2: Shopping Cart Processor

```javascript
// Simulate inventory and payment systems
function checkInventory(productId, quantity) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const inventory = {
        laptop: 5,
        mouse: 20,
        keyboard: 15,
        monitor: 8,
      };

      if (inventory[productId] >= quantity) {
        resolve({
          productId,
          available: inventory[productId],
          requested: quantity,
          reserved: true,
        });
      } else {
        reject(
          new Error(
            `Insufficient inventory for ${productId}. Available: ${inventory[productId]}, Requested: ${quantity}`
          )
        );
      }
    }, 300);
  });
}

function processPayment(amount, method = "credit") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate payment processing
      const success = Math.random() > 0.1; // 90% success rate

      if (success) {
        resolve({
          amount,
          method,
          transactionId: "TXN" + Date.now(),
          status: "completed",
        });
      } else {
        reject(
          new Error(
            `Payment failed: ${method} payment of $${amount} was declined`
          )
        );
      }
    }, 1000);
  });
}

function shipOrder(orderItems, paymentInfo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        orderId: "ORD" + Date.now(),
        items: orderItems,
        payment: paymentInfo,
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        trackingNumber: "TRK" + Math.random().toString(36).substr(2, 9),
      });
    }, 500);
  });
}

async function processShoppingCart(cartItems, paymentMethod = "credit") {
  console.log("🛒 Processing shopping cart...");
  console.log("Items:", cartItems);

  try {
    // Step 1: Check inventory for all items
    console.log("\n📦 Checking inventory...");
    const inventoryPromises = cartItems.map((item) =>
      checkInventory(item.productId, item.quantity)
    );

    const inventoryResults = await Promise.all(inventoryPromises);
    console.log("✅ All items available in inventory");

    // Step 2: Calculate total amount
    const productPrices = {
      laptop: 999,
      mouse: 25,
      keyboard: 75,
      monitor: 299,
    };

    let totalAmount = 0;
    const orderItems = inventoryResults.map((item) => {
      const price = productPrices[item.productId] * item.requested;
      totalAmount += price;
      return {
        productId: item.productId,
        quantity: item.requested,
        unitPrice: productPrices[item.productId],
        totalPrice: price,
      };
    });

    console.log(`💰 Total amount: $${totalAmount}`);

    // Step 3: Process payment
    console.log("\n💳 Processing payment...");
    const paymentResult = await processPayment(totalAmount, paymentMethod);
    console.log("✅ Payment successful:", paymentResult.transactionId);

    // Step 4: Ship order
    console.log("\n🚚 Arranging shipment...");
    const shipmentResult = await shipOrder(orderItems, paymentResult);
    console.log("✅ Order shipped:", shipmentResult.trackingNumber);

    return {
      success: true,
      order: shipmentResult,
      message: `Order ${shipmentResult.orderId} processed successfully!`,
    };
  } catch (error) {
    console.log("❌ Order processing failed:", error.message);

    // Handle different types of errors
    if (error.message.includes("Insufficient inventory")) {
      return {
        success: false,
        error: "inventory",
        message: "Some items are out of stock. Please update your cart.",
      };
    } else if (error.message.includes("Payment failed")) {
      return {
        success: false,
        error: "payment",
        message:
          "Payment could not be processed. Please try a different payment method.",
      };
    } else {
      return {
        success: false,
        error: "general",
        message: "An unexpected error occurred. Please try again.",
      };
    }
  }
}

// Test shopping cart
const shoppingCart = [
  { productId: "laptop", quantity: 1 },
  { productId: "mouse", quantity: 2 },
  { productId: "keyboard", quantity: 1 },
];

processShoppingCart(shoppingCart, "credit").then((result) => {
  if (result.success) {
    console.log("\n🎉", result.message);
    console.log("📋 Order details:", result.order);
  } else {
    console.log("\n💔", result.message);
  }
});
```

## 🎯 Key Concepts to Remember

1. **async** functions always return Promises
2. **await** pauses function execution until Promise resolves
3. **try/catch** handles errors in async functions
4. **Sequential vs Parallel**: Use await in loop for sequential, Promise.all for parallel
5. **Error handling**: Always wrap risky async code in try/catch
6. **Mixing patterns**: Don't mix .then() with async/await

## 💡 When to Use Async/Await vs Promises

### ✅ Use Async/Await when:

- **Sequential operations** - Each step depends on the previous
- **Complex error handling** - Multiple try/catch blocks
- **Conditional async logic** - If/else with async operations
- **Loop with async operations** - Processing arrays sequentially

### ✅ Use Promises when:

- **Simple chains** - Just a few .then() calls
- **Parallel operations** - Promise.all, Promise.race
- **Legacy code** - Already using Promises extensively
- **Library APIs** - When library expects Promise callbacks

## 🔄 Async/Await Best Practices

1. **Always use try/catch** for error handling
2. **Use Promise.all** for parallel operations
3. **Don't await in loops** unless you need sequential processing
4. **Handle partial failures** gracefully
5. **Use meaningful variable names** for awaited values
6. **Keep async functions focused** - single responsibility

## 🚀 What's Next?

Congratulations! You've mastered async/await - the modern way to handle asynchronous JavaScript. This is a crucial skill for modern web development.

Next, we'll dive into **DOM Manipulation** - how to interact with web pages, handle user events, and create dynamic user interfaces. You'll learn to bring your JavaScript knowledge to life in the browser!

---

🎉 **You're now an async programming expert!** This knowledge will serve you well in all modern JavaScript applications, from frontend React apps to backend Node.js servers. The combination of Promises and async/await is the foundation of contemporary JavaScript development!
