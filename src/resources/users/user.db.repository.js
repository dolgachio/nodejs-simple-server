const User = require('./user.model');

const getAll = async () => {
  return User.find({}).exec();
};

const save = async userData => {
  return User.create(userData);
};

const get = async id => {
  return User.findOne({ _id: id }).exec();
};

const update = async (id, userData) => {
  return User.updateOne({ _id: id }, userData).exec();
};

const deleteUser = async id => {
  return User.deleteOne({ _id: id }).exec();
};

module.exports = { getAll, save, get, update, delete: deleteUser };
