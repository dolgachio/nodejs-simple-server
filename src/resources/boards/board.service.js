const createError = require('http-errors');

const boardsRepo = require('./boards.db.repository');
const Board = require('./board.model');
const { Column } = require('./column.model');
const taskService = require('../tasks/task.service');

const getAll = async () => {
  const boards = await boardsRepo.getAll();

  return boards.map(normalizeBoard);
};

const save = async board => {
  const isValid = Board.isValid(board);

  if (!isValid) {
    throw new createError.BadRequest(
      'Fields title, columns are required to save Board'
    );
  }

  const boardData = Board.fromRequest(board);

  const boardFromDB = await boardsRepo.save(boardData);

  return normalizeBoard(boardFromDB);
};

const get = async id => {
  const board = await boardsRepo.get(id);

  if (!board) {
    throw new createError.NotFound('No Board with id: ', id);
  }

  return normalizeBoard(board);
};

const deleteBoard = async id => {
  const board = await boardsRepo.delete(id);

  if (!board) {
    throw new createError.NotFound('No Board with id: ', id);
  }

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

  const resultBoard = await boardsRepo.update(id, boardData);

  return normalizeBoard(resultBoard);
};

function normalizeBoard({ _id: id, title, columns }) {
  return { id, title, columns };
}

module.exports = { getAll, save, get, delete: deleteBoard, update };
