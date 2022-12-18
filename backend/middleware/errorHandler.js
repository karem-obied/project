const errorHandler = (err, req, res, next) => {
  const sc = res.statusCode || 500;
  res.status(sc);
  res.json({
    message: err.message,
  });
};
module.exports = {
  errorHandler,
};
