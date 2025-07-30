# 24. Spread and Rest - Flexible Data Handling 🌟

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- What spread and rest operators are and their different uses
- Spread operator for arrays, objects, and function calls
- Rest operator for function parameters and destructuring
- Practical applications for copying, merging, and parameter handling
- Real-world examples and best practices

## 🤔 What Are Spread and Rest Operators?

The spread (`...`) and rest (`...`) operators both use the same three-dot syntax but serve different purposes:

- **Spread operator**: Expands (spreads) array elements or object properties
- **Rest operator**: Collects multiple elements into an array or object

**Think of it as**: Spread = "unpack the box", Rest = "pack into a box"

```javascript
console.log("=== SPREAD VS REST INTRODUCTION ===");

// Spread: Takes an array and spreads its elements
let numbers = [1, 2, 3];
let spreadExample = [0, ...numbers, 4, 5]; // [0, 1, 2, 3, 4, 5]
console.log("Spread array:", spreadExample);

// Rest: Collects multiple arguments into an array
function restExample(first, ...remaining) {
  console.log("First:", first); // 1
  console.log("Rest:", remaining); // [2, 3, 4, 5]
}
restExample(1, 2, 3, 4, 5);

// Spread with objects
let person = { name: "Alice", age: 25 };
let employee = { ...person, job: "Developer" };
console.log("Spread object:", employee);
```

## 📦 Spread Operator

### 1. Array Spreading

```javascript
console.log("=== ARRAY SPREADING ===");

let fruits = ["apple", "banana"];
let vegetables = ["carrot", "broccoli"];
let dairy = ["milk", "cheese"];

// Combining arrays
let groceries = [...fruits, ...vegetables, ...dairy];
console.log("Combined groceries:", groceries);

// Adding elements while spreading
let extendedGroceries = ["bread", ...fruits, "eggs", ...vegetables];
console.log("Extended groceries:", extendedGroceries);

// Copying arrays (shallow copy)
let originalArray = [1, 2, 3, 4, 5];
let copiedArray = [...originalArray];
copiedArray.push(6);

console.log("Original:", originalArray); // [1, 2, 3, 4, 5]
console.log("Copied:", copiedArray); // [1, 2, 3, 4, 5, 6]

// Converting NodeList or string to array
let lettersArray = [..."hello"];
console.log("String to array:", lettersArray); // ['h', 'e', 'l', 'l', 'o']

// Finding max/min with spread
let scores = [85, 92, 78, 96, 88];
let maxScore = Math.max(...scores);
let minScore = Math.min(...scores);
console.log("Max score:", maxScore);
console.log("Min score:", minScore);

// Inserting array elements into another array
let numbers = [1, 2, 3];
let moreNumbers = [4, 5, 6];
// Insert moreNumbers after index 1
let result = [
  ...numbers.slice(0, 2), // [1, 2]
  ...moreNumbers, // [4, 5, 6]
  ...numbers.slice(2), // [3]
];
console.log("Inserted array:", result); // [1, 2, 4, 5, 6, 3]
```

### 2. Object Spreading

```javascript
console.log("=== OBJECT SPREADING ===");

let baseUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};

let preferences = {
  theme: "dark",
  notifications: true,
  language: "en",
};

// Merging objects
let completeUser = { ...baseUser, ...preferences };
console.log("Merged user:", completeUser);

// Overriding properties
let updatedUser = {
  ...baseUser,
  name: "John Smith", // Override name
  isActive: true, // Add new property
};
console.log("Updated user:", updatedUser);

// Order matters in object spreading
let config1 = { ...baseUser, name: "Override" };
let config2 = { name: "Override", ...baseUser };
console.log("Override after spread:", config1.name); // "Override"
console.log("Override before spread:", config2.name); // "John Doe"

// Nested object handling (shallow copy)
let userWithAddress = {
  ...baseUser,
  address: {
    street: "123 Main St",
    city: "Boston",
  },
};

let modifiedUser = {
  ...userWithAddress,
  address: {
    ...userWithAddress.address,
    city: "New York", // Only change city, keep street
  },
};

console.log("Modified address:", modifiedUser);

// Conditional spreading
let isAdmin = true;
let userWithRole = {
  ...baseUser,
  ...(isAdmin && { role: "admin", permissions: ["read", "write", "delete"] }),
};
console.log("User with conditional role:", userWithRole);

// Removing properties using destructuring and rest
let { email, ...userWithoutEmail } = baseUser;
console.log("User without email:", userWithoutEmail);
```

