const express = require('express');
const { salesController } = require('../controllers');
const { validateProductId, validateQuantity } = require('../middlewares/validateNewSales');

const router = express.Router();

router.post('/',
validateProductId,
validateQuantity,
salesController.insertSale);

router.get('/:id', salesController.getById);

router.get('/', salesController.getAll);

router.delete('/:id', salesController.deleteSale);

router.put('/:id',
validateProductId,
validateQuantity,
salesController.updateSale);

module.exports = router;