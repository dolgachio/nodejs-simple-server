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
  }

  next(err);
}

module.exports = { errorMiddleware };
