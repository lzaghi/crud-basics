const validateProductId = (req, res, next) => {
  const sales = req.body;

  const noProductId = sales.some((sale) => !sale.productId);
  if (noProductId) return res.status(400).json({ message: '"productId" is required' });

  return next();
};

const validateQuantity = (req, res, next) => {
  const sales = req.body;
  
  const noQuantity = sales.some((sale) => !sale.quantity && sale.quantity !== 0);
  if (noQuantity) return res.status(400).json({ message: '"quantity" is required' });
  const rightQuantity = sales.every((sale) => sale.quantity >= 1);
  if (!rightQuantity) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }

  return next();
};

module.exports = {
  validateProductId,
  validateQuantity,
};