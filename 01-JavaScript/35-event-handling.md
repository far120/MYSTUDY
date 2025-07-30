# Event Handling - Making Pages Interactive 🎪

Welcome to **Event Handling** - where your static web pages come alive! Events are how JavaScript responds to user interactions like clicks, key presses, mouse movements, and much more. This is the magic that makes websites interactive!

## 🎭 What are Events?

**Events** are actions or occurrences that happen in the browser. When users interact with your webpage, the browser creates event objects that your JavaScript can "listen" for and respond to.

### Real-World Analogy: Smart Doorbell

```
User rings doorbell = Event occurs
Doorbell camera detects ring = Event listener
Your phone gets notification = Event handler function
You decide to answer door = Your response code
```

### Common Event Types:

- **Mouse Events**: click, doubleclick, mouseover, mouseout
- **Keyboard Events**: keydown, keyup, keypress
- **Form Events**: submit, change, input, focus, blur
- **Window Events**: load, resize, scroll
- **Touch Events**: touchstart, touchmove, touchend

## 👆 Basic Event Handling

### Method 1: addEventListener (Recommended)

```javascript
// Get the element
const button = document.querySelector("#my-button");

// Add event listener
button.addEventListener("click", function () {
  console.log("Button was clicked!");
});

// Or with arrow function
button.addEventListener("click", () => {
  console.log("Button was clicked!");
});

// Or with named function
function handleButtonClick() {
  console.log("Button was clicked!");
}
button.addEventListener("click", handleButtonClick);
```

### Method 2: HTML onclick attribute (Not recommended)

```html
<!-- Don't do this - mixes HTML and JavaScript -->
<button onclick="alert('Clicked!')">Click Me</button>
```

### Method 3: Element property (Limited)

```javascript
const button = document.querySelector("#my-button");

// Only one handler per event type
button.onclick = function () {
  console.log("Button clicked");
};

// This will replace the previous handler
button.onclick = function () {
  console.log("Different handler");
};
```

## 🖱️ Mouse Events

### Click Events:

```javascript
const button = document.querySelector("#demo-button");
const output = document.querySelector("#output");

// Single click
button.addEventListener("click", (event) => {
  output.textContent = `Button clicked at coordinates (${event.clientX}, ${event.clientY})`;
});

// Double click
button.addEventListener("dblclick", (event) => {
  output.textContent = "Button double-clicked!";
});

// Right click (context menu)
button.addEventListener("contextmenu", (event) => {
  event.preventDefault(); // Prevent default context menu
  output.textContent = "Right-clicked!";
});
```

### Mouse Movement Events:

```javascript
const container = document.querySelector("#mouse-container");
const tracker = document.querySelector("#mouse-tracker");

// Mouse enters element
container.addEventListener("mouseenter", () => {
  container.style.backgroundColor = "lightblue";
  tracker.textContent = "Mouse entered container";
});

// Mouse leaves element
container.addEventListener("mouseleave", () => {
  container.style.backgroundColor = "white";
  tracker.textContent = "Mouse left container";
});

// Mouse moves within element
container.addEventListener("mousemove", (event) => {
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  tracker.textContent = `Mouse at (${Math.round(x)}, ${Math.round(y)})`;
});

// Mouse button pressed down
container.addEventListener("mousedown", (event) => {
  console.log(`Mouse button ${event.button} pressed down`);
  // 0 = left, 1 = middle, 2 = right
});

// Mouse button released
container.addEventListener("mouseup", (event) => {
  console.log(`Mouse button ${event.button} released`);
});
```

### Practical Mouse Example - Drawing App:

```javascript
class SimpleDrawingApp {
  constructor(canvasSelector) {
    this.canvas = document.querySelector(canvasSelector);
    this.ctx = this.canvas.getContext("2d");
    this.isDrawing = false;
    this.setupEvents();
  }

  setupEvents() {
    // Start drawing
    this.canvas.addEventListener("mousedown", (e) => {
      this.isDrawing = true;
      this.startDrawing(e);
    });

    // Draw line
    this.canvas.addEventListener("mousemove", (e) => {
      if (this.isDrawing) {
        this.draw(e);
      }
    });

    // Stop drawing
    this.canvas.addEventListener("mouseup", () => {
      this.isDrawing = false;
      this.ctx.beginPath(); // Start new path
    });

    // Stop drawing when mouse leaves canvas
    this.canvas.addEventListener("mouseleave", () => {
      this.isDrawing = false;
    });
  }

  startDrawing(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  draw(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// Usage
const drawingApp = new SimpleDrawingApp("#drawing-canvas");
```

## ⌨️ Keyboard Events

### Basic Keyboard Handling:

