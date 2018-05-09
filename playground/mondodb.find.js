const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoapp',(err, client)=>{
  if(err){
    return console.log('unable to connect to mongo db server');
  }
  console.log('Connection established');
  const db = client.db('todoapp');


  db.collection('User').find({
    name: 'Ankit'
  }).toArray().then((docs)=>{
    console.log("---------------------------------------------------");
    // console.log(JSON.stringify(docs,undefined, 2));
    console.log(docs);
  },(err)=>{
    console.log('unale ro fleach todo' , err);
  });
  // db.collection('Todos').insertOne({
  //   text: 'First insert into mongodb',
  //   completed: false
  // },(err, result)=>{
  //   if(err){
  //     return console.log('unable to insert todo ' + err);
  //   }
  //   console.log(JSON.stringify(result.ops));
  // });
  //
  // db.collection('User').insertOne({
  //   name: "Ankit",
  //   age: 25,
  //   location: "Heidelberg"
  // },(err, result)=>{
  //   if(err){
  //       return console.log('unable to insert user ' + err);
  //   }
  //   console.log(JSON.stringify(result.ops,undefined, 2));
  // });


  //client.close();
});
