const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

//No .1
function soal1(){
    let query = `SELECT name,location,grade_current,COUNT(politicianId) 
                AS totalVote  
                FROM Politicians
                JOIN Votes
                ON Politicians.id = Votes.politicianId
                WHERE grade_current < 9
                GROUP BY name ORDER BY totalVote ASC`

    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })            
}
// soal1()

function soal2(){
    let query =`SELECT totalVote,name,first_name || '' || last_name As voterName,gender FROM (SELECT * FROM (SELECT name,COUNT(politicianId) AS totalVote,Politicians.id  FROM Politicians
    LEFT JOIN Votes
    ON Politicians.id = Votes.politicianId
    LEFT JOIN Voters
    ON Votes.voterId = Voters.id
    GROUP BY name ORDER BY totalVote DESC
    LIMIT 3) as dataPol
	JOIN Votes ON dataPol.id = Votes.politicianId) as allPol
	LEFT JOIN Voters 
    ON Voters.id = allPol.voterId`
    
    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })      
}
// soal2()

function soal3(){
    let query = `SELECT totalVote,first_name || ' ' || last_name as name,gender,age FROM Voters 
    JOIN (SELECT voterId,totalVote FROM (SELECT *,COUNT(voterId) as totalVote FROM Votes
    GROUP BY voterId) 
    where totalVote >1) as dataVoter
    ON dataVoter.voterId = Voters.id
    ORDER BY totalVote`

    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })  

}
soal3()

