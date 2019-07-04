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

function draw() {
    background(51);

    translate(canvasWidth / 2, canvasHeight / 2);
    noFill();
    stroke(255);
    circle(0, 0, 2 * radius); //Uses diameter
    if (mouseIsPressed === true) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }

    let pointX = pointR * Math.cos(pointFi);
    let pointY = pointR * Math.sin(pointFi);
    fill(255);
    circle(pointX, pointY, 5);

    pointFi += 0.01;

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