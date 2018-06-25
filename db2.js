var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
// const db = require('./database.db');


//SOAL1//
db.all(`SELECT name,location,grade_current,COUNT(votes.politicianId) AS totalVote FROM Politicians
        join Votes
        on Politicians.id=Votes.politicianId
        where grade_current < 9
        group by Politicians.name
        ORDER by grade_current asc;`, function (err, data) {
        console.log(data);
    });


 //SOAL2//
db.all(`WITH data1 AS(SELECT COUNT(Votes.politicianId)AS totalVote,name AS politicianName ,Politicians.id
						FROM Politicians
						JOIN Votes
						ON Politicians.id=Votes.politicianId
						GROUP BY Politicians.name
						ORDER BY totalVote 
						DESC LIMIT 3
					    )
            , data2 AS(SELECT  first_name||' '||last_name AS voterName,
						gender,Votes.politicianId FROM Voters
						JOIN Votes
						ON Voters.id =Votes.voterId
                     )
        SELECT data1.totalVote AS totalVote, data1.politicianName AS PoliticianName,data2.voterName AS votersName,data2.gender AS gender
        FROM data1
        JOIN data2
        ON data1.id=data2.politicianId
        ORDER BY data1.totalVote DESC`, function (err, data) {
        console.log(data);
    });

//SOAL3//
db.all(`SELECT count(Votes.voterId)AS totalVote,first_name||' '||last_name AS name,gender,age FROM Voters
        JOIN Votes
        ON voters.id=Votes.voterId
        GROUP by name
        HAVING  totalVote >1
        ORDER BY totalVote DESC;`, function (err, data) {
        console.log(data);
    });