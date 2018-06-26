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
    let query = `SELECT totalVote, dataJoin.name, first_name||' '||last_name 
                 AS name, gender FROM votes,(SELECT COUNT(*) AS totalVote, politicians.name AS name, politicians.id AS idPolitician 
                 FROM politicians    
                 JOIN votes ON politicians.id = votes.idPolitician
                JOIN voters ON votes.idVoter = voters.id
                 GROUP BY name
                 ORDER BY totalVote DESC
                 LIMIT 3) AS dataJoin
                 JOIN voters ON voters.id = votes.idVoter 
                 WHERE votes.idPolitician = dataJoin.idPolitician;`

    
    db.all(query,function(err,data){
        if(err) throw err
        console.log(data)
    })
}

