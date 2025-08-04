# 🚀 Lesson 4: Advanced Flexbox - Complex Layouts

**Take your flexbox skills to the next level!** Learn how to control item sizing, wrapping, and create professional layouts.

## 🎯 Advanced Flex Properties

### **Flex-Grow** - How much an item should grow

```css
.item {
  flex-grow: 1; /* Grow to fill available space */
  flex-grow: 2; /* Grow twice as much as other items */
  flex-grow: 0; /* Don't grow (default) */
}
```

### **Flex-Shrink** - How much an item should shrink

```css
.item {
  flex-shrink: 1; /* Shrink normally (default) */
  flex-shrink: 0; /* Don't shrink */
  flex-shrink: 2; /* Shrink twice as much */
}
```

### **Flex-Basis** - Initial size before growing/shrinking

```css
.item {
  flex-basis: 200px; /* Start at 200px wide */
  flex-basis: 25%; /* Start at 25% of container */
  flex-basis: auto; /* Use content size (default) */
}
```

### **Flex Shorthand** - All three properties at once

```css
.item {
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  flex: 0 0 200px; /* Don't grow/shrink, 200px wide */
  flex: 2 1 300px; /* Grow 2x, shrink 1x, start at 300px */
}
```

## 💻 Complete Layout Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Advanced Flexbox Layout</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Arial, sans-serif;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      /* Header */
      .header {
        background-color: #333;
        color: white;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .nav {
        display: flex;
        gap: 1rem;
      }

      .nav a {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.3s;
      }

      .nav a:hover {
        background-color: #555;
      }

      /* Main Content */
      .main {
        flex: 1; /* Take remaining space */
        display: flex;
        gap: 2rem;
        padding: 2rem;
      }

      .sidebar {
        flex: 0 0 250px; /* Fixed width sidebar */
        background-color: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
      }

      .content {
        flex: 1; /* Take remaining space */
        background-color: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      /* Cards in content area */
      .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 2rem;
      }

      .card {
        flex: 1 1 300px; /* Grow, shrink, min 300px */
        background-color: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #007bff;
      }

      /* Footer */
      .footer {
        background-color: #333;
        color: white;
        text-align: center;
        padding: 1rem;
        margin-top: auto;
      }

      /* Responsive behavior */
      @media (max-width: 768px) {
        .main {
          flex-direction: column;
        }

        .sidebar {
          flex: none;
        }

        .header {
          flex-direction: column;
          gap: 1rem;
        }
      }
    </style>
  </head>
  <body>
    <header class="header">
      <div class="logo">My Website</div>
      <nav class="nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </nav>
    </header>

    <main class="main">
      <aside class="sidebar">
        <h3>Sidebar</h3>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>
      </aside>

      <section class="content">
        <h1>Main Content</h1>
        <p>
          This is the main content area. It takes up the remaining space after
          the sidebar.
        </p>

        <div class="cards">
          <div class="card">
            <h3>Feature 1</h3>
            <p>Description of the first feature.</p>
          </div>
          <div class="card">
            <h3>Feature 2</h3>
            <p>
              Description of the second feature with more content to show
              flexible sizing.
            </p>
          </div>
          <div class="card">
            <h3>Feature 3</h3>
            <p>Description of the third feature.</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2025 My Website. All rights reserved.</p>
    </footer>
  </body>
</html>
```

## 🎯 Common Professional Patterns

### **Holy Grail Layout:**

```css
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header,
.footer {
  flex: none; /* Don't grow or shrink */
}

.main {
  flex: 1; /* Take remaining space */
  display: flex;
}

.sidebar-left,
.sidebar-right {
  flex: 0 0 200px; /* Fixed width */
}

.content {
  flex: 1; /* Fill remaining space */
}
```

### **Responsive Card Grid:**

```css
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 calc(33.333% - 1rem); /* 3 columns with gaps */
  min-width: 250px; /* Minimum before wrapping */
}

@media (max-width: 768px) {
  .card {
    flex: 1 1 calc(50% - 1rem); /* 2 columns on tablets */
  }
}

@media (max-width: 480px) {
  .card {
    flex: 1 1 100%; /* 1 column on phones */
  }
}
```

## ✅ What You Learned

- ✅ `flex-grow` controls how items expand
- ✅ `flex-shrink` controls how items contract
- ✅ `flex-basis` sets initial size
- ✅ `flex` shorthand combines all three
- ✅ Advanced layouts combine multiple flex containers
- ✅ Responsive design with media queries

## 🚀 Next Step

**Ready for CSS Grid?** Open `05-css-grid-intro.md` to learn two-dimensional layouts!
