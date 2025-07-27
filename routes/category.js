const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController')
router.get('/', controller.showCategorys);
router.get('/new', controller.newCategorys);
router.post('/new',controller.addCategory)
router.post('/:id/delete',controller.deleteCategory)


module.exports = router;
