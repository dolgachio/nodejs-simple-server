const uuid = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static fromRequest(user) {
    return new User(user);
  }

  static isValid(userData) {
    return (
      typeof userData.name === 'string' &&
      typeof userData.login === 'string' &&
      typeof userData.password === 'string'
    );
  }
}

module.exports = User;
