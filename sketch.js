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

let myCircle = new Circle(0, 0, 100, 2);

function draw() {
    background(51);

    translate(canvasWidth / 2, canvasHeight / 2);
    
    myCircle.draw();
    myCircle.update();
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