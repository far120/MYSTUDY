# 28. Classes - Modern Object Creation 🏛️

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- ES6 class syntax and its advantages over constructor functions
- Creating classes with constructors, methods, and properties
- Class inheritance with `extends` and `super`
- Static methods and properties
- Private fields and methods (modern JavaScript)
- Getters, setters, and computed properties
- Best practices for class-based programming

## 🤔 What are Classes?

Classes in JavaScript are a more intuitive and cleaner way to create objects and handle inheritance. They're syntactic sugar over JavaScript's prototype-based inheritance, making object-oriented programming more familiar to developers from other languages.

**Think of it like**: A blueprint for creating objects - just like architectural blueprints are used to build houses with similar structure but different details.

```javascript
console.log("=== CLASS INTRODUCTION ===");

// Traditional constructor function approach
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
}

PersonConstructor.prototype.greet = function () {
  return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
};

PersonConstructor.prototype.haveBirthday = function () {
  this.age++;
  return `Happy birthday! I'm now ${this.age} years old.`;
};

// Modern class approach (equivalent functionality)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }

  haveBirthday() {
    this.age++;
    return `Happy birthday! I'm now ${this.age} years old.`;
  }
}

// Both create objects the same way
let person1 = new PersonConstructor("Alice", 30);
let person2 = new Person("Bob", 25);

console.log("Constructor function:", person1.greet());
console.log("Class:", person2.greet());

// Both have the same prototype relationships
console.log("Constructor instanceof:", person1 instanceof PersonConstructor);
console.log("Class instanceof:", person2 instanceof Person);
console.log("Same prototype mechanism:", typeof Person === "function"); // true

// Classes are hoisted differently (temporal dead zone)
// console.log(new EarlyClass()); // ReferenceError - can't use before declaration
class EarlyClass {
  constructor() {
    this.message = "I can't be used before declaration";
  }
}

let early = new EarlyClass();
console.log("After declaration:", early.message);
```

## 🏗️ Class Anatomy

```javascript
console.log("=== CLASS ANATOMY ===");

class Vehicle {
  // Class fields (modern JavaScript)
  wheels = 4;
  isRunning = false;

  // Static properties
  static totalVehicles = 0;
  static types = ["car", "truck", "motorcycle", "bicycle"];

  constructor(make, model, year) {
    // Instance properties
    this.make = make;
    this.model = model;
    this.year = year;
    this.mileage = 0;
    this.id = ++Vehicle.totalVehicles;

    console.log(
      `Vehicle ${this.id} created: ${this.year} ${this.make} ${this.model}`
    );
  }

  // Instance methods
  start() {
    if (this.isRunning) {
      return `${this.make} ${this.model} is already running.`;
    }
    this.isRunning = true;
    return `${this.make} ${this.model} started successfully.`;
  }

  stop() {
    if (!this.isRunning) {
      return `${this.make} ${this.model} is already stopped.`;
    }
    this.isRunning = false;
    return `${this.make} ${this.model} stopped.`;
  }

  drive(distance) {
    if (!this.isRunning) {
      return "Vehicle must be started first.";
    }
    this.mileage += distance;
    return `Drove ${distance} miles. Total mileage: ${this.mileage}`;
  }

  // Getter method
  get info() {
    return {
      id: this.id,
      make: this.make,
      model: this.model,
      year: this.year,
      wheels: this.wheels,
      mileage: this.mileage,
      isRunning: this.isRunning,
    };
  }

  // Setter method
  set vehicleMileage(miles) {
    if (miles < 0) {
      throw new Error("Mileage cannot be negative");
    }
    this.mileage = miles;
  }

  // Computed property getter
  get age() {
    return new Date().getFullYear() - this.year;
  }

  // Method that returns 'this' for chaining
  updateInfo(updates) {
    Object.assign(this, updates);
    return this;
  }

  // Static methods
  static getRandomType() {
    return this.types[Math.floor(Math.random() * this.types.length)];
  }

  static compareAge(vehicle1, vehicle2) {
    return vehicle1.age - vehicle2.age;
  }

  static getTotalVehicles() {
    return this.totalVehicles;
  }

  // toString method for string representation
  toString() {
    return `${this.year} ${this.make} ${this.model} (${this.mileage} miles)`;
  }
}

// Create vehicle instances
let car = new Vehicle("Toyota", "Camry", 2020);
let truck = new Vehicle("Ford", "F-150", 2018);

console.log("Car info:", car.info);
console.log("Truck info:", truck.info);

// Test instance methods
console.log(car.start());
console.log(car.drive(100));
console.log(car.drive(50));
console.log(car.stop());

// Test getters and setters
console.log("Car age:", car.age);
car.vehicleMileage = 200;
console.log("Updated mileage:", car.mileage);

// Test method chaining
car.updateInfo({ color: "red", features: ["GPS", "Bluetooth"] });
console.log("Updated car:", car.info);

// Test static methods
console.log("Random vehicle type:", Vehicle.getRandomType());
console.log("Total vehicles created:", Vehicle.getTotalVehicles());
console.log("Age comparison:", Vehicle.compareAge(car, truck));

// Test toString
console.log("Car string representation:", car.toString());
console.log("Truck string representation:", truck.toString());

// Static properties
console.log("Vehicle types:", Vehicle.types);
console.log("Total vehicles (static):", Vehicle.totalVehicles);
```

## 🧬 Class Inheritance

```javascript
console.log("=== CLASS INHERITANCE ===");

