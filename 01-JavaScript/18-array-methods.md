# 18. Array Methods - Working with Lists 🛠️

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- Essential array methods that make working with data easier
- The difference between mutating and non-mutating methods
- How to transform, filter, and search arrays efficiently
- Functional programming concepts with arrays
- Real-world applications of array methods

## 🤔 What Are Array Methods?

Array methods are built-in functions that help you work with arrays more efficiently. Instead of writing loops for common tasks, you can use these powerful methods. Think of them as specialized tools:

- **Transform data**: Convert each item in an array
- **Filter data**: Keep only items that meet certain criteria
- **Search data**: Find specific items or check conditions
- **Combine data**: Join arrays or reduce them to single values

## 🔧 Essential Array Methods

### 1. push() and pop() - Adding/Removing from End

```javascript
let fruits = ["apple", "banana"];

console.log("=== PUSH AND POP ===");
console.log("Starting array:", fruits);

// push() adds to the end and returns new length
let newLength = fruits.push("orange");
console.log("After push('orange'):", fruits);
console.log("New length:", newLength);

// Add multiple items
fruits.push("grape", "kiwi");
console.log("After push multiple:", fruits);

// pop() removes from end and returns the removed item
let removed = fruits.pop();
console.log("Popped item:", removed);
console.log("After pop():", fruits);
```

### 2. unshift() and shift() - Adding/Removing from Beginning

```javascript
let colors = ["red", "green"];

console.log("=== UNSHIFT AND SHIFT ===");
console.log("Starting array:", colors);

// unshift() adds to beginning and returns new length
let newLength = colors.unshift("blue");
console.log("After unshift('blue'):", colors);
console.log("New length:", newLength);

// Add multiple items
colors.unshift("yellow", "purple");
console.log("After unshift multiple:", colors);

// shift() removes from beginning and returns the removed item
let removed = colors.shift();
console.log("Shifted item:", removed);
console.log("After shift():", colors);
```

### 3. slice() - Extract a Portion (Non-Mutating)

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("=== SLICE METHOD ===");
console.log("Original array:", numbers);

// slice(start, end) - end is not included
let middle = numbers.slice(3, 7);
console.log("slice(3, 7):", middle); // [4, 5, 6, 7]

// slice with just start index
let fromFifth = numbers.slice(4);
console.log("slice(4):", fromFifth); // [5, 6, 7, 8, 9, 10]

// slice with negative indices (count from end)
let lastThree = numbers.slice(-3);
console.log("slice(-3):", lastThree); // [8, 9, 10]

// Original array unchanged
console.log("Original unchanged:", numbers);
```

### 4. splice() - Add/Remove at Any Position (Mutating)

```javascript
let animals = ["cat", "dog", "bird", "fish", "rabbit"];

console.log("=== SPLICE METHOD ===");
console.log("Starting array:", animals);

// splice(start, deleteCount, ...itemsToAdd)
// Remove 2 items starting at index 1
let removed = animals.splice(1, 2);
console.log("Removed items:", removed); // ["dog", "bird"]
console.log("After removal:", animals); // ["cat", "fish", "rabbit"]

// Add items at index 1
animals.splice(1, 0, "hamster", "guinea pig");
console.log("After adding:", animals); // ["cat", "hamster", "guinea pig", "fish", "rabbit"]

// Replace items (remove 1, add 2)
animals.splice(2, 1, "parrot", "canary");
console.log("After replacing:", animals);
```

## 🔍 Search and Find Methods

### 5. indexOf() and lastIndexOf() - Find Position

```javascript
let letters = ["a", "b", "c", "b", "d", "b"];

console.log("=== INDEX METHODS ===");
console.log("Array:", letters);

// indexOf() finds first occurrence
console.log("indexOf('b'):", letters.indexOf("b")); // 1
console.log("indexOf('z'):", letters.indexOf("z")); // -1 (not found)

// lastIndexOf() finds last occurrence
console.log("lastIndexOf('b'):", letters.lastIndexOf("b")); // 5

