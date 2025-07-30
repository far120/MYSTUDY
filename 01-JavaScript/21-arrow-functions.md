# 21. Arrow Functions - Modern Function Syntax ➡️

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- What arrow functions are and why they're useful
- Different syntaxes for arrow functions
- How arrow functions differ from regular functions
- When to use arrow functions vs regular functions
- The `this` behavior in arrow functions
- Real-world applications and best practices

## 🤔 What Are Arrow Functions?

Arrow functions are a more concise way to write functions introduced in ES6 (2015). They use the `=>` syntax (which looks like an arrow) and can make your code cleaner and more readable.

**Think of it as**: A shorthand way to write functions, especially useful for simple operations and functional programming patterns.

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function (same functionality)
const add = (a, b) => {
  return a + b;
};

// Even shorter arrow function (implicit return)
const add = (a, b) => a + b;

console.log("=== FUNCTION COMPARISON ===");
console.log("Regular function:", add(5, 3));
console.log("Arrow function:", add(5, 3));
```

## 🏗️ Arrow Function Syntax

### 1. Basic Syntax Variations

```javascript
console.log("=== ARROW FUNCTION SYNTAX ===");

// Multiple parameters with parentheses
const multiply = (a, b) => a * b;
console.log("multiply(4, 5):", multiply(4, 5));

// Single parameter (parentheses optional)
const square = (x) => x * x;
const squareWithParens = (x) => x * x;
console.log("square(6):", square(6));
console.log("squareWithParens(6):", squareWithParens(6));

// No parameters (parentheses required)
const getRandomNumber = () => Math.floor(Math.random() * 100);
console.log("Random number:", getRandomNumber());

// Multiple statements (curly braces required)
const greetAndCalculate = (name, age) => {
  console.log(`Hello, ${name}!`);
  const nextYear = age + 1;
  return `Next year you'll be ${nextYear}`;
};
console.log(greetAndCalculate("Alice", 25));

// Returning an object (wrap in parentheses)
const createPerson = (name, age) => ({
  name: name,
  age: age,
  isAdult: age >= 18,
});
console.log("Person object:", createPerson("Bob", 22));
```

### 2. Single Line vs Multi-line

```javascript
console.log("=== SINGLE VS MULTI-LINE ===");

// Single line (implicit return)
const double = (x) => x * 2;
const isEven = (n) => n % 2 === 0;
const getFirstChar = (str) => str.charAt(0);

console.log("double(7):", double(7));
console.log("isEven(8):", isEven(8));
console.log("getFirstChar('Hello'):", getFirstChar("Hello"));

// Multi-line (explicit return required)
const processText = (text) => {
  console.log("Processing text:", text);
  const cleaned = text.trim().toLowerCase();
  const wordCount = cleaned.split(" ").length;
  return {
    original: text,
    cleaned: cleaned,
    wordCount: wordCount,
  };
};

console.log("Text processing:", processText("  Hello World  "));

// Complex calculation with multiple steps
const calculateCompoundInterest = (principal, rate, time) => {
  console.log(`Calculating compound interest:`);
  console.log(`Principal: $${principal}`);
  console.log(`Rate: ${rate}%`);
  console.log(`Time: ${time} years`);

  const amount = principal * Math.pow(1 + rate / 100, time);
  const interest = amount - principal;

  return {
    principal: principal,
    finalAmount: Math.round(amount * 100) / 100,
    interestEarned: Math.round(interest * 100) / 100,
  };
};

