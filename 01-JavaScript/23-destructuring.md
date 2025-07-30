# 23. Destructuring - Extracting Data Easily 📦➡️

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- What destructuring is and why it makes code cleaner
- Array destructuring for extracting values from arrays
- Object destructuring for extracting properties from objects
- Default values and aliasing in destructuring
- Nested destructuring for complex data structures
- Real-world applications and best practices

## 🤔 What Is Destructuring?

Destructuring is a convenient way to extract values from arrays or properties from objects into distinct variables. Instead of accessing each value individually, you can unpack multiple values in a single statement.

**Think of it as**: Unpacking a box and taking out specific items you need, all in one action.

```javascript
// Without destructuring (the old way)
let person = { name: "Alice", age: 25, city: "New York" };
let name = person.name;
let age = person.age;
let city = person.city;

// With destructuring (the modern way)
let { name, age, city } = person;

console.log("=== DESTRUCTURING INTRODUCTION ===");
console.log("Name:", name);
console.log("Age:", age);
console.log("City:", city);

// Array example
let colors = ["red", "green", "blue"];

// Without destructuring
let firstColor = colors[0];
let secondColor = colors[1];
let thirdColor = colors[2];

// With destructuring
let [first, second, third] = colors;

console.log("Colors:", first, second, third);
```

## 📦 Array Destructuring

### 1. Basic Array Destructuring

```javascript
console.log("=== ARRAY DESTRUCTURING BASICS ===");

let numbers = [1, 2, 3, 4, 5];

// Extract first few elements
let [a, b, c] = numbers;
console.log("First three:", a, b, c); // 1, 2, 3

// Skip elements using empty slots
let [first, , third, , fifth] = numbers;
console.log("Selected elements:", first, third, fifth); // 1, 3, 5

// Rest operator to get remaining elements
let [head, ...tail] = numbers;
console.log("Head:", head); // 1
console.log("Tail:", tail); // [2, 3, 4, 5]

// Extract from specific positions
let [, second, , fourth] = numbers;
console.log("Second and fourth:", second, fourth); // 2, 4

// Destructure returned arrays from functions
function getCoordinates() {
  return [10, 20];
}

let [x, y] = getCoordinates();
console.log(`Coordinates: (${x}, ${y})`); // (10, 20)

// Multiple return values from function
function getNameAndAge() {
  return ["Bob", 30];
}

let [personName, personAge] = getNameAndAge();
console.log(`Person: ${personName}, Age: ${personAge}`);
```

### 2. Default Values in Array Destructuring

```javascript
console.log("=== ARRAY DESTRUCTURING WITH DEFAULTS ===");

let shortArray = [100];

// Without defaults (undefined for missing elements)
let [val1, val2, val3] = shortArray;
console.log("Without defaults:", val1, val2, val3); // 100, undefined, undefined

// With default values
let [value1, value2 = 200, value3 = 300] = shortArray;
console.log("With defaults:", value1, value2, value3); // 100, 200, 300

// Defaults only used when value is undefined
let [a1, a2 = 50, a3 = 75] = [10, 20, 30];
console.log("Defaults not used:", a1, a2, a3); // 10, 20, 30

// Default values can be expressions
let defaultCounter = 0;
function getDefault() {
  return ++defaultCounter;
}

let [b1, b2 = getDefault(), b3 = getDefault()] = [1];
console.log("Expression defaults:", b1, b2, b3); // 1, 1, 2

// Nested arrays
let nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
let [[first1, first2], [second1, second2]] = nestedArray;
console.log("Nested destructuring:", first1, first2, second1, second2);
```

### 3. Swapping Variables

```javascript
console.log("=== VARIABLE SWAPPING ===");

let a = 10;
let b = 20;

console.log("Before swap:", { a, b });

// Traditional way (requires temporary variable)
// let temp = a; a = b; b = temp;

// Modern way with destructuring
[a, b] = [b, a];

console.log("After swap:", { a, b });

// Rotating multiple variables
let x = 1,
  y = 2,
  z = 3;
console.log("Before rotation:", { x, y, z });

[x, y, z] = [z, x, y]; // Rotate right
console.log("After rotation:", { x, y, z });

// Multiple simultaneous swaps
let names = ["Alice", "Bob", "Charlie", "Diana"];
console.log("Original names:", names);

[names[0], names[2]] = [names[2], names[0]]; // Swap Alice and Charlie
console.log("After swap:", names);
```

