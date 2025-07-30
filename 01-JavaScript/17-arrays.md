# 17. Arrays - Lists of Information 📋

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- What arrays are and why they're essential for managing data
- How to create, access, and modify arrays
- Common array operations and patterns
- How to iterate through arrays with loops
- Real-world applications of arrays in programming

## 🤔 What Are Arrays?

Arrays are ordered lists that can store multiple values in a single variable. Think of them like:

- **Shopping lists**: A list of items to buy
- **Playlists**: A list of songs in order
- **Class rosters**: A list of student names
- **Inventory**: A list of products with quantities

### Why Use Arrays?

Instead of creating separate variables for each item:

```javascript
// ❌ Without arrays (messy!)
let fruit1 = "apple";
let fruit2 = "banana";
let fruit3 = "orange";
let fruit4 = "grape";
// What if you have 100 fruits?
```

You can store them all in one array:

```javascript
// ✅ With arrays (organized!)
let fruits = ["apple", "banana", "orange", "grape"];
// Easy to manage any number of items!
```

## 🏗️ Creating Arrays

### Basic Array Creation

```javascript
// Empty array
let emptyArray = [];
console.log("Empty array:", emptyArray);

// Array with numbers
let numbers = [1, 2, 3, 4, 5];
console.log("Numbers:", numbers);

// Array with strings
let colors = ["red", "green", "blue", "yellow"];
console.log("Colors:", colors);

// Array with mixed data types
let mixedData = ["Alice", 25, true, "Engineer"];
console.log("Mixed data:", mixedData);

// Array with variables
let name = "Bob";
let age = 30;
let person = [name, age, "Developer"];
console.log("Person:", person);
```

### Array Constructor (Alternative Method)

```javascript
// Using Array constructor
let arrayFromConstructor = new Array(5); // Creates array with 5 empty slots
console.log("From constructor:", arrayFromConstructor);

let arrayWithItems = new Array("cat", "dog", "bird");
console.log("With items:", arrayWithItems);

// Usually prefer literal notation []
let preferredWay = ["cat", "dog", "bird"]; // Same result, cleaner syntax
```

## 🔍 Accessing Array Elements

Arrays use **zero-based indexing** - the first element is at index 0:

### Basic Access

```javascript
let fruits = ["apple", "banana", "orange", "grape", "kiwi"];

console.log("=== ARRAY ACCESS ===");
console.log("First fruit (index 0):", fruits[0]); // "apple"
console.log("Second fruit (index 1):", fruits[1]); // "banana"
console.log("Third fruit (index 2):", fruits[2]); // "orange"
console.log("Last fruit:", fruits[4]); // "kiwi"

// Array length
console.log("Array length:", fruits.length); // 5

// Last element using length
console.log("Last element:", fruits[fruits.length - 1]); // "kiwi"
```

### Dynamic Access with Variables

```javascript
let students = ["Alice", "Bob", "Charlie", "Diana", "Eve"];

console.log("=== DYNAMIC ACCESS ===");

// Using variables as indices
let firstIndex = 0;
let lastIndex = students.length - 1;

console.log(`First student: ${students[firstIndex]}`);
console.log(`Last student: ${students[lastIndex]}`);

// Access with calculations
for (let i = 0; i < students.length; i++) {
  console.log(`Student ${i + 1}: ${students[i]}`);
}
```

### Out-of-Bounds Access

```javascript
let numbers = [10, 20, 30];

console.log("=== OUT OF BOUNDS ===");
console.log("Valid index [1]:", numbers[1]); // 20
console.log("Invalid index [5]:", numbers[5]); // undefined
console.log("Negative index [-1]:", numbers[-1]); // undefined (no negative indexing)
```

## ✏️ Modifying Arrays

### Changing Existing Elements

```javascript
let shoppingList = ["milk", "bread", "eggs"];

console.log("Original list:", shoppingList);

// Change individual elements
shoppingList[0] = "almond milk"; // Change first item
shoppingList[2] = "free-range eggs"; // Change third item

console.log("Updated list:", shoppingList);
```

### Adding Elements

