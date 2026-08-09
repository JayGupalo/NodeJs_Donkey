const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog.routes');
const { getBlogs, createBlog } = require('./controller/blog.controller');
const { errorHandler, errorConverter } = require('./middleware/error');
const httpStatus = require('http-status');

const config = require('./config/config');
const ApiError = require('./utils/ApiError');

mongoose.connect(config.dbConnection).then(() => {
  console.info('connected to database');
});

app.use(express.json());
app.use(blogRouter);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.default.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);
app.use(errorHandler);

app.listen(config.port, () => {
  console.info(`server listening to ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process?.exit(1);
  }
};
const unExpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unExpectedErrorHandler);
process.on('unHandledRejection', unExpectedErrorHandler);
