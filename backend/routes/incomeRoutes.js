const express = require('express');

const { createIncome, getAllIncomes, getTotalIncome, getIncomeBySource,deleteIncome, getMonthlyIncome, updateIncome} = require('../controllers/incomeController.js');
const {verifyToken} = require( '../middleware/protect.js');

const router = express.Router();


router.post('/createIncome', verifyToken, createIncome);
router.get('/incomes', verifyToken,getAllIncomes);
router.get('/total',verifyToken,getTotalIncome);
router.get('/source-wise',verifyToken, getIncomeBySource);
router.delete("/delete/:id", verifyToken, deleteIncome);
router.get('/monthly', verifyToken, getMonthlyIncome);
router.put('/update/:id', verifyToken, updateIncome);



module.exports = router;