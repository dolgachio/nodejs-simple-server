const Board = require('./board.model');

const getAll = async () => {
  return Board.find({}).exec();
};

const save = async boardData => {
  return Board.create(boardData);
};

const get = async id => {
  return Board.findOne({ _id: id }).exec();
};

const update = async (id, boardData) => {
  return Board.updateOne({ _id: id }, boardData).exec();
};

const deleteBoard = async id => {
  return Board.findOneAndDelete({ _id: id }).exec();
};

module.exports = { getAll, save, get, delete: deleteBoard, update };
