const tasksRepo = require('./tasks.memory.repository');
const Task = require('./task.model');
const createError = require('http-errors');

const getAll = async () => tasksRepo.getAll();

const save = async task => tasksRepo.save(task);

const get = async id => tasksRepo.get(id);

const deleteTask = async id => tasksRepo.delete(id);

const update = async (id, taskData) => {
  const isValid = Task.isValid(taskData);

  if (!isValid) {
    throw new createError.BadRequest('Fields required to update Task');
  }

  return tasksRepo.update(id, taskData);
};

module.exports = { getAll, save, get, delete: deleteTask, update };
