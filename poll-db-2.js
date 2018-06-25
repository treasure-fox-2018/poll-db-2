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