```javascript
let hobbies = ["reading", "swimming"];

console.log("=== ADDING ELEMENTS ===");
console.log("Starting hobbies:", hobbies);

// Add to the end with push()
hobbies.push("hiking");
console.log("After push('hiking'):", hobbies);

// Add multiple elements at once
hobbies.push("cooking", "gardening");
console.log("After push multiple:", hobbies);

// Add to the beginning with unshift()
hobbies.unshift("photography");
console.log("After unshift('photography'):", hobbies);

// Add at specific index (we'll learn splice later)
hobbies[6] = "traveling";
console.log("After setting index 6:", hobbies);
```

### Removing Elements

```javascript
let tasks = ["wake up", "exercise", "work", "dinner", "sleep"];

console.log("=== REMOVING ELEMENTS ===");
console.log("Starting tasks:", tasks);

// Remove from end with pop()
let removedTask = tasks.pop();
console.log(`Removed "${removedTask}" from end:`, tasks);

// Remove from beginning with shift()
let firstTask = tasks.shift();
console.log(`Removed "${firstTask}" from beginning:`, tasks);

// Remove by setting to undefined (not recommended)
tasks[1] = undefined;
console.log("After setting index 1 to undefined:", tasks);
```

## 🔄 Looping Through Arrays

### For Loop (Most Common)

```javascript
let scores = [85, 92, 78, 96, 87];

console.log("=== FOR LOOP ===");
console.log("Student scores:");

for (let i = 0; i < scores.length; i++) {
  console.log(`Student ${i + 1}: ${scores[i]} points`);
}

// Calculate average
let total = 0;
for (let i = 0; i < scores.length; i++) {
  total += scores[i];
}
let average = total / scores.length;
console.log(`Class average: ${average.toFixed(1)}`);
```

### For...of Loop (Simpler for Values)

```javascript
let animals = ["cat", "dog", "bird", "fish"];

console.log("=== FOR...OF LOOP ===");
console.log("Animals in the zoo:");

for (let animal of animals) {
  console.log(`🐾 ${animal}`);
}
```

### While Loop with Arrays

```javascript
let inventory = ["apples", "bananas", "oranges", "grapes"];

console.log("=== WHILE LOOP ===");
console.log("Checking inventory:");

let index = 0;
while (index < inventory.length) {
  console.log(`Item ${index + 1}: ${inventory[index]}`);
  index++;
}
```

## 🎯 Real-World Array Examples

### Example 1: Grade Management System

```javascript
function manageStudentGrades() {
  let studentNames = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Diana Prince",
  ];
  let mathGrades = [95, 87, 92, 88];
  let scienceGrades = [89, 94, 85, 96];

  console.log("=== GRADE MANAGEMENT SYSTEM ===");

  // Display all grades
  for (let i = 0; i < studentNames.length; i++) {
    let mathGrade = mathGrades[i];
    let scienceGrade = scienceGrades[i];
    let average = (mathGrade + scienceGrade) / 2;

    console.log(`${studentNames[i]}:`);
    console.log(`  Math: ${mathGrade}, Science: ${scienceGrade}`);
    console.log(`  Average: ${average.toFixed(1)}`);
    console.log("");
  }

  // Find highest math grade
  let highestMath = mathGrades[0];
  let topMathStudent = 0;

  for (let i = 1; i < mathGrades.length; i++) {
    if (mathGrades[i] > highestMath) {
      highestMath = mathGrades[i];
      topMathStudent = i;
    }
  }

  console.log(
    `🏆 Top Math Student: ${studentNames[topMathStudent]} (${highestMath})`
  );

  // Calculate class averages
  let mathTotal = 0;
  let scienceTotal = 0;

  for (let i = 0; i < mathGrades.length; i++) {
    mathTotal += mathGrades[i];
    scienceTotal += scienceGrades[i];
  }

  let mathAverage = mathTotal / mathGrades.length;
  let scienceAverage = scienceTotal / scienceGrades.length;

  console.log(`📊 Class Averages:`);
  console.log(`  Math: ${mathAverage.toFixed(1)}`);
  console.log(`  Science: ${scienceAverage.toFixed(1)}`);
}

manageStudentGrades();
```

### Example 2: Shopping Cart System

