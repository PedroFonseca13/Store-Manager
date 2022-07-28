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

const addSale = async (req, res, next) => {
  try {
    const sale = req.body;
    const saleData = await salesService.newSales(sale);

    console.log(saleData);

    if (saleData.error) {
      res.status(404).json({ message: 'Product not found' });
    }

    return res.status(201).json(saleData);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, findById, addSale };
