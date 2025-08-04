# 🦸‍♂️ Hero Sections with Tailwind

**Your website's superhero moment!** Hero sections are the first thing visitors see - they set the tone, communicate your value proposition, and convince users to stay. Master hero sections, and you master first impressions.

## 🎯 What You'll Learn

By the end of this lesson, you'll master:

- ✅ Creating compelling hero layouts
- ✅ Typography hierarchy and visual impact
- ✅ Background patterns and imagery
- ✅ Call-to-action placement and design
- ✅ Responsive hero sections
- ✅ Animation and interaction patterns

## 🌟 Understanding Hero Sections

**Hero sections are like movie trailers** - they need to grab attention, communicate the value, and make users want to see more.

### **Anatomy of a Hero Section:**

```
┌─────────────────────────────────────────┐
│ [Background Image/Pattern/Gradient]     │
│                                         │
│        🎯 COMPELLING HEADLINE           │
│           Supporting subtitle           │
│                                         │
│      [Primary CTA] [Secondary CTA]     │
│                                         │
│     🎨 Supporting visual/illustration   │
└─────────────────────────────────────────┘
```

**Essential Elements:**

- **Headline** - Clear value proposition
- **Subheadline** - Supporting details
- **Call-to-Action** - What users should do next
- **Visual Element** - Image, illustration, or video
- **Background** - Sets mood and brand tone

## 🎨 Simple Hero Layouts

### **Basic Centered Hero**

```html
<section class="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
  <div class="max-w-6xl mx-auto px-4 py-20 text-center">
    <!-- Main Headline -->
    <h1 class="text-4xl md:text-6xl font-bold mb-6">
      Build Amazing Web Apps
      <span class="text-yellow-400">Faster Than Ever</span>
    </h1>

    <!-- Supporting Text -->
    <p class="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
      The modern development platform that helps you ship beautiful, performant
      web applications in record time.
    </p>

    <!-- Call-to-Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="#"
        class="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200"
      >
        Start Building Free
      </a>
      <a
        href="#"
        class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
      >
        Watch Demo
      </a>
    </div>

    <!-- Trust Indicators -->
    <div class="mt-12 text-blue-200">
      <p class="text-sm mb-4">Trusted by 50,000+ developers worldwide</p>
      <div class="flex justify-center items-center space-x-8 opacity-70">
        <div class="text-2xl font-bold">Company 1</div>
        <div class="text-2xl font-bold">Company 2</div>
        <div class="text-2xl font-bold">Company 3</div>
      </div>
    </div>
  </div>
</section>
```

### **Split Layout Hero (50/50)**

```html
<section class="bg-white">
  <div class="max-w-6xl mx-auto px-4 py-20">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <!-- Left Side: Content -->
      <div>
        <!-- Badge/Label -->
        <div
          class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6"
        >
          <span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
          New: AI-Powered Features
        </div>

        <!-- Main Headline -->
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Transform Your
          <span class="text-blue-600">Customer Experience</span>
          With Smart Analytics
        </h1>

        <!-- Supporting Text -->
        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
          Get deep insights into user behavior, automate personalization, and
          boost conversions with our AI-powered analytics platform.
        </p>

        <!-- Feature List -->
        <div class="mb-8 space-y-4">
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-green-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span class="text-gray-700">Real-time data processing</span>
          </div>
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-green-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span class="text-gray-700">Predictive user insights</span>
          </div>
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-green-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span class="text-gray-700">Automated optimization</span>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <a
            href="#"
            class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 text-center"
          >
            Start Free Trial
          </a>
          <a
            href="#"
            class="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 text-center"
          >
            Schedule Demo
          </a>
        </div>
      </div>

      <!-- Right Side: Visual -->
      <div class="relative">
        <!-- Main Image Container -->
        <div
          class="relative bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300"
        >
          <!-- Dashboard Mockup -->
          <div class="bg-white rounded-lg p-6 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <div class="h-3 w-20 bg-gray-200 rounded"></div>
              <div class="flex space-x-2">
                <div class="h-3 w-3 bg-red-400 rounded-full"></div>
                <div class="h-3 w-3 bg-yellow-400 rounded-full"></div>
                <div class="h-3 w-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              <div
                class="h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded"
              ></div>
              <div class="flex space-x-4">
                <div class="h-10 bg-blue-100 rounded flex-1"></div>
                <div class="h-10 bg-purple-100 rounded flex-1"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Floating Elements -->
        <div
          class="absolute -top-4 -right-4 bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center text-2xl animate-bounce"
        >
          📊
        </div>
        <div
          class="absolute -bottom-4 -left-4 bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-xl"
        >
          ⚡
        </div>
      </div>
    </div>
  </div>
</section>
```

