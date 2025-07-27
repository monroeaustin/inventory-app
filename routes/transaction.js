const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController')
router.get('/', controller.showTransactions);
router.get('/new', controller.newTransactions);
router.post('/new',controller.postNewTransaction)
router.get('/search',controller.conductTransactionSearch)
router.post('/:id/delete',controller.deleteTransaction)

module.exports = router;
