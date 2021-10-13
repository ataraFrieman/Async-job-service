// a class that wraps a connection that will take care of it in such a way that the connection
//is saved as an information field in the class
// and every time it closes automatically we will try to reconnect.

const amqp = require("amqplib/callback_api");

class RabbitMQ {
  constructor(url) {
    this.url = url;
    this.messageHandlers = [];
  }

  async init() {
    await amqp.connect(this.url, async (connError, connection) => {
      if (connError) {
        console.log("Connection failed, retrying in 1 second");
        await sleep(1000);
      }
      connection.on("close", () => {
        console.log("Connection closed, reconnecting in 1 second");
        this.init();
      });
      this.connection = connection;

    //consumer from messageHandlers...
      const channel = await connection.createChannel();
      this.messageHandlers.forEach(({ queue, callback }) => {
        channel.consume(queue, callback.bind(null, channel));
      });
    });

    return this.connection;
  }

  //need to restart the consume function every time you reconnect to RabbitMQ
  // to re - listen to messages.For this i add to the department an additional information field
  // that will hold an array of queues and message handling functions in each queue, and run the consume each time after I reconnected.
  addMessageHandler(queue, callback) {
    this.messageHandlers.push({ queue, callback });
  }
}

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
module.exports = RabbitMQ;
