const validateSale = (req, res, next) => {
  const { body } = req;

  if (body.some((sale) => sale.productId === undefined)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (body.some((sale) => sale.quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (body.some((sale) => sale.quantity < 1)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = { validateSale };
