# Selecting Elements - Finding What You Need 🎯

Welcome to **Element Selection** - the art of finding exactly the HTML elements you want to work with! This is like having a GPS for your webpage - you can navigate to any element precisely and efficiently.

## 🎯 CSS Selectors - Your Navigation System

### Basic Selectors:

```javascript
// Element type selector
const allParagraphs = document.querySelectorAll("p");
const allButtons = document.querySelectorAll("button");
const allImages = document.querySelectorAll("img");

// Class selector (most common)
const navItems = document.querySelectorAll(".nav-item");
const errorMessages = document.querySelectorAll(".error");
const activeElements = document.querySelectorAll(".active");

// ID selector (unique elements)
const header = document.querySelector("#main-header");
const loginForm = document.querySelector("#login-form");
const submitButton = document.querySelector("#submit-btn");

// Universal selector (all elements)
const allElements = document.querySelectorAll("*");
```

### Attribute Selectors:

```javascript
// Elements with specific attributes
const requiredInputs = document.querySelectorAll("[required]");
const externalLinks = document.querySelectorAll('[target="_blank"]');
const hiddenElements = document.querySelectorAll("[hidden]");

// Attribute value matching
const emailInputs = document.querySelectorAll('input[type="email"]');
const submitButtons = document.querySelectorAll('button[type="submit"]');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Partial attribute matching
const dataElements = document.querySelectorAll("[data-id]"); // Has data-id
const imageFiles = document.querySelectorAll('img[src$=".jpg"]'); // Ends with .jpg
const internalLinks = document.querySelectorAll('a[href^="/"]'); // Starts with /
const searchInputs = document.querySelectorAll('input[name*="search"]'); // Contains "search"
```

### Pseudo Selectors:

```javascript
// Structural pseudo-classes
const firstChild = document.querySelector("li:first-child");
const lastChild = document.querySelector("li:last-child");
const oddRows = document.querySelectorAll("tr:nth-child(odd)");
const evenRows = document.querySelectorAll("tr:nth-child(even)");
const thirdItem = document.querySelector("li:nth-child(3)");

// State pseudo-classes
const checkedBoxes = document.querySelectorAll("input:checked");
const disabledInputs = document.querySelectorAll("input:disabled");
const focusedElement = document.querySelector(":focus");
const hoveredElements = document.querySelectorAll(":hover");

// Content pseudo-classes
const emptyDivs = document.querySelectorAll("div:empty");
const nonEmptyDivs = document.querySelectorAll("div:not(:empty)");
```

## 🔗 Combining Selectors

### Descendant and Child Selectors:

```javascript
// Descendant selector (space) - any level deep
const headerLinks = document.querySelectorAll("header a");
const navButtons = document.querySelectorAll(".navigation button");
const formInputs = document.querySelectorAll("form input");

// Child selector (>) - direct children only
const directChildItems = document.querySelectorAll(".menu > li");
const directChildButtons = document.querySelectorAll(".toolbar > button");

// Adjacent sibling selector (+) - immediately following
const labeledInputs = document.querySelectorAll("label + input");
const buttonFollowingInput = document.querySelectorAll("input + button");

// General sibling selector (~) - any following sibling
const siblingParagraphs = document.querySelectorAll("h2 ~ p");
```

### Multiple Selectors:

```javascript
// Multiple classes (AND condition)
const activeMenuItems = document.querySelectorAll(".menu-item.active");
const errorInputs = document.querySelectorAll(".input.error");
const highlightedButtons = document.querySelectorAll(
  ".button.highlighted.primary"
);

// Multiple selectors (OR condition)
const interactiveElements = document.querySelectorAll(
  "button, input, select, textarea"
);
const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
const formElements = document.querySelectorAll(
  ".form-group, .input-wrapper, .form-control"
);

// Complex combinations
const activeFormButtons = document.querySelectorAll(
  'form .button.active, form input[type="submit"]'
);
```

## 🎯 Advanced Selection Techniques

### Selection by Data Attributes:

