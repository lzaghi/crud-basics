const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const { message } = await productsService.getAll();
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(+id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await productsService.insertProduct(product);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const { type, message } = await productsService.updateProduct(product, +id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(+id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).end();
};

const getByQuery = async (req, res) => {
  const { q } = req.query;
  let { message } = await productsService.getAll();

  if (q) {
    message = message.filter((prdct) => prdct.name.toLowerCase().includes(q.toLowerCase()));
  }

  return res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
  insertProduct,
  updateProduct,
  deleteProduct,
  getByQuery,
};
