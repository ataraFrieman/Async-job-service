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



postman request exam:
All requests must contain in body:
{"msg":"..."}!!!

1. type:POST
url:http://localhost:5000/email/ihihi1425hvy/status?status=recived

in the body use json format with:
{"msg":"recived"}

2.type:GET
url:http://localhost:5000/emails/1234568

in the body use json format with:
{"msg":"paid up"}

3. type:PUT
url:http://localhost:5000
get an error;

link to collection:
https://www.getpostman.com/collections/64c919dccfcb4d2ccd0d

Thank you!!



