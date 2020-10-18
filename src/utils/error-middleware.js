const createError = require('http-errors');
const { logger } = require('./logger');

function errorMiddleware(err, req, res, next) {
  logger.error(JSON.stringify(err));

  if (createError.isHttpError(err)) {
    res.status(err.statusCode).send(err);

    return;
  }

  next(err);

  return;
}

module.exports = { errorMiddleware };
