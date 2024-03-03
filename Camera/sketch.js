let capture;

function setup() {
  createCanvas(windowWidth,windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth,windowHeight);
  capture.hide(); 
}

function draw() {
  background(200);
  image(capture, 0, 0, windowWidth, windowHeight);
  textSize(30);
  fill(0);
  tint(255,255)
  text(hour() +":"+minute()+":"+second(), windowWidth-125, 30); 
  circle(mouseX, mouseY, 20);
  // resizeCanvas();
}

/*
let capture;

function setup() {
  createCanvas(390, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  //capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, 320, 240);
  filter(INVERT);
}*/
