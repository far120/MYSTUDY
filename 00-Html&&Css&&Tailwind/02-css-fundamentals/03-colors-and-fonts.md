# 📖 Colors and Fonts - Making Text Look Amazing

**Time to make your text beautiful!** Colors and fonts are the foundation of great-looking websites. Let's learn how to style text like a professional designer.

## 🎨 Working with Colors

### Color Names

CSS recognizes 140 color names:

```css
h1 {
  color: red;
  background-color: lightblue;
}

p {
  color: darkgreen;
}

.highlight {
  background-color: yellow;
}
```

**Popular color names:** red, blue, green, yellow, orange, purple, pink, brown, black, white, gray

### Hex Colors

Hex codes give you millions of color options:

```css
h1 {
  color: #ff0000; /* Red */
  background-color: #0066cc; /* Blue */
}

p {
  color: #333333; /* Dark gray */
}

.highlight {
  background-color: #ffff00; /* Yellow */
}
```

**Understanding hex codes:**

- `#` followed by 6 characters
- First 2 = Red, Middle 2 = Green, Last 2 = Blue
- `00` = none, `ff` = maximum

### RGB Colors

Specify colors using red, green, blue values (0-255):

```css
h1 {
  color: rgb(255, 0, 0); /* Red */
}

p {
  color: rgb(51, 51, 51); /* Dark gray */
}

.highlight {
  background-color: rgb(255, 255, 0); /* Yellow */
}
```

### RGBA Colors (with transparency)

Add an alpha channel for transparency (0.0 to 1.0):

```css
.overlay {
  background-color: rgba(0, 0, 0, 0.5); /* 50% transparent black */
}

.highlight {
  background-color: rgba(255, 255, 0, 0.3); /* 30% transparent yellow */
}
```

## ✏️ Font Properties

### Font Family

Choose which fonts to use:

```css
/* Single font */
h1 {
  font-family: Arial;
}

/* Font stack (fallbacks) */
p {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

/* Generic families */
.serif-text {
  font-family: serif; /* Times, Georgia */
}

.sans-serif-text {
  font-family: sans-serif; /* Arial, Helvetica */
}

.monospace-text {
  font-family: monospace; /* Courier, Monaco */
}
```

### Font Size

Control how big or small text appears:

```css
h1 {
  font-size: 32px; /* Large heading */
}

h2 {
  font-size: 24px; /* Medium heading */
}

p {
  font-size: 16px; /* Body text */
}

.small-text {
  font-size: 12px; /* Small text */
}

.responsive-text {
  font-size: 2em; /* Relative to parent */
}
```

### Font Weight

Control how thick or thin text appears:

```css
.light {
  font-weight: 300; /* Light */
}

.normal {
  font-weight: normal; /* Normal (400) */
}

.bold {
  font-weight: bold; /* Bold (700) */
}

.extra-bold {
  font-weight: 900; /* Extra bold */
}
```

### Font Style

Add italic or oblique styling:

```css
.italic {
  font-style: italic;
}

.oblique {
  font-style: oblique;
}

.normal {
  font-style: normal;
}
```

## 📝 Text Properties

### Text Alignment

Control where text sits:

```css
.center {
  text-align: center;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.justify {
  text-align: justify; /* Spreads text evenly */
}
```

### Text Decoration

Add lines to text:

```css
.underline {
  text-decoration: underline;
}

.strikethrough {
  text-decoration: line-through;
}

.no-decoration {
  text-decoration: none; /* Remove link underlines */
}

.overline {
  text-decoration: overline;
}
```

### Text Transform

Change text case:

```css
.uppercase {
  text-transform: uppercase; /* ALL CAPS */
}

.lowercase {
  text-transform: lowercase; /* all lowercase */
}

.capitalize {
  text-transform: capitalize; /* First Letter Of Each Word */
}
```

### Line Height

Control spacing between lines:

```css
p {
  line-height: 1.5; /* 1.5 times the font size */
}

.tight {
  line-height: 1.2; /* Closer together */
}

.loose {
  line-height: 2; /* Spread apart */
}
```

### Letter Spacing

Control spacing between letters:

```css
.spaced {
  letter-spacing: 2px; /* Extra space between letters */
}

.tight {
  letter-spacing: -1px; /* Closer together */
}

.normal {
  letter-spacing: normal;
}
```

## 🎨 Creating Beautiful Text Styles

### Hero Heading

```css
.hero-title {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 48px;
  font-weight: 300;
  color: #2c3e50;
  text-align: center;
  line-height: 1.2;
  margin-bottom: 20px;
}
```

### Article Text

```css
.article-text {
  font-family: Georgia, serif;
  font-size: 18px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 15px;
}
```

### Button Text

```css
.button-text {
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: white;
}
```

### Quote Text

```css
.quote {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
  color: #666;
  text-align: center;
  line-height: 1.4;
}
```

