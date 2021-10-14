//restart all server base like express and connection to RabbitMq

const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');

const apiRouter = require('../router/router');
const RabbitMQ = require("../models/rabbitMq");
const rabbit = new RabbitMQ(process.env.URL_RABBITMQ);


const setup = async (app) => {
    await rabbit.init();

    //
    setInterval(async()=>await rabbit.init(), 10000);

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Middleware to run for all requests that need RabbitMQ
    //create a chanel for every request and pass the rabbit
    app.use(async (req, _res, next) => {
        try {
            const connection = rabbit.connection;
            const channel = await connection.createChannel();
            req.locals = req.locals || {};
            req.locals.channel = channel;
            req.locals.rabbit = rabbit;
            return next();
        } catch (err) {
            console.log(err);
            return next(err);
        }
    });

    app.all("/*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials", true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');
        if (req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });

    app.use("/", apiRouter);
}
class ExpressLoader {
    constructor() {
        const app = express();
        setup(app);
        // Start application
        this.server = app.listen(process.env.PORT, () => {
            console.log(`Express running, now listening on port ${process.env.PORT}`);
        });
    }

    get Server() {
        return this.server;
    }
}

module.exports = ExpressLoader;