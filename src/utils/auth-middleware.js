const createError = require('http-errors');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../common/config');
const { wrapAsync } = require('../utils/wrap-async');
const asyncVerify = promisify(jwt.verify);

const resourcesWithoutAuth = ['/', '/doc', '/login'];

const authMiddleware = wrapAsync(async (req, res, next) => {
  const { url, headers } = req;
  const isAuthNotRequired = resourcesWithoutAuth.includes(url);
  if (isAuthNotRequired) {
    next();
    return;
  }

  const { authorization } = headers;
  if (!authorization) {
    throw new createError.Unauthorized('No authorization header');
  }

  const isTokenFollowBearerScheme = authorization.startsWith('Bearer ');
  if (!isTokenFollowBearerScheme) {
    throw new createError.Unauthorized("Token doesn'nt follow Bearer scheme");
  }

  const token = authorization.slice(7, authorization.length).trimLeft();
  let isTokenValid;
  try {
    isTokenValid = await asyncVerify(token, JWT_SECRET_KEY);
  } catch (err) {
    throw new createError.Unauthorized(`Cannot verify token: ${err}`);
  }

  if (!isTokenValid) {
    throw new createError.Unauthorized('Auth. token is invalid');
  }

  next();
});

module.exports = { authMiddleware };
