# 26. Prototypes - Object Inheritance 🧬

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- What prototypes are and how they work in JavaScript
- The prototype chain and inheritance mechanism
- Creating objects with prototypes and constructor functions
- Understanding `prototype` vs `__proto__`
- Modern prototype patterns and best practices
- Practical applications of prototypal inheritance

## 🤔 What are Prototypes?

JavaScript uses **prototypal inheritance** instead of classical inheritance. Every object in JavaScript has a prototype - another object from which it inherits properties and methods.

**Think of it like**: DNA inheritance - you inherit traits from your parents, who inherited from their parents, creating a chain of inheritance.

```javascript
console.log("=== PROTOTYPE BASICS ===");

// Every object has a prototype
let simpleObject = { name: "Alice" };
console.log("Object:", simpleObject);
console.log("Object's prototype:", Object.getPrototypeOf(simpleObject));

// Arrays are objects with Array.prototype as their prototype
let myArray = [1, 2, 3];
console.log("Array:", myArray);
console.log("Array's prototype:", Object.getPrototypeOf(myArray));
console.log(
  "Array prototype is Array.prototype:",
  Object.getPrototypeOf(myArray) === Array.prototype
);

// Functions are objects too
function myFunction() {}
console.log("Function's prototype:", Object.getPrototypeOf(myFunction));
console.log(
  "Function prototype is Function.prototype:",
  Object.getPrototypeOf(myFunction) === Function.prototype
);

// Prototype chain demonstration
console.log("=== PROTOTYPE CHAIN ===");
let obj = {};
console.log("Empty object prototype:", Object.getPrototypeOf(obj));
console.log(
  "Object.prototype's prototype:",
  Object.getPrototypeOf(Object.prototype)
); // null - end of chain

// Check if properties exist on object vs prototype
let person = { name: "Bob" };
console.log("Has own property 'name':", person.hasOwnProperty("name")); // true
console.log("Has own property 'toString':", person.hasOwnProperty("toString")); // false
console.log("Can access toString:", typeof person.toString); // "function" - inherited from prototype

// Demonstrate prototype lookup
console.log("person.name:", person.name); // Found on object
console.log("person.toString:", typeof person.toString); // Found on Object.prototype
console.log("person.nonExistent:", person.nonExistent); // undefined - not found anywhere
```

## 🏗️ Constructor Functions and Prototypes

Constructor functions are the traditional way to create objects with shared methods via prototypes.

```javascript
console.log("=== CONSTRUCTOR FUNCTIONS ===");

// Basic constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Add methods to the prototype
Person.prototype.greet = function () {
  return `Hello, my name is ${this.name} and I'm ${this.age} years old.`;
};

Person.prototype.haveBirthday = function () {
  this.age++;
  return `Happy birthday! I'm now ${this.age} years old.`;
};

Person.prototype.isAdult = function () {
  return this.age >= 18;
};

// Create instances
let alice = new Person("Alice", 25);
let bob = new Person("Bob", 17);

console.log("Alice:", alice);
console.log("Alice greeting:", alice.greet());
console.log("Alice is adult:", alice.isAdult());

console.log("Bob:", bob);
console.log("Bob greeting:", bob.greet());
console.log("Bob is adult:", bob.isAdult());

// Methods are shared through prototype
console.log("Same greet method:", alice.greet === bob.greet); // true
console.log("Different name property:", alice.name === bob.name); // false

// Check prototype relationships
console.log("Alice is instance of Person:", alice instanceof Person); // true
console.log("Alice's constructor:", alice.constructor === Person); // true
console.log(
  "Alice's prototype:",
  Object.getPrototypeOf(alice) === Person.prototype
); // true

// Add methods dynamically to prototype
Person.prototype.getInfo = function () {
  return {
    name: this.name,
    age: this.age,
    isAdult: this.isAdult(),
    canVote: this.age >= 18,
    canDrink: this.age >= 21,
  };
};

console.log("Alice info:", alice.getInfo());
console.log("Bob info:", bob.getInfo());

// Modify existing prototype method
let originalGreet = Person.prototype.greet;
Person.prototype.greet = function () {
  return `${originalGreet.call(this)} Nice to meet you!`;
};

console.log("Modified greeting:", alice.greet());

// Create inheritance with constructor functions
function Employee(name, age, jobTitle, salary) {
  Person.call(this, name, age); // Call parent constructor
  this.jobTitle = jobTitle;
  this.salary = salary;
}

// Set up inheritance - Employee inherits from Person
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Add Employee-specific methods
Employee.prototype.work = function () {
  return `${this.name} is working as a ${this.jobTitle}.`;
};