### 3. Function Call Spreading

```javascript
console.log("=== FUNCTION CALL SPREADING ===");

function greet(greeting, firstName, lastName) {
  return `${greeting}, ${firstName} ${lastName}!`;
}

let nameArgs = ["Hello", "Alice", "Johnson"];
let message = greet(...nameArgs);
console.log("Greeting:", message);

// Date constructor with spread
let dateNumbers = [2024, 2, 15]; // Year, month (0-indexed), day
let myDate = new Date(...dateNumbers);
console.log("Created date:", myDate.toDateString());

// Array methods with spread
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

// Push multiple elements
arr1.push(...arr2);
console.log("After push with spread:", arr1);

// Math functions
let values = [10, 20, 5, 15, 30];
console.log(
  "Sum:",
  values.reduce((a, b) => a + b)
);
console.log("Average:", values.reduce((a, b) => a + b) / values.length);
console.log("Max:", Math.max(...values));
console.log("Min:", Math.min(...values));

// Custom function with variable arguments
function logMultiple(...items) {
  items.forEach((item, index) => {
    console.log(`Item ${index + 1}: ${item}`);
  });
}

let things = ["apple", "banana", "cherry"];
logMultiple(...things);
```

## 🎒 Rest Operator

### 1. Function Parameters (Rest Parameters)

```javascript
console.log("=== REST PARAMETERS ===");

// Collecting unlimited arguments
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log("Sum of 3 numbers:", sum(1, 2, 3));
console.log("Sum of 5 numbers:", sum(1, 2, 3, 4, 5));
console.log("Sum of many numbers:", sum(10, 20, 30, 40, 50, 60));

// Mixed parameters (rest must be last)
function introduce(greeting, ...names) {
  return `${greeting} ${names.join(", ")}!`;
}

console.log("Introduction:", introduce("Hello", "Alice", "Bob", "Charlie"));

// Processing function arguments
function processOrder(orderId, ...items) {
  console.log(`Processing order ${orderId}:`);
  console.log(`Items ordered: ${items.length}`);

  items.forEach((item, index) => {
    console.log(`  ${index + 1}. ${item}`);
  });

  return {
    orderId,
    items,
    total: items.length * 10, // Simplified pricing
  };
}

let order = processOrder("ORD-001", "laptop", "mouse", "keyboard", "monitor");
console.log("Order result:", order);

// Mathematical operations with rest
function calculate(operation, ...numbers) {
  switch (operation) {
    case "add":
      return numbers.reduce((sum, num) => sum + num, 0);
    case "multiply":
      return numbers.reduce((product, num) => product * num, 1);
    case "average":
      return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    case "max":
      return Math.max(...numbers);
    case "min":
      return Math.min(...numbers);
    default:
      return "Unknown operation";
  }
}

console.log("Add:", calculate("add", 1, 2, 3, 4, 5));
console.log("Multiply:", calculate("multiply", 2, 3, 4));
console.log("Average:", calculate("average", 10, 20, 30, 40));
console.log("Max:", calculate("max", 5, 15, 3, 9, 12));
```

### 2. Array Destructuring with Rest

