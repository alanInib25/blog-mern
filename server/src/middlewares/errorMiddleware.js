//not found
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//Middleware para errores
const errorHandleMiddle = (error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknow error" });
};

module.exports = { notFound, errorHandleMiddle };