## 🎯 Object Destructuring

### 1. Basic Object Destructuring

```javascript
console.log("=== OBJECT DESTRUCTURING BASICS ===");

let user = {
  id: 1,
  username: "alice_dev",
  email: "alice@example.com",
  role: "developer",
  isActive: true,
};

// Extract properties into variables
let { username, email, role } = user;
console.log("User info:", username, email, role);

// Variable names must match property names by default
let { id, isActive } = user;
console.log("ID and status:", id, isActive);

// Extract all properties
let {
  id: userId,
  username: name,
  email: userEmail,
  role: userRole,
  isActive: status,
} = user;
console.log("With aliases:", { userId, name, userEmail, userRole, status });

// Destructuring with different variable names (aliasing)
let { username: displayName, role: jobTitle } = user;
console.log("Aliases:", displayName, jobTitle);

// Extract nested object properties
let product = {
  name: "Laptop",
  specs: {
    cpu: "Intel i7",
    ram: "16GB",
    storage: "512GB SSD",
  },
  price: {
    current: 999,
    original: 1299,
    currency: "USD",
  },
};

let {
  name: productName,
  specs: { cpu, ram },
  price: { current: currentPrice },
} = product;

console.log("Product:", productName);
console.log("Specs:", cpu, ram);
console.log("Price:", currentPrice);
```

### 2. Default Values and Missing Properties

```javascript
console.log("=== OBJECT DESTRUCTURING WITH DEFAULTS ===");

let settings = {
  theme: "dark",
  language: "en",
};

// With defaults for missing properties
let {
  theme,
  language,
  notifications = true,
  autoSave = false,
  fontSize = 14,
} = settings;

console.log("Settings:", {
  theme,
  language,
  notifications,
  autoSave,
  fontSize,
});

// Combining aliases and defaults
let {
  theme: selectedTheme = "light",
  language: lang = "en",
  timeout = 5000,
} = settings;

console.log("With aliases and defaults:", { selectedTheme, lang, timeout });

// Default values from function calls
function getDefaultConfig() {
  console.log("Getting default config...");
  return { maxRetries: 3, timeout: 1000 };
}

let apiSettings = { baseUrl: "https://api.example.com" };
let {
  baseUrl,
  maxRetries = getDefaultConfig().maxRetries,
  timeout = getDefaultConfig().timeout,
} = apiSettings;

console.log("API settings:", { baseUrl, maxRetries, timeout });
```

### 3. Destructuring Function Parameters

```javascript
console.log("=== DESTRUCTURING FUNCTION PARAMETERS ===");

// Traditional function with object parameter
function displayUserTraditional(user) {
  console.log(`Name: ${user.name}`);
  console.log(`Age: ${user.age}`);
  console.log(`City: ${user.city}`);
}

// Modern function with destructured parameters
function displayUserModern({ name, age, city, country = "Unknown" }) {
  console.log(`Name: ${name}`);
  console.log(`Age: ${age}`);
  console.log(`City: ${city}`);
  console.log(`Country: ${country}`);
}

let userData = { name: "John", age: 28, city: "Boston" };

console.log("Traditional approach:");
displayUserTraditional(userData);

console.log("Modern approach:");
displayUserModern(userData);

// Array destructuring in function parameters
function calculateDistance([x1, y1], [x2, y2]) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

let point1 = [0, 0];
let point2 = [3, 4];
let distance = calculateDistance(point1, point2);
console.log(`Distance between points: ${distance}`);

// Complex destructuring in parameters
function processOrder({
  id,
  customer: { name: customerName, email },
  items,
  shipping: { method = "standard", cost = 0 } = {},
}) {
  console.log(`Processing order ${id} for ${customerName} (${email})`);
  console.log(`Items: ${items.length}`);
  console.log(`Shipping: ${method} ($${cost})`);
}

let order = {
  id: "ORD-001",
  customer: { name: "Alice", email: "alice@example.com" },
  items: ["laptop", "mouse", "keyboard"],
  shipping: { method: "express", cost: 15.99 },
};

processOrder(order);
```

