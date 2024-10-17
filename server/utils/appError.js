const AppError = function(message, status, statusCode) {
  const err = new Error(message);

  err.status = err.status || status;
  err.statusCode = err.statusCode || statusCode;

  // console.log(err);
  return err;
};

module.exports = AppError;
