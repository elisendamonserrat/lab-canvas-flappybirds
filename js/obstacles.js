class Obstacle {
  constructor(ctx, x, y, width, height, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "black";
    this.speed = speed;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed * -2;
  }
}