## 🔄 Advanced Destructuring Patterns

### 1. Computed Property Names

```javascript
console.log("=== COMPUTED PROPERTY NAMES ===");

let dynamicKey = "currentTheme";
let appState = {
  currentTheme: "dark",
  language: "en",
  notifications: true,
};

// Destructuring with computed property names
let { [dynamicKey]: themeValue } = appState;
console.log("Dynamic key value:", themeValue);

// Multiple computed properties
let keys = ["language", "notifications"];
let { [keys[0]]: lang, [keys[1]]: notifs } = appState;
console.log("Multiple computed:", lang, notifs);

// Function that returns property name
function getPropertyName() {
  return "notifications";
}

let { [getPropertyName()]: notificationSetting } = appState;
console.log("From function:", notificationSetting);
```

### 2. Rest Patterns in Destructuring

```javascript
console.log("=== REST PATTERNS ===");

// Array rest pattern
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let [first, second, ...remaining] = numbers;

console.log("First:", first);
console.log("Second:", second);
console.log("Remaining:", remaining);

// Object rest pattern
let employee = {
  id: 1,
  name: "Sarah",
  email: "sarah@company.com",
  department: "Engineering",
  salary: 75000,
  startDate: "2022-01-15",
  benefits: ["health", "dental", "401k"],
};

let { id, name, ...otherDetails } = employee;
console.log("Basic info:", { id, name });
console.log("Other details:", otherDetails);

// Useful for excluding properties
let { salary, ...publicEmployeeInfo } = employee;
console.log("Public info (no salary):", publicEmployeeInfo);

// Rest with destructuring in function parameters
function processApiResponse({ data, status, ...metadata }) {
  console.log("Data:", data);
  console.log("Status:", status);
  console.log("Metadata:", metadata);
}

let apiResponse = {
  data: [1, 2, 3],
  status: "success",
  timestamp: "2024-03-15T10:30:00Z",
  requestId: "req-12345",
  duration: 245,
};

processApiResponse(apiResponse);
```

### 3. Mixed Array and Object Destructuring

```javascript
console.log("=== MIXED DESTRUCTURING ===");

// Array of objects
let students = [
  { name: "Alice", grade: 95, subject: "Math" },
  { name: "Bob", grade: 87, subject: "Science" },
  { name: "Charlie", grade: 92, subject: "English" },
];

// Destructure array and then objects
let [firstStudent, { name: secondName, grade: secondGrade }] = students;
console.log("First student:", firstStudent);
console.log("Second student details:", secondName, secondGrade);

// Object containing arrays
let classroom = {
  teacher: "Ms. Johnson",
  students: ["Alice", "Bob", "Charlie", "Diana"],
  grades: [95, 87, 92, 89],
  subject: "Mathematics",
};

let {
  teacher,
  students: [topStudent, ...otherStudents],
  grades: [highestGrade, ...otherGrades],
} = classroom;

console.log("Teacher:", teacher);
console.log("Top student:", topStudent);
console.log("Other students:", otherStudents);
console.log("Highest grade:", highestGrade);
console.log("Other grades:", otherGrades);

// Complex nested structure
let apiData = {
  status: "success",
  results: [
    {
      id: 1,
      user: { name: "Alice", preferences: { theme: "dark", language: "en" } },
      activity: ["login", "browse", "purchase"],
    },
    {
      id: 2,
      user: { name: "Bob", preferences: { theme: "light", language: "es" } },
      activity: ["login", "browse"],
    },
  ],
};

let {
  status,
  results: [
    {
      user: {
        name: firstName,
        preferences: { theme: firstTheme },
      },
      activity: [firstActivity, ...firstOtherActivities],
    },
    {
      user: { name: secondName },
    },
  ],
} = apiData;

console.log("Status:", status);
console.log("First user:", firstName, firstTheme);
console.log("First activity:", firstActivity);
console.log("Other activities:", firstOtherActivities);
console.log("Second user:", secondName);
```

