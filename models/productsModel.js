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

  return product;
};

module.exports = { getAll, findById, registerProduct, updateProduct };
