const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.insertSale(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const { message } = await salesService.getAll();
  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(+id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(+id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).end();
};

module.exports = {
  insertSale,
  getAll,
  getById,
  deleteSale,
};