// Base class
class Animal {
  constructor(name, species, age) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.energy = 100;
    this.happiness = 50;
  }

  eat(food) {
    this.energy = Math.min(this.energy + 20, 100);
    this.happiness = Math.min(this.happiness + 10, 100);
    return `${this.name} ate ${food}. Energy: ${this.energy}, Happiness: ${this.happiness}`;
  }

  sleep(hours) {
    this.energy = Math.min(this.energy + hours * 10, 100);
    return `${this.name} slept for ${hours} hours. Energy: ${this.energy}`;
  }

  play() {
    if (this.energy < 20) {
      return `${this.name} is too tired to play.`;
    }
    this.energy -= 15;
    this.happiness = Math.min(this.happiness + 25, 100);
    return `${this.name} had fun playing! Energy: ${this.energy}, Happiness: ${this.happiness}`;
  }

  getStatus() {
    return {
      name: this.name,
      species: this.species,
      age: this.age,
      energy: this.energy,
      happiness: this.happiness,
    };
  }

  makeSound() {
    return `${this.name} makes a generic animal sound.`;
  }

  // Method to be overridden by subclasses
  getInfo() {
    return `${this.name} is a ${this.age}-year-old ${this.species}.`;
  }
}

// Inherited class - Dog
class Dog extends Animal {
  constructor(name, breed, age) {
    super(name, "Dog", age); // Call parent constructor
    this.breed = breed;
    this.tricks = [];
    this.loyalty = 100;
  }

  // Override parent method
  makeSound() {
    return `${this.name} barks: Woof! Woof!`;
  }

  // Extend parent method
  getInfo() {
    let baseInfo = super.getInfo(); // Call parent method
    return `${baseInfo} Breed: ${this.breed}. Loyalty: ${this.loyalty}`;
  }

  // Dog-specific methods
  bark() {
    this.energy -= 5;
    return `${this.name} barks loudly! Energy: ${this.energy}`;
  }

  fetch() {
    if (this.energy < 25) {
      return `${this.name} is too tired to fetch.`;
    }
    this.energy -= 20;
    this.happiness = Math.min(this.happiness + 30, 100);
    return `${this.name} fetched the ball! Energy: ${this.energy}, Happiness: ${this.happiness}`;
  }

  learnTrick(trick) {
    if (!this.tricks.includes(trick)) {
      this.tricks.push(trick);
      this.happiness = Math.min(this.happiness + 15, 100);
      return `${this.name} learned '${trick}'! Total tricks: ${this.tricks.length}`;
    }
    return `${this.name} already knows '${trick}'.`;
  }

  performTrick(trick) {
    if (this.tricks.includes(trick)) {
      this.energy -= 10;
      this.happiness = Math.min(this.happiness + 20, 100);
      return `${this.name} performed '${trick}'! *applause*`;
    }
    return `${this.name} doesn't know '${trick}' yet.`;
  }

  // Override play method with dog-specific behavior
  play() {
    let result = super.play(); // Call parent play method
    if (result.includes("had fun")) {
      this.loyalty = Math.min(this.loyalty + 5, 100);
      return result + ` Loyalty increased to ${this.loyalty}!`;
    }
    return result;
  }
}

// Another inherited class - Cat
class Cat extends Animal {
  constructor(name, breed, age) {
    super(name, "Cat", age);
    this.breed = breed;
    this.independence = 80;
    this.curiosity = 90;
  }

  makeSound() {
    return `${this.name} meows: Meow! Meow!`;
  }

  getInfo() {
    let baseInfo = super.getInfo();
    return `${baseInfo} Breed: ${this.breed}. Independence: ${this.independence}`;
  }

  // Cat-specific methods
  purr() {
    this.happiness = Math.min(this.happiness + 10, 100);
    return `${this.name} purrs contentedly. Happiness: ${this.happiness}`;
  }

  scratch() {
    this.energy -= 5;
    this.independence = Math.min(this.independence + 3, 100);
    return `${this.name} scratches the furniture. Independence: ${this.independence}`;
  }

  hunt() {
    if (this.energy < 30) {
      return `${this.name} is too tired to hunt.`;
    }
    this.energy -= 25;
    this.curiosity = Math.min(this.curiosity + 10, 100);
    return `${this.name} went hunting! Energy: ${this.energy}, Curiosity: ${this.curiosity}`;
  }

  // Cats play differently than dogs
  play() {
    if (this.energy < 20) {
      return `${this.name} is too tired to play.`;
    }
    this.energy -= 10;
    this.happiness = Math.min(this.happiness + 15, 100);
    this.curiosity = Math.min(this.curiosity + 5, 100);
    return `${this.name} played with a toy mouse! Energy: ${this.energy}, Happiness: ${this.happiness}`;
  }
}

// Create instances and test inheritance
let dog = new Dog("Buddy", "Golden Retriever", 3);
let cat = new Cat("Whiskers", "Persian", 2);

console.log("Dog info:", dog.getInfo());
console.log("Cat info:", cat.getInfo());

console.log("Sounds:");
console.log(dog.makeSound());
console.log(cat.makeSound());

console.log("Base methods (inherited):");
console.log(dog.eat("dog treats"));
console.log(cat.eat("tuna"));

console.log("Specific methods:");
console.log(dog.bark());
console.log(dog.fetch());
console.log(dog.learnTrick("sit"));
console.log(dog.learnTrick("roll over"));
console.log(dog.performTrick("sit"));

console.log(cat.purr());
console.log(cat.scratch());
console.log(cat.hunt());

console.log("Play behavior (overridden):");
console.log(dog.play());
console.log(cat.play());