## 🎯 Real-World Examples

### Example 1: Configuration Management System

```javascript
function createConfigManager() {
  console.log("=== CONFIGURATION MANAGEMENT SYSTEM ===");

  // Default configuration
  const defaultConfig = {
    app: {
      name: "MyApp",
      version: "1.0.0",
      debug: false,
    },
    database: {
      host: "localhost",
      port: 5432,
      ssl: false,
      timeout: 5000,
    },
    cache: {
      enabled: true,
      ttl: 3600,
      maxSize: 100,
    },
    logging: {
      level: "info",
      file: "./app.log",
      console: true,
    },
  };

  function mergeConfig(userConfig = {}) {
    // Destructure with defaults
    const {
      app: {
        name = defaultConfig.app.name,
        version = defaultConfig.app.version,
        debug = defaultConfig.app.debug,
      } = {},
      database: {
        host = defaultConfig.database.host,
        port = defaultConfig.database.port,
        ssl = defaultConfig.database.ssl,
        timeout = defaultConfig.database.timeout,
        ...otherDbSettings
      } = {},
      cache: {
        enabled = defaultConfig.cache.enabled,
        ttl = defaultConfig.cache.ttl,
        maxSize = defaultConfig.cache.maxSize,
      } = {},
      logging: {
        level = defaultConfig.logging.level,
        file = defaultConfig.logging.file,
        console = defaultConfig.logging.console,
      } = {},
      ...extraConfig
    } = userConfig;

    return {
      app: { name, version, debug },
      database: { host, port, ssl, timeout, ...otherDbSettings },
      cache: { enabled, ttl, maxSize },
      logging: { level, file, console },
      ...extraConfig,
    };
  }

  function validateConfig(config) {
    const {
      app: { name, version },
      database: { host, port },
      cache: { ttl, maxSize },
      logging: { level },
    } = config;

    const errors = [];

    if (!name || typeof name !== "string") {
      errors.push("App name must be a non-empty string");
    }

    if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
      errors.push("Version must be in format x.y.z");
    }

    if (!host || typeof host !== "string") {
      errors.push("Database host must be a non-empty string");
    }

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      errors.push("Database port must be a valid port number");
    }

    if (!Number.isInteger(ttl) || ttl < 0) {
      errors.push("Cache TTL must be a non-negative integer");
    }

    if (!Number.isInteger(maxSize) || maxSize < 1) {
      errors.push("Cache max size must be a positive integer");
    }

    const validLevels = ["error", "warn", "info", "debug"];
    if (!validLevels.includes(level)) {
      errors.push(`Logging level must be one of: ${validLevels.join(", ")}`);
    }

    return { isValid: errors.length === 0, errors };
  }

  function displayConfig(config) {
    const {
      app: { name, version, debug },
      database: { host, port, ssl, timeout },
      cache: { enabled, ttl, maxSize },
      logging: { level, file, console: consoleLogging },
    } = config;

    console.log(`
📋 APPLICATION CONFIGURATION
────────────────────────────────
🚀 App: ${name} v${version} ${debug ? "(Debug Mode)" : ""}

🗄️  Database:
   Host: ${host}:${port}
   SSL: ${ssl ? "Enabled" : "Disabled"}
   Timeout: ${timeout}ms

💾 Cache:
   Status: ${enabled ? "Enabled" : "Disabled"}
   TTL: ${ttl}s
   Max Size: ${maxSize} items

📝 Logging:
   Level: ${level.toUpperCase()}
   File: ${file}
   Console: ${consoleLogging ? "Enabled" : "Disabled"}
        `);
  }

  function extractDatabaseUrl(config) {
    const {
      database: {
        host,
        port,
        ssl,
        username = "user",
        password = "pass",
        database: dbName = "myapp",
      },
    } = config;

    const protocol = ssl ? "postgresql+ssl" : "postgresql";
    return `${protocol}://${username}:${password}@${host}:${port}/${dbName}`;
  }

  return {
    merge: mergeConfig,
    validate: validateConfig,
    display: displayConfig,
    getDatabaseUrl: extractDatabaseUrl,
  };
}

