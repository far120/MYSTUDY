# Promises - Better Async Handling 🤝

Welcome to **Promises** - the modern solution to callback hell! Promises make asynchronous code cleaner, more readable, and easier to debug. Think of them as "I promise to give you a result later!"

## 🤔 What are Promises?

A **Promise** represents a value that will be available in the future. It's like a receipt you get when ordering food - it promises you'll get your meal, but not immediately.

### Real-World Analogy: Online Shopping

```
You: Order a laptop online
Store: "We promise to deliver it within 3 days"

3 possibilities:
✅ FULFILLED: Laptop arrives on time
❌ REJECTED: Out of stock, order cancelled
⏳ PENDING: Still processing/shipping
```

### Promise vs Callback Comparison:

**Callback Hell:**

```javascript
getData(function (a) {
  getMoreData(a, function (b) {
    getEvenMoreData(b, function (c) {
      console.log("Final result:", c);
    });
  });
});
```

**Promise Chain:**

```javascript
getData()
  .then((a) => getMoreData(a))
  .then((b) => getEvenMoreData(b))
  .then((c) => console.log("Final result:", c))
  .catch((error) => console.log("Error:", error));
```

## 📝 Creating Promises

### Basic Promise Syntax:

```javascript
let myPromise = new Promise((resolve, reject) => {
  // Do some asynchronous work
  let success = true;

  if (success) {
    resolve("Operation successful!"); // Promise fulfilled
  } else {
    reject("Operation failed!"); // Promise rejected
  }
});

// Using the promise
myPromise
  .then((result) => console.log("✅", result))
  .catch((error) => console.log("❌", error));
```

### Promise States:

```javascript
function createPromiseExample(willSucceed) {
  return new Promise((resolve, reject) => {
    console.log("🔄 Promise is PENDING...");

    setTimeout(() => {
      if (willSucceed) {
        console.log("✅ Promise FULFILLED");
        resolve("Success data");
      } else {
        console.log("❌ Promise REJECTED");
        reject("Error occurred");
      }
    }, 2000);
  });
}

// Test successful promise
createPromiseExample(true)
  .then((data) => console.log("Received:", data))
  .catch((error) => console.log("Error:", error));

// Test failed promise
createPromiseExample(false)
  .then((data) => console.log("Received:", data))
  .catch((error) => console.log("Error:", error));
```

## ⏰ Converting Callbacks to Promises

### Before (Callback):

```javascript
function fetchUserCallback(userId, callback) {
  setTimeout(() => {
    if (userId > 0) {
      callback(null, { id: userId, name: `User${userId}` });
    } else {
      callback("Invalid user ID");
    }
  }, 1000);
}

// Usage with callback
fetchUserCallback(123, (error, user) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("User:", user);
  }
});
```

### After (Promise):

```javascript
function fetchUserPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: `User${userId}` });
      } else {
        reject("Invalid user ID");
      }
    }, 1000);
  });
}

// Usage with promise
fetchUserPromise(123)
  .then((user) => console.log("User:", user))
  .catch((error) => console.log("Error:", error));
```

## 🔗 Promise Chaining

### Sequential Operations:

```javascript
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: id, name: `User${id}` });
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        `Post 1 by User${userId}`,
        `Post 2 by User${userId}`,
        `Post 3 by User${userId}`,
      ]);
    }, 800);
  });
}

function fetchPostComments(post) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`Comment 1 on "${post}"`, `Comment 2 on "${post}"`]);
    }, 500);
  });
}

// Chain promises together
fetchUser(1)
  .then((user) => {
    console.log("👤 User:", user);
    return fetchUserPosts(user.id); // Return promise for chaining
  })
  .then((posts) => {
    console.log("📝 Posts:", posts);
    return fetchPostComments(posts[0]); // Get comments for first post
  })
  .then((comments) => {
    console.log("💬 Comments:", comments);
  })
  .catch((error) => {
    console.log("❌ Chain error:", error);
  });
```

### Returning Values vs Promises:

```javascript
function promiseChainExample() {
  return Promise.resolve(10)
    .then((value) => {
      console.log("Step 1:", value); // 10
      return value * 2; // Return regular value
    })
    .then((value) => {
      console.log("Step 2:", value); // 20
      // Return a promise
      return new Promise((resolve) => {
        setTimeout(() => resolve(value + 5), 1000);
      });
    })
    .then((value) => {
      console.log("Step 3:", value); // 25
      return value.toString(); // Return regular value
    })
    .then((value) => {
      console.log("Final:", value); // "25"
    });
}

promiseChainExample();
```

