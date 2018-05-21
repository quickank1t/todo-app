const mongoose = require('mongoose');

var Todos = mongoose.model('Todo',{
  text:{
    type: String,
    required: true,
    trim: true
  },
  completed:{
    type: Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  },
  _creator:{
    type: mongoose.Schema.Types.ObjectId,
    require: true
  }
});

module.exports = {Todos};
