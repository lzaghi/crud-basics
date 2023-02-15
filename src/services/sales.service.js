const { salesModel, productsModel } = require('../models');

const checksProduct = async (sales) => {
  const productIds = await productsModel.getProductIds();
  const productIdsArray = productIds.map((el) => el.id);
  const noProductId = sales.some((sale) => !productIdsArray.includes(sale.productId));
  return noProductId;
};

const insertSale = async (sales) => {
  const noProductId = await checksProduct(sales);
  if (noProductId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const newSaleId = await salesModel.insertSale();
  await Promise.all(sales
    .map(async (sale) => salesModel.insertSaleProducts(sale, newSaleId)));
  const returnedObject = {
    id: newSaleId,
    itemsSold: sales,
  };
  return { type: null, message: returnedObject };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { type: null, message: sales };
};

const getById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (!sale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  
  return { type: null, message: sale };
};

const deleteSale = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (!sale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await salesModel.deleteSale(saleId);

  return { type: null, message: sale };
};

const updateSale = async (sales, saleId) => {
  const noProductId = await checksProduct(sales);
  if (noProductId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const registeredSale = await salesModel.getById(saleId);
  if (!registeredSale.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  await Promise.all(sales
    .map(async (sale) => salesModel.updateSale(sale, saleId)));
  const returnedObject = {
    saleId,
    itemsUpdated: sales,
  };
  return { type: null, message: returnedObject };
};

module.exports = {
  insertSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};
