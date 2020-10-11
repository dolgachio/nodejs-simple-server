const dbKeys = {
  Users: 'users'
};

const data = {
  [dbKeys.Users]: []
};

function getAllEntities(tableKey) {
  return data[tableKey] ? data[tableKey] : null;
}

module.exports = {
  dbKeys,
  getAllEntities
};