```javascript
const input = document.querySelector("#text-input");
const output = document.querySelector("#key-output");

// Key is pressed down
input.addEventListener("keydown", (event) => {
  console.log(`Key down: ${event.key} (Code: ${event.code})`);

  // Special key handling
  if (event.key === "Enter") {
    console.log("Enter key pressed!");
  }

  if (event.key === "Escape") {
    input.value = "";
    console.log("Input cleared with Escape");
  }

  // Modifier keys
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // Prevent browser save
    console.log("Ctrl+S pressed - Save action");
  }
});

// Key is released
input.addEventListener("keyup", (event) => {
  output.textContent = `Last key released: ${event.key}`;
});

// Input value changes (recommended for text input)
input.addEventListener("input", (event) => {
  const value = event.target.value;
  output.textContent = `Current input: "${value}" (${value.length} characters)`;
});
```

### Advanced Keyboard Shortcuts:

```javascript
class KeyboardShortcuts {
  constructor() {
    this.shortcuts = new Map();
    this.setupGlobalListener();
  }

  // Register a keyboard shortcut
  register(keys, callback, description = "") {
    const keyString = this.normalizeKeys(keys);
    this.shortcuts.set(keyString, { callback, description });
  }

  // Normalize key combination to consistent format
  normalizeKeys(keys) {
    const parts = keys
      .toLowerCase()
      .split("+")
      .map((k) => k.trim());
    const modifiers = [];
    let mainKey = "";

    parts.forEach((part) => {
      if (["ctrl", "alt", "shift", "meta"].includes(part)) {
        modifiers.push(part);
      } else {
        mainKey = part;
      }
    });

    return [...modifiers.sort(), mainKey].join("+");
  }

  // Setup global keyboard listener
  setupGlobalListener() {
    document.addEventListener("keydown", (event) => {
      const modifiers = [];
      if (event.ctrlKey) modifiers.push("ctrl");
      if (event.altKey) modifiers.push("alt");
      if (event.shiftKey) modifiers.push("shift");
      if (event.metaKey) modifiers.push("meta");

      const keyString = [...modifiers.sort(), event.key.toLowerCase()].join(
        "+"
      );

      if (this.shortcuts.has(keyString)) {
        event.preventDefault();
        this.shortcuts.get(keyString).callback(event);
      }
    });
  }

  // List all registered shortcuts
  listShortcuts() {
    console.log("Registered keyboard shortcuts:");
    this.shortcuts.forEach((data, keys) => {
      console.log(`${keys}: ${data.description}`);
    });
  }
}

// Usage
const shortcuts = new KeyboardShortcuts();

shortcuts.register(
  "ctrl+s",
  () => {
    console.log("Save action triggered");
  },
  "Save document"
);

shortcuts.register(
  "ctrl+shift+d",
  () => {
    console.log("Developer tools action");
  },
  "Open developer tools"
);

shortcuts.register(
  "alt+h",
  () => {
    console.log("Help menu opened");
  },
  "Show help"
);

// List all shortcuts
shortcuts.listShortcuts();
```

## 📝 Form Events

### Form Input Handling:

```javascript
const form = document.querySelector("#user-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submitButton = document.querySelector("#submit");

// Input validation as user types
nameInput.addEventListener("input", (event) => {
  const value = event.target.value;
  const isValid = value.length >= 2;

  event.target.classList.toggle("valid", isValid);
  event.target.classList.toggle("invalid", !isValid);

  updateSubmitButton();
});

emailInput.addEventListener("input", (event) => {
  const value = event.target.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailPattern.test(value);

  event.target.classList.toggle("valid", isValid);
  event.target.classList.toggle("invalid", !isValid);

  updateSubmitButton();
});

passwordInput.addEventListener("input", (event) => {
  const value = event.target.value;
  const isValid = value.length >= 8;

  event.target.classList.toggle("valid", isValid);
  event.target.classList.toggle("invalid", !isValid);

  updateSubmitButton();
});

// Focus and blur events
nameInput.addEventListener("focus", (event) => {
  event.target.parentElement.classList.add("focused");
});

nameInput.addEventListener("blur", (event) => {
  event.target.parentElement.classList.remove("focused");
});

// Update submit button state
function updateSubmitButton() {
  const allValid =
    nameInput.classList.contains("valid") &&
    emailInput.classList.contains("valid") &&
    passwordInput.classList.contains("valid");

  submitButton.disabled = !allValid;
  submitButton.textContent = allValid ? "Submit" : "Please complete form";
}

// Form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  console.log("Form submitted with data:", data);

  // Simulate form submission
  submitButton.textContent = "Submitting...";
  submitButton.disabled = true;

  setTimeout(() => {
    submitButton.textContent = "Submitted!";
    form.reset(); // Clear form

    setTimeout(() => {
      submitButton.textContent = "Submit";
      updateSubmitButton();
    }, 2000);
  }, 1500);
});
```

