# 🧱 Common HTML Elements - Building Blocks of the Web

**Now that you understand HTML structure, let's learn the building blocks!** These are the HTML elements you'll use every day to create content. Think of them as your web development toolbox.

## 🎯 What You'll Learn

By the end of this lesson, you'll master:

- Text elements (headings, paragraphs, formatting)
- Links that connect pages together
- Images that make pages visual
- Lists for organizing information
- The most essential HTML elements

## 📝 Text Elements

### Headings (H1 to H6)

Headings create hierarchy and structure in your content:

```html
<h1>Main Title (Biggest)</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Sub-subsection Title</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>
```

**Best practices:**

- Use only **ONE `<h1>`** per page (like a book title)
- Use headings **in order** (don't skip from h1 to h3)
- Think of them as **outline levels** in a document

### Paragraphs

For regular text content:

```html
<p>
  This is a paragraph of text. It can contain multiple sentences and will
  automatically wrap when the line gets too long for the container.
</p>

<p>
  This is another paragraph. Notice how paragraphs are separated by spacing.
</p>
```

### Text Formatting

Make text **bold**, _italic_, or highlighted:

```html
<p>This text is <strong>bold and important</strong>.</p>
<p>This text is <em>emphasized (italic)</em>.</p>
<p>This text is <mark>highlighted</mark>.</p>
<p>This text is <small>smaller</small> than normal.</p>
```

**Visual result:**

- **strong** = **bold text**
- **em** = _italic text_
- **mark** = ==highlighted text==
- **small** = smaller text

## 🔗 Links - Connecting the Web

Links are what make the web "web-like" - they connect pages together!

### Basic Link Syntax

```html
<a href="https://google.com">Visit Google</a>
```

**Parts breakdown:**

- `<a>` = anchor tag (creates a link)
- `href` = "hypertext reference" (where the link goes)
- Text between tags = what users see and click

### Different Types of Links

```html
<!-- Link to another website -->
<a href="https://google.com">External Link</a>

<!-- Link to another page on your site -->
<a href="about.html">About Page</a>

<!-- Link to email address -->
<a href="mailto:your.email@example.com">Send Email</a>

<!-- Link to phone number -->
<a href="tel:+1234567890">Call Us</a>

<!-- Link that opens in new tab -->
<a href="https://google.com" target="_blank">Open in New Tab</a>
```

## 🖼️ Images - Making Pages Visual

Images bring your web pages to life!

### Basic Image Syntax

```html
<img src="path/to/image.jpg" alt="Description of image" />
```

**Important parts:**

- `src` = source (where the image file is located)
- `alt` = alternative text (describes image for screen readers and if image fails to load)

### Image Examples

```html
<!-- Image from your website folder -->
<img src="my-photo.jpg" alt="Photo of John Smith" />

<!-- Image from the internet -->
<img src="https://example.com/image.jpg" alt="Beautiful sunset" />

<!-- Image in a subfolder -->
<img src="images/profile.jpg" alt="My profile picture" />
```

**Pro tip:** Always include `alt` text! It helps people using screen readers and improves SEO.

## 📋 Lists - Organizing Information

### Unordered Lists (Bullet Points)

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

**Displays as:**
• First item
• Second item  
• Third item

### Ordered Lists (Numbered)

```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

**Displays as:**

1. First step
2. Second step
3. Third step

### Nested Lists

You can put lists inside lists:

```html
<ul>
  <li>
    Web Development
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>
    Design
    <ul>
      <li>Photoshop</li>
      <li>Figma</li>
    </ul>
  </li>
</ul>
```

## 📦 Container Elements

### Divisions (div)

`<div>` is like an invisible box that groups content:

```html
<div>
  <h2>Section Title</h2>
  <p>This content is grouped together in a div.</p>
  <p>Divs are useful for organizing and styling content.</p>
</div>
```

### Spans

`<span>` is for styling parts of text:

```html
<p>This is normal text with <span>highlighted words</span> in the middle.</p>
```

## 🛠️ Hands-On Practice

Let's create a complete page using all these elements:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Learning HTML Elements</title>
  </head>
  <body>
    <h1>Welcome to My Learning Journey</h1>

    <div>
      <h2>About This Page</h2>
      <p>
        This page demonstrates all the
        <strong>essential HTML elements</strong> that every web developer should
        know. I'm practicing what I learned!
      </p>
    </div>

    <div>
      <h2>My Photo</h2>
      <img src="https://via.placeholder.com/300x200" alt="Placeholder image" />
      <p><em>This is a placeholder image. Replace with your own photo!</em></p>
    </div>

    <div>
      <h2>What I'm Learning</h2>
      <ul>
        <li><strong>HTML</strong> - Structure and content</li>
        <li><strong>CSS</strong> - Styling and layout</li>
        <li><strong>JavaScript</strong> - Interactivity</li>
      </ul>
    </div>

    <div>
      <h2>My Learning Plan</h2>
      <ol>
        <li>Master HTML fundamentals</li>
        <li>Learn CSS for beautiful designs</li>
        <li>Add JavaScript for interactivity</li>
        <li>Build my portfolio</li>
        <li>Get my first web development job!</li>
      </ol>
    </div>

    <div>
      <h2>Useful Links</h2>
      <ul>
        <li>
          <a href="https://developer.mozilla.org/" target="_blank"
            >MDN Web Docs</a
          >
        </li>
        <li>
          <a href="https://www.w3schools.com/" target="_blank">W3Schools</a>
        </li>
        <li><a href="mailto:your.email@example.com">Contact Me</a></li>
      </ul>
    </div>

    <div>
      <h2>Fun Fact</h2>
      <p>
        Did you know? The first website ever created is still online!
        <a
          href="http://info.cern.ch/hypertext/WWW/TheProject.html"
          target="_blank"
        >
          Check it out here</a
        >
        - it's amazing how simple it is!
      </p>
    </div>
  </body>
</html>
```

## 💻 Your Turn - Practice Exercise

**Create a new file called `practice-elements.html` and build a page about yourself that includes:**

1. **A main heading** with your name
2. **Your photo** (use a placeholder if needed)
3. **An "About Me" section** with 2-3 paragraphs
4. **A list of your hobbies** (unordered list)
5. **Your learning goals** (ordered list)
6. **Links to your favorite websites**
7. **Use text formatting** (bold, italic, etc.) throughout

**Challenge yourself:** Try to use every element we learned in this lesson!

## 🎨 Pro Tips for Better HTML

### 1. Semantic HTML

Use elements that describe their purpose:

```html
<!-- Good: Describes what it is -->
<h1>Main Title</h1>
<p>Article content</p>

<!-- Less good: Just describes appearance -->
<div style="font-size: large; font-weight: bold">Main Title</div>
<div>Article content</div>
```

### 2. Accessible Images

Always include descriptive alt text:

```html
<!-- Good alt text -->
<img
  src="sunset.jpg"
  alt="Orange sunset over calm ocean with silhouetted palm trees"
/>

<!-- Poor alt text -->
<img src="sunset.jpg" alt="Image" />
```

### 3. Meaningful Link Text

Make link text descriptive:

```html
<!-- Good link text -->
<a href="tutorial.html">Read our HTML tutorial</a>

<!-- Poor link text -->
<a href="tutorial.html">Click here</a>
```

## 🔍 Common Mistakes to Avoid

### ❌ Forgetting to close tags

```html
<p>This paragraph is never closed</p>
<p>This creates problems</p>
```

### ❌ Missing alt attributes on images

```html
<img src="photo.jpg" />
<!-- Missing alt! -->
```

### ❌ Using headings just for size

```html
<h1>Main Title</h1>
<h3>Regular text I want bigger</h3>
<!-- Wrong! -->
```

### ✅ The correct way

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<p><strong>Important text I want to emphasize</strong></p>
```

## 🎯 Quick Reference Cheat Sheet

```html
<!-- Text Elements -->
<h1>
  to
  <h6>
    <!-- Headings (biggest to smallest) -->
    <p>
      <!-- Paragraph -->
      <strong>
        <!-- Bold/important text -->
        <em>
          <!-- Italic/emphasized text -->
          <mark>
            <!-- Highlighted text -->

            <!-- Links and Images -->
            <a href="url">
              <!-- Link -->
              <img src="file" alt="description" />
              <!-- Image -->

              <!-- Lists -->
              <ul>
                <li>
                  <!-- Unordered (bullet) list -->
                  <ol>
                    <li>
                      <!-- Ordered (numbered) list -->

                      <!-- Containers -->
                      <div>
                        <!-- Block container -->
                        <span> <!-- Inline container --></span>
                      </div>
                    </li>
                  </ol>
                </li>
              </ul></a
            ></mark
          ></em
        ></strong
      >
    </p>
  </h6>
</h1>
```

## ✅ Mastery Checklist

Before moving to the next lesson, make sure you can:

- [ ] Create headings of different sizes
- [ ] Write paragraphs with formatted text
- [ ] Add images with proper alt text
- [ ] Create both ordered and unordered lists
- [ ] Make links to other websites and pages
- [ ] Use div and span to organize content
- [ ] Write clean, properly indented HTML

## 🎉 What You've Accomplished

**You now know the core building blocks of the web!** With just these elements, you can create:

- Personal websites
- Blog posts
- Portfolio pages
- Business websites
- Landing pages

These elements form the foundation of every website on the internet!

---

**🚀 Ready for more? Continue to `05-forms-and-inputs.md` to learn how to make your pages interactive!**