// Test configuration system
let configManager = createConfigManager();

// User provides partial configuration
let userConfig = {
  app: {
    name: "MyAwesomeApp",
    debug: true,
  },
  database: {
    host: "production-db.company.com",
    port: 5433,
    ssl: true,
    username: "app_user",
    password: "secure_password",
    database: "production_db",
  },
  cache: {
    ttl: 7200,
  },
  apiKeys: {
    stripe: "sk_test_...",
    sendgrid: "SG....",
  },
};

// Merge with defaults
let finalConfig = configManager.merge(userConfig);

// Validate
let { isValid, errors } = configManager.validate(finalConfig);

if (isValid) {
  console.log("✅ Configuration is valid");
  configManager.display(finalConfig);
  console.log("Database URL:", configManager.getDatabaseUrl(finalConfig));
} else {
  console.log("❌ Configuration errors:");
  errors.forEach((error) => console.log(`   - ${error}`));
}
```

### Example 2: API Response Handler

```javascript
function createApiResponseHandler() {
  console.log("=== API RESPONSE HANDLER ===");

  function handleUserResponse(response) {
    // Destructure API response with error handling
    const {
      success = false,
      data: {
        user: {
          id,
          profile: {
            firstName,
            lastName,
            email,
            avatar = "/default-avatar.png",
          } = {},
          settings: {
            theme = "light",
            notifications = true,
            language = "en",
          } = {},
          stats: { loginCount = 0, lastLogin = null } = {},
        } = {},
        permissions = [],
        subscription: { plan = "free", expiresAt = null, features = [] } = {},
      } = {},
      metadata: { requestId, timestamp, duration } = {},
      pagination: { page = 1, totalPages = 1, totalItems = 0 } = {},
    } = response;

    if (!success) {
      console.log("❌ API request failed");
      return null;
    }

    console.log(`👤 User Profile:`);
    console.log(`   Name: ${firstName} ${lastName}`);
    console.log(`   Email: ${email}`);
    console.log(`   Avatar: ${avatar}`);
    console.log(`   Theme: ${theme}`);
    console.log(`   Notifications: ${notifications ? "Enabled" : "Disabled"}`);
    console.log(`   Language: ${language}`);
    console.log(`   Login Count: ${loginCount}`);
    console.log(`   Last Login: ${lastLogin || "Never"}`);
    console.log(`   Subscription: ${plan}`);
    console.log(`   Permissions: ${permissions.join(", ") || "None"}`);

    if (metadata.requestId) {
      console.log(`📊 Request Info: ${requestId} (${duration}ms)`);
    }

    return {
      id,
      name: `${firstName} ${lastName}`,
      email,
      avatar,
      settings: { theme, notifications, language },
      stats: { loginCount, lastLogin },
      subscription: { plan, expiresAt, features },
      permissions,
    };
  }

  function handleListResponse(response) {
    const {
      success = false,
      data: items = [],
      pagination: {
        page = 1,
        perPage = 10,
        totalPages = 1,
        totalItems = 0,
        hasNext = false,
        hasPrev = false,
      } = {},
      sorting: { field = "id", direction = "asc" } = {},
      filters = {},
    } = response;

    if (!success) {
      console.log("❌ List request failed");
      return { items: [], pagination: {} };
    }

    console.log(`📋 List Results:`);
    console.log(`   Items: ${items.length} of ${totalItems} total`);
    console.log(`   Page: ${page} of ${totalPages}`);
    console.log(`   Sort: ${field} (${direction})`);

    if (Object.keys(filters).length > 0) {
      console.log(
        `   Filters: ${Object.entries(filters)
          .map(([key, value]) => `${key}=${value}`)
          .join(", ")}`
      );
    }

    // Process each item
    const processedItems = items.map((item) => {
      const { id, name, status = "active", createdAt, ...otherFields } = item;
      return {
        id,
        name,
        status,
        createdAt: new Date(createdAt).toLocaleDateString(),
        ...otherFields,
      };
    });

    return {
      items: processedItems,
      pagination: { page, perPage, totalPages, totalItems, hasNext, hasPrev },
      sorting: { field, direction },
      filters,
    };
  }

  function handleErrorResponse(response) {
    const {
      success = false,
      error: {
        code = "UNKNOWN_ERROR",
        message = "An unknown error occurred",
        details = {},
        field = null,
      } = {},
      metadata: {
        requestId = "unknown",
        timestamp = new Date().toISOString(),
      } = {},
    } = response;

    console.log(`❌ Error Response:`);
    console.log(`   Code: ${code}`);
    console.log(`   Message: ${message}`);
    console.log(`   Request ID: ${requestId}`);
    console.log(`   Timestamp: ${new Date(timestamp).toLocaleString()}`);

    if (field) {
      console.log(`   Field: ${field}`);
    }

    if (Object.keys(details).length > 0) {
      console.log(`   Details:`, details);
    }

    return { code, message, field, details, requestId };
  }

  return {
    handleUser: handleUserResponse,
    handleList: handleListResponse,
    handleError: handleErrorResponse,
  };
}

