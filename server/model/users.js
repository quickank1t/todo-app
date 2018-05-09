const mongoose = require('mongoose');

var Users = mongoose.model('Users',{
  email: {
    type: String,
    require: true,
    trim: true
  }
});

module.exports = {Users};
