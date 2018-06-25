const db    = require('./db');
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log('$ node read help');
}else if (command === 'help') {
  console.log('$ node read lessThanNine (release 0 no 1)');
  console.log('$ node read topThreeVoters (release 0 no 2)');
  console.log('$ node read fraud (release 0 no 3)');
}else if (command === 'lessThanNine') {
  let query = `SELECT name, location, grade_current, COUNT(politicianId) AS totalVote FROM politicians JOIN votes WHERE (grade_current < 9) GROUP BY politicians.name ORDER BY grade_current`;
  db.all(query, function (err, output) {
    if (err) throw err;
    console.log(output);
  });
}else if (command === 'topThreeVoters') {
  let query = `SELECT totalVote, politicianName, voters.first_name||" "||voters.last_name AS voterName, voters.gender FROM votes, (SELECT COUNT(politicianId) AS totalVote, politicians.name AS politicianName, politicians.id AS idOfPoliticians
        FROM politicians JOIN votes ON politicians.id = votes.politicianId
        GROUP BY politicians.name ORDER BY totalVote DESC LIMIT 3) AS tempData
		JOIN voters ON votes.voterId = voters.id WHERE tempData.idOfPoliticians = votes.politicianId ORDER BY totalVote DESC`;
  db.all(query, function (err, output) {
    if (err) throw err;
    console.log(output);
  });
}else if (command === 'fraud') {
  let query = `SELECT (totalVote), voters.first_name||" "||voters.last_name AS name, voters.gender, voters.age  FROM (SELECT COUNT(voterId) AS totalVote, voters.id AS idOfVoters
  FROM votes JOIN voters ON votes.voterId = voters.id GROUP BY voters.id ) AS tempData
  LEFT JOIN voters ON voters.id = tempData.idOfVoters
  WHERE (totalVote > 1)
  ORDER BY totalVote DESC`;
  db.all(query, function (err, output) {
    if (err) throw err;
    console.log(output);
  });
}