```javascript
// Select by data attributes
const userCards = document.querySelectorAll("[data-user-id]");
const productItems = document.querySelectorAll(
  '[data-product-type="electronics"]'
);
const priorityTasks = document.querySelectorAll('[data-priority="high"]');

// Dynamic data attribute selection
function selectByDataAttribute(attribute, value) {
  return document.querySelectorAll(`[data-${attribute}="${value}"]`);
}

// Usage examples
const highPriorityItems = selectByDataAttribute("priority", "high");
const electronicsProducts = selectByDataAttribute("category", "electronics");
const completedTasks = selectByDataAttribute("status", "completed");
```

### Contextual Selection:

```javascript
// Find elements within a specific container
const sidebar = document.querySelector("#sidebar");
const sidebarLinks = sidebar.querySelectorAll("a"); // Only links in sidebar
const sidebarButtons = sidebar.querySelectorAll("button"); // Only buttons in sidebar

// Function to find elements within context
function findInContext(container, selector) {
  if (typeof container === "string") {
    container = document.querySelector(container);
  }
  return container ? container.querySelectorAll(selector) : [];
}

// Usage examples
const modalButtons = findInContext("#modal", "button");
const formInputs = findInContext(".user-form", "input");
const tableRows = findInContext("#data-table", "tbody tr");
```

### Dynamic Selector Building:

```javascript
// Build selectors dynamically
function buildSelector(options) {
  let selector = options.element || "*";

  if (options.class) {
    selector += `.${options.class}`;
  }

  if (options.id) {
    selector += `#${options.id}`;
  }

  if (options.attributes) {
    for (let [attr, value] of Object.entries(options.attributes)) {
      selector += `[${attr}="${value}"]`;
    }
  }

  if (options.pseudo) {
    selector += `:${options.pseudo}`;
  }

  return selector;
}

// Usage examples
const selector1 = buildSelector({
  element: "input",
  class: "form-control",
  attributes: { type: "text", required: "" },
});
// Result: 'input.form-control[type="text"][required=""]'

const selector2 = buildSelector({
  element: "li",
  class: "menu-item",
  pseudo: "first-child",
});
// Result: 'li.menu-item:first-child'

const elements = document.querySelectorAll(selector1);
```

## 🚀 Practical Selection Examples

### Example 1: Form Validation Helper

```javascript
class FormSelector {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (!this.form) {
      throw new Error(`Form not found: ${formSelector}`);
    }
  }

  // Get all inputs by type
  getInputsByType(type) {
    return this.form.querySelectorAll(`input[type="${type}"]`);
  }

  // Get required fields
  getRequiredFields() {
    return this.form.querySelectorAll("[required]");
  }

  // Get invalid fields
  getInvalidFields() {
    return this.form.querySelectorAll(":invalid");
  }

  // Get fields with errors
  getErrorFields() {
    return this.form.querySelectorAll(".error, .invalid");
  }

  // Get all form controls
  getAllControls() {
    return this.form.querySelectorAll("input, select, textarea, button");
  }

  // Get specific field by name
  getField(name) {
    return this.form.querySelector(`[name="${name}"]`);
  }

  // Get fields by group
  getFieldGroup(groupName) {
    return this.form.querySelectorAll(`[data-group="${groupName}"]`);
  }

  // Validate form
  validateForm() {
    const requiredFields = this.getRequiredFields();
    const invalidFields = [];

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        invalidFields.push(field);
        field.classList.add("error");
      } else {
        field.classList.remove("error");
      }
    });

    return {
      isValid: invalidFields.length === 0,
      invalidFields: invalidFields,
      invalidCount: invalidFields.length,
    };
  }
}

// Usage
const loginForm = new FormSelector("#login-form");

// Get specific input types
const textInputs = loginForm.getInputsByType("text");
const passwordInputs = loginForm.getInputsByType("password");
const emailInputs = loginForm.getInputsByType("email");

// Validate the form
const validation = loginForm.validateForm();
console.log("Form is valid:", validation.isValid);
console.log("Invalid fields:", validation.invalidFields);
```

### Example 2: Dynamic Content Manager

```javascript
class ContentSelector {
  // Select elements by visibility
  static getVisibleElements(selector = "*") {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter((el) => {
      const style = window.getComputedStyle(el);
      return style.display !== "none" && style.visibility !== "hidden";
    });
  }

  // Select elements by text content
  static getElementsByText(text, selector = "*") {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter((el) =>
      el.textContent.toLowerCase().includes(text.toLowerCase())
    );
  }

