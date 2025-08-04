# Inheritance and Polymorphism - Advanced OOP Patterns 🧬

**Master Advanced OOP!** Learn inheritance hierarchies, polymorphism, method overriding, and advanced TypeScript patterns for building scalable, maintainable object-oriented applications.

## 🎯 Learning Objectives

- Understand inheritance and polymorphism in TypeScript
- Master method overriding and super calls
- Implement polymorphic behavior with interfaces
- Use mixin patterns for multiple inheritance
- Build complex inheritance hierarchies

---

## 🤔 Why Inheritance and Polymorphism Matter

Inheritance enables code reuse and polymorphism allows objects of different types to be used interchangeably.

### Basic Inheritance:

```typescript
// Base class
class Animal {
  constructor(protected name: string, protected age: number) {}

  makeSound(): string {
    return "Some generic animal sound";
  }

  getInfo(): string {
    return `${this.name} is ${this.age} years old`;
  }

  sleep(): string {
    return `${this.name} is sleeping`;
  }
}

// Inheritance with method overriding
class Dog extends Animal {
  constructor(name: string, age: number, private breed: string) {
    super(name, age); // Call parent constructor
  }

  // Override parent method
  makeSound(): string {
    return "Woof! Woof!";
  }

  // Add new method specific to Dog
  fetch(): string {
    return `${this.name} is fetching the ball`;
  }

  // Override parent method with additional info
  getInfo(): string {
    return `${super.getInfo()} and is a ${this.breed}`;
  }
}

class Cat extends Animal {
  constructor(name: string, age: number, private isIndoor: boolean) {
    super(name, age);
  }

  makeSound(): string {
    return "Meow! Meow!";
  }

  climb(): string {
    return `${this.name} is climbing`;
  }

  getInfo(): string {
    const location = this.isIndoor ? "indoor" : "outdoor";
    return `${super.getInfo()} and is an ${location} cat`;
  }
}

// Polymorphism in action
const animals: Animal[] = [
  new Dog("Buddy", 3, "Golden Retriever"),
  new Cat("Whiskers", 2, true),
  new Animal("Generic", 1),
];

animals.forEach((animal) => {
  console.log(animal.getInfo());
  console.log(animal.makeSound());
  console.log(animal.sleep());
  console.log("---");
});
```

---

## 🎯 Advanced Inheritance Patterns

### Abstract Classes with Implementation Details:

```typescript
abstract class Vehicle {
  protected isRunning: boolean = false;

  constructor(
    protected brand: string,
    protected model: string,
    protected year: number
  ) {}

  // Abstract methods - must be implemented
  abstract start(): boolean;
  abstract stop(): boolean;
  abstract getMaxSpeed(): number;

  // Concrete methods with shared logic
  getInfo(): string {
    return `${this.year} ${this.brand} ${this.model}`;
  }

  isEngineRunning(): boolean {
    return this.isRunning;
  }

  // Template method pattern
  performMaintenance(): string[] {
    const tasks: string[] = [];
    tasks.push("Check fluids");
    tasks.push(...this.getSpecificMaintenanceTasks());
    tasks.push("Test safety systems");
    return tasks;
  }

  // Hook method for subclasses
  protected abstract getSpecificMaintenanceTasks(): string[];
}

class Car extends Vehicle {
  constructor(
    brand: string,
    model: string,
    year: number,
    private fuelType: "gasoline" | "diesel" | "electric" | "hybrid"
  ) {
    super(brand, model, year);
  }

  start(): boolean {
    if (!this.isRunning) {
      console.log(`Starting ${this.getInfo()}...`);
      this.isRunning = true;
      return true;
    }
    return false;
  }

  stop(): boolean {
    if (this.isRunning) {
      console.log(`Stopping ${this.getInfo()}...`);
      this.isRunning = false;
      return true;
    }
    return false;
  }

  getMaxSpeed(): number {
    return this.fuelType === "electric" ? 150 : 180;
  }

  protected getSpecificMaintenanceTasks(): string[] {
    const tasks = ["Check tires", "Inspect brakes"];
    if (this.fuelType === "electric") {
      tasks.push("Check battery", "Inspect charging port");
    } else {
      tasks.push("Change oil", "Replace air filter");
    }
    return tasks;
  }

  getFuelType(): string {
    return this.fuelType;
  }
}

class Motorcycle extends Vehicle {
  constructor(
    brand: string,
    model: string,
    year: number,
    private engineSize: number
  ) {
    super(brand, model, year);
  }

  start(): boolean {
    if (!this.isRunning) {
      console.log(`Kick-starting ${this.getInfo()}...`);
      this.isRunning = true;
      return true;
    }
    return false;
  }

  stop(): boolean {
    if (this.isRunning) {
      console.log(`Turning off ${this.getInfo()}...`);
      this.isRunning = false;
      return true;
    }
    return false;
  }

  getMaxSpeed(): number {
    return this.engineSize > 600 ? 200 : 120;
  }

  protected getSpecificMaintenanceTasks(): string[] {
    return [
      "Check chain tension",
      "Inspect suspension",
      "Clean air filter",
      "Check spark plugs",
    ];
  }

  getEngineSize(): number {
    return this.engineSize;
  }
}
```

