// models/user.js

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  captcha:{
    type: String,
    required: true,
  },
  captchaInput : {
    type: String,
    required :true,
  }
});

// Hash the password before saving it to the database



const User = mongoose.model('User', userSchema);

module.exports = User;
