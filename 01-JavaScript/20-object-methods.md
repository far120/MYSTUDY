# 20. Object Methods - Actions on Objects 🎬

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- What object methods are and why they're powerful
- How to create and call methods on objects
- The `this` keyword in object methods
- Method chaining for elegant code
- Real-world applications of object-oriented design
- Best practices for organizing code with methods

## 🤔 What Are Object Methods?

Object methods are functions that belong to objects. They combine data (properties) with behavior (functions), making objects not just containers of information but active entities that can perform actions.

**Think of it this way**: A car object doesn't just have properties like `color` and `model` - it can also perform actions like `start()`, `accelerate()`, and `brake()`. These actions are methods.

```javascript
// Object with just data (properties)
let car = {
  brand: "Toyota",
  model: "Camry",
  year: 2022,
  speed: 0,
};

// Object with data AND behavior (methods)
let smartCar = {
  brand: "Toyota",
  model: "Camry",
  year: 2022,
  speed: 0,

  // Methods (functions that belong to the object)
  start: function () {
    console.log("🚗 Car started!");
  },

  accelerate: function () {
    this.speed += 10;
    console.log(`🏎️ Accelerating! Current speed: ${this.speed} mph`);
  },

  brake: function () {
    this.speed = Math.max(0, this.speed - 10);
    console.log(`🛑 Braking! Current speed: ${this.speed} mph`);
  },
};
```

## 🏗️ Creating Object Methods

### 1. Function Expression Methods

```javascript
let calculator = {
  result: 0,

  // Method using function expression
  add: function (number) {
    this.result += number;
    console.log(`Added ${number}. Result: ${this.result}`);
    return this; // Return object for chaining
  },

  subtract: function (number) {
    this.result -= number;
    console.log(`Subtracted ${number}. Result: ${this.result}`);
    return this;
  },

  multiply: function (number) {
    this.result *= number;
    console.log(`Multiplied by ${number}. Result: ${this.result}`);
    return this;
  },

  divide: function (number) {
    if (number !== 0) {
      this.result /= number;
      console.log(`Divided by ${number}. Result: ${this.result}`);
    } else {
      console.log("❌ Cannot divide by zero!");
    }
    return this;
  },

  clear: function () {
    this.result = 0;
    console.log("🧹 Calculator cleared. Result: 0");
    return this;
  },

  getResult: function () {
    return this.result;
  },
};

console.log("=== CALCULATOR METHODS ===");

// Using calculator methods
calculator.add(10).multiply(2).subtract(5).divide(3);
console.log("Final result:", calculator.getResult());

calculator.clear().add(100).divide(0).subtract(20);
```

### 2. Method Shorthand (ES6+)

```javascript
let bankAccount = {
  accountNumber: "ACC-12345",
  balance: 1000,
  transactions: [],

  // Method shorthand (no 'function' keyword needed)
  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      this.transactions.push({
        type: "deposit",
        amount: amount,
        date: new Date().toISOString(),
        newBalance: this.balance,
      });
      console.log(`💰 Deposited $${amount}. New balance: $${this.balance}`);
    } else {
      console.log("❌ Deposit amount must be positive");
    }
    return this;
  },

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      this.transactions.push({
        type: "withdrawal",
        amount: amount,
        date: new Date().toISOString(),
        newBalance: this.balance,
      });
      console.log(`💸 Withdrew $${amount}. New balance: $${this.balance}`);
    } else if (amount > this.balance) {
      console.log("❌ Insufficient funds");
    } else {
      console.log("❌ Withdrawal amount must be positive");
    }
    return this;
  },

  checkBalance() {
    console.log(`💳 Account ${this.accountNumber}: $${this.balance}`);
    return this.balance;
  },

  getTransactionHistory() {
    console.log(`📊 Transaction History for ${this.accountNumber}:`);
    this.transactions.forEach((transaction, index) => {
      let date = new Date(transaction.date).toLocaleDateString();
      let type = transaction.type === "deposit" ? "📈" : "📉";
      console.log(
        `${index + 1}. ${type} ${transaction.type}: $${
          transaction.amount
        } on ${date} (Balance: $${transaction.newBalance})`
      );
    });
    return this.transactions;
  },

  transfer(targetAccount, amount) {
    if (amount > 0 && amount <= this.balance) {
      this.withdraw(amount);
      console.log(
        `🔄 Transferred $${amount} to account ${targetAccount.accountNumber}`
      );
      targetAccount.deposit(amount);
    } else {
      console.log("❌ Invalid transfer amount");
    }
    return this;
  },
};

console.log("=== BANK ACCOUNT METHODS ===");

// Test bank account
bankAccount.checkBalance();
bankAccount.deposit(500).withdraw(200).deposit(100);
bankAccount.checkBalance();
bankAccount.getTransactionHistory();
```