Employee.prototype.getSalaryInfo = function () {
  return {
    jobTitle: this.jobTitle,
    salary: this.salary,
    monthlySalary: (this.salary / 12).toFixed(2),
  };
};

Employee.prototype.getInfo = function () {
  // Call parent method and extend it
  let parentInfo = Person.prototype.getInfo.call(this);
  return {
    ...parentInfo,
    jobTitle: this.jobTitle,
    salary: this.salary,
    canWork: this.isAdult(),
  };
};

// Create employee instances
let charlie = new Employee("Charlie", 30, "Developer", 75000);
let diana = new Employee("Diana", 28, "Designer", 68000);

console.log("Charlie:", charlie);
console.log("Charlie work:", charlie.work());
console.log("Charlie greeting:", charlie.greet()); // Inherited from Person
console.log("Charlie info:", charlie.getInfo()); // Extended version
console.log("Charlie salary info:", charlie.getSalaryInfo());

console.log("Diana info:", diana.getInfo());

// Check inheritance chain
console.log("Charlie instanceof Employee:", charlie instanceof Employee); // true
console.log("Charlie instanceof Person:", charlie instanceof Person); // true
console.log("Charlie instanceof Object:", charlie instanceof Object); // true

// Manager inherits from Employee
function Manager(name, age, jobTitle, salary, department) {
  Employee.call(this, name, age, jobTitle, salary);
  this.department = department;
  this.directReports = [];
}

Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

Manager.prototype.addDirectReport = function (employee) {
  this.directReports.push(employee);
  return `${employee.name} now reports to ${this.name}`;
};

Manager.prototype.getTeamInfo = function () {
  return {
    manager: this.name,
    department: this.department,
    teamSize: this.directReports.length,
    teamMembers: this.directReports.map((emp) => emp.name),
  };
};

Manager.prototype.getInfo = function () {
  let parentInfo = Employee.prototype.getInfo.call(this);
  return {
    ...parentInfo,
    department: this.department,
    teamSize: this.directReports.length,
    isManager: true,
  };
};

let eve = new Manager("Eve", 35, "Engineering Manager", 95000, "Engineering");

console.log("Adding team members:");
console.log(eve.addDirectReport(charlie));
console.log(eve.addDirectReport(diana));

console.log("Eve's team info:", eve.getTeamInfo());
console.log("Eve's full info:", eve.getInfo());

// Check full inheritance chain
console.log("Eve instanceof Manager:", eve instanceof Manager); // true
console.log("Eve instanceof Employee:", eve instanceof Employee); // true
console.log("Eve instanceof Person:", eve instanceof Person); // true
```

## 🔗 Understanding the Prototype Chain

```javascript
console.log("=== PROTOTYPE CHAIN DEEP DIVE ===");

// Create a prototype chain manually
let animal = {
  type: "Animal",
  eat: function () {
    return `${this.name} is eating.`;
  },
  sleep: function () {
    return `${this.name} is sleeping.`;
  },
};

let mammal = Object.create(animal);
mammal.type = "Mammal";
mammal.givesMilk = true;
mammal.giveBirth = function () {
  return `${this.name} gave birth to babies.`;
};

let dog = Object.create(mammal);
dog.type = "Dog";
dog.breed = "Unknown";
dog.bark = function () {
  return `${this.name} says Woof!`;
};

let myDog = Object.create(dog);
myDog.name = "Buddy";
myDog.breed = "Golden Retriever";
myDog.age = 3;

console.log("My dog:", myDog);
console.log("Dog eating:", myDog.eat()); // From animal
console.log("Dog giving birth:", myDog.giveBirth()); // From mammal
console.log("Dog barking:", myDog.bark()); // From dog

// Trace the prototype chain
console.log("=== PROTOTYPE CHAIN TRACE ===");
let currentObject = myDog;
let level = 0;

while (currentObject !== null) {
  console.log(`Level ${level}:`, {
    object: currentObject,
    ownProperties: Object.getOwnPropertyNames(currentObject),
    type: currentObject.type,
    constructor: currentObject.constructor?.name,
  });

  currentObject = Object.getPrototypeOf(currentObject);
  level++;

  if (level > 10) break; // Safety check
}

// Property lookup demonstration
console.log("=== PROPERTY LOOKUP ===");

function lookupProperty(obj, propName) {
  let current = obj;
  let level = 0;

  while (current !== null) {
    if (current.hasOwnProperty(propName)) {
      return {
        found: true,
        level: level,
        value: current[propName],
        location: level === 0 ? "own property" : `prototype level ${level}`,
      };
    }
    current = Object.getPrototypeOf(current);
    level++;
  }

  return { found: false, level: -1, value: undefined, location: "not found" };
}

