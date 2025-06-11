const express = require('express');
const router = express.Router();
const { addExpense, getExpenses} = require('../controllers/expenseController');
const { verifyToken } = require('../middleware/protect');

router.post('/add',verifyToken, addExpense);
router.get('/get',verifyToken,getExpenses);


module.exports = router;
