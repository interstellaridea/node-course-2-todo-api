const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
 if (err) {
  return console.log('Unable to connect to mongo db server.');
 }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => { 
  //   console.log('Couldnt find records',err);
  // })

    db.collection('Users').find({ name: givenName}).toArray().then((docs) => {
    console.log(JSON.stringify(docs), undefined, 2);
  }, (err) => { 
    console.log('Couldnt find records',err);
  })

  // db.close(); // closes connection with mongo db 
});