// With start position
console.log("indexOf('b', 2):", letters.indexOf("b", 2)); // 3 (start searching from index 2)
```

### 6. includes() - Check if Item Exists

```javascript
let shoppingList = ["milk", "bread", "eggs", "cheese"];

console.log("=== INCLUDES METHOD ===");
console.log("Shopping list:", shoppingList);

console.log("includes('milk'):", shoppingList.includes("milk")); // true
console.log("includes('butter'):", shoppingList.includes("butter")); // false

// Case sensitive
console.log("includes('MILK'):", shoppingList.includes("MILK")); // false
```

### 7. find() and findIndex() - Find with Condition

```javascript
let students = [
  { name: "Alice", age: 20, grade: 85 },
  { name: "Bob", age: 19, grade: 92 },
  { name: "Charlie", age: 21, grade: 78 },
  { name: "Diana", age: 20, grade: 96 },
];

console.log("=== FIND METHODS ===");

// find() returns first item that matches condition
let topStudent = students.find((student) => student.grade >= 90);
console.log("Top student:", topStudent);

// findIndex() returns index of first item that matches
let topStudentIndex = students.findIndex((student) => student.grade >= 90);
console.log("Top student index:", topStudentIndex);

// Find student by name
let alice = students.find((student) => student.name === "Alice");
console.log("Found Alice:", alice);

// Returns undefined if not found
let missing = students.find((student) => student.age > 25);
console.log("Student over 25:", missing); // undefined
```

## 🔄 Transform Methods

### 8. map() - Transform Each Element

```javascript
let prices = [19.99, 29.99, 39.99, 49.99];

console.log("=== MAP METHOD ===");
console.log("Original prices:", prices);

// Transform each price (add tax)
let pricesWithTax = prices.map((price) => price * 1.08);
console.log("With 8% tax:", pricesWithTax);

// Format as currency
let formattedPrices = prices.map((price) => `$${price.toFixed(2)}`);
console.log("Formatted:", formattedPrices);

// Transform objects
let products = [
  { name: "Laptop", price: 999 },
  { name: "Phone", price: 599 },
  { name: "Tablet", price: 399 },
];

let productNames = products.map((product) => product.name);
console.log("Product names:", productNames);

let discountedProducts = products.map((product) => ({
  name: product.name,
  originalPrice: product.price,
  salePrice: product.price * 0.8,
}));
console.log("Discounted products:", discountedProducts);
```

### 9. filter() - Keep Items That Match Condition

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("=== FILTER METHOD ===");
console.log("All numbers:", numbers);

// Filter even numbers
let evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("Even numbers:", evenNumbers);

// Filter numbers greater than 5
let bigNumbers = numbers.filter((num) => num > 5);
console.log("Numbers > 5:", bigNumbers);

// Filter with objects
let employees = [
  { name: "Alice", department: "Engineering", salary: 75000 },
  { name: "Bob", department: "Marketing", salary: 65000 },
  { name: "Charlie", department: "Engineering", salary: 80000 },
  { name: "Diana", department: "Sales", salary: 70000 },
];

let engineers = employees.filter((emp) => emp.department === "Engineering");
console.log("Engineers:", engineers);

let highEarners = employees.filter((emp) => emp.salary >= 70000);
console.log("High earners:", highEarners);
```

## 🔄 Reduce and Aggregate Methods

### 10. reduce() - Combine All Elements into Single Value

```javascript
let numbers = [1, 2, 3, 4, 5];

console.log("=== REDUCE METHOD ===");
console.log("Numbers:", numbers);

// Sum all numbers
let sum = numbers.reduce((total, current) => total + current, 0);
console.log("Sum:", sum);

// Find maximum
let max = numbers.reduce((maximum, current) =>
  current > maximum ? current : maximum
);
console.log("Maximum:", max);

// Build object from array
let words = ["hello", "world", "javascript", "amazing"];
let wordLengths = words.reduce((obj, word) => {
  obj[word] = word.length;
  return obj;
}, {});
console.log("Word lengths:", wordLengths);

// Count occurrences
let votes = ["apple", "banana", "apple", "orange", "banana", "apple"];
let voteCount = votes.reduce((count, vote) => {
  count[vote] = (count[vote] || 0) + 1;
  return count;
}, {});
console.log("Vote count:", voteCount);
```

