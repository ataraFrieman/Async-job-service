//The receiving party activates the messages

const rabbitMQ = require("../models/rabbitMq");
const fs = require("fs");
const path = require("path");

const start = async (typeQueue) => {
  const rabbit = new rabbitMQ(process.env.URL_RABBITMQ);
  rabbit.addMessageHandler(typeQueue, (channel, msg) => {

    //write to logs files and to console.
    writeDataToLog(typeQueue, msg.content.toString());
    console.log(`Received message: "${msg.content.toString()}"`);
    channel.ack(msg);
  });

  await rabbit.init();
};

const writeDataToLog = (fileName, content) => {
  const CreateFiles = fs.createWriteStream(
    path.join(__dirname, "../assets/logs", `${fileName}.txt`),{ flags: "a"}
  );
  CreateFiles.write(new Date() + content + "\r\n");
};

module.exports = {
  start
};
