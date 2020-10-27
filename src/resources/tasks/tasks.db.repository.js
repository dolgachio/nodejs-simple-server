const Task = require('./task.model');

const getAll = async () => {
  return Task.find({}).exec();
};

const save = async taskData => {
  return Task.create(taskData);
};

const get = async id => {
  return Task.findOne({ _id: id }).exec();
};

const update = async (id, taskData) => {
  return Task.updateOne({ _id: id }, taskData).exec();
};

const deleteTask = async id => {
  return Task.findOneAndDelete({ _id: id }).exec();
};

module.exports = { getAll, save, get, delete: deleteTask, update };
