const express = require('express');
const router = express.Router();
const { addExpense} = require('../controllers/expenseController');
const { verifyToken } = require('../middleware/protect');

router.post('/add',verifyToken, addExpense);


module.exports = router;