// Test API response handler
let apiHandler = createApiResponseHandler();

// Sample API responses
let userResponse = {
  success: true,
  data: {
    user: {
      id: 123,
      profile: {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
      },
      settings: {
        theme: "dark",
        notifications: false,
      },
      stats: {
        loginCount: 42,
        lastLogin: "2024-03-15T10:30:00Z",
      },
    },
    permissions: ["read", "write", "admin"],
    subscription: {
      plan: "premium",
      expiresAt: "2024-12-31T23:59:59Z",
      features: ["advanced_analytics", "priority_support"],
    },
  },
  metadata: {
    requestId: "req-12345",
    timestamp: "2024-03-15T10:30:00Z",
    duration: 245,
  },
};

let listResponse = {
  success: true,
  data: [
    {
      id: 1,
      name: "Project Alpha",
      status: "active",
      createdAt: "2024-01-15T00:00:00Z",
    },
    {
      id: 2,
      name: "Project Beta",
      status: "completed",
      createdAt: "2024-02-01T00:00:00Z",
    },
    {
      id: 3,
      name: "Project Gamma",
      status: "pending",
      createdAt: "2024-03-01T00:00:00Z",
    },
  ],
  pagination: {
    page: 1,
    perPage: 10,
    totalPages: 1,
    totalItems: 3,
    hasNext: false,
    hasPrev: false,
  },
  sorting: {
    field: "createdAt",
    direction: "desc",
  },
  filters: {
    status: "active",
  },
};

let errorResponse = {
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid email format",
    field: "email",
    details: {
      provided: "invalid-email",
      expected: "valid email address",
    },
  },
  metadata: {
    requestId: "req-67890",
    timestamp: "2024-03-15T10:35:00Z",
  },
};

// Handle different response types
console.log("Processing user response:");
apiHandler.handleUser(userResponse);

console.log("\nProcessing list response:");
apiHandler.handleList(listResponse);

console.log("\nProcessing error response:");
apiHandler.handleError(errorResponse);
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Working with Form Data

```javascript
console.log("=== DESTRUCTURING EXERCISE 1: FORM DATA ===");

// Form data from user registration
let formData = {
  personal: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
  },
  address: {
    street: "123 Main St",
    city: "Boston",
    state: "MA",
    zipCode: "02101",
  },
  preferences: {
    newsletter: true,
    notifications: false,
    theme: "dark",
  },
};

// Extract data using destructuring
let {
  personal: { firstName, lastName, email },
  address: { city, state },
  preferences: { newsletter, theme = "light" },
} = formData;

console.log(`Name: ${firstName} ${lastName}`);
console.log(`Email: ${email}`);
console.log(`Location: ${city}, ${state}`);
console.log(`Newsletter: ${newsletter ? "Yes" : "No"}`);
console.log(`Theme: ${theme}`);

// Function to validate form data
function validateFormData({
  personal: { firstName, lastName, email },
  address: { city, state, zipCode },
}) {
  let errors = [];

  if (!firstName || firstName.length < 2)
    errors.push("First name must be at least 2 characters");
  if (!lastName || lastName.length < 2)
    errors.push("Last name must be at least 2 characters");
  if (!email.includes("@")) errors.push("Invalid email format");
  if (!city) errors.push("City is required");
  if (!state || state.length !== 2) errors.push("State must be 2 characters");
  if (!/^\d{5}$/.test(zipCode)) errors.push("Zip code must be 5 digits");

  return { isValid: errors.length === 0, errors };
}

let validation = validateFormData(formData);
console.log("Validation result:", validation);
```

