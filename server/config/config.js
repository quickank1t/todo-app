var env = process.env.NODE_ENV || 'development';
console.log(`in the ${process.env.NODE_ENV} enviourment`);
if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://heroku:qwerty12345@ds217970.mlab.com:17970/todo-app-ankit';
}else if(env === 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todoapp-test';
}else{
  process.env.MONGODB_URI='mongodb://heroku:qwerty12345@ds217970.mlab.com:17970/todo-app-ankit';
}
