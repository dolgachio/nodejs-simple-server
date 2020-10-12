const {
  getAllEntities,
  saveEntity,
  getEntity,
  updateEntity,
  deleteEntity,
  dbKeys
} = require('../../utils/db');

const getAll = async () => {
  return getAllEntities(dbKeys.Boards);
};

const save = async board => {
  return saveEntity(dbKeys.Boards, board);
};

const get = async id => {
  return getEntity(dbKeys.Boards, id);
};

const deleteBoard = async id => {
  return deleteEntity(dbKeys.Boards, id);
};

const update = async (id, boardData) => {
  return updateEntity(dbKeys.Boards, id, boardData);
};

module.exports = { getAll, save, get, delete: deleteBoard, update };
