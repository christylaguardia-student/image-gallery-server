/* eslint no-console: "off" */

const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/connect');

const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/emoji';
connect(dbUri);

const server = http.createServer(app);
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log('Server is running on port', server.address().port);
});
