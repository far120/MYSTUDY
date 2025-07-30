# 19. Objects - Structured Information 📦

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- What objects are and why they're essential for organizing data
- How to create, access, and modify objects
- Different ways to work with object properties
- Nested objects and complex data structures
- Real-world applications of objects in programming
- Best practices for organizing data with objects

## 🤔 What Are Objects?

Objects are collections of related data and functionality. Think of an object as a container that groups related information together. Instead of having separate variables for each piece of information, objects let you organize data logically.

**Real-world analogy**: A person has multiple characteristics - name, age, address, hobbies. Instead of storing these as separate variables, we can group them into a "person" object.

```javascript
// Instead of this (scattered variables):
let personName = "Alice";
let personAge = 25;
let personCity = "New York";

// We can do this (organized object):
let person = {
  name: "Alice",
  age: 25,
  city: "New York",
};
```

## 🏗️ Creating Objects

### 1. Object Literal Syntax (Most Common)

```javascript
console.log("=== CREATING OBJECTS ===");

// Simple object
let book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  pages: 180,
  published: 1925,
};

console.log("Book object:", book);

// Object with different data types
let student = {
  name: "John", // string
  age: 20, // number
  isEnrolled: true, // boolean
  grades: [85, 92, 78, 96], // array
  address: {
    // nested object
    street: "123 Main St",
    city: "Boston",
    zipCode: "02101",
  },
};

console.log("Student object:", student);
```

### 2. Empty Objects and Adding Properties

```javascript
console.log("=== EMPTY OBJECTS ===");

// Create empty object
let emptyObject = {};
console.log("Empty object:", emptyObject);

// Add properties after creation
let car = {};
car.brand = "Toyota";
car.model = "Camry";
car.year = 2022;
car.color = "blue";

console.log("Car object:", car);

// Alternative way to add properties
let laptop = {};
laptop["brand"] = "Apple";
laptop["model"] = "MacBook Pro";
laptop["screen size"] = "14 inch"; // Use brackets for property names with spaces

console.log("Laptop object:", laptop);
```

## 🔍 Accessing Object Properties

### 1. Dot Notation (Most Common)

```javascript
let person = {
  firstName: "Alice",
  lastName: "Johnson",
  age: 28,
  job: "Software Developer",
};

console.log("=== DOT NOTATION ===");
console.log("First name:", person.firstName);
console.log("Last name:", person.lastName);
console.log("Age:", person.age);
console.log("Job:", person.job);

// Using in expressions
let fullName = person.firstName + " " + person.lastName;
console.log("Full name:", fullName);

let canVote = person.age >= 18;
console.log("Can vote:", canVote);
```

### 2. Bracket Notation

```javascript
let product = {
  name: "Wireless Headphones",
  price: 199.99,
  "in stock": true, // Property with space
  "customer-rating": 4.5, // Property with hyphen
  category: "Electronics",
};

console.log("=== BRACKET NOTATION ===");

// Access properties with brackets
console.log("Product name:", product["name"]);
console.log("Price:", product["price"]);

// Required for properties with special characters
console.log("In stock:", product["in stock"]);
console.log("Rating:", product["customer-rating"]);

// Dynamic property access
let propertyName = "category";
console.log("Category:", product[propertyName]);

// Useful for computed property names
let properties = ["name", "price", "category"];
properties.forEach((prop) => {
  console.log(`${prop}: ${product[prop]}`);
});
```

## ✏️ Modifying Objects

### 1. Changing Existing Properties

```javascript
let user = {
  username: "johndoe",
  email: "john@example.com",
  isActive: true,
  loginCount: 5,
};

console.log("=== MODIFYING PROPERTIES ===");
console.log("Before changes:", user);

// Change properties
user.email = "john.doe@newcompany.com";
user.isActive = false;
user.loginCount = user.loginCount + 1;

console.log("After changes:", user);

// Using bracket notation for modification
user["username"] = "john_doe_2024";
console.log("After username change:", user);
```

### 2. Adding New Properties

```javascript
let restaurant = {
  name: "Pasta Palace",
  cuisine: "Italian",
  rating: 4.2,
};

console.log("=== ADDING PROPERTIES ===");
console.log("Initial restaurant:", restaurant);

// Add new properties
restaurant.address = "123 Food Street";
restaurant.phoneNumber = "(555) 123-4567";
restaurant.isDeliveryAvailable = true;

console.log("After adding properties:", restaurant);

// Add array property
restaurant.specialDishes = [
  "Spaghetti Carbonara",
  "Margherita Pizza",
  "Tiramisu",
];
console.log("With special dishes:", restaurant);
```

