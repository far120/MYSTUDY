# Callbacks - Functions as Parameters 📞

Welcome to **callbacks** - the traditional way JavaScript handles asynchronous operations! Understanding callbacks is crucial because they're the foundation for Promises and async/await. Think of callbacks as "call me back when you're done!"

## 🤔 What are Callbacks?

A **callback** is simply a function that gets called after another function finishes its work.

### Real-World Analogy: Pizza Delivery

```
You: "I'd like to order a pizza"
Pizza Shop: "Sure! What's your phone number?"
You: "555-1234" (this is your "callback")
Pizza Shop: "We'll call you back when it's ready!"

// 30 minutes later...
Pizza Shop calls 555-1234: "Your pizza is ready for pickup!"
```

In programming:

```javascript
function orderPizza(callback) {
  console.log("🍕 Making your pizza...");

  // Simulate pizza making time
  setTimeout(() => {
    console.log("🍕 Pizza is ready!");
    callback("Your delicious pizza"); // "Call back" with the result
  }, 3000);
}

function handlePizzaReady(pizza) {
  console.log("😋 Received:", pizza);
}

// Order pizza and provide callback
orderPizza(handlePizzaReady);
console.log("📱 Waiting for callback...");

// Output:
// 🍕 Making your pizza...
// 📱 Waiting for callback...
// (3 seconds later)
// 🍕 Pizza is ready!
// 😋 Received: Your delicious pizza
```

## 📝 Basic Callback Syntax

### Simple Callback Example:

```javascript
function greetUser(name, callback) {
  console.log("Processing greeting...");
  let greeting = `Hello, ${name}!`;
  callback(greeting); // Call the callback function
}

function displayGreeting(message) {
  console.log("📢", message);
}

function logGreeting(message) {
  console.log("📝 Log:", message);
}

// Same function, different callbacks
greetUser("Alice", displayGreeting); // 📢 Hello, Alice!
greetUser("Bob", logGreeting); // 📝 Log: Hello, Bob!
```

### Anonymous Callback Functions:

```javascript
function processData(data, callback) {
  console.log("Processing:", data);
  let result = data.toUpperCase();
  callback(result);
}

// Using anonymous function as callback
processData("hello world", function (result) {
  console.log("Result:", result); // Result: HELLO WORLD
});

// Using arrow function as callback
processData("javascript", (result) => {
  console.log("Arrow result:", result); // Arrow result: JAVASCRIPT
});
```

## ⏰ Asynchronous Callbacks

### setTimeout with Callbacks:

```javascript
function delayedMessage(message, delay, callback) {
  console.log(`⏰ Setting timer for ${delay}ms...`);

  setTimeout(() => {
    console.log("📨", message);
    callback("Message delivered!");
  }, delay);
}

delayedMessage("Hello World", 2000, function (status) {
  console.log("✅", status);
});

console.log("🚀 Timer started, continuing with other tasks...");

// Output:
// ⏰ Setting timer for 2000ms...
// 🚀 Timer started, continuing with other tasks...
// (2 seconds later)
// 📨 Hello World
// ✅ Message delivered!
```

### Multiple Callbacks:

```javascript
function fetchUserData(userId, onSuccess, onError) {
  console.log(`🔍 Fetching user ${userId}...`);

  setTimeout(() => {
    // Simulate API call
    if (userId > 0) {
      let userData = {
        id: userId,
        name: `User${userId}`,
        email: `user${userId}@example.com`,
      };
      onSuccess(userData); // Success callback
    } else {
      onError("Invalid user ID"); // Error callback
    }
  }, 1500);
}

// Success callback
function handleUserSuccess(user) {
  console.log("✅ User loaded:", user);
}

// Error callback
function handleUserError(error) {
  console.log("❌ Error:", error);
}

// Test with valid ID
fetchUserData(123, handleUserSuccess, handleUserError);

// Test with invalid ID
fetchUserData(-1, handleUserSuccess, handleUserError);
```

## 🧪 Practical Examples

### Example 1: File Processing Simulator

```javascript
function readFile(filename, callback) {
  console.log(`📖 Reading file: ${filename}`);

  setTimeout(() => {
    // Simulate file content
    let fileContent = `This is the content of ${filename}`;
    callback(null, fileContent); // (error, data) pattern
  }, 1000);
}

function processFile(content, callback) {
  console.log("⚙️ Processing file content...");

  setTimeout(() => {
    let processedContent = content.toUpperCase();
    callback(null, processedContent);
  }, 800);
}

function saveFile(content, filename, callback) {
  console.log(`💾 Saving to: ${filename}`);

  setTimeout(() => {
    console.log(`✅ File saved successfully!`);
    callback(null, "Save completed");
  }, 600);
}

// Chain operations with callbacks
readFile("input.txt", (error, content) => {
  if (error) {
    console.log("❌ Read error:", error);
    return;
  }

  processFile(content, (error, processedContent) => {
    if (error) {
      console.log("❌ Process error:", error);
      return;
    }

    saveFile(processedContent, "output.txt", (error, result) => {
      if (error) {
        console.log("❌ Save error:", error);
        return;
      }

      console.log("🎉 All operations completed!");
    });
  });
});
```

