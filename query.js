const db = require('./db.js')

// case 1
db.all(`SELECT politicians.name, politicians.location, politicians.grade_current,
        COUNT(votes.politicianId) AS totalVote
        FROM politicians JOIN votes ON politicians.id = votes.politicianId
        WHERE politicians.grade_current < 9
        GROUP BY politicians.name
        ORDER BY totalVote ASC`,
  function(err, data) {
    if (err) throw err
    console.log('Case 1:')
    console.log(data)
  }
)
// case 2
db.all(`SELECT totalVote, politicianName, (voters.first_name || ' ' || voters.last_name) AS voterName, voters.gender 
        FROM
          (SELECT * FROM 
            (SELECT politicians.id, (politicians.name) AS politicianName, COUNT (votes.voterId) AS totalVote
            FROM politicians
            LEFT JOIN votes ON politicians.id = votes.politicianId
            GROUP BY politicians.name
            ORDER BY totalVote DESC LIMIT 3) AS total
          JOIN votes ON votes.politicianId = total.id) AS dataVoter
        LEFT JOIN voters ON voters.id = dataVoter.voterId`,
  function(err, data) {
    if (err) throw err
    console.log('Case 2:')
    console.log(data)
  })

// case 3
db.all(`SELECT COUNT(votes.voterId) AS totalVote, (voters.first_name || ' ' || voters.last_name) AS name, 
        voters.gender, voters.age
        FROM votes JOIN voters ON votes.voterId = voters.id
        GROUP BY name
        HAVING totalVote > 1
        ORDER BY totalVote DESC`,
  function(err, data) {
    if (err) throw err
    console.log('Case 3:')
    console.log(data)
  })