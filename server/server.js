const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todos} = require('./model/todos');
const {Users} = require('./model/users');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
  console.log(req.body);
});
app.listen(3000, () => {
  console.log('Started on port 3000');
});
