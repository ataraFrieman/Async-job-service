
// app application 

const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config()

const ExpressLoader = require("./loaders/express.loader");
new ExpressLoader();