console.log("Investment result:", calculateCompoundInterest(1000, 5, 10));
```

## 🔄 Arrow Functions with Array Methods

Arrow functions shine when used with array methods:

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("=== ARROW FUNCTIONS WITH ARRAYS ===");

// Traditional functions vs arrow functions
console.log("Original numbers:", numbers);

// map() with arrow functions
const doubled = numbers.map((n) => n * 2);
const squared = numbers.map((n) => n * n);
const formatted = numbers.map((n) => `Number: ${n}`);

console.log("Doubled:", doubled);
console.log("Squared:", squared);
console.log("Formatted:", formatted);

// filter() with arrow functions
const evenNumbers = numbers.filter((n) => n % 2 === 0);
const bigNumbers = numbers.filter((n) => n > 5);
const smallOddNumbers = numbers.filter((n) => n < 5 && n % 2 === 1);

console.log("Even numbers:", evenNumbers);
console.log("Numbers > 5:", bigNumbers);
console.log("Small odd numbers:", smallOddNumbers);

// reduce() with arrow functions
const sum = numbers.reduce((total, n) => total + n, 0);
const product = numbers.reduce((total, n) => total * n, 1);
const max = numbers.reduce((biggest, n) => (n > biggest ? n : biggest));

console.log("Sum:", sum);
console.log("Product:", product);
console.log("Maximum:", max);

// Method chaining with arrow functions
const result = numbers
  .filter((n) => n % 2 === 0) // Get even numbers
  .map((n) => n * 3) // Multiply by 3
  .filter((n) => n > 10) // Keep only > 10
  .reduce((sum, n) => sum + n, 0); // Sum them up

console.log("Chained result:", result);
```

## 🎯 Working with Objects and Arrow Functions

```javascript
let students = [
  { name: "Alice", age: 20, grade: 85, subject: "Math" },
  { name: "Bob", age: 19, grade: 92, subject: "Science" },
  { name: "Charlie", age: 21, grade: 78, subject: "Math" },
  { name: "Diana", age: 20, grade: 96, subject: "Science" },
  { name: "Eve", age: 22, grade: 88, subject: "English" },
];

console.log("=== OBJECTS WITH ARROW FUNCTIONS ===");

// Extract specific properties
const names = students.map((student) => student.name);
const ages = students.map((student) => student.age);
const grades = students.map((student) => student.grade);

console.log("Student names:", names);
console.log("Student ages:", ages);
console.log("Student grades:", grades);

// Create new objects with computed properties
const studentsWithStatus = students.map((student) => ({
  name: student.name,
  grade: student.grade,
  status:
    student.grade >= 90
      ? "Excellent"
      : student.grade >= 80
      ? "Good"
      : "Needs Improvement",
  isAdult: student.age >= 18,
}));

console.log("Students with status:", studentsWithStatus);

// Filter by multiple conditions
const excellentMathStudents = students.filter(
  (student) => student.grade >= 90 && student.subject === "Math"
);

const youngHighAchievers = students.filter(
  (student) => student.age < 21 && student.grade >= 85
);

console.log("Excellent Math students:", excellentMathStudents);
console.log("Young high achievers:", youngHighAchievers);

// Group students by subject
const studentsBySubject = students.reduce((groups, student) => {
  const subject = student.subject;
  if (!groups[subject]) {
    groups[subject] = [];
  }
  groups[subject].push(student);
  return groups;
}, {});

console.log("Students by subject:", studentsBySubject);

// Calculate average grade by subject
const averageBySubject = Object.keys(studentsBySubject).map((subject) => {
  const subjectStudents = studentsBySubject[subject];
  const totalGrades = subjectStudents.reduce(
    (sum, student) => sum + student.grade,
    0
  );
  const average = totalGrades / subjectStudents.length;

  return {
    subject: subject,
    studentCount: subjectStudents.length,
    averageGrade: Math.round(average * 10) / 10,
  };
});

console.log("Average by subject:", averageBySubject);
```

## ⚠️ Important Differences: Arrow Functions vs Regular Functions

### 1. The `this` Keyword Behavior

```javascript
console.log("=== 'THIS' KEYWORD DIFFERENCES ===");

// Regular function - 'this' changes based on how it's called
let regularObject = {
  name: "Regular Object",

  regularMethod: function () {
    console.log("Regular method 'this':", this.name);

    // Problem: 'this' changes in nested function
    setTimeout(function () {
      console.log("Regular nested function 'this':", this.name); // 'this' is not the object
    }, 100);
  },

  arrowMethod: function () {
    console.log("Outer method 'this':", this.name);

    // Solution: Arrow function preserves 'this'
    setTimeout(() => {
      console.log("Arrow nested function 'this':", this.name); // 'this' is preserved
    }, 200);
  },
};

regularObject.regularMethod();
regularObject.arrowMethod();

// Arrow functions as object methods (generally avoided)
let arrowObject = {
  name: "Arrow Object",

  // DON'T DO THIS: Arrow function as method
  arrowMethod: () => {
    console.log("Arrow method 'this':", this.name); // 'this' is not the object
  },

  // DO THIS: Regular function as method
  regularMethod: function () {
    console.log("Regular method 'this':", this.name); // 'this' is the object
  },
};

setTimeout(() => {
  arrowObject.arrowMethod(); // Won't work as expected
  arrowObject.regularMethod(); // Works correctly
}, 300);
```