## 🧪 Practical Examples

### Example 1: File Processing Pipeline

```javascript
function readFile(filename) {
  return new Promise((resolve, reject) => {
    console.log(`📖 Reading: ${filename}`);
    setTimeout(() => {
      if (filename.endsWith(".txt")) {
        resolve(`Content of ${filename}`);
      } else {
        reject(`Cannot read ${filename} - not a text file`);
      }
    }, 1000);
  });
}

function processContent(content) {
  return new Promise((resolve) => {
    console.log("⚙️ Processing content...");
    setTimeout(() => {
      let processed = content.toUpperCase() + " [PROCESSED]";
      resolve(processed);
    }, 800);
  });
}

function saveFile(content, filename) {
  return new Promise((resolve, reject) => {
    console.log(`💾 Saving to: ${filename}`);
    setTimeout(() => {
      if (filename) {
        resolve(`Saved to ${filename} successfully`);
      } else {
        reject("No filename provided");
      }
    }, 600);
  });
}

// Process file pipeline
readFile("input.txt")
  .then((content) => {
    console.log("✅ Read complete");
    return processContent(content);
  })
  .then((processedContent) => {
    console.log("✅ Processing complete");
    return saveFile(processedContent, "output.txt");
  })
  .then((result) => {
    console.log("🎉 Pipeline complete:", result);
  })
  .catch((error) => {
    console.log("❌ Pipeline failed:", error);
  });
```

### Example 2: API Data Fetcher

```javascript
function fetchFromAPI(endpoint, delay = 1000) {
  return new Promise((resolve, reject) => {
    console.log(`🌐 Fetching: ${endpoint}`);

    setTimeout(() => {
      // Simulate API responses
      const responses = {
        "/users": [
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ],
        "/posts": [
          { id: 1, title: "Hello World", userId: 1 },
          { id: 2, title: "JavaScript Tips", userId: 2 },
        ],
        "/comments": [
          { id: 1, text: "Great post!", postId: 1 },
          { id: 2, text: "Very helpful", postId: 2 },
        ],
      };

      if (responses[endpoint]) {
        resolve(responses[endpoint]);
      } else {
        reject(`Endpoint ${endpoint} not found`);
      }
    }, delay);
  });
}

function buildUserProfile(userId) {
  let userProfile = {};

  return fetchFromAPI("/users")
    .then((users) => {
      let user = users.find((u) => u.id === userId);
      if (!user) throw new Error("User not found");

      userProfile.user = user;
      console.log(`👤 Found user: ${user.name}`);

      return fetchFromAPI("/posts");
    })
    .then((posts) => {
      userProfile.posts = posts.filter((p) => p.userId === userId);
      console.log(`📝 Found ${userProfile.posts.length} posts`);

      return fetchFromAPI("/comments");
    })
    .then((comments) => {
      let userPostIds = userProfile.posts.map((p) => p.id);
      userProfile.comments = comments.filter((c) =>
        userPostIds.includes(c.postId)
      );
      console.log(`💬 Found ${userProfile.comments.length} comments`);

      return userProfile;
    });
}

// Build complete user profile
buildUserProfile(1)
  .then((profile) => {
    console.log("🎉 Complete profile:", profile);
  })
  .catch((error) => {
    console.log("❌ Profile error:", error.message);
  });
```

### Example 3: Download Manager with Progress

```javascript
function downloadWithProgress(url, filename) {
  return new Promise((resolve, reject) => {
    console.log(`📥 Starting download: ${filename}`);

    let progress = 0;
    let downloadData = "";

    let downloadInterval = setInterval(() => {
      progress += Math.random() * 10 + 5; // 5-15% progress
      downloadData += "█".repeat(Math.floor(progress / 10));

      console.log(`📊 ${filename}: ${Math.floor(progress)}% [${downloadData}]`);

      if (progress >= 100) {
        clearInterval(downloadInterval);

        // Simulate occasional failures
        if (Math.random() < 0.1) {
          // 10% failure rate
          reject(new Error(`Download failed: ${filename}`));
        } else {
          resolve({
            url: url,
            filename: filename,
            size: Math.floor(Math.random() * 1000) + 100,
            downloadTime: Date.now(),
          });
        }
      }
    }, 200);
  });
}

function downloadMultipleFiles(downloads) {
  console.log(`🚀 Starting ${downloads.length} downloads...`);

  // Process downloads one by one
  let downloadChain = Promise.resolve();
  let results = [];

  downloads.forEach((download) => {
    downloadChain = downloadChain
      .then(() => downloadWithProgress(download.url, download.filename))
      .then((result) => {
        results.push(result);
        console.log(`✅ Completed: ${result.filename}`);
      })
      .catch((error) => {
        console.log(`❌ Failed: ${error.message}`);
        results.push({ error: error.message });
      });
  });

  return downloadChain.then(() => results);
}

// Download multiple files
const filesToDownload = [
  { url: "http://example.com/file1.zip", filename: "file1.zip" },
  { url: "http://example.com/file2.pdf", filename: "file2.pdf" },
  { url: "http://example.com/file3.mp4", filename: "file3.mp4" },
];

downloadMultipleFiles(filesToDownload).then((results) => {
  console.log("🎉 All downloads completed!");
  console.log("📋 Results:", results);
});
```