```javascript
console.log("=== ARRAY DESTRUCTURING WITH REST ===");

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get first, second, and rest
let [first, second, ...rest] = numbers;
console.log("First:", first);
console.log("Second:", second);
console.log("Rest:", rest);

// Get first and last, ignore middle
let [firstNum, ...middle] = numbers;
let lastNum = middle.pop();
console.log("First number:", firstNum);
console.log("Last number:", lastNum);
console.log("Middle numbers:", middle);

// Working with function return values
function getScores() {
  return [95, 87, 92, 78, 89, 94];
}

let [topScore, ...otherScores] = getScores();
console.log("Top score:", topScore);
console.log("Other scores:", otherScores);
console.log(
  "Average of other scores:",
  otherScores.reduce((sum, score) => sum + score, 0) / otherScores.length
);

// Skipping elements with rest
let colors = ["red", "green", "blue", "yellow", "purple"];
let [primary, , , ...remaining] = colors;
console.log("Primary color:", primary);
console.log("Remaining colors:", remaining);
```

### 3. Object Destructuring with Rest

```javascript
console.log("=== OBJECT DESTRUCTURING WITH REST ===");

let employee = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@company.com",
  department: "Engineering",
  salary: 75000,
  benefits: ["health", "dental", "401k"],
  startDate: "2022-01-15",
  manager: "Sarah Wilson",
};

// Extract specific properties, collect rest
let { name, email, ...employeeDetails } = employee;
console.log("Basic info:", { name, email });
console.log("Other details:", employeeDetails);

// Extract multiple specific properties
let { id, salary, benefits, ...publicInfo } = employee;
console.log("Confidential:", { id, salary, benefits });
console.log("Public info:", publicInfo);

// Nested destructuring with rest
let project = {
  id: 101,
  title: "Website Redesign",
  status: "in-progress",
  team: {
    lead: "Alice",
    developers: ["Bob", "Charlie"],
    designers: ["Diana"],
  },
  timeline: {
    start: "2024-01-01",
    end: "2024-06-01",
  },
  budget: 50000,
  client: "TechCorp",
};

let {
  title,
  team: { lead, ...teamMembers },
  ...projectDetails
} = project;

console.log("Project title:", title);
console.log("Team lead:", lead);
console.log("Other team members:", teamMembers);
console.log("Project details:", projectDetails);

// Function parameter destructuring with rest
function updateUserProfile({ id, name, ...updates }) {
  console.log(`Updating profile for ${name} (ID: ${id})`);
  console.log("Updates:", updates);

  return {
    id,
    name,
    ...updates,
    lastModified: new Date().toISOString(),
  };
}

let userUpdates = {
  id: 123,
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1-555-123-4567",
  preferences: { theme: "dark", notifications: true },
};

let updatedProfile = updateUserProfile(userUpdates);
console.log("Updated profile:", updatedProfile);
```

## 🎯 Real-World Examples

### Example 1: API Request Builder

