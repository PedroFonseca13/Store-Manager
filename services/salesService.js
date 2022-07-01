const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();

  const result = sales.map((salesData) => ({
    saleId: salesData.sale_id,
    date: salesData.date,
    productId: salesData.product_id,
    quantity: salesData.quantity,
  }));

  return result;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  const result = sale.map((saleData) => ({
    productId: saleData.product_id,
    quantity: saleData.quantity,
    date: saleData.date,
  }));

  return result;
};

module.exports = {
  getAll,
  findById,
};
