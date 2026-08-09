const mongoose = require('mongoose');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.default.BAD_REQUEST
        : httpStatus.default.INTERNAL_SERVER_ERROR;

    const message = error.statusCode || httpStatus.status[statusCode];
    error = new ApiError(statusCode, message, false, error.stack);
  }

  next(error);
};
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  console.log(err);
  console.log(config.env);

  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.default.INTERNAL_SERVER_ERROR;
    message = httpStatus.status[statusCode];
  }

  const response = {
    error: true,
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  res.locals.errorMessage = message;

  if (config.env === 'development') {
    console.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = { errorHandler, errorConverter };
