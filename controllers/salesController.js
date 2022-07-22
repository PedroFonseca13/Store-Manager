const salesService = require('../services/salesService');
const handleError = require('../utils/handleError');

const getAll = async (_req, res) => {
  try {
    const products = await salesService.getAll();

    return res.status(200).json(products);
  } catch (error) {
    handleError(error, _req, res);
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findById(id);

  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });

  return res.status(200).json(sale);
};

const addSale = async (req, res) => {
  const sale = req.body;
  const saleData = await salesService.newSales(sale);

  return res.status(201).json(saleData);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  await salesService.deleteSale(id);
  res.status(204).end();
};

module.exports = { getAll, findById, addSale, deleteSale };