### 3. Deleting Properties

```javascript
let inventory = {
  apples: 50,
  bananas: 30,
  oranges: 0,
  grapes: 25,
  expired_milk: 5,
};

console.log("=== DELETING PROPERTIES ===");
console.log("Before cleanup:", inventory);

// Delete properties
delete inventory.oranges; // Out of stock
delete inventory.expired_milk; // Expired

console.log("After cleanup:", inventory);

// Check if property exists
console.log("Has oranges:", "oranges" in inventory);
console.log("Has apples:", "apples" in inventory);
```

## 🏗️ Nested Objects

Objects can contain other objects, creating complex data structures:

```javascript
let company = {
  name: "Tech Solutions Inc",
  founded: 2015,
  headquarters: {
    address: {
      street: "456 Innovation Drive",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
    },
    building: {
      floors: 15,
      hasParking: true,
      capacity: 500,
    },
  },
  departments: {
    engineering: {
      manager: "Sarah Chen",
      employees: 45,
      budget: 2000000,
    },
    marketing: {
      manager: "Mike Rodriguez",
      employees: 12,
      budget: 500000,
    },
    hr: {
      manager: "Lisa Park",
      employees: 8,
      budget: 300000,
    },
  },
};

console.log("=== NESTED OBJECTS ===");

// Access nested properties
console.log("Company name:", company.name);
console.log("City:", company.headquarters.address.city);
console.log("Building floors:", company.headquarters.building.floors);
console.log("Engineering manager:", company.departments.engineering.manager);

// Modify nested properties
company.headquarters.address.street = "789 New Innovation Blvd";
company.departments.engineering.employees = 50;

console.log("Updated street:", company.headquarters.address.street);
console.log(
  "Updated eng employees:",
  company.departments.engineering.employees
);

// Add new nested property
company.departments.sales = {
  manager: "Tom Wilson",
  employees: 15,
  budget: 400000,
};

console.log("Added sales department:", company.departments.sales);
```

## 🎯 Real-World Examples

### Example 1: User Profile Management

```javascript
function createUserProfile() {
  let users = {};

  function addUser(id, userInfo) {
    users[id] = {
      ...userInfo,
      createdAt: new Date().toISOString(),
      isActive: true,
      loginHistory: [],
    };

    console.log(`User ${userInfo.username} added successfully`);
    return users[id];
  }

  function getUserProfile(id) {
    if (users[id]) {
      return { ...users[id] }; // Return copy
    } else {
      console.log(`User with ID ${id} not found`);
      return null;
    }
  }

  function updateProfile(id, updates) {
    if (users[id]) {
      // Merge updates with existing data
      Object.keys(updates).forEach((key) => {
        users[id][key] = updates[key];
      });
      users[id].lastUpdated = new Date().toISOString();

      console.log(`Profile updated for user ID: ${id}`);
      return users[id];
    } else {
      console.log(`User with ID ${id} not found`);
      return null;
    }
  }

  function recordLogin(id) {
    if (users[id]) {
      users[id].loginHistory.push({
        timestamp: new Date().toISOString(),
        ip: "192.168.1.1", // In real app, get actual IP
      });
      users[id].lastLogin = new Date().toISOString();

      console.log(`Login recorded for ${users[id].username}`);
    }
  }

  function deactivateUser(id) {
    if (users[id]) {
      users[id].isActive = false;
      users[id].deactivatedAt = new Date().toISOString();

      console.log(`User ${users[id].username} deactivated`);
    }
  }

  function getAllActiveUsers() {
    let activeUsers = {};
    Object.keys(users).forEach((id) => {
      if (users[id].isActive) {
        activeUsers[id] = users[id];
      }
    });
    return activeUsers;
  }

  return {
    addUser,
    getProfile: getUserProfile,
    updateProfile,
    recordLogin,
    deactivateUser,
    getActiveUsers: getAllActiveUsers,
    getAllUsers: () => ({ ...users }), // Return copy of all users
  };
}

// Test user profile system
console.log("=== USER PROFILE SYSTEM ===");

let userSystem = createUserProfile();

// Add users
userSystem.addUser("user1", {
  username: "alice_smith",
  email: "alice@example.com",
  firstName: "Alice",
  lastName: "Smith",
  age: 28,
  preferences: {
    theme: "dark",
    notifications: true,
    language: "English",
  },
});

userSystem.addUser("user2", {
  username: "bob_jones",
  email: "bob@example.com",
  firstName: "Bob",
  lastName: "Jones",
  age: 35,
  preferences: {
    theme: "light",
    notifications: false,
    language: "Spanish",
  },
});

// Test operations
userSystem.recordLogin("user1");
userSystem.updateProfile("user1", {
  age: 29,
  preferences: {
    theme: "light",
    notifications: true,
    language: "English",
  },
});

let aliceProfile = userSystem.getProfile("user1");
console.log("Alice's profile:", aliceProfile);

let activeUsers = userSystem.getActiveUsers();
console.log("Active users count:", Object.keys(activeUsers).length);
```