### Select and Checkbox Events:

```javascript
const categorySelect = document.querySelector("#category");
const optionsContainer = document.querySelector("#options");
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const selectAllCheckbox = document.querySelector("#select-all");

// Dropdown change
categorySelect.addEventListener("change", (event) => {
  const selectedCategory = event.target.value;
  console.log("Category changed to:", selectedCategory);

  // Show/hide options based on category
  if (selectedCategory === "premium") {
    optionsContainer.style.display = "block";
  } else {
    optionsContainer.style.display = "none";
  }
});

// Individual checkbox changes
allCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    console.log(
      `${event.target.name} is now ${
        event.target.checked ? "checked" : "unchecked"
      }`
    );
    updateSelectAllState();
  });
});

// Select all checkbox
selectAllCheckbox.addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  allCheckboxes.forEach((checkbox) => {
    if (checkbox !== selectAllCheckbox) {
      checkbox.checked = isChecked;
    }
  });
});

function updateSelectAllState() {
  const individualCheckboxes = Array.from(allCheckboxes).filter(
    (cb) => cb !== selectAllCheckbox
  );
  const checkedCount = individualCheckboxes.filter((cb) => cb.checked).length;

  if (checkedCount === 0) {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = false;
  } else if (checkedCount === individualCheckboxes.length) {
    selectAllCheckbox.checked = true;
    selectAllCheckbox.indeterminate = false;
  } else {
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = true;
  }
}
```

## 🪟 Window and Document Events

### Page Load Events:

```javascript
// DOM content loaded (HTML parsed, but images may still be loading)
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready!");
  // Initialize your app here
});

// Everything loaded (including images, stylesheets, etc.)
window.addEventListener("load", () => {
  console.log("Page fully loaded!");
  // Remove loading screens, etc.
});

// Before page unloads
window.addEventListener("beforeunload", (event) => {
  // Warn user about unsaved changes
  const hasUnsavedChanges = checkForUnsavedChanges();
  if (hasUnsavedChanges) {
    event.preventDefault();
    event.returnValue = ""; // Chrome requires this
    return "You have unsaved changes. Are you sure you want to leave?";
  }
});

function checkForUnsavedChanges() {
  // Check if user has made changes
  return document.querySelector("#has-changes").value === "true";
}
```

### Scroll Events:

```javascript
let scrollTimeout;
const scrollIndicator = document.querySelector("#scroll-indicator");
const backToTopButton = document.querySelector("#back-to-top");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Calculate scroll percentage
  const scrollPercentage =
    (scrollPosition / (documentHeight - windowHeight)) * 100;
  scrollIndicator.style.width = `${scrollPercentage}%`;

  // Show/hide back to top button
  if (scrollPosition > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }

  // Debounce scroll end detection
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    console.log("User stopped scrolling");
  }, 150);
});

// Back to top functionality
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
```

### Resize Events:

```javascript
let resizeTimeout;

window.addEventListener("resize", () => {
  // Debounce resize events
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    handleResize();
  }, 250);
});

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  console.log(`Window resized to: ${width}x${height}`);

  // Responsive behavior
  const sidebar = document.querySelector("#sidebar");
  if (width < 768) {
    sidebar.classList.add("mobile");
  } else {
    sidebar.classList.remove("mobile");
  }

  // Update canvas size
  const canvas = document.querySelector("#responsive-canvas");
  if (canvas) {
    canvas.width = width * 0.8;
    canvas.height = height * 0.6;
  }
}
```

## 🔗 Event Delegation

### Handling Dynamic Content:

