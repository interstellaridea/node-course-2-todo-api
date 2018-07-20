const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [{
  _id: userOneId,
  email: 'person1@test.com',
  password: 'personOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'secret').toString()
  }]
}, {
  _id: userTwoId,
  email: 'person2@test.com',
  password: 'personTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, 'secret').toString()
  }]  
}];

const todos = [{
  _id: new ObjectId(),
  text: 'Frist test todo',
  _creator: userOneId
}, {
  _id: new ObjectId(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  // Wipes all Todos.
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then( () => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };