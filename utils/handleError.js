const handleError = (err, _req, res) => {
  console.error(err);
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = handleError;
