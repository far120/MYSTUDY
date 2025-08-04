# 🏢 Lesson 5: CSS Grid Introduction - Two-Dimensional Layouts

**CSS Grid is the most powerful layout system!** While flexbox is great for one-dimensional layouts (rows OR columns), Grid handles both dimensions at once.

## 🤔 What is CSS Grid?

**CSS Grid** creates a two-dimensional layout system:

- **Rows AND columns** at the same time
- **Precise control** over placement
- **Complex layouts** made simple
- **Responsive** by design

Think of Grid like a spreadsheet - you define rows and columns, then place items in specific cells!

## 🏗️ Basic Grid Setup

### Step 1: Create a Grid Container

```css
.container {
  display: grid;
}
```

### Step 2: Define Columns and Rows

```css
.grid-container {
  display: grid;
  grid-template-columns: 200px 200px 200px; /* 3 columns, 200px each */
  grid-template-rows: 100px 100px; /* 2 rows, 100px each */
  gap: 20px; /* Space between items */
}
```

## 💻 Basic Grid Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS Grid Basics</title>
    <style>
      .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr; /* 3 equal columns */
        grid-template-rows: 100px 100px; /* 2 rows, 100px each */
        gap: 20px;
        padding: 20px;
        background-color: #f0f0f0;
      }

      .grid-item {
        background-color: lightblue;
        border: 2px solid blue;
        padding: 20px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </head>
  <body>
    <div class="grid-container">
      <div class="grid-item">Item 1</div>
      <div class="grid-item">Item 2</div>
      <div class="grid-item">Item 3</div>
      <div class="grid-item">Item 4</div>
      <div class="grid-item">Item 5</div>
      <div class="grid-item">Item 6</div>
    </div>
  </body>
</html>
```

## 📏 Grid Units

### **fr (Fraction Units)** - Most useful!

```css
.grid {
  grid-template-columns: 1fr 2fr 1fr; /* Column 2 is twice as wide */
}
```

### **Fixed Units:**

```css
.grid {
  grid-template-columns: 200px 300px 100px; /* Fixed pixel widths */
}
```

### **Mixed Units:**

```css
.grid {
  grid-template-columns: 200px 1fr 100px; /* Fixed sides, flexible middle */
}
```

### **repeat() Function:**

```css
.grid {
  grid-template-columns: repeat(3, 1fr); /* Same as: 1fr 1fr 1fr */
  grid-template-columns: repeat(
    4,
    200px
  ); /* Same as: 200px 200px 200px 200px */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive! */
}
```

## 🎯 Website Layout Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grid Website Layout</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }

      .page-grid {
        display: grid;
        grid-template-areas:
          "header header header"
          "sidebar main main"
          "footer footer footer";
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 250px 1fr;
        min-height: 100vh;
        gap: 20px;
        padding: 20px;
      }

      .header {
        grid-area: header;
        background-color: #333;
        color: white;
        padding: 1rem;
        text-align: center;
      }

      .sidebar {
        grid-area: sidebar;
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
      }

      .main {
        grid-area: main;
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .footer {
        grid-area: footer;
        background-color: #333;
        color: white;
        padding: 1rem;
        text-align: center;
      }

      /* Content grid inside main area */
      .content-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }

      .card {
        background-color: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #007bff;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .page-grid {
          grid-template-areas:
            "header"
            "main"
            "sidebar"
            "footer";
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="page-grid">
      <header class="header">
        <h1>My Website</h1>
      </header>

      <aside class="sidebar">
        <h3>Navigation</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </aside>

      <main class="main">
        <h2>Welcome to My Site</h2>
        <p>
          This layout is created with CSS Grid and demonstrates how easy it is
          to create complex, responsive layouts.
        </p>

        <div class="content-grid">
          <div class="card">
            <h3>Feature 1</h3>
            <p>Description of the first feature.</p>
          </div>
          <div class="card">
            <h3>Feature 2</h3>
            <p>Description of the second feature.</p>
          </div>
          <div class="card">
            <h3>Feature 3</h3>
            <p>Description of the third feature.</p>
          </div>
          <div class="card">
            <h3>Feature 4</h3>
            <p>Description of the fourth feature.</p>
          </div>
        </div>
      </main>

      <footer class="footer">
        <p>&copy; 2025 My Website. All rights reserved.</p>
      </footer>
    </div>
  </body>
</html>
```

## 🌟 Grid Template Areas

**The most intuitive way to create layouts:**

```css
.grid {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
```

## 🔥 Common Grid Patterns

### **Photo Gallery:**

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

### **Dashboard Layout:**

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 200px;
  gap: 1rem;
}
```

### **Magazine Layout:**

```css
.magazine {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.article-main {
  grid-column: span 8;
}
.article-sidebar {
  grid-column: span 4;
}
```

## ✅ What You Learned

- ✅ CSS Grid creates two-dimensional layouts
- ✅ Define columns and rows with `grid-template`
- ✅ Use `fr` units for flexible sizing
- ✅ `grid-template-areas` makes layouts intuitive
- ✅ `repeat()` and `minmax()` create responsive grids
- ✅ Perfect for complex website layouts

## 🚀 Next Step

**Ready to build something amazing?** Let's create the **Photo Gallery Project** in `project-layout-gallery/`!

You now know the three essential layout methods: Box Model, Flexbox, and Grid. Time to put them all together! 💪
