const errorHandler = (errObject) => {
  const err = new Error(errObject.message);
  err.status = errObject.status;
  return err;
};

module.exports = errorHandler;