### Exercise 2: Processing API Data

```javascript
console.log("=== DESTRUCTURING EXERCISE 2: API DATA ===");

// API response with weather data
let weatherResponse = {
  location: {
    city: "New York",
    country: "USA",
    coordinates: [-74.006, 40.7128],
  },
  current: {
    temperature: 72,
    humidity: 65,
    windSpeed: 8,
    conditions: "partly cloudy",
  },
  forecast: [
    { day: "Today", high: 75, low: 68, conditions: "sunny" },
    { day: "Tomorrow", high: 73, low: 65, conditions: "cloudy" },
    { day: "Day 3", high: 70, low: 62, conditions: "rainy" },
  ],
};

// Extract weather information
let {
  location: {
    city,
    coordinates: [longitude, latitude],
  },
  current: { temperature, humidity, conditions: currentConditions },
  forecast: [today, tomorrow, ...laterDays],
} = weatherResponse;

console.log(`Weather for ${city}:`);
console.log(`Location: ${latitude}, ${longitude}`);
console.log(
  `Current: ${temperature}°F, ${currentConditions} (${humidity}% humidity)`
);
console.log(
  `Today: High ${today.high}°F, Low ${today.low}°F, ${today.conditions}`
);
console.log(
  `Tomorrow: High ${tomorrow.high}°F, Low ${tomorrow.low}°F, ${tomorrow.conditions}`
);
console.log(`Later: ${laterDays.length} more days of forecast available`);

// Function to format weather data
function formatWeatherReport({
  location: { city, country },
  current: { temperature, conditions },
  forecast: [{ high, low }],
}) {
  return `${city}, ${country}: Currently ${temperature}°F and ${conditions}. Today's high/low: ${high}°F/${low}°F`;
}

console.log("Formatted:", formatWeatherReport(weatherResponse));
```

## 📚 Key Takeaways

1. **Destructuring extracts values** - From arrays and objects into variables
2. **Cleaner code** - Less repetitive property access
3. **Default values** - Handle missing properties gracefully
4. **Aliasing** - Rename variables during extraction
5. **Rest patterns** - Collect remaining elements/properties
6. **Function parameters** - Extract directly in parameter lists
7. **Nested destructuring** - Handle complex data structures

## ➡️ What's Next?

Fantastic work mastering destructuring! 🎉 You now have a powerful tool for working with complex data structures and making your code more readable and maintainable.

Next, you'll learn about **Spread and Rest** - flexible operators that help you work with arrays, objects, and function parameters in powerful new ways.

Your next lesson: **24. Spread and Rest - Flexible Data Handling**

## 🔗 Quick Reference

```javascript
// Array destructuring
let [a, b, c] = array;
let [first, , third] = array;        // Skip elements
let [head, ...tail] = array;         // Rest elements
let [x = 10, y = 20] = array;        // Default values

// Object destructuring
let { prop1, prop2 } = obj;
let { prop: alias } = obj;           // Rename variable
let { prop = defaultValue } = obj;   // Default value
let { prop: alias = defaultValue } = obj; // Both
let { prop1, ...rest } = obj;        // Rest properties

// Function parameters
function func({ prop1, prop2 = default }) { }
function func([a, b, ...rest]) { }

// Nested destructuring
let { obj: { nestedProp } } = data;
let [{ prop }] = arrayOfObjects;
```

You're becoming a data extraction expert! 🚀