### Example 2: Download Manager

```javascript
function downloadFile(url, onProgress, onComplete, onError) {
  console.log(`📥 Starting download: ${url}`);

  let progress = 0;
  let downloadInterval = setInterval(() => {
    progress += Math.random() * 15 + 5; // Random progress 5-20%

    if (progress >= 100) {
      progress = 100;
      clearInterval(downloadInterval);

      // Simulate occasional errors
      if (Math.random() < 0.2) {
        // 20% chance of error
        onError("Download failed: Connection lost");
      } else {
        onComplete("Download completed successfully!");
      }
    } else {
      onProgress(Math.floor(progress));
    }
  }, 300);
}

function handleProgress(percentage) {
  let bar =
    "█".repeat(Math.floor(percentage / 5)) +
    "░".repeat(20 - Math.floor(percentage / 5));
  console.log(`📊 [${bar}] ${percentage}%`);
}

function handleComplete(message) {
  console.log("✅", message);
}

function handleError(error) {
  console.log("❌", error);
}

// Start download
downloadFile(
  "https://example.com/largefile.zip",
  handleProgress, // Progress callback
  handleComplete, // Success callback
  handleError // Error callback
);
```

### Example 3: User Authentication System

```javascript
function authenticateUser(username, password, callback) {
  console.log(`🔐 Authenticating user: ${username}`);

  setTimeout(() => {
    // Simulate authentication check
    let validUsers = {
      alice: "password123",
      bob: "secret456",
      charlie: "mypass789",
    };

    if (validUsers[username] && validUsers[username] === password) {
      let userProfile = {
        username: username,
        role: username === "alice" ? "admin" : "user",
        lastLogin: new Date(),
      };
      callback(null, userProfile);
    } else {
      callback("Invalid username or password");
    }
  }, 1500);
}

function getUserPermissions(userProfile, callback) {
  console.log(`🔑 Getting permissions for: ${userProfile.username}`);

  setTimeout(() => {
    let permissions =
      userProfile.role === "admin"
        ? ["read", "write", "delete", "admin"]
        : ["read", "write"];

    callback(null, permissions);
  }, 500);
}

function loadUserDashboard(userProfile, permissions, callback) {
  console.log(`📊 Loading dashboard for: ${userProfile.username}`);

  setTimeout(() => {
    let dashboard = {
      user: userProfile,
      permissions: permissions,
      dashboardData: "Dashboard content loaded",
    };
    callback(null, dashboard);
  }, 800);
}

// Complete authentication flow
function loginUser(username, password) {
  authenticateUser(username, password, (error, userProfile) => {
    if (error) {
      console.log("❌ Login failed:", error);
      return;
    }

    console.log("✅ Authentication successful!");

    getUserPermissions(userProfile, (error, permissions) => {
      if (error) {
        console.log("❌ Permission error:", error);
        return;
      }

      console.log("🔑 Permissions loaded:", permissions);

      loadUserDashboard(userProfile, permissions, (error, dashboard) => {
        if (error) {
          console.log("❌ Dashboard error:", error);
          return;
        }

        console.log("🎉 Login complete! Welcome,", dashboard.user.username);
        console.log(
          "🏠 Dashboard loaded with permissions:",
          dashboard.permissions
        );
      });
    });
  });
}

// Test the login system
loginUser("alice", "password123"); // Should succeed
setTimeout(() => {
  loginUser("bob", "wrongpassword"); // Should fail
}, 5000);
```

## 🎮 Interactive Exercises

### Exercise 1: Cooking Timer System

```javascript
function cookDish(dishName, cookingTime, callback) {
  console.log(`👨‍🍳 Started cooking: ${dishName} (${cookingTime}ms)`);

  setTimeout(() => {
    console.log(`🍽️ ${dishName} is ready!`);
    callback(dishName);
  }, cookingTime);
}

function serveDish(dishName) {
  console.log(`🍽️ Serving: ${dishName}`);
}

// Cook multiple dishes
console.log("🏠 Starting dinner preparation...");

cookDish("Pasta", 2000, serveDish);
cookDish("Salad", 1000, serveDish);
cookDish("Bread", 1500, serveDish);

setTimeout(() => {
  console.log("🎉 Dinner is served!");
}, 3000);
```

### Exercise 2: Event Registration System

