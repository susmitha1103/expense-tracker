const Income = require('../models/income');

const createIncome = async (req, res) => {
  const { amount, source } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid income amount. Must be a positive number." });
  }
  if(amount > 300000){
    return res.status(400).json({message: "Income is too high. Please check and try again later"});
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
    res.status(200).json({ incomeSources: incomeBySource });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const deleted = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Income not found or unauthorized" });
    }

    return res.status(200).json({ message: "Income deleted successfully" });
  } catch (err) {
  
    return res.status(500).json({ message: "Server error" });
  }
};

const getMonthlyIncome = async (req, res) => {
  try {
    const incomeByMonth = await Income.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalIncome: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formatted = incomeByMonth.map((entry) => ({
      month: entry._id,
      totalIncome: entry.totalIncome
    }));

    res.status(200).json({ monthlyIncome: formatted });
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly income" });
  }
};

const updateIncome = async (req, res) => {
  try {
    const income = await Income.findOne({ _id: req.params.id, user: req.user._id });
    if (!income) return res.status(404).json({ message: "Income not found or unauthorized" });

    const { amount, source, date } = req.body;
    if (amount) income.amount = amount;
    if (source) income.source = source;
    if (date) income.date = date;

    const updatedIncome = await income.save();
    res.status(200).json({ message: "Income updated successfully", income: updatedIncome });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {createIncome,getAllIncomes, getTotalIncome, getIncomeBySource,deleteIncome,getMonthlyIncome, updateIncome};