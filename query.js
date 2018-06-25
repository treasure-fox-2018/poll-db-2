const db = require('./db')

function number1(){
    let query = `SELECT name,location,grade_current,COUNT(*) AS total_vote FROM Politicians INNER JOIN Votes
    ON Politicians.politicianId = Votes.politicianId
    WHERE Politicians.grade_current < 9
    GROUP BY grade_current
    ORDER BY grade_current ASC`

    db.all(query,function(err,data){
        if (err) throw err;
        console.log(data);
    })
}

function number2(){
    let query = `SELECT total_vote,politicianName,first_name || " " || last_name AS voterName,gender FROM Votes,(SELECT COUNT(*) AS total_vote,name AS politicianName, Politicians.politicianId FROM Votes 
    INNER JOIN Politicians
    ON Votes.politicianId= Politicians.politicianId
    INNER JOIN Voters
    ON Votes.voterId = Voters.voterId
    GROUP BY name
    ORDER BY total_vote DESC
    LIMIT 3) AS newData
    LEFT JOIN Voters
    ON Voters.voterId = Votes.voterId WHERE Votes.politicianId = newData.politicianId`

    db.all(query,function(err,data){
        if (err) throw err;
        console.log(data);
        
    })
}

function number3(){
    let query = `SELECT COUNT(*) AS total_vote,first_name || " " || last_name AS voterName,gender,age FROM Votes INNER JOIN Politicians
    ON Votes.politicianId = Politicians.politicianId
    INNER JOIN Voters
    ON Votes.voterId = Voters.voterId
    GROUP BY voterName 
    HAVING total_vote > 1
    ORDER BY total_vote DESC`

    db.all(query,function(err,data){
        if (err) throw err;
        console.log(data);
    })
}

number1()
number2()
number3()