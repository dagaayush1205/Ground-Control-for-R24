let capture;

let startTime, currentTime, start_button, reset_button;
function setup() {
  createCanvas(windowWidth,windowHeight);
  console.log("Canvas Created successfully");
  capture = createCapture(VIDEO);
  capture.size(1680,1050);
  console.log("Video Capture generated successfully");
  capture.hide(); // hide original feed
  console.log("Raw Video Hidden");

   //Button for start
   start_button = createButton('Start');
   //Button for stop and reset
   start_button.position(windowWidth-140, 90)
   reset_button = createButton('Stop/Reset');
   reset_button.position(windowWidth-90, 90);
   console.log("Button generated");
}

function draw() {
  background(145);
  image(capture, 0, 0, 1280, 650);
  textSize(30);
  fill(125,199,52);
  text(hour() +":"+minute()+":"+second(), windowWidth-140, 30); 
  text(millis(), windowWidth-140, 70);
  circle(mouseX, mouseY, 20);
if (startTime > 0) {
  currentTime = millis() - startTime;
  // startTime=millis();
  // currentTime=startTime-currentTime;
  // text("Hello", windowWidth-140, 70);
 }
 if (startButton.mouseIsPressed) {
  console.log("Start button pressed"); // Log to console instead of `log`
  if (startTime === 0) { // Start timer only if not already running
    startTime = millis();
  }
}
function mousePressed(){
  if (start_button.mouseIsPressed) {
    console.log("Start button pressed"); // Log to console instead of `log`
    if (startTime === 0) { // Start timer only if not already running
      startTime = millis();
    }
  }

  // Handle Stop/Reset button click
  if (reset_button.mouseIsPressed) {
    console.log("Stop/Reset button pressed");
    startTime = 0; // Reset timer
  }
}
}


  // if(key =='s'){
  //   startTime=millis();
  //   currentTime=startTime-currentTime;
  //   text(currentTime, windowWidth-140, 70);
  // }


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