---

## 🔄 Polymorphism with Interfaces

### Interface-Based Polymorphism:

```typescript
// Define contracts with interfaces
interface Flyable {
  fly(): string;
  getAltitude(): number;
  land(): string;
}

interface Swimmable {
  swim(): string;
  dive(depth: number): string;
  surface(): string;
}

interface Walkable {
  walk(): string;
  run(): string;
}

// Base class
abstract class Creature {
  constructor(protected name: string, protected species: string) {}

  abstract makeSound(): string;

  getInfo(): string {
    return `${this.name} is a ${this.species}`;
  }
}

// Multiple interface implementation
class Duck extends Creature implements Flyable, Swimmable, Walkable {
  private altitude: number = 0;
  private waterDepth: number = 0;

  constructor(name: string) {
    super(name, "Duck");
  }

  makeSound(): string {
    return "Quack!";
  }

  // Flyable implementation
  fly(): string {
    this.altitude = 100;
    return `${this.name} is flying at ${this.altitude} feet`;
  }

  getAltitude(): number {
    return this.altitude;
  }

  land(): string {
    this.altitude = 0;
    return `${this.name} has landed`;
  }

  // Swimmable implementation
  swim(): string {
    return `${this.name} is swimming on the surface`;
  }

  dive(depth: number): string {
    this.waterDepth = depth;
    return `${this.name} dives to ${depth} feet deep`;
  }

  surface(): string {
    this.waterDepth = 0;
    return `${this.name} surfaces from the water`;
  }

  // Walkable implementation
  walk(): string {
    return `${this.name} is waddling on land`;
  }

  run(): string {
    return `${this.name} is running with wings flapping`;
  }
}

class Eagle extends Creature implements Flyable {
  private altitude: number = 0;

  constructor(name: string) {
    super(name, "Eagle");
  }

  makeSound(): string {
    return "Screech!";
  }

  fly(): string {
    this.altitude = 1000;
    return `${this.name} soars high at ${this.altitude} feet`;
  }

  getAltitude(): number {
    return this.altitude;
  }

  land(): string {
    this.altitude = 0;
    return `${this.name} lands on a high perch`;
  }

  hunt(): string {
    return `${this.name} is hunting for prey`;
  }
}

class Fish extends Creature implements Swimmable {
  private waterDepth: number = 0;

  constructor(name: string, private species: string) {
    super(name, species);
  }

  makeSound(): string {
    return "Blub blub";
  }

  swim(): string {
    return `${this.name} glides through the water`;
  }

  dive(depth: number): string {
    this.waterDepth = depth;
    return `${this.name} dives to ${depth} feet`;
  }

  surface(): string {
    this.waterDepth = 0;
    return `${this.name} comes to the surface`;
  }
}

// Polymorphic functions
function makeFlyableObjectsFly(flyables: Flyable[]): void {
  flyables.forEach((flyable) => {
    console.log(flyable.fly());
    console.log(`Current altitude: ${flyable.getAltitude()}`);
    console.log(flyable.land());
  });
}

function makeSwimmableObjectsSwim(swimmables: Swimmable[]): void {
  swimmables.forEach((swimmable) => {
    console.log(swimmable.swim());
    console.log(swimmable.dive(50));
    console.log(swimmable.surface());
  });
}

// Usage
const duck = new Duck("Donald");
const eagle = new Eagle("Majestic");
const fish = new Fish("Nemo", "Clownfish");

const flyables: Flyable[] = [duck, eagle];
const swimmables: Swimmable[] = [duck, fish];

console.log("=== Flying Creatures ===");
makeFlyableObjectsFly(flyables);

console.log("\n=== Swimming Creatures ===");
makeSwimmableObjectsSwim(swimmables);
```

