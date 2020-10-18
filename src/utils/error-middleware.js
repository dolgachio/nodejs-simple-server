const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { NotFoundError } = require('./not-found-error');
const { BadRequestError } = require('./bad-request-error');

function errorMiddleware(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(404).send({
      error: 'NotFoundError',
      message: err.message
    });

    return;
  }

  if (err instanceof BadRequestError) {
    res.status(400).send({
      error: 'BadRequestError',
      message: err.message
    });

    return;
  }

  next(err);
}

function internalServerErrorMiddleware(err, req, res) {
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));

  return;
}

module.exports = { errorMiddleware, internalServerErrorMiddleware };
