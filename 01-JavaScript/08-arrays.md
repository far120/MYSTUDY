# Arrays - Working with Lists of Data 📋

Welcome to **arrays** - one of the most important data structures in programming! Arrays let you store and work with lists of information, like a shopping list, a collection of photos, or user names in an app.

## 🤔 What are Arrays?

In real life, you work with lists all the time:

- 📝 **Shopping list**: milk, bread, eggs, cheese
- 🎵 **Playlist**: song1, song2, song3, song4
- 👥 **Contact list**: Alice, Bob, Charlie, Diana
- 📚 **Book collection**: book1, book2, book3

In programming, **arrays** store these lists in a single variable!

## 📊 Creating Arrays

### Basic Array Creation:

```javascript
// Creating arrays with different data types
let fruits = ["apple", "banana", "orange", "grape"];
let numbers = [1, 2, 3, 4, 5];
let prices = [19.99, 29.5, 15.75, 42.0];
let mixedData = ["John", 25, true, "Engineer"];

console.log(fruits); // ["apple", "banana", "orange", "grape"]
console.log(numbers); // [1, 2, 3, 4, 5]
```

### Empty Arrays:

```javascript
let emptyArray = [];
let todoList = []; // We'll add items later

console.log(emptyArray); // []
```

## 🔍 Accessing Array Elements

Arrays use **index numbers** starting from 0:

```javascript
let colors = ["red", "green", "blue", "yellow"];

console.log(colors[0]); // "red" (first item)
console.log(colors[1]); // "green" (second item)
console.log(colors[2]); // "blue" (third item)
console.log(colors[3]); // "yellow" (fourth item)

// Remember: Arrays start counting at 0!
// Index:    0      1       2       3
// Value:  "red" "green" "blue" "yellow"
```

### Array Length:

```javascript
let animals = ["cat", "dog", "bird", "fish"];

console.log(animals.length); // 4 (number of items)

// Get the last item using length
let lastAnimal = animals[animals.length - 1];
console.log(lastAnimal); // "fish"
```

## ✏️ Modifying Arrays

### Changing Existing Items:

```javascript
let fruits = ["apple", "banana", "orange"];
console.log(fruits); // ["apple", "banana", "orange"]

fruits[1] = "grape"; // Change "banana" to "grape"
console.log(fruits); // ["apple", "grape", "orange"]
```

### Adding Items to Arrays:

```javascript
let numbers = [1, 2, 3];

// Add to the end
numbers.push(4);
numbers.push(5);
console.log(numbers); // [1, 2, 3, 4, 5]

// Add to the beginning
numbers.unshift(0);
console.log(numbers); // [0, 1, 2, 3, 4, 5]

// Add multiple items at once
numbers.push(6, 7, 8);
console.log(numbers); // [0, 1, 2, 3, 4, 5, 6, 7, 8]
```

### Removing Items from Arrays:

```javascript
let colors = ["red", "green", "blue", "yellow"];

// Remove from the end
let removedColor = colors.pop();
console.log(removedColor); // "yellow"
console.log(colors); // ["red", "green", "blue"]

// Remove from the beginning
let firstColor = colors.shift();
console.log(firstColor); // "red"
console.log(colors); // ["green", "blue"]

// Remove specific items (splice)
let fruits = ["apple", "banana", "orange", "grape"];
fruits.splice(1, 2); // Remove 2 items starting at index 1
console.log(fruits); // ["apple", "grape"]
```

## 🔄 Looping Through Arrays

### Using For Loops:

```javascript
let students = ["Alice", "Bob", "Charlie", "Diana"];

console.log("Class roster:");
for (let i = 0; i < students.length; i++) {
  console.log(i + 1 + ". " + students[i]);
}

// Output:
// 1. Alice
// 2. Bob
// 3. Charlie
// 4. Diana
```

### Using For...of Loops (Modern):

```javascript
let hobbies = ["reading", "gaming", "cooking", "hiking"];

console.log("My hobbies:");
for (let hobby of hobbies) {
  console.log("- " + hobby);
}

// Output:
// - reading
// - gaming
// - cooking
// - hiking
```

## 🧪 Practical Examples

### Example 1: Grade Manager

```javascript
let grades = [85, 92, 78, 96, 88];
let studentNames = ["Alice", "Bob", "Charlie", "Diana", "Eve"];

console.log("Grade Report:");
console.log("=".repeat(30));

let total = 0;
for (let i = 0; i < grades.length; i++) {
  let grade = grades[i];
  let name = studentNames[i];
  total += grade;

  let letterGrade;
  if (grade >= 90) letterGrade = "A";
  else if (grade >= 80) letterGrade = "B";
  else if (grade >= 70) letterGrade = "C";
  else if (grade >= 60) letterGrade = "D";
  else letterGrade = "F";

  console.log(`${name}: ${grade}% (${letterGrade})`);
}

let average = total / grades.length;
console.log("=".repeat(30));
console.log(`Class average: ${average.toFixed(1)}%`);
```

### Example 2: Shopping Cart

