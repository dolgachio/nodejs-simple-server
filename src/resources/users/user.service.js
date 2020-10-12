const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const { BadRequestError } = require('../../utils/bad-request-error');

const getAll = async () => usersRepo.getAll();

const save = async user => usersRepo.save(user);

const update = async (id, userData) => {
  const isValid = User.isValid(userData);

  if (!isValid) {
    throw new BadRequestError(
      'Fields name, login, password are required to update User'
    );
  }

  return usersRepo.update(id, userData);
};

const deleteUser = async id => usersRepo.delete(id);

const get = async id => usersRepo.get(id);

module.exports = { getAll, save, get, update, delete: deleteUser };