console.log("Looking up 'name':", lookupProperty(myDog, "name"));
console.log("Looking up 'bark':", lookupProperty(myDog, "bark"));
console.log("Looking up 'eat':", lookupProperty(myDog, "eat"));
console.log("Looking up 'nonExistent':", lookupProperty(myDog, "nonExistent"));

// Prototype pollution example (be careful!)
console.log("=== PROTOTYPE MODIFICATION ===");

// Add a method to Object.prototype (affects ALL objects)
Object.prototype.describe = function () {
  return `This is an object with properties: ${Object.keys(this).join(", ")}`;
};

let testObject = { name: "Test", value: 42 };
console.log("Test object description:", testObject.describe());

// Arrays also get this method
let testArray = [1, 2, 3];
console.log("Array description:", testArray.describe());

// Clean up - remove the method
delete Object.prototype.describe;

// Better approach: extend specific prototypes
Array.prototype.last = function () {
  return this[this.length - 1];
};

Array.prototype.first = function () {
  return this[0];
};

Array.prototype.isEmpty = function () {
  return this.length === 0;
};

let numbers = [1, 2, 3, 4, 5];
console.log("First element:", numbers.first()); // 1
console.log("Last element:", numbers.last()); // 5
console.log("Is empty:", numbers.isEmpty()); // false

let emptyArray = [];
console.log("Empty array is empty:", emptyArray.isEmpty()); // true
```

## 🏭 Modern Prototype Patterns

```javascript
console.log("=== MODERN PROTOTYPE PATTERNS ===");

// Factory function with prototypes
function createVehicle(type) {
  const vehiclePrototype = {
    start: function () {
      this.isRunning = true;
      return `${this.make} ${this.model} is starting.`;
    },

    stop: function () {
      this.isRunning = false;
      return `${this.make} ${this.model} has stopped.`;
    },

    getInfo: function () {
      return {
        type: this.type,
        make: this.make,
        model: this.model,
        year: this.year,
        isRunning: this.isRunning,
      };
    },
  };

  return function (make, model, year) {
    let vehicle = Object.create(vehiclePrototype);
    vehicle.type = type;
    vehicle.make = make;
    vehicle.model = model;
    vehicle.year = year;
    vehicle.isRunning = false;
    return vehicle;
  };
}

// Create specialized vehicle factories
let createCar = createVehicle("Car");
let createTruck = createVehicle("Truck");
let createMotorcycle = createVehicle("Motorcycle");

let myCar = createCar("Toyota", "Camry", 2022);
let myTruck = createTruck("Ford", "F-150", 2021);
let myBike = createMotorcycle("Harley-Davidson", "Street 750", 2020);

console.log("Car info:", myCar.getInfo());
console.log("Starting car:", myCar.start());
console.log("Car after start:", myCar.getInfo());

// Mixin pattern with prototypes
function createMixins() {
  return {
    drivable: {
      drive: function (distance) {
        if (!this.isRunning) {
          return "Vehicle must be started first.";
        }
        this.mileage = (this.mileage || 0) + distance;
        return `Drove ${distance} miles. Total mileage: ${this.mileage}`;
      },

      checkMileage: function () {
        return this.mileage || 0;
      },
    },

    flyable: {
      fly: function (altitude) {
        if (!this.isRunning) {
          return "Aircraft must be started first.";
        }
        this.flightHours = (this.flightHours || 0) + 1;
        return `Flying at ${altitude} feet. Flight hours: ${this.flightHours}`;
      },

      land: function () {
        return `${this.make} ${this.model} is landing.`;
      },
    },

    trackable: {
      getLocation: function () {
        return this.location || "Unknown location";
      },

      setLocation: function (lat, lng) {
        this.location = { latitude: lat, longitude: lng };
        return `Location set to ${lat}, ${lng}`;
      },

      getHistory: function () {
        return this.locationHistory || [];
      },
    },
  };
}

// Apply mixins to prototypes
function applyMixin(target, mixin) {
  Object.assign(target, mixin);
}

let mixins = createMixins();

// Create aircraft with flying and tracking abilities
function Aircraft(make, model, year) {
  this.type = "Aircraft";
  this.make = make;
  this.model = model;
  this.year = year;
  this.isRunning = false;
}

// Add basic vehicle methods
Aircraft.prototype.start = function () {
  this.isRunning = true;
  return `${this.make} ${this.model} engines started.`;
};

Aircraft.prototype.stop = function () {
  this.isRunning = false;
  return `${this.make} ${this.model} engines stopped.`;
};