```javascript
// Instead of adding listeners to each button individually
const container = document.querySelector("#dynamic-container");

// Add one listener to the container
container.addEventListener("click", (event) => {
  // Check if clicked element is a button
  if (event.target.matches("button.dynamic-btn")) {
    const buttonId = event.target.getAttribute("data-id");
    console.log(`Dynamic button ${buttonId} clicked`);

    // Handle the click
    handleDynamicButtonClick(event.target);
  }

  // Check for delete buttons
  if (event.target.matches(".delete-btn")) {
    const item = event.target.closest(".list-item");
    if (item) {
      item.remove();
    }
  }

  // Check for edit buttons
  if (event.target.matches(".edit-btn")) {
    const item = event.target.closest(".list-item");
    if (item) {
      toggleEditMode(item);
    }
  }
});

function handleDynamicButtonClick(button) {
  button.textContent = "Clicked!";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = "Click me";
    button.disabled = false;
  }, 1000);
}

function toggleEditMode(item) {
  const isEditing = item.classList.contains("editing");

  if (isEditing) {
    // Save changes
    const input = item.querySelector("input");
    const span = item.querySelector(".item-text");
    span.textContent = input.value;
    item.classList.remove("editing");
  } else {
    // Enter edit mode
    const span = item.querySelector(".item-text");
    const input = document.createElement("input");
    input.value = span.textContent;
    span.replaceWith(input);
    item.classList.add("editing");
    input.focus();
  }
}

// Function to add new dynamic content
function addDynamicItem(text) {
  const item = document.createElement("div");
  item.className = "list-item";
  item.innerHTML = `
        <span class="item-text">${text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
        <button class="dynamic-btn" data-id="${Date.now()}">Click me</button>
    `;

  container.appendChild(item);
}
```

## 🎮 Practical Example - Interactive Game

### Simple Memory Game:

```javascript
class MemoryGame {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.gameStarted = false;

    this.createGame();
    this.setupEvents();
  }

  createGame() {
    // Create 16 cards (8 pairs)
    const symbols = ["🎯", "🎪", "🎨", "🎭", "🎵", "🎸", "🎲", "🎮"];
    const cardData = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

    this.container.innerHTML = "";

    cardData.forEach((symbol, index) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.dataset.symbol = symbol;
      card.dataset.index = index;
      card.innerHTML = `
                <div class="card-front">?</div>
                <div class="card-back">${symbol}</div>
            `;

      this.container.appendChild(card);
      this.cards.push(card);
    });

    // Create UI
    this.createUI();
  }

  createUI() {
    const ui = document.createElement("div");
    ui.className = "game-ui";
    ui.innerHTML = `
            <div class="game-stats">
                <span>Moves: <span id="move-counter">0</span></span>
                <span>Time: <span id="time-counter">0:00</span></span>
            </div>
            <button id="reset-game">New Game</button>
        `;

    this.container.parentElement.insertBefore(ui, this.container);
    this.moveCounter = document.querySelector("#move-counter");
    this.timeCounter = document.querySelector("#time-counter");
    this.resetButton = document.querySelector("#reset-game");
  }

  setupEvents() {
    // Card click events
    this.container.addEventListener("click", (event) => {
      const card = event.target.closest(".memory-card");
      if (
        card &&
        !card.classList.contains("flipped") &&
        !card.classList.contains("matched")
      ) {
        this.flipCard(card);
      }
    });

    // Reset button
    this.resetButton.addEventListener("click", () => {
      this.resetGame();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (event) => {
      if (event.key === "r" && event.ctrlKey) {
        event.preventDefault();
        this.resetGame();
      }
    });
  }

  flipCard(card) {
    if (!this.gameStarted) {
      this.startGame();
    }

    card.classList.add("flipped");
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.moveCounter.textContent = this.moves;

      setTimeout(() => {
        this.checkMatch();
      }, 600);
    }
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
      // Match found
      card1.classList.add("matched");
      card2.classList.add("matched");
      this.matchedPairs++;

      if (this.matchedPairs === 8) {
        this.gameWon();
      }
    } else {
      // No match
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }

    this.flippedCards = [];
  }

  startGame() {
    this.gameStarted = true;
    this.startTime = Date.now();

    this.timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      this.timeCounter.textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }, 1000);
  }

  gameWon() {
    clearInterval(this.timer);

    setTimeout(() => {
      const elapsed = this.timeCounter.textContent;
      alert(`Congratulations! You won in ${this.moves} moves and ${elapsed}!`);
    }, 500);
  }

  resetGame() {
    clearInterval(this.timer);
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.gameStarted = false;
    this.moveCounter.textContent = "0";
    this.timeCounter.textContent = "0:00";

    this.createGame();
  }
}

// Initialize game
const memoryGame = new MemoryGame("#memory-game");
```

## 🎯 Key Concepts to Remember

1. **addEventListener()** is the preferred way to handle events
2. **Event objects** contain useful information about what happened
3. **event.preventDefault()** stops default browser behavior
4. **Event delegation** handles dynamic content efficiently
5. **Debouncing** prevents excessive event firing
6. **Form events** are crucial for user input validation
7. **Keyboard shortcuts** enhance user experience

## 🚀 What's Next?

Fantastic! You now know how to make web pages respond to user interactions. You can handle clicks, keyboard input, form submissions, and much more. Your pages are now truly interactive!

Next, we'll learn about **Creating Elements** - how to dynamically generate HTML content with JavaScript, build complex interfaces on the fly, and manage dynamic content efficiently. This completes your DOM manipulation toolkit!

---

🎪 **Your pages are now alive and interactive!** Event handling is what separates static websites from dynamic web applications. You now have the power to respond to any user action!
