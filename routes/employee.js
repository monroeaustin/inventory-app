const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController')
router.get('/', controller.showEmployees);
router.get('/new',controller.newEmployee)
router.post('/new',controller.addEmployee)
router.post('/:id/delete',controller.deleteEmployee)
router.get('/search',controller.conductSearch)

module.exports = router;