### 2. Arguments Object

```javascript
console.log("=== ARGUMENTS OBJECT DIFFERENCES ===");

// Regular function has 'arguments' object
function regularFunction() {
  console.log("Regular function arguments:", arguments);
  console.log("Arguments length:", arguments.length);

  // Convert arguments to array
  let argsArray = Array.from(arguments);
  console.log("Arguments as array:", argsArray);
}

// Arrow function doesn't have 'arguments' - use rest parameters instead
const arrowFunction = (...args) => {
  console.log("Arrow function args:", args);
  console.log("Args length:", args.length);
  console.log("Args is array:", Array.isArray(args));
};

console.log("Testing regular function:");
regularFunction(1, 2, 3, "hello");

console.log("Testing arrow function:");
arrowFunction(1, 2, 3, "hello");
```

### 3. Constructor Functions

```javascript
console.log("=== CONSTRUCTOR DIFFERENCES ===");

// Regular function can be used as constructor
function RegularConstructor(name) {
  this.name = name;
  this.sayHello = function () {
    console.log(`Hello, I'm ${this.name}`);
  };
}

// Arrow function CANNOT be used as constructor
const ArrowConstructor = (name) => {
  this.name = name; // This won't work as expected
};

// Test regular constructor
try {
  let person1 = new RegularConstructor("Alice");
  console.log("Regular constructor worked:", person1.name);
  person1.sayHello();
} catch (error) {
  console.log("Regular constructor error:", error.message);
}

// Test arrow constructor (will fail)
try {
  let person2 = new ArrowConstructor("Bob");
  console.log("Arrow constructor worked:", person2.name);
} catch (error) {
  console.log("Arrow constructor error:", error.message);
}
```

## 🎯 Real-World Examples

### Example 1: Data Processing Pipeline

```javascript
function createDataProcessor() {
  // Simulate API data
  const rawData = [
    { id: 1, name: "apple", category: "fruit", price: 1.2, quantity: 50 },
    { id: 2, name: "banana", category: "fruit", price: 0.8, quantity: 30 },
    { id: 3, name: "carrot", category: "vegetable", price: 1.5, quantity: 25 },
    { id: 4, name: "bread", category: "bakery", price: 2.5, quantity: 15 },
    { id: 5, name: "milk", category: "dairy", price: 3.2, quantity: 40 },
    { id: 6, name: "cheese", category: "dairy", price: 4.8, quantity: 20 },
  ];

  console.log("=== DATA PROCESSING PIPELINE ===");
  console.log("Raw data:", rawData);

  // Process data using arrow functions
  const processedData = rawData
    // Add calculated fields
    .map((item) => ({
      ...item,
      totalValue: Math.round(item.price * item.quantity * 100) / 100,
      priceCategory:
        item.price < 2 ? "budget" : item.price < 4 ? "mid-range" : "premium",
      stockLevel:
        item.quantity < 20 ? "low" : item.quantity < 40 ? "medium" : "high",
    }))
    // Filter out low stock items
    .filter((item) => item.quantity >= 20)
    // Sort by total value (highest first)
    .sort((a, b) => b.totalValue - a.totalValue);

  console.log("Processed data:", processedData);

  // Group by category
  const groupedByCategory = processedData.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  console.log("Grouped by category:", groupedByCategory);

  // Calculate category statistics
  const categoryStats = Object.keys(groupedByCategory).map((category) => {
    const items = groupedByCategory[category];
    const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0);
    const averagePrice =
      items.reduce((sum, item) => sum + item.price, 0) / items.length;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      category,
      itemCount: items.length,
      totalValue: Math.round(totalValue * 100) / 100,
      averagePrice: Math.round(averagePrice * 100) / 100,
      totalQuantity,
    };
  });

  console.log("Category statistics:", categoryStats);

  // Find items that meet specific criteria
  const premiumItems = processedData.filter(
    (item) => item.priceCategory === "premium"
  );
  const highValueItems = processedData.filter((item) => item.totalValue > 100);
  const budgetFruits = processedData.filter(
    (item) => item.category === "fruit" && item.priceCategory === "budget"
  );

  console.log(
    "Premium items:",
    premiumItems.map((item) => item.name)
  );
  console.log(
    "High value items:",
    highValueItems.map((item) => `${item.name}: $${item.totalValue}`)
  );
  console.log(
    "Budget fruits:",
    budgetFruits.map((item) => item.name)
  );

  return {
    processed: processedData,
    grouped: groupedByCategory,
    stats: categoryStats,
    premium: premiumItems,
    highValue: highValueItems,
    budgetFruits: budgetFruits,
  };
}

