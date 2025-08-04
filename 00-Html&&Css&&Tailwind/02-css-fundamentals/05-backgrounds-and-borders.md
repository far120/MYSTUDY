# 📖 Backgrounds and Borders - Adding Visual Appeal

**Time to make your elements beautiful!** Backgrounds and borders add visual interest and help organize your content. Let's learn how to create stunning visual effects.

## 🎨 Background Properties

### Background Colors

```css
.element {
  background-color: #3498db; /* Solid color */
  background-color: rgba(52, 152, 219, 0.5); /* Transparent */
  background-color: transparent; /* No background */
}
```

### Background Images

```css
.hero {
  background-image: url("hero-image.jpg");
  background-size: cover; /* Covers entire element */
  background-position: center; /* Centers the image */
  background-repeat: no-repeat; /* Don't repeat */
}

/* Multiple backgrounds */
.complex {
  background-image: url("overlay.png"), url("background.jpg");
  background-position: center, center;
  background-size: 100px 100px, cover;
}
```

### Background Size Options

```css
.image-bg {
  background-image: url("image.jpg");
}

.cover {
  background-size: cover; /* Fills container, may crop */
}

.contain {
  background-size: contain; /* Fits entirely, may have empty space */
}

.custom {
  background-size: 300px 200px; /* Exact dimensions */
}

.responsive {
  background-size: 100% auto; /* Full width, auto height */
}
```

### Background Position

```css
.positioned {
  background-position: center; /* Center both axes */
  background-position: top left; /* Top left corner */
  background-position: 50% 25%; /* 50% from left, 25% from top */
  background-position: center bottom; /* Centered horizontally, bottom */
}
```

## 🔲 Border Properties

### Basic Borders

```css
.bordered {
  border: 2px solid #333; /* Width style color */
  border-top: 1px solid #ddd; /* Individual sides */
  border-right: 3px dashed red;
  border-bottom: 2px dotted blue;
  border-left: 4px double green;
}
```

### Border Styles

```css
.border-styles {
  border: 3px solid black; /* Solid line */
  border: 3px dashed black; /* Dashed line */
  border: 3px dotted black; /* Dotted line */
  border: 3px double black; /* Double line */
  border: 3px groove black; /* 3D groove effect */
  border: 3px ridge black; /* 3D ridge effect */
  border: 3px inset black; /* 3D inset effect */
  border: 3px outset black; /* 3D outset effect */
}
```

### Rounded Corners

```css
.rounded {
  border-radius: 5px; /* All corners */
  border-radius: 10px 20px; /* Top-left/bottom-right, top-right/bottom-left */
  border-radius: 10px 20px 30px 40px; /* Top-left, top-right, bottom-right, bottom-left */
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Perfect circle */
}

.pill {
  border-radius: 25px; /* Pill shape */
}
```

## ✨ Advanced Visual Effects

### Box Shadows

```css
.shadowed {
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* x-offset y-offset blur color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Drop shadow */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); /* Inset shadow */
}

/* Multiple shadows */
.multi-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.1);
}
```

### Gradients

```css
/* Linear gradients */
.gradient-bg {
  background: linear-gradient(to right, #3498db, #2ecc71);
  background: linear-gradient(45deg, red, blue);
  background: linear-gradient(to bottom, #fff, #f0f0f0);
}

/* Radial gradients */
.radial-gradient {
  background: radial-gradient(circle, #3498db, #2c3e50);
  background: radial-gradient(ellipse at center, white, gray);
}

/* Multiple color stops */
.complex-gradient {
  background: linear-gradient(to right, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%);
}
```

## 🛠️ Practical Examples

### Card Component

```css
.card {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
```

### Hero Section

```css
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("hero-bg.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  text-align: center;
  padding: 100px 20px;
}
```

### Button Styles

```css
.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  color: white;
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
```

## 🎨 Hands-On Practice

