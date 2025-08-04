# Classes with Types - Object-Oriented TypeScript 🏛️

**Master Type-Safe OOP!** TypeScript enhances JavaScript classes with static typing, access modifiers, and advanced OOP features. Learn to build robust, maintainable object-oriented applications with full type safety.

## 🎯 Learning Objectives

- Understand TypeScript class syntax and type annotations
- Master access modifiers (public, private, protected)
- Use parameter properties and readonly modifiers
- Implement abstract classes and static members
- Build type-safe inheritance hierarchies

---

## 🤔 Why TypeScript Classes Matter

TypeScript classes provide structure, encapsulation, and type safety for complex applications.

### The Problem: Untyped JavaScript Classes

```javascript
// JavaScript class - no type safety
class User {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.isActive = true;
  }

  updateEmail(newEmail) {
    this.email = newEmail; // Could be any type!
  }

  getInfo() {
    return `${this.name} (${this.email})`;
  }
}

const user = new User("Alice", "alice@email.com", 25);
user.updateEmail(123); // Oops! Number instead of string
user.age = "twenty-five"; // Oops! String instead of number
```

### The Solution: TypeScript Classes

```typescript
// TypeScript class - full type safety
class User {
  public readonly id: number;
  public name: string;
  private email: string;
  protected age: number;
  private isActive: boolean = true;

  constructor(name: string, email: string, age: number) {
    this.id = Date.now();
    this.name = name;
    this.email = email;
    this.age = age;
  }

  updateEmail(newEmail: string): void {
    this.email = newEmail; // Type-safe!
  }

  getInfo(): string {
    return `${this.name} (${this.email})`;
  }

  getAge(): number {
    return this.age;
  }
}

const user = new User("Alice", "alice@email.com", 25);
// user.updateEmail(123); // ❌ Error: number not assignable to string
// user.age = "twenty-five"; // ❌ Error: protected property
```

---

## 🏗️ Class Basics and Access Modifiers

### Access Modifiers:

```typescript
class BankAccount {
  public readonly accountNumber: string; // Accessible everywhere
  private balance: number; // Only within this class
  protected accountType: string; // This class and subclasses

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.accountType = "checking";
  }

  // Public method
  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  // Public method
  public withdraw(amount: number): boolean {
    if (this.canWithdraw(amount)) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  // Private method
  private canWithdraw(amount: number): boolean {
    return amount > 0 && amount <= this.balance;
  }

  // Protected method
  protected getAccountType(): string {
    return this.accountType;
  }

  // Public getter
  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount("123456", 1000);
account.deposit(500); // ✅ Public method
console.log(account.getBalance()); // ✅ Public method
// account.balance;             // ❌ Error: private property
// account.canWithdraw(100);    // ❌ Error: private method
```

### Parameter Properties:

```typescript
// Shorthand syntax for constructor parameters
class Product {
  constructor(
    public readonly id: number,
    public name: string,
    private price: number,
    protected category: string
  ) {
    // Properties are automatically created and assigned
  }

  getPrice(): number {
    return this.price;
  }

  updatePrice(newPrice: number): void {
    if (newPrice > 0) {
      this.price = newPrice;
    }
  }
}

// Equivalent to:
class ProductLongForm {
  public readonly id: number;
  public name: string;
  private price: number;
  protected category: string;

  constructor(id: number, name: string, price: number, category: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }
}
```

---

## 🎯 Advanced Class Features

### Getters and Setters:

```typescript
class Temperature {
  private _celsius: number = 0;

  constructor(celsius: number) {
    this.celsius = celsius;
  }

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature cannot be below absolute zero");
    }
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(value: number) {
    this.celsius = ((value - 32) * 5) / 9;
  }

  get kelvin(): number {
    return this._celsius + 273.15;
  }

  set kelvin(value: number) {
    this.celsius = value - 273.15;
  }
}

const temp = new Temperature(25);
console.log(temp.celsius); // 25
console.log(temp.fahrenheit); // 77
console.log(temp.kelvin); // 298.15

temp.fahrenheit = 100; // Sets celsius to ~37.78
console.log(temp.celsius); // 37.777777777777786
```