## 🔄 Promise Utility Methods

### Promise.all() - Wait for All

```javascript
function quickTask(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ ${name} completed`);
      resolve(`${name} result`);
    }, delay);
  });
}

console.log("🚀 Starting parallel tasks...");

Promise.all([
  quickTask("Task A", 1000),
  quickTask("Task B", 1500),
  quickTask("Task C", 800),
])
  .then((results) => {
    console.log("🎉 All tasks completed!", results);
    // Results: ["Task A result", "Task B result", "Task C result"]
  })
  .catch((error) => {
    console.log("❌ One task failed:", error);
  });

// All tasks run in parallel, Promise.all waits for the slowest one
```

### Promise.race() - First to Finish

```javascript
function raceTask(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} finished first!`);
    }, delay);
  });
}

console.log("🏁 Starting race...");

Promise.race([
  raceTask("Runner A", 1000),
  raceTask("Runner B", 1500),
  raceTask("Runner C", 800),
]).then((winner) => {
  console.log("🏆 Winner:", winner); // "Runner C finished first!"
});
```

### Promise.allSettled() - All Results (Success or Failure)

```javascript
function maybeFailTask(name, delay, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(`${name} failed`);
      } else {
        resolve(`${name} succeeded`);
      }
    }, delay);
  });
}

Promise.allSettled([
  maybeFailTask("Task 1", 1000, false),
  maybeFailTask("Task 2", 1200, true), // This will fail
  maybeFailTask("Task 3", 800, false),
]).then((results) => {
  console.log("📊 All tasks settled:");
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`✅ Task ${index + 1}:`, result.value);
    } else {
      console.log(`❌ Task ${index + 1}:`, result.reason);
    }
  });
});
```

## 🎮 Interactive Exercises

### Exercise 1: Promise-based Timer

```javascript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function countdownPromise(seconds) {
  console.log(`⏰ Countdown starting: ${seconds} seconds`);

  if (seconds <= 0) {
    return Promise.resolve("🎉 Countdown complete!");
  }

  console.log(`⏱️ ${seconds}`);

  return delay(1000).then(() => countdownPromise(seconds - 1));
}

// Test the countdown
countdownPromise(5).then((message) => console.log(message));
```

### Exercise 2: Restaurant Order System

```javascript
function prepareFood(dishName, prepTime) {
  return new Promise((resolve, reject) => {
    console.log(`👨‍🍳 Started preparing: ${dishName}`);

    setTimeout(() => {
      // 5% chance of running out of ingredients
      if (Math.random() < 0.05) {
        reject(new Error(`Sorry, we're out of ingredients for ${dishName}`));
      } else {
        console.log(`🍽️ ${dishName} is ready!`);
        resolve({
          dish: dishName,
          prepTime: prepTime,
          quality: Math.random() > 0.8 ? "excellent" : "good",
        });
      }
    }, prepTime);
  });
}

function processOrder(orderItems) {
  console.log("📋 Processing order...", orderItems);

  // Prepare all items in parallel
  let preparations = orderItems.map((item) =>
    prepareFood(item.name, item.time).catch((error) => ({
      error: error.message,
      dish: item.name,
    }))
  );

  return Promise.all(preparations).then((results) => {
    let successful = results.filter((r) => !r.error);
    let failed = results.filter((r) => r.error);

    return {
      successful: successful,
      failed: failed,
      totalItems: results.length,
    };
  });
}

// Test order system
const order = [
  { name: "Pasta", time: 2000 },
  { name: "Salad", time: 1000 },
  { name: "Pizza", time: 3000 },
  { name: "Soup", time: 1500 },
];

