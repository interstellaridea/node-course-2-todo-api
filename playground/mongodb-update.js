const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
 if (err) {
  return console.log('Unable to connect to mongo db server.');
 }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectId('5b42edeae590d30181be7469')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then( res => console.log(res) );
  // // db.close(); // closes connection with mongo db

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectId("5b41c736cf19f501dda2495c")
  }, {
    $set: { name: 'Sebastian'},
    $inc: { age: 1 }
  }, {
    returnOriginal: false
  }).then( res => console.log(res));

});