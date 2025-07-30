# Try/Catch/Finally - Error Handling 🛡️

Welcome to **Error Handling** - your shield against crashes and bugs! Every professional JavaScript application needs robust error handling to deal with unexpected situations gracefully. Let's learn how to build resilient code that can handle anything!

## 🛡️ What is Error Handling?

**Error handling** is the practice of anticipating and managing errors that might occur in your code. Instead of letting your application crash, you catch errors and handle them appropriately.

### Real-World Analogy: Safety Nets

```
Trapeze Artist = Your JavaScript code
Safety Net = try/catch blocks
Audience = Your users

Without safety net: One mistake = disaster
With safety net: Mistakes are caught gracefully
Performance continues smoothly
```

### Why Error Handling Matters:

- **User Experience**: Apps don't crash unexpectedly
- **Debugging**: Better error information for developers
- **Recovery**: Ability to recover from errors
- **Logging**: Track what goes wrong in production

## 🎯 Basic Try/Catch Syntax

### Simple Error Catching:

```javascript
try {
  // Code that might throw an error
  let result = riskyOperation();
  console.log("Success:", result);
} catch (error) {
  // Handle the error
  console.log("Something went wrong:", error.message);
}

console.log("Program continues...");

// Example of risky operation
function riskyOperation() {
  if (Math.random() < 0.5) {
    throw new Error("Random failure occurred!");
  }
  return "Operation successful";
}
```

### Catching Specific Error Information:

```javascript
try {
  // Attempting to access undefined property
  let user = null;
  console.log(user.name.toUpperCase());
} catch (error) {
  console.log("Error name:", error.name); // TypeError
  console.log("Error message:", error.message); // Cannot read properties of null
  console.log("Error stack:", error.stack); // Full stack trace

  // Handle the error gracefully
  console.log("User data is not available");
}
```

### Try/Catch with Variables:

```javascript
let userData = null;

try {
  // Try to parse user data from localStorage
  const rawData = localStorage.getItem("userData");
  userData = JSON.parse(rawData);

  if (!userData || !userData.name) {
    throw new Error("Invalid user data structure");
  }

  console.log(`Welcome back, ${userData.name}!`);
} catch (error) {
  console.log("Failed to load user data:", error.message);

  // Set default user data
  userData = {
    name: "Guest",
    preferences: {
      theme: "light",
      language: "en",
    },
  };

  console.log("Using default user data");
}

// userData is now safely available for use
console.log("Current user:", userData.name);
```

## 🔄 The Finally Block

### Basic Finally Usage:

```javascript
function performDatabaseOperation() {
  let connection = null;

  try {
    connection = openDatabaseConnection();
    let data = fetchDataFromDatabase(connection);
    return processData(data);
  } catch (error) {
    console.log("Database operation failed:", error.message);
    return null;
  } finally {
    // This ALWAYS runs, whether try succeeds or catch runs
    if (connection) {
      closeDatabaseConnection(connection);
      console.log("Database connection closed");
    }
  }
}

// Simulate database functions
function openDatabaseConnection() {
  console.log("Opening database connection...");
  return { id: Date.now(), status: "connected" };
}

function fetchDataFromDatabase(connection) {
  if (Math.random() < 0.3) {
    throw new Error("Database query failed");
  }
  return { users: ["Alice", "Bob", "Charlie"] };
}

function processData(data) {
  return data.users.map((name) => ({ name, id: Date.now() + Math.random() }));
}

function closeDatabaseConnection(connection) {
  console.log(`Closing connection ${connection.id}`);
}
```

### Resource Cleanup with Finally:

```javascript
class FileProcessor {
  constructor() {
    this.fileHandle = null;
    this.isProcessing = false;
  }

  async processFile(filename) {
    try {
      this.isProcessing = true;
      this.showLoadingIndicator();

      // Open file
      this.fileHandle = await this.openFile(filename);
      console.log(`File ${filename} opened successfully`);

      // Process file content
      const content = await this.readFileContent(this.fileHandle);
      const processedContent = this.transformContent(content);

      // Save processed content
      await this.saveProcessedContent(processedContent, filename);

      return {
        success: true,
        message: `File ${filename} processed successfully`,
      };
    } catch (error) {
      console.error("File processing failed:", error.message);

      return {
        success: false,
        message: `Failed to process ${filename}: ${error.message}`,
      };
    } finally {
      // Cleanup always happens
      if (this.fileHandle) {
        await this.closeFile(this.fileHandle);
        console.log("File handle closed");
        this.fileHandle = null;
      }

      this.isProcessing = false;
      this.hideLoadingIndicator();
      console.log("Cleanup completed");
    }
  }

  showLoadingIndicator() {
    console.log("📁 Processing file...");
  }

  hideLoadingIndicator() {
    console.log("✅ Processing complete");
  }

  async openFile(filename) {
    // Simulate file opening
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!filename.endsWith(".txt")) {
      throw new Error("Only .txt files are supported");
    }

    return { filename, handle: Date.now() };
  }

  async readFileContent(fileHandle) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (Math.random() < 0.2) {
      throw new Error("File read error - corrupted data");
    }

    return "Sample file content\nLine 2\nLine 3";
  }

  transformContent(content) {
    return content
      .toUpperCase()
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n");
  }

  async saveProcessedContent(content, originalFilename) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const outputFilename = originalFilename.replace(".txt", "_processed.txt");
    console.log(`Saved processed content to ${outputFilename}`);
  }

  async closeFile(fileHandle) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log(`Closed file handle ${fileHandle.handle}`);
  }
}

// Usage
const processor = new FileProcessor();

async function testFileProcessing() {
  const results = await Promise.all([
    processor.processFile("document.txt"),
    processor.processFile("data.csv"), // Will fail - wrong extension
    processor.processFile("notes.txt"),
  ]);

  results.forEach((result, index) => {
    console.log(`Result ${index + 1}:`, result);
  });
}

testFileProcessing();
```

## 🎯 Different Types of Errors

### Built-in Error Types:

```javascript
function demonstrateErrorTypes() {
  const examples = [
    {
      name: "ReferenceError",
      test: () => {
        console.log(undefinedVariable); // Variable doesn't exist
      },
    },
    {
      name: "TypeError",
      test: () => {
        let num = 42;
        num.toUpperCase(); // Numbers don't have toUpperCase method
      },
    },
    {
      name: "SyntaxError",
      test: () => {
        eval("function invalid syntax {"); // Invalid JavaScript syntax
      },
    },
    {
      name: "RangeError",
      test: () => {
        const arr = new Array(-1); // Negative array length
      },
    },
    {
      name: "URIError",
      test: () => {
        decodeURIComponent("%"); // Invalid URI component
      },
    },
  ];

  examples.forEach((example) => {
    try {
      console.log(`\nTesting ${example.name}:`);
      example.test();
    } catch (error) {
      console.log(`✅ Caught ${error.name}: ${error.message}`);
    }
  });
}

demonstrateErrorTypes();
```

### Creating Custom Errors:

```javascript
// Custom error classes
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode = 0) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

class BusinessLogicError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "BusinessLogicError";
    this.code = code;
  }
}

// Function that uses custom errors
function validateUser(userData) {
  if (!userData.email) {
    throw new ValidationError("email", "Email is required");
  }

  if (!userData.email.includes("@")) {
    throw new ValidationError("email", "Email must be valid");
  }

  if (!userData.age || userData.age < 18) {
    throw new ValidationError("age", "User must be 18 or older");
  }

  if (userData.username && userData.username.length < 3) {
    throw new ValidationError(
      "username",
      "Username must be at least 3 characters"
    );
  }

  return true;
}

function processUserRegistration(userData) {
  try {
    // Validate user data
    validateUser(userData);

    // Check if user already exists (simulate)
    if (userData.email === "existing@example.com") {
      throw new BusinessLogicError("User already exists", "USER_EXISTS");
    }

    // Simulate network request
    if (Math.random() < 0.2) {
      throw new NetworkError("Registration service unavailable", 503);
    }

    console.log("✅ User registered successfully!");
    return { success: true, userId: Date.now() };
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`❌ Validation Error in ${error.field}: ${error.message}`);
      return {
        success: false,
        type: "validation",
        field: error.field,
        message: error.message,
      };
    } else if (error instanceof BusinessLogicError) {
      console.log(
        `❌ Business Logic Error: ${error.message} (Code: ${error.code})`
      );
      return {
        success: false,
        type: "business",
        code: error.code,
        message: error.message,
      };
    } else if (error instanceof NetworkError) {
      console.log(
        `❌ Network Error: ${error.message} (Status: ${error.statusCode})`
      );
      return {
        success: false,
        type: "network",
        statusCode: error.statusCode,
        message: error.message,
      };
    } else {
      console.log(`❌ Unexpected Error: ${error.message}`);
      return { success: false, type: "unknown", message: error.message };
    }
  }
}

// Test custom error handling
const testUsers = [
  { email: "valid@example.com", age: 25, username: "validuser" },
  { email: "", age: 25 }, // Missing email
  { email: "invalid-email", age: 25 }, // Invalid email
  { email: "minor@example.com", age: 16 }, // Too young
  { email: "existing@example.com", age: 25 }, // Already exists
  { email: "user@example.com", age: 25, username: "ab" }, // Username too short
];

testUsers.forEach((user, index) => {
  console.log(`\n--- Testing User ${index + 1} ---`);
  const result = processUserRegistration(user);
  console.log("Result:", result);
});
```