processOrder(order).then((result) => {
  console.log("🎉 Order completed!");
  console.log(`✅ Successful: ${result.successful.length}`);
  console.log(`❌ Failed: ${result.failed.length}`);

  if (result.failed.length > 0) {
    console.log("Failed items:", result.failed);
  }
});
```

### Exercise 3: Social Media Feed Loader

```javascript
function fetchProfile(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= 0) {
        reject(new Error("Invalid user ID"));
        return;
      }

      resolve({
        id: userId,
        name: `User ${userId}`,
        avatar: `avatar${userId}.jpg`,
        followers: Math.floor(Math.random() * 1000),
      });
    }, 500);
  });
}

function fetchPosts(userId, limit = 5) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let posts = [];
      for (let i = 1; i <= limit; i++) {
        posts.push({
          id: i,
          userId: userId,
          content: `Post ${i} by User ${userId}`,
          likes: Math.floor(Math.random() * 100),
          timestamp: new Date(Date.now() - i * 3600000), // Hours ago
        });
      }
      resolve(posts);
    }, 800);
  });
}

function fetchNotifications(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let notifications = [
        `User ${userId + 1} liked your post`,
        `User ${userId + 2} started following you`,
        `Your post received 5 new likes`,
      ];
      resolve(notifications);
    }, 300);
  });
}

function loadUserFeed(userId) {
  console.log(`📱 Loading feed for user ${userId}...`);

  // Load profile first, then posts and notifications in parallel
  return fetchProfile(userId)
    .then((profile) => {
      console.log(`👤 Profile loaded: ${profile.name}`);

      // Load posts and notifications in parallel
      return Promise.all([
        Promise.resolve(profile), // Pass profile through
        fetchPosts(userId),
        fetchNotifications(userId),
      ]);
    })
    .then(([profile, posts, notifications]) => {
      return {
        profile: profile,
        posts: posts,
        notifications: notifications,
        loadedAt: new Date(),
      };
    });
}

// Load feed for user
loadUserFeed(123)
  .then((feed) => {
    console.log("🎉 Feed loaded successfully!");
    console.log(
      `📊 ${feed.posts.length} posts, ${feed.notifications.length} notifications`
    );
    console.log("Feed data:", feed);
  })
  .catch((error) => {
    console.log("❌ Feed loading failed:", error.message);
  });
```

## ⚠️ Common Promise Mistakes

### 1. Forgetting to Return Promises

```javascript
// Wrong: Promise chain breaks
fetchUser(1)
  .then((user) => {
    fetchUserPosts(user.id); // Missing return!
  })
  .then((posts) => {
    console.log(posts); // undefined!
  });

// Right: Return the promise
fetchUser(1)
  .then((user) => {
    return fetchUserPosts(user.id); // Return the promise
  })
  .then((posts) => {
    console.log(posts); // Works correctly
  });
```

### 2. Not Handling Errors

```javascript
// Wrong: Unhandled promise rejection
fetchData().then((data) => console.log(data)); // What if fetchData fails?

// Right: Always handle errors
fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.log("Error:", error));
```

### 3. Creating Unnecessary Promises

```javascript
// Wrong: Wrapping promises in promises
function unnecessaryWrapper() {
  return new Promise((resolve, reject) => {
    fetchData()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// Right: Just return the existing promise
function simpleWrapper() {
  return fetchData(); // fetchData already returns a promise
}
```

## 🎯 Key Concepts to Remember

1. **Promises have 3 states**: pending, fulfilled, rejected
2. **.then()** handles success, **.catch()** handles errors
3. **Chain promises** with .then() for sequential operations
4. **Return values or promises** from .then() to continue chain
5. **Promise.all()** waits for all, **Promise.race()** waits for first
6. **Always handle errors** with .catch()
7. **Promises are immutable** - they can't change once settled

## 💡 When to Use Promises

### ✅ Perfect for Promises:

- **API calls** - Fetch data from servers
- **File operations** - Read/write files
- **Database queries** - Async database operations
- **Sequential async tasks** - Operations that depend on each other

### 🚀 Even Better with Async/Await:

- **Complex async flows** - Multiple sequential operations
- **Error handling** - Try/catch is cleaner than .catch()
- **Conditional async logic** - If/else with async operations

## 🚀 What's Next?

Excellent! You now understand Promises - a huge improvement over callbacks. You can chain operations cleanly and handle errors elegantly.

Next, we'll learn about **async/await** - the modern syntax that makes Promise-based code look and feel like regular synchronous code. It's the final piece of the asynchronous programming puzzle!

---

🤝 **You've mastered Promises!** This is a major milestone in your JavaScript journey. Promises are the foundation of modern async JavaScript, and understanding them deeply will make you a much more effective developer!
