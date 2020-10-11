const {
  getAllEntities,
  saveEntity,
  getEntity,
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

module.exports = { getAll, save, get };