Create `backgrounds-borders.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Backgrounds and Borders</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        padding: 20px;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .hero {
        background: linear-gradient(
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.9)
        );
        border-radius: 15px;
        padding: 60px 40px;
        text-align: center;
        margin-bottom: 40px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }

      .hero h1 {
        color: #2c3e50;
        font-size: 42px;
        margin-bottom: 20px;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        margin-bottom: 40px;
      }

      .card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }

      .card-header {
        height: 150px;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        position: relative;
      }

      .card-1 .card-header {
        background: linear-gradient(45deg, #667eea, #764ba2);
      }

      .card-2 .card-header {
        background: linear-gradient(45deg, #f093fb, #f5576c);
      }

      .card-3 .card-header {
        background: linear-gradient(45deg, #4facfe, #00f2fe);
      }

      .card-content {
        padding: 25px;
      }

      .card h3 {
        color: #2c3e50;
        margin-bottom: 15px;
        font-size: 22px;
      }

      .card p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 25px;
        color: white;
        padding: 12px 25px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
      }

      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
      }

      .showcase {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 40px;
      }

      .demo-box {
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        border-radius: 10px;
        margin-bottom: 10px;
      }

      .solid-bg {
        background-color: #e74c3c;
      }

      .gradient-bg {
        background: linear-gradient(45deg, #f39c12, #e67e22);
      }

      .shadow-box {
        background: white;
        color: #333;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }

      .border-demo {
        background: white;
        color: #333;
        border: 3px dashed #3498db;
      }

      .rounded-demo {
        background: #27ae60;
        border-radius: 50%;
      }

      .complex-demo {
        background: radial-gradient(
            circle at 20% 20%,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 50%
          ), linear-gradient(45deg, #9b59b6, #8e44ad);
        border: 2px solid #fff;
        box-shadow: 0 0 20px rgba(155, 89, 182, 0.5);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="hero">
        <h1>Backgrounds & Borders Showcase</h1>
        <p>Explore the power of CSS visual effects</p>
      </div>

      <div class="card-grid">
        <div class="card card-1">
          <div class="card-header"></div>
          <div class="card-content">
            <h3>Gradient Backgrounds</h3>
            <p>
              Beautiful gradient backgrounds create depth and visual interest in
              your designs.
            </p>
            <a href="#" class="btn">Learn More</a>
          </div>
        </div>

        <div class="card card-2">
          <div class="card-header"></div>
          <div class="card-content">
            <h3>Box Shadows</h3>
            <p>
              Subtle shadows add dimension and make elements appear to float
              above the page.
            </p>
            <a href="#" class="btn">Explore</a>
          </div>
        </div>

        <div class="card card-3">
          <div class="card-header"></div>
          <div class="card-content">
            <h3>Rounded Corners</h3>
            <p>
              Border-radius creates modern, friendly designs that feel more
              approachable.
            </p>
            <a href="#" class="btn">Discover</a>
          </div>
        </div>
      </div>

      <div class="showcase">
        <div>
          <div class="demo-box solid-bg">Solid Background</div>
          <p style="color: white; text-align: center;">
            background-color: #e74c3c;
          </p>
        </div>

        <div>
          <div class="demo-box gradient-bg">Linear Gradient</div>
          <p style="color: white; text-align: center;">
            linear-gradient(45deg, #f39c12, #e67e22)
          </p>
        </div>

        <div>
          <div class="demo-box shadow-box">Box Shadow</div>
          <p style="color: white; text-align: center;">
            box-shadow: 0 10px 25px rgba(0,0,0,0.2)
          </p>
        </div>

        <div>
          <div class="demo-box border-demo">Dashed Border</div>
          <p style="color: white; text-align: center;">
            border: 3px dashed #3498db
          </p>
        </div>

        <div>
          <div class="demo-box rounded-demo">50% Radius</div>
          <p style="color: white; text-align: center;">border-radius: 50%</p>
        </div>

        <div>
          <div class="demo-box complex-demo">Complex Effects</div>
          <p style="color: white; text-align: center;">
            Multiple gradients + shadow + border
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
```

## ✅ Mastery Checklist

Before moving on, make sure you can:

- [ ] Apply background colors and images
- [ ] Control background size and position
- [ ] Create borders with different styles
- [ ] Add rounded corners and shadows
- [ ] Create linear and radial gradients
- [ ] Combine multiple visual effects
- [ ] Make hover effects with transitions

## 🎉 Fantastic Progress!

You now know how to create beautiful visual effects with CSS! Your websites will look modern and professional.

## 🚀 Next Step

**Ready for the project?** Head to the `project-styled-webpage/` folder to transform your HTML page into something amazing!
