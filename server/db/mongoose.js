//  Mongoose config:
const mongoose = require('mongoose');

// Set Promises for Mongoose
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };