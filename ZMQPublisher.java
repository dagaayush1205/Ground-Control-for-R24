import org.zeromq.ZMQ;
import java.util.Random;

public class ZMQPublisher {

    public static void main(String[] args) {
        // Create a ZeroMQ context
        ZMQ.Context context = ZMQ.context(1);

        // Create a PUB socket
        ZMQ.Socket socket = context.socket(ZMQ.PUB);

        // Bind the socket to an endpoint (e.g., a TCP port)
        socket.bind("tcp://127.0.0.1:3000");  // You can change the port if needed

        Random random = new Random();

        try {
            while (true) {
                // Prepare the message data to send
                int battery = random.nextInt(101);  // Example message
                int compass = random.nextInt(361);
                float speed = random.nextFloat() * 7;  // Speed as float value
                int signal = random.nextInt(101);
                int throttle = random.nextInt(201) - 100 + 300;
                int pitch = random.nextInt(181) - 90;
                int roll = random.nextInt(181) - 90;

                // Send multipart messages with topics
                socket.sendMore("battery");
                socket.send(String.valueOf(battery));

                socket.sendMore("compass");
                socket.send(String.valueOf(compass));

                socket.sendMore("speed");
                socket.send(String.valueOf(speed));

                socket.sendMore("signal");
                socket.send(String.valueOf(signal));

                socket.sendMore("throttle");
                socket.send(String.valueOf(throttle));

                socket.sendMore("pitch");
                socket.send(String.valueOf(pitch));

                socket.sendMore("roll");
                socket.send(String.valueOf(roll));

                // Log the data sent
                System.out.printf("Sent - battery: %d, compass: %d, speed: %.2f, signal: %d, throttle: %d, pitch: %d, roll: %d%n",
                        battery, compass, speed, signal, throttle, pitch, roll);

                // Simulate a delay between messages
                Thread.sleep(500);
            }
        } catch (InterruptedException e) {
            System.out.println("Publisher interrupted.");
        } finally {
            // Clean up the socket
            socket.close();
            context.term();
        }
    }
}

