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

const getByLogin = async login => {
  return User.findOne({ login }).exec();
};

const update = async (id, userData) => {
  return User.updateOne({ _id: id }, userData).exec();
};

const deleteUser = async id => {
  return User.findOneAndDelete({ _id: id }).exec();
};

module.exports = { getAll, save, get, getByLogin, update, delete: deleteUser };
