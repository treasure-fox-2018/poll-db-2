const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

class Show {
  
  static case1(){
    let query = `SELECT name, location, grade_current, COUNT(*) AS 'totalVotes' FROM Politicians INNER JOIN Votes ON Politicians.id = Votes.politician_id WHERE grade_current < 9 GROUP BY name ORDER BY grade_current ASC`;

    db.all(query, (err, result) => {
      console.log(result);
    });
  }

  static case2(){
    let query = ``;

    db.all(query, (err, result) => {
      console.log(result);
    });
  }

  static case3(){
    let query = `SELECT (SELECT COUNT(*) FROM Votes WHERE voter_id = Voters.id) as 'totalVotes', first_name || ' ' || last_name AS name, gender, age FROM Voters WHERE totalVotes > 1 ORDER BY totalVotes desc`;

    db.all(query, (err, result) => {
      console.log(result);
    });
  }
}

Show.case3()