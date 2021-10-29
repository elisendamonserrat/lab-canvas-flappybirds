"use strict";
class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.obstacles = [];
    this.player = null;
    this.gameIsOver = false;
    this.score = 0;
  }

  start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");

    // Create a new player for the current game
    this.player = new Player(this.canvas, 3);

    // Add event listener for moving the player
    this.handleKeyDown = (event) => {
      if (event.code === "ArrowUp") {
        this.player.setDirection("up");
      } else if (event.code === "ArrowDown") {
        this.player.setDirection("down");
      }
    };

    // Any function provided to eventListener
    // is always called by window (this === window)!
    document.body.addEventListener("keydown", this.handleKeyDown);

    // Start the canvas requestAnimationFrame loop
    this.startLoop();
  }

  startLoop() {
    const loop = () => {
      // We create the obstacles with random height
      if (Math.random() > 0.99) {
        const y = Math.random() * this.canvas.height;
        const x = this.canvas.width - 20;
        const height = Math.random() * this.canvas.height;
        this.obstacles.push(new Obstacle(this.ctx, x, y, 20, height, 1));
      }

      console.log("obstacles", this.obstacles);

      // 1. UPDATE THE STATE OF PLAYER AND WE MOVE THE OBSTACLES
      this.player.update();
      this.obstacles.forEach((obstacle) => {
        obstacle.move();
      });

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // 3. UPDATE THE CANVAS
      // Draw the player
      this.player.draw();

      // Draw the enemies

      this.obstacles.forEach((obstacle) => {
        obstacle.draw();
      });

      // 4. TERMINATE LOOP IF GAME IS OVER
      if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
      }

      //  5. Update Game data/stats
      //this.updateGameStats();
    };

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we need to `start an infinitive loop` till the game is over
    window.requestAnimationFrame(loop);
  }

  checkCollisions() {
    this.enemies.forEach((enemy) => {
      if (this.player.didCollide(enemy)) {
        this.player.removeLife();
        // Move the enemy off screen to the left
        enemy.x = 0 - enemy.size;

        if (this.player.lives === 0) {
          this.gameOver();
        }
      }
    });
  }
}