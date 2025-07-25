const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController')
router.get('/', controller.showCategorys);

module.exports = router;