// Apply mixins
applyMixin(Aircraft.prototype, mixins.flyable);
applyMixin(Aircraft.prototype, mixins.trackable);

let plane = new Aircraft("Boeing", "737", 2019);

console.log("Starting plane:", plane.start());
console.log("Setting location:", plane.setLocation(40.7128, -74.006));
console.log("Flying:", plane.fly(35000));
console.log("Landing:", plane.land());

// Prototype-based inheritance with Object.create
console.log("=== OBJECT.CREATE PATTERNS ===");

// Base prototype
let BaseEntity = {
  init: function (id, name) {
    this.id = id;
    this.name = name;
    this.createdAt = new Date();
    return this;
  },

  getId: function () {
    return this.id;
  },

  getName: function () {
    return this.name;
  },

  getAge: function () {
    return Date.now() - this.createdAt.getTime();
  },

  toString: function () {
    return `${this.constructor.name || "Entity"}(${this.id}): ${this.name}`;
  },
};

// User prototype that inherits from BaseEntity
let UserPrototype = Object.create(BaseEntity);
UserPrototype.init = function (id, name, email) {
  BaseEntity.init.call(this, id, name);
  this.email = email;
  this.loginCount = 0;
  return this;
};

UserPrototype.login = function () {
  this.loginCount++;
  this.lastLogin = new Date();
  return `${this.name} logged in. Login count: ${this.loginCount}`;
};

UserPrototype.getProfile = function () {
  return {
    id: this.id,
    name: this.name,
    email: this.email,
    loginCount: this.loginCount,
    lastLogin: this.lastLogin,
    memberSince: this.createdAt,
  };
};

// Admin prototype that inherits from User
let AdminPrototype = Object.create(UserPrototype);
AdminPrototype.init = function (id, name, email, permissions) {
  UserPrototype.init.call(this, id, name, email);
  this.permissions = permissions || [];
  this.isAdmin = true;
  return this;
};

AdminPrototype.addPermission = function (permission) {
  if (!this.permissions.includes(permission)) {
    this.permissions.push(permission);
  }
  return `Permission '${permission}' added to ${this.name}`;
};

AdminPrototype.hasPermission = function (permission) {
  return this.permissions.includes(permission);
};

AdminPrototype.getProfile = function () {
  let baseProfile = UserPrototype.getProfile.call(this);
  return {
    ...baseProfile,
    isAdmin: this.isAdmin,
    permissions: [...this.permissions],
  };
};

// Factory functions using prototypes
function createUser(id, name, email) {
  return Object.create(UserPrototype).init(id, name, email);
}

function createAdmin(id, name, email, permissions) {
  return Object.create(AdminPrototype).init(id, name, email, permissions);
}

// Test the prototype inheritance
let user1 = createUser(1, "Alice Johnson", "alice@example.com");
let admin1 = createAdmin(2, "Bob Admin", "bob@example.com", ["read", "write"]);

console.log("User login:", user1.login());
console.log("User profile:", user1.getProfile());

console.log("Admin login:", admin1.login());
console.log("Adding permission:", admin1.addPermission("delete"));
console.log("Has write permission:", admin1.hasPermission("write"));
console.log("Admin profile:", admin1.getProfile());

// Check inheritance
console.log("User toString:", user1.toString());
console.log("Admin toString:", admin1.toString());

console.log("User is BaseEntity:", BaseEntity.isPrototypeOf(user1)); // true
console.log("Admin is UserPrototype:", UserPrototype.isPrototypeOf(admin1)); // true
console.log("Admin is BaseEntity:", BaseEntity.isPrototypeOf(admin1)); // true
```

## 🎯 Real-World Examples

### Example 1: Plugin System with Prototypes

```javascript
console.log("=== PLUGIN SYSTEM WITH PROTOTYPES ===");

// Base Plugin prototype
let BasePlugin = {
  init: function (name, version) {
    this.name = name;
    this.version = version;
    this.enabled = false;
    this.dependencies = [];
    this.hooks = {};
    return this;
  },

  enable: function () {
    if (this.checkDependencies()) {
      this.enabled = true;
      this.onEnable();
      return `Plugin '${this.name}' enabled successfully.`;
    } else {
      return `Plugin '${this.name}' cannot be enabled. Missing dependencies.`;
    }
  },

  disable: function () {
    this.enabled = false;
    this.onDisable();
    return `Plugin '${this.name}' disabled.`;
  },

  checkDependencies: function () {
    // Simplified dependency check
    return this.dependencies.every((dep) => PluginManager.isEnabled(dep));
  },

  addHook: function (event, callback) {
    if (!this.hooks[event]) {
      this.hooks[event] = [];
    }
    this.hooks[event].push(callback);
  },

  triggerHook: function (event, data) {
    if (this.hooks[event]) {
      this.hooks[event].forEach((callback) => callback(data));
    }
  },

  onEnable: function () {
    console.log(`${this.name} plugin enabled.`);
  },

  onDisable: function () {
    console.log(`${this.name} plugin disabled.`);
  },

  getInfo: function () {
    return {
      name: this.name,
      version: this.version,
      enabled: this.enabled,
      dependencies: [...this.dependencies],
    };
  },
};

