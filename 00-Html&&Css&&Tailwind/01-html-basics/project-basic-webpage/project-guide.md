# 📋 Step-by-Step Project Guide

**Follow this guide to build your first complete webpage!** Take your time and don't rush - you're learning valuable skills.

## 🎯 Before You Start

### Planning Questions (5 minutes)

Answer these questions before coding:

1. **What's your name?** (for the main heading)
2. **How would you describe yourself in 2-3 sentences?**
3. **What are 4-5 things you enjoy doing?** (for bulleted list)
4. **What are 3-4 goals you have?** (for numbered list)
5. **What image will you use?** (yourself, hobby, or placeholder)
6. **What are 2-3 websites you visit often?** (for links)

## 🏗️ Step 1: Create the Basic Structure (10 minutes)

Create a new file called `about-me.html` and start with this foundation:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About [Your Name]</title>
  </head>
  <body>
    <!-- Your content will go here -->
  </body>
</html>
```

**🔄 Test:** Save and open in browser. You should see a blank page with your name in the tab.

## 🏗️ Step 2: Add the Header Section (10 minutes)

Inside the `<body>` tags, add:

```html
<body>
  <!-- Header Section -->
  <header>
    <h1>Hello, I'm [Your Name]!</h1>
    <p>
      Welcome to my first webpage. I'm learning HTML and excited to share a bit
      about myself!
    </p>
  </header>
</body>
```

**🔄 Test:** Save and refresh browser. You should see your heading and welcome message.

## 🏗️ Step 3: Add About Me Section (10 minutes)

Add this after your header:

```html
<!-- About Me Section -->
<section>
  <h2>About Me</h2>
  <p>
    [Write 2-3 sentences about yourself. Where are you from? What do you do?
    What got you interested in learning web development?]
  </p>
  <p>
    [Add another paragraph with more details about your background, interests,
    or what you hope to achieve with coding.]
  </p>
</section>
```

**Replace the bracketed text with your own content!**

**🔄 Test:** Save and refresh. You should see your about section.

## 🏗️ Step 4: Add Interests List (10 minutes)

Add your bulleted list of interests:

```html
<!-- My Interests Section -->
<section>
  <h2>My Interests</h2>
  <p>Here are some things I enjoy doing in my free time:</p>
  <ul>
    <li>[Interest 1 - e.g., Reading books]</li>
    <li>[Interest 2 - e.g., Playing guitar]</li>
    <li>[Interest 3 - e.g., Hiking]</li>
    <li>[Interest 4 - e.g., Cooking]</li>
    <li>[Interest 5 - e.g., Photography]</li>
  </ul>
</section>
```

**🔄 Test:** Save and refresh. You should see bulleted list.

## 🏗️ Step 5: Add Goals List (10 minutes)

Add your numbered list of goals:

```html
<!-- My Goals Section -->
<section>
  <h2>My Goals</h2>
  <p>Here's what I hope to achieve in the next year:</p>
  <ol>
    <li>[Goal 1 - e.g., Learn web development]</li>
    <li>[Goal 2 - e.g., Build my own website]</li>
    <li>[Goal 3 - e.g., Start a tech career]</li>
    <li>[Goal 4 - e.g., Learn JavaScript]</li>
  </ol>
</section>
```

**🔄 Test:** Save and refresh. You should see numbered list.

## 🏗️ Step 6: Add an Image (15 minutes)

### Option A: Use a placeholder image

```html
<!-- My Photo Section -->
<section>
  <h2>My Photo</h2>
  <img
    src="https://via.placeholder.com/300x200?text=Your+Photo+Here"
    alt="Placeholder for my photo"
    width="300"
    height="200"
  />
  <p>This is where my photo would go!</p>
</section>
```

### Option B: Use your own image

1. Create an `images` folder in your project
2. Add your image file to that folder
3. Use this code:

```html
<!-- My Photo Section -->
<section>
  <h2>My Photo</h2>
  <img
    src="images/your-photo.jpg"
    alt="Photo of [Your Name]"
    width="300"
    height="200"
  />
  <p>Here's a photo of me!</p>