---

## 🧩 Mixin Patterns

### TypeScript Mixins for Multiple Inheritance:

```typescript
// Mixin base type
type Constructor<T = {}> = new (...args: any[]) => T;

// Mixin functions
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class Timestamped extends Base {
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    updateTimestamp(): void {
      this.updatedAt = new Date();
    }

    getAge(): number {
      return Date.now() - this.createdAt.getTime();
    }

    getFormattedCreatedAt(): string {
      return this.createdAt.toISOString();
    }
  };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class Activatable extends Base {
    private _isActive: boolean = true;

    activate(): void {
      this._isActive = true;
    }

    deactivate(): void {
      this._isActive = false;
    }

    isActive(): boolean {
      return this._isActive;
    }

    toggle(): boolean {
      this._isActive = !this._isActive;
      return this._isActive;
    }
  };
}

function Searchable<TBase extends Constructor>(Base: TBase) {
  return class Searchable extends Base {
    private tags: string[] = [];
    private searchableFields: string[] = [];

    addTag(tag: string): void {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    }

    removeTag(tag: string): void {
      this.tags = this.tags.filter((t) => t !== tag);
    }

    getTags(): string[] {
      return [...this.tags];
    }

    hasTag(tag: string): boolean {
      return this.tags.includes(tag);
    }

    setSearchableFields(fields: string[]): void {
      this.searchableFields = fields;
    }

    matches(query: string): boolean {
      const lowerQuery = query.toLowerCase();

      // Search in tags
      if (this.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))) {
        return true;
      }

      // Search in specified fields
      return this.searchableFields.some((field) => {
        const value = (this as any)[field];
        return value && value.toString().toLowerCase().includes(lowerQuery);
      });
    }
  };
}

// Base class
class BaseEntity {
  constructor(public id: string, public name: string) {}

  toString(): string {
    return `${this.constructor.name}(${this.id}): ${this.name}`;
  }
}

// Create classes with multiple mixins
const TimestampedEntity = Timestamped(BaseEntity);
const ActivatableEntity = Activatable(BaseEntity);
const SearchableEntity = Searchable(BaseEntity);

// Combine multiple mixins
const EnhancedEntity = Timestamped(Activatable(Searchable(BaseEntity)));

class Article extends EnhancedEntity {
  constructor(
    id: string,
    name: string,
    public content: string,
    public author: string
  ) {
    super(id, name);
    this.setSearchableFields(["name", "content", "author"]);
  }

  publish(): void {
    this.activate();
    this.updateTimestamp();
    this.addTag("published");
  }

  unpublish(): void {
    this.deactivate();
    this.updateTimestamp();
    this.removeTag("published");
  }

  getWordCount(): number {
    return this.content.split(/\s+/).length;
  }
}

class Product extends EnhancedEntity {
  constructor(
    id: string,
    name: string,
    public price: number,
    public category: string
  ) {
    super(id, name);
    this.setSearchableFields(["name", "category"]);
  }

  updatePrice(newPrice: number): void {
    this.price = newPrice;
    this.updateTimestamp();
  }

  addToCategory(category: string): void {
    this.category = category;
    this.addTag(category);
    this.updateTimestamp();
  }

  discount(percentage: number): void {
    this.price *= 1 - percentage / 100;
    this.addTag("discounted");
    this.updateTimestamp();
  }
}

// Usage examples
const article = new Article(
  "art1",
  "TypeScript Advanced Patterns",
  "Learn about mixins, inheritance, and polymorphism in TypeScript...",
  "John Doe"
);

const product = new Product("prod1", "Gaming Laptop", 1299.99, "Electronics");

// Test mixin functionality
article.addTag("typescript");
article.addTag("programming");
article.publish();

product.addTag("gaming");
product.addTag("laptop");
product.discount(10);

console.log("=== Article Info ===");
console.log(article.toString());
console.log("Active:", article.isActive());
console.log("Tags:", article.getTags());
console.log("Age:", article.getAge(), "ms");
console.log("Matches 'typescript':", article.matches("typescript"));
console.log("Matches 'patterns':", article.matches("patterns"));

console.log("\n=== Product Info ===");
console.log(product.toString());
console.log("Active:", product.isActive());
console.log("Tags:", product.getTags());
console.log("Price:", product.price);
console.log("Matches 'gaming':", product.matches("gaming"));
console.log("Matches 'laptop':", product.matches("laptop"));
```

