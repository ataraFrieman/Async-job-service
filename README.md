Instructions

The code must be extracted
Perform npm i
Then npm start
I set up a server with express
And execution of the request through the postman.


In the loaders folder:
An initial charge is made there. 
I also initialize an initial connection to rabbitmq

In the models folder :
There is a model called rabbitmq
this is basically the model through which 
i connect and save the messages in queque
it holds a boot and create chanel function
and the execution function of the messages

In the router folder:
There is a main router
currently suitable for all existing applications
and he receives a request and drops the income to the queqe
and the operation of the reciver

In the service folder:
There are two sevices
One per sender
And one to reciver


Thank you!!