```javascript
function createShoppingCart() {
  let items = [];
  let prices = [];
  let quantities = [];

  function addItem(itemName, price, quantity = 1) {
    console.log(`Adding ${quantity} ${itemName}(s) at $${price} each`);

    // Check if item already exists
    let existingIndex = -1;
    for (let i = 0; i < items.length; i++) {
      if (items[i] === itemName) {
        existingIndex = i;
        break;
      }
    }

    if (existingIndex >= 0) {
      // Update existing item
      quantities[existingIndex] += quantity;
      console.log(`Updated quantity to ${quantities[existingIndex]}`);
    } else {
      // Add new item
      items.push(itemName);
      prices.push(price);
      quantities.push(quantity);
      console.log("Item added to cart");
    }
  }

  function displayCart() {
    console.log("\n🛒 SHOPPING CART:");

    if (items.length === 0) {
      console.log("Cart is empty");
      return;
    }

    let totalCost = 0;

    for (let i = 0; i < items.length; i++) {
      let itemTotal = prices[i] * quantities[i];
      totalCost += itemTotal;

      console.log(
        `${items[i]}: ${quantities[i]} × $${prices[i]} = $${itemTotal.toFixed(
          2
        )}`
      );
    }

    console.log(`\nTotal: $${totalCost.toFixed(2)}`);
    return totalCost;
  }

  function removeItem(itemName) {
    console.log(`Removing ${itemName} from cart`);

    for (let i = 0; i < items.length; i++) {
      if (items[i] === itemName) {
        items.splice(i, 1); // Remove from items array
        prices.splice(i, 1); // Remove from prices array
        quantities.splice(i, 1); // Remove from quantities array
        console.log(`${itemName} removed`);
        return;
      }
    }

    console.log(`${itemName} not found in cart`);
  }

  return {
    add: addItem,
    display: displayCart,
    remove: removeItem,
    getItemCount: () => items.length,
  };
}

// Test shopping cart
let myCart = createShoppingCart();

myCart.add("Laptop", 999.99, 1);
myCart.add("Mouse", 29.99, 2);
myCart.add("Keyboard", 79.99, 1);
myCart.add("Mouse", 29.99, 1); // Add more mice

myCart.display();

myCart.remove("Keyboard");
myCart.display();

console.log(`Items in cart: ${myCart.getItemCount()}`);
```

### Example 3: Weekly Schedule Manager

```javascript
function createWeeklySchedule() {
  let daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let schedule = [
    [], // Monday
    [], // Tuesday
    [], // Wednesday
    [], // Thursday
    [], // Friday
    [], // Saturday
    [], // Sunday
  ];

  function addEvent(day, time, event) {
    let dayIndex = -1;

    // Find day index
    for (let i = 0; i < daysOfWeek.length; i++) {
      if (daysOfWeek[i].toLowerCase() === day.toLowerCase()) {
        dayIndex = i;
        break;
      }
    }

    if (dayIndex === -1) {
      console.log(`❌ Invalid day: ${day}`);
      return;
    }

    let eventInfo = `${time}: ${event}`;
    schedule[dayIndex].push(eventInfo);

    console.log(`✅ Added to ${daysOfWeek[dayIndex]}: ${eventInfo}`);
  }

  function displayWeek() {
    console.log("\n📅 WEEKLY SCHEDULE:");
    console.log("=".repeat(40));

    for (let i = 0; i < daysOfWeek.length; i++) {
      console.log(`\n${daysOfWeek[i].toUpperCase()}:`);

      if (schedule[i].length === 0) {
        console.log("  No events scheduled");
      } else {
        for (let j = 0; j < schedule[i].length; j++) {
          console.log(`  ${schedule[i][j]}`);
        }
      }
    }
  }

  function displayDay(day) {
    let dayIndex = -1;

    for (let i = 0; i < daysOfWeek.length; i++) {
      if (daysOfWeek[i].toLowerCase() === day.toLowerCase()) {
        dayIndex = i;
        break;
      }
    }

    if (dayIndex === -1) {
      console.log(`❌ Invalid day: ${day}`);
      return;
    }

    console.log(`\n📅 ${daysOfWeek[dayIndex].toUpperCase()} SCHEDULE:`);

    if (schedule[dayIndex].length === 0) {
      console.log("No events scheduled");
    } else {
      for (let i = 0; i < schedule[dayIndex].length; i++) {
        console.log(`${i + 1}. ${schedule[dayIndex][i]}`);
      }
    }
  }

  return {
    addEvent: addEvent,
    displayWeek: displayWeek,
    displayDay: displayDay,
  };
}

// Test weekly schedule
let mySchedule = createWeeklySchedule();

mySchedule.addEvent("Monday", "9:00 AM", "Team Meeting");
mySchedule.addEvent("Monday", "2:00 PM", "Project Review");
mySchedule.addEvent("Tuesday", "10:00 AM", "Client Call");
mySchedule.addEvent("Wednesday", "1:00 PM", "Lunch with Sarah");
mySchedule.addEvent("Friday", "5:00 PM", "Happy Hour");

mySchedule.displayDay("Monday");
mySchedule.displayWeek();
```

