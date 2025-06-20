const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({

  title:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  },
  category:{
    type: String,
    enum: ["food", "travel", "shopping", "stationery", "groceries", "others"],
    default: "Others",
    required: true
  },
  date:{
    type: Date,
    default:Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  note:{
    type: String,
    default: ''
  },
},{timestamps:true});

module.exports = mongoose.model('Expense', expenseSchema);