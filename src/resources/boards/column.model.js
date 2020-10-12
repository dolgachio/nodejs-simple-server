const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'COLUMN', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static isValid(columnData) {
    console.log(columnData);
    return (
      !!columnData &&
      typeof columnData.title === 'string' &&
      typeof columnData.order === 'number'
    );
  }
}

module.exports = Column;
