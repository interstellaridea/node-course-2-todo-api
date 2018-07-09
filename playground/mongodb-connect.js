const { MongoClient, ObjectId } = require('mongodb');

let obj = new ObjectId();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
 if (err) {
  return console.log('Unable to connect to mongo db server.');
 }
  console.log('Connected to MongoDB server');

  db.close(); // closes connection with mongo db 
});