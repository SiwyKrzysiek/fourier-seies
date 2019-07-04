class Circle {
    constructor(x, y, radius, speed) {
        this.pointAngle = 0;
        this.slowdown = 0.01;

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
    }

    get pointX() {
        return this.radius * Math.cos(this.pointAngle);
    }

    get pointY() {
        return this.radius * Math.sin(this.pointAngle);
    }

    update() {
        this.pointAngle += this.speed * this.slowdown;
    }

    draw() {
        noFill();
        stroke(255);
        circle(this.x, this.y, this.radius * 2);

        fill(255);
        circle(this.pointX, this.pointY, this.radius / 20);
    }
}