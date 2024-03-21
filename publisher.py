import zmq
import time

# Create a ZeroMQ context
context = zmq.Context()

# Create a PUB socket
socket = context.socket(zmq.PUB)

# Bind the socket to an endpoint (e.g., a TCP port)
socket.bind("tcp://127.0.0.1:3000")  # You can change the port if needed

while True:
    # Prepare the message to send
    message = "Hello"  # Example message

    # Optionally, specify a topic for the message (if using topics)
    socket.send_multipart([b"kitty cats", b"Hello"])

    # Send the message
    #socket.send_string(message)

    # Simulate some work or delay between messages
    time.sleep(0.5)
    print("Message Sent")