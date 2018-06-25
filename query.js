var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');
// var Table = require('cli-table');

db.serialize(function(){
    db.all(`SELECT name,location,grade_current, COUNT(politicianId) AS totalVote 
        FROM Politicians 
        LEFT JOIN Votes ON Politicians.id = Votes.politicianId
        WHERE grade_current < 9
        GROUP BY Politicians.id
        ORDER BY grade_current ASC`,(err,result)=>{
            if(err) throw err
            else{
                console.log("-------jawaban 1--------");
                console.log(result);
            }
    })
    db.all(`SELECT totalVote, politicianName, (firstName || ' ' || lastname)  AS voterName, gender FROM
        (SELECT totalVote, politicianName, voterId FROM (SELECT  COUNT(politicianId) AS totalVote,
        name AS politicianName, Politicians.id FROM Politicians 
        LEFT JOIN Votes ON Politicians.id = Votes.politicianId
        GROUP BY Politicians.id
        ORDER BY totalVote DESC
        LIMIT 3) AS total
        JOIN Votes
        ON total.id = Votes.politicianId) AS TopVote
        LEFT JOIN Voters
        ON TopVote.voterId = Voters.Id`,(err,result)=>{
            if(err) throw err
            else{
                console.log("-------jawaban 2-------");
                console.log(result);
            }
    })
    db.all(`SELECT COUNT(voterId) AS totalVote, (firstName||' '||lastName) AS name, gender, age 
        FROM Votes
        LEFT JOIN Voters
        ON Votes.voterId = Voters.id
        GROUP BY Votes.voterId
        HAVING totalVote > 1
        ORDER BY totalVote desc`,(err,result)=>{
        if(err) throw err
        else{
            console.log("--------jawaban 3--------");
            console.log(result);
            
        }
    })
})