console.log("Final status:");
console.log("Dog:", dog.getStatus());
console.log("Cat:", cat.getStatus());

// Check inheritance relationships
console.log("Inheritance checks:");
console.log("dog instanceof Dog:", dog instanceof Dog);
console.log("dog instanceof Animal:", dog instanceof Animal);
console.log("cat instanceof Cat:", cat instanceof Cat);
console.log("cat instanceof Animal:", cat instanceof Animal);
console.log("dog instanceof Cat:", dog instanceof Cat);

// Further inheritance - Service Dog
class ServiceDog extends Dog {
  constructor(name, breed, age, serviceType) {
    super(name, breed, age);
    this.serviceType = serviceType;
    this.certified = false;
    this.workingHours = 0;
    this.specialSkills = [];
  }

  certify() {
    if (this.tricks.length >= 5) {
      this.certified = true;
      return `${this.name} is now certified as a ${this.serviceType} service dog!`;
    }
    return `${this.name} needs to learn more tricks before certification.`;
  }

  work(hours) {
    if (!this.certified) {
      return `${this.name} must be certified before working.`;
    }
    if (this.energy < 30) {
      return `${this.name} is too tired to work.`;
    }

    this.workingHours += hours;
    this.energy -= hours * 10;
    this.loyalty = Math.min(this.loyalty + hours * 2, 100);

    return `${this.name} worked for ${hours} hours. Total working hours: ${this.workingHours}`;
  }

  learnSpecialSkill(skill) {
    if (!this.specialSkills.includes(skill)) {
      this.specialSkills.push(skill);
      return `${this.name} learned special skill: ${skill}`;
    }
    return `${this.name} already knows ${skill}.`;
  }

  getInfo() {
    let baseInfo = super.getInfo();
    return `${baseInfo} Service Type: ${this.serviceType}. Certified: ${this.certified}. Working Hours: ${this.workingHours}`;
  }
}

let serviceDog = new ServiceDog("Max", "Labrador", 4, "Guide Dog");

console.log("Service Dog Training:");
console.log(serviceDog.learnTrick("sit"));
console.log(serviceDog.learnTrick("stay"));
console.log(serviceDog.learnTrick("come"));
console.log(serviceDog.learnTrick("heel"));
console.log(serviceDog.learnTrick("guide"));

console.log(serviceDog.learnSpecialSkill("navigate obstacles"));
console.log(serviceDog.learnSpecialSkill("find exits"));

console.log(serviceDog.certify());
console.log(serviceDog.work(4));
console.log(serviceDog.getInfo());
```

## 🔒 Private Fields and Methods

```javascript
console.log("=== PRIVATE FIELDS AND METHODS ===");

class BankAccount {
  // Private fields (start with #)
  #balance = 0;
  #pin = null;
  #transactionHistory = [];
  #locked = false;
  #failedAttempts = 0;

  // Static private field
  static #totalAccounts = 0;

  constructor(accountHolder, initialBalance = 0, pin) {
    this.accountHolder = accountHolder;
    this.accountNumber = this.#generateAccountNumber();
    this.createdAt = new Date();

    // Validate PIN
    if (!this.#isValidPin(pin)) {
      throw new Error("PIN must be 4 digits");
    }

    this.#pin = pin;
    this.#balance = initialBalance;

    BankAccount.#totalAccounts++;
    console.log(`Account created for ${accountHolder}: ${this.accountNumber}`);
  }

  // Private methods
  #generateAccountNumber() {
    return (
      "ACC" +
      Date.now().toString().slice(-8) +
      Math.random().toString(36).slice(-3).toUpperCase()
    );
  }

  #isValidPin(pin) {
    return typeof pin === "string" && pin.length === 4 && /^\d{4}$/.test(pin);
  }

  #verifyPin(enteredPin) {
    if (this.#locked) {
      throw new Error("Account is locked due to multiple failed attempts");
    }

    if (enteredPin !== this.#pin) {
      this.#failedAttempts++;
      if (this.#failedAttempts >= 3) {
        this.#locked = true;
        throw new Error("Account locked after 3 failed PIN attempts");
      }
      throw new Error(
        `Incorrect PIN. ${3 - this.#failedAttempts} attempts remaining`
      );
    }

    this.#failedAttempts = 0; // Reset on successful verification
    return true;
  }

  #addTransaction(type, amount, description) {
    this.#transactionHistory.push({
      id: Math.random().toString(36).slice(2),
      type: type,
      amount: amount,
      description: description,
      balance: this.#balance,
      timestamp: new Date(),
    });
  }

  #calculateInterest() {
    // Private method for internal calculations
    return this.#balance * 0.001; // 0.1% interest
  }

  // Public methods
  deposit(amount, pin, description = "Deposit") {
    this.#verifyPin(pin);

    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }

    this.#balance += amount;
    this.#addTransaction("deposit", amount, description);

    console.log(`Deposited $${amount}. New balance: $${this.#balance}`);
    return this.#balance;
  }

  withdraw(amount, pin, description = "Withdrawal") {
    this.#verifyPin(pin);

    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }

    if (amount > this.#balance) {
      throw new Error("Insufficient funds");
    }

    this.#balance -= amount;
    this.#addTransaction("withdrawal", amount, description);

    console.log(`Withdrew $${amount}. New balance: $${this.#balance}`);
    return this.#balance;
  }

  getBalance(pin) {
    this.#verifyPin(pin);
    return this.#balance;
  }

  getTransactionHistory(pin) {
    this.#verifyPin(pin);
    return [...this.#transactionHistory]; // Return copy
  }

  changePin(currentPin, newPin) {
    this.#verifyPin(currentPin);

    if (!this.#isValidPin(newPin)) {
      throw new Error("New PIN must be 4 digits");
    }

    if (newPin === this.#pin) {
      throw new Error("New PIN must be different from current PIN");
    }

    this.#pin = newPin;
    this.#addTransaction("pin_change", 0, "PIN changed");
    console.log("PIN changed successfully");
  }

  addInterest(pin) {
    this.#verifyPin(pin);

    let interest = this.#calculateInterest();
    this.#balance += interest;
    this.#addTransaction("interest", interest, "Monthly interest");

    console.log(
      `Interest added: $${interest.toFixed(
        2
      )}. New balance: $${this.#balance.toFixed(2)}`
    );
    return this.#balance;
  }

  // Getters for public information
  get accountInfo() {
    return {
      accountHolder: this.accountHolder,
      accountNumber: this.accountNumber,
      createdAt: this.createdAt,
      isLocked: this.#locked,
    };
  }

  // Static method using private static field
  static getTotalAccounts() {
    return BankAccount.#totalAccounts;
  }

  // Method to unlock account (for admin use)
  unlock(masterKey) {
    if (masterKey === "ADMIN_MASTER_KEY_123") {
      this.#locked = false;
      this.#failedAttempts = 0;
      console.log(`Account ${this.accountNumber} unlocked`);
    } else {
      throw new Error("Invalid master key");
    }
  }
}

