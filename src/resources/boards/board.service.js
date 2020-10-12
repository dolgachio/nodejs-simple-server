const boardsRepo = require('./boards.memory.repository');
const Board = require('./board.model');
const Column = require('./column.model');
const { BadRequestError } = require('../../utils/bad-request-error');

const getAll = async () => boardsRepo.getAll();

const save = async board => boardsRepo.save(board);

const get = async id => boardsRepo.get(id);

const deleteBoard = async id => boardsRepo.delete(id);

const update = async (id, boardData) => {
  const isValid = Board.isValid(boardData);

  if (!isValid) {
    throw new BadRequestError(
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
