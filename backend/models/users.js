const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true
  },
  password:{
    type: String,
    require: true
  }
},{timestamps:true});

module.exports= mongoose.model('Users', userSchema);