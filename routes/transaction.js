const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController')
router.get('/', controller.showTransactions);
router.get('/new', controller.newTransactions);

module.exports = router;
