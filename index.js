let db = require('./setup')

db.all(`SELECT name, location, grade_current, COUNT(voterId) AS totalVote FROM Politicians
        JOIN Votes on Votes.politicianId = Politicians.id
        WHERE Politicians.grade_current < 9
        GROUP BY Politicians.name ORDER BY totalVote ASC`, function(err, polticians){
    if(err) throw err
    console.log(polticians)
})

db.all(`SELECT count(*) AS totalVote, Politicians.name AS politicianName,
        (first_name || ' ' || last_name) AS voterName, gender FROM Votes
            JOIN Politicians ON Votes.politicianId = Politicians.id
            JOIN Voters on Voters.id = Votes.voterId
            GROUP BY name ORDER BY totalVote desc LIMIT 3`, function(err, voters){
                if(err) throw err
                console.log(voters);
            })

db.all(`SELECT totalVote, politicianName, (first_name || ' ' || last_name) AS voterName, gender 
        FROM 
        (SELECT * FROM 
            (SELECT Politicians.id, name AS politicianName, COUNT(voterId) AS totalVote FROM Politicians
            LEFT JOIN Votes on Votes.politicianId = Politicians.id
            GROUP BY Politicians.name ORDER BY totalVote DESC LIMIT 3) AS total 
            JOIN Votes ON Votes.politicianId = total.id
        ) AS dataVoter 
        LEFT JOIN Voters ON Voters.id = dataVoter.voterId`, function(err, voters){
                if(err) throw err
                console.log(voters);
        })