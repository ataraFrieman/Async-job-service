//The receiving party activates the messages

const rabbitMQ = require("../models/rabbitMq");
const fs = require("fs");
const path = require("path");

const initialRecive = async (typeQueue,rabbit) => {
  rabbit.addMessageHandler(typeQueue, (channel, msg) => {
    
    //write to logs files and to console.
    writeDataToLog(typeQueue, msg.content.toString());
    console.log(`Received message: "${msg.content.toString()}"`);
    channel.ack(msg);
  });
};

const writeDataToLog = (fileName, content) => {
  const CreateFiles = fs.createWriteStream(
    path.join(__dirname, "../assets/logs", `${fileName}.txt`),{ flags: "a"}
  );
  CreateFiles.write(new Date() + content + "\r\n");
};

module.exports = {
  initialRecive
};
