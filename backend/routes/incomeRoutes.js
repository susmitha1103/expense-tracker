const express = require('express');

const { createIncome, getAllIncomes, getTotalIncome, getIncomeBySource } = require('../controllers/incomeController.js');
const {verifyToken} = require( '../middleware/protect.js');

const router = express.Router();


router.post('/createIncome', verifyToken, createIncome);
router.get('/incomes', verifyToken,getAllIncomes);
router.get('/total',verifyToken,getTotalIncome);
router.get('/source-wise',verifyToken, getIncomeBySource);

module.exports = router;