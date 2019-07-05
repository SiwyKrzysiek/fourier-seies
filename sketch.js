let canvasWidth = 600;
let canvasHeight = 400;

let radius = 100;
// Rotating point
let pointR = radius;
let pointFi = 0;

let running = true;

function setup() {
    createCanvas(canvasWidth, canvasHeight).parent("sketch");
    document.getElementById("play").onclick = togglePlay;
}

// let myCircle1 = new Circle(0, 0, 100, 1);
// let myCircle2 = new Circle(myCircle1.pointX, myCircle1.pointY, 100/3, 3)
let fourier = new SquareWaveFourier(0, 0, 2);

let plot = [];

function draw() {
    background(51);

    translate(canvasWidth / 2 - 120, canvasHeight / 2);
    
    // myCircle1.draw();
    // myCircle1.update();

    // myCircle2.x = myCircle1.pointX;
    // myCircle2.y = myCircle1.pointY;
    // myCircle2.draw();
    // myCircle2.update();

    // plot.unshift(myCircle2.pointY);

    fourier.draw();
    plot.unshift(fourier.finalY);
    fourier.update();

    translate(220, 0);
    beginShape();
    for (let i = 0; i < plot.length; i++ ) {
        vertex(i, plot[i]);
    }
    endShape();

    if (plot.length > 200)
        plot.pop();
}

function togglePlay(mouseEvent) {
    let icon = document.getElementById("playIcon");

    if (running) {
        noLoop();
        running = false;
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    }
    else {
        loop();
        running = true;
        icon.classList.add("fa-pause");
        icon.classList.remove("fa-play");
    }
}