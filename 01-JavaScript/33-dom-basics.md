# DOM Basics - Controlling Web Pages 🌐

Welcome to **DOM Manipulation** - where your JavaScript comes alive in the browser! The DOM (Document Object Model) is how JavaScript interacts with HTML and CSS to create dynamic, interactive web pages.

## 🤔 What is the DOM?

The **DOM** is like a family tree of your HTML page. Every HTML tag becomes an object that JavaScript can find, modify, and control.

### Real-World Analogy: Smart Home Control

```
Your HTML page = Your house
DOM = Smart home control system
JavaScript = Voice commands

"Hey JavaScript, turn on the living room lights!"
"Hey JavaScript, change the bedroom temperature!"
"Hey JavaScript, lock the front door!"
```

### DOM Tree Structure:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <div class="container">
      <p>Hello World</p>
      <button>Click Me</button>
    </div>
  </body>
</html>
```

JavaScript sees this as:

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        └── div.container
            ├── p
            └── button
```

## 🔍 Finding Elements

### Basic Selectors:

```javascript
// By ID (most specific)
const header = document.getElementById("main-header");
console.log("Found header:", header);

// By class name (returns collection)
const buttons = document.getElementsByClassName("btn");
console.log("Found buttons:", buttons.length);

// By tag name (returns collection)
const paragraphs = document.getElementsByTagName("p");
console.log("Found paragraphs:", paragraphs.length);

// Modern CSS selectors (recommended)
const firstButton = document.querySelector(".btn"); // First match
const allButtons = document.querySelectorAll(".btn"); // All matches

console.log("First button:", firstButton);
console.log("All buttons:", allButtons);
```

### CSS Selector Examples:

```javascript
// Class selector
const navItems = document.querySelectorAll(".nav-item");

// ID selector
const sidebar = document.querySelector("#sidebar");

// Attribute selector
const requiredInputs = document.querySelectorAll("input[required]");

// Descendant selector
const headerLinks = document.querySelectorAll("header a");

// Complex selectors
const activeNavLinks = document.querySelectorAll(".nav-item.active a");
const submitButtons = document.querySelectorAll('button[type="submit"]');
```

## 📝 Reading Element Properties

### Text Content:

```javascript
const title = document.querySelector("h1");

// Get text content (ignores HTML tags)
console.log("Title text:", title.textContent);

// Get inner HTML (includes HTML tags)
console.log("Title HTML:", title.innerHTML);

// Get outer HTML (includes the element itself)
console.log("Title outer HTML:", title.outerHTML);

// Example differences:
// <h1>Welcome <span>User</span></h1>
// textContent: "Welcome User"
// innerHTML: "Welcome <span>User</span>"
// outerHTML: "<h1>Welcome <span>User</span></h1>"
```

### Attributes:

```javascript
const image = document.querySelector("img");

// Get attributes
console.log("Image source:", image.src);
console.log("Image alt text:", image.alt);
console.log("Image class:", image.className);

// Get custom attributes
console.log("Data ID:", image.getAttribute("data-id"));

// Check if attribute exists
if (image.hasAttribute("data-lazy")) {
  console.log("Image has lazy loading");
}

// Get all attributes
for (let attr of image.attributes) {
  console.log(`${attr.name}: ${attr.value}`);
}
```

### Styles and Classes:

```javascript
const box = document.querySelector(".box");

// Check classes
console.log("Has active class:", box.classList.contains("active"));
console.log("All classes:", box.classList);

// Get computed styles
const styles = window.getComputedStyle(box);
console.log("Background color:", styles.backgroundColor);
console.log("Width:", styles.width);
console.log("Font size:", styles.fontSize);

// Check inline styles
console.log("Inline styles:", box.style.cssText);
```

## 🎨 Modifying Elements

### Changing Content:

```javascript
const message = document.querySelector("#message");

// Change text content
message.textContent = "Hello from JavaScript!";

// Change HTML content
message.innerHTML = "<strong>Bold message</strong> with <em>emphasis</em>";

// Safe HTML insertion (prevents XSS)
message.insertAdjacentText("beforeend", " - Added safely");
```

### Modifying Attributes:

```javascript
const button = document.querySelector("#submit-btn");

// Set attributes
button.setAttribute("disabled", true);
button.setAttribute("data-loading", "true");

// Remove attributes
button.removeAttribute("disabled");

// Toggle attributes
if (button.hasAttribute("disabled")) {
  button.removeAttribute("disabled");
} else {
  button.setAttribute("disabled", true);
}
```

### Working with Classes:

```javascript
const card = document.querySelector(".card");

// Add classes
card.classList.add("active");
card.classList.add("highlighted", "priority");

// Remove classes
card.classList.remove("inactive");

// Toggle classes
card.classList.toggle("expanded"); // Add if missing, remove if present

// Replace classes
card.classList.replace("old-style", "new-style");

// Check for classes
if (card.classList.contains("active")) {
  console.log("Card is active");
}
```

### Changing Styles:

