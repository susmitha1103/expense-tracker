const express = require('express');

const { createIncome, getAllIncomes, getTotalIncome } = require('../controllers/incomeController.js');
const {verifyToken} = require( '../middleware/protect.js');

const router = express.Router();


router.post('/', verifyToken, createIncome);
router.get('/incomes', verifyToken,getAllIncomes);
router.get('/total',verifyToken,getTotalIncome);

module.exports = router;