## 🎯 Understanding `this` Keyword

The `this` keyword refers to the object that the method belongs to:

```javascript
let person = {
  firstName: "Alice",
  lastName: "Johnson",
  age: 28,
  hobbies: ["reading", "coding", "hiking"],

  // Method that uses 'this' to access object properties
  introduce() {
    console.log(
      `Hi! I'm ${this.firstName} ${this.lastName}, and I'm ${this.age} years old.`
    );
    return this;
  },

  addHobby(hobby) {
    if (!this.hobbies.includes(hobby)) {
      this.hobbies.push(hobby);
      console.log(`🎯 Added new hobby: ${hobby}`);
    } else {
      console.log(`🤔 ${hobby} is already in my hobbies list`);
    }
    return this;
  },

  listHobbies() {
    console.log(`🎨 My hobbies: ${this.hobbies.join(", ")}`);
    return this;
  },

  celebrateBirthday() {
    this.age++;
    console.log(`🎂 Happy birthday! I'm now ${this.age} years old!`);
    return this;
  },

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  updateInfo(updates) {
    // Update multiple properties at once
    Object.keys(updates).forEach((key) => {
      if (this.hasOwnProperty(key)) {
        this[key] = updates[key];
        console.log(`✏️ Updated ${key} to: ${updates[key]}`);
      }
    });
    return this;
  },
};

console.log("=== PERSON METHODS WITH 'THIS' ===");

person.introduce();
person.addHobby("photography").addHobby("cooking");
person.listHobbies();
person.celebrateBirthday();
person.updateInfo({ age: 30, firstName: "Alicia" });
person.introduce();

console.log("Full name:", person.getFullName());
```

## 🔄 Method Chaining

Method chaining allows you to call multiple methods in sequence by returning `this`:

```javascript
let textProcessor = {
  text: "",

  setText(newText) {
    this.text = newText;
    console.log(`📝 Text set: "${this.text}"`);
    return this;
  },

  toUpperCase() {
    this.text = this.text.toUpperCase();
    console.log(`🔤 Converted to uppercase: "${this.text}"`);
    return this;
  },

  toLowerCase() {
    this.text = this.text.toLowerCase();
    console.log(`🔡 Converted to lowercase: "${this.text}"`);
    return this;
  },

  removeSpaces() {
    this.text = this.text.replace(/\s+/g, "");
    console.log(`🧹 Removed spaces: "${this.text}"`);
    return this;
  },

  addPrefix(prefix) {
    this.text = prefix + this.text;
    console.log(`⬅️ Added prefix: "${this.text}"`);
    return this;
  },

  addSuffix(suffix) {
    this.text = this.text + suffix;
    console.log(`➡️ Added suffix: "${this.text}"`);
    return this;
  },

  reverse() {
    this.text = this.text.split("").reverse().join("");
    console.log(`🔄 Reversed: "${this.text}"`);
    return this;
  },

  repeat(times) {
    this.text = this.text.repeat(times);
    console.log(`🔁 Repeated ${times} times: "${this.text}"`);
    return this;
  },

  getResult() {
    return this.text;
  },

  reset() {
    this.text = "";
    console.log("🗑️ Text reset");
    return this;
  },
};

