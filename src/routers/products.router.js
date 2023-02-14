const express = require('express');
const { productsController } = require('../controllers');
const validateNewProduct = require('../middlewares/validateNewProduct');

const router = express.Router();

router.get('/:id', productsController.getById);

router.get('/', productsController.getAll);

router.post('/', validateNewProduct, productsController.insertProduct);

module.exports = router;