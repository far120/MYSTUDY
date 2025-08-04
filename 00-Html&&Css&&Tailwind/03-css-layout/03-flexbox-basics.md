# 🏹 Lesson 3: Flexbox Basics - Modern Layout Tool

**Flexbox is a game-changer!** It makes layouts that were once difficult now simple. Let's learn this essential modern CSS tool.

## 🤔 What is Flexbox?

**Flexbox** (Flexible Box Layout) is a layout method that:

- Arranges items in **rows or columns**
- Automatically **distributes space**
- **Aligns items** perfectly
- Makes **responsive design** easy

Think of flexbox like organizing items on a shelf - you can control spacing, alignment, and order!

## 🏗️ Basic Flexbox Setup

### Step 1: Create a Flex Container

```css
.container {
  display: flex; /* This makes it a flex container */
}
```

### Step 2: Flex Items Automatically Arrange

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>
```

## 🎯 Key Properties

### **Flex Direction** - Which way items flow

```css
.container {
  display: flex;
  flex-direction: row; /* Default: left to right */
  flex-direction: column; /* Top to bottom */
  flex-direction: row-reverse; /* Right to left */
  flex-direction: column-reverse; /* Bottom to top */
}
```

### **Justify Content** - Main axis alignment

```css
.container {
  display: flex;
  justify-content: flex-start; /* Left (default) */
  justify-content: center; /* Center */
  justify-content: flex-end; /* Right */
  justify-content: space-between; /* Spread out */
  justify-content: space-around; /* Equal space around */
}
```

### **Align Items** - Cross axis alignment

```css
.container {
  display: flex;
  align-items: stretch; /* Fill height (default) */
  align-items: flex-start; /* Top */
  align-items: center; /* Middle */
  align-items: flex-end; /* Bottom */
}
```

## 💻 Complete Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flexbox Basics</title>
    <style>
      .flex-container {
        display: flex;
        height: 200px;
        background-color: #f0f0f0;
        margin: 20px 0;
        padding: 10px;
      }

      .flex-item {
        background-color: lightblue;
        border: 2px solid blue;
        padding: 20px;
        margin: 5px;
        text-align: center;
      }

      /* Different flex containers for demonstration */
      .center-everything {
        justify-content: center;
        align-items: center;
      }

      .space-between {
        justify-content: space-between;
        align-items: center;
      }

      .column-layout {
        flex-direction: column;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <h2>Default Flexbox (row, flex-start)</h2>
    <div class="flex-container">
      <div class="flex-item">Item 1</div>
      <div class="flex-item">Item 2</div>
      <div class="flex-item">Item 3</div>
    </div>

    <h2>Centered Everything</h2>
    <div class="flex-container center-everything">
      <div class="flex-item">Centered!</div>
    </div>

    <h2>Space Between Items</h2>
    <div class="flex-container space-between">
      <div class="flex-item">Left</div>
      <div class="flex-item">Center</div>
      <div class="flex-item">Right</div>
    </div>

    <h2>Column Layout</h2>
    <div class="flex-container column-layout">
      <div class="flex-item">Top</div>
      <div class="flex-item">Middle</div>
      <div class="flex-item">Bottom</div>
    </div>
  </body>
</html>
```

## 🎯 Practice: Card Layout

Create a responsive card layout:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flex Cards</title>
    <style>
      .cards-container {
        display: flex;
        flex-wrap: wrap; /* Allow wrapping to new lines */
        gap: 20px; /* Space between cards */
        padding: 20px;
      }

      .card {
        flex: 1; /* Grow to fill space */
        min-width: 250px; /* Minimum width before wrapping */
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .card h3 {
        margin-top: 0;
        color: #333;
      }

      .card p {
        color: #666;
        line-height: 1.5;
      }
    </style>
  </head>
  <body>
    <div class="cards-container">
      <div class="card">
        <h3>Card 1</h3>
        <p>
          This is the first card. It contains some content and will flex to fill
          available space.
        </p>
      </div>
      <div class="card">
        <h3>Card 2</h3>
        <p>
          This is the second card with different content length to show how
          flexbox handles varying content sizes.
        </p>
      </div>
      <div class="card">
        <h3>Card 3</h3>
        <p>The third card demonstrates responsive behavior.</p>
      </div>
    </div>
  </body>
</html>
```

## 🔥 Common Flexbox Patterns

### **Perfect Centering:**

```css
.center-anything {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}
```

### **Header with Logo and Navigation:**

```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
```

### **Equal Height Columns:**

```css
.columns {
  display: flex;
  gap: 20px;
}

.column {
  flex: 1; /* Each column takes equal space */
}
```

## ✅ What You Learned

- ✅ Flexbox arranges items in rows or columns
- ✅ `display: flex` creates a flex container
- ✅ `justify-content` controls main axis alignment
- ✅ `align-items` controls cross axis alignment
- ✅ Flexbox makes centering easy
- ✅ Perfect for responsive card layouts

## 🚀 Next Step

**Ready for advanced flexbox?** Open `04-flexbox-advanced.md` to learn flex-grow, flex-shrink, and complex layouts!
