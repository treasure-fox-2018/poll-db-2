const db = require('./database')

function ViewsVote() {
  db.all(`SELECT name, location, grade_current, (SELECT COUNT(*) FROM Votes WHERE politician_id = politicians.id) AS totalVote
  FROM politicians 
  INNER JOIN votes 
  ON politicians.id = votes.politician_id 
  INNER JOIN voters 
  ON voters.id = votes.voter_id 
  WHERE grade_current < 9 
  GROUP BY politicians.name
  ORDER BY grade_current ASC`, function (err, politicians) {
    console.log(politicians);
  });
}

function top3TotalVote() {
  db.all(`SELECT totalVote,
  (first_name||' '||last_name) AS voterName,
  (name) AS politicianName,
  gender
  FROM votes,
  (SELECT COUNT(politicians.id) AS totalVote, *
  FROM politicians
  LEFT JOIN votes
  ON politicians.id = votes.politician_id
  GROUP BY politicians.name
  ORDER BY totalVote DESC
  LIMIT 3) AS tableTemporary
  LEFT JOIN voters
  ON votes.voter_id = voters.id
  WHERE votes.politician_id = tableTemporary.politician_id`, function (err, politicians) {
    console.log(politicians);
  });
}

function checkCheatVoters() {
  db.all(`SELECT totalVote,
  (first_name||' '||last_name) AS voterName,
  (name) AS politicianName,
  gender
  FROM votes,
  (SELECT COUNT(politicians.id) AS totalVote, *
  FROM politicians
  LEFT JOIN votes
  ON politicians.id = votes.politician_id
  GROUP BY politicians.name
  ORDER BY totalVote DESC
  LIMIT 3) AS tableTemporary
  LEFT JOIN voters
  ON votes.voter_id = voters.id
  WHERE votes.politician_id = tableTemporary.politician_id`, function (err, politicians) {
    console.log(politicians);
  });
}

//1.)
// ViewsVote()
//2.)
// top3TotalVote()
//3.)
checkCheatVoters()