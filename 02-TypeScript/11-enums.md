# Enums - Named Constants for Better Code 🏷️

**Master Named Constants!** Enums provide a way to define named constants, making your code more readable, maintainable, and self-documenting. Learn when to use enums vs literal types, how to work with string and numeric enums, and best practices for real-world applications.

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand numeric and string enums in TypeScript
- Know when to use enums vs union literal types
- Master const enums for performance optimization
- Handle reverse mapping and enum iteration
- Build robust applications with well-designed enums

---

## 🤔 Why Enums Matter

Enums help you create meaningful names for sets of related constants, making your code more readable and maintainable.

### The Problem: Magic Numbers and Strings

```typescript
// Hard to understand - what do these numbers mean?
function processOrder(status: number) {
    if (status === 0) {
        console.log("Order is pending");
    } else if (status === 1) {
        console.log("Order is processing");
    } else if (status === 2) {
        console.log("Order is shipped");
    } else if (status === 3) {
        console.log("Order is delivered");
    }
}

// Using magic numbers - prone to errors
processOrder(0); // What does 0 mean?
processOrder(5); // Invalid status, but TypeScript allows it

// Magic strings are slightly better but still problematic
function setTheme(theme: string) {
    if (theme === "light") {
        // Apply light theme
    } else if (theme === "dark") {
        // Apply dark theme
    }
}

setTheme("ligt"); // Typo! No compile-time error
setTheme("blue"); // Invalid theme, but allowed
```

### The Solution: Enums and Literal Types

```typescript
// Using enum - clear, self-documenting
enum OrderStatus {
    Pending = 0,
    Processing = 1,
    Shipped = 2,
    Delivered = 3
}

function processOrder(status: OrderStatus) {
    switch (status) {
        case OrderStatus.Pending:
            console.log("Order is pending");
            break;
        case OrderStatus.Processing:
            console.log("Order is processing");
            break;
        case OrderStatus.Shipped:
            console.log("Order is shipped");
            break;
        case OrderStatus.Delivered:
            console.log("Order is delivered");
            break;
    }
}

// Clear, type-safe usage
processOrder(OrderStatus.Pending);    // ✅ Clear what this means
processOrder(OrderStatus.Shipped);    // ✅ Type-safe
// processOrder(5);                   // ❌ Error: not assignable to OrderStatus

// Alternative: Union literal types (often preferred)
type Theme = "light" | "dark" | "high-contrast";

function setTheme(theme: Theme) {
    switch (theme) {
        case "light":
            // Apply light theme
            break;
        case "dark":
            // Apply dark theme
            break;
        case "high-contrast":
            // Apply high contrast theme
            break;
    }
}

setTheme("light");        // ✅ Valid
// setTheme("ligt");      // ❌ Error: not assignable to Theme
// setTheme("blue");      // ❌ Error: not assignable to Theme
```

---

## 🔢 Numeric Enums

Numeric enums assign incrementing numbers to each member:

```typescript
// Basic numeric enum - starts at 0 by default
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

// Custom starting value
enum HttpStatusCode {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500
}

// Mixed manual and auto-increment
enum LogLevel {
    Debug = 1,    // 1
    Info,         // 2 (auto-increment)
    Warning = 10, // 10
    Error,        // 11 (auto-increment)
    Fatal = 100   // 100
}

// Using numeric enums
function move(direction: Direction): { x: number; y: number } {
    switch (direction) {
        case Direction.Up:
            return { x: 0, y: -1 };
        case Direction.Down:
            return { x: 0, y: 1 };
        case Direction.Left:
            return { x: -1, y: 0 };
        case Direction.Right:
            return { x: 1, y: 0 };
        default:
            const exhaustive: never = direction;
            throw new Error(`Unhandled direction: ${exhaustive}`);
    }
}

function createResponse(statusCode: HttpStatusCode, data?: any): Response {
    return {
        status: statusCode,
        statusText: HttpStatusCode[statusCode], // Reverse mapping
        data: data || null,
        timestamp: new Date()
    };
}

interface Response {
    status: number;
    statusText: string;
    data: any;
    timestamp: Date;
}

// Real-world usage examples
console.log("Direction values:");
console.log(`Up: ${Direction.Up}`);       // 0
console.log(`Down: ${Direction.Down}`);   // 1
console.log(`Left: ${Direction.Left}`);   // 2
console.log(`Right: ${Direction.Right}`); // 3

console.log("\nMovement calculations:");
console.log("Move up:", move(Direction.Up));
console.log("Move right:", move(Direction.Right));

console.log("\nHTTP responses:");
const successResponse = createResponse(HttpStatusCode.OK, { users: [] });
const errorResponse = createResponse(HttpStatusCode.NotFound);
console.log("Success:", successResponse);
console.log("Error:", errorResponse);

// Reverse mapping - get name from value
console.log("\nReverse mapping:");
console.log(`Status 200 is: ${HttpStatusCode[200]}`); // "OK"
console.log(`Status 404 is: ${HttpStatusCode[404]}`); // "NotFound"
```

### Advanced Numeric Enum Patterns:

```typescript
// Computed enum members
enum FileAccess {
    None = 0,
    Read = 1 << 1,     // 2
    Write = 1 << 2,    // 4
    Execute = 1 << 3,  // 8
    ReadWrite = Read | Write,        // 6
    ReadExecute = Read | Execute,    // 10
    All = Read | Write | Execute     // 14
}

// Priority system with gaps for future insertion
enum Priority {
    Lowest = 100,
    Low = 200,
    Normal = 300,
    High = 400,
    Highest = 500,
    Critical = 1000
}

function checkFileAccess(requested: FileAccess, granted: FileAccess): boolean {
    return (granted & requested) === requested;
}

function prioritizeTask(currentPriority: Priority, boost: boolean = false): Priority {
    if (boost && currentPriority < Priority.Critical) {
        return Math.min(currentPriority + 100, Priority.Critical) as Priority;
    }
    return currentPriority;
}

// Usage examples
console.log("\nFile access examples:");
const userPermissions = FileAccess.ReadWrite;
console.log(`User can read: ${checkFileAccess(FileAccess.Read, userPermissions)}`);
console.log(`User can execute: ${checkFileAccess(FileAccess.Execute, userPermissions)}`);

console.log("\nPriority examples:");
let taskPriority = Priority.Normal;
console.log(`Initial priority: ${taskPriority}`);
taskPriority = prioritizeTask(taskPriority, true);
console.log(`Boosted priority: ${taskPriority}`);
```

