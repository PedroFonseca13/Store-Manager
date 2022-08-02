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

const registerProduct = async (name) => {
  const product = await productsModel.registerProduct(name);

  return {
    id: product.insertId,
    name,
  };
};

const updateProduct = async (id, name) => {
  const searchProduct = await productsModel.findById(id);

  if (searchProduct.length === 0) throw errorHandler(404, 'Product not found');

  const updatedProduct = await productsModel.updateProduct(id, name);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const result = await productsModel.deleteProduct(id);
  if (result.affectedRows === 0) throw errorHandler(404, 'Product not found');
  return result;
};

module.exports = {
  getAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
