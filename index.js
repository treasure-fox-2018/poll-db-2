const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

class Show {
  
  static case1(){
    let query = `SELECT name, location, grade_current, COUNT(*) AS 'totalVotes' FROM Politicians INNER JOIN Votes ON Politicians.id = Votes.politician_id WHERE grade_current < 9 GROUP BY name ORDER BY grade_current ASC`;

    db.all(query, (err, result) => {
      if (err){
        console.log(err.message)
      } else {
        console.log(result);
      }
    });
  }


  static case2(){
    let query = `SELECT newTable.totalVotes, newTable.name, Voters.first_name || " " || Voters.last_name AS voterName, Voters.gender FROM Votes INNER JOIN (SELECT COUNT (*) AS 'totalVotes', Politicians.name, Politicians.id FROM Politicians INNER JOIN Votes ON Politicians.id = Votes.politician_id GROUP BY Politicians.name ORDER BY totalVotes DESC LIMIT 3) AS newTable ON newTable.id = Votes.politician_id INNER JOIN Voters ON Votes.voter_id = Voters.id`;

    db.all(query, (err, result) => {
      if (err){
        console.log(err.message)
      } else {
        console.log(result);
      }
    });
  }

  static case3(){
    let query = `SELECT totalVotes, name, gender, age FROM (SELECT COUNT (*) AS 'totalVotes', first_name || ' ' || last_name AS name, 
    gender, age FROM Voters INNER JOIN Votes ON Votes.voter_id = Voters.id GROUP BY Voters.id ORDER BY totalVotes desc) WHERE totalVotes >1
    ORDER BY totalVotes DESC`;

    db.all(query, (err, result) => {
      if (err){
        console.log(err.message)
      } else {
        console.log(result);
      }
    });
  }
}

Show.case3()


