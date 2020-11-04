const createError = require('http-errors');
const userService = require('../users/user.service');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcrypt');

const { JWT_SECRET_KEY } = require('../../common/config');
const validateLoginUserData = require('./validate-login-user-data');

const asyncSign = promisify(jwt.sign);

const login = async userData => {
  const isLoginUserDataValid = validateLoginUserData(userData);

  if (!isLoginUserDataValid) {
    throw new createError.Forbidden(
      'Cannot login, you should provide both login and password'
    );
  }

  const user = await userService.getByLogin(userData.login);

  if (!user) {
    throw new createError.Forbidden('Cannot login, no such user');
  }

  let isPasswordCorrect;
  try {
    isPasswordCorrect = await bcrypt.compare(userData.password, user.password);
  } catch (err) {
    throw new createError.Forbidden('Cannot login, cannot compare passwords');
  }

  if (!isPasswordCorrect) {
    throw new createError.Forbidden('Cannot login, incorrect password');
  }

  let token;

  try {
    token = await asyncSign(
      { login: user.login, userId: user._id },
      JWT_SECRET_KEY
    );
  } catch (err) {
    throw new createError.Forbidden('Cannot login, cannot create token');
  }

  return { token };
};

module.exports = { login };
