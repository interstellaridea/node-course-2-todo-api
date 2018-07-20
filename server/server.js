require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const { mongoose } = require('./db/mongoose');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');
const app = express();

app.use(bodyParser.json());

// POST /todos
app.post('/todos', authenticate, (req,res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save()
  .then(doc => res.status(200).send(doc))
  .catch(e => res.status(400).send(e))
});

// GET /todos
app.get('/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id }).then( todos => {
    res.send({todos});
  }, e => {
    res.status(400).send(e)
  })
})

// GET /todos/:id
app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send('Todo not found');
      }
        res.send({todo});
    })
    .catch(e => {
      res.send()
    })
});

// DELETE /todos/:id
app.delete('/todos/:id', authenticate, (req,res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    })  
    .catch(e => res.status(404).send())
});

// PATCH /todos/:id
app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  // check completed val, use to se completedAt to timestamp
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, { $set: body }, {new: true})
    .then((todo) => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({todo});
    })
    .catch((e) => {
      res.status(400).send(e)
    });

});

// POST /users
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body)
  user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch(e => res.status(400).send(e))
});


// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  // in mongo method, returnign promise
  // verify user by email
  // get pass prop bcrypt compare 
  User.findByCredentials(body.email, body.password)
    .then((user) => {
      user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch((e) => {
      res.status(400).send()
    });
});

// DELETE /users/me/token
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send()
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Started up ${PORT}`));

module.exports = { app };




