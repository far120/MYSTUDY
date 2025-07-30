# Mini Games Collection - Interactive Entertainment Programming 🎮

Welcome to your **final JavaScript project**! This Mini Games Collection will teach you game development, animations, canvas manipulation, event handling, and interactive programming while creating fun, engaging experiences.

## 🎯 Project Overview

We'll build a collection of interactive games that demonstrate different programming concepts:

### Games Included:

- 🐍 **Snake Game** - Classic arcade game with collision detection
- 💎 **Memory Card Game** - Card matching with animations
- 🎯 **Reaction Time Test** - Reflexes and timing measurement
- 🎲 **Number Guessing Game** - Logic and probability
- 🎨 **Drawing Canvas** - Creative expression with mouse/touch
- 🏓 **Pong Game** - Two-player paddle game
- 🧩 **Tetris Blocks** - Block-falling puzzle game
- 🎮 **Game Hub** - Navigation and high scores

### Key Learning Features:

- 🎨 HTML5 Canvas manipulation
- ⚡ Game loops and animation frames
- 🎯 Collision detection algorithms
- 🎵 Sound effects and audio control
- 📊 Score tracking and high scores
- 🎮 Keyboard and mouse input handling
- 📱 Touch controls for mobile devices
- 🏆 Achievement and progression systems

## 🏗️ Application Structure

### HTML Foundation:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mini Games Collection</title>
    <link rel="stylesheet" href="games-styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="app-container">
      <!-- Header -->
      <header class="app-header">
        <h1>🎮 Mini Games Collection</h1>
        <div class="header-stats">
          <div class="stat">
            <span class="stat-label">Games Played:</span>
            <span id="total-games-played">0</span>
          </div>
          <div class="stat">
            <span class="stat-label">High Score:</span>
            <span id="overall-high-score">0</span>
          </div>
        </div>
      </header>

      <!-- Game Selection Hub -->
      <section id="game-hub" class="game-hub">
        <div class="games-grid">
          <div class="game-card" data-game="snake">
            <div class="game-icon">🐍</div>
            <h3>Snake Game</h3>
            <p>Classic arcade action</p>
            <div class="game-stats">
              <span>High Score: <span class="high-score">0</span></span>
              <span>Played: <span class="play-count">0</span> times</span>
            </div>
            <button class="play-btn">Play Game</button>
          </div>

          <div class="game-card" data-game="memory">
            <div class="game-icon">💎</div>
            <h3>Memory Cards</h3>
            <p>Match pairs and remember</p>
            <div class="game-stats">
              <span>Best Time: <span class="best-time">--:--</span></span>
              <span>Played: <span class="play-count">0</span> times</span>
            </div>
            <button class="play-btn">Play Game</button>
          </div>

          <div class="game-card" data-game="reaction">
            <div class="game-icon">🎯</div>
            <h3>Reaction Test</h3>
            <p>Test your reflexes</p>
            <div class="game-stats">
              <span>Best: <span class="best-reaction">--- ms</span></span>
              <span>Played: <span class="play-count">0</span> times</span>
            </div>
            <button class="play-btn">Play Game</button>
          </div>

          <div class="game-card" data-game="number-guess">
            <div class="game-icon">🎲</div>
            <h3>Number Guessing</h3>
            <p>Logic and deduction</p>
            <div class="game-stats">
              <span>Best: <span class="best-guesses">-- guesses</span></span>
              <span>Played: <span class="play-count">0</span> times</span>
            </div>
            <button class="play-btn">Play Game</button>
          </div>

          <div class="game-card" data-game="drawing">
            <div class="game-icon">🎨</div>
            <h3>Drawing Canvas</h3>
            <p>Creative expression</p>
            <div class="game-stats">
              <span>Drawings: <span class="drawing-count">0</span></span>
              <span>Time Spent: <span class="time-spent">0h</span></span>
            </div>
            <button class="play-btn">Start Drawing</button>
          </div>

          <div class="game-card" data-game="pong">
            <div class="game-icon">🏓</div>
            <h3>Pong Game</h3>
            <p>Classic two-player</p>
            <div class="game-stats">
              <span>Wins: <span class="win-count">0</span></span>
              <span>Played: <span class="play-count">0</span> times</span>
            </div>
            <button class="play-btn">Play Game</button>
          </div>
        </div>
      </section>

      <!-- Game Container -->
      <section id="game-container" class="game-container hidden">
        <!-- Game Header -->
        <div class="game-header">
          <button id="back-to-hub" class="back-btn">← Back to Hub</button>
          <h2 id="current-game-title">Game Title</h2>
          <div class="game-controls">
            <button id="pause-btn" class="control-btn">⏸️</button>
            <button id="restart-btn" class="control-btn">🔄</button>
            <button id="sound-toggle" class="control-btn">🔊</button>
          </div>
        </div>

        <!-- Game Canvas -->
        <div class="game-display">
          <canvas id="game-canvas" width="800" height="600"></canvas>
          <div id="game-overlay" class="game-overlay">
            <!-- Overlays for different game states -->
          </div>
        </div>

        <!-- Game Info Panel -->
        <div class="game-info">
          <div class="score-panel">
            <div class="score-item">
              <span class="score-label">Score:</span>
              <span id="current-score">0</span>
            </div>
            <div class="score-item">
              <span class="score-label">High Score:</span>
              <span id="game-high-score">0</span>
            </div>
            <div class="score-item">
              <span class="score-label">Level:</span>
              <span id="current-level">1</span>
            </div>
          </div>

          <div class="game-status">
            <div id="game-message" class="game-message"></div>
            <div id="game-timer" class="game-timer">00:00</div>
          </div>
        </div>

        <!-- Game-specific UI will be injected here -->
        <div id="game-specific-ui" class="game-specific-ui">
          <!-- Content varies by game -->
        </div>
      </section>

      <!-- Achievement System -->
      <div id="achievement-popup" class="achievement-popup hidden">
        <div class="achievement-content">
          <div class="achievement-icon">🏆</div>
          <div class="achievement-text">
            <h3 id="achievement-title">Achievement Unlocked!</h3>
            <p id="achievement-description">Description here</p>
          </div>
        </div>
      </div>
    </div>

    <script src="games-collection.js"></script>
  </body>
