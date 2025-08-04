# Lesson 5: State Basics 🧠

## Welcome to Component Memory! 💭

Imagine your brain remembering things throughout the day - your mood, what you ate, tasks you completed. React components can have memory too! This memory is called **state**, and it's what makes your apps interactive and dynamic.

## 🤔 What is State?

**State** is data that a component "remembers" and can change over time. Unlike props (which come from outside), state belongs to the component and can be updated.

### Real-World Analogy:

Think of a **light switch**:

- **Props**: The electricity coming from outside (you can't control this)
- **State**: Whether the switch is ON or OFF (the switch remembers and controls this)

## 🎯 Before State: Static Components

Here's a component without state - it's "dead":

```tsx
function Counter() {
  const count = 0; // This never changes!

  return (
    <div>
      <p>Count: {count}</p>
      <button>Click me!</button>
    </div>
  );
}
```

**Problem**: Clicking the button does nothing. The count is always 0.

## 🌟 After State: Interactive Components

Let's bring our component to life with state:

```tsx
import React, { useState } from "react";

function Counter() {
  // useState gives us state and a way to update it
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1); // Update the state!
  };

  return (
    <div className="p-5 border-2 border-gray-300 rounded-lg text-center max-w-sm m-5 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Counter</h2>
      <p className="text-2xl font-bold mb-4 text-gray-700">Count: {count}</p>
      <button
        onClick={handleClick}
        className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white border-0 rounded cursor-pointer text-base transition-colors duration-200"
      >
        Click me!
      </button>
    </div>
  );
}

export default Counter;
```

## 🔍 Understanding useState

### The useState Hook Syntax:

```tsx
const [stateVariable, setStateFunction] = useState(initialValue);
```

**Breaking it down:**

- `stateVariable`: The current value of your state
- `setStateFunction`: Function to update the state
- `initialValue`: What the state starts as

### Examples:

```tsx
// Number state
const [count, setCount] = useState(0);

// String state
const [name, setName] = useState("John");

// Boolean state
const [isVisible, setIsVisible] = useState(true);

// Array state
const [items, setItems] = useState([]);

// Object state
const [user, setUser] = useState({ name: "", age: 0 });
```

## 🎮 Let's Build: Toggle Button

```tsx
import React, { useState } from "react";

function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn); // Flip the boolean value
  };

  return (
    <div className="p-5 text-center">
      <h3 className="text-lg font-semibold mb-4">Light Switch</h3>

      {/* Visual representation */}
      <div
        className={`w-24 h-24 rounded-full mx-auto my-5 border-4 border-gray-800 flex items-center justify-center text-3xl transition-colors duration-300 ${
          isOn ? "bg-yellow-400" : "bg-gray-600"
        }`}
      >
        {isOn ? "💡" : "🌙"}
      </div>

      <p className="text-lg font-bold mb-4">
        The light is {isOn ? "ON" : "OFF"}
      </p>

      <button
        onClick={handleToggle}
        className={`px-5 py-2 text-white border-0 rounded cursor-pointer text-base transition-colors duration-200 ${
          isOn
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        Turn {isOn ? "OFF" : "ON"}
      </button>
    </div>
  );
}

export default ToggleButton;
```

## 🌈 Multiple State Variables

You can have multiple pieces of state in one component:

```tsx
import React, { useState } from "react";

