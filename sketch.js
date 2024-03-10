let capture;

let startTime=0, currentTime, flagTime = 0, start_button, reset_button;
function setup() {
  createCanvas(windowWidth,windowHeight);
  console.log("Canvas Created successfully");
  capture = createCapture(VIDEO);
  capture.size(1680,1080);
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
  console.log(windowWidth+","+windowHeight);
  background(0);

  image(capture, 0, 0, 1056, 561);

  textSize(30);
  fill(125,199,52);
  text(hour() +":"+minute()+":"+second(), windowWidth-140, 30); 
  circle(mouseX, mouseY, 20);
  
  //StopWatch
  start_button.mousePressed(startButton);
  reset_button.mousePressed(resetButton);
  if(flagTime == 0)
  {
  updateTime();
  text(floor(currentTime/60000).toString().padStart(2,'0')+":"+(floor(currentTime/1000)%60).toString().padStart(2,'0')+":" + (currentTime)%1000, windowWidth-140, 70);
  }
  
  if(flagTime == 1)
  {
    text(floor(currentTime/60000)+":"+floor(currentTime/1000)%60+":" + (currentTime)%1000, windowWidth-140, 70);
  }
  fill(0,0,0,0);
  stroke(125,199,52);
  circle(windowWidth-85,400,150);
  arc(windowWidth-85,400,150,150,0,PI,CHORD);
  
}

function startButton()
{
  flagTime = 0;
  console.log("Start button pressed"); 
  startTime = millis();
}
function resetButton()
{
  flagTime = 1
  console.log("reset button pressed");

}
function updateTime()
{
  currentTime=millis()-startTime;
}