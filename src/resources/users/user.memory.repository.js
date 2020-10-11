const { getAllEntities, dbKeys } = require('../../utils/db');

const getAll = async () => {
  return getAllEntities(dbKeys.Users);
};

module.exports = { getAll };
