const { createLogger, format, transports } = require('winston');
const { ROOT_PATH } = require('../common/config');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `${ROOT_PATH}/logs/error.log`,
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: `${ROOT_PATH}/logs/info.log`,
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

module.exports = { logger };