---

## 🎮 Hands-On Exercise

### Build a Game Entity System:

```typescript
// Your task: Create a flexible game entity system

// 1. Create base Entity class
abstract class Entity {
  // Implement: position, health, energy
}

// 2. Create ability interfaces
interface Moveable {
  // move, getPosition, setPosition
}

interface Combatable {
  // attack, defend, takeDamage
}

interface Collectible {
  // collect, drop, getInventory
}

// 3. Create specific entity types
class Player extends Entity implements Moveable, Combatable, Collectible {
  // Implementation
}

class Enemy extends Entity implements Moveable, Combatable {
  // Implementation
}

class NPC extends Entity implements Moveable, Collectible {
  // Implementation
}

// 4. Create game systems
class GameWorld {
  // Manage entities, handle interactions
}

// Test your game system
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Complete Game Entity System

// Utility types and interfaces
interface Position {
  x: number;
  y: number;
}

interface Stats {
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  attack: number;
  defense: number;
}

interface Item {
  id: string;
  name: string;
  type: "weapon" | "armor" | "consumable" | "misc";
  value: number;
  weight: number;
}

// Entity states
enum EntityState {
  Idle = "idle",
  Moving = "moving",
  Attacking = "attacking",
  Defending = "defending",
  Dead = "dead",
}

// Ability interfaces
interface Moveable {
  move(newPosition: Position): boolean;
  getPosition(): Position;
  setPosition(position: Position): void;
  getMovementSpeed(): number;
}

interface Combatable {
  attack(target: Combatable): number;
  defend(): void;
  takeDamage(damage: number): number;
  isAlive(): boolean;
  getStats(): Stats;
}

interface Collectible {
  collect(item: Item): boolean;
  drop(itemId: string): Item | null;
  getInventory(): Item[];
  getInventoryWeight(): number;
  getMaxWeight(): number;
}

interface Interactable {
  interact(entity: Entity): string;
  canInteract(entity: Entity): boolean;
}

// Base Entity class
abstract class Entity {
  protected position: Position;
  protected state: EntityState = EntityState.Idle;
  protected lastStateChange: number = Date.now();

  constructor(
    public readonly id: string,
    public name: string,
    initialPosition: Position
  ) {
    this.position = { ...initialPosition };
  }

  abstract getType(): string;
  abstract getDescription(): string;

  getState(): EntityState {
    return this.state;
  }

  protected setState(newState: EntityState): void {
    if (this.state !== newState) {
      this.state = newState;
      this.lastStateChange = Date.now();
    }
  }

  getTimeSinceStateChange(): number {
    return Date.now() - this.lastStateChange;
  }

  toString(): string {
    return `${this.getType()}(${this.name}) at (${this.position.x}, ${
      this.position.y
    })`;
  }
}

// Mixin for movement
function MovementMixin<TBase extends Constructor<Entity>>(Base: TBase) {
  return class extends Base implements Moveable {
    protected movementSpeed: number = 1;

    move(newPosition: Position): boolean {
      if (this.getState() === EntityState.Dead) return false;

      const distance = Math.sqrt(
        Math.pow(newPosition.x - this.position.x, 2) +
          Math.pow(newPosition.y - this.position.y, 2)
      );

      if (distance <= this.movementSpeed) {
        this.setPosition(newPosition);
        this.setState(EntityState.Moving);
        return true;
      }

      return false;
    }

    getPosition(): Position {
      return { ...this.position };
    }

    setPosition(position: Position): void {
      this.position = { ...position };
    }

    getMovementSpeed(): number {
      return this.movementSpeed;
    }

    protected setMovementSpeed(speed: number): void {
      this.movementSpeed = Math.max(0, speed);
    }
  };
}

// Mixin for combat
function CombatMixin<TBase extends Constructor<Entity>>(Base: TBase) {
  return class extends Base implements Combatable {
    protected stats: Stats = {
      health: 100,
      maxHealth: 100,
      energy: 100,
      maxEnergy: 100,
      attack: 10,
      defense: 5,
    };

    attack(target: Combatable): number {
      if (this.getState() === EntityState.Dead || !this.isAlive()) return 0;
      if (!target.isAlive()) return 0;

      this.setState(EntityState.Attacking);

      const damage = Math.max(1, this.stats.attack - Math.random() * 5);
      const actualDamage = target.takeDamage(damage);

      // Use energy for attacking
      this.stats.energy = Math.max(0, this.stats.energy - 10);

      setTimeout(() => {
        if (this.getState() === EntityState.Attacking) {
          this.setState(EntityState.Idle);
        }
      }, 1000);

      return actualDamage;
    }

    defend(): void {
      if (this.getState() === EntityState.Dead) return;
      this.setState(EntityState.Defending);

      setTimeout(() => {
        if (this.getState() === EntityState.Defending) {
          this.setState(EntityState.Idle);
        }
      }, 500);
    }

    takeDamage(damage: number): number {
      if (!this.isAlive()) return 0;

      let actualDamage = damage;

      // Apply defense
      if (this.getState() === EntityState.Defending) {
        actualDamage = Math.max(1, damage - this.stats.defense * 2);
      } else {
        actualDamage = Math.max(1, damage - this.stats.defense);
      }

      this.stats.health = Math.max(0, this.stats.health - actualDamage);

      if (this.stats.health === 0) {
        this.setState(EntityState.Dead);
      }

      return actualDamage;
    }

    isAlive(): boolean {
      return this.stats.health > 0;
    }

    getStats(): Stats {
      return { ...this.stats };
    }

    protected heal(amount: number): void {
      this.stats.health = Math.min(
        this.stats.maxHealth,
        this.stats.health + amount
      );
    }

    protected restoreEnergy(amount: number): void {
      this.stats.energy = Math.min(
        this.stats.maxEnergy,
        this.stats.energy + amount
      );
    }
  };
}

// Mixin for inventory
function InventoryMixin<TBase extends Constructor<Entity>>(Base: TBase) {
  return class extends Base implements Collectible {
    protected inventory: Item[] = [];
    protected maxWeight: number = 50;

    collect(item: Item): boolean {
      if (this.getInventoryWeight() + item.weight <= this.maxWeight) {
        this.inventory.push(item);
        return true;
      }
      return false;
    }

    drop(itemId: string): Item | null {
      const index = this.inventory.findIndex((item) => item.id === itemId);
      if (index >= 0) {
        return this.inventory.splice(index, 1)[0];
      }
      return null;
    }

    getInventory(): Item[] {
      return [...this.inventory];
    }

    getInventoryWeight(): number {
      return this.inventory.reduce((total, item) => total + item.weight, 0);
    }

    getMaxWeight(): number {
      return this.maxWeight;
    }

    hasItem(itemId: string): boolean {
      return this.inventory.some((item) => item.id === itemId);
    }

    useItem(itemId: string): boolean {
      const itemIndex = this.inventory.findIndex((item) => item.id === itemId);
      if (itemIndex >= 0) {
        const item = this.inventory[itemIndex];
        if (item.type === "consumable") {
          this.inventory.splice(itemIndex, 1);
          return true;
        }
      }
      return false;
    }
  };
}

// Combined base classes
const BaseMoveable = MovementMixin(Entity);
const BaseCombatable = CombatMixin(Entity);
const BaseCollectible = InventoryMixin(Entity);
const BaseCombatMoveable = CombatMixin(MovementMixin(Entity));
const BaseFullEntity = InventoryMixin(CombatMixin(MovementMixin(Entity)));

// Specific entity implementations
class Player extends BaseFullEntity {
  private level: number = 1;
  private experience: number = 0;
  private experienceToNext: number = 100;

  constructor(name: string, position: Position) {
    super(`player_${Date.now()}`, name, position);
    this.maxWeight = 100; // Players can carry more
    this.setMovementSpeed(2); // Players move faster

    // Enhanced stats for player
    this.stats = {
      health: 150,
      maxHealth: 150,
      energy: 120,
      maxEnergy: 120,
      attack: 15,
      defense: 8,
    };
  }

  getType(): string {
    return "Player";
  }

  getDescription(): string {
    return `Level ${this.level} ${this.name} (${this.stats.health}/${this.stats.maxHealth} HP)`;
  }

  gainExperience(amount: number): boolean {
    this.experience += amount;
    if (this.experience >= this.experienceToNext) {
      this.levelUp();
      return true;
    }
    return false;
  }

  private levelUp(): void {
    this.level++;
    this.experience -= this.experienceToNext;
    this.experienceToNext = Math.floor(this.experienceToNext * 1.5);

    // Increase stats on level up
    this.stats.maxHealth += 20;
    this.stats.maxEnergy += 15;
    this.stats.attack += 3;
    this.stats.defense += 2;

    // Restore health and energy
    this.stats.health = this.stats.maxHealth;
    this.stats.energy = this.stats.maxEnergy;

    console.log(`🎉 ${this.name} leveled up to ${this.level}!`);
  }

  getLevel(): number {
    return this.level;
  }

  getExperience(): { current: number; toNext: number } {
    return {
      current: this.experience,
      toNext: this.experienceToNext,
    };
  }
}

class Enemy extends BaseCombatMoveable {
  private aggroRange: number = 3;
  private target: Entity | null = null;

  constructor(
    name: string,
    position: Position,
    private enemyType: "goblin" | "orc" | "dragon"
  ) {
    super(`enemy_${Date.now()}_${Math.random()}`, name, position);
    this.initializeByType();
  }

  private initializeByType(): void {
    switch (this.enemyType) {
      case "goblin":
        this.stats = {
          health: 50,
          maxHealth: 50,
          energy: 60,
          maxEnergy: 60,
          attack: 8,
          defense: 3,
        };
        this.setMovementSpeed(1.5);
        break;

      case "orc":
        this.stats = {
          health: 120,
          maxHealth: 120,
          energy: 80,
          maxEnergy: 80,
          attack: 18,
          defense: 10,
        };
        this.setMovementSpeed(1);
        break;

      case "dragon":
        this.stats = {
          health: 500,
          maxHealth: 500,
          energy: 200,
          maxEnergy: 200,
          attack: 50,
          defense: 25,
        };
        this.setMovementSpeed(0.5);
        this.aggroRange = 5;
        break;
    }
  }

  getType(): string {
    return "Enemy";
  }

  getDescription(): string {
    return `${this.enemyType} (${this.stats.health}/${this.stats.maxHealth} HP)`;
  }

  getEnemyType(): string {
    return this.enemyType;
  }

  setTarget(target: Entity | null): void {
    this.target = target;
  }

  getTarget(): Entity | null {
    return this.target;
  }

  getAggroRange(): number {
    return this.aggroRange;
  }

  // AI behavior
  updateAI(nearbyEntities: Entity[]): void {
    if (!this.isAlive()) return;

    // Find potential targets (players)
    const players = nearbyEntities.filter(
      (entity) =>
        entity instanceof Player &&
        entity.isAlive() &&
        this.distanceTo(entity) <= this.aggroRange
    );

    if (players.length > 0 && !this.target) {
      this.target = players[0];
      console.log(`👹 ${this.name} spotted ${this.target.name}!`);
    }

    // Chase and attack target
    if (this.target && this.target.isAlive()) {
      const distance = this.distanceTo(this.target);

      if (distance <= 1) {
        // Close enough to attack
        if (this.target instanceof Player || this.target instanceof Enemy) {
          this.attack(this.target);
        }
      } else if (distance <= this.aggroRange) {
        // Move closer to target
        const targetPos = this.target.getPosition();
        const myPos = this.getPosition();

        const dx = targetPos.x - myPos.x;
        const dy = targetPos.y - myPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          const moveX = myPos.x + (dx / distance) * this.getMovementSpeed();
          const moveY = myPos.y + (dy / distance) * this.getMovementSpeed();
          this.move({ x: moveX, y: moveY });
        }
      } else {
        // Target out of range, lose aggro
        this.target = null;
      }
    }
  }

  private distanceTo(other: Entity): number {
    const myPos = this.getPosition();
    const otherPos = other.getPosition();
    return Math.sqrt(
      Math.pow(otherPos.x - myPos.x, 2) + Math.pow(otherPos.y - myPos.y, 2)
    );
  }
}

class NPC extends BaseCollectible implements Interactable {
  private dialogues: string[] = [];
  private questItems: Item[] = [];

  constructor(
    name: string,
    position: Position,
    private npcType: "merchant" | "quest_giver" | "guard"
  ) {
    super(`npc_${Date.now()}`, name, position);
    this.initializeByType();
  }

  private initializeByType(): void {
    switch (this.npcType) {
      case "merchant":
        this.dialogues = [
          "Welcome to my shop!",
          "Looking for anything specific?",
          "I have the finest goods in town!",
        ];
        break;

      case "quest_giver":
        this.dialogues = [
          "I have a task for you, brave adventurer!",
          "The realm needs heroes like you!",
          "Complete my quest and be rewarded!",
        ];
        break;

      case "guard":
        this.dialogues = [
          "Halt! State your business!",
          "Keep the peace, citizen.",
          "Nothing suspicious to report.",
        ];
        break;
    }
  }

  getType(): string {
    return "NPC";
  }

  getDescription(): string {
    return `${this.npcType}: ${this.name}`;
  }

  interact(entity: Entity): string {
    if (!this.canInteract(entity)) {
      return "I don't want to talk right now.";
    }

    const randomDialogue =
      this.dialogues[Math.floor(Math.random() * this.dialogues.length)];
    return `${this.name}: "${randomDialogue}"`;
  }

  canInteract(entity: Entity): boolean {
    return entity instanceof Player;
  }

  addQuestItem(item: Item): void {
    this.questItems.push(item);
  }

  getQuestItems(): Item[] {
    return [...this.questItems];
  }
}

// Game World Management
class GameWorld {
  private entities: Map<string, Entity> = new Map();
  private items: Map<string, Item> = new Map();
  private worldSize: { width: number; height: number } = {
    width: 100,
    height: 100,
  };

  addEntity(entity: Entity): void {
    this.entities.set(entity.id, entity);
    console.log(`🌍 ${entity.toString()} joined the world`);
  }

  removeEntity(entityId: string): boolean {
    const entity = this.entities.get(entityId);
    if (entity) {
      this.entities.delete(entityId);
      console.log(`🌍 ${entity.toString()} left the world`);
      return true;
    }
    return false;
  }

  getEntity(entityId: string): Entity | undefined {
    return this.entities.get(entityId);
  }

  getAllEntities(): Entity[] {
    return Array.from(this.entities.values());
  }

  getEntitiesInRange(position: Position, range: number): Entity[] {
    return this.getAllEntities().filter((entity) => {
      const entityPos = entity.getPosition();
      const distance = Math.sqrt(
        Math.pow(entityPos.x - position.x, 2) +
          Math.pow(entityPos.y - position.y, 2)
      );
      return distance <= range;
    });
  }

  update(): void {
    // Update all enemies with AI
    this.getAllEntities()
      .filter((entity) => entity instanceof Enemy)
      .forEach((enemy) => {
        const nearbyEntities = this.getEntitiesInRange(
          enemy.getPosition(),
          (enemy as Enemy).getAggroRange() + 2
        );
        (enemy as Enemy).updateAI(nearbyEntities);
      });

    // Clean up dead entities
    const deadEntities = this.getAllEntities().filter((entity) => {
      if (entity instanceof Player || entity instanceof Enemy) {
        return !entity.isAlive();
      }
      return false;
    });

    deadEntities.forEach((entity) => {
      if (entity instanceof Enemy) {
        console.log(`💀 ${entity.name} has been defeated!`);
        this.removeEntity(entity.id);
      }
    });
  }

  spawnItem(item: Item, position: Position): void {
    this.items.set(item.id, item);
    console.log(`📦 ${item.name} spawned at (${position.x}, ${position.y})`);
  }

  getWorldSize(): { width: number; height: number } {
    return { ...this.worldSize };
  }

  displayWorld(): void {
    console.log("\n🌍 === WORLD STATE ===");
    console.log(`World Size: ${this.worldSize.width}x${this.worldSize.height}`);
    console.log(`Total Entities: ${this.entities.size}`);

    const players = this.getAllEntities().filter((e) => e instanceof Player);
    const enemies = this.getAllEntities().filter((e) => e instanceof Enemy);
    const npcs = this.getAllEntities().filter((e) => e instanceof NPC);

    console.log(`Players: ${players.length}`);
    console.log(`Enemies: ${enemies.length}`);
    console.log(`NPCs: ${npcs.length}`);

    this.getAllEntities().forEach((entity) => {
      console.log(`  ${entity.toString()} - ${entity.getDescription()}`);
    });
  }
}

// Demo the game system
console.log("=== Game Entity System Demo ===\n");

const world = new GameWorld();

// Create sample items
const sword: Item = {
  id: "sword1",
  name: "Iron Sword",
  type: "weapon",
  value: 100,
  weight: 5,
};

const potion: Item = {
  id: "potion1",
  name: "Health Potion",
  type: "consumable",
  value: 50,
  weight: 1,
};

// Create entities
const player = new Player("Hero", { x: 10, y: 10 });
const goblin = new Enemy("Sneaky Goblin", { x: 15, y: 12 }, "goblin");
const merchant = new NPC("Bob the Merchant", { x: 5, y: 5 }, "merchant");

// Add to world
world.addEntity(player);
world.addEntity(goblin);
world.addEntity(merchant);

// Initial world state
world.displayWorld();

// Player actions
console.log("\n=== Player Actions ===");
player.collect(sword);
player.collect(potion);
console.log(
  "Player inventory:",
  player.getInventory().map((i) => i.name)
);

// Move player closer to goblin
player.move({ x: 14, y: 11 });
console.log(
  `Player moved to (${player.getPosition().x}, ${player.getPosition().y})`
);

// Combat
console.log("\n=== Combat ===");
const damage = player.attack(goblin);
console.log(`Player attacks goblin for ${damage} damage`);
console.log(`Goblin health: ${goblin.getStats().health}`);

// World updates (AI)
console.log("\n=== AI Updates ===");
for (let i = 0; i < 3; i++) {
  world.update();
  setTimeout(() => {}, 1000); // Simulate time passing
}

// NPC interaction
console.log("\n=== NPC Interaction ===");
console.log(merchant.interact(player));

// Final world state
world.displayWorld();

console.log("\n=== Demo Complete ===");
```

</details>

---

## 🎯 Key Takeaways

- **Inheritance**: Extend base classes with `extends` keyword
- **Method Overriding**: Replace parent methods with child implementations
- **Polymorphism**: Use objects of different types interchangeably
- **Abstract Classes**: Define contracts with partial implementation
- **Mixins**: Achieve multiple inheritance through composition
- **Interface Implementation**: Ensure objects conform to contracts

---

## 🚀 What's Next?

**Next Lesson**: `16-modules.md` - Learn module systems, namespaces, and code organization patterns!

---

_Remember: Use inheritance for "is-a" relationships and composition for "has-a" relationships. Favor composition over inheritance for flexibility!_ 🧬
