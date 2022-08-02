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

    if (product.length === 0) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(product);
  } catch (error) {
    handleError(error, req, res);
  }
};

const addSale = async (req, res, next) => {
  try {
    const sale = req.body;
    const saleData = await salesService.newSales(sale);

    if (saleData.error) {
      res.status(404).json({ message: 'Product not found' });
    }

    return res.status(201).json(saleData);
  } catch (error) {
    next(error);
  }
};

const updateSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const result = await salesService.updateSales(id, data);

    if (result.error) return res.status(404).json({ message: 'Sale not found' });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await salesService.deleteSale(id);

    if (result.error) return res.status(404).json({ message: 'Sale not found' });

    return res.status(204).end();
  } catch (error) {
    handleError(error, req, res);
  }
};

module.exports = { getAll, findById, addSale, updateSales, deleteSale };