### Static Members:

```typescript
class MathUtils {
  static readonly PI = 3.14159;
  private static instanceCount = 0;

  constructor() {
    MathUtils.instanceCount++;
  }

  static area(radius: number): number {
    return MathUtils.PI * radius * radius;
  }

  static circumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }

  static getInstanceCount(): number {
    return MathUtils.instanceCount;
  }

  // Instance method
  calculateArea(radius: number): number {
    return MathUtils.area(radius);
  }
}

// Static members called on class
console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.area(5)); // 78.53975
console.log(MathUtils.getInstanceCount()); // 0

// Instance methods called on objects
const math1 = new MathUtils();
const math2 = new MathUtils();
console.log(MathUtils.getInstanceCount()); // 2
console.log(math1.calculateArea(3)); // 28.274309999999996
```

### Abstract Classes:

```typescript
abstract class Shape {
  protected color: string;

  constructor(color: string) {
    this.color = color;
  }

  // Abstract method - must be implemented by subclasses
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // Concrete method - inherited by subclasses
  getColor(): string {
    return this.color;
  }

  // Concrete method with implementation
  describe(): string {
    return `A ${this.color} shape with area ${this.getArea()}`;
  }
}

class Circle extends Shape {
  constructor(color: string, private radius: number) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  getRadius(): number {
    return this.radius;
  }
}

class Rectangle extends Shape {
  constructor(color: string, private width: number, private height: number) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }

  getDimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }
}

// const shape = new Shape("red"); // ❌ Error: Cannot instantiate abstract class
const circle = new Circle("blue", 5);
const rectangle = new Rectangle("green", 4, 6);

console.log(circle.describe()); // "A blue shape with area 78.53981633974483"
console.log(rectangle.describe()); // "A green shape with area 24"
```

---

## 🎮 Hands-On Exercise

### Build a Complete Task Management System:

```typescript
// Your task: Create a comprehensive task management system

// 1. Create abstract base class
abstract class Task {
  // Implement: id, title, description, createdAt, status, priority
}

// 2. Create specific task types
class PersonalTask extends Task {
  // Add: category, reminder
}

class WorkTask extends Task {
  // Add: assignee, deadline, project
}

// 3. Create task manager
class TaskManager {
  // Implement: addTask, removeTask, updateTask, getTasks, getStats
}

// 4. Create user system
class User {
  // Implement: user management with tasks
}

// Test your implementation
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Complete Task Management System

// Enums for type safety
enum TaskStatus {
  Todo = "todo",
  InProgress = "in-progress",
  Completed = "completed",
  Cancelled = "cancelled",
}

enum TaskPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  Critical = 4,
}

enum PersonalCategory {
  Health = "health",
  Finance = "finance",
  Learning = "learning",
  Social = "social",
  Hobby = "hobby",
}

// Interfaces
interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
  assignee?: string;
}

// Abstract base Task class
abstract class Task {
  public readonly id: string;
  public readonly createdAt: Date;
  protected _updatedAt: Date;

  constructor(
    public title: string,
    public description: string,
    protected _status: TaskStatus = TaskStatus.Todo,
    protected _priority: TaskPriority = TaskPriority.Medium
  ) {
    this.id = this.generateId();
    this.createdAt = new Date();
    this._updatedAt = new Date();
  }

  // Abstract methods - must be implemented by subclasses
  abstract getType(): string;
  abstract getDisplayInfo(): string;
  abstract clone(): Task;

  // Getters and setters
  get status(): TaskStatus {
    return this._status;
  }

  set status(newStatus: TaskStatus) {
    this._status = newStatus;
    this._updatedAt = new Date();
  }

  get priority(): TaskPriority {
    return this._priority;
  }

  set priority(newPriority: TaskPriority) {
    this._priority = newPriority;
    this._updatedAt = new Date();
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Public methods
  updateTitle(newTitle: string): void {
    this.title = newTitle;
    this._updatedAt = new Date();
  }

  updateDescription(newDescription: string): void {
    this.description = newDescription;
    this._updatedAt = new Date();
  }

  markAsCompleted(): void {
    this._status = TaskStatus.Completed;
    this._updatedAt = new Date();
  }

  markAsInProgress(): void {
    this._status = TaskStatus.InProgress;
    this._updatedAt = new Date();
  }

  isCompleted(): boolean {
    return this._status === TaskStatus.Completed;
  }

  isOverdue(): boolean {
    // Override in subclasses if they have deadlines
    return false;
  }

  getPriorityText(): string {
    return TaskPriority[this._priority];
  }

  // Private helper method
  private generateId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Common display method
  getBasicInfo(): string {
    return `[${this.getPriorityText()}] ${this.title} - ${this._status}`;
  }
}

// Personal Task implementation
class PersonalTask extends Task {
  private reminder?: Date;

  constructor(
    title: string,
    description: string,
    private category: PersonalCategory,
    status?: TaskStatus,
    priority?: TaskPriority,
    reminderDate?: Date
  ) {
    super(title, description, status, priority);
    this.reminder = reminderDate;
  }

  getType(): string {
    return "Personal";
  }

  getCategory(): PersonalCategory {
    return this.category;
  }

  setReminder(date: Date): void {
    this.reminder = date;
    this._updatedAt = new Date();
  }

  getReminder(): Date | undefined {
    return this.reminder;
  }

  hasReminder(): boolean {
    return this.reminder !== undefined;
  }

  isReminderDue(): boolean {
    return this.reminder ? new Date() >= this.reminder : false;
  }

  getDisplayInfo(): string {
    const reminderText = this.reminder
      ? ` | Reminder: ${this.reminder.toLocaleDateString()}`
      : "";
    return `${this.getBasicInfo()} | Category: ${this.category}${reminderText}`;
  }

  clone(): PersonalTask {
    return new PersonalTask(
      this.title,
      this.description,
      this.category,
      this._status,
      this._priority,
      this.reminder
    );
  }
}

// Work Task implementation
class WorkTask extends Task {
  private deadline?: Date;

  constructor(
    title: string,
    description: string,
    private assignee: string,
    private project: string,
    status?: TaskStatus,
    priority?: TaskPriority,
    deadlineDate?: Date
  ) {
    super(title, description, status, priority);
    this.deadline = deadlineDate;
  }

  getType(): string {
    return "Work";
  }

  getAssignee(): string {
    return this.assignee;
  }

  setAssignee(newAssignee: string): void {
    this.assignee = newAssignee;
    this._updatedAt = new Date();
  }

  getProject(): string {
    return this.project;
  }

  setProject(newProject: string): void {
    this.project = newProject;
    this._updatedAt = new Date();
  }

  getDeadline(): Date | undefined {
    return this.deadline;
  }

  setDeadline(date: Date): void {
    this.deadline = date;
    this._updatedAt = new Date();
  }

  isOverdue(): boolean {
    return this.deadline
      ? new Date() > this.deadline && !this.isCompleted()
      : false;
  }

  getDaysUntilDeadline(): number | null {
    if (!this.deadline) return null;
    const diffTime = this.deadline.getTime() - new Date().getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getDisplayInfo(): string {
    const deadlineText = this.deadline
      ? ` | Deadline: ${this.deadline.toLocaleDateString()}`
      : "";
    const overdueText = this.isOverdue() ? " [OVERDUE]" : "";
    return `${this.getBasicInfo()} | Assignee: ${this.assignee} | Project: ${
      this.project
    }${deadlineText}${overdueText}`;
  }

  clone(): WorkTask {
    return new WorkTask(
      this.title,
      this.description,
      this.assignee,
      this.project,
      this._status,
      this._priority,
      this.deadline
    );
  }
}

// Task Manager class
class TaskManager {
  private tasks: Map<string, Task> = new Map();
  private static instance: TaskManager;

  // Singleton pattern
  static getInstance(): TaskManager {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  addTask(task: Task): void {
    this.tasks.set(task.id, task);
    console.log(`✅ Task added: ${task.title}`);
  }

  removeTask(taskId: string): boolean {
    const deleted = this.tasks.delete(taskId);
    if (deleted) {
      console.log(`🗑️ Task removed: ${taskId}`);
    }
    return deleted;
  }

  getTask(taskId: string): Task | undefined {
    return this.tasks.get(taskId);
  }

  updateTask(
    taskId: string,
    updates: Partial<{
      title: string;
      description: string;
      status: TaskStatus;
      priority: TaskPriority;
    }>
  ): boolean {
    const task = this.tasks.get(taskId);
    if (!task) return false;

    if (updates.title) task.updateTitle(updates.title);
    if (updates.description) task.updateDescription(updates.description);
    if (updates.status) task.status = updates.status;
    if (updates.priority) task.priority = updates.priority;

    console.log(`📝 Task updated: ${task.title}`);
    return true;
  }

  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getTasksByFilter(filter: TaskFilter): Task[] {
    return this.getAllTasks().filter((task) => {
      if (filter.status && task.status !== filter.status) return false;
      if (filter.priority && task.priority !== filter.priority) return false;

      if (filter.category && task instanceof PersonalTask) {
        if (task.getCategory() !== filter.category) return false;
      }

      if (filter.assignee && task instanceof WorkTask) {
        if (task.getAssignee() !== filter.assignee) return false;
      }

      return true;
    });
  }

  getTaskStats(): TaskStats {
    const tasks = this.getAllTasks();
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === TaskStatus.Completed).length,
      inProgress: tasks.filter((t) => t.status === TaskStatus.InProgress)
        .length,
      overdue: tasks.filter((t) => t.isOverdue()).length,
    };
  }

  getTasksByType<T extends Task>(type: new (...args: any[]) => T): T[] {
    return this.getAllTasks().filter((task) => task instanceof type) as T[];
  }

  getOverdueTasks(): Task[] {
    return this.getAllTasks().filter((task) => task.isOverdue());
  }

  getTasksByPriority(priority: TaskPriority): Task[] {
    return this.getAllTasks().filter((task) => task.priority === priority);
  }

  clearCompletedTasks(): number {
    const completedTasks = this.getAllTasks().filter((task) =>
      task.isCompleted()
    );
    completedTasks.forEach((task) => this.removeTask(task.id));
    return completedTasks.length;
  }

  exportTasks(): string {
    const tasks = this.getAllTasks();
    return JSON.stringify(
      tasks.map((task) => ({
        id: task.id,
        type: task.getType(),
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      })),
      null,
      2
    );
  }
}

// User class with task management
class User {
  private taskManager: TaskManager;

  constructor(
    public readonly id: string,
    public name: string,
    public email: string
  ) {
    this.taskManager = TaskManager.getInstance();
  }

  createPersonalTask(
    title: string,
    description: string,
    category: PersonalCategory,
    priority?: TaskPriority,
    reminder?: Date
  ): PersonalTask {
    const task = new PersonalTask(
      title,
      description,
      category,
      TaskStatus.Todo,
      priority,
      reminder
    );
    this.taskManager.addTask(task);
    return task;
  }

  createWorkTask(
    title: string,
    description: string,
    project: string,
    assignee: string = this.name,
    priority?: TaskPriority,
    deadline?: Date
  ): WorkTask {
    const task = new WorkTask(
      title,
      description,
      assignee,
      project,
      TaskStatus.Todo,
      priority,
      deadline
    );
    this.taskManager.addTask(task);
    return task;
  }

  getMyTasks(): Task[] {
    return this.taskManager.getAllTasks().filter((task) => {
      if (task instanceof WorkTask) {
        return task.getAssignee() === this.name;
      }
      return true; // Personal tasks belong to the user
    });
  }

  getMyStats(): TaskStats {
    const myTasks = this.getMyTasks();
    return {
      total: myTasks.length,
      completed: myTasks.filter((t) => t.status === TaskStatus.Completed)
        .length,
      inProgress: myTasks.filter((t) => t.status === TaskStatus.InProgress)
        .length,
      overdue: myTasks.filter((t) => t.isOverdue()).length,
    };
  }

  completeTask(taskId: string): boolean {
    const task = this.taskManager.getTask(taskId);
    if (task && this.getMyTasks().includes(task)) {
      task.markAsCompleted();
      console.log(`🎉 ${this.name} completed task: ${task.title}`);
      return true;
    }
    return false;
  }

  displayTasks(): void {
    const myTasks = this.getMyTasks();
    console.log(`\n📋 ${this.name}'s Tasks:`);
    console.log("=".repeat(50));

    if (myTasks.length === 0) {
      console.log("No tasks found.");
      return;
    }

    myTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.getDisplayInfo()}`);
    });

    const stats = this.getMyStats();
    console.log("\n📊 Stats:");
    console.log(
      `Total: ${stats.total} | Completed: ${stats.completed} | In Progress: ${stats.inProgress} | Overdue: ${stats.overdue}`
    );
  }
}

// Demo and testing
console.log("=== Task Management System Demo ===\n");

// Create users
const alice = new User("u1", "Alice", "alice@example.com");
const bob = new User("u2", "Bob", "bob@example.com");

// Create personal tasks
alice.createPersonalTask(
  "Morning Workout",
  "30 minutes cardio exercise",
  PersonalCategory.Health,
  TaskPriority.High,
  new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
);

alice.createPersonalTask(
  "Learn TypeScript",
  "Complete advanced TypeScript course",
  PersonalCategory.Learning,
  TaskPriority.Medium
);

// Create work tasks
const project1Task = alice.createWorkTask(
  "Implement User Authentication",
  "Add login/logout functionality",
  "Web App Project",
  "Alice",
  TaskPriority.Critical,
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next week
);

bob.createWorkTask(
  "Code Review",
  "Review Alice's authentication implementation",
  "Web App Project",
  "Bob",
  TaskPriority.High,
  new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
);

bob.createWorkTask(
  "Database Migration",
  "Update user table schema",
  "Web App Project",
  "Bob",
  TaskPriority.Medium,
  new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // Overdue
);

// Display initial tasks
alice.displayTasks();
bob.displayTasks();

// Complete some tasks
alice.completeTask(project1Task.id);

// Update task status
const taskManager = TaskManager.getInstance();
taskManager.updateTask(project1Task.id, {
  status: TaskStatus.Completed,
  priority: TaskPriority.Low,
});

// Show updated stats
console.log("\n📈 Overall System Stats:");
const overallStats = taskManager.getTaskStats();
console.log(overallStats);

// Show overdue tasks
console.log("\n⚠️ Overdue Tasks:");
const overdueTasks = taskManager.getOverdueTasks();
overdueTasks.forEach((task) => {
  console.log(`- ${task.getDisplayInfo()}`);
});

// Filter tasks
console.log("\n🔍 High Priority Tasks:");
const highPriorityTasks = taskManager.getTasksByPriority(TaskPriority.High);
highPriorityTasks.forEach((task) => {
  console.log(`- ${task.getDisplayInfo()}`);
});

console.log("\n=== Demo Complete ===");
```

</details>

---

## 🎯 Key Takeaways

- **Access Modifiers**: Control visibility with public, private, protected
- **Parameter Properties**: Shorthand constructor syntax
- **Getters/Setters**: Controlled property access with validation
- **Static Members**: Class-level properties and methods
- **Abstract Classes**: Base classes that cannot be instantiated
- **Type Safety**: Full compile-time checking for OOP patterns

---

## 🚀 What's Next?

**Next Lesson**: `15-inheritance.md` - Advanced inheritance patterns, polymorphism, and complex OOP hierarchies!

---

_Remember: TypeScript classes provide structure and type safety for complex applications. Use access modifiers wisely and prefer composition over inheritance when possible!_ 🏛️
