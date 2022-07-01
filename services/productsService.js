const productsModel = require('../models/productsModel');

const errorHandler = (status, message) => ({ status, message });

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const findById = async (id) => {
  const [product] = await productsModel.findById(id);

  if (!product) throw errorHandler(404, 'Product not found');

  return product;
};

module.exports = {
  getAll,
  findById,
};