## 🛠️ Hands-On Practice

Create a new HTML file called `text-styling.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Text Styling Practice</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 40px;
        background-color: #f4f4f4;
      }

      .hero {
        background-color: #3498db;
        color: white;
        padding: 40px;
        text-align: center;
        margin-bottom: 30px;
      }

      .hero h1 {
        font-size: 42px;
        font-weight: 300;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .hero p {
        font-size: 18px;
        margin: 10px 0 0 0;
        opacity: 0.9;
      }

      .content {
        background-color: white;
        padding: 30px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .content h2 {
        color: #2c3e50;
        font-size: 28px;
        margin-bottom: 15px;
        border-bottom: 2px solid #3498db;
        padding-bottom: 5px;
      }

      .intro {
        font-size: 20px;
        color: #7f8c8d;
        font-style: italic;
        margin-bottom: 20px;
      }

      .highlight {
        background-color: #f39c12;
        color: white;
        padding: 2px 5px;
        border-radius: 3px;
      }

      .quote {
        background-color: #ecf0f1;
        border-left: 4px solid #3498db;
        padding: 20px;
        margin: 20px 0;
        font-style: italic;
        font-size: 18px;
        color: #555;
      }

      .small-caps {
        font-variant: small-caps;
        font-weight: bold;
        color: #8e44ad;
      }
    </style>
  </head>
  <body>
    <div class="hero">
      <h1>Typography Showcase</h1>
      <p>Exploring the power of CSS text styling</p>
    </div>

    <div class="content">
      <h2>Welcome to Beautiful Typography</h2>

      <p class="intro">
        This page demonstrates various text styling techniques that make
        websites look professional and engaging.
      </p>

      <p>
        Good typography is essential for web design. It affects
        <span class="highlight">readability</span>, user experience, and the
        overall aesthetic of your website. With CSS, you have complete control
        over how text appears to your visitors.
      </p>

      <div class="quote">
        "Typography is the voice of your content. Make sure it speaks clearly
        and beautifully."
      </div>

      <p>
        Remember that <span class="small-caps">consistency</span> is key when
        styling text. Choose a limited set of fonts and stick to them throughout
        your website.
      </p>
    </div>
  </body>
</html>
```

## 🌈 Color Palette Ideas

### Professional Blue

```css
/* Primary colors */
--primary: #3498db;
--dark: #2c3e50;
--light: #ecf0f1;
--text: #444;
```

### Warm Orange

```css
/* Warm colors */
--primary: #e67e22;
--dark: #d35400;
--light: #fdf2e9;
--text: #333;
```

### Nature Green

```css
/* Green colors */
--primary: #27ae60;
--dark: #1e8449;
--light: #e8f5e8;
--text: #2c3e50;
```

## 📱 Web-Safe Fonts

### Sans-Serif (Modern, Clean)

```css
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
font-family: "Segoe UI", Tahoma, Geneva, sans-serif;
font-family: "Lucida Grande", "Lucida Sans Unicode", sans-serif;
```

### Serif (Traditional, Elegant)

```css
font-family: Georgia, "Times New Roman", serif;
font-family: "Book Antiqua", Palatino, serif;
font-family: "Minion Pro", "Adobe Garamond Pro", serif;
```

### Monospace (Code, Technical)

```css
font-family: "Courier New", Courier, monospace;
font-family: "Monaco", "Menlo", monospace;
font-family: "Consolas", "Liberation Mono", monospace;
```

## ✅ Best Practices

### ✅ Choose Readable Fonts

```css
/* Good - easy to read */
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}
```

### ✅ Ensure Good Contrast

```css
/* Good contrast */
.text {
  color: #333; /* Dark text */
  background-color: white; /* Light background */
}
```

### ✅ Limit Font Choices

```css
/* Use 2-3 fonts maximum */
h1,
h2,
h3 {
  font-family: "Helvetica Neue", sans-serif;
}

body {
  font-family: Georgia, serif;
}

code {
  font-family: "Courier New", monospace;
}
```

### ✅ Scale Font Sizes Logically

```css
h1 {
  font-size: 32px;
}
h2 {
  font-size: 24px;
}
h3 {
  font-size: 20px;
}
p {
  font-size: 16px;
}
small {
  font-size: 14px;
}
```

## ✅ Mastery Checklist

Before moving on, make sure you can:

- [ ] Use different color formats (names, hex, RGB, RGBA)
- [ ] Choose and apply font families
- [ ] Control font size, weight, and style
- [ ] Align and transform text
- [ ] Adjust line height and letter spacing
- [ ] Create attractive text styles
- [ ] Ensure good readability and contrast

## 🎉 Amazing Progress!

You now know how to make text look professional and appealing! Your websites are going to look so much better.

## 🚀 Next Step

**Ready for spacing and layout?** Open `04-spacing-and-sizing.md` to learn how to control space and dimensions!