### **Video Background Hero**

```html
<section
  class="relative h-screen flex items-center justify-center overflow-hidden"
>
  <!-- Video Background -->
  <video
    autoplay
    muted
    loop
    class="absolute inset-0 w-full h-full object-cover"
  >
    <source src="hero-video.mp4" type="video/mp4" />
  </video>

  <!-- Overlay -->
  <div class="absolute inset-0 bg-black bg-opacity-50"></div>

  <!-- Content -->
  <div class="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
    <h1 class="text-5xl md:text-7xl font-bold mb-6">Experience The Future</h1>
    <p class="text-xl md:text-2xl mb-8 text-gray-200">
      Immerse yourself in cutting-edge technology that transforms how you work,
      play, and connect.
    </p>
    <a
      href="#"
      class="inline-block bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
    >
      Discover More
    </a>
  </div>

  <!-- Scroll Indicator -->
  <div
    class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      ></path>
    </svg>
  </div>
</section>
```

## 🎨 Creative Background Patterns

### **Gradient with Geometric Shapes**

```html
<section
  class="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden"
>
  <!-- Geometric Background Elements -->
  <div class="absolute inset-0">
    <!-- Large Circle -->
    <div
      class="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 transform rotate-45"
    ></div>
    <!-- Small Circles -->
    <div
      class="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-30"
    ></div>
    <div
      class="absolute top-32 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-25"
    ></div>
    <!-- Triangles -->
    <div
      class="absolute bottom-32 right-1/3 w-0 h-0 border-l-16 border-r-16 border-b-24 border-l-transparent border-r-transparent border-b-yellow-400 opacity-40"
    ></div>
  </div>

  <!-- Grid Pattern Overlay -->
  <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>

  <!-- Content -->
  <div class="relative z-10 max-w-6xl mx-auto px-4 py-24 text-center">
    <h1 class="text-5xl md:text-7xl font-bold mb-6">
      Design
      <span
        class="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"
      >
        Beyond
      </span>
      Imagination
    </h1>
    <p class="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
      Create stunning visual experiences with our advanced design tools and
      unleash your creative potential.
    </p>
    <a
      href="#"
      class="bg-gradient-to-r from-yellow-400 to-pink-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-pink-300 transform hover:scale-105 transition-all duration-200"
    >
      Start Creating
    </a>
  </div>
</section>

<!-- Add this to your CSS -->
<style>
  .bg-grid-pattern {
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.1) 1px,
        transparent 1px
      ), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
  }
</style>
```

### **Blob Shapes and Organic Forms**

```html
<section
  class="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white min-h-screen flex items-center overflow-hidden"
>
  <!-- Organic Blob Shapes -->
  <div class="absolute inset-0">
    <!-- Blob 1 -->
    <div
      class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 opacity-30 rounded-blob transform -translate-x-32 -translate-y-32 animate-blob"
    ></div>
    <!-- Blob 2 -->
    <div
      class="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-400 opacity-40 rounded-blob transform translate-x-32 -translate-y-16 animate-blob animation-delay-2000"
    ></div>
    <!-- Blob 3 -->
    <div
      class="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-br from-green-400 to-teal-400 opacity-35 rounded-blob transform -translate-x-1/2 translate-y-32 animate-blob animation-delay-4000"
    ></div>
  </div>

  <!-- Content -->
  <div class="relative z-10 max-w-6xl mx-auto px-4 py-20">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          Organic Design
          <span class="text-yellow-400">Revolution</span>
        </h1>
        <p class="text-xl text-cyan-100 mb-8">
          Break free from rigid layouts with fluid, natural design patterns that
          feel alive and engaging.
        </p>
        <div class="flex gap-4">
          <a
            href="#"
            class="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore
          </a>
          <a
            href="#"
            class="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>

      <!-- Interactive Element -->
      <div class="relative">
        <div
          class="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-30"
        >
          <h3 class="text-2xl font-bold mb-4">Dynamic Features</h3>
          <div class="space-y-4">
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold">Lightning Fast</h4>
                <p class="text-cyan-100 text-sm">Optimized performance</p>
              </div>
            </div>
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold">Smart Insights</h4>
                <p class="text-cyan-100 text-sm">AI-powered analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Add this to your CSS -->
<style>
  .rounded-blob {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }

  @keyframes blob {
    0%,
    100% {
      transform: scale(1) rotate(0deg);
    }
    33% {
      transform: scale(1.1) rotate(120deg);
    }
    66% {
      transform: scale(0.9) rotate(240deg);
    }
  }

  .animate-blob {
    animation: blob 20s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }
</style>
```

