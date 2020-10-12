const uuid = require('uuid');

class Task {
  constructor(
    {
      id = uuid(),
      title = 'TASK',
      order = 0,
      description = 'DESCRIPTION',
      userId = 'userId',
      columnId = 'columnId'
    } = {},
    boardId
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static fromRequest(task, boardId) {
    return new Task(task, boardId);
  }

  static isValid(taskData) {
    const areRequiredFieldsExist =
      typeof taskData.title === 'string' &&
      typeof taskData.order === 'number' &&
      typeof taskData.description === 'string';

    return areRequiredFieldsExist;
  }
}

module.exports = Task;