</html>
```

## 🎮 Game Engine Foundation

### Core Game Engine:

```javascript
// Base Game Engine
class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.isRunning = false;
    this.isPaused = false;
    this.gameLoop = null;
    this.lastTime = 0;
    this.deltaTime = 0;
    this.fps = 60;
    this.frameTime = 1000 / this.fps;

    // Input handling
    this.keys = new Set();
    this.mouse = { x: 0, y: 0, clicked: false };
    this.touches = [];

    this.setupInputHandlers();
  }

  setupInputHandlers() {
    // Keyboard events
    document.addEventListener("keydown", (e) => {
      this.keys.add(e.code);
      this.onKeyDown(e.code);
    });

    document.addEventListener("keyup", (e) => {
      this.keys.delete(e.code);
      this.onKeyUp(e.code);
    });

    // Mouse events
    this.canvas.addEventListener("mousedown", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.clicked = true;
      this.onMouseDown(this.mouse.x, this.mouse.y);
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.mouse.clicked = false;
      this.onMouseUp(this.mouse.x, this.mouse.y);
    });

    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.onMouseMove(this.mouse.x, this.mouse.y);
    });

    // Touch events for mobile
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      this.touches = Array.from(e.touches).map((touch) => ({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }));
      this.onTouchStart(this.touches);
    });

    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      this.touches = Array.from(e.touches).map((touch) => ({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }));
      this.onTouchMove(this.touches);
    });

    this.canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.touches = [];
      this.onTouchEnd();
    });
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    this.gameLoop = requestAnimationFrame((time) => this.loop(time));

    this.onStart();
  }

  stop() {
    this.isRunning = false;
    this.isPaused = false;

    if (this.gameLoop) {
      cancelAnimationFrame(this.gameLoop);
      this.gameLoop = null;
    }

    this.onStop();
  }

  pause() {
    this.isPaused = !this.isPaused;
    this.onPause(this.isPaused);
  }

  loop(currentTime) {
    if (!this.isRunning) return;

    this.deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (!this.isPaused) {
      this.update(this.deltaTime);
      this.render();
    }

    this.gameLoop = requestAnimationFrame((time) => this.loop(time));
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Override these methods in specific games
  onStart() {}
  onStop() {}
  onPause(isPaused) {}
  update(deltaTime) {}
  render() {}
  onKeyDown(key) {}
  onKeyUp(key) {}
  onMouseDown(x, y) {}
  onMouseUp(x, y) {}
  onMouseMove(x, y) {}
  onTouchStart(touches) {}
  onTouchMove(touches) {}
  onTouchEnd() {}

  // Utility methods
  isKeyPressed(key) {
    return this.keys.has(key);
  }

  drawRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawCircle(x, y, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawText(text, x, y, font = "16px Arial", color = "black") {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, x, y);
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  randomInt(min, max) {
    return Math.floor(this.random(min, max + 1));
  }
}

// Sound Manager
class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.muted = false;
    this.volume = 0.5;
  }

  createSound(name, frequency, duration, type = "sine") {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const sound = {
      play: () => {
        if (this.muted) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(this.volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + duration
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      },
    };

    this.sounds.set(name, sound);
    return sound;
  }

  play(name) {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.play();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
}

// Game Data Manager
class GameDataManager {
  constructor() {
    this.STORAGE_KEY = "mini-games-collection";
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : this.getDefaultData();
    } catch (error) {
      console.error("Failed to load game data:", error);
      return this.getDefaultData();
    }
  }

  getDefaultData() {
    return {
      totalGamesPlayed: 0,
      overallHighScore: 0,
      achievements: [],
      games: {
        snake: { highScore: 0, playCount: 0, bestTime: null },
        memory: { bestTime: null, playCount: 0, perfectGames: 0 },
        reaction: { bestTime: null, playCount: 0, averageTime: null },
        numberGuess: { bestGuesses: null, playCount: 0, totalGuesses: 0 },
        drawing: { drawingCount: 0, timeSpent: 0 },
        pong: { winCount: 0, playCount: 0, longestRally: 0 },
      },
      settings: {
        soundEnabled: true,
        difficulty: "normal",
        theme: "default",
      },
    };
  }

  saveData() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
      return true;
    } catch (error) {
      console.error("Failed to save game data:", error);
      return false;
    }
  }

  updateGameScore(game, score, extraData = {}) {
    const gameData = this.data.games[game];
    if (!gameData) return;

    gameData.playCount++;
    this.data.totalGamesPlayed++;

    if (score > gameData.highScore) {
      gameData.highScore = score;
      this.checkAchievement("newHighScore", game, score);
    }

    if (score > this.data.overallHighScore) {
      this.data.overallHighScore = score;
    }

    // Game-specific data updates
    Object.assign(gameData, extraData);

    this.saveData();
    this.updateUI();
  }

  checkAchievement(type, game, value) {
    const achievements = {
      newHighScore: {
        title: "New High Score!",
        description: `New record in ${game}!`,
      },
      firstWin: {
        title: "First Victory!",
        description: `You won your first game of ${game}!`,
      },
      perfectGame: {
        title: "Perfect Game!",
        description: `Flawless performance in ${game}!`,
      },
      dedication: {
        title: "Dedicated Player",
        description: "Played 50 games total!",
      },
      master: { title: "Game Master", description: "High score over 1000!" },
    };

    const achievement = achievements[type];
    if (achievement && !this.data.achievements.includes(`${type}-${game}`)) {
      this.data.achievements.push(`${type}-${game}`);
      this.showAchievement(achievement.title, achievement.description);
    }
  }

  showAchievement(title, description) {
    const popup = document.getElementById("achievement-popup");
    const titleEl = document.getElementById("achievement-title");
    const descEl = document.getElementById("achievement-description");

    titleEl.textContent = title;
    descEl.textContent = description;

    popup.classList.remove("hidden");
    setTimeout(() => popup.classList.add("hidden"), 3000);
  }

  updateUI() {
    // Update header stats
    document.getElementById("total-games-played").textContent =
      this.data.totalGamesPlayed;
    document.getElementById("overall-high-score").textContent =
      this.data.overallHighScore;

    // Update game cards
    Object.entries(this.data.games).forEach(([game, data]) => {
      const card = document.querySelector(`[data-game="${game}"]`);
      if (!card) return;

      const playCount = card.querySelector(".play-count");
      const highScore = card.querySelector(".high-score");
      const bestTime = card.querySelector(".best-time");
      const bestReaction = card.querySelector(".best-reaction");
      const bestGuesses = card.querySelector(".best-guesses");
      const drawingCount = card.querySelector(".drawing-count");
      const timeSpent = card.querySelector(".time-spent");
      const winCount = card.querySelector(".win-count");

      if (playCount) playCount.textContent = data.playCount || 0;
      if (highScore) highScore.textContent = data.highScore || 0;
      if (bestTime)
        bestTime.textContent = data.bestTime
          ? this.formatTime(data.bestTime)
          : "--:--";
      if (bestReaction)
        bestReaction.textContent = data.bestTime
          ? `${data.bestTime} ms`
          : "--- ms";
      if (bestGuesses) bestGuesses.textContent = data.bestGuesses || "--";
      if (drawingCount) drawingCount.textContent = data.drawingCount || 0;
      if (timeSpent)
        timeSpent.textContent = `${Math.floor((data.timeSpent || 0) / 3600)}h`;
      if (winCount) winCount.textContent = data.winCount || 0;
    });
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
}
```

## 🐍 Snake Game Implementation

### Classic Snake Game:

```javascript
class SnakeGame extends GameEngine {
  constructor(canvas) {
    super(canvas);
    this.gridSize = 20;
    this.gridWidth = Math.floor(this.canvas.width / this.gridSize);
    this.gridHeight = Math.floor(this.canvas.height / this.gridSize);

    this.reset();
  }