// Authentication Plugin
let AuthPlugin = Object.create(BasePlugin);
AuthPlugin.init = function (name, version) {
  BasePlugin.init.call(this, name, version);
  this.users = new Map();
  this.sessions = new Map();
  return this;
};

AuthPlugin.register = function (username, password) {
  if (this.users.has(username)) {
    return { success: false, message: "User already exists" };
  }

  this.users.set(username, {
    password: password, // In real app, hash this!
    createdAt: new Date(),
    loginCount: 0,
  });

  return { success: true, message: "User registered successfully" };
};

AuthPlugin.login = function (username, password) {
  let user = this.users.get(username);
  if (!user || user.password !== password) {
    return { success: false, message: "Invalid credentials" };
  }

  let sessionId = Math.random().toString(36).substr(2, 9);
  this.sessions.set(sessionId, {
    username: username,
    loginTime: new Date(),
  });

  user.loginCount++;
  this.triggerHook("user_login", { username, sessionId });

  return { success: true, sessionId: sessionId };
};

AuthPlugin.logout = function (sessionId) {
  let session = this.sessions.get(sessionId);
  if (session) {
    this.sessions.delete(sessionId);
    this.triggerHook("user_logout", { username: session.username });
    return { success: true, message: "Logged out successfully" };
  }
  return { success: false, message: "Invalid session" };
};

AuthPlugin.isAuthenticated = function (sessionId) {
  return this.sessions.has(sessionId);
};

// Logging Plugin
let LoggingPlugin = Object.create(BasePlugin);
LoggingPlugin.init = function (name, version) {
  BasePlugin.init.call(this, name, version);
  this.logs = [];
  this.maxLogs = 1000;
  return this;
};

LoggingPlugin.log = function (level, message, data = {}) {
  let logEntry = {
    timestamp: new Date(),
    level: level,
    message: message,
    data: data,
  };

  this.logs.push(logEntry);

  // Keep only last maxLogs entries
  if (this.logs.length > this.maxLogs) {
    this.logs = this.logs.slice(-this.maxLogs);
  }

  console.log(`[${level.toUpperCase()}] ${message}`, data);
  this.triggerHook("log_entry", logEntry);
};

LoggingPlugin.getLogs = function (level = null) {
  if (level) {
    return this.logs.filter((log) => log.level === level);
  }
  return [...this.logs];
};

LoggingPlugin.clearLogs = function () {
  this.logs = [];
  return "Logs cleared";
};

LoggingPlugin.onEnable = function () {
  BasePlugin.onEnable.call(this);
  this.log("info", "Logging plugin enabled");
};

// Plugin Manager
let PluginManager = {
  plugins: new Map(),

  register: function (plugin) {
    this.plugins.set(plugin.name, plugin);
    return `Plugin '${plugin.name}' registered.`;
  },

  enable: function (pluginName) {
    let plugin = this.plugins.get(pluginName);
    if (plugin) {
      return plugin.enable();
    }
    return `Plugin '${pluginName}' not found.`;
  },

  disable: function (pluginName) {
    let plugin = this.plugins.get(pluginName);
    if (plugin) {
      return plugin.disable();
    }
    return `Plugin '${pluginName}' not found.`;
  },

  isEnabled: function (pluginName) {
    let plugin = this.plugins.get(pluginName);
    return plugin ? plugin.enabled : false;
  },

  getPlugin: function (pluginName) {
    return this.plugins.get(pluginName);
  },

  listPlugins: function () {
    return Array.from(this.plugins.values()).map((plugin) => plugin.getInfo());
  },
};

// Create and test plugins
let authPlugin = Object.create(AuthPlugin).init("Authentication", "1.0.0");
let loggingPlugin = Object.create(LoggingPlugin).init("Logging", "1.2.0");

// Set up hooks between plugins
authPlugin.addHook("user_login", (data) => {
  let logger = PluginManager.getPlugin("Logging");
  if (logger && logger.enabled) {
    logger.log("info", "User logged in", data);
  }
});