// Test private fields and methods
try {
  let account = new BankAccount("Alice Johnson", 1000, "1234");

  console.log("Account info:", account.accountInfo);

  // Public methods work with correct PIN
  account.deposit(500, "1234", "Salary deposit");
  console.log("Balance:", account.getBalance("1234"));

  account.withdraw(200, "1234", "ATM withdrawal");

  // Add interest
  account.addInterest("1234");

  // Get transaction history
  let transactions = account.getTransactionHistory("1234");
  console.log("Transaction count:", transactions.length);
  console.log("Last transaction:", transactions[transactions.length - 1]);

  // Change PIN
  account.changePin("1234", "5678");

  // Test with new PIN
  console.log("Balance with new PIN:", account.getBalance("5678"));

  // Try to access private fields directly (should fail)
  console.log("Trying to access private balance:", account.#balance); // SyntaxError
} catch (error) {
  if (error.message.includes("Private field")) {
    console.log("✓ Private fields are properly protected");
  } else {
    console.log("Error:", error.message);
  }
}

// Test PIN protection
try {
  let secureAccount = new BankAccount("Bob Smith", 500, "9999");

  // Wrong PIN attempts
  secureAccount.getBalance("1111"); // Wrong PIN
} catch (error) {
  console.log("Security error:", error.message);
}

// Test static private field
console.log("Total accounts created:", BankAccount.getTotalAccounts());

// Demonstrate that private fields are truly private
class AccountInspector {
  static tryToAccessPrivateFields(account) {
    try {
      // These should all fail
      console.log("Balance:", account.#balance);
      console.log("PIN:", account.#pin);
      return "Private fields accessed successfully";
    } catch (error) {
      return "Private fields are protected: " + error.message;
    }
  }
}

let testAccount = new BankAccount("Test User", 100, "0000");
console.log(
  "Privacy test:",
  AccountInspector.tryToAccessPrivateFields(testAccount)
);
```

## 🎯 Real-World Examples

### Example 1: Game Character System

```javascript
console.log("=== GAME CHARACTER SYSTEM ===");

// Base Character class
class Character {
  static #nextId = 1;
  static characterTypes = ["Warrior", "Mage", "Archer", "Healer"];

  #id;
  #experience = 0;
  #gold = 100;

  constructor(name, type, level = 1) {
    this.#id = Character.#nextId++;
    this.name = name;
    this.type = type;
    this.level = level;
    this.health = this.maxHealth;
    this.mana = this.maxMana;
    this.inventory = [];
    this.skills = new Map();
    this.equipment = {
      weapon: null,
      armor: null,
      accessory: null,
    };

    this.initializeStats();
    console.log(`${this.type} ${this.name} created (ID: ${this.#id})`);
  }

  // Abstract method - to be overridden
  initializeStats() {
    this.baseStats = {
      strength: 10,
      intelligence: 10,
      agility: 10,
      vitality: 10,
    };
  }

  // Getters for calculated stats
  get maxHealth() {
    return this.baseStats.vitality * 10 + this.level * 5;
  }

  get maxMana() {
    return this.baseStats.intelligence * 5 + this.level * 3;
  }

  get attack() {
    let weaponBonus = this.equipment.weapon?.attack || 0;
    return this.baseStats.strength * 2 + this.level + weaponBonus;
  }

  get defense() {
    let armorBonus = this.equipment.armor?.defense || 0;
    return this.baseStats.vitality + this.level + armorBonus;
  }

  get characterId() {
    return this.#id;
  }

  get totalExperience() {
    return this.#experience;
  }

  get gold() {
    return this.#gold;
  }

  // Private methods
  #calculateExpForNextLevel() {
    return this.level * 100;
  }

  #levelUp() {
    this.level++;
    this.health = this.maxHealth;
    this.mana = this.maxMana;

    // Increase base stats
    Object.keys(this.baseStats).forEach((stat) => {
      this.baseStats[stat] += Math.floor(Math.random() * 3) + 1;
    });

    console.log(`${this.name} leveled up to ${this.level}!`);
    this.onLevelUp();
  }

  // Hook for subclasses
  onLevelUp() {
    // Override in subclasses
  }

  // Public methods
  gainExperience(amount) {
    this.#experience += amount;
    console.log(`${this.name} gained ${amount} experience`);

    while (this.#experience >= this.#calculateExpForNextLevel()) {
      this.#experience -= this.#calculateExpForNextLevel();
      this.#levelUp();
    }
  }

  addGold(amount) {
    this.#gold += amount;
    console.log(`${this.name} gained ${amount} gold (total: ${this.#gold})`);
  }

  spendGold(amount) {
    if (amount > this.#gold) {
      throw new Error("Insufficient gold");
    }
    this.#gold -= amount;
    console.log(`${this.name} spent ${amount} gold (remaining: ${this.#gold})`);
  }

  takeDamage(damage) {
    let actualDamage = Math.max(damage - this.defense, 1);
    this.health = Math.max(this.health - actualDamage, 0);

    console.log(
      `${this.name} took ${actualDamage} damage (${this.health}/${this.maxHealth} HP)`
    );

    if (this.health === 0) {
      this.die();
    }

    return actualDamage;
  }

  heal(amount) {
    let oldHealth = this.health;
    this.health = Math.min(this.health + amount, this.maxHealth);
    let healed = this.health - oldHealth;

    console.log(
      `${this.name} healed ${healed} HP (${this.health}/${this.maxHealth})`
    );
    return healed;
  }

  equipItem(item) {
    if (!item.type || !this.equipment.hasOwnProperty(item.type)) {
      throw new Error("Invalid equipment type");
    }

    let oldItem = this.equipment[item.type];
    this.equipment[item.type] = item;

    console.log(`${this.name} equipped ${item.name}`);

    if (oldItem) {
      this.inventory.push(oldItem);
      console.log(`${oldItem.name} moved to inventory`);
    }
  }

  attack(target) {
    if (this.health === 0) {
      return "Cannot attack while dead";
    }

    let damage = this.attack + Math.floor(Math.random() * 10);
    console.log(`${this.name} attacks ${target.name} for ${damage} damage!`);

    return target.takeDamage(damage);
  }

  die() {
    console.log(`${this.name} has died!`);
    this.health = 0;
    // Drop some gold
    let droppedGold = Math.floor(this.#gold * 0.1);
    this.#gold -= droppedGold;
    return droppedGold;
  }

  getFullStats() {
    return {
      id: this.#id,
      name: this.name,
      type: this.type,
      level: this.level,
      health: `${this.health}/${this.maxHealth}`,
      mana: `${this.mana}/${this.maxMana}`,
      attack: this.attack,
      defense: this.defense,
      experience: `${this.#experience}/${this.#calculateExpForNextLevel()}`,
      gold: this.#gold,
      equipment: this.equipment,
    };
  }
}

// Warrior subclass
class Warrior extends Character {
  constructor(name, level = 1) {
    super(name, "Warrior", level);
    this.rage = 0;
  }

  initializeStats() {
    this.baseStats = {
      strength: 15, // Higher strength
      intelligence: 5, // Lower intelligence
      agility: 8,
      vitality: 12, // Higher vitality
    };
  }

  onLevelUp() {
    console.log(`${this.name} feels more powerful!`);
    this.rage = 0; // Reset rage on level up
  }

  // Warrior-specific abilities
  charge(target) {
    if (this.mana < 10) {
      return "Not enough mana to charge";
    }

    this.mana -= 10;
    this.rage += 20;

    let damage = this.attack * 1.5 + this.rage;
    console.log(
      `${this.name} charges at ${target.name} with ${damage} damage!`
    );

    return target.takeDamage(damage);
  }

  berserkerRage() {
    if (this.rage < 50) {
      return "Not enough rage for berserker mode";
    }

    this.rage = 0;
    let bonusDamage = this.level * 5;
    console.log(
      `${this.name} enters berserker rage! +${bonusDamage} attack for next 3 turns`
    );

    // Temporary buff (simplified)
    this.baseStats.strength += bonusDamage;

    setTimeout(() => {
      this.baseStats.strength -= bonusDamage;
      console.log(`${this.name}'s berserker rage ends`);
    }, 3000);
  }

  attack(target) {
    let result = super.attack(target);
    this.rage += 5; // Build rage when attacking
    console.log(`${this.name}'s rage increases to ${this.rage}`);
    return result;
  }
}

// Mage subclass
class Mage extends Character {
  constructor(name, level = 1) {
    super(name, "Mage", level);
    this.spellbook = [];
    this.elementalAffinity = "fire";
  }

  initializeStats() {
    this.baseStats = {
      strength: 5, // Lower strength
      intelligence: 15, // Higher intelligence
      agility: 10,
      vitality: 8, // Lower vitality
    };
  }

  onLevelUp() {
    console.log(`${this.name} learns new magical knowledge!`);
    this.learnRandomSpell();
  }

  learnRandomSpell() {
    const spells = [
      "Fireball",
      "Ice Shard",
      "Lightning Bolt",
      "Heal",
      "Shield",
    ];
    const newSpell = spells[Math.floor(Math.random() * spells.length)];

    if (!this.spellbook.includes(newSpell)) {
      this.spellbook.push(newSpell);
      console.log(`${this.name} learned ${newSpell}!`);
    }
  }

  castSpell(spellName, target = null) {
    if (!this.spellbook.includes(spellName)) {
      return `${this.name} doesn't know ${spellName}`;
    }

    let manaCost = this.#getSpellManaCost(spellName);
    if (this.mana < manaCost) {
      return "Not enough mana";
    }

    this.mana -= manaCost;

    switch (spellName) {
      case "Fireball":
        let damage = this.baseStats.intelligence * 2 + this.level;
        console.log(`${this.name} casts Fireball for ${damage} damage!`);
        return target ? target.takeDamage(damage) : damage;

      case "Heal":
        let healing = this.baseStats.intelligence + this.level * 2;
        return this.heal(healing);

      case "Shield":
        console.log(`${this.name} casts Shield (+10 defense for 5 turns)`);
        this.baseStats.vitality += 10;
        setTimeout(() => {
          this.baseStats.vitality -= 10;
          console.log(`${this.name}'s shield expires`);
        }, 5000);
        break;

      default:
        return `${this.name} casts ${spellName}`;
    }
  }

  #getSpellManaCost(spellName) {
    const costs = {
      Fireball: 15,
      "Ice Shard": 12,
      "Lightning Bolt": 18,
      Heal: 10,
      Shield: 20,
    };
    return costs[spellName] || 10;
  }

  meditate() {
    let manaRestored = Math.floor(this.maxMana * 0.3);
    this.mana = Math.min(this.mana + manaRestored, this.maxMana);
    console.log(`${this.name} meditates and restores ${manaRestored} mana`);
  }
}

// Equipment items
class Equipment {
  constructor(name, type, stats) {
    this.name = name;
    this.type = type; // weapon, armor, accessory
    Object.assign(this, stats);
  }
}

// Test the game character system
console.log("Creating characters...");

let warrior = new Warrior("Conan", 5);
let mage = new Mage("Gandalf", 4);

// Create some equipment
let sword = new Equipment("Iron Sword", "weapon", { attack: 15 });
let robe = new Equipment("Wizard Robe", "armor", {
  defense: 8,
  intelligence: 5,
});

console.log("\nEquipping items...");
warrior.equipItem(sword);
mage.equipItem(robe);

console.log("\nCharacter stats:");
console.log("Warrior:", warrior.getFullStats());
console.log("Mage:", mage.getFullStats());

console.log("\nBattle simulation:");
warrior.charge(mage);
mage.castSpell("Fireball", warrior);
warrior.attack(mage);
mage.castSpell("Heal");

console.log("\nGaining experience:");
warrior.gainExperience(250);
mage.gainExperience(180);

console.log("\nFinal stats:");
console.log("Warrior:", warrior.getFullStats());
console.log("Mage:", mage.getFullStats());

console.log(
  `\nTotal characters created: ${Character.characterTypes.length} types available`
);
```

### Example 2: Task Management System

```javascript
console.log("=== TASK MANAGEMENT SYSTEM ===");

// Base Task class
class Task {
  static #nextId = 1;
  static priorities = ["low", "medium", "high", "urgent"];
  static statuses = ["pending", "in-progress", "completed", "cancelled"];

  #id;
  #createdAt;
  #updatedAt;
  #history = [];

  constructor(title, description, priority = "medium", dueDate = null) {
    this.#id = Task.#nextId++;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = "pending";
    this.dueDate = dueDate;
    this.tags = [];
    this.#createdAt = new Date();
    this.#updatedAt = new Date();

    this.#addToHistory("created", "Task created");
    console.log(`Task created: ${this.title} (ID: ${this.#id})`);
  }

  // Private methods
  #addToHistory(action, details) {
    this.#history.push({
      action,
      details,
      timestamp: new Date(),
      status: this.status,
    });
    this.#updatedAt = new Date();
  }

  #validateStatus(status) {
    return Task.statuses.includes(status);
  }

  #validatePriority(priority) {
    return Task.priorities.includes(priority);
  }

  // Getters
  get id() {
    return this.#id;
  }

  get createdAt() {
    return new Date(this.#createdAt);
  }

  get updatedAt() {
    return new Date(this.#updatedAt);
  }

  get history() {
    return [...this.#history];
  }

  get isOverdue() {
    return (
      this.dueDate &&
      new Date() > new Date(this.dueDate) &&
      this.status !== "completed"
    );
  }

  get daysUntilDue() {
    if (!this.dueDate) return null;
    let diff = new Date(this.dueDate) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  // Public methods
  updateStatus(newStatus, note = "") {
    if (!this.#validateStatus(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    let oldStatus = this.status;
    this.status = newStatus;

    this.#addToHistory(
      "status_change",
      `Changed from ${oldStatus} to ${newStatus}. ${note}`
    );
    console.log(`Task ${this.#id}: Status changed to ${newStatus}`);

    return this;
  }

  updatePriority(newPriority) {
    if (!this.#validatePriority(newPriority)) {
      throw new Error(`Invalid priority: ${newPriority}`);
    }

    let oldPriority = this.priority;
    this.priority = newPriority;

    this.#addToHistory(
      "priority_change",
      `Changed from ${oldPriority} to ${newPriority}`
    );
    console.log(`Task ${this.#id}: Priority changed to ${newPriority}`);

    return this;
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.#addToHistory("tag_added", `Added tag: ${tag}`);
    }
    return this;
  }

  removeTag(tag) {
    let index = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
      this.#addToHistory("tag_removed", `Removed tag: ${tag}`);
    }
    return this;
  }

  complete(note = "") {
    return this.updateStatus("completed", note);
  }

  cancel(reason = "") {
    return this.updateStatus("cancelled", reason);
  }

  start(note = "") {
    return this.updateStatus("in-progress", note);
  }

  getInfo() {
    return {
      id: this.#id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      status: this.status,
      dueDate: this.dueDate,
      tags: [...this.tags],
      isOverdue: this.isOverdue,
      daysUntilDue: this.daysUntilDue,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}

// Project Task (inherits from Task)
class ProjectTask extends Task {
  constructor(
    title,
    description,
    priority,
    dueDate,
    projectName,
    estimatedHours
  ) {
    super(title, description, priority, dueDate);
    this.projectName = projectName;
    this.estimatedHours = estimatedHours;
    this.actualHours = 0;
    this.assignee = null;
    this.subtasks = [];
    this.dependencies = [];
  }

  assignTo(person) {
    let oldAssignee = this.assignee;
    this.assignee = person;

    let message = oldAssignee
      ? `Reassigned from ${oldAssignee} to ${person}`
      : `Assigned to ${person}`;

    this._addToHistory("assignment", message);
    console.log(`Task ${this.id}: ${message}`);

    return this;
  }

  logHours(hours, description = "") {
    this.actualHours += hours;
    this._addToHistory(
      "time_logged",
      `Logged ${hours} hours. Total: ${this.actualHours}. ${description}`
    );
    console.log(`Task ${this.id}: Logged ${hours} hours`);

    return this;
  }

  addSubtask(subtask) {
    this.subtasks.push(subtask);
    this._addToHistory("subtask_added", `Added subtask: ${subtask.title}`);

    return this;
  }

  addDependency(task) {
    if (!this.dependencies.includes(task.id)) {
      this.dependencies.push(task.id);
      this._addToHistory(
        "dependency_added",
        `Added dependency: Task ${task.id}`
      );
    }

    return this;
  }

  canStart(allTasks) {
    // Check if all dependencies are completed
    return this.dependencies.every((depId) => {
      let depTask = allTasks.find((t) => t.id === depId);
      return depTask && depTask.status === "completed";
    });
  }

  getProgress() {
    if (this.subtasks.length === 0) {
      return this.status === "completed" ? 100 : 0;
    }

    let completedSubtasks = this.subtasks.filter(
      (st) => st.status === "completed"
    ).length;
    return Math.round((completedSubtasks / this.subtasks.length) * 100);
  }

  getInfo() {
    let baseInfo = super.getInfo();
    return {
      ...baseInfo,
      projectName: this.projectName,
      assignee: this.assignee,
      estimatedHours: this.estimatedHours,
      actualHours: this.actualHours,
      progress: this.getProgress(),
      subtasks: this.subtasks.length,
      dependencies: this.dependencies.length,
    };
  }

  // Protected method for subclasses to use
  _addToHistory(action, details) {
    super._addToHistory(action, details);
  }
}

// Bug Task (specific type of project task)
class BugTask extends ProjectTask {
  constructor(title, description, severity, reproducible, projectName) {
    super(title, description, "high", null, projectName, 2);
    this.type = "bug";
    this.severity = severity; // low, medium, high, critical
    this.reproducible = reproducible;
    this.stepsToReproduce = [];
    this.resolution = null;
  }

  addReproductionStep(step) {
    this.stepsToReproduce.push(step);
    this._addToHistory("reproduction_step", `Added step: ${step}`);

    return this;
  }

  resolve(resolution) {
    this.resolution = resolution;
    this.complete(`Bug resolved: ${resolution}`);

    return this;
  }

  getInfo() {
    let baseInfo = super.getInfo();
    return {
      ...baseInfo,
      type: this.type,
      severity: this.severity,
      reproducible: this.reproducible,
      stepsToReproduce: [...this.stepsToReproduce],
      resolution: this.resolution,
    };
  }
}

// Task Manager
class TaskManager {
  #tasks = [];
  #projects = new Set();

  constructor() {
    console.log("Task Manager initialized");
  }

  createTask(title, description, priority = "medium", dueDate = null) {
    let task = new Task(title, description, priority, dueDate);
    this.#tasks.push(task);
    return task;
  }

  createProjectTask(
    title,
    description,
    priority,
    dueDate,
    projectName,
    estimatedHours
  ) {
    let task = new ProjectTask(
      title,
      description,
      priority,
      dueDate,
      projectName,
      estimatedHours
    );
    this.#tasks.push(task);
    this.#projects.add(projectName);
    return task;
  }

  createBugTask(title, description, severity, reproducible, projectName) {
    let task = new BugTask(
      title,
      description,
      severity,
      reproducible,
      projectName
    );
    this.#tasks.push(task);
    this.#projects.add(projectName);
    return task;
  }

  getTask(id) {
    return this.#tasks.find((task) => task.id === id);
  }

  getTasks(filter = {}) {
    let filtered = this.#tasks;

    if (filter.status) {
      filtered = filtered.filter((task) => task.status === filter.status);
    }

    if (filter.priority) {
      filtered = filtered.filter((task) => task.priority === filter.priority);
    }

    if (filter.project) {
      filtered = filtered.filter(
        (task) => task.projectName && task.projectName === filter.project
      );
    }

    if (filter.assignee) {
      filtered = filtered.filter(
        (task) => task.assignee && task.assignee === filter.assignee
      );
    }

    if (filter.overdue) {
      filtered = filtered.filter((task) => task.isOverdue);
    }

    return filtered;
  }

  getProjects() {
    return Array.from(this.#projects);
  }

  getStats() {
    let total = this.#tasks.length;
    let byStatus = {};
    let byPriority = {};

    Task.statuses.forEach((status) => {
      byStatus[status] = this.getTasks({ status }).length;
    });

    Task.priorities.forEach((priority) => {
      byPriority[priority] = this.getTasks({ priority }).length;
    });

    return {
      total,
      byStatus,
      byPriority,
      overdue: this.getTasks({ overdue: true }).length,
      projects: this.#projects.size,
    };
  }
}

// Test the task management system
let taskManager = new TaskManager();

console.log("\nCreating tasks...");

// Create different types of tasks
let simpleTask = taskManager.createTask(
  "Review documentation",
  "Review and update API documentation",
  "medium",
  "2024-02-15"
);

let projectTask = taskManager.createProjectTask(
  "Implement user authentication",
  "Build JWT-based authentication system",
  "high",
  "2024-02-20",
  "User Management System",
  16
);

let bugTask = taskManager.createBugTask(
  "Login button not working",
  "Users cannot log in when clicking the login button",
  "high",
  true,
  "User Management System"
);

console.log("\nSetting up tasks...");

// Set up project task
projectTask
  .assignTo("Alice Johnson")
  .addTag("backend")
  .addTag("security")
  .start("Beginning implementation");

// Set up bug task
bugTask
  .assignTo("Bob Smith")
  .addReproductionStep("Navigate to login page")
  .addReproductionStep("Enter valid credentials")
  .addReproductionStep("Click login button")
  .addReproductionStep("Observe no response")
  .start("Investigating issue");

// Add some work
projectTask.logHours(4, "Set up basic authentication structure");
projectTask.logHours(3, "Implemented JWT token generation");

bugTask.logHours(1, "Reproduced the issue");
bugTask.resolve("Fixed event handler binding issue");

console.log("\nTask information:");
console.log("Simple Task:", simpleTask.getInfo());
console.log("Project Task:", projectTask.getInfo());
console.log("Bug Task:", bugTask.getInfo());

console.log("\nTask Manager Stats:");
console.log(taskManager.getStats());

console.log("\nFiltered queries:");
console.log(
  "High priority tasks:",
  taskManager.getTasks({ priority: "high" }).length
);
console.log(
  "Completed tasks:",
  taskManager.getTasks({ status: "completed" }).length
);
console.log(
  "Alice's tasks:",
  taskManager.getTasks({ assignee: "Alice Johnson" }).length
);

console.log("\nProjects:", taskManager.getProjects());
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Library Management System

```javascript
console.log("=== CLASS EXERCISE 1: LIBRARY SYSTEM ===");

// TODO: Create a Library Management System with the following classes:

// 1. Book class with:
//    - Properties: title, author, isbn, pages, genre
//    - Methods: getInfo(), isAvailable()

// 2. Member class with:
//    - Properties: name, memberId, email, borrowedBooks
//    - Methods: borrowBook(), returnBook(), getInfo()

// 3. Library class with:
//    - Properties: name, books, members
//    - Methods: addBook(), addMember(), lendBook(), returnBook(), searchBooks()

// Your solution here:

class Book {
  constructor(title, author, isbn, pages, genre) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.pages = pages;
    this.genre = genre;
    this.isCheckedOut = false;
    this.borrowedBy = null;
  }

  getInfo() {
    return {
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      pages: this.pages,
      genre: this.genre,
      available: this.isAvailable(),
    };
  }

  isAvailable() {
    return !this.isCheckedOut;
  }
}

// TODO: Complete the Member and Library classes
```

### Exercise 2: E-commerce Product System

```javascript
console.log("=== CLASS EXERCISE 2: E-COMMERCE SYSTEM ===");

// TODO: Create an e-commerce system with:

// 1. Product class (base class)
// 2. Electronics class (extends Product)
// 3. Clothing class (extends Product)
// 4. ShoppingCart class
// 5. Order class

// Include features like:
// - Product categories and specifications
// - Shopping cart management
// - Order processing and tracking
// - Inventory management

// Your solution here:
```

## 📚 Key Takeaways

1. **Classes are syntactic sugar** - Over prototype-based inheritance
2. **Constructor method** - Initialize instance properties
3. **Instance vs static** - Methods belong to instances or the class itself
4. **Inheritance with extends** - Create class hierarchies
5. **super keyword** - Call parent constructor and methods
6. **Private fields (#)** - True encapsulation in modern JavaScript
7. **Getters and setters** - Control property access
8. **Method chaining** - Return `this` for fluent interfaces

## ➡️ What's Next?

Excellent work mastering ES6 classes! 🏛️ You now have a solid understanding of modern JavaScript object-oriented programming, which is essential for building complex applications and working with modern frameworks.

You've completed the core JavaScript curriculum covering everything from basic syntax to advanced concepts like classes, prototypes, closures, and modern ES6+ features. You're now ready to tackle real-world JavaScript projects and frameworks!

Consider exploring:

- **DOM Manipulation** - Interacting with web pages
- **Asynchronous JavaScript** - Promises, async/await, and APIs
- **Modern Frameworks** - React, Vue, or Angular
- **Node.js** - Server-side JavaScript
- **TypeScript** - Typed JavaScript

## 🔗 Quick Reference

```javascript
// Basic class syntax
class MyClass {
  constructor(param) {
    this.property = param;
  }

  method() {
    return this.property;
  }

  static staticMethod() {
    return "Static method";
  }
}

// Inheritance
class Child extends Parent {
  constructor(param) {
    super(param); // Call parent constructor
  }

  method() {
    return super.method() + " extended";
  }
}

// Private fields (modern)
class Private {
  #privateField = "secret";

  #privateMethod() {
    return this.#privateField;
  }
}
```

🎉 **Congratulations!** You've mastered JavaScript fundamentals and are ready for advanced development! 🚀
