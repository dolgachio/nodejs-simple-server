const { logger } = require('./logger');

function loggingMiddleware(req, res, next) {
  const { url, query, body } = req;
  const logInfo = JSON.stringify({
    url,
    query,
    body
  });

  logger.info(logInfo);

  next();
  return;
}

module.exports = { loggingMiddleware };
