const Expense = require('../models/expenses');

const addExpense = async(req,res) =>{
  
  const{title,amount, category, date,note} = req.body;

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
}

module.exports = {addExpense,getExpenses};