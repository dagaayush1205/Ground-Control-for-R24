import zmq
import time
import random
# Create a ZeroMQ context
context = zmq.Context()

# Create a PUB socket
socket = context.socket(zmq.PUB)

# Bind the socket to an endpoint (e.g., a TCP port)
socket.bind("tcp://127.0.0.1:3000")  # You can change the port if needed

while True:
    # Prepare the message to send
    battery = random.randint(0,100)  # Example message
    compass = random.randint(0,360)
    speed = random.randint(0,7)
    signal = random.randint(0,100)
    throttle = random.randint(0,100)
    pitch = random.randint(0,360)
    roll = random.randint(0,360)

    # Optionally, specify a topic for the message (if using topics)
    socket.send_multipart([b"battery", str(battery).encode('utf-8')])
    socket.send_multipart([b"compass", str(compass).encode('utf-8')])
    socket.send_multipart([b"speed", str(speed).encode('utf-8')])
    socket.send_multipart([b"signal", str(signal).encode('utf-8')])
    socket.send_multipart([b"throttle", str(signal).encode('utf-8')])
    socket.send_multipart([b"pitch", str(pitch).encode('utf-8')])
    # you are over here, working on the above which is still incomplete
    print(battery)
    print(compass)
    print(speed)
    # Send the message
    #socket.send_string(message)

    # Simulate some work or delay between messages
    time.sleep(0.5)
    print("Message Sent")
