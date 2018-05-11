const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017');
mongoose.connect('mongodb://heroku:qwerty12345@ds217970.mlab.com:17970/todo-app-ankit');
//
module.exports = {
  mongoose
}