## 🔄 Async Error Handling

### Promises with Catch:

```javascript
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= 0) {
        reject(new Error("Invalid user ID"));
      } else if (userId === 404) {
        reject(new Error("User not found"));
      } else {
        resolve({
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`,
        });
      }
    }, 1000);
  });
}

// Promise error handling with .catch()
fetchUserData(123)
  .then((user) => {
    console.log("✅ User loaded:", user);
    return fetchUserData(user.id + 1); // Chain another request
  })
  .then((nextUser) => {
    console.log("✅ Next user loaded:", nextUser);
  })
  .catch((error) => {
    console.log("❌ Promise chain failed:", error.message);
  });

// Testing error scenarios
fetchUserData(404)
  .then((user) => console.log("User:", user))
  .catch((error) => console.log("❌ Error:", error.message));

fetchUserData(-1)
  .then((user) => console.log("User:", user))
  .catch((error) => console.log("❌ Error:", error.message));
```

### Async/Await Error Handling:

```javascript
async function loadUserProfile(userId) {
  try {
    console.log(`Loading profile for user ${userId}...`);

    // Fetch user basic info
    const user = await fetchUserData(userId);
    console.log("✅ User data loaded");

    // Fetch user posts
    const posts = await fetchUserPosts(userId);
    console.log("✅ User posts loaded");

    // Fetch user settings
    const settings = await fetchUserSettings(userId);
    console.log("✅ User settings loaded");

    return {
      user,
      posts,
      settings,
      profileComplete: true,
    };
  } catch (error) {
    console.log("❌ Failed to load complete profile:", error.message);

    // Try to load partial profile
    try {
      const user = await fetchUserData(userId);
      console.log("✅ Loaded partial profile (basic info only)");

      return {
        user,
        posts: [],
        settings: getDefaultSettings(),
        profileComplete: false,
      };
    } catch (fallbackError) {
      console.log("❌ Complete failure:", fallbackError.message);
      throw new Error(`Unable to load any data for user ${userId}`);
    }
  }
}

async function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error("Posts service unavailable"));
      } else {
        resolve([
          { id: 1, title: "First Post", content: "Hello world!" },
          { id: 2, title: "Second Post", content: "JavaScript is awesome!" },
        ]);
      }
    }, 800);
  });
}

async function fetchUserSettings(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.4) {
        reject(new Error("Settings service temporarily down"));
      } else {
        resolve({
          theme: "dark",
          notifications: true,
          language: "en",
        });
      }
    }, 600);
  });
}

function getDefaultSettings() {
  return {
    theme: "light",
    notifications: false,
    language: "en",
  };
}

// Test async error handling
async function testProfileLoading() {
  const userIds = [123, 456, 404, -1];

  for (const userId of userIds) {
    try {
      console.log(`\n--- Loading Profile ${userId} ---`);
      const profile = await loadUserProfile(userId);
      console.log("📋 Profile result:", {
        userName: profile.user.name,
        postsCount: profile.posts.length,
        isComplete: profile.profileComplete,
      });
    } catch (error) {
      console.log("💥 Final error:", error.message);
    }
  }
}

testProfileLoading();
```

## 🔧 Error Handling Best Practices

### Centralized Error Handling:

```javascript
class ErrorHandler {
  constructor() {
    this.errorLog = [];
    this.maxLogSize = 100;
  }