```javascript
const element = document.querySelector(".box");

// Set individual styles
element.style.backgroundColor = "blue";
element.style.color = "white";
element.style.fontSize = "18px";
element.style.padding = "20px";

// Set multiple styles at once
element.style.cssText = "background: red; color: white; padding: 10px;";

// Remove styles
element.style.backgroundColor = ""; // Remove specific style
element.style.cssText = ""; // Remove all inline styles
```

## 🏗️ Creating and Removing Elements

### Creating New Elements:

```javascript
// Create new elements
const newDiv = document.createElement("div");
const newP = document.createElement("p");
const newButton = document.createElement("button");

// Set content and attributes
newDiv.className = "dynamic-content";
newP.textContent = "This paragraph was created with JavaScript!";
newButton.textContent = "Click Me";
newButton.setAttribute("type", "button");

// Build element structure
newDiv.appendChild(newP);
newDiv.appendChild(newButton);

// Add to page
document.body.appendChild(newDiv);
```

### Advanced Element Creation:

```javascript
function createUserCard(user) {
  // Create card structure
  const card = document.createElement("div");
  card.className = "user-card";

  // Create and add avatar
  const avatar = document.createElement("img");
  avatar.src = user.avatar || "default-avatar.png";
  avatar.alt = `${user.name}'s avatar`;
  avatar.className = "user-avatar";

  // Create and add name
  const name = document.createElement("h3");
  name.textContent = user.name;
  name.className = "user-name";

  // Create and add email
  const email = document.createElement("p");
  email.textContent = user.email;
  email.className = "user-email";

  // Create and add button
  const button = document.createElement("button");
  button.textContent = "Contact";
  button.className = "contact-btn";
  button.setAttribute("data-user-id", user.id);

  // Assemble card
  card.appendChild(avatar);
  card.appendChild(name);
  card.appendChild(email);
  card.appendChild(button);

  return card;
}

// Use the function
const user = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  avatar: "alice.jpg",
};

const userCard = createUserCard(user);
document.querySelector("#users-container").appendChild(userCard);
```

### Removing Elements:

```javascript
const elementToRemove = document.querySelector(".old-content");

// Method 1: Remove from parent
elementToRemove.parentNode.removeChild(elementToRemove);

// Method 2: Modern remove method
elementToRemove.remove();

// Remove all elements matching selector
const allOldElements = document.querySelectorAll(".outdated");
allOldElements.forEach((element) => element.remove());

// Clear container contents
const container = document.querySelector("#container");
container.innerHTML = ""; // Removes all children
```

## 🔄 Practical Examples

### Example 1: Dynamic Todo List

```javascript
function createTodoApp() {
  // Get container
  const container = document.querySelector("#todo-app");

  // Create input section
  const inputSection = document.createElement("div");
  inputSection.className = "input-section";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter a task...";
  input.className = "task-input";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Task";
  addButton.className = "add-btn";

  inputSection.appendChild(input);
  inputSection.appendChild(addButton);

  // Create todo list
  const todoList = document.createElement("ul");
  todoList.className = "todo-list";

  // Add to container
  container.appendChild(inputSection);
  container.appendChild(todoList);

  // Function to add task
  function addTask(taskText) {
    if (!taskText.trim()) return;

    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = taskText;
    span.className = "task-text";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    // Clear input
    input.value = "";
  }

  // Add click listener (we'll learn more about events next!)
  addButton.addEventListener("click", () => {
    addTask(input.value);
  });

  // Add enter key listener
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask(input.value);
    }
  });

  // Add delete functionality
  todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      e.target.parentElement.remove();
    }
  });
}

// Initialize the app
createTodoApp();
```

### Example 2: Image Gallery

```javascript
function createImageGallery(images) {
  const gallery = document.createElement("div");
  gallery.className = "image-gallery";

  images.forEach((image, index) => {
    // Create image container
    const container = document.createElement("div");
    container.className = "image-container";

    // Create image element
    const img = document.createElement("img");
    img.src = image.thumbnail;
    img.alt = image.title;
    img.className = "gallery-image";
    img.setAttribute("data-full-size", image.fullSize);
    img.setAttribute("data-index", index);

    // Create caption
    const caption = document.createElement("p");
    caption.textContent = image.title;
    caption.className = "image-caption";

    // Assemble container
    container.appendChild(img);
    container.appendChild(caption);
    gallery.appendChild(container);
  });

  return gallery;
}

// Create gallery with sample data
const galleryImages = [
  {
    title: "Sunset Beach",
    thumbnail: "sunset-thumb.jpg",
    fullSize: "sunset-full.jpg",
  },
  {
    title: "Mountain View",
    thumbnail: "mountain-thumb.jpg",
    fullSize: "mountain-full.jpg",
  },
  {
    title: "City Lights",
    thumbnail: "city-thumb.jpg",
    fullSize: "city-full.jpg",
  },
];

