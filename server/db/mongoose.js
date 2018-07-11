//  Mongoose config:
const mongoose = require('mongoose');

// Set Promises for Mongoose
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TodosApp');

module.exports = { mongoose };