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

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT id AS saleId, date, product_id AS productId, quantity
    FROM StoreManager.sales AS s 
    INNER JOIN StoreManager.sales_products as sp
    ON s.id = sp.sale_id`,
  );
  return result;
};

const getById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products as sp
    ON s.id = sp.sale_id
    WHERE id = ?`,
    [saleId],
  );
  return sale;
};

const deleteSale = async (saleId) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = (?)',
    [saleId],
  );
};

const updateSale = async (sale, saleId) => {
  console.log(sale, saleId);
  await connection.execute(
    `UPDATE StoreManager.sales_products
    SET quantity = (?) WHERE sale_id = (?) AND product_id = (?)`,
    [sale.quantity, saleId, sale.productId],
  );
};

module.exports = {
  insertSale,
  insertSaleProducts,
  getAll,
  getById,
  deleteSale,
  updateSale,
};
