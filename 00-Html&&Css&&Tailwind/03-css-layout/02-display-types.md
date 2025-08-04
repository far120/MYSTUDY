# 📱 Lesson 2: Display Types - Block vs Inline Elements

**Not all boxes behave the same way!** Some elements naturally take up full width, others flow with text. Let's learn the difference.

## 🧱 Block Elements

**Block elements:**

- Take up the **full width** available
- Start on a **new line**
- Stack **vertically** like boxes

**Common block elements:**

- `<div>`, `<p>`, `<h1>-<h6>`
- `<section>`, `<article>`, `<footer>`

```css
.block-element {
  display: block;
  width: 100%; /* Takes full width */
  margin: 10px 0; /* Adds vertical space */
}
```

## 🔤 Inline Elements

**Inline elements:**

- Only take up **space they need**
- Flow **with text**
- **Cannot** have width/height set

**Common inline elements:**

- `<span>`, `<a>`, `<strong>`, `<em>`
- `<img>`, `<input>`

```css
.inline-element {
  display: inline;
  /* width and height are ignored! */
}
```

## 🔀 Inline-Block Elements

**Best of both worlds:**

- Flow **with text** like inline
- **Accept** width/height like block

```css
.inline-block-element {
  display: inline-block;
  width: 150px; /* This works! */
  height: 50px; /* This works too! */
}
```

## 💻 Hands-On Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Display Types Demo</title>
    <style>
      .demo-container {
        padding: 20px;
        background-color: #f0f0f0;
      }

      .block-demo {
        display: block;
        background-color: lightblue;
        padding: 10px;
        margin: 5px 0;
      }

      .inline-demo {
        display: inline;
        background-color: lightgreen;
        padding: 10px;
        margin: 5px;
      }

      .inline-block-demo {
        display: inline-block;
        background-color: lightyellow;
        padding: 10px;
        margin: 5px;
        width: 120px;
        height: 50px;
      }
    </style>
  </head>
  <body>
    <div class="demo-container">
      <h2>Block Elements (stack vertically):</h2>
      <div class="block-demo">Block 1</div>
      <div class="block-demo">Block 2</div>
      <div class="block-demo">Block 3</div>

      <h2>Inline Elements (flow with text):</h2>
      <p>
        Here is some text with
        <span class="inline-demo">inline element 1</span> and
        <span class="inline-demo">inline element 2</span> flowing with the text.
      </p>

      <h2>Inline-Block Elements (flow but accept sizing):</h2>
      <div class="inline-block-demo">Box 1</div>
      <div class="inline-block-demo">Box 2</div>
      <div class="inline-block-demo">Box 3</div>
    </div>
  </body>
</html>
```

## 🎯 Practice: Navigation Menu

Create a horizontal navigation menu using inline-block:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Navigation Menu</title>
    <style>
      .nav-menu {
        background-color: #333;
        padding: 0;
        margin: 0;
        text-align: center;
      }

      .nav-item {
        display: inline-block;
        margin: 0;
        padding: 0;
      }

      .nav-link {
        display: inline-block;
        color: white;
        text-decoration: none;
        padding: 15px 20px;
        transition: background-color 0.3s;
      }

      .nav-link:hover {
        background-color: #555;
      }
    </style>
  </head>
  <body>
    <nav class="nav-menu">
      <div class="nav-item">
        <a href="#" class="nav-link">Home</a>
      </div>
      <div class="nav-item">
        <a href="#" class="nav-link">About</a>
      </div>
      <div class="nav-item">
        <a href="#" class="nav-link">Services</a>
      </div>
      <div class="nav-item">
        <a href="#" class="nav-link">Contact</a>
      </div>
    </nav>
  </body>
</html>
```

## ✅ What You Learned

- ✅ Block elements take full width and stack vertically
- ✅ Inline elements flow with text and can't be sized
- ✅ Inline-block combines the best of both
- ✅ You can change any element's display type
- ✅ Navigation menus often use inline-block

## 🚀 Next Step

**Ready for Flexbox?** Open `03-flexbox-basics.md` to learn modern layout techniques!
