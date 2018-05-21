const {SHA256} = require('crypto-js');
const bcrypt = require('bcrypt');

var password = '1234';

bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password, salt, (err,hash)=>{
    console.log(hash);
  });
})


// message ;
//
// var message = SHA256(message).toString();
//
// var data={
//   id:4
// };
// console.log(message);

// const JWT = require('jsonwebtoken');
//
// var data = {
//   id: 10
// };
//
// var token = JWT.sign(data, '123');
// console.log(token);
//
// var decode = JWT.verify(token, '123');
//
//
// console.log(decode);
