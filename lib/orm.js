// Database Config
var dbConfig = {
  client: 'pg',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    charset  : 'utf8'
  }
}

// Setup bookshelf
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
exports.bookshelf = bookshelf;
// Setup ORM models
var Url = bookshelf.Model.extend({
  tableName: 'url',
  hasTimestamps: true
});
exports.Url = Url;
