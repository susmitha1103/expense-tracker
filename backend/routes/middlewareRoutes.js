const express = require('express');
const router = express.Router();
const{signToken,verifyToken} = require('../middleware/protect');

router.post('/sign', signToken);
router.post('/verify',verifyToken);