---

## 📝 String Enums

String enums provide meaningful string values:

```typescript
// String enum - each member must be explicitly initialized
enum Color {
    Red = "red",
    Green = "green", 
    Blue = "blue",
    Yellow = "yellow",
    Purple = "purple"
}

enum Theme {
    Light = "light",
    Dark = "dark",
    HighContrast = "high-contrast",
    Auto = "auto"
}

enum ApiEndpoint {
    Users = "/api/users",
    Products = "/api/products",
    Orders = "/api/orders",
    Auth = "/api/auth",
    Profile = "/api/profile"
}

// Better serialization and debugging
interface UserSettings {
    theme: Theme;
    primaryColor: Color;
    language: "en" | "es" | "fr" | "de";
}

function applyTheme(theme: Theme): void {
    document.body.className = theme; // Uses actual string value
    console.log(`Applied theme: ${theme}`); // Readable in logs
    
    // Theme-specific logic
    switch (theme) {
        case Theme.Light:
            console.log("Using light color palette");
            break;
        case Theme.Dark:
            console.log("Using dark color palette");
            break;
        case Theme.HighContrast:
            console.log("Using high contrast mode");
            break;
        case Theme.Auto:
            console.log("Using system theme preference");
            break;
    }
}

function makeApiCall(endpoint: ApiEndpoint, data?: any): Promise<any> {
    const url = `https://api.example.com${endpoint}`;
    console.log(`Making request to: ${url}`);
    
    // Simulate API call
    return fetch(url, {
        method: data ? "POST" : "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: data ? JSON.stringify(data) : undefined
    }).then(response => response.json());
}

// Usage examples
const userSettings: UserSettings = {
    theme: Theme.Dark,
    primaryColor: Color.Blue,
    language: "en"
};

console.log("User settings:", userSettings);
applyTheme(userSettings.theme);

// API calls
makeApiCall(ApiEndpoint.Users);
makeApiCall(ApiEndpoint.Profile, { name: "Alice", email: "alice@example.com" });

// String enums in local storage
function saveSettings(settings: UserSettings): void {
    localStorage.setItem("userSettings", JSON.stringify(settings));
    console.log("Settings saved with theme:", settings.theme);
}

function loadSettings(): UserSettings | null {
    const saved = localStorage.getItem("userSettings");
    if (saved) {
        const parsed = JSON.parse(saved);
        console.log("Loaded settings with theme:", parsed.theme);
        return parsed;
    }
    return null;
}

// Demonstrates better debugging - string enums show actual values
saveSettings(userSettings);
```

### Heterogeneous Enums (Mixed String/Number):

```typescript
// Generally not recommended, but sometimes useful
enum Mixed {
    No = 0,
    Yes = "yes",
    Unknown = "unknown",
    Error = -1
}

// Better pattern: Use separate enums
enum BooleanResponse {
    No = 0,
    Yes = 1
}

enum TextResponse {
    Unknown = "unknown",
    Error = "error",
    Success = "success"
}

// Type-safe response handling
type ApiResponse = 
    | { type: "boolean"; value: BooleanResponse }
    | { type: "text"; value: TextResponse };

function handleResponse(response: ApiResponse): void {
    switch (response.type) {
        case "boolean":
            console.log(`Boolean response: ${response.value === BooleanResponse.Yes ? "Yes" : "No"}`);
            break;
        case "text":
            console.log(`Text response: ${response.value}`);
            break;
    }
}

handleResponse({ type: "boolean", value: BooleanResponse.Yes });
handleResponse({ type: "text", value: TextResponse.Success });
```

---

## ⚡ Const Enums

Const enums are completely inlined during compilation for better performance:

```typescript
// Regular enum - generates JavaScript object
enum RegularColor {
    Red = "red",
    Green = "green",
    Blue = "blue"
}

// Const enum - completely inlined at compile time
const enum ConstColor {
    Red = "red",
    Green = "green", 
    Blue = "blue"
}

// Usage looks identical
function setRegularColor(color: RegularColor): void {
    console.log(`Regular color: ${color}`);
}

function setConstColor(color: ConstColor): void {
    console.log(`Const color: ${color}`);
}

// Both work the same way
setRegularColor(RegularColor.Red);
setConstColor(ConstColor.Red);

/* 
Compiled JavaScript difference:

Regular enum generates:
var RegularColor;
(function (RegularColor) {
    RegularColor["Red"] = "red";
    RegularColor["Green"] = "green";
    RegularColor["Blue"] = "blue";
})(RegularColor || (RegularColor = {}));

Const enum is completely inlined:
setConstColor("red"); // Direct string value
*/

// Performance-critical scenarios
const enum PerformanceLevel {
    Low = 1,
    Medium = 2,
    High = 3,
    Ultra = 4
}

// This gets inlined to direct comparisons
function optimizeForPerformance(level: PerformanceLevel): void {
    if (level >= PerformanceLevel.High) { // Becomes: if (level >= 3)
        console.log("Enabling high-performance features");
    }
}

// Const enum limitations
const enum Direction {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}

// ❌ Cannot use computed members in const enums
// const enum Invalid {
//     Value = someFunction() // Error: computed values not allowed
// }

