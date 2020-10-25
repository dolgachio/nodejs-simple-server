const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

userSchema.statics.isValid = userData => {
  return (
    typeof userData.name === 'string' &&
    typeof userData.login === 'string' &&
    typeof userData.password === 'string'
  );
};

userSchema.statics.fromRequest = ({ name, login, password }) => {
  return { name, login, password };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