console.log("=== METHOD CHAINING ===");

// Chain multiple operations together
let result = textProcessor
  .setText("Hello World")
  .toUpperCase()
  .removeSpaces()
  .addPrefix("*** ")
  .addSuffix(" ***")
  .getResult();

console.log("Final result:", result);

// Another chain
textProcessor.reset().setText("JavaScript").reverse().toLowerCase().repeat(2);
```

## 🎯 Real-World Examples

### Example 1: Task Management System

```javascript
function createTaskManager() {
  return {
    tasks: [],
    nextId: 1,

    addTask(title, description = "", priority = "medium") {
      let task = {
        id: this.nextId++,
        title: title,
        description: description,
        priority: priority,
        status: "pending",
        createdAt: new Date().toISOString(),
        completedAt: null,
      };

      this.tasks.push(task);
      console.log(`✅ Task added: "${title}" (Priority: ${priority})`);
      return this;
    },

    completeTask(taskId) {
      let task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = "completed";
        task.completedAt = new Date().toISOString();
        console.log(`🎉 Task completed: "${task.title}"`);
      } else {
        console.log(`❌ Task with ID ${taskId} not found`);
      }
      return this;
    },

    updateTask(taskId, updates) {
      let task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        Object.keys(updates).forEach((key) => {
          if (key !== "id") {
            // Don't allow ID changes
            task[key] = updates[key];
          }
        });
        console.log(`✏️ Task updated: "${task.title}"`);
      } else {
        console.log(`❌ Task with ID ${taskId} not found`);
      }
      return this;
    },

    deleteTask(taskId) {
      let taskIndex = this.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        let deletedTask = this.tasks.splice(taskIndex, 1)[0];
        console.log(`🗑️ Task deleted: "${deletedTask.title}"`);
      } else {
        console.log(`❌ Task with ID ${taskId} not found`);
      }
      return this;
    },

    listTasks(status = "all") {
      console.log(`=== TASK LIST (${status.toUpperCase()}) ===`);

      let filteredTasks =
        status === "all"
          ? this.tasks
          : this.tasks.filter((task) => task.status === status);

      if (filteredTasks.length === 0) {
        console.log("No tasks found");
        return this;
      }

      filteredTasks.forEach((task) => {
        let statusIcon = task.status === "completed" ? "✅" : "⏳";
        let priorityIcon = {
          high: "🔴",
          medium: "🟡",
          low: "🟢",
        }[task.priority];

        console.log(`${statusIcon} ${task.id}. ${task.title} ${priorityIcon}`);
        if (task.description) {
          console.log(`   📝 ${task.description}`);
        }
        console.log(
          `   📅 Created: ${new Date(task.createdAt).toLocaleDateString()}`
        );
        if (task.completedAt) {
          console.log(
            `   🎯 Completed: ${new Date(
              task.completedAt
            ).toLocaleDateString()}`
          );
        }
      });

      return this;
    },

    getTasksByPriority(priority) {
      let tasks = this.tasks.filter((task) => task.priority === priority);
      console.log(`📊 Found ${tasks.length} ${priority} priority tasks`);
      return tasks;
    },

    getCompletionStats() {
      let total = this.tasks.length;
      let completed = this.tasks.filter(
        (task) => task.status === "completed"
      ).length;
      let pending = total - completed;
      let completionRate =
        total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

      console.log(`📈 Task Statistics:`);
      console.log(`   Total tasks: ${total}`);
      console.log(`   Completed: ${completed}`);
      console.log(`   Pending: ${pending}`);
      console.log(`   Completion rate: ${completionRate}%`);

      return { total, completed, pending, completionRate };
    },

    searchTasks(searchTerm) {
      let results = this.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      console.log(`🔍 Found ${results.length} tasks matching "${searchTerm}"`);
      results.forEach((task) => {
        console.log(`   - ${task.title} (${task.status})`);
      });

      return results;
    },

    clearCompleted() {
      let completedCount = this.tasks.filter(
        (task) => task.status === "completed"
      ).length;
      this.tasks = this.tasks.filter((task) => task.status !== "completed");
      console.log(`🧹 Cleared ${completedCount} completed tasks`);
      return this;
    },
  };
}

