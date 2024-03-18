// subber.js
var zmq = require("zeromq"),
  sock = zmq.socket("sub");
  const express = require('express');

  const http = require('http');

  const app = express();

  app.get('/get-data', (req, res) => {
    const dataToSend = { message: 'This data is from Node.js!' };
    res.json(dataToSend);
  });
sock.connect("tcp://127.0.0.1:3000");
sock.subscribe("kitty cats");
console.log("Subscriber connected to port 3000");

sock.on("message", function(topic, message) {
  console.log(
    "received a message related to:",
    topic.toString());
    setTimeout(() => {
      console.log("Delayed for 1 second.");
    }, "1000");
    
    console.log(
    "containing message:",
    message.toString()
  );
});
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "filename", true);
xhttp.send();



  