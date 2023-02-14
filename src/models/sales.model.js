const connection = require('./connection');

const insertSaleProducts = async (sale, id) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, sale.productId, sale.quantity],
  );
  return insertId;
};

const insertSale = async () => {
  const [lastId] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id DESC LIMIT 1',
  );

  const idToInsert = lastId[0].id + 1;

  await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUE (?)',
    [idToInsert],
  );

  return idToInsert;
};

module.exports = {
  insertSale,
  insertSaleProducts,
};