authPlugin.addHook("user_logout", (data) => {
  let logger = PluginManager.getPlugin("Logging");
  if (logger && logger.enabled) {
    logger.log("info", "User logged out", data);
  }
});

// Register and enable plugins
console.log(PluginManager.register(loggingPlugin));
console.log(PluginManager.register(authPlugin));

console.log(PluginManager.enable("Logging"));
console.log(PluginManager.enable("Authentication"));

// Test the plugin system
console.log("Plugin list:", PluginManager.listPlugins());

console.log("Registering user:", authPlugin.register("alice", "password123"));
console.log("Login attempt:", authPlugin.login("alice", "password123"));
console.log("Invalid login:", authPlugin.login("alice", "wrongpassword"));

let loginResult = authPlugin.login("alice", "password123");
if (loginResult.success) {
  console.log("Logout:", authPlugin.logout(loginResult.sessionId));
}

console.log("Recent logs:", loggingPlugin.getLogs());
```

### Example 2: Game Engine with Prototype Inheritance

```javascript
console.log("=== GAME ENGINE WITH PROTOTYPES ===");

// Base GameObject prototype
let GameObject = {
  init: function (x, y) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.x = x || 0;
    this.y = y || 0;
    this.width = 32;
    this.height = 32;
    this.visible = true;
    this.active = true;
    this.components = new Map();
    return this;
  },

  update: function (deltaTime) {
    // Override in subclasses
    for (let component of this.components.values()) {
      if (component.update) {
        component.update(deltaTime);
      }
    }
  },

  render: function (context) {
    if (!this.visible) return;

    // Basic rendering (override in subclasses)
    context.fillStyle = this.color || "red";
    context.fillRect(this.x, this.y, this.width, this.height);

    for (let component of this.components.values()) {
      if (component.render) {
        component.render(context);
      }
    }
  },

  addComponent: function (name, component) {
    component.gameObject = this;
    this.components.set(name, component);
    if (component.init) {
      component.init();
    }
  },

  getComponent: function (name) {
    return this.components.get(name);
  },

  removeComponent: function (name) {
    let component = this.components.get(name);
    if (component && component.destroy) {
      component.destroy();
    }
    return this.components.delete(name);
  },

  getBounds: function () {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height,
    };
  },

  collidesWith: function (other) {
    let a = this.getBounds();
    let b = other.getBounds();

    return !(
      a.right < b.left ||
      a.left > b.right ||
      a.bottom < b.top ||
      a.top > b.bottom
    );
  },

  destroy: function () {
    this.active = false;
    for (let component of this.components.values()) {
      if (component.destroy) {
        component.destroy();
      }
    }
    this.components.clear();
  },
};

// Player prototype
let Player = Object.create(GameObject);
Player.init = function (x, y) {
  GameObject.init.call(this, x, y);
  this.color = "blue";
  this.speed = 200;
  this.health = 100;
  this.maxHealth = 100;
  this.score = 0;
  this.lives = 3;
  return this;
};

Player.update = function (deltaTime) {
  GameObject.update.call(this, deltaTime);

  // Handle input (simplified)
  if (this.inputComponent) {
    this.inputComponent.update(deltaTime);
  }

  // Update animation
  if (this.animationComponent) {
    this.animationComponent.update(deltaTime);
  }
};

Player.takeDamage = function (amount) {
  this.health -= amount;
  if (this.health <= 0) {
    this.health = 0;
    this.die();
  }
  return this.health;
};

Player.heal = function (amount) {
  this.health = Math.min(this.health + amount, this.maxHealth);
  return this.health;
};

Player.addScore = function (points) {
  this.score += points;
  return this.score;
};

Player.die = function () {
  this.lives--;
  if (this.lives > 0) {
    this.health = this.maxHealth;
    this.respawn();
  } else {
    this.gameOver();
  }
};

Player.respawn = function () {
  this.x = 100;
  this.y = 100;
  console.log(`Player respawned. Lives remaining: ${this.lives}`);
};

Player.gameOver = function () {
  console.log(`Game Over! Final Score: ${this.score}`);
  this.active = false;
};

// Enemy prototype
let Enemy = Object.create(GameObject);
Enemy.init = function (x, y, type) {
  GameObject.init.call(this, x, y);
  this.type = type || "basic";
  this.color = "red";
  this.speed = 100;
  this.health = 50;
  this.damage = 10;
  this.scoreValue = 100;
  this.lastAttackTime = 0;
  this.attackCooldown = 1000; // 1 second
  return this;
};

Enemy.update = function (deltaTime) {
  GameObject.update.call(this, deltaTime);

  // Basic AI - move towards player
  if (this.target) {
    this.moveTowardsTarget(deltaTime);
  }

  // Attack if close to target
  if (this.canAttack()) {
    this.attack();
  }
};