const gallery = createImageGallery(galleryImages);
document.body.appendChild(gallery);
```

### Example 3: Progress Bar System

```javascript
function createProgressBar(id, label, initialValue = 0) {
  const container = document.createElement("div");
  container.className = "progress-container";
  container.id = `progress-${id}`;

  // Create label
  const labelElement = document.createElement("label");
  labelElement.textContent = label;
  labelElement.className = "progress-label";

  // Create progress bar background
  const progressBg = document.createElement("div");
  progressBg.className = "progress-bg";

  // Create progress bar fill
  const progressFill = document.createElement("div");
  progressFill.className = "progress-fill";
  progressFill.style.width = `${initialValue}%`;

  // Create percentage text
  const percentage = document.createElement("span");
  percentage.className = "progress-percentage";
  percentage.textContent = `${initialValue}%`;

  // Assemble progress bar
  progressBg.appendChild(progressFill);
  container.appendChild(labelElement);
  container.appendChild(progressBg);
  container.appendChild(percentage);

  // Return object with methods to control the progress bar
  return {
    element: container,
    setValue: function (value) {
      value = Math.max(0, Math.min(100, value)); // Clamp between 0-100
      progressFill.style.width = `${value}%`;
      percentage.textContent = `${value}%`;

      // Add visual feedback
      if (value === 100) {
        container.classList.add("complete");
      } else {
        container.classList.remove("complete");
      }
    },
    getValue: function () {
      return parseInt(progressFill.style.width);
    },
    animate: function (targetValue, duration = 1000) {
      const startValue = this.getValue();
      const difference = targetValue - startValue;
      const startTime = Date.now();

      const animation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = startValue + difference * progress;
        this.setValue(Math.round(currentValue));

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      animation();
    },
  };
}

// Create multiple progress bars
const downloadProgress = createProgressBar("download", "Download Progress");
const uploadProgress = createProgressBar("upload", "Upload Progress");
const processingProgress = createProgressBar("processing", "Processing");

// Add to page
document.body.appendChild(downloadProgress.element);
document.body.appendChild(uploadProgress.element);
document.body.appendChild(processingProgress.element);

// Simulate progress updates
setTimeout(() => downloadProgress.animate(30), 500);
setTimeout(() => uploadProgress.animate(60), 1000);
setTimeout(() => processingProgress.animate(100), 1500);
```

## 🔍 Element Navigation

### Parent/Child Relationships:

```javascript
const element = document.querySelector(".current-element");

// Parent navigation
console.log("Parent:", element.parentElement);
console.log("Parent node:", element.parentNode);

// Child navigation
console.log("First child:", element.firstElementChild);
console.log("Last child:", element.lastElementChild);
console.log("All children:", element.children);
console.log("Child count:", element.childElementCount);

// Sibling navigation
console.log("Next sibling:", element.nextElementSibling);
console.log("Previous sibling:", element.previousElementSibling);
```

### Finding Related Elements:

```javascript
function highlightRelatedElements(element) {
  // Clear previous highlights
  document.querySelectorAll(".highlighted").forEach((el) => {
    el.classList.remove("highlighted");
  });

  // Highlight current element
  element.classList.add("highlighted", "current");

  // Highlight parent
  if (element.parentElement) {
    element.parentElement.classList.add("highlighted", "parent");
  }

  // Highlight children
  Array.from(element.children).forEach((child) => {
    child.classList.add("highlighted", "child");
  });

  // Highlight siblings
  if (element.nextElementSibling) {
    element.nextElementSibling.classList.add("highlighted", "sibling");
  }
  if (element.previousElementSibling) {
    element.previousElementSibling.classList.add("highlighted", "sibling");
  }
}
```

## ⚠️ Common DOM Mistakes

### 1. Querying Elements Before They Exist:

```javascript
// Wrong: Script in <head> before elements exist
console.log(document.querySelector("#my-button")); // null

// Right: Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  console.log(document.querySelector("#my-button")); // Found!
});

// Or put script at bottom of <body>
```

### 2. Not Checking if Elements Exist:

```javascript
// Wrong: Assuming element exists
const button = document.querySelector("#submit");
button.textContent = "Submit"; // Error if button is null

// Right: Check first
const button = document.querySelector("#submit");
if (button) {
  button.textContent = "Submit";
}
```

### 3. Inefficient DOM Queries:

```javascript
// Wrong: Querying same element repeatedly
for (let i = 0; i < 100; i++) {
  document.querySelector("#counter").textContent = i;
}

// Right: Query once, reuse reference
const counter = document.querySelector("#counter");
for (let i = 0; i < 100; i++) {
  counter.textContent = i;
}
```

## 🎯 Key Concepts to Remember

1. **DOM** = Document Object Model (HTML as JavaScript objects)
2. **querySelector/All** for modern element selection
3. **textContent** for text, **innerHTML** for HTML
4. **classList** for managing CSS classes
5. **createElement** and **appendChild** for dynamic content
6. **Always check** if elements exist before using them
7. **Cache DOM queries** for better performance

## 🚀 What's Next?

Great! You now understand how JavaScript can read and modify web pages. You can find elements, change their content, styles, and even create new elements dynamically.

Next, we'll learn about **Element Selection** - advanced techniques for finding exactly the elements you need, plus performance tips for working with large DOMs efficiently!

---

🌐 **You're now connected to the web!** This is where JavaScript becomes visible and interactive. Every website you use relies on these DOM manipulation techniques!
