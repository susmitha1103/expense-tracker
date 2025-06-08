const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({

  title:{
    type: String,
    require: true
  },
  amount:{
    type: Number,
    require: true
  },
  category:{
    type: String,
    require: true
  },
  date:{
    type: Date,
    require: true
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Users',
  //   required: true,
  // },
  note:{
    type: String,
    default: ''
  },
},{timestamps:true});

module.exports = mongoose.model('Expense', expenseSchema);