// ❌ Cannot iterate over const enum values
// Object.values(Direction) // Error: Direction only refers to a type

// Solution: Use regular enum when you need runtime features
enum RuntimeDirection {
    Up = "up",
    Down = "down",
    Left = "left", 
    Right = "right"
}

// Can iterate over regular enums
const allDirections = Object.values(RuntimeDirection);
console.log("All directions:", allDirections);
```

---

## 🔄 Enum Utilities and Patterns

### Enum Iteration and Validation:

```typescript
enum Status {
    Pending = "pending",
    InProgress = "in-progress",
    Completed = "completed",
    Failed = "failed"
}

// Get all enum values
function getAllStatuses(): Status[] {
    return Object.values(Status);
}

// Check if value is valid enum member
function isValidStatus(value: string): value is Status {
    return Object.values(Status).includes(value as Status);
}

// Safe enum parsing from strings
function parseStatus(value: string): Status | null {
    return isValidStatus(value) ? value : null;
}

// Enum to array of options
function getStatusOptions(): Array<{ value: Status; label: string }> {
    return [
        { value: Status.Pending, label: "Pending" },
        { value: Status.InProgress, label: "In Progress" },
        { value: Status.Completed, label: "Completed" },
        { value: Status.Failed, label: "Failed" }
    ];
}

// Usage examples
console.log("All statuses:", getAllStatuses());
console.log("Is 'pending' valid?", isValidStatus("pending"));
console.log("Is 'invalid' valid?", isValidStatus("invalid"));

const userInput = "in-progress";
const parsedStatus = parseStatus(userInput);
if (parsedStatus) {
    console.log(`Valid status: ${parsedStatus}`);
} else {
    console.log("Invalid status provided");
}

console.log("Status options:", getStatusOptions());
```

### Enum Mapping and Transformation:

```typescript
enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

enum HttpStatus {
    OK = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500
}

// Map enums to descriptions
const httpMethodDescriptions: Record<HttpMethod, string> = {
    [HttpMethod.GET]: "Retrieve data",
    [HttpMethod.POST]: "Create new resource",
    [HttpMethod.PUT]: "Update entire resource",
    [HttpMethod.DELETE]: "Remove resource",
    [HttpMethod.PATCH]: "Partially update resource"
};

const httpStatusMessages: Record<HttpStatus, string> = {
    [HttpStatus.OK]: "Request successful",
    [HttpStatus.Created]: "Resource created successfully",
    [HttpStatus.NoContent]: "Request successful, no content",
    [HttpStatus.BadRequest]: "Invalid request",
    [HttpStatus.Unauthorized]: "Authentication required",
    [HttpStatus.Forbidden]: "Access denied",
    [HttpStatus.NotFound]: "Resource not found",
    [HttpStatus.InternalServerError]: "Server error occurred"
};

// Type-safe enum mapping
function getMethodDescription(method: HttpMethod): string {
    return httpMethodDescriptions[method];
}

function getStatusMessage(status: HttpStatus): string {
    return httpStatusMessages[status];
}

// Enum-based API configuration
interface ApiEndpointConfig {
    method: HttpMethod;
    path: string;
    expectedStatus: HttpStatus;
    description: string;
}

const apiEndpoints: Record<string, ApiEndpointConfig> = {
    listUsers: {
        method: HttpMethod.GET,
        path: "/users",
        expectedStatus: HttpStatus.OK,
        description: "Get all users"
    },
    createUser: {
        method: HttpMethod.POST,
        path: "/users",
        expectedStatus: HttpStatus.Created,
        description: "Create new user"
    },
    updateUser: {
        method: HttpMethod.PUT,
        path: "/users/:id",
        expectedStatus: HttpStatus.OK,
        description: "Update user"
    },
    deleteUser: {
        method: HttpMethod.DELETE,
        path: "/users/:id",
        expectedStatus: HttpStatus.NoContent,
        description: "Delete user"
    }
};

// Usage
console.log("API Endpoints:");
Object.entries(apiEndpoints).forEach(([name, config]) => {
    console.log(`${name}: ${config.method} ${config.path}`);
    console.log(`  Expected: ${config.expectedStatus} (${getStatusMessage(config.expectedStatus)})`);
    console.log(`  Method: ${getMethodDescription(config.method)}`);
});
```

---

## 🆚 Enums vs Union Types

### When to Use Enums:

```typescript
// ✅ Good for enums: Related constants with logical grouping
enum FileType {
    Text = "text",
    Image = "image", 
    Video = "video",
    Audio = "audio",
    Document = "document"
}

// ✅ Good for enums: Need runtime iteration or reverse mapping
enum Permission {
    Read = 1,
    Write = 2,
    Execute = 4,
    Admin = 8
}

function hasPermission(user: number, required: Permission): boolean {
    return (user & required) === required;
}

// ✅ Good for enums: Complex state machines
enum ConnectionState {
    Disconnected = "disconnected",
    Connecting = "connecting",
    Connected = "connected",
    Reconnecting = "reconnecting",
    Failed = "failed"
}

const connectionTransitions: Record<ConnectionState, ConnectionState[]> = {
    [ConnectionState.Disconnected]: [ConnectionState.Connecting],
    [ConnectionState.Connecting]: [ConnectionState.Connected, ConnectionState.Failed],
    [ConnectionState.Connected]: [ConnectionState.Disconnected, ConnectionState.Reconnecting],
    [ConnectionState.Reconnecting]: [ConnectionState.Connected, ConnectionState.Failed],
    [ConnectionState.Failed]: [ConnectionState.Connecting, ConnectionState.Disconnected]
};
```

### When to Use Union Types:

```typescript
// ✅ Good for union types: Simple string literals
type Theme = "light" | "dark" | "auto";
type Size = "small" | "medium" | "large";
type Alignment = "left" | "center" | "right";

