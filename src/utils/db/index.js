const { NotFoundError } = require('../../utils/not-found-error');

const dbKeys = {
  Users: 'users'
};

const data = {
  [dbKeys.Users]: []
};

async function getAllEntities(tableKey) {
  return data[tableKey] ? data[tableKey] : null;
}

async function saveEntity(tableKey, entity) {
  const table = data[tableKey];
  table.push(entity);
  return entity;
}

async function getEntity(tableKey, id) {
  const table = data[tableKey];
  const entity = table.find(item => item.id === id);

  if (!entity) {
    throw new NotFoundError(`No user with id: ${id}`);
  }

  return entity;
}

module.exports = {
  dbKeys,
  getAllEntities,
  saveEntity,
  getEntity
};