### Example 2: Shopping Cart System

```javascript
function createShoppingCart() {
  let cart = {
    items: {},
    customer: null,
    createdAt: new Date().toISOString(),
    total: 0,
    itemCount: 0,
  };

  function setCustomer(customerInfo) {
    cart.customer = {
      ...customerInfo,
      addedAt: new Date().toISOString(),
    };
    console.log(`Customer ${customerInfo.name} added to cart`);
  }

  function addItem(productId, product, quantity = 1) {
    if (cart.items[productId]) {
      // Item already exists, update quantity
      cart.items[productId].quantity += quantity;
      console.log(
        `Updated ${product.name} quantity to ${cart.items[productId].quantity}`
      );
    } else {
      // New item
      cart.items[productId] = {
        ...product,
        quantity: quantity,
        addedAt: new Date().toISOString(),
      };
      console.log(`Added ${product.name} to cart`);
    }

    updateCartTotals();
  }

  function removeItem(productId) {
    if (cart.items[productId]) {
      let itemName = cart.items[productId].name;
      delete cart.items[productId];
      console.log(`Removed ${itemName} from cart`);
      updateCartTotals();
    } else {
      console.log("Item not found in cart");
    }
  }

  function updateQuantity(productId, newQuantity) {
    if (cart.items[productId]) {
      if (newQuantity <= 0) {
        removeItem(productId);
      } else {
        cart.items[productId].quantity = newQuantity;
        console.log(
          `Updated quantity for ${cart.items[productId].name} to ${newQuantity}`
        );
        updateCartTotals();
      }
    } else {
      console.log("Item not found in cart");
    }
  }

  function updateCartTotals() {
    let total = 0;
    let itemCount = 0;

    Object.values(cart.items).forEach((item) => {
      total += item.price * item.quantity;
      itemCount += item.quantity;
    });

    cart.total = Math.round(total * 100) / 100; // Round to 2 decimal places
    cart.itemCount = itemCount;
    cart.lastUpdated = new Date().toISOString();
  }

  function applyDiscount(discountPercentage) {
    let discountAmount = cart.total * (discountPercentage / 100);
    cart.discount = {
      percentage: discountPercentage,
      amount: Math.round(discountAmount * 100) / 100,
      appliedAt: new Date().toISOString(),
    };

    cart.finalTotal = cart.total - cart.discount.amount;
    console.log(
      `Applied ${discountPercentage}% discount: -$${cart.discount.amount}`
    );
  }

  function getCartSummary() {
    console.log("=== CART SUMMARY ===");
    console.log(`Customer: ${cart.customer ? cart.customer.name : "Guest"}`);
    console.log(`Items in cart: ${cart.itemCount}`);

    Object.values(cart.items).forEach((item) => {
      console.log(
        `- ${item.name}: $${item.price} x ${item.quantity} = $${(
          item.price * item.quantity
        ).toFixed(2)}`
      );
    });

    console.log(`Subtotal: $${cart.total}`);

    if (cart.discount) {
      console.log(
        `Discount (${cart.discount.percentage}%): -$${cart.discount.amount}`
      );
      console.log(`Final Total: $${cart.finalTotal}`);
    }

    return cart;
  }

  function clearCart() {
    cart.items = {};
    cart.total = 0;
    cart.itemCount = 0;
    delete cart.discount;
    delete cart.finalTotal;
    cart.clearedAt = new Date().toISOString();

    console.log("Cart cleared");
  }

  return {
    setCustomer,
    addItem,
    removeItem,
    updateQuantity,
    applyDiscount,
    getSummary: getCartSummary,
    clear: clearCart,
    getCart: () => ({ ...cart }), // Return copy
  };
}

// Test shopping cart
console.log("=== SHOPPING CART SYSTEM ===");

let cart = createShoppingCart();

// Set customer
cart.setCustomer({
  name: "Alice Johnson",
  email: "alice@example.com",
  phone: "(555) 123-4567",
});

// Add items
cart.addItem(
  "prod1",
  {
    name: "Wireless Headphones",
    price: 199.99,
    category: "Electronics",
    brand: "TechCorp",
  },
  1
);

cart.addItem(
  "prod2",
  {
    name: "Coffee Mug",
    price: 12.99,
    category: "Kitchen",
    brand: "HomeGoods",
  },
  2
);

cart.addItem(
  "prod3",
  {
    name: "Notebook",
    price: 8.5,
    category: "Office",
    brand: "PaperCo",
  },
  3
);

// Add same item again (should update quantity)
cart.addItem(
  "prod2",
  {
    name: "Coffee Mug",
    price: 12.99,
    category: "Kitchen",
    brand: "HomeGoods",
  },
  1
);

// Update quantity
cart.updateQuantity("prod3", 5);

// Apply discount
cart.applyDiscount(10);

// Show summary
cart.getSummary();
```

