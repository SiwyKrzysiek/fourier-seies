Array.prototype.last = function() {
    return this[this.length - 1];
}

class SquareWaveFourier {
    constructor(x, y, n = 1, dt = 0.01, baseRadius = 100, t = 0) {
        this.x = x;
        this.y = y;
        this.dt = dt;
        this.baseRadius = baseRadius;

        this.t = t;
        this.circles = [];

        this.changeCircleAmount(n);
    }

    get finalX() {
        return this.circles.length == 0 ? this.x : this.circles.last().pointX;
    }

    get finalY() {
        return this.circles.length == 0 ? this.y : this.circles.last().pointY;
    }

    changeCircleAmount(newAmount) {
        if (newAmount <= this.circles.length) { //Remove circles
            this.circles.splice(newAmount);
            return;
        }

        for (let i = this.circles.length; i < newAmount; i++) { //Add circles
            let oddIndex = 2 * i + 1;
            let radius = this.baseRadius / oddIndex;
            let newCircle = new Circle(this.finalX, this.finalY, 
                radius, oddIndex, this.t, this.dt);

            this.circles.push(newCircle);
        }
    }

    draw() {
        for (const circle of this.circles) {
            circle.draw();
        }
    }

    update() {
        this.t += this.dt;

        for (let i = 0; i < this.circles.length; i++) {
            const circle = this.circles[i];
            circle.update();

            if (i > 0) {
                circle.x = this.circles[i-1].pointX;
                circle.y = this.circles[i-1].pointY;
            }
        }
    }
}