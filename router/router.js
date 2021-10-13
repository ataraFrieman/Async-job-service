//router base definitions

const app = require("express");

const reciver = require("../services/reciver.service");
const router = app.Router();

//In the path i can pull the Channel and post messages to it
router.all("/*", (req, res) => {
  try {
    const { channel } = req.locals,
      typeQueue = req.originalUrl.split("/")[1],
          data = { type: typeQueue, payload: req.body.msg };
      
      if (typeQueue === '') {
          res.sendStatus(500);
          return;
      }
    channel.assertQueue(typeQueue);
    channel.sendToQueue(typeQueue, Buffer.from(JSON.stringify(data)));
    reciver.start(typeQueue);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
