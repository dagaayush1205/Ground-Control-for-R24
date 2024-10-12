let video;
let battery=0, compass=0, currentSpeed=0, signalStrength=0, power=0, pitch=0, roll=0;
var zmq = require("zeromq");
sock = zmq.socket("sub");   

function setup() {
  createCanvas(windowWidth, windowHeight); 

  // Create video capture and hide default DOM element
  video = createCapture(VIDEO);
  video.size(350, 200);  // Size of the video feed
  video.hide();          // Hide original video feed
  
  textFont('monospace');
  textSize(20);
  
  // Start fetching data from the Node.js server
  setInterval(getDataFromNode, 1000 ); // Fetch data every second
}

function getDataFromNode() {
  fetch('http://127.0.0.1:4000/api/products')
    .then(response => response.json()) // Parse JSON response
    .then(data => {
      battery = data[0];
      compass = data[1];
      currentSpeed = data[2];
      signalStrength = data[3];
      power = data[4];
      pitch = data[5];
      roll = data[6];
      console.log("Data received:", data[0]     );
    })
    .catch(error => console.error(error));  
}

function draw() {
  background(30);   
  // MOTOR Info Box
  fill(255);
  text("MOTOR", 50, 50);
  textSize(18);
  fill('red');
  text("State: N/A", 50, 100);
  fill(255);  
  text("Right: 0%", 50, 140);
  text("Left: 0%", 50, 180);
  fill('green');
  text(`Batt: ${battery}`, 50, 220); // Display battery level

  // GPS Info Box
  fill(255);
  text("GPS", 50, 450);
  fill('green');
  text("State: Fix", 50, 500);
  fill(255);
  text(`Spd: ${currentSpeed || 'N/A'} Km/h`, 50, 540); // Display current speed
  text("Alt: 267.5 mslm", 50, 580);
  fill('red');
  text(`Lat: ${compass || 'N/A'}`, 50, 620); // Display compass
  text(`Long: ${signalStrength || 'N/A'}`, 50, 660); // Display signal strength

  // Speed Control (right side of MOTOR info)
  fill(255);
  text("Speed", 400, 100);
  rect(400, 120, 200, 20); // Speed bar background
  fill(0, 255, 0);
  rect(400, 120, map(currentSpeed || 0, 0, 70, 0, 200), 20); // Speed bar fill

  fill(255);
  text("Turning Speed", 400, 160);
  rect(400, 180, 200, 20);
  fill(0, 255, 0);
  rect(400, 180, 160, 20);

  text("Auto Speed", 400, 220);
  rect(400, 240, 200, 20);

  text("Auto Turning Speed", 400, 280);
  rect(400, 300, 200, 20);

  // Radar (Top-center)
  fill(255);
  text("Remote Mode", 700, 100);
  noFill();
  stroke(0, 255, 0);
  strokeWeight(3);
  arc(750, 200, 150, 150, PI, TWO_PI); // Radar arc
  arc(750, 200, 100, 100, PI, TWO_PI);
  line(750, 200, 750, 125); // Center line
  line(750, 200, 700, 145);
  line(750, 200, 800, 145);
  line(750, 200, 675, 200);
  line(750, 200, 825, 200);

  // Compass (Top-right)
  fill(255);
  textSize(40);
  text(compass+"°", 1100, 100);
  noFill();
  stroke(255);
  ellipse(1100, 193, 150, 150); // Compass circle
  strokeWeight(2);
  line(1100, 200, 1150, 150); // Compass needle
  
  fill('red');
  textSize(25);
  text("N", 1090, 140);
  
  fill(255);
  textSize(20);
  text("W", 1040, 200);
  text("E", 1150, 200);
  text("S", 1090, 260);

  // Track Route (GPS chart)
  fill(255);
  text("TRACK ROUTE", 400, 490);
  noFill();
  stroke(255);
  rect(400, 500, 500, 200); // Empty track route chart placeholder

  // Display the video feed (Bottom-right)
  image(video, 1000, 500, 350, 200);  // Position the video feed on the canvas
}
