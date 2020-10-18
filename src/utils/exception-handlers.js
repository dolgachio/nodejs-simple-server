const { logger } = require('./logger');

function uncaughtExceptionHandler(err) {
  const date = new Date().toUTCString();
  const errMessage = err && err.message;
  const errStack = err && err.stack;

  const message = `[UncaughtException on ${date}]: ${errMessage} ${errStack}}`;

  logger.error(message);

  logger.on('finish', () => {
    throw err;
  });
}

function unhandledRejectionHandler(err) {
  logger.error(JSON.stringify({ message: err.message, error: err }));
}

module.exports = { uncaughtExceptionHandler, unhandledRejectionHandler };
