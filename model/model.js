const db = require('../db');

class Model {
  
  static query1(callback) {
    const query = `SELECT politicians.name, politicians.location, politicians.grade_current, COUNT (voterId) AS totalVote FROM politicians 
                    LEFT JOIN votes ON politicians.id = votes.politicianId
                    WHERE votes.politicianId IN (SELECT id FROM politicians
                    WHERE grade_current < 9)
                    GROUP BY politicians.name
                    ORDER BY politicians.grade_current ASC`
    db.all(query, function (err, data) {
      callback(data)
    });
  }

  static query2(callback) {
    const query = `SELECT newTable.totalVote, newTable.name AS politicianName, (voters.first_name || " " || voters.last_name) AS voterName, voters.gender FROM votes, 
                    (SELECT COUNT(voterId) AS totalVote, politicians.name, politicians.id FROM politicians 
                    LEFT JOIN votes ON politicians.id = votes.politicianId
                    GROUP BY politicians.id
                    ORDER BY COUNT (voterId) DESC LIMIT 3) AS newTable
                    LEFT JOIN voters ON votes.voterId = voters.id
                    WHERE votes.politicianId = newTable.id`
    db.all(query, function (err, data) {
      callback(data)
    });
  }

  static query3(callback) {
    const query = `SELECT COUNT (voterId) AS totalVote, (voters.first_name || " " || voters.last_name) AS name, voters.gender, voters.age FROM voters
                    LEFT JOIN votes ON voters.id = votes.voterId
                    WHERE voters.id = votes.voterId
                    GROUP BY voters.id
                    HAVING COUNT(voterId) > 1
                    ORDER BY COUNT (voterId) DESC`
    db.all(query, function (err, data) {
      callback(data)
    });
  }

}
module.exports = Model