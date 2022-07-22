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
  try {
    const product = await salesService.findById(id);

    return res.status(200).json(product);
  } catch (error) {
    handleError(error, req, res);
  }
};

const addSale = async (req, res) => {
  const sale = req.body;
  const saleData = await salesService.newSales(sale);

  return res.status(201).json(saleData);
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    await salesService.deleteSale(id);

    return res.status(204).json();
  } catch (error) {
    handleError(error, req, res);
  }
};

module.exports = { getAll, findById, addSale, deleteSale };
