let capture;

let startTime=0, currentTime, flagTime = 0, start_button, reset_button, ACR = 190, SCR = 180, horizon_x, horizon_y, currentSpeed=1, maxSpeed=7, speedometer_x, speedometer_y;
let signalStrength = 90, compass_x, compass_y, battery = 98, pitch, roll;
let img;
var zmq = require("zeromq");
sock = zmq.socket("sub");
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
   start_button.position(windowWidth-160, 55)
   reset_button = createButton('Stop/Reset');
   reset_button.position(windowWidth-110, 55);
   console.log("Button generated");

   //angleMode
   angleMode(DEGREES);
   console.log("Angle mode is set to from radians to degrees");
   
   frameRate(15);
   console.log("frame rate set to 15");
} 

function getDataFromNode() {
  fetch('http://127.0.0.1:4000/api/products')
    .then(response => response.json()) // Parse JSON response
    .then(data => {
      //console.log(response);  
      // Access the data object (data.products)
        console.log(data);
        battery = data[0];
        //compassACR*sin(pitch)+2*ACR*pitch/180+horizon_x, ACR*sin(pitch)+ACR*pitch/90+horizon_y, horizon_x-ACR*(sin(pitch)+pitch/90), horizon_y-ACR*(sin(pitch)+pitch/90)); = data[1];
        currentSpeed = data[2];
        signalStrength =  data[3];
        //throttle = 
        pitch = data[5];
        roll = data[6];
    })
    .catch(error => console.error(error)); 
}


function draw() {
  horizon_x = windowWidth-1150, horizon_y=windowHeight-130;
  speedometer_x = windowWidth-650, speedometer_y= windowHeight-130;
  background(0);
  fill(50,50,50,256);
  noStroke();
  quad(windowWidth,windowHeight,windowWidth,windowHeight-30,0,windowHeight-30, 0, windowHeight);
  image(capture, 0, 0, windowWidth, windowHeight);
  textSize(30);
  fill(125,199,52,255);
  textSize(20);
  text(hour().toString().padStart(2,'0') +":"+minute().toString().padStart(2,'0')+":"+second().toString().padStart(2,'0'), windowWidth-100, windowHeight-10); 
  textSize(30);
  
  //StopWatch
  start_button.mousePressed(startButton);
  reset_button.mousePressed(resetButton);
  if(flagTime == 0)
  {
  updateTime();
  text(floor(currentTime/60000).toString().padStart(2,'0')+":"+(floor(currentTime/1000)%60).toString().padStart(2,'0')+":" + ((currentTime)%1000).toString().padStart(3,'0'), windowWidth-160, 40);
}
  
  if(flagTime == 1)
  {
    text(floor(currentTime/60000).toString().padStart(2,'0')+":"+(floor(currentTime/1000)%60).toString().padStart(2,'0')+":" +((currentTime)%1000).toString().padStart(3,'0'), windowWidth-160, 40);
  }

  // Artificial Horizon
  artificialHorizon();
  //arc(windowWidth-85,400,150,150,0,PI,CHORD);
  
  speed();
  textSize(11);
  noStroke();
  fill(125,199,52);
  text("battery: "+battery+"%", windowWidth-250, windowHeight-13);
  compass();
  throttle();
  signal();
  getDataFromNode();
}

function throttle()
{
let t = frameCount;
  let x = 1200;
  let y = 100 * sin(t) +300;//  let y = 100 * map(x,0,max,-1,+1) +300;
  strokeWeight(3);
  line(1200, 200, 1200, 400);
  strokeWeight(2);
  circle(x, y, 10);

}
function compass()
{ compass_x = windowWidth-900, compass_y=windowHeight-130;
  fill(0,0,0,0);
  stroke(125,199,52);
  circle(compass_x,compass_y,ACR);
  for(let i=0;i<360 ;i+=30)
  {
    strokeWeight(3);
    let mark = i+frameCount;
    line(compass_x+(ACR/2 * sin(mark)),compass_y+(ACR/2 * cos(mark)),compass_x+(((ACR/2)-5) * sin(mark)), compass_y+((ACR/2)-5) * cos(mark));
    textSize(8);
    fill(125,199,52);
    strokeWeight(0.1);
    if(i>=180){
    text(i,compass_x+(((ACR/2)-30) * sin(mark)), compass_y+((ACR/2)-30) * cos(mark));
    }
    if(i<180){
      text(i,compass_x+(((ACR/2)-30) * sin(mark)), compass_y+((ACR/2)-30) * cos(mark));
      }
  }
  for(let i = 0; i<=360;i+=1 )
  {
    strokeWeight(0.5);
    let mark = i+frameCount;
    line(compass_x+(ACR/2 * sin(mark)),compass_y+(ACR/2 * cos(mark)),compass_x+(((ACR/2)-5) * sin(mark)), compass_y+((ACR/2)-5) * cos(mark));
  }
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
  fill(0,255,255,100);
  circle(horizon_x-(ACR*pitch/90)+sqrt(ACR*ACR-ACR*pitch/90)*sin(pitch),horizon_y-sqrt(ACR*ACR-ACR*pitch/90)*cos(pitch),10);
  fill(15,0,75,150);
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
  fill(125,199,52,255);
  for(let i=0;i<=maxSpeed;i++)
  {
    strokeWeight(3);
    let mark = map(i,0,maxSpeed,300,60);
    line(speedometer_x+(SCR/2 * sin(mark)),speedometer_y+(SCR/2 * cos(mark)),speedometer_x+(((SCR/2)-5) * sin(mark)), speedometer_y+((SCR/2)-5) * cos(mark));
    textSize(10);
    strokeWeight(0.5);
    text(i,speedometer_x+(((SCR/2)-15) * sin(mark)), speedometer_y+((SCR/2)-15) * cos(mark));
  }
  let needle = map(currentSpeed,0,maxSpeed,300,60);
  strokeWeight(2);
  line(speedometer_x, speedometer_y,speedometer_x + ((SCR/2-5) * sin(needle)),speedometer_y + ((SCR/2-5) * cos(needle)));
}
function signal()
{
  noStroke();
  text("Signal: "+signalStrength+"%", windowWidth-170, windowHeight-13);
  // if(signalStrength>75)
  // {
  //   img=loadImage('Pictures/Signal/WiFi_4.png');
  // }
  // else if(signalStrength<=75 && signalStrength>50)
  // {
  //   img=loadImage('Pictures/Signal/WiFi_3.png');
  // }
  // else if(signalStrength<=50 && signalStrength>25)
  // {
  //   img=loadImage('Pictures/Signal/WiFi_2.png');
  // }
  // else if(signalStrength<=25 && signalStrength>0)
  // {
  //   img=loadImage('Pictures/Signal/WiFi_1.png');
  // }
  // else
  // {
  //   img=loadImage('Pictures/Signal/WiFi_0.png');
  // }
  // image(img,0,0,100,100);
  // let img1=loadImage('ABC.png');
  // image(img1,0,0,1000,1000);
}

//battery done
//throttle done
//speedometer done
//signal strength done
//compass
//add digital values for all
//async in js
