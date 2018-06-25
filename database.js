var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./pool_database.db');

module.exports = db;