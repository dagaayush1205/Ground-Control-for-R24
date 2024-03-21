// subber.js
  var zmq = require("zeromq"),
  sock = zmq.socket("sub");
  const express = require('express');

  const http = require('http');
  var msg ="";
  const app = express();
sock.connect("tcp://127.0.0.1:3000");
sock.subscribe("kitty cats");
console.log("Subscriber connected to port 3000");

sock.on("message", function(topic, message) {
  console.log(
    "received a message related to:",
    topic.toString());
    console.log("Sending Message");

    setTimeout(() => {
      console.log("Delayed for 1 second.");
    }, "1000");
    
    console.log(
    "containing message:",
    message.toString()
  );
  msg = message.toString();
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const data = "7";
app.get('/api/products', (req, res) => {
  console.log("Got /api/products")
  
    res.json(msg); // Send data as JSON
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



  