### Example 3: Library Book Management

```javascript
function createLibrarySystem() {
  let library = {
    name: "City Public Library",
    books: {},
    members: {},
    borrowedBooks: {},
    nextBookId: 1,
    nextMemberId: 1,
  };

  function addBook(bookInfo) {
    let bookId = `book${library.nextBookId++}`;

    library.books[bookId] = {
      id: bookId,
      ...bookInfo,
      status: "available",
      addedDate: new Date().toISOString(),
      borrowHistory: [],
    };

    console.log(`Added "${bookInfo.title}" to library catalog`);
    return bookId;
  }

  function addMember(memberInfo) {
    let memberId = `member${library.nextMemberId++}`;

    library.members[memberId] = {
      id: memberId,
      ...memberInfo,
      joinDate: new Date().toISOString(),
      borrowedBooks: [],
      borrowHistory: [],
    };

    console.log(`Registered new member: ${memberInfo.name}`);
    return memberId;
  }

  function borrowBook(memberId, bookId) {
    let member = library.members[memberId];
    let book = library.books[bookId];

    if (!member) {
      console.log("Member not found");
      return false;
    }

    if (!book) {
      console.log("Book not found");
      return false;
    }

    if (book.status !== "available") {
      console.log(`"${book.title}" is not available for borrowing`);
      return false;
    }

    // Check borrowing limit
    if (member.borrowedBooks.length >= 5) {
      console.log(`${member.name} has reached the borrowing limit (5 books)`);
      return false;
    }

    // Process borrowing
    let borrowRecord = {
      bookId: bookId,
      memberId: memberId,
      borrowDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    };

    // Update book status
    book.status = "borrowed";
    book.borrowedBy = memberId;
    book.borrowDate = borrowRecord.borrowDate;
    book.dueDate = borrowRecord.dueDate;
    book.borrowHistory.push(borrowRecord);

    // Update member record
    member.borrowedBooks.push(bookId);
    member.borrowHistory.push(borrowRecord);

    // Add to borrowed books tracking
    library.borrowedBooks[`${memberId}-${bookId}`] = borrowRecord;

    console.log(`${member.name} borrowed "${book.title}"`);
    console.log(
      `Due date: ${new Date(borrowRecord.dueDate).toLocaleDateString()}`
    );

    return true;
  }

  function returnBook(memberId, bookId) {
    let member = library.members[memberId];
    let book = library.books[bookId];
    let borrowKey = `${memberId}-${bookId}`;

    if (!member || !book) {
      console.log("Member or book not found");
      return false;
    }

    if (book.status !== "borrowed" || book.borrowedBy !== memberId) {
      console.log(`"${book.title}" is not borrowed by ${member.name}`);
      return false;
    }

    // Calculate if returned late
    let returnDate = new Date().toISOString();
    let dueDate = new Date(book.dueDate);
    let isLate = new Date() > dueDate;
    let daysLate = isLate
      ? Math.ceil((new Date() - dueDate) / (24 * 60 * 60 * 1000))
      : 0;

    // Update book status
    book.status = "available";
    delete book.borrowedBy;
    delete book.borrowDate;
    delete book.dueDate;

    // Update member record
    member.borrowedBooks = member.borrowedBooks.filter((id) => id !== bookId);

    // Update borrow record with return info
    if (library.borrowedBooks[borrowKey]) {
      library.borrowedBooks[borrowKey].returnDate = returnDate;
      library.borrowedBooks[borrowKey].daysLate = daysLate;

      // Move to history and remove from active
      delete library.borrowedBooks[borrowKey];
    }

    console.log(`${member.name} returned "${book.title}"`);
    if (isLate) {
      console.log(`⚠️ Book was ${daysLate} days late!`);
    } else {
      console.log("✅ Book returned on time");
    }

    return true;
  }

  function searchBooks(query) {
    console.log(`=== SEARCHING FOR: "${query}" ===`);

    let results = [];
    let searchTerm = query.toLowerCase();

    Object.values(library.books).forEach((book) => {
      if (
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
      ) {
        results.push(book);
      }
    });

    if (results.length === 0) {
      console.log("No books found matching your search");
    } else {
      console.log(`Found ${results.length} book(s):`);
      results.forEach((book) => {
        let statusText =
          book.status === "available" ? "✅ Available" : "❌ Borrowed";
        console.log(
          `- "${book.title}" by ${book.author} (${book.genre}) - ${statusText}`
        );
      });
    }

    return results;
  }

  function getMemberInfo(memberId) {
    let member = library.members[memberId];

    if (!member) {
      console.log("Member not found");
      return null;
    }

    console.log(`=== MEMBER INFO: ${member.name} ===`);
    console.log(`Member ID: ${member.id}`);
    console.log(`Email: ${member.email}`);
    console.log(`Join Date: ${new Date(member.joinDate).toLocaleDateString()}`);
    console.log(`Currently Borrowed: ${member.borrowedBooks.length} book(s)`);

    if (member.borrowedBooks.length > 0) {
      console.log("Borrowed Books:");
      member.borrowedBooks.forEach((bookId) => {
        let book = library.books[bookId];
        if (book) {
          console.log(
            `- "${book.title}" (Due: ${new Date(
              book.dueDate
            ).toLocaleDateString()})`
          );
        }
      });
    }

    return member;
  }

  function getLibraryStats() {
    console.log(`=== ${library.name.toUpperCase()} STATISTICS ===`);

    let totalBooks = Object.keys(library.books).length;
    let availableBooks = Object.values(library.books).filter(
      (book) => book.status === "available"
    ).length;
    let borrowedBooks = totalBooks - availableBooks;
    let totalMembers = Object.keys(library.members).length;
    let activeBorrows = Object.keys(library.borrowedBooks).length;

    console.log(`Total Books: ${totalBooks}`);
    console.log(`Available: ${availableBooks}`);
    console.log(`Currently Borrowed: ${borrowedBooks}`);
    console.log(`Total Members: ${totalMembers}`);
    console.log(`Active Borrowings: ${activeBorrows}`);

    return {
      totalBooks,
      availableBooks,
      borrowedBooks,
      totalMembers,
      activeBorrows,
    };
  }

  return {
    addBook,
    addMember,
    borrowBook,
    returnBook,
    searchBooks,
    getMemberInfo,
    getStats: getLibraryStats,
    getLibrary: () => ({ ...library }),
  };
}

// Test library system
console.log("=== LIBRARY MANAGEMENT SYSTEM ===");

let library = createLibrarySystem();

// Add books
library.addBook({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: "Classic Literature",
  isbn: "978-0-7432-7356-5",
  publishYear: 1925,
});

library.addBook({
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  genre: "Classic Literature",
  isbn: "978-0-06-112008-4",
  publishYear: 1960,
});

library.addBook({
  title: "1984",
  author: "George Orwell",
  genre: "Dystopian Fiction",
  isbn: "978-0-452-28423-4",
  publishYear: 1949,
});

// Add members
let member1 = library.addMember({
  name: "Alice Johnson",
  email: "alice@example.com",
  phone: "(555) 123-4567",
  address: "123 Main St, City, State",
});

let member2 = library.addMember({
  name: "Bob Smith",
  email: "bob@example.com",
  phone: "(555) 987-6543",
  address: "456 Oak Ave, City, State",
});

// Test borrowing
library.borrowBook(member1, "book1");
library.borrowBook(member1, "book2");
library.borrowBook(member2, "book3");

// Try to borrow unavailable book
library.borrowBook(member2, "book1");

// Search books
library.searchBooks("great");
library.searchBooks("orwell");

// Member info
library.getMemberInfo(member1);

// Return a book
library.returnBook(member1, "book1");

// Final stats
library.getStats();
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Personal Information

```javascript
// Create an object representing yourself
let myInfo = {
  name: "Your Name",
  age: 25,
  hobbies: ["reading", "coding", "gaming"],
  address: {
    street: "123 Example St",
    city: "Your City",
    country: "Your Country",
  },
  education: {
    degree: "Computer Science",
    university: "Example University",
    graduationYear: 2022,
  },
};

