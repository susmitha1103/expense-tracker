const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, updateExpenses, deleteExpenses, getExpensesByCategory, getTotalExpenses} = require('../controllers/expenseController');
const { verifyToken } = require('../middleware/protect');

router.post('/add',verifyToken, addExpense);
router.get('/get',verifyToken,getExpenses);
router.put('/update/:id',verifyToken,updateExpenses);
router.delete('/delete/:id',verifyToken,deleteExpenses);
router.get('/category',verifyToken,getExpensesByCategory);
router.get('/total',verifyToken,getTotalExpenses);


module.exports = router;
