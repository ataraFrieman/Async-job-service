//router base definitions

const app = require("express");

const reciver = require("../services/reciver.service");
const sender = require("../services/sender.service");

const router = app.Router();

router.all("/*", (req, res) => {
  try {
    const { channel,rabbit } = req.locals,
      typeQueue = req.originalUrl.split("/")[1],
          data = { type: typeQueue, payload: req.body.msg };
      
      if (typeQueue === '') {
          res.sendStatus(500);
          return;
    }

    sender.startSender(channel,typeQueue,data)
    reciver.initialRecive(typeQueue,rabbit);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