## 🎯 Real-World Examples

### Example 1: E-commerce Product Management

```javascript
function createProductManager() {
  let products = [
    {
      id: 1,
      name: "Laptop",
      price: 999,
      category: "Electronics",
      inStock: true,
    },
    {
      id: 2,
      name: "Phone",
      price: 599,
      category: "Electronics",
      inStock: false,
    },
    { id: 3, name: "Shirt", price: 29, category: "Clothing", inStock: true },
    {
      id: 4,
      name: "Headphones",
      price: 199,
      category: "Electronics",
      inStock: true,
    },
    { id: 5, name: "Jeans", price: 79, category: "Clothing", inStock: false },
  ];

  function getAvailableProducts() {
    console.log("=== AVAILABLE PRODUCTS ===");
    let available = products.filter((product) => product.inStock);
    console.log(`Found ${available.length} available products:`);
    available.forEach((product) => {
      console.log(`- ${product.name}: $${product.price}`);
    });
    return available;
  }

  function getProductsByCategory(category) {
    console.log(`=== ${category.toUpperCase()} PRODUCTS ===`);
    let categoryProducts = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );

    console.log(`Found ${categoryProducts.length} ${category} products:`);
    categoryProducts.forEach((product) => {
      let status = product.inStock ? "✅ In Stock" : "❌ Out of Stock";
      console.log(`- ${product.name}: $${product.price} ${status}`);
    });

    return categoryProducts;
  }

  function calculateTotalValue() {
    console.log("=== INVENTORY VALUE ===");

    let totalValue = products.reduce((total, product) => {
      return product.inStock ? total + product.price : total;
    }, 0);

    let inStockCount = products.filter((product) => product.inStock).length;
    let totalCount = products.length;

    console.log(`Total products: ${totalCount}`);
    console.log(`In stock: ${inStockCount}`);
    console.log(`Total inventory value: $${totalValue}`);

    return totalValue;
  }

  function applyDiscount(percentage, category = null) {
    console.log(`=== APPLYING ${percentage}% DISCOUNT ===`);

    let updatedProducts = products.map((product) => {
      if (
        category &&
        product.category.toLowerCase() !== category.toLowerCase()
      ) {
        return product; // No discount for this category
      }

      return {
        ...product,
        originalPrice: product.price,
        price: Math.round(product.price * (1 - percentage / 100) * 100) / 100,
      };
    });

    products = updatedProducts;

    if (category) {
      console.log(`Discount applied to ${category} products`);
    } else {
      console.log("Discount applied to all products");
    }

    return products;
  }

  function searchProducts(searchTerm) {
    console.log(`=== SEARCHING FOR "${searchTerm}" ===`);

    let results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(`Found ${results.length} results:`);
    results.forEach((product) => {
      console.log(`- ${product.name} (${product.category}): $${product.price}`);
    });

    return results;
  }

  return {
    getAvailable: getAvailableProducts,
    getByCategory: getProductsByCategory,
    calculateValue: calculateTotalValue,
    applyDiscount: applyDiscount,
    search: searchProducts,
    getAllProducts: () => [...products], // Return copy
  };
}

// Test product manager
let store = createProductManager();

store.getAvailable();
store.getByCategory("Electronics");
store.calculateValue();
store.applyDiscount(20, "Electronics");
store.search("phone");
```

### Example 2: Student Grade Analysis System

