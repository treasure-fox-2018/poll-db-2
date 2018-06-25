"use strict"
const db    = require('./db');

function readGradeCurrent(){
    let query = `SELECT name,location,grade_current, COUNT(politicianID) AS "totalVote" FROM politicians
                JOIN votes ON politicians.id = votes.politicianID
                WHERE grade_current < 9
                GROUP BY name
                ORDER BY grade_current ASC
                `

    db.all(query, function(err,data){
        console.log(data);
    })

}

function readGradeCurrent(){
    let query = `SELECT name,location,grade_current, COUNT(politicianID) AS "totalVote" FROM politicians
                JOIN votes ON politicians.id = votes.politicianID
                WHERE grade_current < 9
                GROUP BY name
                ORDER BY grade_current ASC
                `

    db.all(query, function(err,data){
        console.log(data);
    })

}

function readPoliticiansVoters(){

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

    db.all(query, function(err,data){
        console.log(data);
    })

}



// readGradeCurrent();
readPoliticiansVoters();