  reset() {
    this.snake = [
      { x: Math.floor(this.gridWidth / 2), y: Math.floor(this.gridHeight / 2) },
    ];
    this.direction = { x: 0, y: 0 };
    this.nextDirection = { x: 0, y: 0 };
    this.food = this.generateFood();
    this.score = 0;
    this.speed = 150; // milliseconds between moves
    this.lastMoveTime = 0;
    this.gameOver = false;
    this.level = 1;
  }

  onStart() {
    this.reset();
    soundManager.play("gameStart");
  }

  update(deltaTime) {
    if (this.gameOver) return;

    this.lastMoveTime += deltaTime;

    if (this.lastMoveTime >= this.speed) {
      this.moveSnake();
      this.lastMoveTime = 0;
    }
  }

  render() {
    this.clear();

    // Draw background grid
    this.drawGrid();

    // Draw food
    this.drawFood();

    // Draw snake
    this.drawSnake();

    // Draw UI
    this.drawUI();

    if (this.gameOver) {
      this.drawGameOver();
    }
  }

  drawGrid() {
    this.ctx.strokeStyle = "#e0e0e0";
    this.ctx.lineWidth = 0.5;

    for (let x = 0; x <= this.gridWidth; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * this.gridSize, 0);
      this.ctx.lineTo(x * this.gridSize, this.canvas.height);
      this.ctx.stroke();
    }

