const {mongoose} = require('./../server/db/mongoose');
const {Todos} = require('./../server/model/todos');

var id = '5af484b921284a1e908a9b26';
Todos.find({
  _id: id
}).then((todos)=>{
  console.log(todos);
});

Todos.findOne({
  _id: id
}).then((todo)=>{
  console.log(todo);
});

Todos.findById(id).then((todo)=>{
  if(!todo)
    return console.log('id not found');
  console.log(todo);
}).catch((e)=> console.log(e));