</section>
```

**🔄 Test:** Save and refresh. You should see an image.

## 🏗️ Step 7: Add Favorite Links (10 minutes)

Add links to websites you like:

```html
<!-- Favorite Links Section -->
<section>
  <h2>My Favorite Websites</h2>
  <p>Here are some websites I visit regularly:</p>
  <ul>
    <li>
      <a href="https://www.youtube.com" target="_blank">YouTube</a> - For
      learning and entertainment
    </li>
    <li>
      <a href="https://www.github.com" target="_blank">GitHub</a> - For coding
      projects
    </li>
    <li>
      <a href="https://www.google.com" target="_blank">Google</a> - For
      searching everything
    </li>
  </ul>
  <p><em>Note: These links open in a new tab!</em></p>
</section>
```

**🔄 Test:** Save and refresh. Click the links to make sure they work.

## 🏗️ Step 8: Add Contact Form (15 minutes)

Add a contact form:

```html
<!-- Contact Me Section -->
<section>
  <h2>Contact Me</h2>
  <p>Want to get in touch? Send me a message!</p>

  <form>
    <p>
      <label for="name">Your Name:</label><br />
      <input type="text" id="name" name="name" required />
    </p>

    <p>
      <label for="email">Your Email:</label><br />
      <input type="email" id="email" name="email" required />
    </p>

    <p>
      <label for="subject">Subject:</label><br />
      <input type="text" id="subject" name="subject" />
    </p>

    <p>
      <label for="message">Message:</label><br />
      <textarea id="message" name="message" rows="5" cols="30"></textarea>
    </p>

    <p>
      <button type="submit">Send Message</button>
    </p>
  </form>
</section>
```

**🔄 Test:** Save and refresh. Try typing in the form fields.

## 🏗️ Step 9: Add Footer (5 minutes)

Add a simple footer:

```html
    <!-- Footer -->
    <footer>
        <hr>
        <p>© 2025 [Your Name]. My first HTML webpage!</p>
        <p>Created as part of my web development learning journey.</p>
    </footer>

</body>
</html>
```

**🔄 Test:** Save and refresh. You should see a footer at the bottom.

## ✅ Step 10: Final Testing and Review (10 minutes)

### Complete Checklist:

Go through your page and verify:

- [ ] Page title shows your name in browser tab
- [ ] Main heading (h1) with your name displays
- [ ] All section headings (h2) are visible
- [ ] All paragraphs have your personal content
- [ ] Bulleted list displays with bullets
- [ ] Numbered list displays with numbers
- [ ] Image loads and displays properly
- [ ] All links work and open in new tabs
- [ ] Form fields accept input
- [ ] Submit button is present
- [ ] Footer appears at bottom
- [ ] No broken text or missing content

### Test in Different Ways:

1. **Scroll through entire page** - Make sure everything displays
2. **Click all links** - Verify they work
3. **Type in form fields** - Test functionality
4. **Make browser window smaller** - See how it responds

## 🎉 Congratulations!

**You've built your first complete webpage!**

### What You've Accomplished:

- ✅ Created a proper HTML document structure
- ✅ Used headings to organize content
- ✅ Written semantic HTML with meaningful elements
- ✅ Added images with proper alt text
- ✅ Created both bulleted and numbered lists
- ✅ Made functional links to external sites
- ✅ Built a complete contact form
- ✅ Structured a multi-section webpage

### Your Skills Now Include:

- **HTML Document Structure** - DOCTYPE, html, head, body
- **Content Elements** - headings, paragraphs, lists
- **Media Elements** - images with attributes
- **Interactive Elements** - links, forms, inputs
- **Semantic Structure** - header, section, footer

## 🚀 Next Steps

1. **Save your work** - This is portfolio material!
2. **Show someone** - Share your accomplishment
3. **Take a screenshot** - Document your progress
4. **Ready for CSS** - Time to make it beautiful!

**Remember:** Every professional web developer started with a page like this. You're now officially a web developer! 🎉
