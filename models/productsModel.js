const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products ORDER BY id';
  const [products] = await connection.execute(query);
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [productsId] = await connection.execute(query, [id]);

  return productsId;
};

const registerProduct = async (name) => {
  const query = 'INSERT INTO products (name) VALUES (?)';
  const [products] = await connection.execute(query, [name]);

  return products;
};

module.exports = { getAll, findById, registerProduct };
