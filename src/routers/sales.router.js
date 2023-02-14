const express = require('express');
const { salesController } = require('../controllers');
const { validateProductId, validateQuantity } = require('../middlewares/validateNewSales');

const router = express.Router();

router.post('/',
  validateProductId,
  validateQuantity,
  salesController.insertSale);

module.exports = router;