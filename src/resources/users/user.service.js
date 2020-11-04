const createError = require('http-errors');
const bcrypt = require('bcrypt');

const usersRepo = require('./user.db.repository');
const User = require('./user.model');
const taskService = require('../tasks/task.service');

const getAll = async () => usersRepo.getAll();

const save = async userData => {
  const isValid = User.isValid(userData);

  if (!isValid) {
    throw new createError.BadRequest(
      'Fields name, login, password are required to save User'
    );
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(userData.password, saltRounds);

  return usersRepo.save(
    User.fromRequest({ ...userData, password: passwordHash })
  );
};

const update = async (id, userData) => {
  const isValid = User.isValid(userData);

  if (!isValid) {
    throw new createError.BadRequest(
      'Fields name, login, password are required to update User'
    );
  }

  return usersRepo.update(id, User.fromRequest(userData));
};

const deleteUser = async id => {
  const user = await usersRepo.delete(id);

  if (!user) {
    throw new createError.NotFound(`No Such User with id: ${id}`);
  }

  const tasks = await taskService.getAll();

  for (const task of tasks) {
    if (task.userId === id) {
      task.userId = null;
      await taskService.update(task.id, task);
    }
  }
};

const get = async id => {
  const user = await usersRepo.get(id);

  if (!user) {
    throw new createError.NotFound(`No Such User with id: ${id}`);
  }

  return user;
};

const getByLogin = async login => {
  return await usersRepo.getByLogin(login);
};

module.exports = { getAll, save, get, getByLogin, update, delete: deleteUser };
