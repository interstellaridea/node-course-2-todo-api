require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const { mongoose } = require('./db/mongoose');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save()
  .then(doc => res.status(200).send(doc))
  .catch(e => res.status(400).send(e))
});

app.get('/todos', (req, res) => {
  Todo.find().then( todos => {
    res.send({todos});
  }, e => {
    res.status(400).send(e)
  })
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id)
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

app.delete('/todos/:id', (req,res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    })  
    .catch(e => res.status(404).send())
});

app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, { $set: body }, {new: true})
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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Started up ${PORT}`));

module.exports = { app };




