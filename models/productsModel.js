const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [products] = await connection.execute(query);
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [productsId] = await connection.execute(query, [id]);

  return productsId;
};

const registerProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [products] = await connection.execute(query, [name]);

  return products;
};

const updateProduct = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';

  const [product] = await connection.execute(query, [name, id]);

  if (product.affectedRows === 0) return { message: 'Product not found', status: 404 };

  const newProduct = { id, name };

  return newProduct;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';

  const [result] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  getAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