  // Select empty elements
  static getEmptyElements(selector = "*") {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter(
      (el) => !el.textContent.trim() && el.children.length === 0
    );
  }

  // Select elements with specific dimensions
  static getElementsBySize(minWidth = 0, minHeight = 0) {
    const elements = document.querySelectorAll("*");
    return Array.from(elements).filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width >= minWidth && rect.height >= minHeight;
    });
  }

  // Select elements within viewport
  static getVisibleInViewport(selector = "*") {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).filter((el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    });
  }

  // Select parent elements containing specific children
  static getParentsWithChildren(childSelector) {
    const children = document.querySelectorAll(childSelector);
    const parents = new Set();

    children.forEach((child) => {
      if (child.parentElement) {
        parents.add(child.parentElement);
      }
    });

    return Array.from(parents);
  }
}

// Usage examples
const visibleButtons = ContentSelector.getVisibleElements("button");
const elementsWithText = ContentSelector.getElementsByText("Click here");
const emptyDivs = ContentSelector.getEmptyElements("div");
const largeElements = ContentSelector.getElementsBySize(300, 200);
const viewportElements = ContentSelector.getVisibleInViewport(".card");
const parentsWithButtons = ContentSelector.getParentsWithChildren("button");

console.log("Found:", {
  visibleButtons: visibleButtons.length,
  elementsWithText: elementsWithText.length,
  emptyDivs: emptyDivs.length,
  largeElements: largeElements.length,
  viewportElements: viewportElements.length,
});
```

### Example 3: Table Data Selector

```javascript
class TableSelector {
  constructor(tableSelector) {
    this.table = document.querySelector(tableSelector);
    if (!this.table) {
      throw new Error(`Table not found: ${tableSelector}`);
    }
  }

  // Get headers
  getHeaders() {
    return this.table.querySelectorAll("thead th, tr:first-child th");
  }

  // Get all data rows (excluding header)
  getDataRows() {
    return this.table.querySelectorAll("tbody tr, tr:not(:first-child)");
  }

  // Get specific column by index
  getColumn(columnIndex) {
    return this.table.querySelectorAll(
      `td:nth-child(${columnIndex + 1}), th:nth-child(${columnIndex + 1})`
    );
  }

  // Get specific row by index
  getRow(rowIndex) {
    const rows = this.getDataRows();
    return rows[rowIndex] ? rows[rowIndex].querySelectorAll("td") : [];
  }

  // Get cell by row and column
  getCell(rowIndex, columnIndex) {
    const row = this.getDataRows()[rowIndex];
    return row ? row.querySelector(`td:nth-child(${columnIndex + 1})`) : null;
  }

  // Find rows with specific text in any column
  findRowsByText(searchText) {
    const rows = this.getDataRows();
    return Array.from(rows).filter((row) =>
      row.textContent.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Find rows with specific value in specific column
  findRowsByColumnValue(columnIndex, value) {
    const rows = this.getDataRows();
    return Array.from(rows).filter((row) => {
      const cell = row.querySelector(`td:nth-child(${columnIndex + 1})`);
      return cell && cell.textContent.trim() === value;
    });
  }

  // Get all data as array of objects
  getData() {
    const headers = Array.from(this.getHeaders()).map((th) =>
      th.textContent.trim()
    );
    const rows = this.getDataRows();

    return Array.from(rows).map((row) => {
      const cells = row.querySelectorAll("td");
      const rowData = {};

      cells.forEach((cell, index) => {
        const header = headers[index] || `column_${index}`;
        rowData[header] = cell.textContent.trim();
      });

      return rowData;
    });
  }

  // Sort table by column
  sortByColumn(columnIndex, ascending = true) {
    const rows = Array.from(this.getDataRows());
    const tbody = this.table.querySelector("tbody") || this.table;

    rows.sort((a, b) => {
      const aValue = a
        .querySelector(`td:nth-child(${columnIndex + 1})`)
        .textContent.trim();
      const bValue = b
        .querySelector(`td:nth-child(${columnIndex + 1})`)
        .textContent.trim();

      // Try to sort as numbers first
      const aNum = parseFloat(aValue);
      const bNum = parseFloat(bValue);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return ascending ? aNum - bNum : bNum - aNum;
      }

      // Sort as strings
      return ascending
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    // Re-append sorted rows
    rows.forEach((row) => tbody.appendChild(row));
  }

  // Filter table rows
  filterRows(filterFunction) {
    const rows = this.getDataRows();

    rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll("td")).map((td) =>
        td.textContent.trim()
      );
      const shouldShow = filterFunction(cells, row);

      row.style.display = shouldShow ? "" : "none";
    });
  }
}