```javascript
function analyzeStudentGrades() {
  let students = [
    { name: "Alice", grades: [95, 87, 92, 89, 94] },
    { name: "Bob", grades: [78, 85, 82, 88, 91] },
    { name: "Charlie", grades: [92, 95, 89, 93, 96] },
    { name: "Diana", grades: [87, 84, 91, 88, 85] },
    { name: "Eve", grades: [76, 79, 82, 85, 88] },
  ];

  function calculateAverages() {
    console.log("=== STUDENT AVERAGES ===");

    let studentsWithAverages = students.map((student) => {
      let sum = student.grades.reduce((total, grade) => total + grade, 0);
      let average = sum / student.grades.length;

      return {
        name: student.name,
        grades: student.grades,
        average: Math.round(average * 10) / 10,
        letterGrade: getLetterGrade(average),
      };
    });

    studentsWithAverages.forEach((student) => {
      console.log(
        `${student.name}: ${student.average} (${student.letterGrade})`
      );
    });

    return studentsWithAverages;
  }

  function getLetterGrade(average) {
    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";
    return "F";
  }

  function findTopPerformers(count = 3) {
    console.log(`=== TOP ${count} PERFORMERS ===`);

    let studentsWithAverages = students.map((student) => {
      let average =
        student.grades.reduce((sum, grade) => sum + grade, 0) /
        student.grades.length;
      return { ...student, average };
    });

    let topStudents = studentsWithAverages
      .sort((a, b) => b.average - a.average)
      .slice(0, count);

    topStudents.forEach((student, index) => {
      console.log(
        `${index + 1}. ${student.name}: ${student.average.toFixed(1)}`
      );
    });

    return topStudents;
  }

  function analyzeGradeDistribution() {
    console.log("=== GRADE DISTRIBUTION ===");

    // Flatten all grades into one array
    let allGrades = students.reduce((grades, student) => {
      return grades.concat(student.grades);
    }, []);

    // Count by letter grade
    let distribution = allGrades.reduce((dist, grade) => {
      let letter = getLetterGrade(grade);
      dist[letter] = (dist[letter] || 0) + 1;
      return dist;
    }, {});

    console.log("Letter grade distribution:");
    Object.entries(distribution).forEach(([letter, count]) => {
      console.log(`${letter}: ${count} grades`);
    });

    // Calculate statistics
    let sum = allGrades.reduce((total, grade) => total + grade, 0);
    let average = sum / allGrades.length;
    let highest = Math.max(...allGrades);
    let lowest = Math.min(...allGrades);

    console.log(`\nClass Statistics:`);
    console.log(`Average: ${average.toFixed(1)}`);
    console.log(`Highest: ${highest}`);
    console.log(`Lowest: ${lowest}`);
    console.log(`Total grades: ${allGrades.length}`);

    return { distribution, average, highest, lowest };
  }

  function findStudentsNeedingHelp(threshold = 80) {
    console.log(`=== STUDENTS BELOW ${threshold}% AVERAGE ===`);

    let studentsNeedingHelp = students
      .map((student) => {
        let average =
          student.grades.reduce((sum, grade) => sum + grade, 0) /
          student.grades.length;
        return { ...student, average };
      })
      .filter((student) => student.average < threshold)
      .sort((a, b) => a.average - b.average);

    if (studentsNeedingHelp.length === 0) {
      console.log("All students are performing well!");
    } else {
      console.log(
        `Found ${studentsNeedingHelp.length} students needing support:`
      );
      studentsNeedingHelp.forEach((student) => {
        console.log(`- ${student.name}: ${student.average.toFixed(1)} average`);
      });
    }

    return studentsNeedingHelp;
  }

  return {
    calculateAverages,
    findTopPerformers,
    analyzeDistribution: analyzeGradeDistribution,
    findNeedingHelp: findStudentsNeedingHelp,
  };
}

// Test grade analysis
let gradeAnalyzer = analyzeStudentGrades();

gradeAnalyzer.calculateAverages();
gradeAnalyzer.findTopPerformers();
gradeAnalyzer.analyzeDistribution();
gradeAnalyzer.findNeedingHelp(85);
```

## 🔗 Method Chaining

You can chain array methods together for powerful data processing:

