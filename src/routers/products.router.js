const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/:id', productsController.getById);

router.get('/', productsController.getAll);

router.post('/', productsController.insertProduct);

module.exports = router;