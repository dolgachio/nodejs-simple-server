const { finished } = require('stream');

function loggingMiddleware(req, res, next) {
  const { method, url } = req;
  const start = Date.now();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;

    console.log(`${method} ${url} ${statusCode} [${ms}]ms`);
  });

  next();
  return;
}

module.exports = { loggingMiddleware };