// Run data processing
let dataResult = createDataProcessor();
```

### Example 2: Event Handling and Functional Programming

```javascript
function createEventManager() {
  let events = [];
  let nextId = 1;

  console.log("=== EVENT MANAGER WITH ARROW FUNCTIONS ===");

  // Helper functions using arrow functions
  const isValidDate = (dateString) => !isNaN(Date.parse(dateString));
  const formatDate = (date) => new Date(date).toLocaleDateString();
  const isUpcoming = (date) => new Date(date) > new Date();
  const isPast = (date) => new Date(date) < new Date();

  const addEvent = (title, date, category = "general") => {
    if (!isValidDate(date)) {
      console.log("❌ Invalid date format");
      return false;
    }

    const event = {
      id: nextId++,
      title,
      date,
      category,
      createdAt: new Date().toISOString(),
      status: isUpcoming(date) ? "upcoming" : "past",
    };

    events.push(event);
    console.log(`📅 Event added: "${title}" on ${formatDate(date)}`);
    return true;
  };

  const getEvents = () => [...events]; // Return copy

  const getUpcomingEvents = () =>
    events.filter((event) => isUpcoming(event.date));

  const getPastEvents = () => events.filter((event) => isPast(event.date));

  const getEventsByCategory = (category) =>
    events.filter(
      (event) => event.category.toLowerCase() === category.toLowerCase()
    );

  const searchEvents = (searchTerm) =>
    events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortEventsByDate = (ascending = true) =>
    [...events].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return ascending ? dateA - dateB : dateB - dateA;
    });

  const getEventStatistics = () => {
    const total = events.length;
    const upcoming = getUpcomingEvents().length;
    const past = getPastEvents().length;

    const categoryCounts = events.reduce((counts, event) => {
      counts[event.category] = (counts[event.category] || 0) + 1;
      return counts;
    }, {});

    const nextEvent = getUpcomingEvents().sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    )[0];

    return {
      total,
      upcoming,
      past,
      categoryCounts,
      nextEvent,
    };
  };

  const displayEvents = (eventList = events) => {
    console.log(`📋 Displaying ${eventList.length} events:`);

    if (eventList.length === 0) {
      console.log("No events found");
      return;
    }

    eventList
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach((event) => {
        const statusIcon = event.status === "upcoming" ? "🔜" : "✅";
        console.log(
          `${statusIcon} ${event.title} - ${formatDate(event.date)} (${
            event.category
          })`
        );
      });
  };

  const updateEventStatus = () => {
    events.forEach((event) => {
      event.status = isUpcoming(event.date) ? "upcoming" : "past";
    });
    console.log("📊 Event statuses updated");
  };

  return {
    addEvent,
    getEvents,
    getUpcoming: getUpcomingEvents,
    getPast: getPastEvents,
    getByCategory: getEventsByCategory,
    search: searchEvents,
    sortByDate: sortEventsByDate,
    getStats: getEventStatistics,
    display: displayEvents,
    updateStatus: updateEventStatus,
  };
}

// Test event manager
let eventManager = createEventManager();

// Add some events
eventManager.addEvent("Team Meeting", "2024-08-15", "work");
eventManager.addEvent("Birthday Party", "2024-08-20", "personal");
eventManager.addEvent("Conference", "2024-07-10", "work");
eventManager.addEvent("Vacation", "2024-09-01", "personal");
eventManager.addEvent("Project Deadline", "2024-07-25", "work");

// Display all events
eventManager.display();

// Show upcoming events
console.log("\n=== UPCOMING EVENTS ===");
eventManager.display(eventManager.getUpcoming());

