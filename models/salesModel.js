const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, sa.date
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa
  ON sa.id = sp.sale_id
  ORDER BY sa.id`;
  const [sales] = await connection.execute(query);

  return sales;
};

module.exports = { getAll };
