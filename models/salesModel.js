const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT sp.sale_id, sp.product_id, sp.quantity, sa.date
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa
  ON sa.id = sp.sale_id
  ORDER BY sa.id`;
  const [sales] = await connection.execute(query);
  // console.log(sales);

  return sales;
};

const findById = async (saleID) => {
  const query = `
  SELECT sp.product_id, sp.quantity, sales.date
    FROM sales_products AS sp
    INNER JOIN sales
    ON sp.sale_id = sales.id
    WHERE sales.id=?`;
  const [sale] = await connection.execute(query, [saleID]);

  return sale;
};

const insertData = async () => {
  const query = 'INSERT INTO sales (date) VALUES (NOW())';
  const [rows] = await connection.execute(query);

  const result = { id: rows.insertId };
  return result;
};

const registerSales = async (saleId, productId, quantity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [sale] = await connection.execute(query, [saleId, productId, quantity]);

  return sale;
};

const updateSales = async (salesId, productId, quantity) => {
  const query = `UPDATE sales_products SET product_id = ?, quantity = ?
        WHERE sale_id = ?`;

  const [rows] = await connection
    .execute(query, [productId, quantity, salesId]);

  return rows;
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const [row] = await connection.execute(query, [id]);

  if (row.affectedRows === 0) return { message: 'Product not found', status: 404 };

  return row;
};

module.exports = { getAll, findById, insertData, registerSales, updateSales, deleteSale };

// insertData().then((data) => {
//   console.log(data);
// });