console.log("=== PERSONAL INFO EXERCISE ===");

// 1. Print your full name and age
console.log(`Name: ${myInfo.name}, Age: ${myInfo.age}`);

// 2. Add a new hobby
myInfo.hobbies.push("traveling");
console.log("Updated hobbies:", myInfo.hobbies);

// 3. Update your city
myInfo.address.city = "New City";
console.log("New city:", myInfo.address.city);

// 4. Add work experience
myInfo.workExperience = {
  company: "Tech Corp",
  position: "Junior Developer",
  startDate: "2022-06-01",
};
console.log("Work experience added:", myInfo.workExperience);
```

### Exercise 2: Product Catalog

```javascript
let productCatalog = {};

// Add products to catalog
function addProduct(id, productInfo) {
  productCatalog[id] = {
    ...productInfo,
    dateAdded: new Date().toISOString(),
  };
}

console.log("=== PRODUCT CATALOG EXERCISE ===");

// 1. Add several products
addProduct("p001", {
  name: "Laptop",
  price: 999.99,
  category: "Electronics",
  inStock: true,
  quantity: 15,
});

addProduct("p002", {
  name: "Coffee Maker",
  price: 89.99,
  category: "Kitchen",
  inStock: true,
  quantity: 8,
});

addProduct("p003", {
  name: "Running Shoes",
  price: 129.99,
  category: "Sports",
  inStock: false,
  quantity: 0,
});

