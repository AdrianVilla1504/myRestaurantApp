require('dotenv').config();
const express = require('express');

const configExpress = require('./config/express');
const routes = require('./routes');
const connectDB = require('./config/database');
const stripeConfig = require('./config/stripe');

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  configExpress(app);
  stripeConfig(app);

  await connectDB();

  routes(app);

  console.log(`This server is runing on http://localhost:${PORT}`);
});
