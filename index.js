const db = require("./db")

const gradeTerkecil = () => {
  const query = `SELECT name, location, grade_current, COUNT(politician_id) AS totalVote FROM Politicians 
                JOIN Votes ON Politicians.id = Votes.politician_id
                WHERE grade_current < 9
                GROUP BY name
                ORDER BY grade_current ASC;`

  db.all(query, (err, data) => {
    if (err) throw err;
    console.log(data);
  })
}

const topVote = () => {
    const query = `SELECT totalVote, politicianName, (first_name ||" "|| last_name) AS voterName, gender FROM                Votes, (
                      SELECT COUNT(politician_id) AS totalVote, name AS politicianName, politician_id FROM Politicians
                      JOIN Votes
                      ON Politicians.id = Votes.politician_id
                      GROUP BY politician_id
                      ORDER BY totalVote DESC
                      LIMIT 3
                  ) AS topVote
                  LEFT JOIN Voters
                  ON Voters.id = Votes.voter_id
                  WHERE Votes.politician_id = topVote.politician_id`
    
    db.all(query, (err, data) => {
      if (err) throw err;
      console.log(data);
    })
}

const fraud = () => {
  const query = `SELECT COUNT(voter_id) AS totalVote, (first_name ||" "|| last_name) AS                name, gender, age FROM Voters
                LEFT JOIN Votes ON Voters.id = Votes.voter_id
                GROUP BY name
                HAVING totalVote > 1
                ORDER BY totalVote DESC;`
  db.all(query, (err, data) => {
    if (err) throw err;
    console.log(data);
  })
}

gradeTerkecil()
topVote()
fraud()
module.exports = gradeTerkecil, topVote, fraud