// ✅ Good for union types: External API values you don't control
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// ✅ Good for union types: Template literal types
type EventName = `on${Capitalize<string>}`;
type CssProperty = `${string}-${string}`;

// ✅ Good for union types: Discriminated unions
type LoadingState = 
    | { status: "loading" }
    | { status: "success"; data: any }
    | { status: "error"; error: string };

// Comparison example
// Enum approach
enum ColorEnum {
    Red = "red",
    Green = "green",
    Blue = "blue"
}

// Union type approach  
type ColorUnion = "red" | "green" | "blue";

// Both work similarly in most cases
function setBackgroundEnum(color: ColorEnum): void {
    document.body.style.backgroundColor = color;
}

function setBackgroundUnion(color: ColorUnion): void {
    document.body.style.backgroundColor = color;
}

// Key differences:
// 1. Enums create runtime objects, unions don't
// 2. Enums can be iterated, unions cannot
// 3. Unions are more lightweight
// 4. Enums provide namespace (ColorEnum.Red vs "red")
```

---

## 🎮 Hands-On Exercises

### Exercise 1: Game State Management

Create a comprehensive game state system using enums:

```typescript
// Your task: Create a game state management system

// Define game states, player actions, and item types using enums
enum GameState {
    // Define states: Menu, Playing, Paused, GameOver, Loading
}

enum PlayerAction {
    // Define actions: Move, Jump, Attack, Defend, UseItem, Pause
}

enum ItemType {
    // Define items: Weapon, Armor, Potion, Key, Treasure
}

// Create interfaces that use your enums
interface GameManager {
    // Properties and methods for managing game state
}

interface Player {
    // Player properties including inventory
}

interface GameEvent {
    // Event system using enums
}

// Implement game logic functions
function handlePlayerAction(action: PlayerAction, game: GameManager): void {
    // Implementation
}

function changeGameState(newState: GameState, game: GameManager): void {
    // Implementation
}

// Test your game system
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Game State Management System

enum GameState {
    Menu = "menu",
    Loading = "loading",
    Playing = "playing",
    Paused = "paused",
    GameOver = "game-over",
    Victory = "victory",
    Settings = "settings"
}

enum PlayerAction {
    MoveUp = "move-up",
    MoveDown = "move-down", 
    MoveLeft = "move-left",
    MoveRight = "move-right",
    Jump = "jump",
    Attack = "attack",
    Defend = "defend",
    UseItem = "use-item",
    Pause = "pause",
    Interact = "interact"
}

enum ItemType {
    Weapon = "weapon",
    Armor = "armor",
    HealthPotion = "health-potion",
    ManaPotion = "mana-potion",
    Key = "key",
    Treasure = "treasure",
    Food = "food",
    Scroll = "scroll"
}

enum ItemRarity {
    Common = "common",
    Uncommon = "uncommon", 
    Rare = "rare",
    Epic = "epic",
    Legendary = "legendary"
}

enum EventType {
    StateChange = "state-change",
    PlayerAction = "player-action",
    ItemPickup = "item-pickup",
    ItemUse = "item-use",
    EnemyEncounter = "enemy-encounter",
    QuestComplete = "quest-complete",
    LevelUp = "level-up"
}

// Game interfaces
interface GameItem {
    id: string;
    name: string;
    type: ItemType;
    rarity: ItemRarity;
    value: number;
    description: string;
    usable: boolean;
}

interface Player {
    id: string;
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    experience: number;
    position: { x: number; y: number };
    inventory: GameItem[];
    equippedItems: Partial<Record<ItemType, GameItem>>;
}

interface GameEvent {
    type: EventType;
    timestamp: Date;
    data: any;
    player?: string;
}

interface GameManager {
    currentState: GameState;
    previousState: GameState | null;
    player: Player;
    events: GameEvent[];
    score: number;
    startTime: Date;
    isPaused: boolean;
}

// Game state transitions
const validStateTransitions: Record<GameState, GameState[]> = {
    [GameState.Menu]: [GameState.Loading, GameState.Settings],
    [GameState.Loading]: [GameState.Playing, GameState.Menu],
    [GameState.Playing]: [GameState.Paused, GameState.GameOver, GameState.Victory],
    [GameState.Paused]: [GameState.Playing, GameState.Menu],
    [GameState.GameOver]: [GameState.Menu, GameState.Loading],
    [GameState.Victory]: [GameState.Menu, GameState.Loading],
    [GameState.Settings]: [GameState.Menu]
};

// Sample items database
const gameItems: Record<string, GameItem> = {
    "iron-sword": {
        id: "iron-sword",
        name: "Iron Sword",
        type: ItemType.Weapon,
        rarity: ItemRarity.Common,
        value: 50,
        description: "A sturdy iron sword",
        usable: false
    },
    "health-potion": {
        id: "health-potion",
        name: "Health Potion",
        type: ItemType.HealthPotion,
        rarity: ItemRarity.Common,
        value: 25,
        description: "Restores 50 health points",
        usable: true
    },
    "leather-armor": {
        id: "leather-armor",
        name: "Leather Armor",
        type: ItemType.Armor,
        rarity: ItemRarity.Common,
        value: 75,
        description: "Basic protection",
        usable: false
    },
    "magic-key": {
        id: "magic-key",
        name: "Magic Key",
        type: ItemType.Key,
        rarity: ItemRarity.Rare,
        value: 100,
        description: "Opens magical locks",
        usable: true
    }
};

// Game manager implementation
function createGameManager(): GameManager {
    return {
        currentState: GameState.Menu,
        previousState: null,
        player: createPlayer("Hero"),
        events: [],
        score: 0,
        startTime: new Date(),
        isPaused: false
    };
}

function createPlayer(name: string): Player {
    return {
        id: "player-1",
        name,
        level: 1,
        health: 100,
        maxHealth: 100,
        mana: 50,
        maxMana: 50,
        experience: 0,
        position: { x: 0, y: 0 },
        inventory: [],
        equippedItems: {}
    };
}

