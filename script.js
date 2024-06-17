// subber.js
  var zmq = require("zeromq"),
  sock = zmq.socket("sub");
  const express = require('express');

  const http = require('http');
  var msg ="";
var speed="";
  const app = express();
sock.connect("tcp://192.168.1.52:3000");
console.log("Subscriber connected to port 3000");
sock.subscribe("battery");
console.log("connected to battery");
sock.subscribe("compass");
console.log("connected to compass");
sock.subscribe("speed");
console.log("connected to speed");
sock.subscribe("signal")
console.log("connected to signal");
sock.subscribe("throttle");
console.log("connected to throttle");
sock.subscribe("pitch");
console.log("connected to pitch")
sock.subscribe("roll");
console.log("connected to roll");
sock.on("message", function(topic, message) {
  
	if(topic.toString() === "speed")
	{
		speed = message.toString();
	console.log("sending speed data");
	}
	
	if(topic.toString() === "battery")
	{
		battery = message.toString();
		console.log("sending battery data");
	}
	
	if(topic.toString() === "compass")
	{
		compass = message.toString();
		console.log("sending compass data");
	}

	if(topic.toString() === "signal")
        {
                signal = message.toString();
                console.log("sending signal data");
        }
	if(topic.toString() === "throttle")
        {
                throttle = message.toString();
                console.log("sending throttle data");
        }
	if(topic.toString() === "pitch")
        {
                pitch = message.toString();
                console.log("sending pitch data");
        }
	if(topic.toString() === "roll")
        {
                roll = message.toString();
                console.log("sending roll data");
        }

	console.log("received a message related to:",topic.toString());
    	console.log("Sending Message to sketch");
    	setTimeout(() => {
      	console.log("Delayed for 1 second.");
    	}, "1000");
    
    	console.log("containing message:", message.toString());
 	 msg = message.toString();
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/api/products', (req, res) => {
  console.log("Got /api/products")
  
    res.json([battery,compass,speed,signal,throttle,pitch,roll]); // Send data as JSON
});
app.listen(4000, () => {
  console.log("Running on port 4000");
})

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//        // Typical action to be performed when the document is ready:
//        document.getElementById("demo").innerHTML = xhttp.responseText;
//     }
// };
// xhttp.open("GET", "script.js", true);
// xhttp.send();



  