    for (let y = 0; y <= this.gridHeight; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * this.gridSize);
      this.ctx.lineTo(this.canvas.width, y * this.gridSize);
      this.ctx.stroke();
    }
  }

  drawSnake() {
    this.snake.forEach((segment, index) => {
      const x = segment.x * this.gridSize;
      const y = segment.y * this.gridSize;

      if (index === 0) {
        // Snake head
        this.ctx.fillStyle = "#4CAF50";
        this.ctx.fillRect(x + 1, y + 1, this.gridSize - 2, this.gridSize - 2);

        // Eyes
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(x + 4, y + 4, 3, 3);
        this.ctx.fillRect(x + 13, y + 4, 3, 3);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(x + 5, y + 5, 1, 1);
        this.ctx.fillRect(x + 14, y + 5, 1, 1);
      } else {
        // Snake body
        const intensity = 1 - (index / this.snake.length) * 0.3;
        this.ctx.fillStyle = `rgba(76, 175, 80, ${intensity})`;
        this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
      }
    });
  }

  drawFood() {
    const x = this.food.x * this.gridSize;
    const y = this.food.y * this.gridSize;

    this.ctx.fillStyle = "#FF5722";
    this.ctx.beginPath();
    this.ctx.arc(
      x + this.gridSize / 2,
      y + this.gridSize / 2,
      this.gridSize / 2 - 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();

    // Apple stem
    this.ctx.fillStyle = "#4CAF50";
    this.ctx.fillRect(x + this.gridSize / 2 - 1, y + 2, 2, 4);
  }

  drawUI() {
    document.getElementById("current-score").textContent = this.score;
    document.getElementById("current-level").textContent = this.level;

    // Instructions
    if (this.direction.x === 0 && this.direction.y === 0) {
      this.drawText(
        "Use WASD or Arrow Keys to move",
        this.canvas.width / 2 - 120,
        30,
        "16px Arial",
        "#666"
      );
    }
  }

  drawGameOver() {
    // Semi-transparent overlay
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Game over text
    this.drawText(
      "GAME OVER",
      this.canvas.width / 2 - 80,
      this.canvas.height / 2 - 40,
      "32px Press Start 2P",
      "white"
    );

    this.drawText(
      `Final Score: ${this.score}`,
      this.canvas.width / 2 - 60,
      this.canvas.height / 2,
      "16px Arial",
      "white"
    );

    this.drawText(
      "Press R to restart",
      this.canvas.width / 2 - 50,
      this.canvas.height / 2 + 30,
      "14px Arial",
      "#ccc"
    );
  }

  moveSnake() {
    // Update direction
    this.direction = { ...this.nextDirection };

    // Don't move if no direction set
    if (this.direction.x === 0 && this.direction.y === 0) return;

    // Calculate new head position
    const head = { ...this.snake[0] };
    head.x += this.direction.x;
    head.y += this.direction.y;

    // Check wall collision
    if (
      head.x < 0 ||
      head.x >= this.gridWidth ||
      head.y < 0 ||
      head.y >= this.gridHeight
    ) {
      this.endGame();
      return;
    }

    // Check self collision
    if (
      this.snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      this.endGame();
      return;
    }

    // Add new head
    this.snake.unshift(head);

    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.eatFood();
    } else {
      // Remove tail if no food eaten
      this.snake.pop();
    }
  }

  eatFood() {
    this.score += 10;
    this.food = this.generateFood();
    soundManager.play("eatFood");

    // Increase level and speed every 5 food items
    if (this.score % 50 === 0) {
      this.level++;
      this.speed = Math.max(80, this.speed - 10);
      soundManager.play("levelUp");
    }
  }

  generateFood() {
    let food;
    do {
      food = {
        x: this.randomInt(0, this.gridWidth - 1),
        y: this.randomInt(0, this.gridHeight - 1),
      };
    } while (
      this.snake.some((segment) => segment.x === food.x && segment.y === food.y)
    );

    return food;
  }

  endGame() {
    this.gameOver = true;
    soundManager.play("gameOver");

    // Update high score
    const currentHigh = gameData.data.games.snake.highScore;
    if (this.score > currentHigh) {
      gameData.updateGameScore("snake", this.score);
      document.getElementById("game-high-score").textContent = this.score;
    }
  }

  onKeyDown(key) {
    switch (key) {
      case "KeyW":
      case "ArrowUp":
        if (this.direction.y !== 1) {
          this.nextDirection = { x: 0, y: -1 };
        }
        break;
      case "KeyS":
      case "ArrowDown":
        if (this.direction.y !== -1) {
          this.nextDirection = { x: 0, y: 1 };
        }
        break;
      case "KeyA":
      case "ArrowLeft":
        if (this.direction.x !== 1) {
          this.nextDirection = { x: -1, y: 0 };
        }
        break;
      case "KeyD":
      case "ArrowRight":
        if (this.direction.x !== -1) {
          this.nextDirection = { x: 1, y: 0 };
        }
        break;
      case "KeyR":
        if (this.gameOver) {
          this.reset();
        }
        break;
    }
  }

  // Touch controls for mobile
  onTouchStart(touches) {
    if (touches.length !== 1) return;

    this.touchStart = touches[0];
  }

  onTouchEnd() {
    if (!this.touchStart) return;

    const touch = this.touches[0] || this.touchStart;
    const deltaX = touch.x - this.touchStart.x;
    const deltaY = touch.y - this.touchStart.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 30 && this.direction.x !== -1) {
        this.nextDirection = { x: 1, y: 0 };
      } else if (deltaX < -30 && this.direction.x !== 1) {
        this.nextDirection = { x: -1, y: 0 };
      }
    } else {
      // Vertical swipe
      if (deltaY > 30 && this.direction.y !== -1) {
        this.nextDirection = { x: 0, y: 1 };
      } else if (deltaY < -30 && this.direction.y !== 1) {
        this.nextDirection = { x: 0, y: -1 };
      }
    }

    this.touchStart = null;
  }
}
```

## 💎 Memory Card Game

### Memory Matching Game:

```javascript
class MemoryGame {
  constructor() {
    this.gridSize = 4; // 4x4 grid
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.startTime = null;
    this.gameTime = 0;
    this.isProcessing = false;

    this.symbols = ["🎮", "🎯", "🎨", "🎲", "🎪", "🎭", "🎧", "🎸"];
    this.setupGame();
  }