## 📱 Mobile-Optimized Heroes

### **Stacked Mobile Layout**

```html
<section class="bg-gradient-to-b from-purple-600 to-blue-600 text-white">
  <div class="max-w-6xl mx-auto px-4 py-16 lg:py-24">
    <div
      class="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
    >
      <!-- Content -->
      <div class="mb-12 lg:mb-0">
        <!-- Mobile-First Headlines -->
        <h1
          class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
        >
          Your Success Starts
          <span class="text-yellow-400 block">Right Here</span>
        </h1>

        <!-- Responsive Text -->
        <p
          class="text-lg sm:text-xl lg:text-2xl text-purple-100 mb-8 leading-relaxed"
        >
          Join thousands of entrepreneurs who've transformed their ideas into
          thriving businesses.
        </p>

        <!-- Mobile-Optimized CTAs -->
        <div
          class="space-y-4 sm:space-y-0 sm:flex sm:gap-4 lg:flex-col lg:space-y-4 xl:flex-row xl:space-y-0"
        >
          <a
            href="#"
            class="block w-full sm:w-auto bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-bold text-lg text-center hover:bg-yellow-300 transition-colors"
          >
            Get Started Free
          </a>
          <a
            href="#"
            class="block w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg text-center hover:bg-white hover:text-purple-600 transition-colors"
          >
            Watch Demo
          </a>
        </div>

        <!-- Social Proof - Mobile Optimized -->
        <div class="mt-8 lg:mt-12">
          <p class="text-purple-200 text-sm mb-4">
            Trusted by 10,000+ customers
          </p>
          <div
            class="flex justify-center lg:justify-start items-center space-x-6 opacity-75"
          >
            <div class="text-sm font-semibold">⭐⭐⭐⭐⭐</div>
            <div class="text-sm">4.9/5 rating</div>
          </div>
        </div>
      </div>

      <!-- Visual Element - Mobile Responsive -->
      <div class="relative">
        <!-- Phone Mockup for Mobile -->
        <div
          class="lg:hidden mx-auto w-64 h-96 bg-white rounded-3xl p-4 shadow-2xl"
        >
          <div
            class="w-full h-full bg-gradient-to-b from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center"
          >
            <div class="text-center text-purple-600">
              <div class="text-4xl mb-2">📱</div>
              <div class="font-semibold">Mobile App</div>
            </div>
          </div>
        </div>

        <!-- Desktop Mockup for Large Screens -->
        <div class="hidden lg:block">
          <div
            class="bg-white rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
          >
            <!-- Browser Window -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex space-x-2">
                <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div class="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div class="bg-gray-200 rounded px-3 py-1 text-xs text-gray-600">
                yourapp.com
              </div>
            </div>
            <div
              class="bg-gradient-to-br from-purple-100 to-blue-100 h-64 rounded-lg flex items-center justify-center"
            >
              <div class="text-center text-purple-600">
                <div class="text-5xl mb-4">🚀</div>
                <div class="font-bold text-xl">Your App</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## 🎭 Interactive Hero Elements

### **Typing Animation Hero**

```html
<section class="bg-gray-900 text-white min-h-screen flex items-center">
  <div class="max-w-6xl mx-auto px-4 text-center">
    <h1 class="text-4xl md:text-6xl font-bold mb-6">
      We Build
      <span id="typing-text" class="text-blue-400"></span>
      <span class="animate-pulse">|</span>
    </h1>
    <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
      From concept to deployment, we create digital experiences that drive
      results and delight users.
    </p>
    <a
      href="#"
      class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
    >
      Start Your Project
    </a>
  </div>