// Test task manager
console.log("=== TASK MANAGEMENT SYSTEM ===");

let taskManager = createTaskManager();

// Add tasks using method chaining
taskManager
  .addTask(
    "Learn JavaScript",
    "Complete JavaScript fundamentals course",
    "high"
  )
  .addTask(
    "Build portfolio website",
    "Create personal portfolio with projects",
    "medium"
  )
  .addTask("Read programming book", "Finish reading 'Clean Code'", "low")
  .addTask("Practice coding", "Solve 5 algorithm problems", "high");

// Complete some tasks
taskManager.completeTask(1).completeTask(3);

// Update a task
taskManager.updateTask(2, {
  priority: "high",
  description: "Create responsive portfolio website with React",
});

// List all tasks
taskManager.listTasks();

// Get statistics
taskManager.getCompletionStats();

// Search tasks
taskManager.searchTasks("javascript");

// List only pending tasks
taskManager.listTasks("pending");
```

### Example 2: Shopping Cart with Advanced Features

```javascript
function createAdvancedShoppingCart() {
  return {
    items: {},
    customer: null,
    discounts: [],
    shippingInfo: null,

    setCustomer(customerInfo) {
      this.customer = {
        ...customerInfo,
        addedAt: new Date().toISOString(),
      };
      console.log(`👤 Customer set: ${customerInfo.name}`);
      return this;
    },

    addItem(productId, product, quantity = 1) {
      if (this.items[productId]) {
        this.items[productId].quantity += quantity;
        console.log(
          `📦 Updated ${product.name} quantity to ${this.items[productId].quantity}`
        );
      } else {
        this.items[productId] = {
          ...product,
          quantity: quantity,
          addedAt: new Date().toISOString(),
        };
        console.log(`🛒 Added ${product.name} to cart`);
      }
      return this;
    },

    removeItem(productId) {
      if (this.items[productId]) {
        let itemName = this.items[productId].name;
        delete this.items[productId];
        console.log(`🗑️ Removed ${itemName} from cart`);
      } else {
        console.log("❌ Item not found in cart");
      }
      return this;
    },

    updateQuantity(productId, newQuantity) {
      if (this.items[productId]) {
        if (newQuantity <= 0) {
          this.removeItem(productId);
        } else {
          this.items[productId].quantity = newQuantity;
          console.log(
            `📝 Updated ${this.items[productId].name} quantity to ${newQuantity}`
          );
        }
      } else {
        console.log("❌ Item not found in cart");
      }
      return this;
    },

    applyDiscount(discountCode, percentage, description) {
      // Check if discount already applied
      if (this.discounts.find((d) => d.code === discountCode)) {
        console.log(`❌ Discount code "${discountCode}" already applied`);
        return this;
      }

      this.discounts.push({
        code: discountCode,
        percentage: percentage,
        description: description,
        appliedAt: new Date().toISOString(),
      });

      console.log(`🎫 Applied discount: ${discountCode} (${percentage}% off)`);
      return this;
    },

    removeDiscount(discountCode) {
      this.discounts = this.discounts.filter((d) => d.code !== discountCode);
      console.log(`🗑️ Removed discount: ${discountCode}`);
      return this;
    },

    setShippingInfo(shippingData) {
      this.shippingInfo = {
        ...shippingData,
        addedAt: new Date().toISOString(),
      };
      console.log(`🚚 Shipping information set`);
      return this;
    },

    calculateSubtotal() {
      return Object.values(this.items).reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    calculateDiscounts() {
      let subtotal = this.calculateSubtotal();
      return this.discounts.reduce((totalDiscount, discount) => {
        return totalDiscount + (subtotal * discount.percentage) / 100;
      }, 0);
    },

    calculateShipping() {
      if (!this.shippingInfo) return 0;

      let subtotal = this.calculateSubtotal();

      // Free shipping over $100
      if (subtotal >= 100) return 0;

      // Express shipping
      if (this.shippingInfo.method === "express") return 15.99;

      // Standard shipping
      return 8.99;
    },

    calculateTax() {
      let subtotal = this.calculateSubtotal();
      let discountAmount = this.calculateDiscounts();
      let taxableAmount = subtotal - discountAmount;

      // 8.5% tax rate
      return taxableAmount * 0.085;
    },

    calculateTotal() {
      let subtotal = this.calculateSubtotal();
      let discountAmount = this.calculateDiscounts();
      let shipping = this.calculateShipping();
      let tax = this.calculateTax();

      return subtotal - discountAmount + shipping + tax;
    },

    getItemCount() {
      return Object.values(this.items).reduce((count, item) => {
        return count + item.quantity;
      }, 0);
    },

    getSummary() {
      console.log("=== CART SUMMARY ===");

      if (this.customer) {
        console.log(`👤 Customer: ${this.customer.name}`);
      }

      console.log(`📦 Items: ${this.getItemCount()}`);

      // List items
      Object.values(this.items).forEach((item) => {
        let lineTotal = item.price * item.quantity;
        console.log(
          `   ${item.name}: $${item.price.toFixed(2)} x ${
            item.quantity
          } = $${lineTotal.toFixed(2)}`
        );
      });

      // Financial breakdown
      let subtotal = this.calculateSubtotal();
      let discountAmount = this.calculateDiscounts();
      let shipping = this.calculateShipping();
      let tax = this.calculateTax();
      let total = this.calculateTotal();

      console.log(`\n💰 Subtotal: $${subtotal.toFixed(2)}`);

      if (this.discounts.length > 0) {
        this.discounts.forEach((discount) => {
          console.log(
            `🎫 ${discount.description}: -$${(
              (subtotal * discount.percentage) /
              100
            ).toFixed(2)}`
          );
        });
        console.log(
          `💰 After discounts: $${(subtotal - discountAmount).toFixed(2)}`
        );
      }

      if (shipping > 0) {
        console.log(`🚚 Shipping: $${shipping.toFixed(2)}`);
      } else {
        console.log(`🚚 Shipping: FREE`);
      }

      console.log(`🏛️ Tax: $${tax.toFixed(2)}`);
      console.log(`🎯 TOTAL: $${total.toFixed(2)}`);

      return {
        subtotal,
        discountAmount,
        shipping,
        tax,
        total,
        itemCount: this.getItemCount(),
      };
    },

    validateCheckout() {
      let errors = [];

      if (Object.keys(this.items).length === 0) {
        errors.push("Cart is empty");
      }

      if (!this.customer) {
        errors.push("Customer information required");
      }

      if (!this.shippingInfo) {
        errors.push("Shipping information required");
      }

      if (errors.length > 0) {
        console.log("❌ Checkout validation failed:");
        errors.forEach((error) => console.log(`   - ${error}`));
        return false;
      }

      console.log("✅ Cart is ready for checkout");
      return true;
    },

    checkout() {
      if (!this.validateCheckout()) {
        return false;
      }

      let summary = this.getSummary();

      console.log("\n🎉 ORDER PLACED SUCCESSFULLY!");
      console.log(`📧 Confirmation will be sent to ${this.customer.email}`);
      console.log(
        `📦 Estimated delivery: ${
          this.shippingInfo.estimatedDelivery || "5-7 business days"
        }`
      );

      // Reset cart
      this.items = {};
      this.discounts = [];
      this.shippingInfo = null;

      return summary;
    },

    clear() {
      this.items = {};
      this.discounts = [];
      this.shippingInfo = null;
      console.log("🧹 Cart cleared");
      return this;
    },
  };
}

// Test advanced shopping cart
console.log("=== ADVANCED SHOPPING CART ===");

let cart = createAdvancedShoppingCart();

// Set up cart with method chaining
cart
  .setCustomer({
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "(555) 123-4567",
  })
  .addItem("laptop", {
    name: "Gaming Laptop",
    price: 1299.99,
    category: "Electronics",
  })
  .addItem(
    "mouse",
    {
      name: "Wireless Mouse",
      price: 49.99,
      category: "Accessories",
    },
    2
  )
  .addItem("keyboard", {
    name: "Mechanical Keyboard",
    price: 149.99,
    category: "Accessories",
  })
  .applyDiscount("STUDENT10", 10, "Student Discount")
  .setShippingInfo({
    method: "standard",
    address: "123 Main St, City, State 12345",
    estimatedDelivery: "March 15, 2024",
  });

// Get summary and checkout
cart.getSummary();
cart.checkout();
```

### Example 3: Game Character System

```javascript
function createGameCharacter(name, characterClass) {
  return {
    name: name,
    class: characterClass,
    level: 1,
    experience: 0,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    inventory: [],
    skills: [],
    stats: {
      strength: 10,
      defense: 10,
      intelligence: 10,
      speed: 10,
    },

    // Basic actions
    levelUp() {
      this.level++;
      this.maxHealth += 20;
      this.maxMana += 10;
      this.health = this.maxHealth; // Full heal on level up
      this.mana = this.maxMana;

      // Increase stats based on class
      if (this.class === "warrior") {
        this.stats.strength += 3;
        this.stats.defense += 2;
        this.stats.intelligence += 1;
        this.stats.speed += 1;
      } else if (this.class === "mage") {
        this.stats.strength += 1;
        this.stats.defense += 1;
        this.stats.intelligence += 3;
        this.stats.speed += 2;
      } else if (this.class === "rogue") {
        this.stats.strength += 2;
        this.stats.defense += 1;
        this.stats.intelligence += 1;
        this.stats.speed += 3;
      }

      console.log(`🎉 ${this.name} reached level ${this.level}!`);
      this.displayStats();
      return this;
    },

    gainExperience(amount) {
      this.experience += amount;
      console.log(
        `📈 ${this.name} gained ${amount} experience (Total: ${this.experience})`
      );

      // Check for level up (need 100 XP per level)
      let expNeeded = this.level * 100;
      if (this.experience >= expNeeded) {
        this.experience -= expNeeded;
        this.levelUp();
      }

      return this;
    },

    takeDamage(damage) {
      let actualDamage = Math.max(
        1,
        damage - Math.floor(this.stats.defense / 2)
      );
      this.health = Math.max(0, this.health - actualDamage);

      console.log(
        `💥 ${this.name} took ${actualDamage} damage! Health: ${this.health}/${this.maxHealth}`
      );

      if (this.health === 0) {
        console.log(`💀 ${this.name} has been defeated!`);
      }

      return this;
    },

    heal(amount) {
      let healAmount = Math.min(amount, this.maxHealth - this.health);
      this.health += healAmount;

      console.log(
        `💚 ${this.name} healed for ${healAmount} HP! Health: ${this.health}/${this.maxHealth}`
      );
      return this;
    },

    useMana(amount) {
      if (this.mana >= amount) {
        this.mana -= amount;
        console.log(
          `🔮 ${this.name} used ${amount} mana. Remaining: ${this.mana}/${this.maxMana}`
        );
        return true;
      } else {
        console.log(`❌ ${this.name} doesn't have enough mana!`);
        return false;
      }
    },

    restoreMana(amount) {
      let restoreAmount = Math.min(amount, this.maxMana - this.mana);
      this.mana += restoreAmount;

      console.log(
        `💙 ${this.name} restored ${restoreAmount} mana! Mana: ${this.mana}/${this.maxMana}`
      );
      return this;
    },

    // Combat actions
    attack(target) {
      let damage = this.stats.strength + Math.floor(Math.random() * 10);
      console.log(
        `⚔️ ${this.name} attacks ${target.name} for ${damage} damage!`
      );
      target.takeDamage(damage);

      this.gainExperience(10);
      return this;
    },

    castSpell(spellName, target, manaCost = 20) {
      if (!this.useMana(manaCost)) {
        return this;
      }

      let damage = this.stats.intelligence + Math.floor(Math.random() * 15);
      console.log(
        `✨ ${this.name} casts ${spellName} on ${target.name} for ${damage} magic damage!`
      );
      target.takeDamage(damage);

      this.gainExperience(15);
      return this;
    },

    defend() {
      let defenseBoost = Math.floor(this.stats.defense / 2);
      console.log(
        `🛡️ ${this.name} defends, gaining ${defenseBoost} temporary defense!`
      );

      // Temporarily boost defense for next attack
      this.stats.defense += defenseBoost;

      setTimeout(() => {
        this.stats.defense -= defenseBoost;
        console.log(`🛡️ ${this.name}'s defense boost wore off`);
      }, 3000);

      return this;
    },

    // Inventory management
    addItem(item) {
      this.inventory.push({
        ...item,
        acquiredAt: new Date().toISOString(),
      });

      console.log(`🎒 ${this.name} acquired: ${item.name}`);
      return this;
    },

    useItem(itemName) {
      let itemIndex = this.inventory.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex === -1) {
        console.log(`❌ ${this.name} doesn't have ${itemName}`);
        return this;
      }

      let item = this.inventory[itemIndex];

      // Apply item effects
      if (item.type === "potion") {
        if (item.effect === "heal") {
          this.heal(item.value);
        } else if (item.effect === "mana") {
          this.restoreMana(item.value);
        }

        // Remove consumable item
        this.inventory.splice(itemIndex, 1);
        console.log(`🧪 ${this.name} used ${itemName}`);
      }

      return this;
    },

    learnSkill(skillName, description) {
      if (!this.skills.find((skill) => skill.name === skillName)) {
        this.skills.push({
          name: skillName,
          description: description,
          learnedAt: new Date().toISOString(),
        });

        console.log(`📚 ${this.name} learned skill: ${skillName}`);
      } else {
        console.log(`🤔 ${this.name} already knows ${skillName}`);
      }

      return this;
    },

    // Display methods
    displayStats() {
      console.log(
        `=== ${this.name.toUpperCase()} (Level ${this.level} ${this.class}) ===`
      );
      console.log(`Health: ${this.health}/${this.maxHealth}`);
      console.log(`Mana: ${this.mana}/${this.maxMana}`);
      console.log(`Experience: ${this.experience}/${this.level * 100}`);
      console.log(`Stats:`);
      console.log(`  ⚔️ Strength: ${this.stats.strength}`);
      console.log(`  🛡️ Defense: ${this.stats.defense}`);
      console.log(`  🧠 Intelligence: ${this.stats.intelligence}`);
      console.log(`  💨 Speed: ${this.stats.speed}`);

      return this;
    },

    displayInventory() {
      console.log(`=== ${this.name.toUpperCase()}'S INVENTORY ===`);

      if (this.inventory.length === 0) {
        console.log("Inventory is empty");
      } else {
        this.inventory.forEach((item, index) => {
          console.log(`${index + 1}. ${item.name} - ${item.description}`);
        });
      }

      return this;
    },

    displaySkills() {
      console.log(`=== ${this.name.toUpperCase()}'S SKILLS ===`);

      if (this.skills.length === 0) {
        console.log("No skills learned yet");
      } else {
        this.skills.forEach((skill, index) => {
          console.log(`${index + 1}. ${skill.name}: ${skill.description}`);
        });
      }

      return this;
    },
  };
}