## 🔍 Array Properties and Basic Methods

### Length Property

```javascript
let numbers = [10, 20, 30, 40, 50];

console.log("Array:", numbers);
console.log("Length:", numbers.length);

// Length changes when you modify the array
numbers.push(60);
console.log("After push:", numbers.length);

numbers.pop();
console.log("After pop:", numbers.length);

// You can set length directly (not usually recommended)
numbers.length = 3;
console.log("After setting length to 3:", numbers); // [10, 20, 30]
```

### Converting Arrays to Strings

```javascript
let fruits = ["apple", "banana", "orange"];

console.log("=== ARRAY TO STRING ===");

// toString() method
console.log("toString():", fruits.toString()); // "apple,banana,orange"

// join() method with custom separator
console.log("join with ', ':", fruits.join(", ")); // "apple, banana, orange"
console.log("join with ' | ':", fruits.join(" | ")); // "apple | banana | orange"
console.log("join with spaces:", fruits.join(" ")); // "apple banana orange"
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Basic Array Operations

```javascript
// Create an array of your favorite movies
let favoriteMovies = [
  "The Matrix",
  "Inception",
  "Interstellar",
  "Blade Runner",
];

console.log("=== MOVIE COLLECTION ===");

// Display all movies
console.log("My favorite movies:");
for (let i = 0; i < favoriteMovies.length; i++) {
  console.log(`${i + 1}. ${favoriteMovies[i]}`);
}

// Add a new movie
favoriteMovies.push("Dune");
console.log("\nAfter adding Dune:");
console.log(favoriteMovies);

// Remove the first movie
let removed = favoriteMovies.shift();
console.log(`\nRemoved: ${removed}`);
console.log("Updated list:", favoriteMovies);

// Find a specific movie
let searchMovie = "Inception";
let found = false;

for (let i = 0; i < favoriteMovies.length; i++) {
  if (favoriteMovies[i] === searchMovie) {
    console.log(`\n"${searchMovie}" found at position ${i + 1}`);
    found = true;
    break;
  }
}

if (!found) {
  console.log(`\n"${searchMovie}" not found in the list`);
}
```

### Exercise 2: Number Array Analysis

```javascript
// Create an array of test scores
let testScores = [95, 87, 92, 78, 85, 90, 88, 93];

console.log("=== TEST SCORE ANALYSIS ===");
console.log("Scores:", testScores);

// Find highest score
let highest = testScores[0];
for (let i = 1; i < testScores.length; i++) {
  if (testScores[i] > highest) {
    highest = testScores[i];
  }
}

// Find lowest score
let lowest = testScores[0];
for (let i = 1; i < testScores.length; i++) {
  if (testScores[i] < lowest) {
    lowest = testScores[i];
  }
}

// Calculate average
let total = 0;
for (let i = 0; i < testScores.length; i++) {
  total += testScores[i];
}
let average = total / testScores.length;

// Count scores above average
let aboveAverage = 0;
for (let i = 0; i < testScores.length; i++) {
  if (testScores[i] > average) {
    aboveAverage++;
  }
}

