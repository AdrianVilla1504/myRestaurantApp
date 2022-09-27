require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
  const URI = process.env.URI;
  try {
    mongoose.connect(URI);

    console.log('Succesfully connected to MongoDB.');
  } catch (error) {
    console.error('Connection to MongoDB Failed, ERROR =', error);
    process.exit(1);
  }
}

module.exports = connectDB;
