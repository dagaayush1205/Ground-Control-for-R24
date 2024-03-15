import zmq
from random import randrange

context = zmq.context()
socket = context.socket(zmq.PUB)
socket.bind(tcp://*3000)
zmq_setsockopt()
