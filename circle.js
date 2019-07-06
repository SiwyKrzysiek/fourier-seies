class Circle {
    constructor(x, y, radius, speed, t = 0, dt = 0.01) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.dt = dt;
        this.t = t;

        this.pointAngle = this.speed * this.t;
    }

    get pointX() {
        return this.x + this.radius * Math.cos(this.pointAngle);
    }

    get pointY() {
        return this.y + this.radius * Math.sin(this.pointAngle);
    }

    update() {
        this.t += this.dt;
        // this.pointAngle += this.speed * this.dt;
        this.pointAngle = this.speed * this.t;
    }

    draw() {
        noFill();
        stroke(255);
        circle(this.x, this.y, this.radius * 2);

        line(this.x, this.y, this.pointX, this.pointY);
    }
}