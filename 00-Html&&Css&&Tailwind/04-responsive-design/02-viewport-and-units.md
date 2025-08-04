# 📐 Viewport and Responsive Units

## 🎯 Learning Objectives

By the end of this lesson, you'll understand:

- What the viewport is and how to control it
- Different CSS units and when to use them
- How to make measurements that scale with screen size
- Common responsive unit patterns

## 🔍 What is the Viewport?

The **viewport** is the visible area of a web page on the user's device. Think of it as the "window" through which users see your website.

### 📱 The Viewport Problem

Without proper viewport settings, mobile browsers try to show the "desktop version" by zooming out. This makes text tiny and hard to read.

### ✅ The Viewport Solution

Add this meta tag to your HTML `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**What this does:**

- `width=device-width`: Match the screen width
- `initial-scale=1.0`: Don't zoom in or out

### 🔧 Complete HTML Setup

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Website</title>
  </head>
  <body>
    <!-- Your content here -->
  </body>
</html>
```

## 📏 CSS Units Explained

### 🔢 Absolute Units (Fixed Size)

**px (pixels)** - Most common for fixed elements

```css
.border {
  border: 2px solid black; /* Always 2 pixels */
}
```

**Use for:** Borders, shadows, small fixed elements

### 📊 Relative Units (Responsive)

#### **% (Percentage)** - Relative to parent element

```css
.container {
  width: 80%; /* 80% of parent width */
}
```

#### **em** - Relative to parent font size

```css
.parent {
  font-size: 16px;
}

.child {
  font-size: 1.5em; /* 24px (16px × 1.5) */
  margin: 1em; /* 24px */
}
```

#### **rem** - Relative to root font size

```css
html {
  font-size: 16px; /* Root font size */
}

.heading {
  font-size: 2rem; /* 32px (16px × 2) */
  margin: 1rem; /* 16px */
}
```

### 🌟 Viewport Units (Screen-based)

#### **vw** - Viewport Width

```css
.hero {
  width: 100vw; /* Full screen width */
  font-size: 5vw; /* 5% of screen width */
}
```

#### **vh** - Viewport Height

```css
.hero {
  height: 100vh; /* Full screen height */
}
```

#### **vmin** - Smaller of vw or vh

```css
.square {
  width: 50vmin; /* 50% of smaller dimension */
  height: 50vmin;
}
```

#### **vmax** - Larger of vw or vh

```css
.background {
  font-size: 10vmax; /* 10% of larger dimension */
}
```

## 🎯 When to Use Each Unit

### 📱 For Mobile-First Design

| Element             | Recommended Unit | Why                   |
| ------------------- | ---------------- | --------------------- |
| **Font sizes**      | `rem`            | Consistent scaling    |
| **Margins/Padding** | `rem` or `%`     | Responsive spacing    |
| **Widths**          | `%` or `vw`      | Flexible layouts      |
| **Heights**         | `vh` or `auto`   | Screen-relative       |
| **Borders**         | `px`             | Crisp lines           |
| **Shadows**         | `px`             | Consistent appearance |

### 💻 Practical Examples

#### Responsive Typography

```css
/* Base font size */
html {
  font-size: 16px;
}

/* Responsive headings */
h1 {
  font-size: 2rem; /* 32px */
}

h2 {
  font-size: 1.5rem; /* 24px */
}

p {
  font-size: 1rem; /* 16px */
  line-height: 1.5; /* 24px */
}
```

#### Responsive Layout

```css
.container {
  width: 90%; /* Responsive width */
  max-width: 1200px; /* Don't get too wide */
  margin: 0 auto; /* Center it */
  padding: 1rem; /* Responsive padding */
}

.hero {
  height: 100vh; /* Full screen height */
  padding: 2rem 0; /* Responsive padding */
}
```

#### Responsive Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem; /* Responsive gap */
}
```

## 📐 Responsive Units Cheat Sheet

### ✅ Good Practices

```css
/* Typography */
font-size: rem; /* Scalable text */
line-height: unitless; /* 1.5 instead of 1.5rem */

/* Layout */
width: %; /* Flexible widths */
max-width: px or rem; /* Prevent too wide */
height: vh; /* Screen-relative heights */

/* Spacing */
margin: rem; /* Consistent spacing */
padding: rem or %; /* Responsive spacing */

/* Fixed elements */
border-width: px; /* Crisp borders */
box-shadow: px; /* Consistent shadows */
```

### ❌ Common Mistakes

```css
/* Don't use px for everything */
.bad {
  width: 800px; /* Fixed, not responsive */
  font-size: 24px; /* Doesn't scale */
  margin: 20px; /* Fixed spacing */
}

/* Don't use viewport units for small text */
.also-bad {
  font-size: 2vw; /* Too small on mobile */
}
```

## 🔧 Practical Exercise

Create a responsive card:

```css
.card {
  width: 90%; /* Responsive width */
  max-width: 400px; /* Don't get too wide */
  margin: 1rem auto; /* Center with spacing */
  padding: 1.5rem; /* Responsive padding */
  border-radius: 8px; /* Fixed radius */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Fixed shadow */
}

.card h2 {
  font-size: 1.5rem; /* Scalable heading */
  margin-bottom: 1rem; /* Responsive spacing */
}

.card p {
  font-size: 1rem; /* Base font size */
  line-height: 1.6; /* Good readability */
}
```

## ✅ Quick Check

**Test your understanding:**

1. What meta tag makes websites mobile-friendly?
2. What's the difference between `em` and `rem`?
3. When would you use `vh` units?
4. Why shouldn't you use `px` for font sizes?

## 🚀 What's Next?

In the next lesson, we'll learn about **media queries** - how to apply different styles for different screen sizes.

---

**💡 Key Takeaway:** Choose the right unit for the job - relative units for responsive elements, absolute units for fixed details.
