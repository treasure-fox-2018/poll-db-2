const db = require('./db.js');

class ToCheck {

    static voteGrade(num) {
        const query = `SELECT name, location, grade_current, COUNT(Votes.politicianId) AS totalVote
                     FROM Politicians
                     LEFT JOIN Votes ON Politicians.id = Votes.politicianId
                     WHERE grade_current < 9
                     GROUP BY name ORDER BY totalVote ASC`
        db.all(query, function (err, output) {
            if (err) throw err
            console.log(output)
        });
    }

    static mostVote() {
        const query = `SELECT TempTable.totalVote, TempTable.politicianName, (first_name||' '|| last_name) AS voterName, gender FROM Votes,
                            (SELECT COUNT(politicianId) AS totalVote, name AS politicianName, Politicians.id FROM Politicians
                            LEFT JOIN Votes
                            ON Politicians.id = votes.politicianId
                            GROUP BY politicianId
                            ORDER BY totalVote DESC 
                            LIMIT 3) AS TempTable
                        LEFT JOIN Voters
                        ON Votes.voterId = Voters.id
                        WHERE Votes.politicianId = TempTable.id`

        db.all(query, function (err, output) {
            if (err) throw err
            console.log(output)
        });
    }

    static cheatVotes() {
        const query = `SELECT COUNT(Voters.id) AS totalVote, (Voters.first_name|| ' ' || Voters.last_name) AS name, gender, age FROM Voters
                       LEFT JOIN Votes ON Voters.id = Votes.voterId
                       GROUP BY name HAVING totalVote > 1
                       ORDER BY totalVote DESC`

        db.all(query, function (err, output) {
            if (err) throw err
            console.log(output)
        });
    }

}

// console.log(ToCheck.voteGrade(9));
// console.log(ToCheck.mostVote());
console.log(ToCheck.cheatVotes());
