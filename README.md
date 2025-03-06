This is webpage WIP for R24 ground Control
View the site at https://dagaayush1205.github.io/Ground-Control-for-R24/

The main obejctive of this page to display data received from the rover during the run
and display it to the to driver midst the run or simply display the status of the 
rover during autonomous runs. 

This depends on the zeroMQ for data tranfer. It uses Socket and a pub/sub type of
communication between the rover and the driver. The webpage is developed using 
p5Js and the data is received from the rover in the node.js file. This sends the data
to the client side(the frontend).

Certain improvements that I would like to work on the future is to:
1. Give the page a more interactive and modern look.
2. To add a local map of the surrounding and display unexplored areas.
3. add a cpp version of the publisher code 
