let capture;

let startTime=0, currentTime, flagTime = 0, start_button, reset_button, ACR = 190, SCR = 180, horizon_x, horizon_y, Currentspeed, maxSpeed=12, speedometer_x, speedometer_y;

//ACR is the radius of the artificial horizon
//SCR is the radius of the speedometer
function setup() {
  console.log("Screen Size: "+windowWidth+", "+windowHeight);
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

   //angleMode
   angleMode(DEGREES);
   console.log("Angle mode is set to from radians to degrees");
   
   frameRate(10);
   console.log("frame rate set to 30");
}

function draw() {
  horizon_x = windowWidth-100, horizon_y=250;
  speedometer_x = windowWidth-100, speedometer_y= 450;
  background(0);
  image(capture, 0, 0, 1056, 561);
  noStroke();
  textSize(30);
  fill(125,199,52);
  textSize(20);
  text(hour().toString().padStart(2,'0') +":"+minute().toString().padStart(2,'0')+":"+second().toString().padStart(2,'0'), windowWidth-100, 670); 
  textSize(30);
  
  //StopWatch
  start_button.mousePressed(startButton);
  reset_button.mousePressed(resetButton);
  if(flagTime == 0)
  {
  updateTime();
  text(floor(currentTime/60000).toString().padStart(2,'0')+":"+(floor(currentTime/1000)%60).toString().padStart(2,'0')+":" + ((currentTime)%1000).toString().padStart(3,'0'), windowWidth-140, 70);
}
  
  if(flagTime == 1)
  {
    text(floor(currentTime/60000).toString().padStart(2,'0')+":"+(floor(currentTime/1000)%60).toString().padStart(2,'0')+":" +((currentTime)%1000).toString().padStart(3,'0'), windowWidth-140, 70);
  }

  // Artificial Horizon
  artificialHorizon();
  //arc(windowWidth-85,400,150,150,0,PI,CHORD);
  

  console.log("Artificial Horizon layout deployed generated");
  speed();
  
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
function artificialHorizon()
{
  fill(0,0,0,0);
  stroke(125,199,52);
  circle(horizon_x,horizon_y,ACR);
  strokeWeight(0.5);
  //line(horizon_x+ACR/2,horizon_y,horizon_x-ACR/2,horizon_y)
  stroke(255,0,0);
  stroke(125,199,52);
  fill(255,0,0,50);
  let pitch = frameCount, roll = frameCount;
  arc(horizon_x,horizon_y,ACR,ACR,0+pitch,180-pitch,CHORD);
  fill(15,0,75,150);
  arc(horizon_x,horizon_y,ACR,ACR,180+pitch,0+pitch,CHORD);
  for(let i=15;i<=170;i+=15)
  {
    stroke(255,0,0);
    strokeWeight(0.2);
    line(horizon_x+ACR/2*cos(i),horizon_y+ACR/2*sin(i), horizon_x-ACR/2*cos(i),horizon_y-ACR/2*sin(i));
  }
}
function speed()
{
  fill(0,0,0,0);
  stroke(125,199,52); 
  strokeWeight(0.7);
  circle(speedometer_x, speedometer_y, SCR, SCR);

  for(let i=0;i<=maxSpeed;i++)
  {
    strokeWeight(3);
    circle(speedometer_x+SCR/2*cos(map(i,0,20,200,0)),speedometer_y+SCR/2*sin(map(i,0,20,200,0)),2);
  }
  push();
  line( map(Currentspeed,0,maxSpeed,0,));
  pop();
}
//battery
//throttle
//speedometer
//signal strength
//compass