Enemy.setTarget = function (target) {
  this.target = target;
};

Enemy.moveTowardsTarget = function (deltaTime) {
  if (!this.target) return;

  let dx = this.target.x - this.x;
  let dy = this.target.y - this.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0) {
    this.x += (dx / distance) * this.speed * (deltaTime / 1000);
    this.y += (dy / distance) * this.speed * (deltaTime / 1000);
  }
};

Enemy.canAttack = function () {
  if (!this.target) return false;

  let now = Date.now();
  if (now - this.lastAttackTime < this.attackCooldown) return false;

  return this.collidesWith(this.target);
};

Enemy.attack = function () {
  if (this.target && this.target.takeDamage) {
    this.target.takeDamage(this.damage);
    this.lastAttackTime = Date.now();
    console.log(`Enemy attacked for ${this.damage} damage!`);
  }
};

Enemy.takeDamage = function (amount) {
  this.health -= amount;
  if (this.health <= 0) {
    this.die();
  }
  return this.health;
};

Enemy.die = function () {
  console.log(`Enemy defeated! Score: ${this.scoreValue}`);
  if (this.target && this.target.addScore) {
    this.target.addScore(this.scoreValue);
  }
  this.destroy();
};

// Projectile prototype
let Projectile = Object.create(GameObject);
Projectile.init = function (x, y, direction, speed, damage) {
  GameObject.init.call(this, x, y);
  this.width = 8;
  this.height = 8;
  this.color = "yellow";
  this.direction = direction; // { x, y }
  this.speed = speed || 400;
  this.damage = damage || 25;
  this.lifetime = 3000; // 3 seconds
  this.createdAt = Date.now();
  return this;
};

Projectile.update = function (deltaTime) {
  GameObject.update.call(this, deltaTime);

  // Move in direction
  this.x += this.direction.x * this.speed * (deltaTime / 1000);
  this.y += this.direction.y * this.speed * (deltaTime / 1000);

  // Check lifetime
  if (Date.now() - this.createdAt > this.lifetime) {
    this.destroy();
  }
};

Projectile.onCollision = function (other) {
  if (other.takeDamage) {
    other.takeDamage(this.damage);
    this.destroy();
  }
};

// Component system
let HealthComponent = {
  init: function () {
    this.maxHealth = this.gameObject.health || 100;
    this.regenRate = 5; // Health per second
    this.lastRegenTime = Date.now();
  },

  update: function (deltaTime) {
    // Regenerate health over time
    let now = Date.now();
    if (now - this.lastRegenTime > 1000) {
      // Every second
      if (this.gameObject.health < this.maxHealth) {
        this.gameObject.heal(this.regenRate);
        this.lastRegenTime = now;
      }
    }
  },
};

let MovementComponent = {
  init: function () {
    this.velocity = { x: 0, y: 0 };
    this.friction = 0.8;
  },

  update: function (deltaTime) {
    // Apply velocity
    this.gameObject.x += this.velocity.x * (deltaTime / 1000);
    this.gameObject.y += this.velocity.y * (deltaTime / 1000);

    // Apply friction
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
  },

  addForce: function (fx, fy) {
    this.velocity.x += fx;
    this.velocity.y += fy;
  },
};

// Factory functions
function createPlayer(x, y) {
  let player = Object.create(Player).init(x, y);

  // Add components
  player.addComponent("health", Object.create(HealthComponent));
  player.addComponent("movement", Object.create(MovementComponent));

  return player;
}

function createEnemy(x, y, type) {
  return Object.create(Enemy).init(x, y, type);
}

function createProjectile(x, y, direction, speed, damage) {
  return Object.create(Projectile).init(x, y, direction, speed, damage);
}

// Game simulation
console.log("Creating game objects:");

let player = createPlayer(100, 100);
let enemy1 = createEnemy(200, 200, "basic");
let enemy2 = createEnemy(300, 150, "fast");

// Set targets
enemy1.setTarget(player);
enemy2.setTarget(player);

console.log("Player created:", player.id);
console.log("Enemy 1 created:", enemy1.id);
console.log("Enemy 2 created:", enemy2.id);

// Simulate game loop
let gameObjects = [player, enemy1, enemy2];
let deltaTime = 16; // 60 FPS

console.log("Simulating game updates:");

