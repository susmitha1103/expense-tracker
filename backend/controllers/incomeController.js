const Income = require('../models/income');

const createIncome = async (req, res) => {
  const { amount, source } = req.body;


  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid income amount. Must be a positive number." });
  }
   
  const validSources = ["salary", "freelance", "gift", "investment", "rent", "others"];
  if (!source || !validSources.includes(source.toLowerCase())) {
    return res.status(400).json({ message: "Invalid income source. select from the dropdown." });
  }

  try {
    const income = await Income.create({
      user: req.user._id,
      amount,
      source: source.toLowerCase()
    });

    res.status(201).json({ message: "Income added", income });
  } catch (err) {
    console.error("Error adding income", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json({ incomes });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving incomes" });
  }
};

 const getTotalIncome = async (req, res) => {
  console.log("reached getTotalIncome method");
  try {
    const result = await Income.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const total = result[0]?.total || 0;
    res.status(200).json({ totalIncome: total });
  } catch (err) {
    res.status(500).json({ message: "Error calculating total income" });
  }
};

const getIncomeBySource = async(req,res) =>{
  try {
    const incomeBySource = await Income.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$source",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json({ incomeBySource });
  } catch (err) {
    console.error("Error fetching income by source", err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {createIncome,getAllIncomes, getTotalIncome, getIncomeBySource};