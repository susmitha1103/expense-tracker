const Expense = require('../models/expenses');

const addExpense = async(req,res) =>{
  
  const{title,amount, category, date,note} = req.body;

  if(!title || !amount || !category ){
    return res.status(400).json({message: "missing required fields"});
  }

  try{
    const expense = await Expense.create({ title, amount, category });
    res.status(200).json({message: `expense added successfully ${expense}`});
  }
  catch(error){
    res.status(500).json({message: "failed to added expense", error})
  }
};

module.exports = {addExpense};