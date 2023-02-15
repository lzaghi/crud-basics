const { productsModel } = require('../models');
const schema = require('./validation/validationFunctions');

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
  const error = schema.validateNewProduct(product);
  if (error.type) return error;

  const newProductId = await productsModel.insertProduct(product);
  const newProduct = await productsModel.getById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (product, id) => {
  const error = schema.validateNewProduct(product);
  if (error.type) return error;

  await productsModel.updateProduct(product, id);
  const newProduct = await productsModel.getById(id);
  if (!newProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: newProduct };
};

const deleteProduct = async (productId) => {
  const product = await productsModel.getById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.deleteProduct(productId);

  return { type: null, message: product };
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
