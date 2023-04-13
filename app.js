const express = require("express");
const morgan = require("morgan"); // Logger
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
require("dotenv").config();

// J'importe mes routes qui sont mtn dans mon index.js
const router = require("./routes/index.js");

// on crée une instance d'une application express
// c'est le petit serveur sur lequel va fonctionné notre app
const app = express();

module.exports = app;

//=================================>
// * Limit payload size
//=================================>

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

//=================================>
// * End Limit payload size
//=================================>

// * MIDDLEWARES
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json()) // je parse toutes les données entrante dans mon application
  .use("/api", router); // On applique nos routes à notre app

