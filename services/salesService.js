const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const handleError = (status, message) => ({ status, message });

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

const newSales = async (sales) => {
  const allProductsIds = await Promise.all(sales
    .map((sale) => productsModel.findById(sale.productId)));

  const existId = allProductsIds.some((product) => product.length === 0);

  if (existId) return { error: { code: 404, message: 'Product not found' } };

  const { id } = await salesModel.insertData();

  await Promise.all(sales
    .map((elem) => salesModel.registerSales(id, elem.productId, elem.quantity)));

  const dataObj = {
    id,
    itemsSold: [...sales],
  };

  return dataObj;
};

const updateSales = async (id, sales) => {
  const allProductsIds = await Promise.all(sales
    .map((sale) => productsModel.findById(sale.productId)));

  const existId = allProductsIds.some((product) => product.length === 0);

  if (existId) return { error: { code: 404, message: 'Product not found' } };

  const saleId = await salesModel.findById(id);

  if (saleId.length === 0) return { error: { code: 'notFound', message: 'Sale not found' } };

  await Promise.all(sales.map((sale) => salesModel.updateSales(id, sale.productId, sale.quantity)));

  const dataObj = {
    saleId: id,
    itemsUpdated: sales,
  };

  return dataObj;
};

const deleteSale = async (id) => {
  const sale = await salesModel.findById(id);

  if (sale.length === 0) {
    throw handleError(404, 'Sale not found');
  }

  const row = await salesModel.deleteSale(id);
  return row;
};

module.exports = {
  getAll,
  findById,
  newSales,
  updateSales,
  deleteSale,
};