// Game state management
function changeGameState(newState: GameState, game: GameManager): boolean {
    const currentState = game.currentState;
    const validTransitions = validStateTransitions[currentState];
    
    if (!validTransitions.includes(newState)) {
        console.log(`❌ Invalid state transition: ${currentState} -> ${newState}`);
        return false;
    }
    
    console.log(`🎮 State change: ${currentState} -> ${newState}`);
    
    // Handle state exit logic
    handleStateExit(currentState, game);
    
    // Update state
    game.previousState = currentState;
    game.currentState = newState;
    
    // Handle state entry logic
    handleStateEntry(newState, game);
    
    // Log event
    addGameEvent(game, EventType.StateChange, {
        fromState: currentState,
        toState: newState
    });
    
    return true;
}

function handleStateExit(state: GameState, game: GameManager): void {
    switch (state) {
        case GameState.Playing:
            game.isPaused = false;
            console.log("  📊 Game saved");
            break;
        case GameState.Paused:
            console.log("  ▶️ Resuming game");
            break;
    }
}

function handleStateEntry(state: GameState, game: GameManager): void {
    switch (state) {
        case GameState.Loading:
            console.log("  ⏳ Loading game assets...");
            break;
        case GameState.Playing:
            console.log("  🎯 Game started!");
            break;
        case GameState.Paused:
            game.isPaused = true;
            console.log("  ⏸️ Game paused");
            break;
        case GameState.GameOver:
            console.log(`  💀 Game Over! Final score: ${game.score}`);
            break;
        case GameState.Victory:
            console.log(`  🏆 Victory! Final score: ${game.score}`);
            break;
    }
}

// Player action handling
function handlePlayerAction(action: PlayerAction, game: GameManager): void {
    if (game.currentState !== GameState.Playing && action !== PlayerAction.Pause) {
        console.log("❌ Cannot perform actions outside of playing state");
        return;
    }
    
    console.log(`🎬 Player action: ${action}`);
    
    switch (action) {
        case PlayerAction.MoveUp:
            game.player.position.y -= 1;
            console.log(`  📍 Player moved to (${game.player.position.x}, ${game.player.position.y})`);
            break;
            
        case PlayerAction.MoveDown:
            game.player.position.y += 1;
            console.log(`  📍 Player moved to (${game.player.position.x}, ${game.player.position.y})`);
            break;
            
        case PlayerAction.MoveLeft:
            game.player.position.x -= 1;
            console.log(`  📍 Player moved to (${game.player.position.x}, ${game.player.position.y})`);
            break;
            
        case PlayerAction.MoveRight:
            game.player.position.x += 1;
            console.log(`  📍 Player moved to (${game.player.position.x}, ${game.player.position.y})`);
            break;
            
        case PlayerAction.Jump:
            console.log("  🦘 Player jumped!");
            break;
            
        case PlayerAction.Attack:
            console.log("  ⚔️ Player attacked!");
            game.score += 10;
            break;
            
        case PlayerAction.Defend:
            console.log("  🛡️ Player is defending!");
            break;
            
        case PlayerAction.UseItem:
            useItem(game.player, ItemType.HealthPotion);
            break;
            
        case PlayerAction.Pause:
            if (game.currentState === GameState.Playing) {
                changeGameState(GameState.Paused, game);
            } else if (game.currentState === GameState.Paused) {
                changeGameState(GameState.Playing, game);
            }
            break;
            
        case PlayerAction.Interact:
            console.log("  💬 Player is interacting with environment");
            break;
    }
    
    // Log the action
    addGameEvent(game, EventType.PlayerAction, { action, position: {...game.player.position} });
}

// Item management
function addItemToInventory(player: Player, itemId: string): boolean {
    const item = gameItems[itemId];
    if (!item) {
        console.log(`❌ Item not found: ${itemId}`);
        return false;
    }
    
    player.inventory.push(item);
    console.log(`📦 Added ${item.name} to inventory`);
    return true;
}

function useItem(player: Player, itemType: ItemType): boolean {
    const itemIndex = player.inventory.findIndex(item => 
        item.type === itemType && item.usable
    );
    
    if (itemIndex === -1) {
        console.log(`❌ No usable ${itemType} in inventory`);
        return false;
    }
    
    const item = player.inventory[itemIndex];
    
    switch (item.type) {
        case ItemType.HealthPotion:
            const healAmount = 50;
            const actualHeal = Math.min(healAmount, player.maxHealth - player.health);
            player.health += actualHeal;
            console.log(`💚 Used ${item.name}, healed ${actualHeal} HP`);
            break;
            
        case ItemType.ManaPotion:
            const manaAmount = 30;
            const actualMana = Math.min(manaAmount, player.maxMana - player.mana);
            player.mana += actualMana;
            console.log(`💙 Used ${item.name}, restored ${actualMana} MP`);
            break;
            
        default:
            console.log(`🔧 Used ${item.name}`);
    }
    
    // Remove item from inventory
    player.inventory.splice(itemIndex, 1);
    return true;
}

// Event system
function addGameEvent(game: GameManager, type: EventType, data: any): void {
    const event: GameEvent = {
        type,
        timestamp: new Date(),
        data,
        player: game.player.id
    };
    
    game.events.push(event);
    
    // Keep only last 100 events
    if (game.events.length > 100) {
        game.events.shift();
    }
}

// Game statistics
function getGameStatistics(game: GameManager): any {
    const actionCounts: Record<string, number> = {};
    const stateCounts: Record<string, number> = {};
    
    game.events.forEach(event => {
        if (event.type === EventType.PlayerAction) {
            const action = event.data.action;
            actionCounts[action] = (actionCounts[action] || 0) + 1;
        } else if (event.type === EventType.StateChange) {
            const state = event.data.toState;
            stateCounts[state] = (stateCounts[state] || 0) + 1;
        }
    });
    
    return {
        totalEvents: game.events.length,
        actionCounts,
        stateCounts,
        currentScore: game.score,
        playtime: new Date().getTime() - game.startTime.getTime(),
        playerLevel: game.player.level,
        inventorySize: game.player.inventory.length
    };
}