// Usage example
const userTable = new TableSelector("#users-table");

// Get table data
const headers = userTable.getHeaders();
const allData = userTable.getData();
console.log("Table data:", allData);

// Find specific data
const johnRows = userTable.findRowsByText("John");
const adminUsers = userTable.findRowsByColumnValue(2, "Admin"); // Column 2 = Role

// Sort by name (column 0)
userTable.sortByColumn(0, true);

// Filter to show only active users
userTable.filterRows((cells, row) => {
  const status = cells[3]; // Column 3 = Status
  return status === "Active";
});
```

## ⚡ Performance Tips

### Efficient Selection:

```javascript
// Good: Cache frequently used elements
const sidebar = document.querySelector("#sidebar");
const sidebarButtons = sidebar.querySelectorAll("button");
const sidebarLinks = sidebar.querySelectorAll("a");

// Bad: Repeated queries
for (let i = 0; i < 10; i++) {
  document.querySelector("#sidebar").style.color = "red"; // Wasteful!
}

// Good: Query once, use many times
const sidebar = document.querySelector("#sidebar");
for (let i = 0; i < 10; i++) {
  sidebar.style.color = "red";
}
```

### Batch Operations:

```javascript
// Bad: Multiple style changes (causes multiple reflows)
element.style.width = "100px";
element.style.height = "100px";
element.style.backgroundColor = "red";

// Good: Batch style changes
element.style.cssText = "width: 100px; height: 100px; background-color: red;";

// Or use classes
element.className = "styled-element";
```

### Use Specific Selectors:

```javascript
// Slower: Very broad search
const buttons = document
  .querySelectorAll("*")
  .filter((el) => el.tagName === "BUTTON");

// Faster: Specific selector
const buttons = document.querySelectorAll("button");

// Even faster: Scoped search
const formButtons = document.querySelector("#form").querySelectorAll("button");
```

## ⚠️ Common Selection Mistakes

### 1. Not Checking if Elements Exist:

```javascript
// Wrong: Assuming element exists
const button = document.querySelector("#my-button");
button.addEventListener("click", handleClick); // Error if button is null

// Right: Check first
const button = document.querySelector("#my-button");
if (button) {
  button.addEventListener("click", handleClick);
}
```

### 2. Confusing querySelectorAll with getElementsBy\*:

```javascript
// querySelectorAll returns static NodeList
const buttons1 = document.querySelectorAll("button");
document.body.appendChild(newButton); // New button won't be in buttons1

// getElementsByTagName returns live HTMLCollection
const buttons2 = document.getElementsByTagName("button");
document.body.appendChild(newButton); // New button will be in buttons2
```

### 3. Inefficient Nested Queries:

```javascript
// Inefficient: Querying from document every time
const items = document.querySelectorAll(".item");
items.forEach((item) => {
  const button = document.querySelector(`#item-${item.id} button`); // Slow!
});

// Better: Query within context
const items = document.querySelectorAll(".item");
items.forEach((item) => {
  const button = item.querySelector("button"); // Much faster!
});
```

## 🎯 Key Concepts to Remember

1. **querySelector** returns first match, **querySelectorAll** returns all matches
2. **CSS selectors** work exactly like in CSS stylesheets
3. **Context matters** - search within specific containers for better performance
4. **Cache frequently used** element references
5. **Check if elements exist** before using them
6. **Use specific selectors** rather than broad searches
7. **Combine selectors** for precise targeting

## 🚀 What's Next?

Excellent! You now have powerful tools to find any element on a webpage. You can target elements by type, class, ID, attributes, position, and even complex combinations.

Next, we'll learn about **Event Handling** - how to make your webpage respond to user interactions like clicks, keyboard input, mouse movements, and more. This is where your static pages become truly interactive!

---

🎯 **You're now a DOM navigation expert!** These selection skills are fundamental to all interactive web development. Every click handler, form validator, and dynamic update starts with selecting the right elements!
