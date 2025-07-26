const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController')
router.get('/', controller.showEmployees);
router.get('/new',controller.newEmployee)

module.exports = router;
