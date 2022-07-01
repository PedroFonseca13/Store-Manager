const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  return res.status(200).json(products);
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.findById(id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: error.message });
  }
};

const registerProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await productsService.registerProduct(name);

    if (product) return res.status(201).json(product);
  } catch (error) {
    console.log(error.message);
    return res.status(409).json({ message: error.message });
  }

  return res.status(409).json({ message: 'Product already exists' });
};

module.exports = {
  getAll,
  findById,
  registerProduct,
};
