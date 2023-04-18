// * application Express

const express = require("express");
const path = require('path');

const morgan = require("morgan");
const fs = require('fs');
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const helmet = require('helmet');
const cors = require("cors");

// Load .env configuration
require('dotenv').config();

// Load express
const app = express();

// J'importe mes routes qui sont mtn dans mon index.js
const router = require("./routes/index.js");

// * Config
app
  .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
  .use(express.static(path.join(__dirname, "public"))) // Serve static files
  .use(helmet()) // Helmet for default security
  .use("/api", router) // Load all routes
  .use(cors())

// * split /dual logging 
// Sample app that will log all requests to a file using Apache format, but error responses are logged to the console:
// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

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

// Returns a 404 response for all unregistered routes
app.all('*', (req, res) => {
  res.status(404).json('Resource not found');
});

module.exports = app;