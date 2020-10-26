const { logger } = require('./logger');

function loggingMiddleware(req, res, next) {
  const { method, url, query, body } = req;
  const logInfo = JSON.stringify({
    method,
    url,
    query,
    body
  });

  logger.info(logInfo);

  next();
  return;
}

module.exports = { loggingMiddleware };
