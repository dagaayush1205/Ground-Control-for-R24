import zmq
import time
import random

# Create a ZeroMQ context
context = zmq.Context()

# Create a PUB socket
socket = context.socket(zmq.PUB)

# Bind the socket to an endpoint (e.g., a TCP port)
socket.bind("tcp://127.0.0.1:3000")  # You can change the port if needed

try:
    while True:
        # Prepare the message data to send
        battery = random.randint(0, 100)  # Example message
        compass = random.randint(0, 360)
        speed = random.uniform(0, 7)  # Speed as float value
        signal = random.randint(0, 100)
        throttle = random.randint(-100, 100) + 300
        pitch = random.randint(-90, 90)
        roll = random.randint(-90, 90)

        # Create multipart message with topics
        socket.send_multipart([b"battery", str(battery).encode('utf-8')])
        socket.send_multipart([b"compass", str(compass).encode('utf-8')])
        socket.send_multipart([b"speed", str(speed).encode('utf-8')])
        socket.send_multipart([b"signal", str(signal).encode('utf-8')])
        socket.send_multipart([b"throttle", str(throttle).encode('utf-8')])
        socket.send_multipart([b"pitch", str(pitch).encode('utf-8')])
        socket.send_multipart([b"roll", str(roll).encode('utf-8')])

        # Log the data sent
        print(f"Sent - battery: {battery}, compass: {compass}, speed: {speed:.2f}, signal: {signal}, throttle: {throttle}, pitch: {pitch}, roll: {roll}")
        
        # Simulate a delay between messages
        time.sleep(0.5)

except KeyboardInterrupt:
    print("Publisher stopped by user.")

finally:
    # Clean up the socket
    socket.close()
    context.term()
        
