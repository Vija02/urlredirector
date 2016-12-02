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
var Game = bookshelf.Model.extend({
  tableName: 'games',
  hasTimestamps: true,
  group: function() {
    return this.belongsTo(Group);
  },
  plays: function() {
    return this.hasMany(Play);
  }
});
exports.Game = Game;

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  plays: function() {
    return this.hasMany(Plays);
  }
});
exports.User = User;

var Group = bookshelf.Model.extend({
  tableName: 'groups',
  hasTimestamps: true,
  games: function() {
    return this.hasMany(Game);
  }
});
exports.Group = Group;

var Play = bookshelf.Model.extend({
  tableName: 'plays',
  hasTimestamps: true,
  game: function() {
    return this.belongsTo(Game);
  },
  user: function() {
    return this.belongsTo(User);
  }
});
exports.Play = Play;
