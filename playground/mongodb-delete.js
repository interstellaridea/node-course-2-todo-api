const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
 if (err) {
  return console.log('Unable to connect to mongo db server.');
 }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: "something to do"}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
    // db.collection('Todos').deleteOne({text: 'Something cool'}).then( res => console.log(res));

  // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({_id: new ObjectId("5b41c87ce590d30181be7465") }).then( res => {
    //   console.log(res);
    // });
  // db.close(); // closes connection with mongo db 
});