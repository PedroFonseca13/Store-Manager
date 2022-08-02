const productsService = require('../services/productsService');
const errorHandler = require('../utils/handleError');

const getAll = async (_req, res) => {
  try {
    const products = await productsService.getAll();

    // if (products.message) {
    //   const error = errorHandler(products);
    //   throw error;
    // }

    res.status(200).json(products);
  } catch (error) {
    errorHandler(error, _req, res);
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.findById(id);

    // if (product.message) {
    //   const error = errorHandler(product);
    //   throw error;
    // }

    return res.status(200).json(product);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const registerProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const response = await productsService.registerProduct(name);

    // if (response.message) {
    //   const err = errorHandler(response);
    //   throw err;
    // }

    if (response) return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const product = await productsService.updateProduct(id, name);

    // if (product.message) {
    //   const err = errorHandler(product);
    //   throw err;
    // }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productsService.deleteProduct(id);

    // if (result.message) {
    //   const err = errorHandler(result);
    //   throw err;
    // }

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
