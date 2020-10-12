const {
  getAllEntities,
  saveEntity,
  getEntity,
  updateEntity,
  deleteEntity,
  dbKeys
} = require('../../utils/db');

const getAll = async () => {
  return getAllEntities(dbKeys.Tasks);
};

const save = async board => {
  return saveEntity(dbKeys.Tasks, board);
};

const get = async id => {
  return getEntity(dbKeys.Tasks, id);
};

const deleteTask = async id => {
  return deleteEntity(dbKeys.Tasks, id);
};

const update = async (id, taskData) => {
  return updateEntity(dbKeys.Tasks, id, taskData);
};

module.exports = { getAll, save, get, delete: deleteTask, update };