// 2. Update product price
productCatalog["p001"].price = 899.99;
console.log("Updated laptop price:", productCatalog["p001"].price);

// 3. Check stock status
Object.keys(productCatalog).forEach((id) => {
  let product = productCatalog[id];
  let status = product.inStock ? "✅ In Stock" : "❌ Out of Stock";
  console.log(`${product.name}: ${status} (${product.quantity} units)`);
});

// 4. Calculate total inventory value
let totalValue = 0;
Object.values(productCatalog).forEach((product) => {
  if (product.inStock) {
    totalValue += product.price * product.quantity;
  }
});
console.log(`Total inventory value: $${totalValue.toFixed(2)}`);
```

## 📚 Key Takeaways

1. **Objects organize data** - Group related information together
2. **Two access methods** - Dot notation (most common) and bracket notation (for special cases)
3. **Objects are mutable** - You can change properties after creation
4. **Nested objects** - Objects can contain other objects for complex data
5. **Dynamic properties** - Add, modify, or delete properties at runtime
6. **Real-world modeling** - Objects represent entities in your application

## ➡️ What's Next?

Fantastic work mastering objects! 🎉 You now understand how to organize and structure data effectively in JavaScript.

Next, you'll learn about **Object Methods** - how to add functions to your objects, making them not just data containers but active entities that can perform actions and computations.

Your next lesson: **20. Object Methods - Actions on Objects**

## 🔗 Quick Reference

```javascript
// Creating objects
let obj = {}; // Empty object
let obj = { key: value }; // Object literal

// Accessing properties
obj.property; // Dot notation
obj["property"]; // Bracket notation
obj[variable]; // Dynamic access

// Modifying objects
obj.newProperty = value; // Add property
obj.existingProperty = newValue; // Update property
delete obj.property; // Delete property

// Checking properties
"property" in obj; // Check if property exists
obj.property !== undefined; // Alternative check

// Nested objects
obj.nested.property; // Access nested property
obj["nested"]["property"]; // Alternative nested access
```

You're building a solid foundation in data organization! 🚀
