const db = require('./db');

class advancedQueries {
  static number1() {
    db.all(`SELECT name, location,  grade_current, COUNT(name) AS total_votes FROM politicians INNER JOIN votes
    ON politicians.id = votes.politicianId
    WHERE name IN
    (SELECT name FROM politicians
      WHERE grade_current < 9)
      GROUP BY name
      ORDER BY  grade_current`, function(err, data) {
        console.log(data);
      });
  }

  static number2() {
    db.all(`SELECT databaru.totalVotes, dataBaru.politicianName, first_name || " " || last_name AS voterName, gender FROM votes,
(SELECT COUNT(politicianId) AS totalVotes, name AS politicianName, votes.politicianId FROM politicians
LEFT JOIN votes on politicians.id = votes.politicianId GROUP BY politicians.name ORDER BY totalVotes DESC LIMIT 3) AS dataBaru
LEFT JOIN voters on votes.voterId = voters.id
WHERE votes.politicianId = dataBaru.politicianId`, function(err, data) {
        console.log(data);
      });
  }

  static number3() {
    db.all(`SELECT COUNT(votes.id) AS totalVotes, voters.first_name || " " || voters.last_name AS name, voters.gender, voters.age FROM votes
LEFT JOIN voters
ON votes.voterId = voters.id
GROUP BY voterId
HAVING totalVotes > 1
ORDER BY totalVotes DESC`, function(err, data) {
        console.log(data);
      });
  }

}

advancedQueries.number1();
advancedQueries.number2();
advancedQueries.number3();
