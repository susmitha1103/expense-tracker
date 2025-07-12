const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  source:{
    type: String,
    enum: ["salary", "rent", "freelance", "investment", "gift", "others"],
    default: "Others",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports =  mongoose.model('Income', incomeSchema);
