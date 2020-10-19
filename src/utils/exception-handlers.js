const { logger } = require('./logger');

function uncaughtExceptionHandler(err) {
  const date = new Date().toUTCString();
  const errStack = err && err.stack;

  const message = `[UncaughtException on ${date}]: Error: ${err} Stack: ${errStack} }`;

  logger.error(message);

  logger.on('finish', () => {
    throw err;
  });
}

function unhandledRejectionHandler(err) {
  logger.error(JSON.stringify({ message: err.message, error: err }));
}

module.exports = { uncaughtExceptionHandler, unhandledRejectionHandler };