```javascript
let sales = [
  { product: "Laptop", amount: 1200, region: "North" },
  { product: "Phone", amount: 800, region: "South" },
  { product: "Tablet", amount: 600, region: "North" },
  { product: "Watch", amount: 300, region: "East" },
  { product: "Laptop", amount: 1200, region: "South" },
  { product: "Phone", amount: 800, region: "North" },
];

console.log("=== METHOD CHAINING ===");

// Find high-value North region sales, get product names, and remove duplicates
let highValueNorthProducts = sales
  .filter((sale) => sale.region === "North") // Only North region
  .filter((sale) => sale.amount >= 600) // High value sales
  .map((sale) => sale.product) // Extract product names
  .filter(
    (
      product,
      index,
      array // Remove duplicates
    ) => array.indexOf(product) === index
  );

console.log("High-value North products:", highValueNorthProducts);

// Calculate total sales by region
let salesByRegion = sales.reduce((regions, sale) => {
  if (!regions[sale.region]) {
    regions[sale.region] = 0;
  }
  regions[sale.region] += sale.amount;
  return regions;
}, {});

console.log("Sales by region:", salesByRegion);
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Basic Array Methods

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("=== PRACTICE EXERCISE 1 ===");

// 1. Create a new array with only even numbers
let evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("Even numbers:", evenNumbers);

// 2. Create a new array with each number doubled
let doubledNumbers = numbers.map((num) => num * 2);
console.log("Doubled numbers:", doubledNumbers);

// 3. Find the sum of all numbers
let sum = numbers.reduce((total, num) => total + num, 0);
console.log("Sum:", sum);

// 4. Check if any number is greater than 8
let hasLarge = numbers.some((num) => num > 8);
console.log("Has number > 8:", hasLarge);

// 5. Check if all numbers are positive
let allPositive = numbers.every((num) => num > 0);
console.log("All positive:", allPositive);
```

### Exercise 2: Working with Objects

```javascript
let books = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, year: 1937 },
  { title: "1984", author: "George Orwell", pages: 328, year: 1949 },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 432,
    year: 1813,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 277,
    year: 1951,
  },
];

console.log("=== PRACTICE EXERCISE 2 ===");

// 1. Get all book titles
let titles = books.map((book) => book.title);
console.log("Book titles:", titles);

// 2. Find books with more than 300 pages
let longBooks = books.filter((book) => book.pages > 300);
console.log(
  "Books over 300 pages:",
  longBooks.map((book) => book.title)
);

// 3. Find the oldest book
let oldestBook = books.reduce((oldest, book) =>
  book.year < oldest.year ? book : oldest
);
console.log("Oldest book:", oldestBook.title, `(${oldestBook.year})`);

// 4. Calculate average number of pages
let averagePages =
  books.reduce((sum, book) => sum + book.pages, 0) / books.length;
console.log("Average pages:", Math.round(averagePages));
```

## 📚 Key Takeaways

1. **Array methods are powerful** - They replace most manual loops
2. **Non-mutating methods** - map(), filter(), slice() don't change original array
3. **Mutating methods** - push(), pop(), splice() change the original array
4. **Method chaining** - Combine methods for complex operations
5. **Functional programming** - Work with data transformation patterns
6. **Performance matters** - Choose the right method for the job

## ➡️ What's Next?

Excellent work mastering array methods! 🎉 You now have powerful tools for data manipulation and transformation.

Next, you'll learn about **Objects** - a way to structure data with properties and organize related information together. Objects are fundamental to JavaScript and will open up new possibilities for organizing your code.

Your next lesson: **19. Objects - Structured Information**

## 🔗 Quick Reference

```javascript
// Transform
arr.map((item) => transform); // Transform each item
arr.filter((item) => condition); // Keep items matching condition
arr.reduce((acc, item) => result, initial); // Combine into single value

// Search
arr.find((item) => condition); // First item matching condition
arr.indexOf(item); // Index of item (-1 if not found)
arr.includes(item); // Boolean: does array contain item

// Modify
arr.push(item); // Add to end
arr.pop(); // Remove from end
arr.unshift(item); // Add to beginning
arr.shift(); // Remove from beginning
arr.splice(start, count, ...items); // Add/remove at position

// Copy/Extract
arr.slice(start, end); // Extract portion (non-mutating)
```

You're becoming a data manipulation expert! 🚀
