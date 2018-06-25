
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

var query = `select * from politicians`
db.all(query, function(err, data){
    if(err) throw err
    console.log(data);
    
})

//RElEASE 0 1

// SELECT name, location, grade_current, count(politicianId) AS totalVote
// FROM politicians 
// JOIN votes 
// ON politicians.id = votes.politicianId
// WHERE grade_current < 9
// GROUP BY name
// ORDER BY totalVote;


//RELEASE 0 2
// SELECT  totalVote,name,first_name ||" "|| last_name AS voterName, gender FROM votes,(SELECT count(*) as totalVote,politicians.name, politicians.id
// FROM votes 
// JOIN politicians 
// ON  votes.politicianId = politicians.id
// JOIN voters ON votes.voterId = voters.id
// GROUP BY name
// ORDER BY totalVote DESC
// LIMIT 3) as newData LEFT JOIN voters ON votes.voterId = voters.id 

//RELEASE 0 3
//select COUNT(votes.voterId) AS jumlahVote, first_name || ' ' || last_name AS name, gender, age 
// FROM voters
// JOIN votes
// ON voters.id = votes.voterId
// GROUP BY name
// HAVING jumlahVote > 1
// ORDER BY jumlahVote DESC 
