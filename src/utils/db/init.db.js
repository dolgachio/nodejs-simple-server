const createError = require('http-errors');

const { MONGO_CONNECTION_STRING } = require('../../common/config');

const initDB = async () => {
  const mongoose = require('mongoose');
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const initPromise = new Promise((resolve, reject) => {
    const db = mongoose.connection;
    db.on('error', () => {
      const error = new createError.InternalServerError(
        'Cannot Connect To DB...'
      );

      reject(error);
    });
    db.once('open', () => {
      console.log('Successfully connected to DB!');

      resolve({ sucess: true });
    });
  }).catch(error => {
    throw error;
  });

  return initPromise;
};

module.exports = initDB;