  logError(error, context = {}) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      message: error.message,
      name: error.name,
      stack: error.stack,
      context: context,
    };

    this.errorLog.push(errorEntry);

    // Keep log size manageable
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift();
    }

    console.error("Error logged:", errorEntry);
  }

  handleError(error, context = {}) {
    this.logError(error, context);

    // Different handling based on error type
    if (error instanceof ValidationError) {
      this.showUserFriendlyMessage("Please check your input and try again.");
    } else if (error instanceof NetworkError) {
      this.showUserFriendlyMessage(
        "Connection problem. Please check your internet and try again."
      );
    } else {
      this.showUserFriendlyMessage(
        "Something went wrong. Please try again later."
      );
    }
  }

  showUserFriendlyMessage(message) {
    // In real app, this would show a toast/modal
    console.log("🔔 User notification:", message);
  }

  getErrorReport() {
    return {
      totalErrors: this.errorLog.length,
      recentErrors: this.errorLog.slice(-10),
      errorsByType: this.getErrorsByType(),
    };
  }

  getErrorsByType() {
    const errorCounts = {};

    this.errorLog.forEach((entry) => {
      errorCounts[entry.name] = (errorCounts[entry.name] || 0) + 1;
    });

    return errorCounts;
  }

  clearLog() {
    this.errorLog = [];
    console.log("Error log cleared");
  }
}

// Global error handler instance
const errorHandler = new ErrorHandler();

// Example application with centralized error handling
class UserManager {
  constructor() {
    this.users = [];
  }

  async createUser(userData) {
    try {
      validateUser(userData);

      // Simulate API call
      if (Math.random() < 0.2) {
        throw new NetworkError("User creation service unavailable", 503);
      }

      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date(),
      };

      this.users.push(newUser);
      return newUser;
    } catch (error) {
      errorHandler.handleError(error, {
        operation: "createUser",
        userData: userData,
      });
      throw error; // Re-throw for caller to handle
    }
  }

  async deleteUser(userId) {
    try {
      const userIndex = this.users.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        throw new BusinessLogicError("User not found", "USER_NOT_FOUND");
      }

      // Simulate API call
      if (Math.random() < 0.15) {
        throw new NetworkError("Delete service temporarily unavailable", 503);
      }

      const deletedUser = this.users.splice(userIndex, 1)[0];
      return deletedUser;
    } catch (error) {
      errorHandler.handleError(error, {
        operation: "deleteUser",
        userId: userId,
      });
      throw error;
    }
  }

  getUsers() {
    return [...this.users];
  }
}

// Test centralized error handling
async function testUserManager() {
  const userManager = new UserManager();

  const testCases = [
    { email: "valid@example.com", age: 25 },
    { email: "", age: 25 }, // Invalid
    { email: "user2@example.com", age: 30 },
    { email: "user3@example.com", age: 22 },
  ];

  // Test user creation
  for (const userData of testCases) {
    try {
      const user = await userManager.createUser(userData);
      console.log("✅ User created:", user.email);
    } catch (error) {
      console.log("❌ User creation failed");
    }
  }

  // Test user deletion
  const users = userManager.getUsers();
  for (const user of users) {
    try {
      await userManager.deleteUser(user.id);
      console.log("✅ User deleted:", user.email);
    } catch (error) {
      console.log("❌ User deletion failed");
    }
  }

  // Show error report
  console.log("\n--- Error Report ---");
  console.log(errorHandler.getErrorReport());
}

testUserManager();
```

## 🎯 Key Concepts to Remember

1. **try/catch** prevents crashes and handles errors gracefully
2. **finally** always runs, perfect for cleanup
3. **Custom errors** provide better error categorization
4. **Async errors** need special handling with async/await
5. **Error logging** helps debug production issues
6. **User-friendly messages** improve user experience
7. **Centralized handling** keeps error management organized

## 🚀 What's Next?

Excellent! You now know how to build robust JavaScript applications that handle errors gracefully. Your code won't crash unexpectedly, and you can provide great user experiences even when things go wrong.

Next, we'll learn about **Error Types** - diving deeper into different kinds of errors, how to identify them, and specific strategies for handling each type. This will make you an expert at building bulletproof applications!

---

🛡️ **You're now protected against errors!** Error handling is what separates amateur code from professional applications. This knowledge will make your JavaScript applications much more reliable and user-friendly!
