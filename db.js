const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('../poll-db-1/database.db');

console.log(db)
module.exports = db