const Expense = require('../models/expenses');
const moment = require('moment');

const addExpense = async(req,res) =>{

  const{description,amount, category, date,note} = req.body;
  const validCategories = ["housing & utilities",  "healthcare",  "shopping", "education & stationery",
       "entertainment", "emis & subscriptions", "miscellaneous"];
  
  if(description.length > 30){
    return res.status(400).json({message: "Description should contain only 30 characters"});
  }     
  if(amount > 100000){
    return res.status(400).json({message: "Amount is too high. Please check and try again"});
  }  
  if(amount < 1){
    return res.status(400).json({message: "Amount should be a positive number"});
  }   

  if(!validCategories.includes(category)){
    return res.status(400).json({message: "Invalid category, please select from predefined options"});
  }

  if(!description || !amount || !category ){
    return res.status(400).json({message: "missing required fields"});
  }

  try{
    const expense = await Expense.create({ 
  description, 
  amount, 
  category, 
  date, 
  note, 
  user: req.user._id});
 
    res.status(200).json({message: "expense added successfully",expense});
  }
  catch (error) {
  res.status(500).json({
    message: "Failed to add expense",
    error: error.message || "Unknown error"
  });
}
};


const getExpenses = async(req,res) =>{
  try{
    const expenses = await Expense.find({user: req.user._id});
    res.status(200).json({message: "fetched expenses successfully",expenses});
  }
  catch(error){
    res.status(403).json({message: "unable to fetch your expenses"});
    
  }
};


const updateExpenses = async(req,res) =>{
  
  const expense = await Expense.findOne({_id: req.params.id, user: req.user._id});

  if(!expense){
    return res.staus(404).json({message: "Expense not found or unauthorized"});
  }
  try{
  const{description, amount, category, date, note} = req.body;

  if(description)expense.description = description;
  if(amount)expense.amount = amount;
  if(category)expense.category = category;
  if(date)expense.date = date;
  if(note)expense.note = note;

  const updatedExpense = await expense.save();

  return res.status(200).json({
    message: "Expenses updated successfully",
    updatedExpenses : updatedExpense
  });
}
catch(error){
  res.status(500).json({message: "server error"});
}
};


const deleteExpenses = async (req, res) => {
  try {
    const expenseToBeDeleted = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expenseToBeDeleted) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    }

    await Expense.deleteOne({ _id: req.params.id, user: req.user._id });

    return res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getExpensesByCategory = async(req,res) =>{

  const category = req.query.name?.trim().toLowerCase();
  const validCategories = ["housing & utilities", "healthcare", "shopping", "education & stationery",
       "entertainment", "emis & subscriptions", "miscellaneous"];

  if(!category){
    console.log("Category query param missing");
    return res.status(400).json({message:"category is required in the query string"});
  }

  if(!validCategories.includes(category)){
    console.log("Invalid category received:", category);
    return res.status(400).json({message:"Invalid category. Please select from the following list",validCategories});
  }

  try{
  const expenseByCategory = await Expense.find({ category: category, user: req.user._id });
  if (expenseByCategory.length === 0) {
  return res.status(200).json({ 
    expenses: [],
    totalAmount: 0,
    message: "You have no expenses in that category." 
  });
}

 res.status(200).json({
  expenses:expenseByCategory,
  totalAmount: expenseByCategory.reduce((sum, e) => sum + e.amount, 0)
});

  }
  catch(error){
    res.status(500).json({message: "Internal server error"});
  }
};

const getTotalExpenses = async(req,res) =>{
  try{
    const total = await Expense.aggregate([
      {$match:{user: req.user._id}},
      {
        $group:{
          _id:null,
          totalAmount:{$sum: "$amount"}
        }
      }
    ]);
    res.status(201).json({message:"Total expenses till date",
      totalExpense:total[0]?.totalAmount||0
    });
  }
  catch(error){
    res.status(500).json({message: "Internal server error"});
  }
};

const getAllCategoryExpenses = async (req, res) => {
  try {
    const categoryExpenses = await Expense.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    res.status(200).json({ categoryExpenses });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMonthlyExpenses = async (req, res) => {
  try {
    const raw = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" }
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1
        }
      }
    ]);

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const fullYear = Array.from({ length: 12 }, (_, i) => ({
      month: monthNames[i],
      totalAmount: 0
    }));

    raw.forEach((item) => {
      if (item._id.year === 2025) {
        const index = item._id.month - 1;
        fullYear[index].totalAmount = item.totalAmount;
      }
    });

    res.status(200).json({ monthlyExpenses: fullYear });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCurrentMonthExpense = async (req, res) => {
  const currentMonth = moment().format('YYYY-MM');

  try {
    const expenses = await Expense.find({
      user: req.user._id,
      date: {
        $gte: moment(currentMonth).startOf('month').toDate(),
        $lte: moment(currentMonth).endOf('month').toDate()
      }
    });

    const total = expenses.reduce((sum, item) => sum + item.amount, 0);

    res.status(200).json({ total: total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = {addExpense,getExpenses,updateExpenses,deleteExpenses
  ,getExpensesByCategory,getTotalExpenses,getMonthlyExpenses,getAllCategoryExpenses, getCurrentMonthExpense};