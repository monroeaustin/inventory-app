const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController')
router.get('/employees', controller.showEmployees);

module.exports = router;
