const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return product;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product.name],
  );
  return insertId;
};

const getProductIds = async () => {
  const [result] = await connection.execute(
    'SELECT id FROM StoreManager.products',
  );
  return result;
};

const updateProduct = async (product, id) => {
  const [{ insertId }] = await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?)',
    [product.name, id],
  );
  return insertId;
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  getProductIds,
  updateProduct,
};
