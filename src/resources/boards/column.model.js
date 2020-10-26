const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

columnSchema.statics.isValid = columnData => {
  return (
    !!columnData &&
    typeof columnData.title === 'string' &&
    typeof columnData.order === 'number'
  );
};

const Column = mongoose.model('Column', columnSchema);

module.exports = { Column, columnSchema };