// Test game character system
console.log("=== GAME CHARACTER SYSTEM ===");

// Create characters
let warrior = createGameCharacter("Thorin", "warrior");
let mage = createGameCharacter("Gandalf", "mage");

// Initial stats
warrior.displayStats();

// Level up and gain items
warrior
  .gainExperience(90)
  .gainExperience(50) // This should trigger level up
  .addItem({
    name: "Health Potion",
    type: "potion",
    effect: "heal",
    value: 50,
    description: "Restores 50 HP",
  })
  .addItem({
    name: "Iron Sword",
    type: "weapon",
    attack: 15,
    description: "A sturdy iron sword",
  })
  .learnSkill("Power Strike", "Deal double damage on next attack");

// Combat simulation
console.log("\n=== COMBAT SIMULATION ===");

warrior.attack(mage);
mage.castSpell("Fireball", warrior, 25);
warrior.takeDamage(30);
warrior.useItem("Health Potion");

// Display final state
console.log("\n=== FINAL CHARACTER STATES ===");
warrior.displayStats().displayInventory().displaySkills();
mage.displayStats();
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Simple Counter Object

```javascript
let counter = {
  value: 0,

  increment() {
    this.value++;
    console.log(`Counter: ${this.value}`);
    return this;
  },

  decrement() {
    this.value--;
    console.log(`Counter: ${this.value}`);
    return this;
  },

  reset() {
    this.value = 0;
    console.log("Counter reset to 0");
    return this;
  },

  getValue() {
    return this.value;
  },
};

console.log("=== COUNTER EXERCISE ===");

// Test counter with method chaining
counter.increment().increment().increment().decrement().reset().increment();
console.log("Final value:", counter.getValue());
```

