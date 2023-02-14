const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

const getById = async (productId) => {
  const product = await productsModel.getById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: product };
};

const insertProduct = async (product) => {
  const newProductId = await productsModel.insertProduct(product);
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
};