  setupGame() {
    this.createCards();
    this.shuffleCards();
    this.renderCards();
    this.startTimer();
  }

  createCards() {
    this.cards = [];
    const pairs = (this.gridSize * this.gridSize) / 2;

    // Create pairs of cards
    for (let i = 0; i < pairs; i++) {
      const symbol = this.symbols[i % this.symbols.length];
      this.cards.push(
        { id: i * 2, symbol, flipped: false, matched: false },
        { id: i * 2 + 1, symbol, flipped: false, matched: false }
      );
    }
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  renderCards() {
    const gameSpecificUI = document.getElementById("game-specific-ui");
    gameSpecificUI.innerHTML = `
            <div class="memory-game">
                <div class="memory-stats">
                    <div class="stat">Moves: <span id="move-count">0</span></div>
                    <div class="stat">Time: <span id="game-time">00:00</span></div>
                    <div class="stat">Pairs: <span id="pairs-found">${
                      this.matchedPairs
                    }</span>/${(this.gridSize * this.gridSize) / 2}</div>
                </div>
                <div class="memory-grid" id="memory-grid">
                    ${this.cards
                      .map(
                        (card) => `
                        <div class="memory-card ${
                          card.flipped ? "flipped" : ""
                        } ${card.matched ? "matched" : ""}" 
                             data-card-id="${card.id}">
                            <div class="card-front">${card.symbol}</div>
                            <div class="card-back">❓</div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;

    // Add click listeners
    document.getElementById("memory-grid").addEventListener("click", (e) => {
      const cardElement = e.target.closest(".memory-card");
      if (cardElement) {
        this.flipCard(parseInt(cardElement.dataset.cardId));
      }
    });
  }

