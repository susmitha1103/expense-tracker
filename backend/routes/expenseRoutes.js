const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, updateExpenses} = require('../controllers/expenseController');
const { verifyToken } = require('../middleware/protect');

router.post('/add',verifyToken, addExpense);
router.get('/get',verifyToken,getExpenses);
router.put('/update/:id',verifyToken,updateExpenses);


module.exports = router;