// Demo the game system
console.log("=== Game State Management Demo ===\n");

const game = createGameManager();

// Start a game session
console.log("🎮 Starting game session...");
changeGameState(GameState.Loading, game);
setTimeout(() => {
    changeGameState(GameState.Playing, game);
    
    // Simulate gameplay
    console.log("\n⚡ Simulating gameplay...");
    handlePlayerAction(PlayerAction.MoveRight, game);
    handlePlayerAction(PlayerAction.MoveUp, game);
    handlePlayerAction(PlayerAction.Attack, game);
    
    // Add some items
    addItemToInventory(game.player, "iron-sword");
    addItemToInventory(game.player, "health-potion");
    addItemToInventory(game.player, "leather-armor");
    
    // Use an item
    handlePlayerAction(PlayerAction.UseItem, game);
    
    // Pause and resume
    handlePlayerAction(PlayerAction.Pause, game);
    setTimeout(() => {
        handlePlayerAction(PlayerAction.Pause, game);
        
        // More actions
        handlePlayerAction(PlayerAction.Jump, game);
        handlePlayerAction(PlayerAction.Interact, game);
        
        // End game
        changeGameState(GameState.Victory, game);
        
        // Show statistics
        console.log("\n📊 Game Statistics:");
        const stats = getGameStatistics(game);
        console.log(stats);
        
    }, 1000);
}, 500);
```

</details>

### Exercise 2: API Response System

```typescript
// Create a comprehensive API response system using enums

// Define HTTP methods, status codes, and error types
enum HttpMethod {
    // Implementation
}

enum HttpStatusCode {
    // Implementation
}

enum ApiErrorType {
    // Implementation
}

// Create response interfaces
interface ApiResponse<T = any> {
    // Implementation
}

interface ApiError {
    // Implementation  
}

// Create API client with enum-based configuration
class ApiClient {
    // Implementation
}

// Test your API system
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: API Response System

enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS"
}

enum HttpStatusCode {
    // Success responses
    OK = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    
    // Redirection responses
    MovedPermanently = 301,
    Found = 302,
    NotModified = 304,
    
    // Client error responses
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    Conflict = 409,
    UnprocessableEntity = 422,
    TooManyRequests = 429,
    
    // Server error responses
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504
}

enum ApiErrorType {
    NetworkError = "network-error",
    TimeoutError = "timeout-error",
    ValidationError = "validation-error",
    AuthenticationError = "authentication-error",
    AuthorizationError = "authorization-error",
    NotFoundError = "not-found-error",
    ConflictError = "conflict-error",
    RateLimitError = "rate-limit-error",
    ServerError = "server-error",
    UnknownError = "unknown-error"
}

enum ContentType {
    JSON = "application/json",
    FormUrlEncoded = "application/x-www-form-urlencoded",
    FormData = "multipart/form-data",
    Text = "text/plain",
    XML = "application/xml",
    HTML = "text/html"
}

enum CacheStrategy {
    NoCache = "no-cache",
    CacheFirst = "cache-first",
    NetworkFirst = "network-first",
    StaleWhileRevalidate = "stale-while-revalidate"
}

// Response interfaces
interface ApiResponse<T = any> {
    success: boolean;
    status: HttpStatusCode;
    statusText: string;
    data?: T;
    error?: ApiError;
    metadata: {
        timestamp: Date;
        requestId: string;
        duration: number;
        cached: boolean;
    };
}

interface ApiError {
    type: ApiErrorType;
    message: string;
    code?: string;
    details?: Record<string, any>;
    stack?: string;
}

interface ApiRequestConfig {
    method: HttpMethod;
    url: string;
    headers?: Record<string, string>;
    body?: any;
    contentType?: ContentType;
    timeout?: number;
    retries?: number;
    cache?: CacheStrategy;
}

// Status code mappings
const statusCodeToErrorType: Record<number, ApiErrorType> = {
    [HttpStatusCode.BadRequest]: ApiErrorType.ValidationError,
    [HttpStatusCode.Unauthorized]: ApiErrorType.AuthenticationError,
    [HttpStatusCode.Forbidden]: ApiErrorType.AuthorizationError,
    [HttpStatusCode.NotFound]: ApiErrorType.NotFoundError,
    [HttpStatusCode.Conflict]: ApiErrorType.ConflictError,
    [HttpStatusCode.TooManyRequests]: ApiErrorType.RateLimitError,
    [HttpStatusCode.InternalServerError]: ApiErrorType.ServerError,
    [HttpStatusCode.BadGateway]: ApiErrorType.ServerError,
    [HttpStatusCode.ServiceUnavailable]: ApiErrorType.ServerError,
    [HttpStatusCode.GatewayTimeout]: ApiErrorType.TimeoutError
};

const statusCodeMessages: Record<HttpStatusCode, string> = {
    [HttpStatusCode.OK]: "Request successful",
    [HttpStatusCode.Created]: "Resource created successfully",
    [HttpStatusCode.Accepted]: "Request accepted for processing",
    [HttpStatusCode.NoContent]: "Request successful with no content",
    [HttpStatusCode.MovedPermanently]: "Resource moved permanently",
    [HttpStatusCode.Found]: "Resource found at different location",
    [HttpStatusCode.NotModified]: "Resource not modified",
    [HttpStatusCode.BadRequest]: "Invalid request",
    [HttpStatusCode.Unauthorized]: "Authentication required",
    [HttpStatusCode.Forbidden]: "Access forbidden",
    [HttpStatusCode.NotFound]: "Resource not found",
    [HttpStatusCode.MethodNotAllowed]: "HTTP method not allowed",
    [HttpStatusCode.Conflict]: "Request conflicts with current state",
    [HttpStatusCode.UnprocessableEntity]: "Request cannot be processed",
    [HttpStatusCode.TooManyRequests]: "Too many requests",
    [HttpStatusCode.InternalServerError]: "Internal server error",
    [HttpStatusCode.NotImplemented]: "Feature not implemented",
    [HttpStatusCode.BadGateway]: "Bad gateway",
    [HttpStatusCode.ServiceUnavailable]: "Service unavailable",
    [HttpStatusCode.GatewayTimeout]: "Gateway timeout"
};

