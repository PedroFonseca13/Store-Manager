const validateSale = (sales) => {
  const isNegativeOrZero = sales.some((sale) => sale.quantity <= 0);
  const existProductId = sales.some((sale) => !sale.productId);
  const existQuantity = sales.some((sale) => !sale.quantity);

  if (isNegativeOrZero) {
    return {
      error: {
        code: 'invalidDate',
        message: '"quantity" must be greater than or equal to 1',
      },
    };
  }

  if (existProductId) return { error: { code: 'badRequest', message: '"productId" is required' } };

  if (existQuantity) return { error: { code: 'badRequest', message: '"quantity" is required' } };

  return { success: 'Its OK' };
};

module.exports = validateSale;
