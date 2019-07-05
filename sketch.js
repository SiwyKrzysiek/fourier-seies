let running = true;
let fourier;

function setup() {
    let containerWidth = document.getElementById("sketch").offsetWidth;
    canvasHeight = containerWidth * 0.5;

    createCanvas(containerWidth, canvasHeight).parent("sketch");

    let fourierX = width * 0.3;
    let fourierY = height / 2;
    let dt = 0.01;
    let startingCircles = document.getElementById("amountOfCircles").value;
    let size = height * 0.25;
    fourier = new SquareWaveFourier(fourierX, fourierY, startingCircles, dt, size);


    document.getElementById("play").onclick = togglePlay;
    document.getElementById("amountOfCircles").oninput = changeCircleAmount;
}

// let myCircle1 = new Circle(0, 0, 100, 1);
// let myCircle2 = new Circle(myCircle1.pointX, myCircle1.pointY, 100/3, 3)

let plot = [];

function draw() {
    background(51);

    // translate(width / 2 - 120, height / 2);
    
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

    translate(width * 0.7, 0);
    beginShape();
    for (let i = 0; i < plot.length; i++ ) {
        vertex(i, plot[i]);
    }
    endShape();

    if (plot.length > 700)
        plot.pop();
}

function changeCircleAmount(event) {
    // console.log(event.target.value);
    fourier.changeCircleAmount(event.target.value)
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

function windowResized() {
    let containerWidth = document.getElementById("sketch").offsetWidth;
    canvasHeight = containerWidth * 0.5;
    resizeCanvas(containerWidth, canvasHeight);

    console.log(width, height);
  }