const { salesModel, productsModel } = require('../models');

const insertSale = async (sales) => {
  const productIds = await productsModel.getProductIds();
  const productIdsArray = productIds.map((el) => el.id);
  const noProductId = sales.some((sale) => !productIdsArray.includes(sale.productId));
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

module.exports = {
  insertSale,
};
