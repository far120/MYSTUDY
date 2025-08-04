# Lesson 6: Event Handling 🎮

## Welcome to Interactive React! ⚡

Imagine a website where nothing responds to your clicks, typing, or mouse movements. Pretty boring, right? **Event handling** is what makes websites come alive by responding to user interactions!

## 🤔 What is Event Handling?

**Event handling** is how your React components respond to user actions like:

- 🖱️ **Clicking** buttons
- ⌨️ **Typing** in input fields
- 🖱️ **Hovering** over elements
- 📱 **Touching** on mobile devices
- ⌨️ **Pressing** keyboard keys

### Real-World Analogy:

Think of a **TV remote control**:

- You press a button (event)
- The remote sends a signal (event handler)
- The TV responds (state change/action)

## 🎯 Basic Event Handling

Let's start with the most common event - clicking a button:

### Simple Click Handler:

```tsx
import React, { useState } from "react";

function ClickCounter() {
  const [count, setCount] = useState(0);

  // Event handler function
  const handleClick = () => {
    setCount(count + 1);
    console.log("Button clicked!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Click Counter</h2>
      <p className="text-lg mb-4 text-gray-600">Clicked {count} times</p>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Click Me!
      </button>
    </div>
  );
}

export default ClickCounter;
```

## 🎨 Different Types of Events

### 1. **Mouse Events** 🖱️

```tsx
import React, { useState } from "react";

function MouseEvents() {
  const [message, setMessage] = useState("Hover over the box!");
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Mouse Events Demo</h3>

      <div
        className={`w-48 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
          isPressed
            ? "bg-red-100 border-red-300"
            : "bg-blue-100 border-blue-300 hover:bg-blue-200"
        }`}
        onClick={() => setMessage("You clicked the box!")}
        onMouseEnter={() => setMessage("Mouse entered the box!")}
        onMouseLeave={() => setMessage("Mouse left the box!")}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        <span className="text-sm font-medium text-gray-700">
          Interactive Box
        </span>
      </div>

      <p className="mt-4 text-center text-gray-600 font-medium">{message}</p>
    </div>
  );
}

export default MouseEvents;
```

### 2. **Keyboard Events** ⌨️

```tsx
import React, { useState } from "react";

function KeyboardEvents() {
  const [inputValue, setInputValue] = useState("");
  const [lastKey, setLastKey] = useState("");
  const [keyCount, setKeyCount] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(event.key);
    setKeyCount(keyCount + 1);

    // Special key handling
    if (event.key === "Enter") {
      alert(`You typed: ${inputValue}`);
    }

    if (event.key === "Escape") {
      setInputValue("");
      setLastKey("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Keyboard Events Demo</h3>

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type something... (Press Enter or Escape)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <strong>Current text:</strong> {inputValue || "Nothing typed yet"}
        </p>
        <p>
          <strong>Last key pressed:</strong> {lastKey || "None"}
        </p>
        <p>
          <strong>Total keys pressed:</strong> {keyCount}
        </p>
        <p className="text-xs text-gray-500">
          💡 Try pressing Enter or Escape for special actions!
        </p>
      </div>
    </div>
  );
}

export default KeyboardEvents;
```

### 3. **Form Events** 📝

```tsx
import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

function FormEvents() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="p-6 bg-green-100 border border-green-300 rounded-lg max-w-md mx-auto">
        <div className="text-center">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Success!</h3>
          <p className="text-green-700">Your message has been submitted.</p>
          <p className="text-sm text-green-600 mt-2">
            Form will reset in a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Contact Form</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default FormEvents;
```

## 🎯 TypeScript Event Types

### Common Event Types:

```tsx
// Mouse events
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log("Button clicked at:", event.clientX, event.clientY);
};

// Keyboard events
const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  console.log("Key pressed:", event.key);
};

// Form events
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("Form submitted");
};

// Input change events
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log("Input changed:", event.target.value);
};

// Focus events
const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
  console.log("Input focused");
};
```

## 🎮 Let's Build: Interactive Calculator

```tsx
import React, { useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-xs mx-auto">
      <div className="bg-black text-white text-right text-3xl font-mono p-4 rounded mb-4 min-h-[60px] flex items-center justify-end">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <button
          onClick={handleClear}
          className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded transition-colors"
        >
          Clear
        </button>
        <button
          onClick={() => handleOperation("÷")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors"
        >
          ÷
        </button>
        <button
          onClick={() => handleOperation("×")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors"
        >
          ×
        </button>

        {/* Row 2 */}
        <button
          onClick={() => handleNumber("7")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          7
        </button>
        <button
          onClick={() => handleNumber("8")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          8
        </button>
        <button
          onClick={() => handleNumber("9")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          9
        </button>
        <button
          onClick={() => handleOperation("-")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors"
        >
          -
        </button>

        {/* Row 3 */}
        <button
          onClick={() => handleNumber("4")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          4
        </button>
        <button
          onClick={() => handleNumber("5")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          5
        </button>
        <button
          onClick={() => handleNumber("6")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          6
        </button>
        <button
          onClick={() => handleOperation("+")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded transition-colors"
        >
          +
        </button>

        {/* Row 4 */}
        <button
          onClick={() => handleNumber("1")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          1
        </button>
        <button
          onClick={() => handleNumber("2")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          2
        </button>
        <button
          onClick={() => handleNumber("3")}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          3
        </button>
        <button
          onClick={handleEquals}
          className="row-span-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded transition-colors"
        >
          =
        </button>

        {/* Row 5 */}
        <button
          onClick={() => handleNumber("0")}
          className="col-span-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          0
        </button>
        <button
          onClick={handleDecimal}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition-colors"
        >
          .
        </button>
      </div>
    </div>
  );
}

export default Calculator;
```

