const {
  getAllEntities,
  saveEntity,
  getEntity,
  updateEntity,
  deleteEntity,
  dbKeys
} = require('../../utils/db');

const getAll = async () => {
  return getAllEntities(dbKeys.Users);
};

const save = async user => {
  return saveEntity(dbKeys.Users, user);
};

const get = async id => {
  return getEntity(dbKeys.Users, id);
};

const update = async (id, userData) => {
  return updateEntity(dbKeys.Users, id, userData);
};

const deleteUser = async id => {
  return deleteEntity(dbKeys.Users, id);
};

module.exports = { getAll, save, get, update, delete: deleteUser };
