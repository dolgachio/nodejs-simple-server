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

function internalServerErrorMiddleware(err, req, res) {
  const httpError = new createError.InternalServerError(JSON.stringify(err));

  res.status(httpError.statusCode).send(httpError);

  return;
}

module.exports = { errorMiddleware, internalServerErrorMiddleware };
