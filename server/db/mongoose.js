const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect('mongodb://heroku:qwerty12345@ds217970.mlab.com:17970/todo-app-ankit');
//
module.exports = {
  mongoose
}
