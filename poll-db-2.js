const db = require('./db.js')

class Check {
    // 1
    // SELECT politician_name, location, grade_current, COUNT (*) AS totalVotes 
    // FROM Politicians
    // INNER JOIN Votes ON politicians.politicianId = votes.politicianId
    // WHERE grade_current < 9
    // GROUP BY politician_name
    // ORDER BY totalVotes ASC

    static release1() {
        let query = `SELECT politician_name, location, grade_current, COUNT (*) AS totalVotes 
        FROM Politicians
        INNER JOIN Votes ON politicians.politicianId = votes.politicianId
        WHERE grade_current < 9
        GROUP BY politician_name
        ORDER BY totalVotes ASC`

        db.all(query,function(err, data){
            console.log(data)
        })
    }

    // 2
    // SELECT totalVotes, politician_name, gender, first_name || " " || last_name AS voterNames FROM Votes, (SELECT COUNT (*) AS totalVotes, politician_name, Politicians.politicianId, first_name || " " || last_name AS voterNames, first_name || " " || last_name AS voterNames
    // FROM Votes
    // INNER JOIN Voters ON Votes.voterId = voters.voterId
    // INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId
    // GROUP BY politician_name
    // ORDER BY totalVotes DESC
    // LIMIT 3)  AS subquery
    // INNER JOIN Voters ON votes.voterId = voters.voterId
    // WHERE Votes.politicianId = subquery.politicianId

    static release2() {
        let query = `SELECT totalVotes, politician_name, gender, first_name || " " || last_name AS voterNames FROM Votes, (SELECT COUNT (*) AS totalVotes, politician_name, Politicians.politicianId, first_name || " " || last_name AS voterNames, first_name || " " || last_name AS voterNames
        FROM Votes
        INNER JOIN Voters ON Votes.voterId = voters.voterId
        INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId
        GROUP BY politician_name
        ORDER BY totalVotes DESC
        LIMIT 3)  AS subquery
        INNER JOIN Voters ON votes.voterId = voters.voterId
        WHERE Votes.politicianId = subquery.politicianId`

        db.all(query,function(err, data){
            console.log(data)
        })
    }

    // 3
    // SELECT COUNT (*) AS totalVotes, first_name || " " || last_name AS name, gender, age
    // FROM Voters
    // INNER JOIN Votes ON Voters. voterId = votes.voterId
    // INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId
    // GROUP BY  name
    // HAVING totalVotes > 1
    // ORDER BY totalVotes DESC

    static release3() {
        let query = `SELECT totalVotes, politician_name, gender, first_name || " " || last_name AS voterNames FROM Votes, (SELECT COUNT (*) AS totalVotes, politician_name, Politicians.politicianId, first_name || " " || last_name AS voterNames, first_name || " " || last_name AS voterNames
        FROM Votes
        INNER JOIN Voters ON Votes.voterId = voters.voterId
        INNER JOIN Politicians ON Votes.politicianId = Politicians.politicianId
        GROUP BY politician_name
        ORDER BY totalVotes DESC
        LIMIT 3)  AS subquery
        INNER JOIN Voters ON votes.voterId = voters.voterId
        WHERE Votes.politicianId = subquery.politicianId`

        db.all(query,function(err, data){
            console.log(data)
        })
    }
}

Check.release1()
Check.release2()
Check.release3()