```javascript
function createApiRequestBuilder() {
  console.log("=== API REQUEST BUILDER ===");

  const baseConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: 5000,
  };

  function buildRequest(url, options = {}) {
    // Extract specific options, collect rest as custom options
    const {
      method,
      headers = {},
      body,
      timeout,
      auth,
      ...customOptions
    } = options;

    // Build final configuration
    const config = {
      ...baseConfig,
      ...customOptions,
      method: method || baseConfig.method,
      headers: {
        ...baseConfig.headers,
        ...headers,
        ...(auth && { Authorization: `Bearer ${auth}` }),
      },
      timeout: timeout || baseConfig.timeout,
      ...(body && { body: JSON.stringify(body) }),
    };

    return { url, config };
  }

  function get(url, options = {}) {
    return buildRequest(url, { ...options, method: "GET" });
  }

  function post(url, data, options = {}) {
    return buildRequest(url, {
      ...options,
      method: "POST",
      body: data,
    });
  }

  function put(url, data, options = {}) {
    return buildRequest(url, {
      ...options,
      method: "PUT",
      body: data,
    });
  }

  function del(url, options = {}) {
    return buildRequest(url, { ...options, method: "DELETE" });
  }

  // Advanced request with multiple configurations
  function buildBatchRequest(...requests) {
    return requests
      .map((request) => {
        if (typeof request === "string") {
          return get(request);
        } else if (request.url) {
          const { url, ...options } = request;
          return buildRequest(url, options);
        }
        return null;
      })
      .filter(Boolean);
  }

  // Request interceptor
  function withInterceptors(baseRequest, ...interceptors) {
    return interceptors.reduce((request, interceptor) => {
      return {
        ...request,
        config: {
          ...request.config,
          ...interceptor(request.config),
        },
      };
    }, baseRequest);
  }

  return {
    get,
    post,
    put,
    delete: del,
    buildRequest,
    buildBatch: buildBatchRequest,
    withInterceptors,
  };
}

// Test API request builder
let apiBuilder = createApiRequestBuilder();

// Simple requests
console.log("GET request:", apiBuilder.get("/users"));

console.log(
  "POST request:",
  apiBuilder.post("/users", {
    name: "John Doe",
    email: "john@example.com",
  })
);

// Complex request with custom options
console.log(
  "Complex request:",
  apiBuilder.buildRequest("/api/data", {
    method: "POST",
    headers: {
      "X-Custom-Header": "value",
      Authorization: "Bearer token123",
    },
    body: { query: "search term" },
    timeout: 10000,
    retries: 3,
    cache: true,
  })
);

// Batch requests
let batchRequests = apiBuilder.buildBatch(
  "/users",
  { url: "/posts", method: "GET", headers: { "X-Source": "batch" } },
  { url: "/comments", method: "GET", timeout: 3000 }
);
console.log("Batch requests:", batchRequests);

// Interceptors
function authInterceptor(config) {
  return {
    headers: {
      ...config.headers,
      "X-Auth-Time": new Date().toISOString(),
    },
  };
}

function loggingInterceptor(config) {
  console.log("Request intercepted:", config.method || "GET");
  return {
    metadata: {
      intercepted: true,
      timestamp: Date.now(),
    },
  };
}

let interceptedRequest = apiBuilder.withInterceptors(
  apiBuilder.get("/protected"),
  authInterceptor,
  loggingInterceptor
);
console.log("Intercepted request:", interceptedRequest);
```

### Example 2: State Management System

