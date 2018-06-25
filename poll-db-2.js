const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./data.db")

function anchor1(){
    let query = `SELECT name, location,  grade_current, COUNT(name) AS totalVote 
                 FROM Votes
                 INNER JOIN  Politicians
                 ON Politicians.idPolitician = Votes.idPolitician 
                 WHERE grade_current < 9
                 GROUP BY name
                 ORDER BY grade_current ;`
    
    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}

function anchor2(){
    let query = `SELECT totalVote, dataJoin.politicianName, first_name||' '||last_name AS voterName, gender FROM votes, 
                 (SELECT COUNT(*) AS totalVote, politicians.name AS politicianName, politicians.id AS politicianID  
                 FROM politicians    
                 JOIN votes ON politicians.id = votes.politicianID
                 JOIN voters ON votes.voterID = voters.id
                 GROUP BY name
                 ORDER BY totalVote DESC
                 LIMIT 3) AS dataJoin
                 JOIN voters ON voters.id = votes.voterID 
                 WHERE votes.politicianID = dataJoin.politicianID;`

    
    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}

