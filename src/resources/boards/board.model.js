const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static fromRequest(board) {
    const columns = board.columns.map(column => new Column(column));
    const boardWithColumns = Object.assign({}, board, { columns });

    return new Board(boardWithColumns);
  }

  static isValid(boardData) {
    const isRequiredFields =
      typeof boardData.title === 'string' && !!boardData.columns;

    return isRequiredFields && boardData.columns.every(Column.isValid);
  }
}

module.exports = Board;