</section>

<script>
  const words = [
    "Websites",
    "Mobile Apps",
    "E-commerce",
    "Platforms",
    "Solutions",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typing-text");

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 100 : 200);
  }

  typeEffect();
</script>
```

### **Particle Background Hero**

```html
<section
  class="relative bg-gray-900 text-white min-h-screen flex items-center overflow-hidden"
>
  <!-- Particle Canvas -->
  <canvas id="particles" class="absolute inset-0 w-full h-full"></canvas>

  <!-- Content -->
  <div class="relative z-10 max-w-6xl mx-auto px-4 text-center">
    <h1 class="text-5xl md:text-7xl font-bold mb-6">
      <span
        class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      >
        Innovation
      </span>
      In Motion
    </h1>
    <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
      Experience the future of technology with our cutting-edge solutions that
      adapt and evolve with your needs.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="#"
        class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200"
      >
        Explore Technology
      </a>
      <a
        href="#"
        class="border-2 border-gray-400 text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:border-white hover:text-white transition-all duration-200"
      >
        Learn More
      </a>
    </div>
  </div>
</section>

<script>
  // Simple particle system
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#60A5FA";
      ctx.fill();
      ctx.restore();
    }
  }

  // Create particles
  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
</script>
```

## 📐 Hero Section Best Practices

### **1. Clear Value Proposition**

```html
<!-- ✅ Good: Clear and specific -->
<h1>Increase Sales by 300% with AI-Powered Email Marketing</h1>

<!-- ❌ Bad: Vague and unclear -->
<h1>Welcome to Our Amazing Platform</h1>
```

### **2. Scannable Hierarchy**

```html
<!-- ✅ Good: Clear hierarchy -->
<h1 class="text-6xl font-bold">Main Headline</h1>
<p class="text-2xl text-gray-600">Supporting subtitle</p>
<p class="text-lg text-gray-500">Additional details</p>

<!-- ❌ Bad: No clear hierarchy -->
<h1 class="text-4xl">Main Headline</h1>
<p class="text-4xl">Supporting subtitle</p>
<p class="text-3xl">Additional details</p>
```

### **3. Strong Call-to-Action**

```html
<!-- ✅ Good: Action-oriented and specific -->
<a href="#" class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold">
  Start Free 14-Day Trial
</a>

<!-- ❌ Bad: Generic and weak -->
<a href="#" class="bg-gray-500 text-white px-4 py-2"> Click Here </a>
```

### **4. Mobile-First Design**

```html
<!-- ✅ Good: Mobile-first responsive -->
<h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold">Responsive Headline</h1>

<!-- ❌ Bad: Desktop-only thinking -->
<h1 class="text-6xl font-bold">Desktop Only Headline</h1>
```

## 🎯 Mission Complete!

You now master hero sections:

- ✅ **Layout patterns** - Centered, split, and full-screen heroes
- ✅ **Background design** - Gradients, patterns, and visual effects
- ✅ **Typography hierarchy** - Headlines, subheadings, and body text
- ✅ **Call-to-action design** - Compelling buttons and conversion elements
- ✅ **Mobile optimization** - Responsive design for all devices
- ✅ **Interactive elements** - Animations and engaging features

## 🚀 What's Next?

Congratulations! You've completed the **Tailwind Components** course. You now have the skills to build professional, responsive components that create amazing user experiences.

**Next Steps:**

1. Practice building component combinations
2. Create your own component library project
3. Explore advanced Tailwind features
4. Build complete landing pages using your new skills

---

**💡 Pro Tip:** Great heroes don't just look good - they convert visitors into customers. Always test different headlines and CTAs to see what works best.

**🎯 Remember:** You have 8 seconds to capture attention. Make every element count toward your goal of engaging and converting visitors.
