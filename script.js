// subber.js
var zmq = require("zeromq"),
  sock = zmq.socket("sub");
  const express = require('express');

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



  