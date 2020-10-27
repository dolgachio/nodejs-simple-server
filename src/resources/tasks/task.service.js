const tasksRepo = require('./tasks.db.repository');
const Task = require('./task.model');
const createError = require('http-errors');

const getAll = async () => {
  const tasks = await tasksRepo.getAll();

  return tasks.map(Task.normalizeIdField);
};

const save = async (taskData, boardId) => {
  const task = Task.fromRequest(taskData, boardId);
  const savedTask = await tasksRepo.save(task);

  return Task.normalizeIdField(savedTask);
};

const get = async id => {
  const task = await tasksRepo.get(id);

  if (!task) {
    throw new createError.NotFound(`No Task with id: ${id}`);
  }

  return Task.normalizeIdField(task);
};

const deleteTask = async id => {
  console.log('DELETE TASK ', id);
  const task = await tasksRepo.delete(id);

  if (!task) {
    throw new createError.NotFound(`No Task with id: ${id}`);
  }

  return null;
};

const update = async (id, taskData) => {
  const isValid = Task.isValid(taskData);

  if (!isValid) {
    throw new createError.BadRequest('Fields required to update Task');
  }

  const updatedTask = await tasksRepo.update(id, taskData);

  return Task.normalizeIdField(updatedTask);
};

module.exports = { getAll, save, get, delete: deleteTask, update };
