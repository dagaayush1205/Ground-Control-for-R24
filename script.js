// subber.js
const zmq = require("zeromq");
const express = require('express');

const app = express();
const sock = zmq.socket("sub");

// Bind the subscriber to the same port
sock.connect("tcp://127.0.0.1:3000");
console.log("Subscriber connected to port 3000");

// Subscribe to the desired topics
const topics = ["battery", "compass", "speed", "signal", "throttle", "pitch", "roll"];
topics.forEach(topic => {
    sock.subscribe(topic);
    console.log(`Subscribed to topic: ${topic}`);
});

let battery, compass, speed, signal, throttle, pitch, roll;

// Receive messages from the publisher
sock.on("message", function(topic, message) {
    switch (topic.toString()) {
        case "speed":       
            speed = message.toString();
            break;
        case "battery":
            battery = message.toString();
            break;
        case "compass":
            compass = message.toString();
            break;
        case "signal":
            signal = message.toString();
            break;
        case "throttle":
            throttle = message.toString();
            break;
        case "pitch":
            pitch = message.toString();
            break;
        case "roll":
            roll = message.toString();
            break;
    }

    console.log("Received message:", topic.toString(), ":", message.toString());
});

// Set up a simple API to serve the data
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Allow all origins for testing
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/products', (req, res) => {
    console.log("Got /api/products");
    res.json({ battery, compass, speed, signal, throttle, pitch, roll }); // Send data as JSON
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});

