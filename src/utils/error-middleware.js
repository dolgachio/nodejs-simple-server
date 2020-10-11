const { NotFoundError } = require('./not-found-error');

function errorMiddleware(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(404).send({
      error: 'NotFoundError',
      message: err.message
    });

    return;
  }

  next(err);
}

module.exports = { errorMiddleware };
