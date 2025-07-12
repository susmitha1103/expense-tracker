const Budget = require('../models/budget');
const moment = require('moment');

const setBudget = async(req,res) =>{
  const {amount} = req.body;
  if(!amount ||  isNaN(amount) || amount <= 0){
    return res.status(400).json({message: "Invalid budget amount"});
  }

  const month= moment().format('YYYY-MM');

 try {
    const existing = await Budget.findOne({ user: req.user._id, month });

    if (existing) {
      const updated = await Budget.findOneAndUpdate(
        { user: req.user._id, month },
        { amount },
        { new: true }
      );
      return res.status(200).json({ message: "Budget updated", budget: updated });
    } else {
      const newBudget = await Budget.create({ user: req.user._id, month, amount });
      return res.status(201).json({ message: "Budget set", budget: newBudget });
    }
  } catch (err) {
    console.error("Error setting budget:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getBudget = async (req, res) => {
  const month = moment().format('YYYY-MM');

  try {
    const budget = await Budget.findOne({ user: req.user._id, month });

    if (!budget) {
      return res.status(404).json({ message: "No budget set for this month." });
    }

    return res.status(200).json({ budget:budget });
  } catch (err) {
    console.error("Error fetching budget:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {setBudget, getBudget};