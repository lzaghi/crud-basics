const { addProductSchema } = require('./schemas');

const validateNewProduct = (product) => {
  const { error } = addProductSchema.validate(product);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateNewProduct,
};