// API Client implementation
class ApiClient {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;
    private defaultTimeout: number;
    private requestCounter: number = 0;

    constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
        this.baseUrl = baseUrl.replace(/\/$/, ""); // Remove trailing slash
        this.defaultHeaders = {
            [ContentType.JSON]: ContentType.JSON,
            ...defaultHeaders
        };
        this.defaultTimeout = 10000; // 10 seconds
    }

    // Generic request method
    async request<T = any>(config: ApiRequestConfig): Promise<ApiResponse<T>> {
        const requestId = `req-${++this.requestCounter}-${Date.now()}`;
        const startTime = Date.now();
        
        try {
            console.log(`🌐 ${config.method} ${config.url} (ID: ${requestId})`);
            
            // Prepare request
            const url = this.buildUrl(config.url);
            const headers = this.buildHeaders(config);
            const body = this.buildBody(config);
            
            // Simulate network request
            const response = await this.simulateRequest(config, url, headers, body);
            const duration = Date.now() - startTime;
            
            // Parse response
            const apiResponse = this.parseResponse<T>(response, requestId, duration);
            
            console.log(`${apiResponse.success ? '✅' : '❌'} ${config.method} ${config.url} - ${apiResponse.status} (${duration}ms)`);
            
            return apiResponse;
            
        } catch (error) {
            const duration = Date.now() - startTime;
            return this.createErrorResponse<T>(error, requestId, duration);
        }
    }

    // Convenience methods for different HTTP methods
    async get<T = any>(url: string, config: Partial<ApiRequestConfig> = {}): Promise<ApiResponse<T>> {
        return this.request<T>({ ...config, method: HttpMethod.GET, url });
    }

    async post<T = any>(url: string, data?: any, config: Partial<ApiRequestConfig> = {}): Promise<ApiResponse<T>> {
        return this.request<T>({ ...config, method: HttpMethod.POST, url, body: data });
    }

    async put<T = any>(url: string, data?: any, config: Partial<ApiRequestConfig> = {}): Promise<ApiResponse<T>> {
        return this.request<T>({ ...config, method: HttpMethod.PUT, url, body: data });
    }

    async delete<T = any>(url: string, config: Partial<ApiRequestConfig> = {}): Promise<ApiResponse<T>> {
        return this.request<T>({ ...config, method: HttpMethod.DELETE, url });
    }

    async patch<T = any>(url: string, data?: any, config: Partial<ApiRequestConfig> = {}): Promise<ApiResponse<T>> {
        return this.request<T>({ ...config, method: HttpMethod.PATCH, url, body: data });
    }

    // Helper methods
    private buildUrl(path: string): string {
        if (path.startsWith("http")) {
            return path;
        }
        return `${this.baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
    }

    private buildHeaders(config: ApiRequestConfig): Record<string, string> {
        const headers = { ...this.defaultHeaders };
        
        if (config.contentType) {
            headers["Content-Type"] = config.contentType;
        }
        
        if (config.headers) {
            Object.assign(headers, config.headers);
        }
        
        return headers;
    }

    private buildBody(config: ApiRequestConfig): string | undefined {
        if (!config.body) return undefined;
        
        const contentType = config.contentType || ContentType.JSON;
        
        switch (contentType) {
            case ContentType.JSON:
                return JSON.stringify(config.body);
            case ContentType.FormUrlEncoded:
                return new URLSearchParams(config.body).toString();
            case ContentType.Text:
                return String(config.body);
            default:
                return config.body;
        }
    }

    // Simulate network request (in real implementation, use fetch)
    private async simulateRequest(
        config: ApiRequestConfig,
        url: string,
        headers: Record<string, string>,
        body?: string
    ): Promise<{ status: number; data: any }> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 400));
        
        // Simulate different responses based on URL patterns
        if (url.includes("/users")) {
            if (config.method === HttpMethod.GET) {
                return {
                    status: HttpStatusCode.OK,
                    data: [
                        { id: 1, name: "Alice", email: "alice@example.com" },
                        { id: 2, name: "Bob", email: "bob@example.com" }
                    ]
                };
            } else if (config.method === HttpMethod.POST) {
                return {
                    status: HttpStatusCode.Created,
                    data: { id: 3, ...JSON.parse(body || "{}") }
                };
            }
        }
        
        if (url.includes("/error")) {
            return {
                status: HttpStatusCode.InternalServerError,
                data: { error: "Simulated server error" }
            };
        }
        
        if (url.includes("/timeout")) {
            throw new Error("Request timeout");
        }
        
        if (url.includes("/unauthorized")) {
            return {
                status: HttpStatusCode.Unauthorized,
                data: { error: "Authentication required" }
            };
        }
        
        // Default success response
        return {
            status: HttpStatusCode.OK,
            data: { message: "Success", url, method: config.method }
        };
    }

    private parseResponse<T>(
        response: { status: number; data: any },
        requestId: string,
        duration: number
    ): ApiResponse<T> {
        const status = response.status as HttpStatusCode;
        const success = status >= 200 && status < 300;
        
        const apiResponse: ApiResponse<T> = {
            success,
            status,
            statusText: statusCodeMessages[status] || "Unknown status",
            metadata: {
                timestamp: new Date(),
                requestId,
                duration,
                cached: false
            }
        };
        
        if (success) {
            apiResponse.data = response.data;
        } else {
            apiResponse.error = {
                type: statusCodeToErrorType[status] || ApiErrorType.UnknownError,
                message: response.data?.error || statusCodeMessages[status] || "Unknown error",
                code: status.toString(),
                details: response.data
            };
        }
        
        return apiResponse;
    }

    private createErrorResponse<T>(
        error: any,
        requestId: string,
        duration: number
    ): ApiResponse<T> {
        let errorType = ApiErrorType.UnknownError;
        let message = "Unknown error occurred";
        
        if (error.message?.includes("timeout")) {
            errorType = ApiErrorType.TimeoutError;
            message = "Request timed out";
        } else if (error.message?.includes("network")) {
            errorType = ApiErrorType.NetworkError;
            message = "Network error occurred";
        }
        
        return {
            success: false,
            status: HttpStatusCode.InternalServerError,
            statusText: "Request Failed",
            error: {
                type: errorType,
                message,
                stack: error.stack
            },
            metadata: {
                timestamp: new Date(),
                requestId,
                duration,
                cached: false
            }
        };
    }
}

// Usage examples and testing
async function demonstrateApiClient() {
    console.log("=== API Client Demo ===\n");
    
    const apiClient = new ApiClient("https://api.example.com", {
        "Authorization": "Bearer token123",
        "X-API-Version": "v1"
    });
    
    // Test successful GET request
    console.log("1. Testing successful GET request:");
    const usersResponse = await apiClient.get("/users");
    console.log("Response:", {
        success: usersResponse.success,
        status: usersResponse.status,
        dataLength: usersResponse.data?.length,
        requestId: usersResponse.metadata.requestId
    });
    
    // Test successful POST request
    console.log("\n2. Testing successful POST request:");
    const createUserResponse = await apiClient.post("/users", {
        name: "Charlie",
        email: "charlie@example.com"
    });
    console.log("Response:", {
        success: createUserResponse.success,
        status: createUserResponse.status,
        createdUser: createUserResponse.data
    });
    
    // Test error response
    console.log("\n3. Testing error response:");
    const errorResponse = await apiClient.get("/unauthorized");
    console.log("Response:", {
        success: errorResponse.success,
        status: errorResponse.status,
        errorType: errorResponse.error?.type,
        errorMessage: errorResponse.error?.message
    });
    
    // Test timeout error
    console.log("\n4. Testing timeout error:");
    const timeoutResponse = await apiClient.get("/timeout");
    console.log("Response:", {
        success: timeoutResponse.success,
        errorType: timeoutResponse.error?.type,
        errorMessage: timeoutResponse.error?.message
    });
    
    // Test different HTTP methods
    console.log("\n5. Testing different HTTP methods:");
    const putResponse = await apiClient.put("/users/1", { name: "Updated Alice" });
    const deleteResponse = await apiClient.delete("/users/1");
    const patchResponse = await apiClient.patch("/users/2", { email: "newemail@example.com" });
    
    console.log("PUT success:", putResponse.success);
    console.log("DELETE success:", deleteResponse.success);
    console.log("PATCH success:", patchResponse.success);
}

// Error handling utilities
function isApiError(response: ApiResponse): response is ApiResponse & { error: ApiError } {
    return !response.success && !!response.error;
}

function handleApiError(response: ApiResponse): void {
    if (!isApiError(response)) return;
    
    const { error } = response;
    
    switch (error.type) {
        case ApiErrorType.AuthenticationError:
            console.log("🔐 Please log in to continue");
            // Redirect to login
            break;
            
        case ApiErrorType.AuthorizationError:
            console.log("🚫 You don't have permission for this action");
            // Show permission denied message
            break;
            
        case ApiErrorType.ValidationError:
            console.log("📝 Please check your input:", error.details);
            // Show validation errors
            break;
            
        case ApiErrorType.NetworkError:
            console.log("📡 Network connection problem, please try again");
            // Show retry option
            break;
            
        case ApiErrorType.RateLimitError:
            console.log("⏰ Too many requests, please wait before trying again");
            // Show rate limit message
            break;
            
        default:
            console.log("❌ Something went wrong:", error.message);
            // Show generic error message
    }
}

// Run the demonstration
demonstrateApiClient();
```

</details>

---

## 🎯 Key Takeaways

After completing this lesson, you should understand:

### ✅ Enum Fundamentals:
- **Numeric enums** for incrementing constants and bit flags
- **String enums** for meaningful string values and better debugging
- **Const enums** for performance optimization with inlined values
- **Reverse mapping** and iteration capabilities

### ✅ When to Use Enums:
- **Related constants** that form a logical group
- **Need for runtime iteration** or reverse mapping
- **Complex state machines** with transitions
- **Bit flag operations** for permissions/settings

### ✅ When to Use Union Types Instead:
- **Simple string literals** without complex logic
- **External API values** you don't control
- **Template literal patterns** for dynamic types
- **Performance-critical code** that needs minimal overhead

### ✅ Best Practices:
- **Use string enums** for better debugging and serialization
- **Consider const enums** for performance in tight loops
- **Prefer union types** for simple cases
- **Design for extensibility** with enum value gaps

---

## 🚀 What's Next?

Congratulations! You've mastered enums in TypeScript. You now know how to:

- ✅ **Create meaningful named constants** with numeric and string enums
- ✅ **Choose between enums and union types** based on requirements
- ✅ **Optimize performance** with const enums when appropriate
- ✅ **Build robust systems** with well-designed constant values
- ✅ **Handle complex scenarios** like state machines and permission systems

**Next Lesson**: `12-type-assertions.md` - Learn about type assertions for when you know better than TypeScript's inference!

---

*Remember: Enums provide meaningful names for sets of related constants. Use them when you need runtime features like iteration, or when building complex systems with many related constant values!* 🏷️