console.log(`Highest score: ${highest}`);
console.log(`Lowest score: ${lowest}`);
console.log(`Average score: ${average.toFixed(1)}`);
console.log(`Scores above average: ${aboveAverage}`);
```

## 🧪 Challenge Problems

### Challenge 1: Student Registration System

```javascript
function createStudentRegistry() {
  let studentNames = [];
  let studentAges = [];
  let studentGrades = [];

  function registerStudent(name, age, grade) {
    console.log(`Registering student: ${name}, Age: ${age}, Grade: ${grade}`);

    studentNames.push(name);
    studentAges.push(age);
    studentGrades.push(grade);

    console.log(`✅ ${name} registered successfully`);
  }

  function findStudent(name) {
    for (let i = 0; i < studentNames.length; i++) {
      if (studentNames[i].toLowerCase() === name.toLowerCase()) {
        return {
          index: i,
          name: studentNames[i],
          age: studentAges[i],
          grade: studentGrades[i],
        };
      }
    }
    return null;
  }

  function displayAllStudents() {
    console.log("\n👥 STUDENT REGISTRY:");
    console.log("=".repeat(30));

    if (studentNames.length === 0) {
      console.log("No students registered");
      return;
    }

    for (let i = 0; i < studentNames.length; i++) {
      console.log(
        `${i + 1}. ${studentNames[i]} (Age: ${studentAges[i]}, Grade: ${
          studentGrades[i]
        })`
      );
    }

    console.log(`\nTotal students: ${studentNames.length}`);
  }

  function getStatistics() {
    if (studentNames.length === 0) {
      console.log("No students to analyze");
      return;
    }

    // Calculate average age
    let totalAge = 0;
    for (let i = 0; i < studentAges.length; i++) {
      totalAge += studentAges[i];
    }
    let averageAge = totalAge / studentAges.length;

    // Count by grade
    let gradeCount = {};
    for (let i = 0; i < studentGrades.length; i++) {
      let grade = studentGrades[i];
      if (gradeCount[grade]) {
        gradeCount[grade]++;
      } else {
        gradeCount[grade] = 1;
      }
    }

    console.log("\n📊 STATISTICS:");
    console.log(`Average age: ${averageAge.toFixed(1)} years`);
    console.log("Students by grade:");

    for (let grade in gradeCount) {
      console.log(`  Grade ${grade}: ${gradeCount[grade]} students`);
    }
  }

  return {
    register: registerStudent,
    find: findStudent,
    displayAll: displayAllStudents,
    getStats: getStatistics,
  };
}

// Test student registry
let registry = createStudentRegistry();

registry.register("Alice Johnson", 15, 9);
registry.register("Bob Smith", 16, 10);
registry.register("Charlie Brown", 15, 9);
registry.register("Diana Prince", 17, 11);

registry.displayAll();

let student = registry.find("Bob Smith");
if (student) {
  console.log(
    `\nFound: ${student.name} is ${student.age} years old in grade ${student.grade}`
  );
}

registry.getStats();
```

## 📚 Key Takeaways

1. **Arrays store multiple values** - Perfect for lists and collections
2. **Zero-based indexing** - First element is at index 0
3. **Dynamic size** - Arrays can grow and shrink as needed
4. **Use loops to process arrays** - for, while, and for...of loops
5. **Arrays have useful properties** - .length tells you how many elements
6. **Arrays are reference types** - Multiple variables can point to same array
7. **Many built-in methods** - push(), pop(), shift(), unshift(), and more

## ➡️ What's Next?

Excellent work mastering arrays! 🎉 You now know how to store and manipulate lists of data effectively.

Next, you'll learn about **Array Methods** - powerful built-in functions that make working with arrays much easier and more elegant. You'll discover methods like map(), filter(), find(), and many others that will transform how you work with data.

Your next lesson: **18. Array Methods - Working with Lists**

## 🔗 Quick Reference

```javascript
// Creating arrays
let arr = [1, 2, 3];
let empty = [];

// Accessing elements
arr[0]; // First element
arr[arr.length - 1]; // Last element

// Modifying arrays
arr.push(4); // Add to end
arr.pop(); // Remove from end
arr.unshift(0); // Add to beginning
arr.shift(); // Remove from beginning

// Array properties
arr.length; // Number of elements

// Looping through arrays
for (let i = 0; i < arr.length; i++) {
  /* ... */
}
for (let item of arr) {
  /* ... */
}
```

You're building powerful data management skills! 🚀
