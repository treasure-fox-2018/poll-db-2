const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./databasePolitician.db')

const query1 = `SELECT name, location, grade_current, count(Politicians.id) as totalVote FROM Politicians
LEFT JOIN Votes ON Votes.politicianId = Politicians.id
WHERE grade_current < 9
GROUP BY Politicians.id
ORDER BY totalVote ASC`

db.all(query1, function(err, q1) {
    if(err) throw err
    console.log('1. ', q1)
})

const query2 = `SELECT count(Politicians.id) as totalVote, name, (first_name || ' ' || last_name) as voterName, gender FROM Votes
LEFT JOIN Politicians ON Politicians.id = Votes.politicianId
LEFT JOIN Voters ON Voters.id = Votes.voterId
GROUP BY Votes.politicianId
ORDER BY totalVote DESC
LIMIT 3`

db.all(query2, function(err, q2) {
    if(err) throw err
    console.log('2. ', q2)
})

const query3 = `SELECT count(voterId) as totalVote, (first_name || " " || last_name) as name, 
gender, age FROM Votes
LEFT JOIN Voters ON Voters.id = Votes.voterId
GROUP BY Votes.voterId
HAVING totalVote > 1
ORDER BY totalVote DESC
LIMIT 3`

db.all(query3, function(err, q3) {
    if(err) throw err
    console.log('3. ', q3)
})