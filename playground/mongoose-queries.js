const { ObjectId } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
// first document
// const id = "5b46c9d658d9054552ff91e3";

// if (!ObjectId.isValid(id)) {
//   console.log('Id is not valid');
// }
// Todo.find({
//   _id: id
// }).then( (todos) => {
//   console.log('Todos', todos);
// })

// Todo.findOne({ _id: id }).then( (todo) => {
//   console.log('Todo find one', todo);
// })


// Todo.findById( id ).then( (todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by id', todo);
// }).catch(e => console.log(e))
const userId = "5b459ca51188cd607ebfa2b8";
User
  .findById(userId)
  .then((user) => {
    user ? console.log(user) : console.log('User not found');
  })
  .catch(e => console.log(e))