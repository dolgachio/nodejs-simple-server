const uuid = require('uuid');
const { Column, columnSchema } = require('./column.model');

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: [columnSchema],
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.fromRequest = ({ title, columns }) => {
  return { title, columns };
};

boardSchema.statics.isValid = boardData => {
  const isRequiredFields =
    typeof boardData.title === 'string' && !!boardData.columns;

  return isRequiredFields && boardData.columns.every(Column.isValid);
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
