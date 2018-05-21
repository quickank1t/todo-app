const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function (){
  var user = this;
  var userObj = user.toObject();

  return _.pick(userObj,['_id', 'email']);
};
UserSchema.statics.findByCredential = function(email, password){
  var User = this;
  return User.findOne({email}).then((user)=>{
    if(!user) return Promise.reject();
    return new Promise((resolve, reject)=> bcrypt.compare(password,user.password,(err,res)=> (res)? resolve(user): reject()));
  });
};

UserSchema.statics.findByToken = function (token){
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token, 'abc123');
  }catch (e){
  return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token' : token,
    'tokens.access' : 'auth'
  });
};
UserSchema.methods.removeToken = function(token){
  var user = this;
  return user.update({
    $pull:{
      tokens:{token}
    }
  });
};
UserSchema.methods.genrateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens= user.tokens.concat([{access, token}]);
  return user.save().then(()=>{
    return token;
  });
};

UserSchema.pre('save', function(next){
    var user = this;
    if (user.isModified('password')){
      var password= user.password;
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password, salt, (err,hash)=>{
          user.password =hash;
          next();
        });
      });
    }else{
      next();
    }
});
var Users = mongoose.model('Users', UserSchema);

module.exports = {Users};