  flipCard(cardId) {
    if (this.isProcessing) return;

    const card = this.cards.find((c) => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    card.flipped = true;
    this.flippedCards.push(card);
    this.updateCardDisplay(card);

    soundManager.play("cardFlip");

    if (this.flippedCards.length === 2) {
      this.moves++;
      document.getElementById("move-count").textContent = this.moves;
      this.checkMatch();
    }
  }

  checkMatch() {
    this.isProcessing = true;
    const [card1, card2] = this.flippedCards;

    setTimeout(() => {
      if (card1.symbol === card2.symbol) {
        // Match found
        card1.matched = true;
        card2.matched = true;
        this.matchedPairs++;

        document.getElementById("pairs-found").textContent = this.matchedPairs;
        this.updateCardDisplay(card1);
        this.updateCardDisplay(card2);

        soundManager.play("match");

        if (this.matchedPairs === (this.gridSize * this.gridSize) / 2) {
          this.gameComplete();
        }
      } else {
        // No match, flip back
        card1.flipped = false;
        card2.flipped = false;
        this.updateCardDisplay(card1);
        this.updateCardDisplay(card2);

        soundManager.play("noMatch");
      }

      this.flippedCards = [];
      this.isProcessing = false;
    }, 1000);
  }

  updateCardDisplay(card) {
    const cardElement = document.querySelector(`[data-card-id="${card.id}"]`);
    if (cardElement) {
      cardElement.className = `memory-card ${card.flipped ? "flipped" : ""} ${
        card.matched ? "matched" : ""
      }`;
    }
  }

  startTimer() {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.gameTime = Math.floor((Date.now() - this.startTime) / 1000);
      const minutes = Math.floor(this.gameTime / 60);
      const seconds = this.gameTime % 60;
      document.getElementById("game-time").textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }

  gameComplete() {
    clearInterval(this.timerInterval);
    soundManager.play("victory");

    const perfectGame = this.moves === (this.gridSize * this.gridSize) / 2;
    const currentBest = gameData.data.games.memory.bestTime;
    const isNewRecord = !currentBest || this.gameTime < currentBest;

    // Update game data
    gameData.updateGameScore("memory", this.moves, {
      bestTime: isNewRecord ? this.gameTime : currentBest,
      perfectGames:
        gameData.data.games.memory.perfectGames + (perfectGame ? 1 : 0),
    });

    // Show completion message
    setTimeout(() => {
      let message = `Congratulations! You completed the memory game in ${this.moves} moves and ${this.gameTime} seconds.`;

      if (perfectGame) {
        message += " Perfect game - minimum moves achieved!";
        gameData.checkAchievement("perfectGame", "memory");
      }

      if (isNewRecord) {
        message += " New personal best time!";
      }

      alert(message);
    }, 500);
  }

  reset() {
    clearInterval(this.timerInterval);
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.gameTime = 0;
    this.isProcessing = false;
    this.setupGame();
  }
}
```

## 🎯 Complete Game Collection Manager

### Main Application Controller:

```javascript
class MiniGamesCollection {
  constructor() {
    this.currentGame = null;
    this.canvas = document.getElementById("game-canvas");
    this.gameHub = document.getElementById("game-hub");
    this.gameContainer = document.getElementById("game-container");

    this.games = {
      snake: () => new SnakeGame(this.canvas),
      memory: () => new MemoryGame(),
      reaction: () => new ReactionTimeTest(),
      numberGuess: () => new NumberGuessingGame(),
      drawing: () => new DrawingCanvas(this.canvas),
      pong: () => new PongGame(this.canvas),
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateUI();

    // Initialize sound effects
    this.setupSounds();

    console.log("🎮 Mini Games Collection initialized");
  }

  setupEventListeners() {
    // Game card clicks
    document.querySelectorAll(".play-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const gameCard = e.target.closest(".game-card");
        const gameType = gameCard.dataset.game;
        this.startGame(gameType);
      });
    });

