const startSender = (channel, typeQueue,data) => {
  channel.assertQueue(typeQueue);
  channel.sendToQueue(typeQueue, Buffer.from(JSON.stringify(data)));
};

module.exports = {
  startSender,
};
