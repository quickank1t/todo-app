const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todos} = require('./model/todos');
const {Users} = require('./model/users');

var app = express();

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
app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
