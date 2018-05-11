const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todos} = require('./model/todos');
const {Users} = require('./model/users');

var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos',(req, res) => {
  var newTodo = new Todos({
    text: req.body.text
  });

  newTodo.save().then((doc)=>{
    res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/todos',(req, res) =>{
  Todos.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
});

app.get('/todos/:id',(req, res) => {
  var id= req.params.id;
  if(!ObjectID.isValid(id))
    return res.status(404).send();

  Todos.findById(id).then((todo)=>{
    if(!todo)
      return res.status(404).send();
  res.send({todo});
  }).catch((e)=> res.status(400).send());
});

app.listen(port, () => {
  console.log('Started... ');
});

module.exports = {app};
