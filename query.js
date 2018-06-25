
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

//RElEASE 0 1
function release01(){
    var query = `SELECT name, location, grade_current, count(politicianId) AS totalVote
    FROM politicians 
    JOIN votes 
    ON politicians.id = votes.politicianId
    WHERE grade_current < 9
    GROUP BY name
    ORDER BY totalVote;`
    
    db.all(query,function(err,data){

        console.log(data);
    })
}


//RELEASE 0 2
function release02(){
    var query = `SELECT newData.totalVotes, newData.politicianName, Voters.first_name || ' ' || Voters.last_name AS name, voters.gender 
    FROM Votes,(SELECT COUNT(voterid) AS totalVotes, Politicians.name AS politicianName, Votes.politicianid FROM Politicians LEFT JOIN Votes 
                     on Politicians.id = Votes.politicianid GROUP BY Votes.politicianid ORDER BY totalVotes DESC LIMIT 3) AS newData
    LEFT JOIN Voters ON Votes.voterid = Voters.id
    WHERE Votes.politicianid = newData.politicianid`

    db.all(query,function(err,data){
        console.log(data);
    })
}

//RELEASE 0 3

function release03(){
    var query = `select COUNT(votes.voterId) AS jumlahVote, first_name || ' ' || last_name AS name, gender, age 
    FROM voters
    JOIN votes
    ON voters.id = votes.voterId
    GROUP BY name
    HAVING jumlahVote > 1
    ORDER BY jumlahVote DESC `
    
    db.all(query,function(err,data){
        console.log(data);
    })
}


release01()


release02()


release03()