```javascript
let cartItems = ["Laptop", "Mouse", "Keyboard", "Monitor"];
let cartPrices = [999.99, 29.99, 79.99, 299.99];
let cartQuantities = [1, 2, 1, 1];

console.log("🛒 Shopping Cart:");
console.log("=".repeat(50));

let subtotal = 0;
for (let i = 0; i < cartItems.length; i++) {
  let item = cartItems[i];
  let price = cartPrices[i];
  let quantity = cartQuantities[i];
  let lineTotal = price * quantity;

  subtotal += lineTotal;

  console.log(`${item}`);
  console.log(
    `  Price: $${price.toFixed(2)} × ${quantity} = $${lineTotal.toFixed(2)}`
  );
  console.log();
}

let tax = subtotal * 0.08; // 8% tax
let total = subtotal + tax;

console.log("=".repeat(50));
console.log(`Subtotal: $${subtotal.toFixed(2)}`);
console.log(`Tax (8%): $${tax.toFixed(2)}`);
console.log(`Total: $${total.toFixed(2)}`);
```

### Example 3: Todo List Manager

```javascript
let todoList = [];

function addTodo(task) {
  todoList.push(task);
  console.log(`✅ Added: "${task}"`);
}

function removeTodo(index) {
  if (index >= 0 && index < todoList.length) {
    let removed = todoList.splice(index, 1)[0];
    console.log(`❌ Removed: "${removed}"`);
  } else {
    console.log("Invalid task number!");
  }
}

function showTodos() {
  console.log("\n📋 Todo List:");
  if (todoList.length === 0) {
    console.log("No tasks yet!");
  } else {
    for (let i = 0; i < todoList.length; i++) {
      console.log(`${i + 1}. ${todoList[i]}`);
    }
  }
  console.log();
}

// Using the todo list
addTodo("Learn JavaScript");
addTodo("Practice coding");
addTodo("Build a project");
showTodos();

removeTodo(1); // Remove "Practice coding"
showTodos();

addTodo("Review arrays");
showTodos();
```

## 🎮 Interactive Exercises

### Exercise 1: Number Statistics

```javascript
let numbers = [12, 7, 23, 8, 15, 31, 4, 19];

// Find maximum
let max = numbers[0];
for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}

// Find minimum
let min = numbers[0];
for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] < min) {
    min = numbers[i];
  }
}

// Calculate sum and average
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
let average = sum / numbers.length;

// Count even and odd
let evenCount = 0;
let oddCount = 0;
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evenCount++;
  } else {
    oddCount++;
  }
}

console.log("📊 Number Statistics:");
console.log(`Numbers: ${numbers.join(", ")}`);
console.log(`Maximum: ${max}`);
console.log(`Minimum: ${min}`);
console.log(`Sum: ${sum}`);
console.log(`Average: ${average.toFixed(2)}`);
console.log(`Even numbers: ${evenCount}`);
console.log(`Odd numbers: ${oddCount}`);
```

### Exercise 2: Word Counter

```javascript
let sentence = "The quick brown fox jumps over the lazy dog";
let words = sentence.split(" "); // Split into array of words

console.log("📝 Word Analysis:");
console.log(`Original sentence: "${sentence}"`);
console.log(`Words: ${words.join(", ")}`);
console.log(`Word count: ${words.length}`);

// Find longest and shortest words
let longestWord = words[0];
let shortestWord = words[0];

for (let i = 1; i < words.length; i++) {
  if (words[i].length > longestWord.length) {
    longestWord = words[i];
  }
  if (words[i].length < shortestWord.length) {
    shortestWord = words[i];
  }
}

console.log(`Longest word: "${longestWord}" (${longestWord.length} letters)`);
console.log(
  `Shortest word: "${shortestWord}" (${shortestWord.length} letters)`
);

// Count words that start with specific letter
let letterToFind = "o";
let wordsStartingWithLetter = 0;
for (let word of words) {
  if (word.toLowerCase().startsWith(letterToFind.toLowerCase())) {
    wordsStartingWithLetter++;
  }
}

console.log(
  `Words starting with "${letterToFind}": ${wordsStartingWithLetter}`
);
```

### Exercise 3: Inventory Management

```javascript
let inventory = [];

function addItem(name, quantity, price) {
  let item = {
    name: name,
    quantity: quantity,
    price: price,
    value: quantity * price,
  };
  inventory.push(item);
  console.log(`✅ Added ${quantity}x ${name} at $${price} each`);
}

function removeItem(name) {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].name.toLowerCase() === name.toLowerCase()) {
      let removed = inventory.splice(i, 1)[0];
      console.log(`❌ Removed ${removed.name} from inventory`);
      return;
    }
  }
  console.log(`Item "${name}" not found!`);
}

function showInventory() {
  console.log("\n📦 Current Inventory:");
  if (inventory.length === 0) {
    console.log("Inventory is empty!");
    return;
  }

  console.log("=".repeat(60));
  console.log(
    "Item".padEnd(20) + "Qty".padEnd(8) + "Price".padEnd(12) + "Total Value"
  );
  console.log("=".repeat(60));

  let totalValue = 0;
  for (let item of inventory) {
    console.log(
      item.name.padEnd(20) +
        item.quantity.toString().padEnd(8) +
        `$${item.price.toFixed(2)}`.padEnd(12) +
        `$${item.value.toFixed(2)}`
    );
    totalValue += item.value;
  }

  console.log("=".repeat(60));
  console.log(`Total Inventory Value: $${totalValue.toFixed(2)}`);
  console.log();
}

function findExpensiveItems(minPrice) {
  let expensiveItems = [];
  for (let item of inventory) {
    if (item.price >= minPrice) {
      expensiveItems.push(item);
    }
  }
  return expensiveItems;
}

// Test the inventory system
addItem("Laptop", 5, 999.99);
addItem("Mouse", 20, 29.99);
addItem("Keyboard", 15, 79.99);
addItem("Monitor", 8, 299.99);
showInventory();

console.log("\n💰 Items worth $100 or more:");
let expensiveItems = findExpensiveItems(100);
for (let item of expensiveItems) {
  console.log(`- ${item.name}: $${item.price.toFixed(2)}`);
}

removeItem("Mouse");
showInventory();
```

