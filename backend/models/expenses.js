const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({

  description:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  },
  category:{
    type: String,
    enum: ["housing & utilities", "healthcare", "shopping", "education & stationery",
       "entertainment", "emis & subscriptions", "miscellaneous"],
    default: "miscellaneous",
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