for (let frame = 0; frame < 10; frame++) {
  console.log(`\n--- Frame ${frame + 1} ---`);

  // Update all objects
  gameObjects.forEach((obj) => {
    if (obj.active) {
      obj.update(deltaTime);
    }
  });

  // Check collisions
  for (let i = 0; i < gameObjects.length; i++) {
    for (let j = i + 1; j < gameObjects.length; j++) {
      let objA = gameObjects[i];
      let objB = gameObjects[j];

      if (objA.active && objB.active && objA.collidesWith(objB)) {
        console.log(
          `Collision between ${objA.constructor.name || "GameObject"} and ${
            objB.constructor.name || "GameObject"
          }`
        );
      }
    }
  }

  // Remove inactive objects
  gameObjects = gameObjects.filter((obj) => obj.active);

  console.log(`Player health: ${player.health}, Score: ${player.score}`);

  if (!player.active) {
    console.log("Game Over!");
    break;
  }
}

console.log("Game simulation complete!");
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Shape Hierarchy

```javascript
console.log("=== PROTOTYPE EXERCISE 1: SHAPE HIERARCHY ===");

// Create a Shape base prototype with area and perimeter methods
let Shape = {
  init: function (color) {
    this.color = color || "black";
    return this;
  },

  getArea: function () {
    throw new Error("getArea must be implemented by subclass");
  },

  getPerimeter: function () {
    throw new Error("getPerimeter must be implemented by subclass");
  },

  describe: function () {
    return `A ${this.color} ${
      this.constructor.name || "shape"
    } with area ${this.getArea()} and perimeter ${this.getPerimeter()}`;
  },
};

// TODO: Create Rectangle prototype that inherits from Shape
let Rectangle = Object.create(Shape);
Rectangle.init = function (width, height, color) {
  Shape.init.call(this, color);
  this.width = width;
  this.height = height;
  return this;
};

Rectangle.getArea = function () {
  return this.width * this.height;
};

Rectangle.getPerimeter = function () {
  return 2 * (this.width + this.height);
};

// TODO: Create Circle prototype that inherits from Shape
let Circle = Object.create(Shape);
Circle.init = function (radius, color) {
  Shape.init.call(this, color);
  this.radius = radius;
  return this;
};

Circle.getArea = function () {
  return Math.PI * this.radius * this.radius;
};

Circle.getPerimeter = function () {
  return 2 * Math.PI * this.radius;
};

// Test the shapes
let rectangle = Object.create(Rectangle).init(5, 3, "red");
let circle = Object.create(Circle).init(4, "blue");

console.log("Rectangle:", rectangle.describe());
console.log("Circle:", circle.describe());
```

### Exercise 2: Task Management System

```javascript
console.log("=== PROTOTYPE EXERCISE 2: TASK MANAGEMENT ===");

// Base Task prototype
let Task = {
  init: function (title, description) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.description = description;
    this.status = "pending";
    this.createdAt = new Date();
    this.updatedAt = new Date();
    return this;
  },

  complete: function () {
    this.status = "completed";
    this.completedAt = new Date();
    this.updatedAt = new Date();
    return this;
  },

  getInfo: function () {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      completedAt: this.completedAt,
    };
  },
};

// TODO: Create different task types that inherit from Task
// - UrgentTask (has deadline and priority)
// - RecurringTask (has interval and next occurrence)
// - TeamTask (has assignees and team lead)

// Test your implementations here
```

## 📚 Key Takeaways

1. **Prototypes** - Every object has a prototype from which it inherits
2. **Prototype chain** - JavaScript looks up the chain to find properties/methods
3. **Constructor functions** - Traditional way to create objects with shared methods
4. **Object.create()** - Modern way to create objects with specific prototypes
5. **instanceof** - Checks if object is instance of constructor/prototype
6. **Mixins** - Way to share functionality between different prototypes
7. **Prototype pollution** - Be careful when modifying built-in prototypes

## ➡️ What's Next?

Fantastic work mastering JavaScript prototypes! 🧬 You now understand how JavaScript's unique inheritance system works, which is fundamental to understanding the language.

Next, you'll dive deep into **The `this` Keyword** - one of JavaScript's most confusing concepts that determines the context in which functions execute.

Your next lesson: **27. The `this` Keyword - Context and Binding**

## 🔗 Quick Reference

```javascript
// Prototype relationships
obj.__proto__ === Constructor.prototype;
Object.getPrototypeOf(obj) === Constructor.prototype;

// Constructor function pattern
function Constructor(param) {
  this.property = param;
}
Constructor.prototype.method = function () {};

// Object.create pattern
let proto = { method: function () {} };
let obj = Object.create(proto);

// Inheritance
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

// Check inheritance
obj instanceof Constructor;
Constructor.prototype.isPrototypeOf(obj);
```

You're mastering JavaScript's core concepts! 🚀
