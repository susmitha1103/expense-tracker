const express = require('express');
const router = express.Router();
const { getBudget, setBudget } = require('../controllers/budgetController');
const {verifyToken} = require('../middleware/protect');

router.get('/monthly', verifyToken, getBudget);
router.post('/set', verifyToken, setBudget);

module.exports = router;
