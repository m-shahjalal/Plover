const { createLogger, format, transports } = require('winston');
const winstonRotate = require('winston-daily-rotate-file');

// configuration rotate file logger
const transport = new winstonRotate({
  filename: 'logs/error.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

// configuration The logger
const level = process.env.LEVEL || 'debug';

const logger = createLogger({
  level,
  format: format.combine(
    format.align(),
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      const ts = timestamp.slice(0, 19).replace('T', '');
      return `${ts} ${level}: ${message}`;
    })
  ),
  transports: [transport],
});

if (process.env.NODE_ENV !== 'production')
  logger.clear().add(new transports.Console());

module.exports = logger;
