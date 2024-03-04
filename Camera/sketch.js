let capture;

var startTime;
function setup() {
  createCanvas(windowWidth,windowHeight);
  capture = createCapture(VIDEO);
  capture.size(1680,1050);
  capture.hide(); 
}

function draw() {
  background(0);
  image(capture, 0, 0, 1280, 650);
  textSize(30);
  fill(125,199,52);
  // tint(255,255)
  text(hour() +":"+minute()+":"+second(), windowWidth-140, 30); 
  text(millis(), windowWidth-140, 70);
  circle(mouseX, mouseY, 20);
  //resizeCanvas();
}
function keyPressed(){
  if(key =='s'){
    startTime=millis();
    currentTime=startTime-currentTime;
  }
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