// Show work events
console.log("\n=== WORK EVENTS ===");
eventManager.display(eventManager.getByCategory("work"));

// Search events
console.log("\n=== SEARCH RESULTS ===");
eventManager.display(eventManager.search("meeting"));

// Show statistics
console.log("\n=== EVENT STATISTICS ===");
console.log(eventManager.getStats());
```

### Example 3: Functional Utilities Library

```javascript
const FunctionalUtils = {
  // Array utilities
  chunk: (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  unique: (array) => [...new Set(array)],

  flatten: (array) =>
    array.reduce(
      (flat, item) =>
        Array.isArray(item) ? flat.concat(flatten(item)) : flat.concat(item),
      []
    ),

  groupBy: (array, key) =>
    array.reduce((groups, item) => {
      const group = typeof key === "function" ? key(item) : item[key];
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {}),

  // Object utilities
  pick: (obj, keys) =>
    keys.reduce((picked, key) => {
      if (key in obj) picked[key] = obj[key];
      return picked;
    }, {}),

  omit: (obj, keys) =>
    Object.keys(obj)
      .filter((key) => !keys.includes(key))
      .reduce((omitted, key) => {
        omitted[key] = obj[key];
        return omitted;
      }, {}),

  // Function utilities
  debounce: (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Math utilities
  range: (start, end, step = 1) => {
    const result = [];
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
    return result;
  },

  sum: (array) => array.reduce((total, n) => total + n, 0),
  average: (array) => (array.length ? sum(array) / array.length : 0),
  max: (array) => Math.max(...array),
  min: (array) => Math.min(...array),

  // String utilities
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),

  camelCase: (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, ""),

  // Validation utilities
  isEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  isPhone: (phone) => /^\+?[\d\s\-\(\)]{10,}$/.test(phone),
  isURL: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

console.log("=== FUNCTIONAL UTILITIES TESTING ===");

// Test array utilities
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let duplicates = [1, 2, 2, 3, 3, 3, 4, 5];
let nested = [1, [2, 3], [4, [5, 6]], 7];

console.log("Original array:", numbers);
console.log("Chunked (size 3):", FunctionalUtils.chunk(numbers, 3));
console.log("Unique values:", FunctionalUtils.unique(duplicates));
console.log("Flattened:", FunctionalUtils.flatten(nested));

// Test with objects
let people = [
  { name: "Alice", age: 25, department: "Engineering" },
  { name: "Bob", age: 30, department: "Marketing" },
  { name: "Charlie", age: 25, department: "Engineering" },
  { name: "Diana", age: 28, department: "Sales" },
];

console.log("Grouped by age:", FunctionalUtils.groupBy(people, "age"));
console.log(
  "Grouped by department:",
  FunctionalUtils.groupBy(people, "department")
);

// Test object utilities
let person = {
  name: "John",
  age: 30,
  email: "john@example.com",
  password: "secret",
};
console.log(
  "Picked properties:",
  FunctionalUtils.pick(person, ["name", "email"])
);
console.log("Omitted properties:", FunctionalUtils.omit(person, ["password"]));

// Test math utilities
console.log("Range 1-10:", FunctionalUtils.range(1, 11));
console.log("Sum:", FunctionalUtils.sum(numbers));
console.log("Average:", FunctionalUtils.average(numbers));
console.log("Max:", FunctionalUtils.max(numbers));
console.log("Min:", FunctionalUtils.min(numbers));

// Test string utilities
console.log("Capitalize:", FunctionalUtils.capitalize("hello world"));
console.log("Camel case:", FunctionalUtils.camelCase("hello world example"));

// Test validation
console.log("Email valid:", FunctionalUtils.isEmail("test@example.com"));
console.log("Phone valid:", FunctionalUtils.isPhone("+1-234-567-8900"));
console.log("URL valid:", FunctionalUtils.isURL("https://example.com"));
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Array Processing

```javascript
let products = [
  { name: "Laptop", price: 999, category: "Electronics", inStock: true },
  { name: "Phone", price: 599, category: "Electronics", inStock: false },
  { name: "Shirt", price: 29, category: "Clothing", inStock: true },
  { name: "Shoes", price: 89, category: "Clothing", inStock: true },
  { name: "Watch", price: 199, category: "Accessories", inStock: false },
];

console.log("=== ARROW FUNCTION EXERCISE 1 ===");

// Use arrow functions to solve these:

// 1. Get names of all products
const productNames = products.map((product) => product.name);
console.log("Product names:", productNames);

// 2. Get only products that are in stock
const inStockProducts = products.filter((product) => product.inStock);
console.log(
  "In stock products:",
  inStockProducts.map((p) => p.name)
);

// 3. Get expensive products (price > 100)
const expensiveProducts = products.filter((product) => product.price > 100);
console.log(
  "Expensive products:",
  expensiveProducts.map((p) => `${p.name}: $${p.price}`)
);

// 4. Calculate total value of in-stock products
const totalValue = products
  .filter((product) => product.inStock)
  .reduce((total, product) => total + product.price, 0);
console.log("Total value of in-stock products:", totalValue);

// 5. Group products by category
const productsByCategory = products.reduce((groups, product) => {
  const category = product.category;
  if (!groups[category]) groups[category] = [];
  groups[category].push(product);
  return groups;
}, {});
console.log("Products by category:", productsByCategory);
```

### Exercise 2: Text Processing

```javascript
let sentences = [
  "JavaScript is a powerful programming language",
  "Arrow functions make code more concise",
  "Functional programming is elegant and efficient",
  "Practice makes perfect in coding",
];

console.log("=== ARROW FUNCTION EXERCISE 2 ===");

// Use arrow functions for text processing:

// 1. Convert all sentences to uppercase
const upperCaseSentences = sentences.map((sentence) => sentence.toUpperCase());
console.log("Uppercase:", upperCaseSentences);

// 2. Get word count for each sentence
const wordCounts = sentences.map((sentence) => ({
  sentence: sentence,
  wordCount: sentence.split(" ").length,
}));
console.log("Word counts:", wordCounts);

// 3. Find sentences containing specific words
const javascriptSentences = sentences.filter((sentence) =>
  sentence.toLowerCase().includes("javascript")
);
console.log("JavaScript sentences:", javascriptSentences);

// 4. Get all unique words (case insensitive)
const allWords = sentences
  .join(" ")
  .toLowerCase()
  .split(" ")
  .filter((word, index, array) => array.indexOf(word) === index);
console.log("Unique words:", allWords);

// 5. Find the longest sentence
const longestSentence = sentences.reduce((longest, current) =>
  current.length > longest.length ? current : longest
);
console.log("Longest sentence:", longestSentence);
```

## 📚 Key Takeaways

1. **Arrow functions are concise** - Less syntax for simple functions
2. **Great for functional programming** - Perfect for array methods
3. **Different `this` behavior** - Inherits `this` from enclosing scope
4. **No `arguments` object** - Use rest parameters instead
5. **Cannot be constructors** - Use regular functions for constructors
6. **Implicit return** - Single expressions don't need `return` keyword

## 🎯 When to Use Arrow Functions vs Regular Functions

### Use Arrow Functions For:

- Short, simple functions
- Array method callbacks (map, filter, reduce)
- Functions that need to preserve `this` context
- Functional programming patterns

### Use Regular Functions For:

- Object methods
- Constructor functions
- Functions that need `arguments` object
- Event handlers that need dynamic `this`

## ➡️ What's Next?

Excellent work mastering arrow functions! 🎉 You now have a powerful tool for writing clean, concise code and working with functional programming patterns.

Next, you'll learn about **Template Literals** - a modern way to work with strings that makes building dynamic text much easier and more readable.

Your next lesson: **22. Template Literals - Better String Handling**

## 🔗 Quick Reference

```javascript
// Arrow function syntax
const func = () => "no parameters";
const func = (x) => x * 2; // single parameter
const func = (a, b) => a + b; // multiple parameters
const func = (x) => {
  return x * 2;
}; // block body
const func = (x) => ({ key: x }); // return object

// Array methods with arrows
array.map((item) => transform);
array.filter((item) => condition);
array.reduce((acc, item) => result, initial);

// Differences from regular functions
// - Inherit 'this' from parent scope
// - No 'arguments' object
// - Cannot be used as constructors
// - Implicit return for expressions
```

You're mastering modern JavaScript syntax! 🚀
