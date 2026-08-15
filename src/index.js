const express = require('express');
const app = require('./server');
const config = require('./config/config');
const mongoose = require('mongoose');
const http = require('http');
const logger = require('./config/logger');

mongoose
  .connect(config.dbConnection)
  .then(() => {
    logger.info('connected to database');
  })
  .catch((err) => {
    logger.error(err);
  });

const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, () => {
  logger.info(`server listening to ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process?.exit(1);
  }
};
const unExpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unExpectedErrorHandler);
process.on('unHandledRejection', unExpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');

  if (server) {
    server.close();
  }
});