    // Game controls
    document.getElementById("back-to-hub").addEventListener("click", () => {
      this.returnToHub();
    });

    document.getElementById("pause-btn").addEventListener("click", () => {
      this.pauseGame();
    });

    document.getElementById("restart-btn").addEventListener("click", () => {
      this.restartGame();
    });

    document.getElementById("sound-toggle").addEventListener("click", () => {
      this.toggleSound();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.returnToHub();
      } else if (e.key === "p" || e.key === "P") {
        this.pauseGame();
      } else if (e.key === "r" || e.key === "R") {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.restartGame();
        }
      }
    });
  }

  setupSounds() {
    soundManager.createSound("gameStart", 523, 0.2, "square");
    soundManager.createSound("eatFood", 659, 0.1, "square");
    soundManager.createSound("gameOver", 196, 0.5, "sawtooth");
    soundManager.createSound("levelUp", 784, 0.3, "square");
    soundManager.createSound("cardFlip", 440, 0.1, "sine");
    soundManager.createSound("match", 659, 0.2, "sine");
    soundManager.createSound("noMatch", 330, 0.2, "sine");
    soundManager.createSound("victory", 523, 0.5, "square");
    soundManager.createSound("click", 880, 0.05, "square");
  }

  startGame(gameType) {
    if (!this.games[gameType]) {
      console.error("Unknown game type:", gameType);
      return;
    }

    soundManager.play("click");

    // Hide hub, show game container
    this.gameHub.classList.add("hidden");
    this.gameContainer.classList.remove("hidden");

    // Update game title
    const titles = {
      snake: "🐍 Snake Game",
      memory: "💎 Memory Cards",
      reaction: "🎯 Reaction Test",
      numberGuess: "🎲 Number Guessing",
      drawing: "🎨 Drawing Canvas",
      pong: "🏓 Pong Game",
    };

    document.getElementById("current-game-title").textContent =
      titles[gameType];

    // Initialize and start the game
    this.currentGame = this.games[gameType]();

    if (this.currentGame instanceof GameEngine) {
      this.currentGame.start();
    }

    // Update high score display
    const gameData = gameDataManager.data.games[gameType];
    document.getElementById("game-high-score").textContent =
      gameData.highScore || 0;
    document.getElementById("current-score").textContent = "0";
    document.getElementById("current-level").textContent = "1";

    console.log("🎮 Started game:", gameType);
  }

  pauseGame() {
    if (this.currentGame && typeof this.currentGame.pause === "function") {
      this.currentGame.pause();

      const pauseBtn = document.getElementById("pause-btn");
      pauseBtn.textContent = this.currentGame.isPaused ? "▶️" : "⏸️";
    }
  }

  restartGame() {
    if (this.currentGame && typeof this.currentGame.reset === "function") {
      this.currentGame.reset();
      soundManager.play("gameStart");
    }
  }

  returnToHub() {
    // Stop current game
    if (this.currentGame && typeof this.currentGame.stop === "function") {
      this.currentGame.stop();
    }

    this.currentGame = null;

    // Show hub, hide game container
    this.gameContainer.classList.add("hidden");
    this.gameHub.classList.remove("hidden");

    // Update UI with latest stats
    this.updateUI();

    console.log("🏠 Returned to game hub");
  }

  toggleSound() {
    const muted = soundManager.toggleMute();
    const soundBtn = document.getElementById("sound-toggle");
    soundBtn.textContent = muted ? "🔇" : "🔊";

    gameDataManager.data.settings.soundEnabled = !muted;
    gameDataManager.saveData();
  }

  updateUI() {
    gameDataManager.updateUI();
  }
}