```javascript
function createStateManager(initialState = {}) {
  console.log("=== STATE MANAGEMENT SYSTEM ===");

  let state = { ...initialState };
  let listeners = [];
  let history = [{ ...initialState }];

  function setState(updates) {
    // Support both object and function updates
    const newState =
      typeof updates === "function"
        ? updates({ ...state })
        : { ...state, ...updates };

    // Save to history
    history.push({ ...newState });

    // Update state
    const previousState = { ...state };
    state = newState;

    // Notify listeners
    listeners.forEach((listener) => {
      listener(state, previousState);
    });

    console.log("State updated:", state);
    return state;
  }

  function getState() {
    return { ...state };
  }

  function subscribe(listener) {
    listeners.push(listener);

    // Return unsubscribe function
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function updateProperty(path, value) {
    const pathArray = path.split(".");
    const newState = { ...state };

    let current = newState;
    for (let i = 0; i < pathArray.length - 1; i++) {
      current[pathArray[i]] = { ...current[pathArray[i]] };
      current = current[pathArray[i]];
    }

    current[pathArray[pathArray.length - 1]] = value;
    setState(newState);
  }

  function mergeState(...stateUpdates) {
    const merged = stateUpdates.reduce(
      (acc, update) => ({
        ...acc,
        ...update,
      }),
      state
    );

    setState(merged);
  }

  function resetState(newState = initialState) {
    setState({ ...newState });
  }

  function undo() {
    if (history.length > 1) {
      history.pop(); // Remove current state
      const previousState = history[history.length - 1];
      state = { ...previousState };

      // Notify listeners
      listeners.forEach((listener) => {
        listener(state, state); // Same for both since we're undoing
      });

      console.log("State undone:", state);
    }
  }

  function createSelector(...selectors) {
    return (currentState) => {
      return selectors.reduce((selected, selector) => {
        if (typeof selector === "string") {
          const value = selector
            .split(".")
            .reduce((obj, key) => obj?.[key], currentState);
          selected[selector] = value;
        } else if (typeof selector === "function") {
          const result = selector(currentState);
          selected = { ...selected, ...result };
        }
        return selected;
      }, {});
    };
  }

  // Action creators with spread/rest
  function createActions(actionCreators) {
    return Object.keys(actionCreators).reduce((actions, actionName) => {
      actions[actionName] = (...args) => {
        const action = actionCreators[actionName](...args);
        setState(action);
        return getState();
      };
      return actions;
    }, {});
  }

  return {
    setState,
    getState,
    subscribe,
    updateProperty,
    mergeState,
    resetState,
    undo,
    createSelector,
    createActions,
    get history() {
      return [...history];
    },
  };
}

// Test state management system
let stateManager = createStateManager({
  user: {
    id: null,
    name: "",
    email: "",
    preferences: {
      theme: "light",
      notifications: true,
    },
  },
  app: {
    loading: false,
    error: null,
    currentPage: "home",
  },
});

// Subscribe to state changes
let unsubscribe = stateManager.subscribe((newState, prevState) => {
  console.log("State changed from:", prevState);
  console.log("State changed to:", newState);
});

// Update state with spread
stateManager.setState({
  user: {
    ...stateManager.getState().user,
    id: 123,
    name: "Alice Johnson",
    email: "alice@example.com",
  },
});

// Merge multiple updates
stateManager.mergeState(
  { app: { ...stateManager.getState().app, loading: true } },
  {
    user: {
      ...stateManager.getState().user,
      preferences: {
        ...stateManager.getState().user.preferences,
        theme: "dark",
      },
    },
  }
);

// Update nested property
stateManager.updateProperty("app.currentPage", "profile");
stateManager.updateProperty("user.preferences.notifications", false);

// Create action creators
let actions = stateManager.createActions({
  login: (userData) => ({
    user: {
      ...stateManager.getState().user,
      ...userData,
      isLoggedIn: true,
    },
    app: {
      ...stateManager.getState().app,
      currentPage: "dashboard",
    },
  }),

  logout: () => ({
    user: {
      id: null,
      name: "",
      email: "",
      isLoggedIn: false,
      preferences: stateManager.getState().user.preferences,
    },
    app: {
      ...stateManager.getState().app,
      currentPage: "home",
    },
  }),

  setLoading: (loading) => ({
    ...stateManager.getState(),
    app: {
      ...stateManager.getState().app,
      loading,
    },
  }),
});

// Use actions
actions.login({ id: 456, name: "Bob Smith", email: "bob@example.com" });
actions.setLoading(false);

// Create selectors
let userSelector = stateManager.createSelector(
  "user.name",
  "user.email",
  (state) => ({ isLoggedIn: state.user.isLoggedIn })
);

console.log("Selected user data:", userSelector(stateManager.getState()));

// Undo last action
stateManager.undo();

console.log("Final state:", stateManager.getState());
console.log("State history length:", stateManager.history.length);

// Cleanup
unsubscribe();
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Array Operations

```javascript
console.log("=== SPREAD/REST EXERCISE 1: ARRAY OPERATIONS ===");

let numbers1 = [1, 2, 3];
let numbers2 = [4, 5, 6];
let numbers3 = [7, 8, 9];

// 1. Combine all arrays using spread
let combined = [...numbers1, ...numbers2, ...numbers3];
console.log("Combined arrays:", combined);

// 2. Create function that finds max of any number of arrays
function findMaxOfArrays(...arrays) {
  let allNumbers = [];
  arrays.forEach((array) => {
    allNumbers.push(...array);
  });
  return Math.max(...allNumbers);
}

