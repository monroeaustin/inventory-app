const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController')
router.get('/', controller.showLogin);
router.post('/', controller.processLogin);

// router.get('/products', userController.getUsernameByName);
// router.get('/categories', userController.createUsernameGet);
// READ ROUTES stuff above.

module.exports = router;