// Initialize the application
let soundManager, gameDataManager, gameApp;

document.addEventListener("DOMContentLoaded", () => {
  soundManager = new SoundManager();
  gameDataManager = new GameDataManager();
  gameApp = new MiniGamesCollection();

  // Expose globally for easy access
  window.gameApp = gameApp;
  window.soundManager = soundManager;
  window.gameData = gameDataManager;
});
```

## 🎯 Key Learning Points

### Game Development Concepts:

1. **Game Loops**: Understanding update/render cycles and animation frames
2. **State Management**: Tracking game state, scores, and player progress
3. **Input Handling**: Keyboard, mouse, and touch event processing
4. **Collision Detection**: Mathematical algorithms for object interactions
5. **Animation**: Smooth movement and visual effects
6. **Sound Integration**: Audio feedback and game atmosphere
7. **Canvas Manipulation**: 2D graphics and drawing operations
8. **Mobile Support**: Touch controls and responsive design

### Advanced JavaScript Features:

- **Class Inheritance**: Extending base classes for specific game implementations
- **Event Delegation**: Efficient event handling for dynamic content
- **Local Storage**: Persistent game data and high scores
- **Performance Optimization**: Efficient rendering and memory management
- **Modular Architecture**: Organized code structure with clear separation of concerns
- **Error Handling**: Graceful handling of edge cases and user errors

### Professional Development Practices:

- **Code Organization**: Clean, maintainable, and scalable architecture
- **User Experience**: Intuitive controls, visual feedback, and accessibility
- **Cross-Platform Support**: Desktop and mobile compatibility
- **Achievement Systems**: Engagement and progression mechanics
- **Data Persistence**: Saving and loading game progress

## 🚀 Congratulations!

You've completed the **Mini Games Collection** - your final JavaScript project! This comprehensive application demonstrates:

✅ **Complete JavaScript Mastery**: From basics to advanced game development
✅ **Real-World Application**: Professional-level code organization and practices
✅ **Interactive Programming**: User engagement and entertainment
✅ **Cross-Platform Development**: Desktop and mobile compatibility
✅ **Performance Optimization**: Efficient algorithms and smooth animations

### Your JavaScript Journey:

- **40+ Comprehensive Lessons** covering every aspect of JavaScript
- **3 Complete Projects** demonstrating real-world applications
- **Professional Practices** used in modern web development
- **Problem-Solving Skills** applicable to any programming challenge

---

🎮 **You are now a JavaScript Developer!** You have the knowledge and skills to build any web application, from simple scripts to complex interactive experiences. Your journey from zero to hero is complete - now go build amazing things!

The web development world is at your fingertips. Whether you want to create websites, web applications, games, or move into frameworks like React, TypeScript, or Node.js - you have the solid foundation to excel in any direction you choose!

**Happy coding, and welcome to the world of professional JavaScript development!** 🚀
