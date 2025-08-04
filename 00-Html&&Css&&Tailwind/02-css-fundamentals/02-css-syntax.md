# 📖 CSS Syntax - How to Write CSS Code

**Great job getting started with CSS!** Now let's master the language and learn how to target exactly what you want to style.

## 🎯 CSS Syntax Structure

Every CSS rule follows this pattern:

```css
selector {
  property: value;
  property: value;
}
```

**Think of it like giving instructions:**

- **Selector** = "Hey, all the headings!"
- **Property** = "Change your color"
- **Value** = "to blue"

## 🔍 Types of Selectors

### 1. Element Selectors

Target HTML elements by their tag name:

```css
h1 {
  color: blue;
}

p {
  font-size: 16px;
}

img {
  width: 100%;
}
```

### 2. Class Selectors

Target elements with specific class attributes:

**HTML:**

```html
<p class="highlight">This paragraph is special</p>
<p class="highlight">This one too</p>
<p>This one is normal</p>
```

**CSS:**

```css
.highlight {
  background-color: yellow;
  font-weight: bold;
}
```

### 3. ID Selectors

Target a specific element with a unique ID:

**HTML:**

```html
<div id="header">This is the header</div>
```

**CSS:**

```css
#header {
  background-color: navy;
  color: white;
  padding: 20px;
}
```

### 4. Universal Selector

Target all elements:

```css
* {
  margin: 0;
  padding: 0;
}
```

## 🎨 Common CSS Properties

### Text Properties

```css
/* Font and text styling */
font-family: Arial, sans-serif;
font-size: 18px;
font-weight: bold;
color: #333;
text-align: center;
line-height: 1.5;
text-decoration: underline;
```

### Background Properties

```css
/* Background styling */
background-color: #f0f0f0;
background-image: url("image.jpg");
background-size: cover;
background-repeat: no-repeat;
```

### Spacing Properties

```css
/* Spacing and dimensions */
margin: 10px;
padding: 15px;
width: 100%;
height: 200px;
```

### Border Properties

```css
/* Border styling */
border: 1px solid #ccc;
border-radius: 5px;
border-color: blue;
border-width: 2px;
```

## 🔢 CSS Values and Units

### Colors

```css
/* Different ways to specify colors */
color: red; /* Color name */
color: #ff0000; /* Hex code */
color: rgb(255, 0, 0); /* RGB values */
color: rgba(255, 0, 0, 0.5); /* RGB with transparency */
```

### Sizes

```css
/* Different units for sizes */
font-size: 16px; /* Pixels (fixed) */
font-size: 1.2em; /* Relative to parent */
font-size: 1.2rem; /* Relative to root */
width: 50%; /* Percentage */
width: 100vw; /* Viewport width */
height: 100vh; /* Viewport height */
```

## 🎯 Combining Selectors

### Multiple Selectors (Same Style)

```css
h1,
h2,
h3 {
  color: navy;
  font-family: Arial, sans-serif;
}
```

### Descendant Selectors

```css
/* Style paragraphs only inside articles */
article p {
  font-size: 18px;
  line-height: 1.6;
}
```

### Child Selectors

```css
/* Style direct children only */
nav > ul {
  list-style: none;
}
```

## 💬 CSS Comments

Add notes to your CSS code:

```css
/* This is a single-line comment */

/*
This is a 
multi-line comment
for longer explanations
*/

h1 {
  color: blue; /* Inline comment */
}
```

## 🛠️ Hands-On Practice

Create a new CSS file called `practice.css` and try these exercises:

### Exercise 1: Basic Styling

```css
/* Style all headings */
h1,
h2,
h3 {
  color: #2c3e50;
  font-family: "Arial", sans-serif;
}

/* Style all paragraphs */
p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

/* Style all links */
a {
  color: #3498db;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
```

### Exercise 2: Using Classes

**Add these classes to your HTML:**

```html
<p class="intro">This is the introduction paragraph.</p>
<p class="highlight">This paragraph is highlighted.</p>
<button class="btn-primary">Click Me</button>
```

**Style them with CSS:**

```css
.intro {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.highlight {
  background-color: #f39c12;
  padding: 10px;
  border-radius: 5px;
}

.btn-primary {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
```

### Exercise 3: Using IDs

**Add an ID to your HTML:**

```html
<header id="main-header">
  <h1>My Website</h1>
</header>
```

**Style it with CSS:**

```css
#main-header {
  background-color: #34495e;
  color: white;
  padding: 20px;
  text-align: center;
}
```

## ⚠️ Common Mistakes to Avoid

### ❌ Forgetting semicolons

```css
h1 {
    color: blue    /* Missing semicolon! */
    font-size: 24px;
}
```

### ❌ Wrong selector syntax

```css
/* Wrong - missing dot for class */
highlight {
  background-color: yellow;
}

/* Correct */
.highlight {
  background-color: yellow;
}
```

### ❌ Mismatched braces

```css
h1 {
    color: blue;
/* Missing closing brace! */

p {
    font-size: 16px;
}
```

## 🔧 CSS Best Practices

### ✅ Use External Stylesheets

```html
<link rel="stylesheet" href="styles.css" />
```

### ✅ Organize Your CSS

```css
/* Reset styles */
* {
  margin: 0;
  padding: 0;
}

/* Typography */
h1,
h2,
h3 {
  font-family: Arial, sans-serif;
}

/* Layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Components */
.button {
  padding: 10px 20px;
  border-radius: 5px;
}
```

### ✅ Use Meaningful Class Names

```css
/* Good */
.navigation-menu {
}
.article-title {
}
.contact-form {
}

/* Bad */
.blue-text {
}
.big-box {
}
.style1 {
}
```

## 🎯 Quick Reference

```css
/* Element selector */
h1 {
}

/* Class selector */
.my-class {
}

/* ID selector */
#my-id {
}

/* Multiple selectors */
h1,
h2,
h3 {
}

/* Descendant selector */
article p {
}

/* Properties */
color: value;
background-color: value;
font-size: value;
margin: value;
padding: value;
```

## ✅ Mastery Checklist

Before moving on, make sure you can:

- [ ] Write basic CSS syntax correctly
- [ ] Use element, class, and ID selectors
- [ ] Apply colors, fonts, and spacing
- [ ] Link external CSS files to HTML
- [ ] Combine multiple selectors
- [ ] Add comments to CSS code
- [ ] Debug common CSS syntax errors

## 🎉 What You've Mastered

You now understand:

- ✅ CSS syntax and structure
- ✅ How to target specific HTML elements
- ✅ Different types of selectors and when to use them
- ✅ Common CSS properties and values
- ✅ Best practices for writing clean CSS

## 🚀 Next Step

**Ready for colors and fonts?** Open `03-colors-and-fonts.md` to make your text look amazing!
