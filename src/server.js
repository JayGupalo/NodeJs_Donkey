const express = require('express');
const app = express();
const blogRouter = require('./routes/blog.routes');
const { errorHandler, errorConverter } = require('./middleware/error');
const httpStatus = require('http-status');
const ApiError = require('./utils/ApiError');
const morgan = require('./config/morgan');

app.use(morgan.successHnadler);
app.use(morgan.errorHandler);

app.use(express.json());
app.use(blogRouter);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.default.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
