const Expense = require('../models/expenses');

const addExpense = async(req,res) =>{

  
  const{title,amount, category, date,note} = req.body;
  const validCategories = ["Food", "Travel", "Shopping", "Stationery", "Groceries", "Others"];

  if(!validCategories.includes(category)){
    return res.status(400).json({message: "Invalid category, please select from predefined options"});
  }

  if(!title || !amount || !category ){
    return res.status(400).json({message: "missing required fields"});
  }

  try{
    const expense = await Expense.create({ 
  title, 
  amount, 
  category, 
  date, 
  note, 
  user: req.user._id});
 
    res.status(200).json({message: "expense added successfully",expense});
  }
  catch (error) {
  console.error("Expense creation error:", error);
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
    console.log(expenses);
  }
  catch(error){
    console.error(error);
    res.status(403).json({message: "unable to fetch your expenses"});
    
  }
};


const updateExpenses = async(req,res) =>{
  
  const expense = await Expense.findOne({_id: req.params.id, user: req.user._id});

  if(!expense){
    return res.staus(404).json({message: "Expense not found or unauthorized"});
  }
  try{
  const{title, amount, category, date, note} = req.body;

  if(title)expense.title = title;
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
  console.error("error while updating expenses",error);
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

    const deletedExpense = await expenseToBeDeleted.deleteOne();

    return res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getExpensesByCategory = async(req,res) =>{

  const category = req.query.name?.trim().toLowerCase();
  const validCategories = ["food", "travel", "shopping", "stationery", "groceries", "others"];

  if(!category){
    return res.status(400).json({message:"category is required in the query string"});
  }

  if(!validCategories.includes(category)){
    return res.status(400).json({message:"Invalid category. Please select from the following list",validCategories});
  }

  try{
  const expenseByCategory = await Expense.find({ category: category, user: req.user._id });
  if (expenseByCategory.length === 0) {
  return res.status(200).json({ message: "You have no expenses in that category." });
}

  res.status(200).json({expenseByCategory});
  }
  catch(error){
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
  
  
}

module.exports = {addExpense,getExpenses,updateExpenses,deleteExpenses,getExpensesByCategory};