### Exercise 2: Student Grade Book

```javascript
let gradeBook = {
  studentName: "",
  grades: [],

  setStudent(name) {
    this.studentName = name;
    console.log(`📚 Grade book for: ${name}`);
    return this;
  },

  addGrade(subject, score) {
    this.grades.push({ subject, score, date: new Date().toLocaleDateString() });
    console.log(`📝 Added ${subject}: ${score}`);
    return this;
  },

  getAverage() {
    if (this.grades.length === 0) return 0;
    let sum = this.grades.reduce((total, grade) => total + grade.score, 0);
    return Math.round((sum / this.grades.length) * 10) / 10;
  },

  getLetterGrade() {
    let avg = this.getAverage();
    if (avg >= 90) return "A";
    if (avg >= 80) return "B";
    if (avg >= 70) return "C";
    if (avg >= 60) return "D";
    return "F";
  },

  displayReport() {
    console.log(`=== GRADE REPORT FOR ${this.studentName.toUpperCase()} ===`);
    this.grades.forEach((grade) => {
      console.log(`${grade.subject}: ${grade.score} (${grade.date})`);
    });
    console.log(`Average: ${this.getAverage()}`);
    console.log(`Letter Grade: ${this.getLetterGrade()}`);
    return this;
  },
};

console.log("=== GRADE BOOK EXERCISE ===");

gradeBook
  .setStudent("Alice Johnson")
  .addGrade("Math", 95)
  .addGrade("English", 87)
  .addGrade("Science", 92)
  .addGrade("History", 89)
  .displayReport();
```

## 📚 Key Takeaways

1. **Methods add behavior** - Objects become active entities that can perform actions
2. **`this` keyword** - Refers to the object the method belongs to
3. **Method chaining** - Return `this` to enable fluent interfaces
4. **Encapsulation** - Related data and functions stay together
5. **Real-world modeling** - Objects represent entities with both properties and capabilities
6. **Code organization** - Methods help structure complex functionality

## ➡️ What's Next?

Outstanding work mastering object methods! 🎉 You now understand how to create objects that not only store data but can also perform actions and interact with other objects.

Next, you'll learn about **Arrow Functions** - a modern, more concise way to write functions in JavaScript that has some special behaviors and use cases.

Your next lesson: **21. Arrow Functions - Modern Function Syntax**

## 🔗 Quick Reference

```javascript
// Object methods
let obj = {
  property: value,

  // Method with function keyword
  method1: function () {
    return this.property;
  },

  // Method shorthand (ES6+)
  method2() {
    return this.property;
  },
};

// Method chaining
obj.method1().method2(); // Each method returns 'this'

// The 'this' keyword
this.property; // Refers to the object the method belongs to
this.method(); // Call another method on the same object
```

You're building powerful, interactive applications! 🚀