## 🎯 Event Object Properties

### Useful Event Properties:

```tsx
const handleEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Prevent default behavior (useful for forms)
  event.preventDefault();

  // Stop event bubbling
  event.stopPropagation();

  // Get the element that triggered the event
  const target = event.target as HTMLButtonElement;

  // Mouse position
  console.log("Mouse position:", event.clientX, event.clientY);

  // Which mouse button was clicked (0=left, 1=middle, 2=right)
  console.log("Button clicked:", event.button);

  // Modifier keys
  console.log("Ctrl pressed:", event.ctrlKey);
  console.log("Shift pressed:", event.shiftKey);
  console.log("Alt pressed:", event.altKey);
};
```

## 🎮 Hands-On Exercise: Color Picker with Events

```tsx
import React, { useState } from "react";

function ColorPickerWithEvents() {
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [isMouseDown, setIsMouseDown] = useState(false);

  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ffa500",
    "#800080",
    "#ffc0cb",
    "#a52a2a",
    "#808080",
    "#000000",
  ];

  const handleColorClick = (color: string, event: React.MouseEvent) => {
    setSelectedColor(color);

    // Add a fun click effect
    const target = event.target as HTMLElement;
    target.style.transform = "scale(0.9)";
    setTimeout(() => {
      target.style.transform = "scale(1)";
    }, 100);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = colors.indexOf(selectedColor);
    let newIndex = currentIndex;

    switch (event.key) {
      case "ArrowLeft":
        newIndex = currentIndex > 0 ? currentIndex - 1 : colors.length - 1;
        break;
      case "ArrowRight":
        newIndex = currentIndex < colors.length - 1 ? currentIndex + 1 : 0;
        break;
      case "ArrowUp":
        newIndex = currentIndex - 4 >= 0 ? currentIndex - 4 : currentIndex;
        break;
      case "ArrowDown":
        newIndex =
          currentIndex + 4 < colors.length ? currentIndex + 4 : currentIndex;
        break;
    }

    if (newIndex !== currentIndex) {
      setSelectedColor(colors[newIndex]);
    }
  };

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h3 className="text-xl font-bold mb-4 text-center">
        Interactive Color Picker
      </h3>

      {/* Selected Color Display */}
      <div
        className="w-32 h-32 border-4 border-gray-800 rounded-lg mx-auto mb-4 transition-all duration-200"
        style={{ backgroundColor: selectedColor }}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseLeave={() => setIsMouseDown(false)}
        style={{
          backgroundColor: selectedColor,
          transform: isMouseDown ? "scale(0.95)" : "scale(1)",
        }}
      />

      <p className="text-center text-lg font-mono mb-4">{selectedColor}</p>

      {/* Color Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
              selectedColor === color
                ? "border-gray-800 ring-2 ring-blue-500"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
            onClick={(event) => handleColorClick(color, event)}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              if (selectedColor !== color) {
                target.style.transform = "scale(1)";
              }
            }}
          />
        ))}
      </div>

      <p className="text-center text-sm text-gray-500">
        💡 Use arrow keys to navigate, click to select
      </p>
    </div>
  );
}

export default ColorPickerWithEvents;
```

## 🎯 What You've Learned

### ✅ Core Event Concepts:

1. **Event handlers** respond to user interactions
2. **TypeScript event types** provide type safety
3. **Event objects** contain useful information
4. **preventDefault()** stops default browser behavior
5. **Different event types** handle various interactions

### ✅ Practical Skills:

1. **Handling clicks, typing, and mouse movements**
2. **Building interactive forms**
3. **Creating responsive user interfaces**
4. **Using TypeScript for event safety**
5. **Managing complex user interactions**

## 🚀 What's Next?

In **Lesson 7: Conditional Rendering**, we'll learn how to:

- Show/hide content based on conditions
- Render different components dynamically
- Handle loading states and errors
- Build responsive user interfaces

You've mastered making React components interactive! Event handling is what transforms static components into engaging user experiences! 🎉

---

**💡 Remember**: Events are how users communicate with your app. Always think about what interactions make sense for your users and provide clear feedback for their actions!
