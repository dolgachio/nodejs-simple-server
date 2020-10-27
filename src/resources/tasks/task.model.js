const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    columnId: String,
    boardId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.fromRequest = (taskData, boardId) => {
  return { ...taskData, boardId };
};

taskSchema.statics.isValid = taskData => {
  const areRequiredFieldsExist =
    typeof taskData.title === 'string' &&
    typeof taskData.order === 'number' &&
    typeof taskData.description === 'string';

  return areRequiredFieldsExist;
};

taskSchema.statics.normalizeIdField = data => {
  const {
    _id: id,
    title,
    order,
    description,
    userId,
    columnId,
    boardId
  } = data;

  return {
    id,
    title,
    order,
    description,
    userId,
    columnId,
    boardId
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
