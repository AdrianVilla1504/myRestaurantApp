const express = require('express');
const app  = express();
const cors = require('cors');


function stripeConfig (app) {
  app.use(cors());
  app.use(express.static("public"));
  app.use(express.json());
}

module.exports = stripeConfig;
