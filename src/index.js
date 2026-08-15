const express = require('express');
const app = require('./server');
const config = require('./config/config');
const mongoose = require('mongoose');
const http = require('http');
const logger = require('./config/logger');

mongoose.connect(config.dbConnection).then(() => {
  console.info('connected to database');
});

const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, () => {
  logger.info(`server listening to ${config.port}`);
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
process.on('SIGTERM', () => {
  console.log('SIGTERM received');

  if (server) {
    server.close();
  }
});
