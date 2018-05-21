process.env.NODE_ENV = 'development';//only foe development
require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _= require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todos} = require('./model/todos');
const {Users} = require('./model/users');
const {authenticate} = require('./middelware/authenticate');

var app = express();
var port = process.env.PORT ;
app.use(bodyParser.json());

app.post('/user',(req, res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  var newUser = new Users(body);

  newUser.save().then(()=>{
      return newUser.genrateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(newUser);
  }).catch((e) => res.status(400).send(e));

});

app.get('/user/me',authenticate, (req,res)=>{
  res.send(req.user);
});
app.post('/todos',authenticate, (req, res) => {
  var newTodo = new Todos({
    text: req.body.text,
    _creator: req.user._id
  });

  newTodo.save().then((doc)=>{
    res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });
});
app.post('/users/login',(req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  Users.findByCredential(body.email,body.password).then((user)=>{
    return user.genrateAuthToken().then((token)=> res.header('x-auth',token).send(newUser));
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.get('/todos',authenticate,(req, res) =>{
  Todos.find({
    _creator: req.user._id
  }).then((todos)=>{
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

app.delete('/users/me/token',authenticate,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id))
    return res.status(404).send();

  Todos.findByIdAndRemove(id).then((todo)=>{
    if(!todo)
      return res.status(404).send();

    res.send({todo});
  }).catch((e)=> res.status(400).send());
});

app.patch('todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id))
    return res.status(404).send();

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todos.findByIdAndUpdate(id,{$set: body}, {new:true}).then((todo)=>{
    if(!todo)
      return res.status(404).send();
    res.send({todo});
    done();
  }).catch((e)=> res.status(400).send());

});
app.listen(port, () => {
  console.log('Started in ' +port);
});

module.exports = {app};
