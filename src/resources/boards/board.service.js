const createError = require('http-errors');

const boardsRepo = require('./boards.memory.repository');
const Board = require('./board.model');
const Column = require('./column.model');
const taskService = require('../tasks/task.service');

const getAll = async () => boardsRepo.getAll();

const save = async board => {
  const isValid = Board.isValid(board);

  if (!isValid) {
    throw new createError.BadRequest(
      'Fields title, columns are required to save Board'
    );
  }

  const boardData = Board.fromRequest(board);

  return boardsRepo.save(boardData);
};

const get = async id => boardsRepo.get(id);

const deleteBoard = async id => {
  await boardsRepo.delete(id);

  const tasks = await taskService.getAll();

  tasks.forEach(async task => {
    if (task.boardId === id) {
      await taskService.delete(task.id);
    }
  });
};

const update = async (id, boardData) => {
  const isValid = Board.isValid(boardData);

  if (!isValid) {
    throw new createError.BadRequest(
      'Fields title, columns are required to update Board'
    );
  }

  const columns = boardData.columns.map(column => {
    if (column.id) {
      return column;
    }

    return new Column(column);
  });

  boardData.columns = columns;

  return boardsRepo.update(id, boardData);
};

module.exports = { getAll, save, get, delete: deleteBoard, update };