```javascript
function registerForEvent(eventName, attendeeName, callback) {
  console.log(`📝 Registering ${attendeeName} for ${eventName}...`);

  setTimeout(() => {
    // Simulate registration process
    let registrationId = Math.floor(Math.random() * 10000);
    let confirmation = {
      eventName: eventName,
      attendeeName: attendeeName,
      registrationId: registrationId,
      registrationDate: new Date(),
    };

    callback(null, confirmation);
  }, 1000);
}

function sendConfirmationEmail(confirmation, callback) {
  console.log(
    `📧 Sending confirmation email to ${confirmation.attendeeName}...`
  );

  setTimeout(() => {
    console.log(
      `✅ Email sent! Registration ID: ${confirmation.registrationId}`
    );
    callback(null, "Email sent successfully");
  }, 500);
}

function addToCalendar(confirmation, callback) {
  console.log(`📅 Adding ${confirmation.eventName} to calendar...`);

  setTimeout(() => {
    console.log(`📅 Event added to calendar!`);
    callback(null, "Calendar updated");
  }, 300);
}

// Complete registration process
function completeRegistration(eventName, attendeeName) {
  registerForEvent(eventName, attendeeName, (error, confirmation) => {
    if (error) {
      console.log("❌ Registration failed:", error);
      return;
    }

    console.log("✅ Registration successful!");

    // Send email and add to calendar in parallel
    sendConfirmationEmail(confirmation, (error, result) => {
      if (error) {
        console.log("❌ Email error:", error);
      } else {
        console.log("📧", result);
      }
    });

    addToCalendar(confirmation, (error, result) => {
      if (error) {
        console.log("❌ Calendar error:", error);
      } else {
        console.log("📅", result);
      }
    });
  });
}

// Test registration
completeRegistration("JavaScript Workshop", "Alice");
```

### Exercise 3: Simple Game with Callbacks

```javascript
function rollDice(callback) {
  console.log("🎲 Rolling dice...");

  setTimeout(() => {
    let roll = Math.floor(Math.random() * 6) + 1;
    console.log(`🎲 You rolled: ${roll}`);
    callback(roll);
  }, 500);
}

function playGame(playerName, targetScore, callback) {
  console.log(`🎮 ${playerName} is playing! Target score: ${targetScore}`);

  let totalScore = 0;
  let rollCount = 0;

  function takeRoll() {
    rollDice((roll) => {
      rollCount++;
      totalScore += roll;

      console.log(`📊 ${playerName}: Roll ${rollCount}, Total: ${totalScore}`);

      if (totalScore >= targetScore) {
        console.log(`🏆 ${playerName} wins in ${rollCount} rolls!`);
        callback(null, {
          player: playerName,
          rolls: rollCount,
          score: totalScore,
        });
      } else if (rollCount >= 10) {
        console.log(`😞 ${playerName} didn't reach target in 10 rolls`);
        callback("Game over - too many rolls");
      } else {
        // Continue playing
        setTimeout(takeRoll, 1000);
      }
    });
  }

  takeRoll(); // Start the game
}

// Play game
playGame("Alice", 20, (error, result) => {
  if (error) {
    console.log("❌ Game ended:", error);
  } else {
    console.log("🎉 Game completed:", result);
  }
});
```

## ⚠️ The Problem with Callbacks: "Callback Hell"

As you chain more callbacks, code becomes harder to read:

```javascript
// This is "Callback Hell" - hard to read and maintain
getData(function (a) {
  getMoreData(a, function (b) {
    getEvenMoreData(b, function (c) {
      getFinalData(c, function (d) {
        // Finally got the data we need
        console.log("Result:", d);
      });
    });
  });
});
```

**Problems with deep callback nesting:**

- 😵 **Hard to read** - Code grows horizontally
- 🐛 **Hard to debug** - Error tracking is complex
- 🔄 **Hard to modify** - Changes require restructuring
- ❌ **Error handling** - Must be repeated at each level

## 🎯 Key Concepts to Remember

1. **Callbacks are functions** passed as parameters to other functions
2. **Asynchronous callbacks** don't block the main thread
3. **Error-first pattern** - callback(error, result) is common
4. **Multiple callbacks** can handle success/error cases
5. **Callback hell** makes code hard to maintain
6. **Order matters** - Callbacks execute when operations complete

## 💡 When to Use Callbacks

### ✅ Good for Callbacks:

- **Simple async operations** - Single file read, API call
- **Event handlers** - Button clicks, form submissions
- **Small utility functions** - Array.map(), Array.filter()
- **Legacy code** - Working with older libraries

### ❌ Consider Alternatives:

- **Complex async flows** - Use Promises or async/await
- **Multiple dependent operations** - Chain becomes unreadable
- **Error handling** - Promises have better error handling
- **Modern applications** - Async/await is preferred

## 🚀 What's Next?

Great job! You now understand callbacks - the foundation of asynchronous JavaScript. You've seen how powerful they are, but also how complex they can become.

Next, we'll learn about **Promises** - a modern solution that solves callback hell and makes asynchronous code much cleaner and easier to manage!

---

📞 **You've mastered the callback pattern!** While Promises and async/await are more modern, callbacks are still everywhere in JavaScript. Understanding them deeply makes you a better programmer and helps you work with any JavaScript codebase!
