//your code here

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');


function create_and_seed(){
    db.serialize(function(){
        db.run(`CREATE TABLE IF NOT EXISTS politicians
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(20),
        party VARCHAR(20),
        location VARCHAR(20),
        grade_Current FLOAT )`);
        
        db.run(`CREATE TABLE IF NOT EXISTS voters
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name VARCHAR(20),
            last_name VARCHAR(20),
            gender VARCHAR(20),
            age INTEGER)`);
        })

        db.run(`CREATE TABLE IF NOT EXISTS votes
        (voteId INTEGER AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER,
        FOREIGN KEY (voterId) REFERENCES voters(id),
        FOREIGN KEY (politicianId) REFERENCES politicians(id))`);
    }

create_and_seed()