// const { createError } = require('../../utils/not-found-error');
const createError = require('http-errors');

const dbKeys = {
  Users: 'users',
  Boards: 'boards',
  Tasks: 'tasks'
};

const data = {
  [dbKeys.Users]: [],
  [dbKeys.Boards]: [],
  [dbKeys.Tasks]: []
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
    throw new createError.NotFound(`No entity with id: ${id}`);
  }

  return entity;
}

async function updateEntity(tableKey, id, entity) {
  const table = data[tableKey];
  const entityIndex = table.findIndex(item => item.id === id);

  if (entityIndex === -1) {
    throw new createError.NotFound(`No entity with id: ${id}`);
  }

  entity.id = id;
  table[entityIndex] = entity;

  return entity;
}

async function deleteEntity(tableKey, id) {
  const table = data[tableKey];
  const isEntityExist = table.some(item => item.id === id);

  if (!isEntityExist) {
    throw new createError.NotFound(`No entity with id: ${id}`);
  }

  data[tableKey] = table.filter(item => item.id !== id);

  return null;
}

module.exports = {
  dbKeys,
  getAllEntities,
  saveEntity,
  getEntity,
  updateEntity,
  deleteEntity
};