## 🚀 Advanced Array Concepts

### 1. Multidimensional Arrays (Arrays of Arrays)

```javascript
// 2D Array - like a grid or table
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log("Matrix:");
for (let row = 0; row < matrix.length; row++) {
  let rowString = "";
  for (let col = 0; col < matrix[row].length; col++) {
    rowString += matrix[row][col] + " ";
  }
  console.log(rowString);
}

// Student grades by subject
let studentGrades = [
  ["Alice", 85, 92, 78], // [name, math, science, english]
  ["Bob", 90, 88, 85],
  ["Charlie", 78, 85, 90],
];

console.log("\nStudent Report Cards:");
for (let i = 0; i < studentGrades.length; i++) {
  let name = studentGrades[i][0];
  let math = studentGrades[i][1];
  let science = studentGrades[i][2];
  let english = studentGrades[i][3];
  let average = (math + science + english) / 3;

  console.log(
    `${name}: Math=${math}, Science=${science}, English=${english}, Avg=${average.toFixed(
      1
    )}`
  );
}
```

### 2. Array Comparison and Copying

```javascript
let original = [1, 2, 3, 4, 5];
let reference = original; // This creates a reference, not a copy!
let copy = [...original]; // This creates a real copy

original.push(6);

console.log("Original:", original); // [1, 2, 3, 4, 5, 6]
console.log("Reference:", reference); // [1, 2, 3, 4, 5, 6] - changed too!
console.log("Copy:", copy); // [1, 2, 3, 4, 5] - unchanged

// Comparing arrays
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

console.log(arraysEqual([1, 2, 3], [1, 2, 3])); // true
console.log(arraysEqual([1, 2, 3], [1, 2, 4])); // false
```

## ⚠️ Common Array Mistakes

### 1. Index Out of Bounds

```javascript
let colors = ["red", "green", "blue"];

console.log(colors[0]); // "red" ✅
console.log(colors[3]); // undefined ❌ (no 4th item)
console.log(colors[-1]); // undefined ❌ (negative index)

// Safe way to access last item
console.log(colors[colors.length - 1]); // "blue" ✅
```

### 2. Modifying Array While Looping

```javascript
let numbers = [1, 2, 3, 4, 5];

// Wrong: Removing items while looping forward
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    numbers.splice(i, 1); // This skips elements!
  }
}

// Right: Loop backwards when removing
numbers = [1, 2, 3, 4, 5];
for (let i = numbers.length - 1; i >= 0; i--) {
  if (numbers[i] % 2 === 0) {
    numbers.splice(i, 1);
  }
}
console.log(numbers); // [1, 3, 5]
```

### 3. Array vs Object Confusion

```javascript
// Array - ordered list with numeric indexes
let fruits = ["apple", "banana", "orange"];
console.log(fruits[0]); // "apple"

// Object - key-value pairs with named properties
let person = { name: "John", age: 25, city: "New York" };
console.log(person.name); // "John"
```

## 🎯 Key Concepts to Remember

1. **Arrays store lists** of related data
2. **Indexes start at 0** (first item is array[0])
3. **Use .length** to get the number of items
4. **Push/pop** for end, **unshift/shift** for beginning
5. **For loops** to process all items
6. **Arrays are mutable** (can be changed)
7. **Always check bounds** when accessing items

## 💡 When to Use Arrays

### ✅ Perfect for Arrays:

- **Lists of similar items**: products, users, scores
- **Ordered data**: steps in a process, timeline events
- **Collections**: photos, songs, messages
- **Calculations**: numbers to process, data to analyze

### ❌ Consider Objects Instead:

- **Related but different data**: user profile (name, age, email)
- **Key-value relationships**: settings, configuration
- **Complex structures**: address (street, city, zip)

## 🚀 What's Next?

Fantastic! You now know how to work with arrays - one of the most fundamental data structures in programming. Next, we'll learn about **array methods** - powerful built-in functions that make working with arrays much easier and more efficient!

---

📋 **You've unlocked list management!** Every app that shows lists of data (social media feeds, shopping carts, contact lists, search results) uses arrays extensively. You're now ready to handle collections of data like a pro!
