let sqlite3 = require('sqlite3').verbose()
var db  = new sqlite3.Database('./polling.db')

function setup() {
    db.serialize(function() {
        db.run(`CREATE TABLE IF NOT EXISTS Politicians
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100),
                party INTEGER,
                location VARCHAR(100),
                grade_current FLOAT(100)
                )`);

        db.run(`CREATE TABLE IF NOT EXISTS Voters
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    first_name VARCHAR(100),
                    last_name VARCHAR(100),
                    gender TEXT(100),
                    age INTEGER
                )`);

        db.run(`CREATE TABLE IF NOT EXISTS Votes
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    voterId INTEGER,
                    politicianId INTEGER,
                    FOREIGN KEY(voterId) REFERENCES voters(id)
                )`);
    })
}

setup()

module.exports = db
