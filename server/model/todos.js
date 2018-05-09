const mongoose = require('mongoose');

var Todos = mongoose.model('AllTodo',{
  text:{
    type: String
  },
  completed:{
    type: Boolean
  },
  completedAt:{
    type: Number
  }
});

module.exports = {Todos};
