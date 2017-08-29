const connect = require('../../lib/connect');
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/emoji';
connect(dbUri);
const connection = require('mongoose').connection;

module.exports = {
  drop() {
    return connection.dropDatabase();
  }
};
