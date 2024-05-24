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

    # Optionally, specify a topic for the message (if using topics)
    socket.send_multipart([b"battery",b"5"])# str(battery).encode('utf-8')])
    socket.send_multipart([b"compass",b"5"])# str(compass).encode('utf-8')])
    socket.send_multipart([b"speed", str(speed).encode('utf-8')])
    print(battery)
    print(compass)
    print(speed)
    # Send the message
    #socket.send_string(message)

    # Simulate some work or delay between messages
    time.sleep(0.5)
    print("Message Sent")
