const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database1.db');

//NO 1
let query1 = `select  name, location, grade_current , count(Votes.id_politicians)  as totalVote from Politicians
 JOIN Votes ON
Votes.id_politicians = Politicians.id
where grade_current < 9 group by name order by grade_current asc`

db.all(query1, (err, data) => {
  if (err) throw err
  console.log('NOMOR 1 --->>>>>>>>>>>>>>>>  ')
  console.log(data)
})



// NO 2
let query2 =
  `SELECT tmp_politicians.totalVote, tmp_politicians.name AS politicianName, 
  (voters.first_name||" " ||voters.last_name) AS voterName, voters.gender
FROM (
 SELECT politicians.id, COUNT(*) as totalVote, politicians.name
  FROM votes
  JOIN politicians ON votes.id_politicians = politicians.id
  GROUP BY politicians.name
  ORDER BY totalVote DESC
) AS tmp_politicians
LEFT JOIN votes ON tmp_politicians.id= votes.id_politicians
LEFT JOIN voters ON votes.id_voters = voters.id`


db.all(query2, (err, data) => {
  if (err) throw err
  console.log('NOMOR 2 --->>>>>>>>>>>>>>>>  ')
  console.log(data)
})



//No. 3
let query3 = `select count(Votes.id_voters) as TotalVote,
first_name || " " || last_name as name,
gender, age from Voters
JOIN Votes ON
Voters.id = Votes.id_voters
group by name
HAVING TotalVote > 1
order by TotalVote desc`


db.all(query3, (err, data) => {
  if (err) throw err
  console.log('nomor 3 ->>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log(data)
})