console.log(
  "Max of all arrays:",
  findMaxOfArrays(numbers1, numbers2, numbers3)
);

// 3. Function that takes first element and sums the rest
function firstAndSum(first, ...rest) {
  let sum = rest.reduce((total, num) => total + num, 0);
  return { first, sum, count: rest.length };
}

console.log("First and sum:", firstAndSum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

// 4. Insert elements in the middle of an array
let originalArray = [1, 2, 3, 7, 8, 9];
let insertElements = [4, 5, 6];
let insertIndex = 3;

let newArray = [
  ...originalArray.slice(0, insertIndex),
  ...insertElements,
  ...originalArray.slice(insertIndex),
];
console.log("Array with inserted elements:", newArray);
```

### Exercise 2: Object Management

```javascript
console.log("=== SPREAD/REST EXERCISE 2: OBJECT MANAGEMENT ===");

let defaultSettings = {
  theme: "light",
  fontSize: 14,
  autoSave: true,
  notifications: {
    email: true,
    push: false,
    sound: true,
  },
};

let userSettings = {
  theme: "dark",
  fontSize: 16,
  notifications: {
    email: false,
    sound: false,
  },
};

// 1. Merge settings with deep merge for notifications
let mergedSettings = {
  ...defaultSettings,
  ...userSettings,
  notifications: {
    ...defaultSettings.notifications,
    ...userSettings.notifications,
  },
};
console.log("Merged settings:", mergedSettings);

// 2. Function to update settings
function updateSettings(currentSettings, ...updates) {
  return updates.reduce(
    (settings, update) => ({
      ...settings,
      ...update,
      notifications: {
        ...settings.notifications,
        ...(update.notifications || {}),
      },
    }),
    currentSettings
  );
}

let updatedSettings = updateSettings(
  mergedSettings,
  { fontSize: 18 },
  { autoSave: false },
  { notifications: { push: true } }
);
console.log("Updated settings:", updatedSettings);

// 3. Extract certain properties and keep the rest
function separateSettings({ theme, fontSize, ...otherSettings }) {
  return {
    displaySettings: { theme, fontSize },
    otherSettings,
  };
}

let { displaySettings, otherSettings } = separateSettings(updatedSettings);
console.log("Display settings:", displaySettings);
console.log("Other settings:", otherSettings);
```

## 📚 Key Takeaways

1. **Spread operator (...)** - Expands arrays/objects into individual elements
2. **Rest operator (...)** - Collects multiple elements into arrays/objects
3. **Array spreading** - Combine, copy, and manipulate arrays easily
4. **Object spreading** - Merge objects and override properties
5. **Rest parameters** - Handle variable number of function arguments
6. **Destructuring with rest** - Extract some values, collect others
7. **Order matters** - Later spreads override earlier ones

## ➡️ What's Next?

Outstanding work mastering spread and rest operators! 🎉 You now have flexible tools for handling data in JavaScript that make your code more elegant and functional.

Next, you'll dive into **Closures** - a powerful JavaScript concept that allows functions to "remember" variables from their outer scope, enabling advanced patterns like data privacy and function factories.

Your next lesson: **25. Closures - Functions that Remember**

## 🔗 Quick Reference

```javascript
// Spread operator
[...array]                    // Spread array elements
{...obj}                      // Spread object properties
func(...args)                 // Spread in function call
[...arr1, ...arr2]           // Combine arrays
{...obj1, ...obj2}           // Merge objects

// Rest operator
function func(...args) {}     // Rest parameters
let [first, ...rest] = array; // Rest in destructuring
let {prop, ...rest} = obj;    // Rest in object destructuring

// Common patterns
let copy = [...original];     // Copy array
let copy = {...original};     // Copy object
let merged = {...obj1, ...obj2}; // Merge objects
```

You're becoming a data manipulation master! 🚀
