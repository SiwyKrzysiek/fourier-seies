let running = true;
let fourier;
let plot = [];

function setup() {
    let containerWidth = document.getElementById("sketch").offsetWidth;
    canvasHeight = containerWidth * 0.5;

    createCanvas(containerWidth, canvasHeight).parent("sketch");

    initializeFourier();

    document.getElementById("play").onclick = togglePlay;
    document.getElementById("amountOfCircles").oninput = changeCircleAmount;
    document.addEventListener('visibilitychange', handleVisibilityChange, false);
}

// let myCircle1 = new Circle(0, 0, 100, 1);
// let myCircle2 = new Circle(myCircle1.pointX, myCircle1.pointY, 100/3, 3)


function draw() {
    background(51);

    fourier.draw();

    translate(width * 0.7, 0);
    drawPlot();

    fourier.update();
    updatePlot();
}

function updatePlot() {
    plot.unshift(fourier.finalY);

    if (plot.length > 700)
        plot.pop();
}

function drawPlot() {
    beginShape();
    for (let i = 0; i < plot.length; i++) {
        vertex(i, plot[i]);
    }
    endShape();

    // if (plot.length < 2)
    //     return;

    // translate(0, height / 2);

    // let size = height * 0.25;
    // let amplitude = size;
    // let length = 70;
    // let lastX = 0;
    // let lastY = amplitude;

    // let from = fourier.t;
    // let to = fourier.t + plot.length;
    // let pointInTime = fourier.t % length;
    // if (pointInTime > length / 2) //Point is in the down part of square wave
    //     lastY *= -1;

    // let finishDistance = min(length / 2 - pointInTime, plot.length);
    // dashedLine(lastX, lastY, finishDistance, lastY);
    // lastX = finishDistance;

    // for (let i = finishDistance + length; i <= plot.length; i += length) {
    //     let newX = i;
    //     let newY = -lastY;

    //     dashedLine(lastX, lastY, lastX, newY);
    //     dashedLine(lastX, newY, newX, newY);

    //     [lastX, lastY] = [newX, newY];
    // }

    // for (let i = length; i < plot.length; i += length) {
    //     let newX = i;
    //     let newY = -lastY;

    //     dashedLine(lastX, lastY, newX, lastY);
    //     dashedLine(newX, lastY, newX, newY);

    //     [lastX, lastY] = [newX, newY];
    // }


}

function initializeFourier() {
    let fourierX = width * 0.3;
    let fourierY = height / 2;
    let dt = 0.01;
    let startingCircles = document.getElementById("amountOfCircles").value;
    let size = height * 0.25;
    let t = fourier ? fourier.t : 0;

    console.log(t);
    fourier = new SquareWaveFourier(fourierX, fourierY, startingCircles, dt, size, t);
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

    initializeFourier();
    plot = [];
}

function dashedLine(x1, y1, x2, y2, g = 5, l = 1, ) {
    if (x1 == x2 && y1 == y2)
        return;

    var pc = dist(x1, y1, x2, y2) / 100;
    var pcCount = 1;
    var lPercent = gPercent = 0;
    var currentPos = 0;
    var xx1 = yy1 = xx2 = yy2 = 0;

    while (int(pcCount * pc) < l) {
        pcCount++
    }
    lPercent = pcCount;
    pcCount = 1;
    while (int(pcCount * pc) < g) {
        pcCount++
    }
    gPercent = pcCount;

    lPercent = lPercent / 100;
    gPercent = gPercent / 100;
    while (currentPos < 1) {
        xx1 = lerp(x1, x2, currentPos);
        yy1 = lerp(y1, y2, currentPos);
        xx2 = lerp(x1, x2, currentPos + lPercent);
        yy2 = lerp(y1, y2, currentPos + lPercent);
        if (x1 > x2) {
            if (xx2 < x2) {
                xx2 = x2;
            }
        }
        if (x1 < x2) {
            if (xx2 > x2) {
                xx2 = x2;
            }
        }
        if (y1 > y2) {
            if (yy2 < y2) {
                yy2 = y2;
            }
        }
        if (y1 < y2) {
            if (yy2 > y2) {
                yy2 = y2;
            }
        }

        line(xx1, yy1, xx2, yy2);
        currentPos = currentPos + lPercent + gPercent;
    }
}

let autoPaused = false;

// Handle page visibility change events
function handleVisibilityChange() {
    if (document.visibilityState == "hidden") {
        if (running) {
            noLoop();
            running = false;
            autoPaused = true;
        }
    } else {
        if (autoPaused) {
            loop();
            running = true;
            autoPaused = false;
        }
    }
}
