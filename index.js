const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');


function checkGrade() {
  let query = `SELECT name, location, grade_current, COUNT(name) AS totalVote
               FROM politicians INNER JOIN votes
	              ON votes.politicianId = politicians.politicianId
               WHERE grade_current < 9
               GROUP BY name
               ORDER BY totalVote ASC;`
  db.all(query, function(err, data) {
   if (err) throw err;
   console.log(data)
  })
}

// checkGrade()

function checkTop3() {
  let query = `SELECT total_vote, politicianName, first_name || " " || last_name AS voterName, gender FROM Votes,
              (SELECT COUNT(*) AS total_vote,name AS politicianName, Politicians.politicianId FROM Votes
                INNER JOIN Politicians ON Votes.politicianId= Politicians.politicianId
                INNER JOIN Voters ON Votes.voterId = Voters.voterId
                GROUP BY name
                ORDER BY total_vote DESC LIMIT 3) AS newData
              INNER JOIN Voters ON Voters.voterId = Votes.voterId
              WHERE Votes.politicianId = newData.politicianId`
  db.all(query, function(err, data) {
   if (err) throw err;
   console.log(data)
  })
}

// checkTop3()

function checkVotingFraud() {
  let query = `SELECT COUNT(*) AS total_vote, first_name || " " || last_name AS voterName, gender, age FROM Votes
               INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId
               INNER JOIN Voters ON Votes.voterId = Voters.voterId
               GROUP BY voterName
               HAVING total_vote > 1
               ORDER BY total_vote DESC`
  db.all(query, function(err, data) {
   if (err) throw err;
   console.log(data)
  })
}

checkVotingFraud()
