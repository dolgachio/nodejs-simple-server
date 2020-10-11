const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();

const save = async user => usersRepo.save(user);

const get = async id => usersRepo.get(id);

module.exports = { getAll, save, get };