function UserProfile() {
  // Multiple state variables
  const [name, setName] = useState("Guest");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="p-5 border border-gray-300 rounded-lg bg-white shadow-md max-w-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">User Profile</h3>

      <div className="space-y-2 mb-6">
        <p>
          <strong className="text-gray-700">Name:</strong>{" "}
          <span className="text-gray-600">{name}</span>
        </p>
        <p>
          <strong className="text-gray-700">Age:</strong>{" "}
          <span className="text-gray-600">{age}</span>
        </p>
        <p>
          <strong className="text-gray-700">Email:</strong>{" "}
          <span className="text-gray-600">{email}</span>
        </p>
        <p>
          <strong className="text-gray-700">Status:</strong>
          <span
            className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
              isLoggedIn
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {isLoggedIn ? "Logged In" : "Guest"}
          </span>
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className={`w-full px-4 py-2 text-white border-0 rounded-md cursor-pointer font-medium transition-colors duration-200 ${
            isLoggedIn
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
```

## 🎯 State with TypeScript

### Basic Types:

```tsx
// Explicit typing (optional but good practice)
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>("");
const [isVisible, setIsVisible] = useState<boolean>(false);
```

### Complex Types:

```tsx
// Interface for object state
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function UserComponent() {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    isActive: false,
  });

  const updateUserName = (newName: string) => {
    setUser({
      ...user, // Keep all existing properties
      name: newName, // Update only the name
    });
  };

  return (
    <div>
      <h3>{user.name}</h3>
      <input
        value={user.name}
        onChange={(e) => updateUserName(e.target.value)}
      />
    </div>
  );
}
```

## 🎮 Let's Build: Todo Item Component

```tsx
import React, { useState } from "react";

interface TodoItemProps {
  initialText: string;
}

function TodoItem({ initialText }: TodoItemProps) {
  const [text, setText] = useState(initialText);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(initialText); // Reset to original text
    setIsEditing(false);
  };

  return (
    <div
      style={{
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        margin: "8px 0",
        backgroundColor: isCompleted ? "#e8f5e8" : "white",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleComplete}
        style={{ transform: "scale(1.2)" }}
      />

      {/* Text or Edit Input */}
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            padding: "4px 8px",
            border: "1px solid #007bff",
            borderRadius: "4px",
          }}
          autoFocus
        />
      ) : (
        <span
          style={{
            flex: 1,
            textDecoration: isCompleted ? "line-through" : "none",
            color: isCompleted ? "#666" : "#333",
            fontSize: "16px",
          }}
        >
          {text}
        </span>
      )}

      {/* Action Buttons */}
      {isEditing ? (
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white border-0 rounded text-xs font-medium cursor-pointer transition-colors duration-200"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white border-0 rounded text-xs font-medium cursor-pointer transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleEdit}
          disabled={isCompleted}
          className={`px-2 py-1 border-0 rounded text-xs font-medium transition-colors duration-200 ${
            isCompleted
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
          }`}
        >
          Edit
        </button>
      )}
    </div>
  );
}

export default TodoItem;
```

## 🎯 State Update Rules

### ❌ Wrong Way (Mutating State):

```tsx
// DON'T DO THIS!
const [user, setUser] = useState({ name: "John", age: 25 });

const updateAge = () => {
  user.age = 26; // ❌ Modifying state directly
  setUser(user); // ❌ React won't detect the change
};
```

### ✅ Correct Way (Immutable Updates):

```tsx
// DO THIS!
const [user, setUser] = useState({ name: "John", age: 25 });

const updateAge = () => {
  setUser({
    ...user, // Spread operator copies existing properties
    age: 26, // Override only the age
  });
};

// Or for simple updates:
const updateName = (newName: string) => {
  setUser((prevUser) => ({
    ...prevUser,
    name: newName,
  }));
};
```

### Array State Updates:

```tsx
const [items, setItems] = useState<string[]>([]);

// Add item
const addItem = (newItem: string) => {
  setItems([...items, newItem]); // Create new array
};

// Remove item
const removeItem = (index: number) => {
  setItems(items.filter((_, i) => i !== index));
};

// Update item
const updateItem = (index: number, newValue: string) => {
  setItems(items.map((item, i) => (i === index ? newValue : item)));
};
```

## 🎮 Complete Example: Color Picker

```tsx
import React, { useState } from "react";

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ffa500",
    "#800080",
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);

    // Add to history if not already there
    if (!colorHistory.includes(color)) {
      setColorHistory([...colorHistory, color]);
    }
  };

  const clearHistory = () => {
    setColorHistory([]);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Color Picker</h2>

      {/* Selected Color Display */}
      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: selectedColor,
          border: "3px solid #333",
          borderRadius: "10px",
          margin: "20px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
        }}
      >
        {selectedColor}
      </div>

      {/* Color Options */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Choose a Color:</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: color,
                border:
                  selectedColor === color ? "3px solid #333" : "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                transform: selectedColor === color ? "scale(1.1)" : "scale(1)",
              }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* History Section */}
      <div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          {showHistory ? "Hide" : "Show"} History ({colorHistory.length})
        </button>

        {colorHistory.length > 0 && (
          <button
            onClick={clearHistory}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear History
          </button>
        )}

        {showHistory && colorHistory.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h4>Color History:</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "5px",
                flexWrap: "wrap",
              }}
            >
              {colorHistory.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: color,
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ColorPicker;
```

## 🎯 What You've Mastered

### ✅ Core Concepts:

1. **State is component memory** that can change over time
2. **useState hook** creates state variables and update functions
3. **State updates trigger re-renders** - the UI updates automatically
4. **Each component has its own state** - state is isolated
5. **State must be updated immutably** - never modify state directly

### ✅ Practical Skills:

1. **Creating state variables** with useState
2. **Updating state** with setter functions
3. **Using state in JSX** to display dynamic content
4. **Handling multiple state variables**
5. **Working with different data types** (strings, numbers, booleans, objects, arrays)

## 🚀 What's Next?

In **Lesson 6: Event Handling**, we'll learn how to:

- Handle different types of user interactions (clicks, typing, form submissions)
- Work with event objects and TypeScript
- Create more interactive components
- Build real user interfaces that respond to user actions

You've just unlocked the power of interactivity! State is what makes React apps come alive! 🎉

---

**💡 Remember**: State is like component memory. When state changes, React automatically updates the UI to reflect the new state. This is React's superpower!
