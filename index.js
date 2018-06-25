const db = require('./db');

class Check {
  static voteUnderNumber (number) {
    let query = `SELECT name, location, grade_current, COUNT(Votes.politician_id) AS totalVote 
                 FROM Politicians LEFT JOIN Votes on Politicians.id = Votes.politician_id
                 WHERE grade_current < 9 GROUP BY name ORDER BY totalVote ASC`;

    db.all (query, function(err, dataCheck) {
      if (err) throw err;
      console.log(dataCheck)
    });
  }

  static whosVotePerson () {
    let query = `SELECT dataBaru.totalVotes, dataBaru.politicianName, Voters.first_name || ' ' || Voters.last_name AS name, Voters.gender FROM Votes,
                 (SELECT COUNT(voter_id) AS totalVotes, Politicians.name AS politicianName, Votes.politician_id FROM Politicians LEFT JOIN Votes 
                 on Politicians.id = Votes.politician_id GROUP BY Votes.politician_id ORDER BY totalVotes DESC LIMIT 3) AS dataBaru
                 LEFT JOIN Voters ON Votes.voter_id = Voters.id
                 WHERE Votes.politician_id = dataBaru.politician_id`;

    db.all (query, function(err, dataCheck) {
      if (err) throw err;
      console.log(dataCheck)
    });
  }

  static totalFraud () {
    let query = `SELECT COUNT(Votes.voter_id) AS totalVote, first_name || ' ' || last_name AS name, gender, age FROM Voters
                 LEFT JOIN Votes on Voters.id = Votes.voter_id GROUP BY name HAVING totalVote > 1 ORDER BY totalVote DESC`;

    db.all (query, function(err, dataCheck) {
      if (err) throw err;
      console.log(dataCheck)
    });
  }
}

//DRIVER CODE
// console.log(Check.voteUnderNumber(9));
// console.log(Check.whosVotePerson());
console.log(Check.totalFraud())