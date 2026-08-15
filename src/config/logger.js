const winston = require('winston');

const { format, createLogger } = winston;

const winstonFormat = format.printf((obj) => {
  console.log(obj);
  const { level, message, timestamp, stack } = obj;
  return `${timestamp}: ${level} : ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), winstonFormat),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
